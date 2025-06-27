# 📝 Notion Integration Setup

## Step 1: Create Notion Account
1. Go to: https://notion.so
2. Sign up with: aligiquina@gmail.com
3. Create a workspace: "AI Development Hub"

## Step 2: Create Notion Integration
1. Go to: https://developers.notion.com/
2. Click "Create new integration"
3. Name: `AI Research Assistant`
4. Workspace: Select your workspace
5. Capabilities: Read, Insert, Update content
6. Copy the Internal Integration Token (starts with secret_)

## Step 3: Create Notion Database Templates
Create these databases in your Notion workspace:

### Database 1: "AI Research Reports"
- **Title** (Title): Research topic
- **Source** (Select): Claude, ChatGPT, Perplexity
- **Date** (Date): When created
- **Summary** (Text): Key findings
- **Full Response** (Text): Complete AI response
- **Status** (Select): New, Reviewed, Archived

### Database 2: "Code Analysis Results"
- **File Name** (Title): Code file analyzed
- **AI Reviewer** (Select): Claude, ChatGPT
- **Severity** (Number): 1-10 severity score
- **Issues Found** (Text): List of issues
- **Suggestions** (Text): Improvement suggestions
- **Date** (Date): Analysis date

### Database 3: "AI Workflow Logs"
- **Workflow** (Title): n8n workflow name
- **Status** (Select): Success, Failed, In Progress
- **Execution Time** (Date): When executed
- **Input** (Text): What was sent to AI
- **Output** (Text): AI response
- **Notes** (Text): Additional observations

## Step 4: Share Databases with Integration
1. Open each database
2. Click "Share" → "Invite"
3. Add your integration: "AI Research Assistant"
4. Give "Full access"

## Step 5: Add Notion Token to Config
Add to your `api-keys-template.env`:
```env
# Notion Configuration
NOTION_TOKEN=secret_your_notion_token_here
NOTION_DATABASE_RESEARCH=your_research_database_id_here
NOTION_DATABASE_CODE=your_code_database_id_here
NOTION_DATABASE_LOGS=your_logs_database_id_here
```

## Step 6: Get Database IDs
1. Open each database in browser
2. Copy the ID from URL: 
   `https://notion.so/workspace/DATABASE_ID?v=...`
3. Add these IDs to your config file

## MCP Integration Benefits:
- AI automatically saves research to Notion
- Create pages with AI-generated content
- Search your knowledge base through AI
- Auto-organize AI outputs into structured databases

## n8n Workflow Integration:
- Every AI research gets saved to "AI Research Reports"
- Code analysis results go to "Code Analysis Results"  
- All workflow executions logged in "AI Workflow Logs"

Your Notion becomes your AI-powered second brain! 🧠
