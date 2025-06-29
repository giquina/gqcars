@echo off
echo ========================================
echo    GQ CARS - PORT 3001 (CONFLICT FIX)
echo ========================================

cd /d "%~dp0\apps\web"

echo 🔧 Installing/Updating dependencies...
npm install

echo 🧹 Clearing cache...
if exist .next rmdir /s /q .next

echo 🚀 Starting your website on PORT 3001...
echo.
echo ✅ Your website will open at: http://localhost:3001
echo ✅ Press Ctrl+C to stop the server
echo.

timeout /t 2 /nobreak >nul
start http://localhost:3001
npm run dev -- -p 3001
