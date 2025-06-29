@echo off
echo ========================================
echo    GQ CARS - NUCLEAR RESET & START
echo ========================================

echo ?? Killing all processes...
npx kill-port 3000 >nul 2>&1
taskkill /IM node.exe /F >nul 2>&1

echo ?? Cleaning all cache and dependencies...
cd /d "%~dp0"
if exist apps\web\.next rmdir /s /q apps\web\.next >nul 2>&1
if exist apps\web\node_modules rmdir /s /q apps\web\node_modules >nul 2>&1
if exist node_modules rmdir /s /q node_modules >nul 2>&1

echo ?? Installing root dependencies...
npm install

echo ?? Installing web app dependencies...
cd apps\web
npm install

echo ?? Starting fresh development server...
echo.
echo ? Website will open at: http://localhost:3000
echo ? Press Ctrl+C to stop
echo.

timeout /t 2 /nobreak >nul
start http://localhost:3000
npm run dev
