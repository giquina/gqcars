@echo off
echo Stopping n8n services...
echo.

docker-compose down

echo.
echo All n8n services have been stopped.
echo.
echo To remove all data (CAUTION!): docker-compose down -v
echo.

pause
