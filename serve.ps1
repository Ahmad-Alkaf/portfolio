#requires -Version 5
# serve.ps1 - start the Jekyll dev server with live reload.
#
# Designed to "just work" even when Ruby is not on the current PATH:
#  - rebuilds PATH from the persisted Machine + User environment, so a Ruby that
#    was installed *after* this terminal opened (or a double-click from Explorer)
#    is still found without reopening the terminal.
#  - if Ruby/Bundler genuinely is not installed, it stops with install instructions.
#  - installs gems automatically on first run.

$ErrorActionPreference = 'Stop'

# Always operate from the project root (this script's own folder).
Set-Location -LiteralPath $PSScriptRoot

# Refresh PATH from the persisted environment (picks up a freshly installed Ruby).
$env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
            [System.Environment]::GetEnvironmentVariable('Path', 'User')

# Bail out clearly if Ruby/Bundler is not available.
if (-not (Get-Command bundle -ErrorAction SilentlyContinue)) {
    Write-Host "Ruby/Bundler was not found on PATH." -ForegroundColor Red
    Write-Host "Install Ruby+Devkit, then bundler:" -ForegroundColor Yellow
    Write-Host "    winget install RubyInstallerTeam.RubyWithDevKit.3.3" -ForegroundColor Yellow
    Write-Host "    gem install bundler" -ForegroundColor Yellow
    Write-Host "Open a NEW terminal after installing, then run this script again." -ForegroundColor Yellow
    exit 1
}

# Install gems if they are not already satisfied (first run / fresh clone).
bundle check 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing gems (first run)..." -ForegroundColor Cyan
    bundle install
}

Write-Host "Starting Jekyll dev server with live reload (Ctrl+C to stop)..." -ForegroundColor Green
# s = serve, -l = livereload, -o = open browser, --incremental = faster rebuilds
bundle exec jekyll s -l -o --incremental
