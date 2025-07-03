# Simple MCP Testing Script

Write-Host "Testing MCP Setup for GQ Cars Project" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Test Node.js
Write-Host "`nTesting Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
}

# Test npm
Write-Host "`nTesting npm..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found" -ForegroundColor Red
}

# Test Docker
Write-Host "`nTesting Docker..." -ForegroundColor Cyan
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker version: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found" -ForegroundColor Red
}

# Test MCP packages
Write-Host "`nTesting MCP packages..." -ForegroundColor Cyan

$mcpPackages = @(
    "@modelcontextprotocol/server-postgres",
    "@modelcontextprotocol/server-google-maps", 
    "@playwright/mcp",
    "puppeteer-mcp-server",
    "@cyanheads/git-mcp-server"
)

foreach ($package in $mcpPackages) {
    try {
        $null = npm list -g $package 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ $package is installed" -ForegroundColor Green
        } else {
            Write-Host "⚠️ $package not globally installed (will use npx)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Error checking $package" -ForegroundColor Red
    }
}

# Test website
Write-Host "`nTesting GQ Cars website..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ GQ Cars website is running (HTTP 200)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ GQ Cars website not responding" -ForegroundColor Red
    Write-Host "   Run 'npm run dev' in apps/web directory" -ForegroundColor Yellow
}

# Test configuration files
Write-Host "`nTesting configuration files..." -ForegroundColor Cyan

if (Test-Path "claude_desktop_config_working.json") {
    Write-Host "✅ Working MCP config file exists" -ForegroundColor Green
} else {
    Write-Host "❌ Working MCP config file missing" -ForegroundColor Red
}

if (Test-Path ".env") {
    Write-Host "✅ Environment file exists" -ForegroundColor Green
} else {
    Write-Host "❌ Environment file missing" -ForegroundColor Red
}

$claudeConfig = "$env:APPDATA\Claude\claude_desktop_config.json"
if (Test-Path $claudeConfig) {
    Write-Host "✅ Claude Desktop config exists" -ForegroundColor Green
} else {
    Write-Host "❌ Claude Desktop config missing" -ForegroundColor Red
}

Write-Host "`n=====================================" -ForegroundColor Green
Write-Host "MCP Setup Testing Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green