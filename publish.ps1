#requires -Version 5
# publish.ps1 - build the production site and deploy it to Cloudflare Pages.
#
# This site is hosted on Cloudflare Pages (project "ahmad-alkaf"), not GitHub Pages.
# Local Ruby is broken on this machine, so the production build runs inside the
# ruby:3.4 Docker image - the same Ruby the retired GitHub Actions workflow used.
# Wrangler then uploads the built _site folder directly; it never reads from
# GitHub, so publishing works regardless of the repo's visibility or account state.
#
# Usage:
#   .\publish.ps1            # build (with html-proofer link check) and deploy
#   .\publish.ps1 -SkipTest  # build without html-proofer, then deploy (faster)
#   .\publish.ps1 -SkipDeploy  # build only (into _site); do not deploy
#
# Requirements: Docker Desktop (running) and Node.js on PATH.
# One-time Cloudflare login (opens a browser):  npx --yes wrangler@latest login
#
# Gems are cached in a Docker volume ("ahmad-alkaf-bundle") so repeat publishes
# skip re-downloading. For a clean rebuild: docker volume rm ahmad-alkaf-bundle

[CmdletBinding()]
param([switch]$SkipTest, [switch]$SkipDeploy)

$ErrorActionPreference = 'Stop'

# --- Cloudflare target (account id is not a secret; edit if it ever changes) --
$ProjectName = 'ahmad-alkaf'
$env:CLOUDFLARE_ACCOUNT_ID = '16492cb382651f5ccddf2b2d8a3293f1'

# Always operate from the project root (this script's own folder).
Set-Location -LiteralPath $PSScriptRoot
$site = Join-Path $PSScriptRoot '_site'

function Assert-LastExit($what) {
    if ($LASTEXITCODE -ne 0) {
        Write-Host "$what failed (exit code $LASTEXITCODE)." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

# --- Preflight ---------------------------------------------------------------
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker was not found on PATH." -ForegroundColor Red
    Write-Host "Install Docker Desktop, make sure it is running, then re-run." -ForegroundColor Yellow
    exit 1
}
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js (npx) was not found on PATH." -ForegroundColor Red
    Write-Host "Install Node.js LTS, then re-run:  winget install OpenJS.NodeJS.LTS" -ForegroundColor Yellow
    exit 1
}

# --- Assemble the in-container build script (Linux, LF line endings) ---------
$lines = @(
    'set -e'
    'mkdir -p /app'
    # Copy source out of the read-only mount, skipping heavy/irrelevant dirs.
    '( cd /src && tar cf - --exclude=./.git --exclude=./node_modules --exclude=./_site --exclude=./.jekyll-cache . ) | ( cd /app && tar xf - )'
    'cd /app'
    # Gemfile.lock is generated on Windows; make sure a Linux platform is present.
    'bundle lock --add-platform x86_64-linux ruby >/dev/null 2>&1 || true'
    'bundle install --quiet'
    'JEKYLL_ENV=production bundle exec jekyll b -d /out'
)
# On Linux/macOS the container runs as root, so give the output back to the
# host user (also when the build fails); else the next run cannot delete _site.
if (-not $IsWindows -and $PSVersionTable.PSEdition -eq 'Core') {
    $owner = "$(id -u):$(id -g)"
    $lines = @($lines[0], "trap 'chown -R ${owner} /out' EXIT") + $lines[1..($lines.Count - 1)]
}
if (-not $SkipTest) {
    $lines += "bundle exec htmlproofer /out --disable-external --ignore-urls '/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/'"
}
$buildScript = ($lines -join "`n") + "`n"

# Write the build script to a temp file and mount it, so we never fight
# PowerShell's native-argument quoting (the regex above has quotes/backslashes).
$tmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ("publish-" + [System.IO.Path]::GetRandomFileName())
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null
try {
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText((Join-Path $tmpDir 'build.sh'), $buildScript, $utf8NoBom)

    # --- Build (production) in Docker ----------------------------------------
    Write-Host "Cleaning previous build (_site)..." -ForegroundColor Cyan
    if (Test-Path -LiteralPath $site) { Remove-Item -Recurse -Force -LiteralPath $site }
    New-Item -ItemType Directory -Force -Path $site | Out-Null

    Write-Host "Building production site in Docker (ruby:3.4)..." -ForegroundColor Cyan
    docker run --rm `
        -v "${PSScriptRoot}:/src:ro" `
        -v "${site}:/out" `
        -v "${tmpDir}:/work:ro" `
        -v "ahmad-alkaf-bundle:/usr/local/bundle" `
        ruby:3.4 bash /work/build.sh
    Assert-LastExit "Docker build"
}
finally {
    Remove-Item -Recurse -Force -LiteralPath $tmpDir -ErrorAction SilentlyContinue
}

if (-not (Test-Path -LiteralPath (Join-Path $site 'index.html'))) {
    Write-Host "Build produced no index.html - aborting before deploy." -ForegroundColor Red
    exit 1
}
if ($SkipDeploy) {
    Write-Host "Built into $site (deploy skipped)." -ForegroundColor Green
    exit 0
}

# --- Deploy to Cloudflare Pages ----------------------------------------------
Write-Host "Deploying to Cloudflare Pages (project '$ProjectName')..." -ForegroundColor Cyan
npx --yes wrangler@latest pages deploy $site --project-name $ProjectName --branch main
Assert-LastExit "wrangler deploy"

Write-Host ""
Write-Host "Published. Live at https://ahmed.kaflabs.com  (preview: https://$ProjectName.pages.dev)" -ForegroundColor Green
