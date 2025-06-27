@echo off
echo ========================================
echo GQ Cars Auto-Sync Setup
echo ========================================

REM Run initial sync
echo Setting up automated sync system...
call "C:\Users\Student\Desktop\gqcars-sync-automation\auto-sync.bat"

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Your options:
echo.
echo 1. Run: continuous-monitor.bat (auto-sync every 30 seconds)
echo 2. Run: advanced-sync.ps1 (real-time file monitoring)
echo 3. Run: auto-sync.bat (manual sync when needed)
echo.
echo Recommendation: Run advanced-sync.ps1 for best performance
echo.
echo Claude will now always have access to your latest changes!
echo ========================================

pause
