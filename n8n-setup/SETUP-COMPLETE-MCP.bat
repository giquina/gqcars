@echo off
echo 🚀 Complete MCP System Setup
echo =============================

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔧 Installing global MCP servers...
call npm run install-mcp

echo.
echo 📋 Setting up configuration...
if not exist .env (
    copy .env.template .env
    echo ⚠️  Please edit .env file with your API keys
)

echo.
echo 🧪 Testing integrations...
call npm run test

echo.
echo 🚀 Starting all MCP services...
call npm start

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Edit .env file with your API keys
echo 2. Copy claude_desktop_config.json to Claude Desktop
echo 3. Restart Claude Desktop
echo 4. Start using Claude prompts!
echo.
pause