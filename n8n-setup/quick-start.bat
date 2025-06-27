@echo off
echo 🚀 Starting AI Development Environment
echo =====================================

echo Step 1: Starting Docker containers...
docker-compose up -d

echo.
echo Step 2: Waiting for services to start...
timeout /t 10 /nobreak > nul

echo.
echo Step 3: Checking service status...
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo Step 4: Opening n8n in browser...
start http://localhost:5678

echo.
echo 🎉 Environment started successfully!
echo.
echo Next steps:
echo 1. Configure your API keys in n8n (http://localhost:5678)
echo 2. Import the AI comparison workflow
echo 3. Set up Cursor with Claude integration
echo.
echo Useful commands:
echo   - View logs: docker-compose logs -f
echo   - Stop services: docker-compose down
echo   - Restart: docker-compose restart
echo.
echo Press any key to continue...
pause > nul
