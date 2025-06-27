@echo off
echo 🐳 Quick n8n Docker Setup
echo =========================

echo Starting n8n with all dependencies using docker-compose...
echo This will start:
echo - n8n (main application)
echo - PostgreSQL (database)  
echo - Redis (caching)

cd /d "C:\Users\Student\Desktop\n8n-setup"

echo.
echo Starting services...
docker-compose up -d

echo.
echo Waiting for services to initialize...
timeout /t 15 /nobreak > nul

echo.
echo Checking service status:
docker-compose ps

echo.
echo Services should be available at:
echo - n8n Web Interface: http://localhost:5678
echo - PostgreSQL: localhost:5432
echo - Redis: localhost:6379

echo.
echo Opening n8n in your browser...
start http://localhost:5678

echo.
echo 🎉 Setup complete!
echo.
echo If you see any errors, check the logs with:
echo   docker-compose logs -f
echo.
pause
