@echo off
echo 🔧 Fixing GQ Cars Website...
echo.

cd /d "C:\Users\Student\Documents\Development_Projects\gqcars-main-production\apps\web"

echo ⏹️ Stopping existing servers...
taskkill /f /im node.exe 2>nul >nul
taskkill /f /im npm.exe 2>nul >nul

echo 🧹 Clearing cache...
rmdir /s /q .next 2>nul >nul

echo 📦 Installing dependencies...
npm install --legacy-peer-deps

echo 🚀 Starting development server...
echo.
echo ✅ Website will be available at: http://localhost:3000
echo.
npm run dev

pause
