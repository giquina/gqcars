@echo off
echo ========================================
echo    GQ CARS - MCP SYNC BRIDGE STARTER
echo ========================================
echo.
echo 🔄 Starting Claude Desktop ↔ Cursor Sync...
echo.
echo This will enable real-time synchronization between:
echo   • Claude Desktop (file operations)
echo   • Cursor Claude (code editing)
echo   • Project files (automatic detection)
echo.
echo 📁 Project: GQ Cars LTD
echo 🎨 Brand: Yellow-500 (Orange/Yellow)
echo 📱 Phone: 07407 655 203
echo.
pause

echo 🚀 Starting MCP sync bridge...
node mcp-sync-bridge.js

echo.
echo 🛑 MCP Sync Bridge stopped
pause
