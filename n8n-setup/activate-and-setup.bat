@echo off
echo 🤖 Setting up AI Integrations in n8n
echo ===================================

echo.
echo Your n8n is ready! Now let's add AI capabilities.
echo.
echo License Key: 45540fc0-b55c-4e06-bcc8-7001d06f9a9b
echo.

echo Step 1: Open n8n Settings
echo -------------------------
echo 1. Go to http://localhost:5678
echo 2. Click on Settings (gear icon)
echo 3. Go to "Usage and Plan"
echo 4. Enter your license key if not already activated
echo.

echo Step 2: Add AI Credentials
echo -------------------------
echo.
echo For OpenAI/ChatGPT:
echo 1. Settings → Credentials → Add Credential
echo 2. Search "OpenAI" → Select "OpenAI API"
echo 3. Enter your OpenAI API key
echo 4. Name: "OpenAI-Main"
echo 5. Save
echo.

echo For Claude API:
echo 1. Settings → Credentials → Add Credential  
echo 2. Select "HTTP Header Auth"
echo 3. Header Name: x-api-key
echo 4. Header Value: [Your Anthropic API Key]
echo 5. Name: "Claude-API"
echo 6. Save
echo.

echo Step 3: Import AI Workflows
echo ---------------------------
echo I've created ready-to-use workflows for you:
echo.
dir /b workflows\*.json
echo.

echo Step 4: Test Everything
echo ----------------------
echo 1. Create a simple workflow
echo 2. Add Manual Trigger + OpenAI node
echo 3. Test execution
echo.

echo 🚀 Ready to start automating with AI!
echo.
pause
