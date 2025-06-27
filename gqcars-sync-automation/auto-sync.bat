@echo off
echo ========================================
echo GQ Cars Auto-Sync System
echo ========================================

REM Set source and destination paths
set SOURCE_PATH=C:\Users\Student\Desktop\gqcars-frontend
set DESKTOP_PATH=C:\Users\Student\Desktop\gqcars-latest

REM Create destination if it doesn't exist
if not exist "%DESKTOP_PATH%" mkdir "%DESKTOP_PATH%"

echo Syncing latest changes...

REM Copy all files with overwrite
robocopy "%SOURCE_PATH%" "%DESKTOP_PATH%" /E /XO /R:3 /W:1 /NP /NDL /NC /NS

REM Also sync to a timestamped backup
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_PATH=C:\Users\Student\Desktop\gqcars-backups\%TIMESTAMP%

if not exist "C:\Users\Student\Desktop\gqcars-backups" mkdir "C:\Users\Student\Desktop\gqcars-backups"
robocopy "%SOURCE_PATH%" "%BACKUP_PATH%" /E /R:1 /W:1 /NP /NDL /NC /NS

echo.
echo ✅ Sync completed successfully!
echo Latest files available at: %DESKTOP_PATH%
echo Backup created at: %BACKUP_PATH%
echo.
echo Claude can now access your latest changes automatically.
echo ========================================

pause
