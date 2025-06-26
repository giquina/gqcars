@echo off
echo ========================================
echo    GQ CARS - DEVELOPMENT SERVER
echo ========================================

cd /d "%~dp0"

echo 🔧 Checking dependencies...
if not exist node_modules\framer-motion (
    echo 📦 Installing missing packages...
    npm install
)

echo 🧹 Clearing cache...
if exist .next rmdir /s /q .next

echo 🚀 Starting your website...
echo.
echo ✅ Your website will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:3000
npm run dev -- -H 0.0.0.0