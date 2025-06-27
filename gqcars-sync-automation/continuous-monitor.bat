@echo off
echo ========================================
echo GQ Cars Continuous Sync Monitor
echo ========================================
echo This will monitor your project and auto-sync every 30 seconds
echo Press Ctrl+C to stop monitoring
echo ========================================

:loop
call "C:\Users\Student\Desktop\gqcars-sync-automation\auto-sync.bat"
echo Waiting 30 seconds before next sync...
timeout /t 30 /nobreak > nul
goto loop
