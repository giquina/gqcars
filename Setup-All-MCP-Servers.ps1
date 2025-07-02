# ============================================================================
# Setup-All-MCP-Servers.ps1
# Comprehensive MCP Server Setup & Fix Script for Claude Desktop
# ============================================================================

param(
    [string]$GitHubToken = "",
    [string]$ExaApiKey = "",
    [switch]$SkipTokenValidation = $false,
    [switch]$Force = $false
)

# Script Configuration
$Script:LogFile = "$env:TEMP\MCP-Setup-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$Script:ConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
$Script:BackupPath = "$env:APPDATA\Claude\claude_desktop_config.backup.json"

# Known working tokens (provided by user)
$Script:NotionToken = "ntn_F20499864643jqMFipY5LNc3nG0FcKkoIUOJviWq8pt13z"

# ============================================================================
# LOGGING & UTILITY FUNCTIONS
# ============================================================================

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$Level] $Message"
    Write-Host $logEntry -ForegroundColor $(
        switch($Level) {
            "ERROR" { "Red" }
            "WARN" { "Yellow" }
            "SUCCESS" { "Green" }
            default { "White" }
        }
    )
    Add-Content -Path $Script:LogFile -Value $logEntry
}

function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

function Wait-ForUserInput {
    param([string]$Message = "Press any key to continue...")
    Write-Host $Message -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# ============================================================================
# PREREQUISITE CHECKS
# ============================================================================

function Test-Prerequisites {
    Write-Log "Checking prerequisites..." "INFO"
    
    $prerequisites = @{
        "Node.js" = "node"
        "npm" = "npm"
        "Docker" = "docker"
        "Python/uvx" = "uvx"
    }
    
    $missing = @()
    foreach ($name in $prerequisites.Keys) {
        if (-not (Test-Command $prerequisites[$name])) {
            $missing += $name
            Write-Log "$name is not installed or not in PATH" "ERROR"
        } else {
            Write-Log "$name is available" "SUCCESS"
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-Log "Missing prerequisites: $($missing -join ', ')" "ERROR"
        Write-Log "Please install missing prerequisites and run script again" "ERROR"
        
        Write-Host "`n=== INSTALLATION INSTRUCTIONS ===" -ForegroundColor Cyan
        foreach ($item in $missing) {
            switch ($item) {
                "Node.js" { Write-Host "Install Node.js: https://nodejs.org/en/download/" }
                "npm" { Write-Host "npm comes with Node.js installation" }
                "Docker" { Write-Host "Install Docker Desktop: https://www.docker.com/products/docker-desktop/" }
                "Python/uvx" { Write-Host "Install Python then: pip install uv && uv tool install uvx" }
            }
        }
        
        return $false
    }
    
    return $true
}

# ============================================================================
# TOKEN VALIDATION
# ============================================================================

function Test-NotionToken {
    param([string]$Token)
    try {
        $headers = @{
            "Authorization" = "Bearer $Token"
            "Content-Type" = "application/json"
            "Notion-Version" = "2022-06-28"
        }
        
        $response = Invoke-RestMethod -Uri "https://api.notion.com/v1/users/me" -Headers $headers -Method Get -TimeoutSec 10
        Write-Log "Notion token validation successful" "SUCCESS"
        return $true
    } catch {
        Write-Log "Notion token validation failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Test-GitHubToken {
    param([string]$Token)
    if ([string]::IsNullOrWhiteSpace($Token)) {
        Write-Log "GitHub token not provided" "WARN"
        return $false
    }
    
    try {
        $headers = @{
            "Authorization" = "Bearer $Token"
            "Accept" = "application/vnd.github.v3+json"
        }
        
        $response = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method Get -TimeoutSec 10
        Write-Log "GitHub token validation successful for user: $($response.login)" "SUCCESS"
        return $true
    } catch {
        Write-Log "GitHub token validation failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Test-ExaToken {
    param([string]$Token)
    if ([string]::IsNullOrWhiteSpace($Token)) {
        Write-Log "Exa API key not provided" "WARN"
        return $false
    }
    
    try {
        $headers = @{
            "x-api-key" = $Token
            "Content-Type" = "application/json"
        }
        
        $body = @{
            "query" = "test"
            "num_results" = 1
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri "https://api.exa.ai/search" -Headers $headers -Method Post -Body $body -TimeoutSec 10
        Write-Log "Exa API key validation successful" "SUCCESS"
        return $true
    } catch {
        Write-Log "Exa API key validation failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# ============================================================================
# MCP SERVER INSTALLATION
# ============================================================================

function Install-DockerImages {
    Write-Log "Installing required Docker images..." "INFO"
    
    $images = @("mcp/notion", "mcp/exa")
    
    foreach ($image in $images) {
        Write-Log "Pulling Docker image: $image" "INFO"
        try {
            & docker pull $image
            if ($LASTEXITCODE -eq 0) {
                Write-Log "Successfully pulled $image" "SUCCESS"
            } else {
                Write-Log "Failed to pull $image" "ERROR"
                return $false
            }
        } catch {
            Write-Log "Error pulling $image: $($_.Exception.Message)" "ERROR"
            return $false
        }
    }
    
    return $true
}

function Install-NodePackages {
    Write-Log "Installing Node.js packages..." "INFO"
    
    $packages = @(
        "@playwright/mcp@latest",
        "@modelcontextprotocol/server-github"
    )
    
    foreach ($package in $packages) {
        Write-Log "Installing: $package" "INFO"
        try {
            & npm install -g $package
            if ($LASTEXITCODE -eq 0) {
                Write-Log "Successfully installed $package" "SUCCESS"
            } else {
                Write-Log "Failed to install $package" "WARN"
                # Continue anyway - npx can install on-demand
            }
        } catch {
            Write-Log "Error installing $package: $($_.Exception.Message)" "WARN"
        }
    }
    
    return $true
}

function Install-UvxPackages {
    Write-Log "Installing uvx packages..." "INFO"
    
    try {
        & uvx --help | Out-Null
        & uvx docker-mcp --help | Out-Null
        Write-Log "docker-mcp is available via uvx" "SUCCESS"
        return $true
    } catch {
        Write-Log "Installing docker-mcp via uvx..." "INFO"
        try {
            & uv tool install docker-mcp
            Write-Log "Successfully installed docker-mcp" "SUCCESS"
            return $true
        } catch {
            Write-Log "Failed to install docker-mcp: $($_.Exception.Message)" "ERROR"
            return $false
        }
    }
}

# ============================================================================
# CONFIGURATION GENERATION
# ============================================================================

function Backup-ExistingConfig {
    if (Test-Path $Script:ConfigPath) {
        Write-Log "Backing up existing config to: $Script:BackupPath" "INFO"
        Copy-Item $Script:ConfigPath $Script:BackupPath -Force
        return $true
    }
    return $false
}

function New-MCPConfig {
    param(
        [string]$GitHubToken,
        [string]$ExaApiKey
    )
    
    $config = @{
        mcpServers = @{
            notion = @{
                command = "docker"
                args = @("run", "-i", "--rm", "-e", "INTERNAL_INTEGRATION_TOKEN", "mcp/notion")
                env = @{
                    INTERNAL_INTEGRATION_TOKEN = $Script:NotionToken
                }
            }
            playwright = @{
                command = "npx"
                args = @("@playwright/mcp@latest")
            }
            "docker-mcp" = @{
                command = "uvx"
                args = @("docker-mcp")
            }
        }
    }
    
    # Add GitHub if token provided
    if (-not [string]::IsNullOrWhiteSpace($GitHubToken)) {
        $config.mcpServers.github = @{
            command = "npx"
            args = @("-y", "@modelcontextprotocol/server-github")
            env = @{
                GITHUB_PERSONAL_ACCESS_TOKEN = $GitHubToken
            }
        }
    }
    
    # Add Exa if API key provided
    if (-not [string]::IsNullOrWhiteSpace($ExaApiKey)) {
        $config.mcpServers.exa = @{
            command = "docker"
            args = @("run", "-i", "--rm", "-e", "EXA_API_KEY", "mcp/exa")
            env = @{
                EXA_API_KEY = $ExaApiKey
            }
        }
    }
    
    return $config
}

function Write-MCPConfig {
    param([hashtable]$Config)
    
    # Ensure directory exists
    $configDir = Split-Path $Script:ConfigPath -Parent
    if (-not (Test-Path $configDir)) {
        New-Item -ItemType Directory -Path $configDir -Force | Out-Null
    }
    
    try {
        $jsonConfig = $Config | ConvertTo-Json -Depth 10
        $jsonConfig | Out-File -FilePath $Script:ConfigPath -Encoding UTF8 -Force
        Write-Log "Configuration written to: $Script:ConfigPath" "SUCCESS"
        return $true
    } catch {
        Write-Log "Failed to write configuration: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# ============================================================================
# TESTING FUNCTIONS
# ============================================================================

function Test-MCPServer {
    param(
        [string]$ServerName,
        [hashtable]$ServerConfig
    )
    
    Write-Log "Testing MCP server: $ServerName" "INFO"
    
    try {
        $command = $ServerConfig.command
        $args = $ServerConfig.args
        
        # Test command availability
        if (-not (Test-Command $command)) {
            Write-Log "$ServerName: Command '$command' not found" "ERROR"
            return $false
        }
        
        # For Docker commands, test if image exists
        if ($command -eq "docker" -and $args -contains "mcp/notion") {
            $imageCheck = & docker images --format "table {{.Repository}}:{{.Tag}}" | Select-String "mcp/notion"
            if (-not $imageCheck) {
                Write-Log "$ServerName: Docker image not found" "ERROR"
                return $false
            }
        }
        
        if ($command -eq "docker" -and $args -contains "mcp/exa") {
            $imageCheck = & docker images --format "table {{.Repository}}:{{.Tag}}" | Select-String "mcp/exa"
            if (-not $imageCheck) {
                Write-Log "$ServerName: Docker image not found" "ERROR"
                return $false
            }
        }
        
        Write-Log "$ServerName: Basic checks passed" "SUCCESS"
        return $true
        
    } catch {
        Write-Log "$ServerName: Test failed - $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

function Start-MCPSetup {
    Write-Host "============================================================================" -ForegroundColor Cyan
    Write-Host "   MCP Server Setup & Fix Script for Claude Desktop" -ForegroundColor Cyan
    Write-Host "============================================================================" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Log "Starting MCP setup process..." "INFO"
    Write-Log "Log file: $Script:LogFile" "INFO"
    
    # Step 1: Check Prerequisites
    Write-Host "`n=== STEP 1: CHECKING PREREQUISITES ===" -ForegroundColor Yellow
    if (-not (Test-Prerequisites)) {
        Write-Log "Prerequisites check failed. Exiting." "ERROR"
        return $false
    }
    
    # Step 2: Validate Tokens (if not skipped)
    Write-Host "`n=== STEP 2: VALIDATING TOKENS ===" -ForegroundColor Yellow
    if (-not $SkipTokenValidation) {
        $notionValid = Test-NotionToken $Script:NotionToken
        $githubValid = Test-GitHubToken $GitHubToken
        $exaValid = Test-ExaToken $ExaApiKey
        
        if (-not $notionValid) {
            Write-Log "Notion token validation failed, but continuing..." "WARN"
        }
        
        if ([string]::IsNullOrWhiteSpace($GitHubToken)) {
            Write-Log "GitHub token not provided - server will be skipped" "WARN"
        }
        
        if ([string]::IsNullOrWhiteSpace($ExaApiKey)) {
            Write-Log "Exa API key not provided - server will be skipped" "WARN"
        }
    } else {
        Write-Log "Token validation skipped by user request" "WARN"
    }
    
    # Step 3: Install Dependencies
    Write-Host "`n=== STEP 3: INSTALLING DEPENDENCIES ===" -ForegroundColor Yellow
    
    if (-not (Install-DockerImages)) {
        Write-Log "Docker image installation failed" "ERROR"
        return $false
    }
    
    if (-not (Install-NodePackages)) {
        Write-Log "Node package installation had issues, but continuing..." "WARN"
    }
    
    if (-not (Install-UvxPackages)) {
        Write-Log "uvx package installation failed" "ERROR"
        return $false
    }
    
    # Step 4: Backup and Generate Configuration
    Write-Host "`n=== STEP 4: GENERATING CONFIGURATION ===" -ForegroundColor Yellow
    
    Backup-ExistingConfig
    
    $config = New-MCPConfig -GitHubToken $GitHubToken -ExaApiKey $ExaApiKey
    
    if (-not (Write-MCPConfig $config)) {
        Write-Log "Configuration generation failed" "ERROR"
        return $false
    }
    
    # Step 5: Test Configuration
    Write-Host "`n=== STEP 5: TESTING SERVERS ===" -ForegroundColor Yellow
    
    $allSuccess = $true
    foreach ($serverName in $config.mcpServers.Keys) {
        $serverConfig = $config.mcpServers[$serverName]
        if (-not (Test-MCPServer $serverName $serverConfig)) {
            $allSuccess = $false
        }
    }
    
    # Final Report
    Write-Host "`n=== SETUP COMPLETE ===" -ForegroundColor Cyan
    Write-Log "Setup process completed" "INFO"
    
    if ($allSuccess) {
        Write-Host "✅ All MCP servers are configured and ready!" -ForegroundColor Green
        Write-Host "📍 Config location: $Script:ConfigPath" -ForegroundColor Green
        Write-Host "📋 Log file: $Script:LogFile" -ForegroundColor Green
        Write-Host "`n🔄 Please restart Claude Desktop to load the new configuration." -ForegroundColor Yellow
    } else {
        Write-Host "⚠️  Setup completed with some issues. Check the log for details." -ForegroundColor Yellow
        Write-Host "📋 Log file: $Script:LogFile" -ForegroundColor Yellow
    }
    
    return $allSuccess
}

# ============================================================================
# SCRIPT ENTRY POINT
# ============================================================================

# Handle command line parameters
if ([string]::IsNullOrWhiteSpace($GitHubToken)) {
    Write-Host "GitHub token not provided. You can:" -ForegroundColor Yellow
    Write-Host "1. Run with -GitHubToken parameter" -ForegroundColor Yellow
    Write-Host "2. Set environment variable GITHUB_TOKEN" -ForegroundColor Yellow
    Write-Host "3. Continue without GitHub MCP server" -ForegroundColor Yellow
    
    if ($env:GITHUB_TOKEN) {
        $GitHubToken = $env:GITHUB_TOKEN
        Write-Host "Using GitHub token from environment variable" -ForegroundColor Green
    }
}

if ([string]::IsNullOrWhiteSpace($ExaApiKey)) {
    Write-Host "Exa API key not provided. You can:" -ForegroundColor Yellow
    Write-Host "1. Run with -ExaApiKey parameter" -ForegroundColor Yellow
    Write-Host "2. Set environment variable EXA_API_KEY" -ForegroundColor Yellow
    Write-Host "3. Continue without Exa MCP server" -ForegroundColor Yellow
    
    if ($env:EXA_API_KEY) {
        $ExaApiKey = $env:EXA_API_KEY
        Write-Host "Using Exa API key from environment variable" -ForegroundColor Green
    }
}

# Execute main setup
try {
    $result = Start-MCPSetup
    if ($result) {
        exit 0
    } else {
        exit 1
    }
} catch {
    Write-Log "Unexpected error: $($_.Exception.Message)" "ERROR"
    Write-Log "Stack trace: $($_.ScriptStackTrace)" "ERROR"
    exit 1
}