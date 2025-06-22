@echo off
echo ========================================
echo    GQ CARS - COMPLETE DEVELOPMENT SETUP
echo ========================================
echo.
echo This will start:
echo   1. 🌐 Next.js Website (localhost:3000)
echo   2. 🔄 MCP Sync Bridge (Claude Desktop ↔ Cursor)
echo   3. 📱 WhatsApp Widget (Now Orange!)
echo.

echo 🚀 Starting website server...
start "" "START-WEBSITE.bat"

echo ⏱️ Waiting for website to initialize...
timeout /t 5 /nobreak >nul

echo 🔄 Starting MCP sync bridge...
start "" "START-MCP-SYNC.bat"

echo.
echo ✅ COMPLETE SETUP RUNNING!
echo ========================================
echo   🌐 Website: http://localhost:3000
echo   🔄 MCP Sync: Active
echo   🎨 Brand Color: Yellow-500 (Orange)
echo   📱 WhatsApp: Orange Widget
echo.
echo 💡 TIP: Open Cursor and both Claudes will stay in sync!
echo.
pause
