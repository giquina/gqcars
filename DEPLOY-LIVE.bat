@echo off
echo ========================================
echo    DEPLOY TO LIVE WEBSITE
echo ========================================

cd /d "C:\Users\Student\Desktop\gqcars"

echo 📤 Pushing code to GitHub...
git add .
git commit -m "Updated website - %date% %time%"
git push origin main

echo.
echo ✅ Code pushed to GitHub!
echo.
echo 🌍 To make it live on the internet:
echo 1. Go to vercel.com
echo 2. Sign in with GitHub
echo 3. Import your gqcars repository
echo 4. Click Deploy
echo.

pause
