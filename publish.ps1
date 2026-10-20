#requires -Version 5
# publish.ps1 - build the static Next.js site and deploy it to Cloudflare Pages.
#
# The site is hosted on Cloudflare Pages (project "ahmad-alkaf").
# `next build` writes the complete site into the out/ folder.
# Wrangler then uploads out/ directly. It does not read from GitHub.
#
# Usage:
#   .\publish.ps1               # install, check, build, check URLs, and deploy
#   .\publish.ps1 -SkipChecks   # no type check, lint, or URL check (faster)
#   .\publish.ps1 -SkipDeploy   # build into out/ only; do not deploy
#
# Requirements: Node.js 20.9 or newer (npm and npx on PATH).
# One-time Cloudflare login (opens a browser):  npx --yes wrangler@latest login

[CmdletBinding()]
param([switch]$SkipChecks, [switch]$SkipDeploy)

$ErrorActionPreference = 'Stop'

# --- Cloudflare target (the account id is not a secret; edit it if it changes) --
$ProjectName = 'ahmad-alkaf'
$env:CLOUDFLARE_ACCOUNT_ID = '16492cb382651f5ccddf2b2d8a3293f1'

# Always operate from the project root (this script's own folder).
Set-Location -LiteralPath $PSScriptRoot
$out = Join-Path $PSScriptRoot 'out'

function Assert-LastExit($what) {
    if ($LASTEXITCODE -ne 0) {
        Write-Host "$what failed (exit code $LASTEXITCODE)." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

# --- Preflight ---------------------------------------------------------------
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js (npm/npx) was not found on PATH." -ForegroundColor Red
    Write-Host "Install Node.js LTS, then re-run:  winget install OpenJS.NodeJS.LTS" -ForegroundColor Yellow
    exit 1
}

# --- Install -----------------------------------------------------------------
Write-Host "Installing packages (npm ci)..." -ForegroundColor Cyan
npm ci --no-audit --no-fund
Assert-LastExit "npm ci"

# --- Check -------------------------------------------------------------------
if (-not $SkipChecks) {
    Write-Host "Type check and lint..." -ForegroundColor Cyan
    npm run check
    Assert-LastExit "Type check / lint"
}

# --- Build -------------------------------------------------------------------
Write-Host "Building the static site into out/..." -ForegroundColor Cyan
if (Test-Path -LiteralPath $out) { Remove-Item -Recurse -Force -LiteralPath $out }
npm run build
Assert-LastExit "next build"

if (-not (Test-Path -LiteralPath (Join-Path $out 'index.html'))) {
    Write-Host "Build produced no out/index.html - aborting before deploy." -ForegroundColor Red
    exit 1
}

if (-not $SkipChecks) {
    Write-Host "Checking that each old Jekyll URL exists in out/..." -ForegroundColor Cyan
    npm run check:urls
    Assert-LastExit "URL check"
}

if ($SkipDeploy) {
    Write-Host "Built into $out (deploy skipped)." -ForegroundColor Green
    exit 0
}

# --- Deploy to Cloudflare Pages ----------------------------------------------
Write-Host "Deploying to Cloudflare Pages (project '$ProjectName')..." -ForegroundColor Cyan
npx --yes wrangler@latest pages deploy $out --project-name $ProjectName --branch main
Assert-LastExit "wrangler deploy"

Write-Host ""
Write-Host "Published. Live at https://ahmed.kaflabs.com  (preview: https://$ProjectName.pages.dev)" -ForegroundColor Green
