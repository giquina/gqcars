@echo off
echo ========================================
echo n8n Docker Setup and Health Check
echo ========================================
echo.

:check_docker
echo Checking if Docker Desktop is running...
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Docker Desktop is not running!
    echo.
    echo Please:
    echo 1. Start Docker Desktop manually
    echo 2. Wait for it to fully load (green icon in system tray)
    echo 3. Run this script again
    echo.
    echo Starting Docker Desktop for you...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo.
    echo Waiting 30 seconds for Docker to start...
    echo Press Ctrl+C to cancel
    timeout /t 30 /nobreak
    goto check_docker
) else (
    echo ✅ Docker Desktop is running!
)

echo.
echo Navigating to n8n setup directory...
cd /d "C:\Users\Student\Desktop\n8n-setup"

echo.
echo Current directory: %CD%
echo.

echo Checking for required files...
if not exist "docker-compose.yml" (
    echo ❌ docker-compose.yml not found!
    echo Please ensure you're in the correct directory.
    pause
    exit /b 1
)
echo ✅ docker-compose.yml found

echo.
echo Pulling latest n8n images...
docker-compose pull

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to pull images. Check your internet connection.
    pause
    exit /b 1
)

echo.
echo Starting n8n services...
docker-compose up -d

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to start services.
    echo Check the logs with: docker-compose logs
    pause
    exit /b 1
)

echo.
echo ⏳ Waiting for services to initialize...
timeout /t 15 /nobreak >nul 2>&1

echo.
echo Checking service status...
docker-compose ps

echo.
echo ========================================
echo 🎉 n8n Setup Complete!
echo ========================================
echo.
echo 🌐 Web Interface: http://localhost:5678
echo 📊 Database: PostgreSQL (persistent)
echo 🚀 Cache: Redis (performance boost)
echo.
echo 📝 Useful Commands:
echo   View logs: docker-compose logs -f n8n
echo   Stop services: docker-compose down
echo   Restart: docker-compose restart
echo.
echo Opening n8n in your browser...
start http://localhost:5678

echo.
echo Press any key to exit...
pause >nul
