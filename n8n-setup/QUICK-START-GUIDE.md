# 🔧 QUICK SETUP GUIDE

## 🚀 GET EVERYTHING WORKING IN 10 MINUTES:

### STEP 1: Install Dependencies (2 minutes)
```bash
cd n8n-setup
npm install
```

### STEP 2: Add API Keys (5 minutes)
1. Copy `.env.template` to `.env`
2. Add your API keys:
   - **Vectara**: Sign up at vectara.com
   - **Vercel**: Get token from vercel.com/account/tokens  
   - **Google**: Create service account at console.cloud.google.com
   - **GitHub**: Personal access token from github.com/settings/tokens
   - **Cursor**: Usually `C:\\Users\\Student\\AppData\\Local\\Programs\\cursor\\Cursor.exe`

### STEP 3: Configure Claude (2 minutes)
1. Copy `claude_desktop_config.json`
2. Paste to: `%APPDATA%\\Claude\\claude_desktop_config.json`
3. Restart Claude Desktop

### STEP 4: Start Services (1 minute)
```bash
npm start
```

## ✅ VERIFICATION:

Try this Claude prompt:
```
"Claude, test all MCP integrations and tell me what's working"
```

If Claude can see the new tools, you're ready! 🎉

## 🎯 EXAMPLE PROMPTS TO TRY:

1. **"Claude, create a simple React app and show me the code in Cursor"**
2. **"Claude, index our conversation in Vectara for future reference"**  
3. **"Claude, create a project summary document in Google Docs"**
4. **"Claude, deploy a static website to Vercel"**

---

**🚀 That's it! You now control everything through Claude prompts!**