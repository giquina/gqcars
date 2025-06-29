@echo off
echo ========================================
echo    INSTALLING MCP SYNC DEPENDENCIES
echo ========================================
echo.
echo Installing required packages for MCP synchronization...
echo.

echo 📦 Installing chokidar (file watcher)...
npm install chokidar

echo 📦 Installing node-fetch (HTTP requests)...  
npm install node-fetch

echo 📦 Installing additional MCP tools...
npm install @modelcontextprotocol/sdk

echo.
echo ✅ MCP DEPENDENCIES INSTALLED!
echo.
echo You can now run:
echo   • START-MCP-SYNC.bat (MCP sync only)
echo   • START-EVERYTHING.bat (Website + MCP sync)
echo.
pause
