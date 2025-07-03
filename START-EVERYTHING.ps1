# 🚀 GQ Cars Complete Development Environment Startup Script
# Comprehensive PowerShell automation for all systems

Write-Host "🚗💨 GQ Cars Development Environment - FULL STARTUP" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Yellow

# System Information
Write-Host "`n📊 System Status:" -ForegroundColor Green
Write-Host "Date: $(Get-Date)" -ForegroundColor White
Write-Host "User: $env:USERNAME" -ForegroundColor White
Write-Host "Working Directory: $PWD" -ForegroundColor White

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# Function to start process safely
function Start-SafeProcess {
    param(
        [string]$ProcessName,
        [string]$WorkingDirectory,
        [string]$Command,
        [int]$Port = 0
    )
    
    if ($Port -gt 0 -and (Test-Port $Port)) {
        Write-Host "⚠️  Port $Port already in use - skipping $ProcessName" -ForegroundColor Yellow
        return
    }
    
    Write-Host "🚀 Starting $ProcessName..." -ForegroundColor Green
    try {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$WorkingDirectory'; $Command" -WindowStyle Normal
        Start-Sleep 3
        Write-Host "✅ $ProcessName started successfully" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to start $ProcessName`: $_" -ForegroundColor Red
    }
}

# 1. Kill any existing processes
Write-Host "`n🔄 Cleaning up existing processes..." -ForegroundColor Yellow
try {
    Get-Process | Where-Object {$_.ProcessName -like "*node*" -and $_.CommandLine -like "*gqcars*"} | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep 2
    Write-Host "✅ Process cleanup complete" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Process cleanup completed with warnings" -ForegroundColor Yellow
}

# 2. Start Autonomous Agent System
Write-Host "`n🤖 Starting Autonomous Agent System..." -ForegroundColor Cyan
$AgentPath = "C:\Users\Student\Documents\Development_Projects\gqcars-main-production\.agents"
Start-SafeProcess -ProcessName "Agent Dashboard" -WorkingDirectory $AgentPath -Command "npm run dashboard" -Port 3002

# Wait for dashboard to start
Start-Sleep 5

# Start agent orchestrator
Start-SafeProcess -ProcessName "Agent Orchestrator" -WorkingDirectory $AgentPath -Command "npm run start"

# 3. Start Main GQ Cars Website
Write-Host "`n🌐 Starting GQ Cars Website..." -ForegroundColor Cyan
$WebPath = "C:\Users\Student\Documents\Development_Projects\gqcars-main-production\apps\web"
Start-SafeProcess -ProcessName "GQ Cars Website" -WorkingDirectory $WebPath -Command "npm run dev" -Port 3000

# 4. Start SohoFashion Website (if exists)
$SohoPath = "C:\Users\Student\Desktop\sohofashion-frontend"
if (Test-Path $SohoPath) {
    Write-Host "`n👗 Starting SohoFashion Website..." -ForegroundColor Cyan
    Start-SafeProcess -ProcessName "SohoFashion Website" -WorkingDirectory $SohoPath -Command "npm run dev" -Port 3001
}

# 5. Start n8n Automation (if Docker is available)
Write-Host "`n🔄 Checking n8n Automation..." -ForegroundColor Cyan
$N8nPath = "C:\Users\Student\Desktop\n8n-setup"
if (Test-Path $N8nPath) {
    try {
        docker --version | Out-Null
        Write-Host "🐳 Starting n8n with Docker..." -ForegroundColor Green
        Start-SafeProcess -ProcessName "n8n Automation" -WorkingDirectory $N8nPath -Command "docker-compose up -d" -Port 5678
    } catch {
        Write-Host "⚠️  Docker not available - skipping n8n" -ForegroundColor Yellow
    }
}

# 6. Wait for services to initialize
Write-Host "`n⏳ Waiting for all services to initialize..." -ForegroundColor Yellow
Start-Sleep 10

# 7. Service Status Check
Write-Host "`n📊 Service Status Check:" -ForegroundColor Green
$services = @(
    @{Name="Agent Dashboard"; Port=3002; URL="http://localhost:3002"},
    @{Name="GQ Cars Website"; Port=3000; URL="http://localhost:3000"},
    @{Name="SohoFashion"; Port=3001; URL="http://localhost:3001"},
    @{Name="n8n Automation"; Port=5678; URL="http://localhost:5678"}
)

foreach ($service in $services) {
    if (Test-Port $service.Port) {
        Write-Host "✅ $($service.Name) - Running on port $($service.Port)" -ForegroundColor Green
    } else {
        Write-Host "❌ $($service.Name) - Not responding on port $($service.Port)" -ForegroundColor Red
    }
}

# 8. Open Browsers
Write-Host "`n🌐 Opening dashboards in browser..." -ForegroundColor Cyan
Start-Sleep 3

# Open Agent Dashboard
if (Test-Port 3002) {
    Write-Host "🤖 Opening Agent Dashboard..." -ForegroundColor Green
    Start-Process "http://localhost:3002"
    Start-Sleep 2
}

# Open Main Website
if (Test-Port 3000) {
    Write-Host "🚗 Opening GQ Cars Website..." -ForegroundColor Green
    Start-Process "http://localhost:3000"
    Start-Sleep 2
}

# Open n8n if available
if (Test-Port 5678) {
    Write-Host "🔄 Opening n8n Automation..." -ForegroundColor Green
    Start-Process "http://localhost:5678"
}

# 9. Final Status Report
Write-Host "`n🎉 STARTUP COMPLETE!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Yellow

Write-Host "`n📋 Available Services:" -ForegroundColor Cyan
Write-Host "• Agent Dashboard: http://localhost:3002" -ForegroundColor White
Write-Host "• GQ Cars Website: http://localhost:3000" -ForegroundColor White
Write-Host "• SohoFashion: http://localhost:3001" -ForegroundColor White
Write-Host "• n8n Automation: http://localhost:5678" -ForegroundColor White

Write-Host "`n🤖 Your 6 Autonomous Agents are now active:" -ForegroundColor Cyan
Write-Host "• Database Architect" -ForegroundColor White
Write-Host "• API Builder" -ForegroundColor White
Write-Host "• Frontend Developer" -ForegroundColor White
Write-Host "• Integration Specialist" -ForegroundColor White
Write-Host "• Testing Agent" -ForegroundColor White
Write-Host "• Documentation Writer" -ForegroundColor White

Write-Host "`n💡 Quick Commands:" -ForegroundColor Yellow
Write-Host "• Check agents: curl http://localhost:3002/api/agents" -ForegroundColor White
Write-Host "• Add task: Use the web dashboard or API" -ForegroundColor White
Write-Host "• View logs: Check individual terminal windows" -ForegroundColor White

Write-Host "`n🚀 Your autonomous development environment is OPERATIONAL!" -ForegroundColor Green
Write-Host "Happy coding! 🚗💨" -ForegroundColor Cyan

# Keep window open
Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")