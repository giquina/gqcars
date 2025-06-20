@echo off
echo 🚀 GQ Cars GitHub Deployment System
echo ==================================

cd /d "C:\Users\Student\Desktop\gqcars-frontend"

echo 📁 Current directory: %CD%

REM Check if it's a git repository
if not exist ".git" (
    echo ❌ Not a Git repository
    echo Initializing Git repository...
    git init
    git branch -M main
    echo ✅ Git repository initialized
)

echo 📋 Checking git status...
git status

echo.
echo 📝 Adding all changes...
git add .

echo.
echo 💾 Creating commit...
set /p commit_message=Enter commit message (or press Enter for default): 

if "%commit_message%"=="" (
    set commit_message=🎯 Complete update: Orange WhatsApp widget + Family Services
)

git commit -m "%commit_message%"

echo.
echo 🌐 Checking remote repository...
git remote -v

echo.
echo ☁️ Pushing to GitHub...
echo If this is the first push, you may need to set up the remote repository
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Successfully pushed to GitHub!
    echo 🎉 All changes are now live on GitHub!
) else (
    echo.
    echo ❌ Push failed. You may need to:
    echo 1. Set up the remote repository: git remote add origin [YOUR_REPO_URL]
    echo 2. Authenticate with GitHub
    echo 3. Check your internet connection
    echo.
    echo To set up remote repository:
    echo git remote add origin https://github.com/yourusername/gqcars-frontend.git
)

echo.
echo 📊 Final git status:
git status

echo.
echo 🎯 Deployment Summary:
echo ✅ WhatsApp widget: Changed to orange colors
echo ✅ Family services: Added comprehensive family protection
echo ✅ Navigation: Updated with family services dropdown  
echo ✅ Homepage: Enhanced with 5-service layout
echo ✅ All files: Committed to Git
echo.

pause
