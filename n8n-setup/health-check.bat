@echo off
echo ========================================
echo n8n Health Check
echo ========================================
echo.

cd /d "C:\Users\Student\Desktop\n8n-setup"

echo 🔍 Checking Docker status...
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not running
    echo Please start Docker Desktop first
    goto end
) else (
    echo ✅ Docker is running
)

echo.
echo 🔍 Checking n8n services...
docker-compose ps

echo.
echo 🔍 Checking n8n health...
curl -s http://localhost:5678/healthz >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ n8n is responding on http://localhost:5678
) else (
    echo ⚠️  n8n might still be starting up or not accessible
    echo Try: http://localhost:5678 in your browser
)

echo.
echo 🔍 Container resource usage...
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo.
echo 📋 Quick Commands:
echo   View logs: docker-compose logs -f n8n
echo   Restart: docker-compose restart
echo   Stop: docker-compose down
echo   Open n8n: start http://localhost:5678

:end
echo.
pause
