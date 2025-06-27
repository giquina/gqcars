@echo off
echo.
echo ========================================
echo   GQ CARS LTD - MAIN PRODUCTION WEBSITE
echo ========================================
echo.
echo Starting the OFFICIAL GQ Cars website...
echo This is the ONLY official website directory.
echo.

cd /d "C:\Users\Student\Documents\Development_Projects\gqcars-main-production"

echo Checking for updates from GitHub...
git pull origin main

echo.
echo Installing/updating dependencies...
call npm install

echo.
echo Starting development server on http://localhost:3000
echo.
echo ========================================
echo   GQ CARS LTD WEBSITE NOW RUNNING
echo   URL: http://localhost:3000
echo ========================================
echo.

call npm run dev

pause
