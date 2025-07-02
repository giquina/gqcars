# Complete MCP Server Setup & Fix Solution

This solution provides a comprehensive, automated setup for all 5 MCP (Model Context Protocol) servers in Claude Desktop on Windows. It fixes common configuration issues and ensures all servers are properly working.

## 🎯 What This Solution Provides

### ✅ **Automated Setup**
- **5 MCP Servers**: Notion, Playwright, Docker MCP, GitHub, and Exa
- **One-Click Installation**: Single PowerShell script installs everything
- **Dependency Management**: Automatically installs required packages and Docker images
- **Token Validation**: Verifies all API tokens before configuration

### ✅ **Comprehensive Testing**
- **Individual Server Tests**: Tests each server's specific requirements
- **Functional Validation**: Confirms servers actually work, not just installed
- **Detailed Reporting**: Clear pass/fail status with specific recommendations
- **Troubleshooting Guide**: Step-by-step fixes for common issues

### ✅ **Production Ready**
- **Error Handling**: Robust error handling and recovery procedures
- **Logging**: Detailed logs for debugging issues
- **Backup & Recovery**: Automatic config backup before changes
- **Idempotent**: Safe to run multiple times

## 📋 Quick Start

### Prerequisites
1. **Windows 10/11** with PowerShell 5.1+
2. **Docker Desktop** installed and running
3. **Node.js** (v16+) with npm/npx
4. **Python** with pip (for uvx installation)

### Installation

#### 1. **Download the Scripts**
```powershell
# Navigate to your preferred directory
cd "C:\YourWorkingDirectory"

# Scripts should be in the same directory:
# - Setup-All-MCP-Servers.ps1
# - Test-MCP-Servers.ps1  
# - claude_desktop_config_template.json
# - MCP-Troubleshooting-Guide.md
```

#### 2. **Run Setup with Your Tokens**
```powershell
# Basic setup (Notion + Playwright + Docker MCP only)
.\Setup-All-MCP-Servers.ps1

# Full setup with all 5 servers
.\Setup-All-MCP-Servers.ps1 -GitHubToken "ghp_YOUR_GITHUB_TOKEN" -ExaApiKey "YOUR_EXA_API_KEY"

# Skip token validation if you want to configure manually later
.\Setup-All-MCP-Servers.ps1 -SkipTokenValidation
```

#### 3. **Test the Installation**
```powershell
# Quick test
.\Test-MCP-Servers.ps1

# Detailed test with full output
.\Test-MCP-Servers.ps1 -Detailed

# Interactive mode (pause between servers)
.\Test-MCP-Servers.ps1 -Detailed -Interactive
```

#### 4. **Restart Claude Desktop**
- Close Claude Desktop completely
- Wait 5 seconds  
- Reopen Claude Desktop
- All 5 servers should appear in the sidebar

## 🛠️ Server Details

### **1. Notion MCP Server** ✅
- **Purpose**: Access and manage Notion databases and pages
- **Technology**: Docker container (`mcp/notion`)
- **Authentication**: Notion integration token (`ntn_...`)
- **Capabilities**: Read/write Notion content, search databases

### **2. Playwright MCP Server** ✅  
- **Purpose**: Web browser automation and testing
- **Technology**: Node.js package (`@playwright/mcp@latest`)
- **Authentication**: None required
- **Capabilities**: Control browsers, take screenshots, scrape websites

### **3. Docker MCP Server** ✅
- **Purpose**: Manage Docker containers and images
- **Technology**: Python uvx tool (`docker-mcp`)
- **Authentication**: Docker daemon access
- **Capabilities**: List containers, manage images, container operations

### **4. GitHub MCP Server** ✅
- **Purpose**: Interact with GitHub repositories and issues
- **Technology**: Node.js package (`@modelcontextprotocol/server-github`)
- **Authentication**: GitHub personal access token
- **Capabilities**: Repository operations, issue management, code search

### **5. Exa MCP Server** ✅
- **Purpose**: Advanced web search and content discovery
- **Technology**: Docker container (`mcp/exa`)
- **Authentication**: Exa API key
- **Capabilities**: Semantic search, content analysis, web discovery

## 🔧 Configuration Details

### **Final Configuration Structure**
The setup creates this configuration at `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "notion": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "INTERNAL_INTEGRATION_TOKEN", "mcp/notion"],
      "env": {"INTERNAL_INTEGRATION_TOKEN": "ntn_F20499864643jqMFipY5LNc3nG0FcKkoIUOJviWq8pt13z"}
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "docker-mcp": {
      "command": "uvx",
      "args": ["docker-mcp"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"}
    },
    "exa": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "EXA_API_KEY", "mcp/exa"],
      "env": {"EXA_API_KEY": "YOUR_EXA_API_KEY"}
    }
  }
}
```

### **Key Configuration Fixes**
The solution fixes these common issues from existing configurations:

| Issue | Wrong Configuration | Correct Configuration |
|-------|-------------------|----------------------|
| **Notion Docker Image** | `notionhq/notion-mcp-server` | `mcp/notion` |
| **Notion Token Variable** | `NOTION_API_KEY` | `INTERNAL_INTEGRATION_TOKEN` |
| **Playwright Package** | `@modelcontextprotocol/server-playwright` | `@playwright/mcp@latest` |
| **Docker MCP Command** | `npx @modelcontextprotocol/server-docker` | `uvx docker-mcp` |
| **Missing Servers** | GitHub and Exa not configured | All 5 servers included |

## 📊 Testing & Validation

### **Automated Testing**
The `Test-MCP-Servers.ps1` script performs these tests:

#### **Per-Server Tests**
- ✅ **Command Availability**: Verifies docker/npx/uvx commands exist
- ✅ **Package/Image Availability**: Confirms packages are installed/images pulled
- ✅ **Environment Variables**: Checks required tokens are configured
- ✅ **Token Format Validation**: Validates token formats match expected patterns
- ✅ **Functional Testing**: Attempts to start each server and verify response

#### **System Tests**
- ✅ **Configuration Validity**: JSON syntax and structure validation
- ✅ **Dependency Check**: All prerequisites installed and accessible
- ✅ **Permission Validation**: Docker daemon access, PowerShell execution policy
- ✅ **Network Connectivity**: API endpoints accessible

### **Test Output Example**
```
============================================================================
                              TEST SUMMARY
============================================================================

Overall Results:
  Total Tests: 20
  Passed: 20
  Failed: 0
  Success Rate: 100.0%

Results by Server:
  ✅ notion: 4/4 tests passed
  ✅ playwright: 2/2 tests passed  
  ✅ docker-mcp: 3/3 tests passed
  ✅ github: 4/4 tests passed
  ✅ exa: 4/4 tests passed

🎉 All tests passed! Your MCP servers are configured correctly.
```

## 🚨 Common Issues & Quick Fixes

### **Issue: "Server not found"**
```powershell
# Quick fix
.\Test-MCP-Servers.ps1 -ServersToTest @("server-name") -Detailed
# Follow the specific recommendations provided
```

### **Issue: Docker containers failing**
```powershell
# Check Docker is running
docker ps

# Pull missing images
docker pull mcp/notion
docker pull mcp/exa
```

### **Issue: Node.js packages not found**
```powershell
# Install packages globally
npm install -g @playwright/mcp@latest
npm install -g @modelcontextprotocol/server-github
```

### **Issue: uvx command not found**
```powershell
# Install uv and uvx
pip install uv
uv tool install uvx
```

### **Issue: Token authentication fails**
- Check token format matches requirements
- Verify tokens are active in respective services
- Test tokens manually using provided validation commands

## 📁 File Structure

```
MCP-Setup-Solution/
├── Setup-All-MCP-Servers.ps1           # Main setup script
├── Test-MCP-Servers.ps1                # Comprehensive testing script
├── claude_desktop_config_template.json  # Perfect configuration template
├── MCP-Troubleshooting-Guide.md        # Detailed troubleshooting guide
├── MCP-Setup-README.md                 # This documentation
└── logs/                               # Generated during execution
    ├── MCP-Setup-YYYYMMDD-HHMMSS.log   # Setup logs
    └── MCP-Test-YYYYMMDD-HHMMSS.log    # Test logs
```

## ⚙️ Advanced Usage

### **Environment Variables**
You can set tokens via environment variables instead of command line:

```powershell
# Set environment variables
$env:GITHUB_TOKEN = "ghp_your_github_token"
$env:EXA_API_KEY = "your_exa_api_key"

# Run setup (will automatically use environment variables)
.\Setup-All-MCP-Servers.ps1
```

### **Selective Server Setup**
Modify the setup script to install only specific servers by editing the configuration generation function.

### **Custom Configuration**
Use the `claude_desktop_config_template.json` as a starting point for manual configuration.

### **Automated Deployment**
Integrate into larger deployment scripts:

```powershell
# Example: Automated deployment
try {
    .\Setup-All-MCP-Servers.ps1 -GitHubToken $GitHubToken -ExaApiKey $ExaApiKey
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MCP setup successful"
        .\Test-MCP-Servers.ps1
    } else {
        Write-Host "❌ MCP setup failed"
        exit 1
    }
} catch {
    Write-Host "❌ Setup error: $($_.Exception.Message)"
    exit 1
}
```

## 🔒 Security Considerations

### **Token Storage**
- Tokens are stored in the Claude Desktop configuration file
- File is located in user's AppData directory (user-accessible only)
- Consider using environment variables for production deployments

### **Network Security**
- All API communications use HTTPS
- Docker containers run with minimal privileges
- No persistent storage for Docker containers (`--rm` flag)

### **Validation**
- All tokens are validated before configuration
- API endpoints are tested for connectivity
- Input validation prevents command injection

## 📈 Monitoring & Maintenance

### **Regular Testing**
Run the test script periodically to ensure servers remain functional:

```powershell
# Weekly health check
.\Test-MCP-Servers.ps1 -Detailed | Out-File "weekly-health-check.txt"
```

### **Log Monitoring**
Check generated logs for issues:
- Setup logs: `$env:TEMP\MCP-Setup-*.log`
- Test logs: `$env:TEMP\MCP-Test-*.log`

### **Updates**
- Docker images: `docker pull mcp/notion && docker pull mcp/exa`
- Node packages: `npm update -g @playwright/mcp@latest @modelcontextprotocol/server-github`
- uvx packages: `uv tool upgrade docker-mcp`

## 🎯 Success Criteria

After running the setup, you should have:

### **✅ In Claude Desktop**
- All 5 MCP servers visible in the left sidebar
- No error messages or warnings
- Servers respond when selected

### **✅ Functional Capabilities**
- **Notion**: Can search and access your Notion workspace
- **Playwright**: Can automate browser tasks and take screenshots  
- **Docker**: Can list and manage Docker containers
- **GitHub**: Can search repositories and manage issues
- **Exa**: Can perform advanced web searches

### **✅ Test Results**
- All tests pass in the test script
- No failed validations or missing dependencies
- Clean bill of health from automated diagnostics

## 🆘 Support & Troubleshooting

### **Step-by-Step Troubleshooting**
1. **Run the test script**: `.\Test-MCP-Servers.ps1 -Detailed`
2. **Check the troubleshooting guide**: `MCP-Troubleshooting-Guide.md`
3. **Review the logs**: Check the latest log files in `$env:TEMP`
4. **Verify prerequisites**: Ensure Docker, Node.js, and Python are installed

### **Getting Help**
When asking for help, provide:
1. **Test script output**: Run with `-Detailed` flag
2. **System information**: Windows version, Docker version, Node.js version
3. **Error messages**: Full error text from Claude Desktop or command line
4. **Configuration**: Your `claude_desktop_config.json` (remove sensitive tokens)

### **Recovery Procedures**
If everything breaks:

```powershell
# Complete reset
Remove-Item "$env:APPDATA\Claude\claude_desktop_config.json" -Force
.\Setup-All-MCP-Servers.ps1 -Force -GitHubToken "YOUR_TOKEN" -ExaApiKey "YOUR_KEY"
.\Test-MCP-Servers.ps1 -Detailed
```

## 🔄 Version History

- **v1.0**: Initial release with all 5 MCP servers
- **Features**: Automated setup, comprehensive testing, troubleshooting guide
- **Compatibility**: Windows 10/11, Claude Desktop, Docker Desktop

## 📞 Credits & License

This solution was created to solve common MCP server configuration issues in Claude Desktop. It's provided as-is for educational and productivity purposes.

**Key improvements over manual setup:**
- ✅ Fixes all common configuration errors
- ✅ Provides automated validation and testing
- ✅ Includes comprehensive troubleshooting
- ✅ Production-ready with error handling and logging
- ✅ Supports all 5 major MCP servers in one solution

---

**🚀 Ready to get started?**

```powershell
# Run this command to set up all 5 MCP servers:
.\Setup-All-MCP-Servers.ps1 -GitHubToken "YOUR_GITHUB_TOKEN" -ExaApiKey "YOUR_EXA_API_KEY"
```

Your Claude Desktop will be supercharged with all 5 MCP servers in minutes! 🎉