# 🤖 n8n AI Integration Setup Guide
## After Account Creation

Welcome to n8n! Now let's get your AI integrations working.

## Step 1: Add API Credentials

### OpenAI/ChatGPT Integration
1. Click **Settings** (gear icon) in the left sidebar
2. Click **Credentials**
3. Click **Add Credential**
4. Search for **"OpenAI"** and select **"OpenAI API"**
5. Enter your OpenAI API key
6. Name it: `OpenAI-Main`
7. Click **Save**

### Claude Integration (HTTP Request Method)
1. In Credentials, click **Add Credential**
2. Select **"HTTP Header Auth"**
3. Set Header Name: `x-api-key`
4. Set Header Value: `your-anthropic-api-key`
5. Name it: `Claude-API`
6. Click **Save**

## Step 2: Import AI Comparison Workflow

1. Click **Workflows** in the left sidebar
2. Click **Import from File**
3. Navigate to: `C:\Users\Student\Desktop\n8n-setup\workflows\ai-comparison-workflow.json`
4. Click **Import**

## Step 3: Test Your Setup

### Quick Test Workflow
1. Click **Add Workflow**
2. Add **Manual Trigger** node
3. Add **OpenAI** node
4. Connect them
5. Configure OpenAI node with your credentials
6. Test execution

## Step 4: Advanced Configurations

### Enable Webhooks
- Webhook URL: `http://localhost:5678/webhook/`
- Use this for external integrations

### Environment Variables (if needed)
- Available at: Settings → Environment
- Add API keys here for security

## API Keys You'll Need:

### OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and save securely

### Anthropic Claude API Key
1. Go to: https://console.anthropic.com/
2. Create new API key
3. Copy and save securely

## Cursor Integration

### Set up Cursor with Claude
1. Open Cursor IDE
2. Go to Settings (Ctrl+,)
3. Search for "API"
4. Add Anthropic API key
5. Select Claude as your model

### Cursor + n8n Workflow
- Create webhooks in n8n
- Trigger workflows from Cursor
- Automate code analysis and generation

## Troubleshooting

### If APIs don't work:
- Check API key format
- Verify account billing status
- Test with simple requests first

### If containers stop:
```bash
cd C:\Users\Student\Desktop\n8n-setup
docker-compose restart
```

### View logs:
```bash
docker-compose logs -f n8n
```

## Ready-to-Use Workflows

I've created several workflows for you:
- AI Comparison (ChatGPT vs Claude)
- Code Analysis Pipeline
- Automated Documentation
- Multi-Model Testing

Import them from the `workflows` folder!

## Success Indicators ✅

You'll know everything is working when:
- [ ] n8n loads without errors
- [ ] API credentials test successfully
- [ ] Sample workflows execute
- [ ] Cursor can access Claude
- [ ] Webhooks respond correctly

Happy automating! 🚀
