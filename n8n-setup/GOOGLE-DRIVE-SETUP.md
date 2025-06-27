# 📁 Google Drive AI Integration Setup

## Step 1: Enable Google Drive API
1. Go to: https://console.cloud.google.com/
2. Create new project: "AI Development Stack"
3. Enable APIs:
   - Google Drive API
   - Google Sheets API  
   - Google Docs API
   - Google Apps Script API

## Step 2: Create Service Account
1. Go to: APIs & Services → Credentials
2. Create Credentials → Service Account
3. Name: `ai-integration-service`
4. Role: `Editor`
5. Create key → JSON format
6. Download the JSON file

## Step 3: Share Drive Folders
Create these folders in your Google Drive and share with service account:

### 📂 **AI Research Archive**
- **Path**: `/AI Development/Research`
- **Purpose**: Store all AI research outputs
- **Structure**:
  ```
  Research/
  ├── 2025-06-07/
  │   ├── claude-responses/
  │   ├── chatgpt-responses/
  │   └── perplexity-responses/
  └── combined-reports/
  ```

### 📂 **Code Analysis Results** 
- **Path**: `/AI Development/Code Analysis`
- **Purpose**: Store code review outputs
- **Structure**:
  ```
  Code Analysis/
  ├── daily-reviews/
  ├── security-audits/
  └── performance-reports/
  ```

### 📂 **AI Generated Content**
- **Path**: `/AI Development/Generated Content`
- **Purpose**: Store AI-created documents, reports, etc.

## Step 4: Configure n8n Google Drive Integration
Add to your `api-keys-template.env`:
```env
# Google Drive Configuration
GOOGLE_DRIVE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_DRIVE_PRIVATE_KEY=your-private-key-here
GOOGLE_DRIVE_PROJECT_ID=your-project-id

# Folder IDs (get from Drive URLs)
GOOGLE_DRIVE_RESEARCH_FOLDER=1AbCdEfGhIjKlMnOpQrStUvWxYz
GOOGLE_DRIVE_CODE_FOLDER=1BcDeFgHiJkLmNoPqRsTuVwXyZ
GOOGLE_DRIVE_CONTENT_FOLDER=1CdEfGhIjKlMnOpQrStUvWxYzA
```

## Step 5: MCP Configuration for Claude Desktop
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-gdrive"
      ],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "./google-service-account.json"
      }
    }
  }
}
```

## Step 6: Workflow Integration Benefits

### 🔄 **Auto-File Organization:**
- AI research → Automatically saved to dated folders
- Code analysis → Organized by project and severity
- Generated content → Categorized by type and purpose

### 📊 **Smart File Management:**
- Duplicate detection and merging
- Automatic tagging and metadata
- Version control for AI-generated content

### 🔍 **Powerful Search:**
- Find AI research by keywords, date, or model
- Locate code analysis by file or issue type
- Search generated content by topic or format

## Step 7: Advanced Features

### 📱 **Mobile Access:**
- Access AI research on your phone
- Review code analysis on the go
- Share AI insights with anyone

### 🤝 **Team Collaboration:**
- Share AI research with colleagues
- Collaborate on AI-generated content
- Track team AI usage and insights

### 🔄 **Backup & Sync:**
- All AI content automatically backed up
- Sync across all your devices
- Never lose AI research or analysis

Your Google Drive becomes the central hub for all AI activities! 📁✨
