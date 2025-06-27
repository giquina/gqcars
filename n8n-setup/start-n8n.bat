@echo off
echo Starting n8n with Docker Compose...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not running. Please start Docker Desktop first.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo Docker is running. Starting n8n...
echo.

REM Pull latest images
echo Pulling latest images...
docker-compose pull

echo.
echo Starting services...
docker-compose up -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check if n8n is running
docker-compose ps

echo.
echo ========================================
echo n8n is starting up!
echo.
echo Web Interface: http://localhost:5678
echo.
echo To view logs: docker-compose logs -f n8n
echo To stop: docker-compose down
echo ========================================
echo.

REM Open browser
start http://localhost:5678

pause
