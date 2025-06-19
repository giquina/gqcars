@echo off
echo ========================================
echo    GQ SECURITY SERVICES - STARTUP
echo ========================================
echo.

REM Navigate to the project directory
cd /d "C:\Users\Student\Desktop\gqcars"

echo 📁 Project Directory: %CD%
echo.

REM Check if dependencies are installed
if not exist node_modules (
    echo ⚠️  Dependencies not found. Installing...
    echo.
    call fix-env.bat
    echo.
)

echo 🚀 Starting GQ Security Services...
echo.
echo 🌐 The website will be available at: http://localhost:3000
echo 📊 Dashboard will be at: http://localhost:3000/dashboard
echo.
echo ⏰ Please wait for the server to start...
echo ➤ You'll see "Ready - started server on 0.0.0.0:3000" when ready
echo.

REM Start the development server
npm run dev

echo.
echo ❌ Server stopped. Press any key to exit...
pause > nul
