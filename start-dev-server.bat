@echo off
echo 🚀 Starting GQ Cars Development Server
echo ====================================

cd /d "C:\Users\Student\Desktop\gqcars-frontend"

echo 📁 Current directory: %CD%

echo 🔍 Checking if package.json exists...
if exist package.json (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found
    pause
    exit /b 1
)

echo 🚀 Starting development server...
echo ⚠️  If server was already running, please stop it first (Ctrl+C)
echo 

npm run dev

pause
