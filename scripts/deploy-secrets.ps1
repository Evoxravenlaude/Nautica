# deploy-secrets.ps1 — Push all Cloudflare Worker secrets from .env.local in one go.
# Usage: powershell -ExecutionPolicy Bypass -File scripts\deploy-secrets.ps1
#   (or just: .\scripts\deploy-secrets.ps1  if your execution policy allows local scripts)

$ErrorActionPreference = "Stop"
$EnvFile = ".env.local"

if (-not (Test-Path $EnvFile)) {
    Write-Host "$EnvFile not found. Copy .env.local.example and fill in your values." -ForegroundColor Red
    exit 1
}

function Get-EnvVal($name) {
    $line = Get-Content $EnvFile | Where-Object { $_ -match "^$name=" } | Select-Object -First 1
    if (-not $line) { return $null }
    $val = $line -replace "^$name=", ""
    $val = $val.Trim('"').Trim("'")
    return $val
}

$AlchemyKey   = Get-EnvVal "VITE_ALCHEMY_API_KEY"
$ZeroXKey     = Get-EnvVal "VITE_ZERO_X_API_KEY"
$ReservoirKey = Get-EnvVal "RESERVOIR_API_KEY"

Write-Host "Pushing Cloudflare Worker secrets..." -ForegroundColor Cyan
Write-Host ""

if ($AlchemyKey) {
    $AlchemyKey | npx wrangler secret put ALCHEMY_KEY
    Write-Host "ALCHEMY_KEY set" -ForegroundColor Green
} else {
    Write-Host "VITE_ALCHEMY_API_KEY not in $EnvFile — skipping" -ForegroundColor Yellow
}

if ($ZeroXKey) {
    $ZeroXKey | npx wrangler secret put ZERO_X_KEY
    Write-Host "ZERO_X_KEY set" -ForegroundColor Green
} else {
    Write-Host "VITE_ZERO_X_API_KEY not in $EnvFile — skipping" -ForegroundColor Yellow
}

if ($ReservoirKey) {
    $ReservoirKey | npx wrangler secret put RESERVOIR_KEY
    Write-Host "RESERVOIR_KEY set" -ForegroundColor Green
} else {
    Write-Host "No RESERVOIR_API_KEY — Reservoir runs on free public tier" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Done. Run: npm run build; npx wrangler deploy" -ForegroundColor Cyan
