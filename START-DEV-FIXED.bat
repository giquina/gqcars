@echo off
echo ========================================
echo    GQ CARS - DEVELOPMENT SERVER
echo    (Monorepo Fixed Version)
echo ========================================

cd /d "%~dp0"

echo 🔧 Installing/Updating dependencies...
npm install

echo 🧹 Clearing cache...
if exist apps\web\.next rmdir /s /q apps\web\.next

echo 🚀 Starting your website...
echo.
echo ✅ Your website will open at: http://localhost:3000
echo ✅ Press Ctrl+C to stop the server
echo.

timeout /t 2 /nobreak >nul
start http://localhost:3000
npm run dev:web
