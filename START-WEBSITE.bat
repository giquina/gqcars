@echo off
echo ========================================
echo    GQ CARS - ONE-CLICK STARTUP
echo ========================================

cd /d "C:\Users\Student\Desktop\gqcars"

echo 🔧 Checking dependencies...
if not exist node_modules\framer-motion (
    echo 📦 Installing missing packages...
    npm install framer-motion @radix-ui/react-slot class-variance-authority clsx --silent
)

echo 🧹 Clearing cache...
if exist .next rmdir /s /q .next

echo 🚀 Starting your website...
echo.
echo ✅ Your website will open at: http://localhost:3000
echo ✅ Mobile test URL: http://192.168.146.81:3000
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:3000
npm run dev
