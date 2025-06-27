# 🔑 API Keys Setup Guide

## 1. OpenAI API Key ✅ (You're here now!)
- **Website:** https://platform.openai.com/api-keys
- **Name suggestion:** `n8n-ai-integration`
- **Copy key starting with:** `sk-...`

## 2. Anthropic Claude API Key
- **Website:** https://console.anthropic.com/
- **Steps:**
  1. Sign up/login to Anthropic
  2. Go to "API Keys" section
  3. Click "Create Key"
  4. Name: `cursor-n8n-integration`
  5. Copy key starting with: `sk-ant-...`

## 3. Perplexity API Key
- **Website:** https://www.perplexity.ai/settings/api
- **Steps:**
  1. Sign up/login to Perplexity
  2. Go to Settings → API
  3. Generate new API key
  4. Name: `n8n-research-integration`
  5. Copy key starting with: `pplx-...`

## 4. Add All Keys to Config File

Open: `C:\Users\Student\Desktop\n8n-setup\api-keys-template.env`

Replace the placeholder text with your actual keys:

```env
# Replace these with your actual API keys:
OPENAI_API_KEY=sk-your-actual-openai-key-here
ANTHROPIC_API_KEY=sk-ant-your-actual-anthropic-key-here  
PERPLEXITY_API_KEY=pplx-your-actual-perplexity-key-here
```

## 5. Test Your Setup

Open terminal in your project folder and run:
```bash
npm install
npm run test
```

This will test all API connections!

## 🔒 Security Note
- Never share these keys
- Never commit them to Git
- Keep them secure and private

## ✅ Once All Keys Are Added:
1. Test API connections
2. Import workflows to n8n
3. Configure Cursor with Claude
4. Start building AI automations!
