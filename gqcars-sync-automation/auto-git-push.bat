@echo off
echo 🚀 GQ Cars Auto Git Push System
echo =================================

REM Navigate to project directory
cd /d "C:\Users\Student\Desktop\gqcars-frontend"

REM Check if git repository exists
if not exist ".git" (
    echo ❌ Not a Git repository
    pause
    exit /b 1
)

REM Add all changes
echo 📁 Adding all changes...
git add .

REM Get current timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "TIMESTAMP=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

REM Create commit message
set "COMMIT_MSG=Auto-update: %TIMESTAMP% - WhatsApp widget theme fix + automation setup"

REM Commit changes
echo 💾 Committing changes...
git commit -m "%COMMIT_MSG%"

REM Push to origin
echo ☁️ Pushing to remote repository...
git push origin main

echo ✅ Git push completed successfully!
echo 🔄 All changes synced to repository
echo =================================

REM Also trigger our sync system
echo 🔄 Triggering local sync...
call "C:\Users\Student\Desktop\gqcars-sync-automation\auto-sync.bat"

echo 🎉 Complete automation cycle finished!
pause
