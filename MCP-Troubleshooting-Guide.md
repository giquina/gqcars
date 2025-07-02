# MCP Server Troubleshooting Guide

This guide provides step-by-step solutions for common MCP (Model Context Protocol) server issues in Claude Desktop.

## Table of Contents

1. [Quick Diagnosis](#quick-diagnosis)
2. [Common Issues & Solutions](#common-issues--solutions)
3. [Server-Specific Issues](#server-specific-issues)
4. [Configuration Problems](#configuration-problems)
5. [Advanced Troubleshooting](#advanced-troubleshooting)
6. [Getting Help](#getting-help)

## Quick Diagnosis

### Step 1: Run the Test Script
```powershell
.\Test-MCP-Servers.ps1 -Detailed
```

This will identify most issues automatically and provide specific recommendations.

### Step 2: Check Claude Desktop
1. Open Claude Desktop
2. Look for MCP servers in the left sidebar
3. Check for error messages or missing servers

### Step 3: Check Configuration File
Verify your configuration file exists at:
```
%APPDATA%\Claude\claude_desktop_config.json
```

## Common Issues & Solutions

### ❌ "Server not found" or "Tool not found"

**Symptoms:**
- MCP server doesn't appear in Claude Desktop
- Error messages about missing tools

**Solutions:**
1. **Check Configuration Path**
   ```powershell
   # Verify config file exists
   Test-Path "$env:APPDATA\Claude\claude_desktop_config.json"
   ```

2. **Validate JSON Format**
   ```powershell
   # Test JSON syntax
   Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json
   ```

3. **Restart Claude Desktop**
   - Close Claude Desktop completely
   - Wait 5 seconds
   - Reopen Claude Desktop

### ❌ "Command not found" Errors

**For Docker-based servers (Notion, Exa):**
```powershell
# Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop/

# Verify Docker installation
docker --version
docker ps
```

**For Node.js-based servers (Playwright, GitHub):**
```powershell
# Install Node.js
# Download from: https://nodejs.org/

# Verify installation
node --version
npm --version
npx --version
```

**For uvx-based servers (Docker MCP):**
```powershell
# Install Python and uv
pip install uv
uv tool install uvx

# Verify installation
uvx --version
```

### ❌ Docker Image Issues

**Symptoms:**
- "Image not found" errors
- Docker containers failing to start

**Solutions:**
```powershell
# Pull required Docker images
docker pull mcp/notion
docker pull mcp/exa

# Verify images are available
docker images | findstr mcp

# If Docker daemon isn't running
# Start Docker Desktop application
```

### ❌ Authentication/Token Errors

**For Notion MCP:**
1. Verify token format: `ntn_[50 characters]`
2. Check Notion integration permissions
3. Test token manually:
   ```powershell
   # Test Notion API access
   $headers = @{'Authorization' = 'Bearer YOUR_TOKEN'; 'Notion-Version' = '2022-06-28'}
   Invoke-RestMethod -Uri 'https://api.notion.com/v1/users/me' -Headers $headers
   ```

**For GitHub MCP:**
1. Token should start with `ghp_` or `github_pat_`
2. Ensure token has required permissions (repo, read:user)
3. Test token:
   ```powershell
   # Test GitHub API access
   $headers = @{'Authorization' = 'Bearer YOUR_TOKEN'}
   Invoke-RestMethod -Uri 'https://api.github.com/user' -Headers $headers
   ```

**For Exa MCP:**
1. API key should be 32+ alphanumeric characters
2. Test API key:
   ```powershell
   # Test Exa API access
   $headers = @{'x-api-key' = 'YOUR_API_KEY'; 'Content-Type' = 'application/json'}
   $body = '{"query": "test", "num_results": 1}'
   Invoke-RestMethod -Uri 'https://api.exa.ai/search' -Headers $headers -Method Post -Body $body
   ```

## Server-Specific Issues

### Notion MCP Server

**Issue: "INTERNAL_INTEGRATION_TOKEN not found"**
```json
{
  "notion": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "-e", "INTERNAL_INTEGRATION_TOKEN", "mcp/notion"],
    "env": {
      "INTERNAL_INTEGRATION_TOKEN": "ntn_YOUR_ACTUAL_TOKEN_HERE"
    }
  }
}
```

**Issue: Docker container exits immediately**
- Check if Docker Desktop is running
- Verify the mcp/notion image exists: `docker images | findstr notion`
- Check Docker logs: `docker logs [container-id]`

### Playwright MCP Server

**Issue: Package not found**
```powershell
# Install globally
npm install -g @playwright/mcp@latest

# Or ensure npx can download it
npx @playwright/mcp@latest --help
```

**Issue: Browser installation required**
```powershell
# Install Playwright browsers
npx playwright install
```

### Docker MCP Server

**Issue: uvx command not found**
```powershell
# Install uv and uvx
pip install uv
uv tool install uvx

# Add to PATH if needed
$env:PATH += ";$env:USERPROFILE\.local\bin"
```

**Issue: Docker daemon not accessible**
- Start Docker Desktop
- Check Docker daemon: `docker ps`
- Verify Docker service is running

### GitHub MCP Server

**Issue: Rate limiting**
- Use a personal access token instead of unauthenticated requests
- Ensure token has appropriate scopes

**Issue: Package installation fails**
```powershell
# Clear npm cache and retry
npm cache clean --force
npm install -g @modelcontextprotocol/server-github
```

### Exa MCP Server

**Issue: API key validation fails**
- Check API key format (no spaces, correct length)
- Verify API key is active in Exa dashboard
- Test with curl or PowerShell

## Configuration Problems

### Invalid JSON Syntax

**Common mistakes:**
```json
// ❌ Wrong - trailing comma
{
  "mcpServers": {
    "notion": { ... },
  }
}

// ❌ Wrong - missing quotes
{
  mcpServers: {
    notion: { ... }
  }
}

// ✅ Correct
{
  "mcpServers": {
    "notion": { ... }
  }
}
```

### Incorrect Command Arguments

**Common mistakes:**
```json
// ❌ Wrong Notion configuration
"notion": {
  "command": "docker",
  "args": ["run", "--rm", "-i", "notionhq/notion-mcp-server"]
}

// ✅ Correct Notion configuration
"notion": {
  "command": "docker",
  "args": ["run", "-i", "--rm", "-e", "INTERNAL_INTEGRATION_TOKEN", "mcp/notion"]
}
```

### Environment Variable Issues

**Common mistakes:**
```json
// ❌ Wrong - environment variable name mismatch
"notion": {
  "args": ["run", "-i", "--rm", "-e", "NOTION_API_KEY", "mcp/notion"],
  "env": {
    "INTERNAL_INTEGRATION_TOKEN": "ntn_..."
  }
}

// ✅ Correct - matching environment variable names
"notion": {
  "args": ["run", "-i", "--rm", "-e", "INTERNAL_INTEGRATION_TOKEN", "mcp/notion"],
  "env": {
    "INTERNAL_INTEGRATION_TOKEN": "ntn_..."
  }
}
```

## Advanced Troubleshooting

### Enable Debug Logging

1. **Claude Desktop Logs**
   - Check Claude Desktop application logs
   - Look for MCP-related error messages

2. **Docker Container Logs**
   ```powershell
   # For Docker-based servers
   docker ps -a  # Find container ID
   docker logs [container-id]
   ```

3. **Node.js Debugging**
   ```powershell
   # Add debug environment variable
   $env:DEBUG = "*"
   npx @playwright/mcp@latest
   ```

### Network Issues

**Firewall/Proxy Problems:**
```powershell
# Test network connectivity
Test-NetConnection api.notion.com -Port 443
Test-NetConnection api.github.com -Port 443
Test-NetConnection api.exa.ai -Port 443

# For corporate networks, configure proxy
$env:HTTP_PROXY = "http://proxy.company.com:8080"
$env:HTTPS_PROXY = "http://proxy.company.com:8080"
```

### Permission Issues

**Windows Execution Policy:**
```powershell
# If PowerShell scripts are blocked
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Docker Permissions:**
```powershell
# If Docker commands fail with permission errors
# Add your user to Docker Users group in Windows
# Restart after making the change
```

### Memory/Resource Issues

**For resource-intensive servers:**
```json
{
  "notion": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "--memory=512m", "-e", "INTERNAL_INTEGRATION_TOKEN", "mcp/notion"]
  }
}
```

## Configuration Validation Checklist

### ✅ Pre-deployment Checklist

- [ ] **Prerequisites installed**: Docker, Node.js, Python/uv
- [ ] **Configuration file location**: `%APPDATA%\Claude\claude_desktop_config.json`
- [ ] **JSON syntax valid**: No trailing commas, proper quotes
- [ ] **Docker images pulled**: `mcp/notion`, `mcp/exa`
- [ ] **Node packages available**: Can run via npx
- [ ] **Tokens configured**: All required environment variables set
- [ ] **Tokens validated**: API calls work with provided credentials
- [ ] **Claude Desktop restarted**: After configuration changes

### ✅ Post-deployment Verification

- [ ] **Servers appear in Claude Desktop**: All configured servers visible
- [ ] **No error messages**: Check Claude Desktop for errors
- [ ] **Basic functionality**: Can invoke tools from each server
- [ ] **Test script passes**: `.\Test-MCP-Servers.ps1` shows all green

## Recovery Procedures

### Complete Reset

If everything is broken, start fresh:

```powershell
# 1. Backup current config
Copy-Item "$env:APPDATA\Claude\claude_desktop_config.json" "$env:APPDATA\Claude\claude_desktop_config.backup.json"

# 2. Remove current config
Remove-Item "$env:APPDATA\Claude\claude_desktop_config.json"

# 3. Run setup script
.\Setup-All-MCP-Servers.ps1 -GitHubToken "YOUR_TOKEN" -ExaApiKey "YOUR_KEY"

# 4. Test configuration
.\Test-MCP-Servers.ps1 -Detailed
```

### Partial Recovery

To fix specific servers:

```powershell
# Test specific server only
.\Test-MCP-Servers.ps1 -ServersToTest @("notion") -Detailed

# Reinstall specific dependencies
docker pull mcp/notion  # For Docker-based servers
npm install -g @playwright/mcp@latest  # For Node.js servers
```

## Getting Help

### Automated Diagnostics

```powershell
# Run comprehensive test with full details
.\Test-MCP-Servers.ps1 -Detailed -Interactive

# Save diagnostic output
.\Test-MCP-Servers.ps1 -Detailed 2>&1 | Tee-Object -FilePath "mcp-diagnostics.txt"
```

### Manual Debugging

1. **Check each dependency individually**:
   ```powershell
   docker --version
   node --version
   uvx --version
   ```

2. **Test API connections manually**:
   ```powershell
   # Test each API endpoint with your tokens
   ```

3. **Validate configuration step by step**:
   ```powershell
   # Check JSON syntax, file permissions, etc.
   ```

### Support Resources

- **Claude Desktop Documentation**: Check official Anthropic documentation
- **MCP Protocol Specification**: Reference the MCP standard
- **Docker Documentation**: For Docker-related issues
- **Node.js Documentation**: For npm/npx issues

### Collecting Debug Information

Before asking for help, collect:

1. **System Information**:
   ```powershell
   Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, TotalPhysicalMemory
   docker --version
   node --version
   ```

2. **Configuration File**:
   ```powershell
   # Sanitize tokens before sharing
   Get-Content "$env:APPDATA\Claude\claude_desktop_config.json"
   ```

3. **Test Results**:
   ```powershell
   .\Test-MCP-Servers.ps1 -Detailed > test-results.txt 2>&1
   ```

4. **Error Messages**: Full error text from Claude Desktop or command line

Remember to **remove sensitive tokens** before sharing diagnostic information!

## Quick Reference Commands

```powershell
# Full setup from scratch
.\Setup-All-MCP-Servers.ps1 -GitHubToken "ghp_xxx" -ExaApiKey "exa_xxx"

# Test all servers
.\Test-MCP-Servers.ps1 -Detailed

# Test specific server
.\Test-MCP-Servers.ps1 -ServersToTest @("notion") -Detailed

# Validate configuration
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json

# Restart Claude Desktop (close and reopen)
taskkill /f /im "Claude.exe" 2>$null; Start-Sleep 2; Start-Process "Claude"
```