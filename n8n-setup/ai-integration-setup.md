# AI Development Environment Setup Guide
## Connecting Cursor + Claude + n8n + ChatGPT

This guide will help you ensure all your AI tools are properly connected and working together.

## Current Setup Status ✅
- ✅ WSL (Windows Subsystem for Linux) - Running
- ✅ Docker Desktop - Running with n8n images available
- ✅ n8n - Configured with PostgreSQL backend
- 🔄 Cursor Editor - Need to verify Claude integration
- 🔄 API Connections - Need to set up ChatGPT/OpenAI integration

## 1. Verify n8n is Running

First, start your n8n instance:
```bash
cd /mnt/c/Users/Student/Desktop/n8n-setup
docker-compose up -d
```

Check if n8n is accessible:
- Open browser: http://localhost:5678
- You should see the n8n login/setup page

## 2. Configure Cursor with Claude

### Install Cursor (if not already installed)
1. Download from: https://cursor.sh/
2. Install and launch Cursor

### Configure Claude Integration in Cursor
1. Open Cursor
2. Press `Ctrl+Shift+P` (Command Palette)
3. Type "Cursor: Settings" and select it
4. Go to "AI" or "Models" section
5. Add Anthropic API key:
   - Get API key from: https://console.anthropic.com/
   - Add to Cursor settings under "Anthropic API Key"

### Test Claude Integration
1. Open any code file in Cursor
2. Press `Ctrl+K` to open AI command
3. Type a request like "explain this code"
4. You should see Claude responses

## 3. Set Up OpenAI/ChatGPT Integration in n8n

### Add OpenAI Credentials to n8n
1. Go to n8n interface: http://localhost:5678
2. Click "Settings" → "Credentials"
3. Click "Add Credential"
4. Select "OpenAI API"
5. Enter your OpenAI API key
6. Save the credential

### Create Test Workflow
1. Click "New Workflow"
2. Add "Manual Trigger" node
3. Add "OpenAI Chat Model" node
4. Connect them and configure
5. Test the workflow

## 4. Advanced Integration Setup

### Claude API in n8n (Custom HTTP Requests)
Since n8n doesn't have a native Claude node, use HTTP Request:

```json
{
  "method": "POST",
  "url": "https://api.anthropic.com/v1/messages",
  "headers": {
    "Content-Type": "application/json",
    "x-api-key": "your-anthropic-api-key",
    "anthropic-version": "2023-06-01"
  },
  "body": {
    "model": "claude-3-sonnet-20240229",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user",
        "content": "Your prompt here"
      }
    ]
  }
}
```

## 5. Workflow Integration Examples

### Example 1: AI Code Review Workflow
1. Trigger: Git webhook
2. Process: Send code to Claude for review
3. Action: Post results to Slack/email

### Example 2: Multi-AI Comparison
1. Input: User question
2. Process: Send to both ChatGPT and Claude
3. Output: Compare responses

### Example 3: Cursor + n8n Integration
1. Code changes in Cursor trigger n8n workflow
2. n8n processes with AI
3. Results sent back to project

## 6. Verification Checklist

- [ ] n8n accessible at http://localhost:5678
- [ ] Cursor can access Claude API
- [ ] OpenAI credentials work in n8n
- [ ] Can create basic AI workflows
- [ ] HTTP requests to Claude API work
- [ ] All containers running properly

## 7. Troubleshooting

### n8n Issues
```bash
# Check container status
docker ps

# View n8n logs
docker logs n8n

# Restart if needed
docker-compose restart
```

### Cursor Issues
- Verify API key is correct
- Check internet connection
- Restart Cursor application

### API Issues
- Verify API keys are valid
- Check API usage limits
- Test with simple requests first

## 8. Next Steps

1. Create your first integrated workflow
2. Set up automated code analysis
3. Build AI-powered development pipelines
4. Explore advanced automation scenarios

## Useful Commands

### Docker Management
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild if needed
docker-compose up -d --build
```

### API Testing
```bash
# Test Claude API
curl -X POST https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-3-sonnet-20240229","max_tokens":100,"messages":[{"role":"user","content":"Hello!"}]}'

# Test OpenAI API
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Hello!"}]}'
```

## Environment Variables for API Keys

Add these to your `.env` file:
```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Additional services
GOOGLE_API_KEY=your_google_api_key_here
```

Remember to keep your API keys secure and never commit them to version control!
