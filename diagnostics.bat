@echo off
echo ========================================
echo    GQ SECURITY - DIAGNOSTICS
echo ========================================
echo.

cd /d "C:\Users\Student\Desktop\gqcars"

echo 📋 SYSTEM CHECK:
echo ================
echo.

echo ✓ Node.js version:
node --version
echo.

echo ✓ NPM version:
npm --version
echo.

echo ✓ Project directory:
echo %CD%
echo.

echo 📁 PROJECT FILES:
echo ================
echo.

if exist package.json (
    echo ✅ package.json - EXISTS
) else (
    echo ❌ package.json - MISSING
)

if exist node_modules (
    echo ✅ node_modules - EXISTS
) else (
    echo ❌ node_modules - MISSING ^(Run fix-env.bat^)
)

if exist app (
    echo ✅ app directory - EXISTS
) else (
    echo ❌ app directory - MISSING
)

if exist next.config.js (
    echo ✅ next.config.js - EXISTS
) else (
    echo ❌ next.config.js - MISSING
)

echo.
echo 🔍 PORT CHECK:
echo ==============
netstat -an | findstr :3000
if %errorlevel% == 0 (
    echo ⚠️  Port 3000 is in use
) else (
    echo ✅ Port 3000 is available
)

echo.
echo 💡 RECOMMENDATIONS:
echo ==================
if not exist node_modules echo 1. Run fix-env.bat to install dependencies
echo 2. Run start-server.bat to start the website
echo 3. Visit http://localhost:3000 in your browser
echo.

pause
