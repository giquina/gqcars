# 🔧 GitHub + Git Integration Setup

## Step 1: Install Git (if not already installed)
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. Restart terminal after installation

## Step 2: Configure Git
```bash
git config --global user.name "Muhammad Giquina"
git config --global user.email "aligiquina@gmail.com"
```

## Step 3: Create GitHub Account & Token
1. Go to: https://github.com
2. Sign up with your email: aligiquina@gmail.com
3. Create Personal Access Token:
   - Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token (classic)
   - Name: `n8n-ai-integration`
   - Scopes: Check ALL repo permissions, workflow, admin:org
   - Copy the token (starts with ghp_)

## Step 4: Initialize Your AI Project Repository
```bash
cd C:\Users\Student\Desktop\n8n-setup
git init
git add .
git commit -m "Initial AI development stack setup"
```

## Step 5: Connect to GitHub
```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/ai-development-stack.git
git branch -M main
git push -u origin main
```

## Step 6: Add GitHub Token to Config
Add to your `api-keys-template.env`:
```env
# GitHub Configuration
GITHUB_TOKEN=ghp_your_github_token_here
GITHUB_USERNAME=your_github_username_here
```

## MCP Integration Benefits:
- Claude can directly read your GitHub repos
- Auto-commit code changes with AI-generated commit messages
- Create issues and PRs through AI commands
- Analyze repository statistics and code quality

## Quick Commands:
```bash
# Check Git status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Updated AI workflows"

# Push to GitHub
git push
```
