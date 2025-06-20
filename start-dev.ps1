# GQ Cars Development Server Starter
Write-Host "🚀 Starting GQ Cars Development Server" -ForegroundColor Yellow
Write-Host "====================================" -ForegroundColor Yellow

# Change to project directory
Set-Location "C:\Users\Student\Desktop\gqcars-frontend"

# Display current directory
Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Cyan

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found" -ForegroundColor Red
    Write-Host "Make sure you're in the correct directory" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Kill any existing Node processes (optional)
Write-Host "🔍 Checking for existing Node processes..." -ForegroundColor Cyan
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host "The server will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the development server
npm run dev
