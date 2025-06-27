@echo off
setlocal enabledelayedexpansion

echo 🤖 AI Development Environment Verification
echo ==========================================
echo.

REM Function to check if Docker container is running
:check_docker_container
set container_name=%1
echo Checking Docker container '%container_name%'...
docker ps --format "table {{.Names}}" | findstr /B /C:"%container_name%" >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ %container_name% is running
) else (
    echo ❌ %container_name% is not running
)
goto :eof

echo 1. 🐳 Docker Environment
echo ------------------------
call :check_docker_container n8n
call :check_docker_container n8n-postgres
call :check_docker_container n8n-redis
echo.

echo 2. 🌐 Service Accessibility
echo ---------------------------
echo Checking n8n Web Interface...
curl -s -o nul -w "HTTP Status: %%{http_code}" http://localhost:5678
echo.
echo.

echo 3. 📁 File System Setup
echo ----------------------
if exist "workflows" (
    echo ✅ workflows directory exists
) else (
    echo ❌ workflows directory missing
)

if exist "credentials" (
    echo ✅ credentials directory exists
) else (
    echo ❌ credentials directory missing
)

if exist "docker-compose.yml" (
    echo ✅ docker-compose.yml exists
) else (
    echo ❌ docker-compose.yml missing
)

if exist ".env" (
    echo ✅ .env file exists
) else (
    echo ❌ .env file missing
)
echo.

echo 4. 🔧 Quick Fixes
echo -----------------
echo If any services are not running, try:
echo   docker-compose up -d
echo.
echo To restart all services:
echo   docker-compose restart
echo.
echo To view logs:
echo   docker-compose logs -f
echo.

echo 5. 🔑 API Configuration
echo ----------------------
echo Please ensure you have set up:
echo   - OpenAI API key in n8n credentials
echo   - Anthropic Claude API key for Cursor
echo   - Any other required API keys
echo.

echo 6. 🚀 Next Steps
echo ---------------
echo 1. Open n8n: http://localhost:5678
echo 2. Configure Cursor with Claude API
echo 3. Create your first AI workflow
echo 4. Test API integrations
echo.

echo 📖 For detailed setup instructions, see:
echo    ai-integration-setup.md
echo.

echo Current Docker containers:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo.

echo Current directory contents:
dir /B
echo.

echo Verification complete! 🎉
echo.
echo Press any key to continue...
pause >nul
