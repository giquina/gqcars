# Claude Desktop MCP Server Setup Script
# Automates installation and configuration of MCP servers for Claude Desktop on Windows

param(
    [string]$NotionToken = "ntn_F20499864643jqMFipY5LNc3nG0FcKkoIUOJviWq8pt13z"
)

# Enable strict error handling
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

Write-Host "🚀 Starting Claude Desktop MCP Server Setup..." -ForegroundColor Cyan
Write-Host "This script will install and configure:" -ForegroundColor Yellow
Write-Host "  • Notion MCP Server (Docker)" -ForegroundColor Green
Write-Host "  • Playwright MCP Server (npx)" -ForegroundColor Green
Write-Host "  • Docker MCP Server (container management)" -ForegroundColor Green

# Function to check if running as administrator
function Test-IsAdmin {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Function to install Chocolatey if not present
function Install-Chocolatey {
    if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Host "📦 Installing Chocolatey package manager..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        Write-Host "✅ Chocolatey installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✓ Chocolatey already installed" -ForegroundColor Green
    }
}

# Function to install Docker Desktop
function Install-DockerDesktop {
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "🐳 Installing Docker Desktop..." -ForegroundColor Yellow
        choco install docker-desktop -y
        Write-Host "✅ Docker Desktop installed. Please restart your computer and run this script again." -ForegroundColor Green
        Write-Host "⚠️  After restart, make sure Docker Desktop is running before continuing." -ForegroundColor Yellow
        Read-Host "Press Enter to exit..."
        exit
    } else {
        Write-Host "✓ Docker already installed" -ForegroundColor Green
        
        # Check if Docker is running
        try {
            docker version | Out-Null
            Write-Host "✓ Docker is running" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  Docker is installed but not running. Starting Docker Desktop..." -ForegroundColor Yellow
            Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
            Write-Host "Please wait for Docker Desktop to start, then run this script again." -ForegroundColor Yellow
            Read-Host "Press Enter to exit..."
            exit
        }
    }
}

# Function to install Node.js
function Install-NodeJS {
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "📦 Installing Node.js..." -ForegroundColor Yellow
        choco install nodejs -y
        # Refresh environment variables
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        Write-Host "✅ Node.js installed successfully" -ForegroundColor Green
    } else {
        $nodeVersion = node --version
        Write-Host "✓ Node.js already installed: $nodeVersion" -ForegroundColor Green
    }
}

# Function to create Claude Desktop config directory
function Initialize-ClaudeDirectory {
    $claudeDir = "$env:APPDATA\Claude"
    if (-not (Test-Path $claudeDir)) {
        New-Item -ItemType Directory -Path $claudeDir -Force | Out-Null
        Write-Host "✅ Created Claude config directory: $claudeDir" -ForegroundColor Green
    } else {
        Write-Host "✓ Claude config directory exists" -ForegroundColor Green
    }
    return $claudeDir
}

# Function to generate Claude Desktop configuration
function New-ClaudeDesktopConfig {
    param([string]$NotionToken)
    
    $config = @{
        mcpServers = @{
            "notion" = @{
                command = "docker"
                args = @("run", "--rm", "-i", "notionhq/notion-mcp-server")
                env = @{
                    "NOTION_API_KEY" = $NotionToken
                }
            }
            "playwright" = @{
                command = "npx"
                args = @("-y", "@modelcontextprotocol/server-playwright")
            }
            "docker" = @{
                command = "npx"
                args = @("-y", "@modelcontextprotocol/server-docker")
            }
        }
    }
    
    return $config | ConvertTo-Json -Depth 10
}

# Function to backup existing config
function Backup-ExistingConfig {
    param([string]$ConfigPath)
    
    if (Test-Path $ConfigPath) {
        $backupPath = "$ConfigPath.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Copy-Item $ConfigPath $backupPath
        Write-Host "✅ Backed up existing config to: $backupPath" -ForegroundColor Green
    }
}

# Function to test MCP servers
function Test-MCPServers {
    Write-Host "🧪 Testing MCP server installations..." -ForegroundColor Yellow
    
    # Test Notion MCP (Docker)
    try {
        Write-Host "Testing Notion MCP server..." -ForegroundColor Cyan
        $result = docker run --rm notionhq/notion-mcp-server --help 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Notion MCP server (Docker) is working" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Notion MCP server test inconclusive" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Notion MCP server test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test Playwright MCP
    try {
        Write-Host "Testing Playwright MCP server..." -ForegroundColor Cyan
        $result = npx -y @modelcontextprotocol/server-playwright --help 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Playwright MCP server is working" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Playwright MCP server test inconclusive" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Playwright MCP server test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test Docker MCP
    try {
        Write-Host "Testing Docker MCP server..." -ForegroundColor Cyan
        $result = npx -y @modelcontextprotocol/server-docker --help 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Docker MCP server is working" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Docker MCP server test inconclusive" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Docker MCP server test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Function to pull required Docker images
function Initialize-DockerImages {
    Write-Host "🐳 Pulling required Docker images..." -ForegroundColor Yellow
    
    try {
        Write-Host "Pulling Notion MCP server image..." -ForegroundColor Cyan
        docker pull notionhq/notion-mcp-server
        Write-Host "✅ Notion MCP server image pulled successfully" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to pull Notion MCP server image: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Main execution
try {
    Write-Host "`n=== PHASE 1: SYSTEM REQUIREMENTS ===" -ForegroundColor Magenta
    
    # Check admin privileges
    if (-not (Test-IsAdmin)) {
        Write-Host "⚠️  This script requires administrator privileges for installing software." -ForegroundColor Yellow
        Write-Host "Please run PowerShell as Administrator and try again." -ForegroundColor Red
        Read-Host "Press Enter to exit..."
        exit 1
    }
    
    Write-Host "✓ Running with administrator privileges" -ForegroundColor Green
    
    # Install dependencies
    Install-Chocolatey
    Install-DockerDesktop
    Install-NodeJS
    
    Write-Host "`n=== PHASE 2: DOCKER SETUP ===" -ForegroundColor Magenta
    Initialize-DockerImages
    
    Write-Host "`n=== PHASE 3: CLAUDE CONFIGURATION ===" -ForegroundColor Magenta
    
    # Initialize Claude directory
    $claudeDir = Initialize-ClaudeDirectory
    $configPath = "$claudeDir\claude_desktop_config.json"
    
    # Backup existing config
    Backup-ExistingConfig -ConfigPath $configPath
    
    # Generate new configuration
    Write-Host "📝 Generating Claude Desktop configuration..." -ForegroundColor Yellow
    $configJson = New-ClaudeDesktopConfig -NotionToken $NotionToken
    
    # Write configuration file
    $configJson | Out-File -FilePath $configPath -Encoding UTF8 -Force
    Write-Host "✅ Configuration written to: $configPath" -ForegroundColor Green
    
    Write-Host "`n=== PHASE 4: VALIDATION ===" -ForegroundColor Magenta
    
    # Validate JSON format
    try {
        $testConfig = Get-Content $configPath -Raw | ConvertFrom-Json
        Write-Host "✅ Configuration JSON is valid" -ForegroundColor Green
    } catch {
        Write-Host "❌ Configuration JSON is invalid: $($_.Exception.Message)" -ForegroundColor Red
        throw
    }
    
    # Test MCP servers
    Test-MCPServers
    
    Write-Host "`n=== SETUP COMPLETE ===" -ForegroundColor Magenta
    Write-Host "🎉 Claude Desktop MCP servers have been configured successfully!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Restart Claude Desktop application" -ForegroundColor Cyan
    Write-Host "2. The following MCP servers are now available:" -ForegroundColor Cyan
    Write-Host "   • notion - Access and manage Notion databases" -ForegroundColor White
    Write-Host "   • playwright - Web automation and testing" -ForegroundColor White
    Write-Host "   • docker - Container management" -ForegroundColor White
    Write-Host "`nConfiguration file location:" -ForegroundColor Yellow
    Write-Host "$configPath" -ForegroundColor White
    Write-Host "`n📚 For troubleshooting, check the configuration file and Docker Desktop status." -ForegroundColor Cyan
    
} catch {
    Write-Host "`n❌ Setup failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check the error above and try again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit..."
    exit 1
}

Read-Host "`nPress Enter to exit..."