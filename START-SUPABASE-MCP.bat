@echo off
echo 🚀 Starting GQ Cars Supabase MCP Server...
echo.

cd /d "C:\Users\Student\Documents\Development_Projects\gqcars-main-production\mcp-lab\mcp-servers\integration\supabase-mcp"

echo ✅ Starting Supabase MCP on port 4050...
start "Supabase MCP" cmd /k "npm start"

echo.
echo 🎯 Supabase MCP Services:
echo   - Health Check: http://localhost:4050/health
echo   - Insert Data:  POST http://localhost:4050/insert
echo   - Query Data:   POST http://localhost:4050/select
echo   - Auth:         POST http://localhost:4050/auth/signin
echo.
echo 📊 Check status in the new window that opened
pause