@echo off
echo ========================================
echo    GQ CARS - SYSTEM DIAGNOSTICS
echo ========================================

echo.
echo 🔍 CHECKING DEVELOPMENT ENVIRONMENT:
echo.

echo Node.js Version:
node --version

echo.
echo NPM Version:
npm --version

echo.
echo Current Directory:
echo %cd%

echo.
echo 📁 CHECKING PROJECT STRUCTURE:
echo.

if exist package.json (
    echo ✅ Root package.json found
) else (
    echo ❌ Root package.json missing
)

if exist apps\web\package.json (
    echo ✅ Web app package.json found
) else (
    echo ❌ Web app package.json missing
)

if exist node_modules (
    echo ✅ Root node_modules found
) else (
    echo ❌ Root node_modules missing - run: npm install
)

if exist apps\web\node_modules (
    echo ✅ Web app node_modules found
) else (
    echo ❌ Web app node_modules missing
)

echo.
echo 🔧 AVAILABLE SCRIPTS:
echo.
echo From Root Directory:
npm run

echo.
echo 📋 QUICK COMMANDS:
echo ✅ Start website: npm run dev:web
echo ✅ Start from batch: START-DEV-FIXED.bat
echo ✅ Build website: npm run build:web
echo ✅ Run diagnostics: diagnostics-fixed.bat
echo.

pause
