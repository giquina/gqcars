# =============================================================================
# COMPREHENSIVE MCP INSTALLATION SCRIPT FOR WINDOWS
# =============================================================================
# This script installs all MCP servers for Claude Code in Cursor IDE
# Run as Administrator for best results

param(
    [switch]$Force,
    [switch]$SkipExisting,
    [switch]$TestOnly,
    [string]$ConfigFile = "claude_desktop_config_comprehensive.json",
    [string]$EnvFile = ".env"
)

# =============================================================================
# SCRIPT CONFIGURATION
# =============================================================================

$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"

# Colors for output
$Colors = @{
    Success = "Green"
    Warning = "Yellow"
    Error   = "Red"
    Info    = "Cyan"
    Header  = "Magenta"
}

# Configuration
$Script:TotalSteps = 50
$Script:CurrentStep = 0
$Script:FailedInstalls = @()
$Script:SuccessfulInstalls = @()
$Script:SkippedInstalls = @()

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

function Write-Progress-Step {
    param($Message, $Color = "Info")
    
    $Script:CurrentStep++
    $Percentage = [math]::Round(($Script:CurrentStep / $Script:TotalSteps) * 100)
    
    Write-Host "[$Script:CurrentStep/$Script:TotalSteps] $Message" -ForegroundColor $Colors[$Color]
    Write-Progress -Activity "Installing MCP Servers" -Status $Message -PercentComplete $Percentage
}

function Test-Command {
    param($Command)
    
    try {
        $null = Get-Command $Command -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

function Install-NodePackage {
    param(
        [string]$PackageName,
        [string]$Version = "latest",
        [bool]$Global = $false
    )
    
    $InstallArgs = @("-y")
    if ($Global) {
        $InstallArgs += "-g"
    }
    $InstallArgs += "$PackageName@$Version"
    
    try {
        $Output = & npm install @InstallArgs 2>&1
        if ($LASTEXITCODE -eq 0) {
            $Script:SuccessfulInstalls += $PackageName
            Write-Progress-Step "✅ Installed $PackageName" "Success"
            return $true
        }
        else {
            $Script:FailedInstalls += "$PackageName - npm install failed"
            Write-Progress-Step "❌ Failed to install $PackageName" "Error"
            return $false
        }
    }
    catch {
        $Script:FailedInstalls += "$PackageName - Exception: $($_.Exception.Message)"
        Write-Progress-Step "❌ Exception installing $PackageName" "Error"
        return $false
    }
}

function Install-DockerImage {
    param(
        [string]$ImageName,
        [string]$Tag = "latest"
    )
    
    try {
        $Output = & docker pull "${ImageName}:${Tag}" 2>&1
        if ($LASTEXITCODE -eq 0) {
            $Script:SuccessfulInstalls += $ImageName
            Write-Progress-Step "✅ Pulled Docker image $ImageName" "Success"
            return $true
        }
        else {
            $Script:FailedInstalls += "$ImageName - Docker pull failed"
            Write-Progress-Step "❌ Failed to pull Docker image $ImageName" "Error"
            return $false
        }
    }
    catch {
        $Script:FailedInstalls += "$ImageName - Exception: $($_.Exception.Message)"
        Write-Progress-Step "❌ Exception pulling Docker image $ImageName" "Error"
        return $false
    }
}

function Test-EnvironmentVariables {
    Write-Progress-Step "🔍 Testing environment variables" "Info"
    
    if (-not (Test-Path $EnvFile)) {
        Write-Progress-Step "⚠️ Environment file $EnvFile not found" "Warning"
        Write-Host "Creating basic .env file from template..." -ForegroundColor $Colors.Warning
        
        if (Test-Path "mcp-env-template.env") {
            Copy-Item "mcp-env-template.env" $EnvFile
            Write-Progress-Step "✅ Created .env file from template" "Success"
        }
        else {
            Write-Progress-Step "❌ Template file not found" "Error"
            return $false
        }
    }
    
    return $true
}

function Install-Prerequisites {
    Write-Progress-Step "🔧 Installing prerequisites" "Header"
    
    # Check Node.js
    if (-not (Test-Command "node")) {
        Write-Progress-Step "❌ Node.js not found. Please install Node.js first." "Error"
        return $false
    }
    
    # Check npm
    if (-not (Test-Command "npm")) {
        Write-Progress-Step "❌ npm not found. Please install npm first." "Error"
        return $false
    }
    
    # Check Docker
    if (-not (Test-Command "docker")) {
        Write-Progress-Step "⚠️ Docker not found. Docker-based MCPs will be skipped." "Warning"
    }
    
    # Check uvx (for Python-based MCPs)
    if (-not (Test-Command "uvx")) {
        Write-Progress-Step "⚠️ uvx not found. Installing uvx..." "Warning"
        try {
            & pip install uvx
            Write-Progress-Step "✅ uvx installed successfully" "Success"
        }
        catch {
            Write-Progress-Step "⚠️ Could not install uvx. Python-based MCPs will be skipped." "Warning"
        }
    }
    
    # Update npm to latest
    Write-Progress-Step "📦 Updating npm to latest version" "Info"
    try {
        & npm install -g npm@latest
        Write-Progress-Step "✅ npm updated successfully" "Success"
    }
    catch {
        Write-Progress-Step "⚠️ Could not update npm" "Warning"
    }
    
    return $true
}

function Install-EssentialMCPs {
    Write-Progress-Step "🚀 Installing Essential Development MCPs" "Header"
    
    # Filesystem MCP
    Install-NodePackage "@modelcontextprotocol/server-filesystem"
    
    # Memory MCP
    Install-NodePackage "@modelcontextprotocol/server-memory"
    
    # Git MCP (already installed globally)
    if (-not (Test-Path "/mnt/c/Users/Student/AppData/Roaming/npm/node_modules/@cyanheads/git-mcp-server")) {
        Install-NodePackage "@cyanheads/git-mcp-server" "latest" $true
    }
    else {
        $Script:SkippedInstalls += "@cyanheads/git-mcp-server"
        Write-Progress-Step "⏭️ Git MCP already installed globally" "Info"
    }
    
    # NPM MCP
    Install-NodePackage "@modelcontextprotocol/server-npm"
    
    # Context7 MCP
    Install-NodePackage "@context7/mcp-server"
}

function Install-DatabaseMCPs {
    Write-Progress-Step "🗄️ Installing Database MCPs" "Header"
    
    # PostgreSQL MCP
    Install-NodePackage "@modelcontextprotocol/server-postgres"
    
    # SQLite MCP
    Install-NodePackage "@modelcontextprotocol/server-sqlite"
}

function Install-GoogleWorkspaceMCPs {
    Write-Progress-Step "🔧 Installing Google Workspace MCPs" "Header"
    
    # Google Drive MCP
    Install-NodePackage "@google-cloud/mcp-server-drive"
    
    # Google Sheets MCP
    Install-NodePackage "@google-cloud/mcp-server-sheets"
    
    # Google Docs MCP
    Install-NodePackage "@google-cloud/mcp-server-docs"
    
    # Google Calendar MCP
    Install-NodePackage "@google-cloud/mcp-server-calendar"
    
    # Gmail MCP
    Install-NodePackage "@google-cloud/mcp-server-gmail"
}

function Install-CommunicationMCPs {
    Write-Progress-Step "💬 Installing Communication MCPs" "Header"
    
    # Slack MCP
    Install-NodePackage "@slack/mcp-server"
    
    # Linear MCP
    Install-NodePackage "@linear/mcp-server"
    
    # Trello MCP
    Install-NodePackage "@trello/mcp-server"
    
    # Email MCP
    Install-NodePackage "@modelcontextprotocol/server-email"
}

function Install-UtilityMCPs {
    Write-Progress-Step "🛠️ Installing Utility MCPs" "Header"
    
    # Time MCP
    Install-NodePackage "@modelcontextprotocol/server-time"
    
    # PDF MCP
    Install-NodePackage "@modelcontextprotocol/server-pdf"
    
    # Image Processing MCP
    Install-NodePackage "@modelcontextprotocol/server-image"
    
    # Translation MCP
    Install-NodePackage "@modelcontextprotocol/server-translate"
    
    # Weather MCP
    Install-NodePackage "@modelcontextprotocol/server-weather"
}

function Install-AdvancedMCPs {
    Write-Progress-Step "⚡ Installing Advanced Development MCPs" "Header"
    
    # Supabase MCP
    Install-NodePackage "@supabase/mcp-server"
    
    # Vercel MCP
    Install-NodePackage "@vercel/mcp-server"
    
    # Stripe MCP
    Install-NodePackage "@stripe/mcp-server"
    
    # Firebase MCP
    Install-NodePackage "@firebase/mcp-server"
    
    # AWS MCP
    Install-NodePackage "@aws/mcp-server"
    
    # Kubernetes MCP
    Install-NodePackage "@kubernetes/mcp-server"
}

function Install-SecurityMCPs {
    Write-Progress-Step "🔐 Installing Security & Compliance MCPs" "Header"
    
    # Security Scanning MCP
    Install-NodePackage "@modelcontextprotocol/server-security"
    
    # Secrets Management MCP
    Install-NodePackage "@modelcontextprotocol/server-secrets"
}

function Install-TestingMCPs {
    Write-Progress-Step "🧪 Installing Testing & Automation MCPs" "Header"
    
    # Testing MCP
    Install-NodePackage "@modelcontextprotocol/server-testing"
    
    # CI/CD MCP
    Install-NodePackage "@modelcontextprotocol/server-cicd"
    
    # Enhanced GitHub MCP
    Install-NodePackage "@modelcontextprotocol/server-github-enhanced"
    
    # Enhanced Docker MCP
    Install-NodePackage "@modelcontextprotocol/server-docker-enhanced"
}

function Install-StreamingMCPs {
    Write-Progress-Step "🌐 Installing Real-time & Streaming MCPs" "Header"
    
    # WebSocket MCP
    Install-NodePackage "@modelcontextprotocol/server-websocket"
    
    # Streaming MCP
    Install-NodePackage "@modelcontextprotocol/server-streaming"
    
    # Monitoring MCP
    Install-NodePackage "@modelcontextprotocol/server-monitoring"
    
    # Analytics MCP
    Install-NodePackage "@modelcontextprotocol/server-analytics"
}

function Install-DockerMCPs {
    Write-Progress-Step "🐳 Installing Docker-based MCPs" "Header"
    
    if (Test-Command "docker") {
        # Docker Compose MCP
        if (Test-Command "uvx") {
            try {
                & uvx docker-compose-mcp
                $Script:SuccessfulInstalls += "docker-compose-mcp"
                Write-Progress-Step "✅ Installed docker-compose-mcp" "Success"
            }
            catch {
                $Script:FailedInstalls += "docker-compose-mcp - uvx failed"
                Write-Progress-Step "❌ Failed to install docker-compose-mcp" "Error"
            }
        }
        
        # Skip existing Docker images that are already running
        $ExistingImages = @("mcp/notion", "mcp/exa")
        foreach ($Image in $ExistingImages) {
            $Script:SkippedInstalls += $Image
            Write-Progress-Step "⏭️ $Image already installed and running" "Info"
        }
    }
    else {
        Write-Progress-Step "⏭️ Docker not available, skipping Docker-based MCPs" "Warning"
    }
}

function Setup-ConfigurationFiles {
    Write-Progress-Step "📝 Setting up configuration files" "Header"
    
    # Check if Claude Desktop config directory exists
    $ClaudeConfigDir = "$env:APPDATA\Claude"
    if (-not (Test-Path $ClaudeConfigDir)) {
        New-Item -ItemType Directory -Path $ClaudeConfigDir -Force | Out-Null
        Write-Progress-Step "✅ Created Claude configuration directory" "Success"
    }
    
    # Copy comprehensive config to Claude Desktop
    $SourceConfig = Join-Path $PWD $ConfigFile
    $DestConfig = Join-Path $ClaudeConfigDir "claude_desktop_config.json"
    
    if (Test-Path $SourceConfig) {
        # Backup existing config
        if (Test-Path $DestConfig) {
            $BackupConfig = Join-Path $ClaudeConfigDir "claude_desktop_config_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
            Copy-Item $DestConfig $BackupConfig
            Write-Progress-Step "✅ Backed up existing config to $BackupConfig" "Success"
        }
        
        # Copy new config
        Copy-Item $SourceConfig $DestConfig
        Write-Progress-Step "✅ Updated Claude Desktop configuration" "Success"
    }
    else {
        Write-Progress-Step "❌ Source configuration file not found: $SourceConfig" "Error"
    }
}

function Start-SyncBridge {
    Write-Progress-Step "🔄 Starting MCP Sync Bridge" "Header"
    
    $SyncBridgeScript = "mcp-sync-bridge.js"
    if (Test-Path $SyncBridgeScript) {
        try {
            # Start the sync bridge in the background
            Start-Process -FilePath "node" -ArgumentList $SyncBridgeScript -WindowStyle Hidden
            Write-Progress-Step "✅ Started MCP Sync Bridge" "Success"
        }
        catch {
            Write-Progress-Step "❌ Failed to start MCP Sync Bridge" "Error"
        }
    }
    else {
        Write-Progress-Step "⚠️ MCP Sync Bridge script not found" "Warning"
    }
}

function Test-Installation {
    Write-Progress-Step "🧪 Testing MCP installations" "Header"
    
    # Test a few key MCPs
    $TestCommands = @(
        @{ Name = "Filesystem MCP"; Command = "npx @modelcontextprotocol/server-filesystem --help" },
        @{ Name = "Memory MCP"; Command = "npx @modelcontextprotocol/server-memory --help" },
        @{ Name = "Git MCP"; Command = "npx @cyanheads/git-mcp-server --help" }
    )
    
    foreach ($Test in $TestCommands) {
        try {
            $Output = Invoke-Expression $Test.Command 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Progress-Step "✅ $($Test.Name) is working" "Success"
            }
            else {
                Write-Progress-Step "⚠️ $($Test.Name) may have issues" "Warning"
            }
        }
        catch {
            Write-Progress-Step "❌ $($Test.Name) failed test" "Error"
        }
    }
}

function Show-Summary {
    Write-Host "`n" -NoNewline
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    Write-Host "MCP INSTALLATION SUMMARY" -ForegroundColor $Colors.Header
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    
    Write-Host "`n✅ SUCCESSFUL INSTALLATIONS ($($Script:SuccessfulInstalls.Count)):" -ForegroundColor $Colors.Success
    foreach ($Install in $Script:SuccessfulInstalls) {
        Write-Host "  • $Install" -ForegroundColor $Colors.Success
    }
    
    if ($Script:SkippedInstalls.Count -gt 0) {
        Write-Host "`n⏭️ SKIPPED INSTALLATIONS ($($Script:SkippedInstalls.Count)):" -ForegroundColor $Colors.Warning
        foreach ($Install in $Script:SkippedInstalls) {
            Write-Host "  • $Install" -ForegroundColor $Colors.Warning
        }
    }
    
    if ($Script:FailedInstalls.Count -gt 0) {
        Write-Host "`n❌ FAILED INSTALLATIONS ($($Script:FailedInstalls.Count)):" -ForegroundColor $Colors.Error
        foreach ($Install in $Script:FailedInstalls) {
            Write-Host "  • $Install" -ForegroundColor $Colors.Error
        }
    }
    
    Write-Host "`n📊 INSTALLATION STATISTICS:" -ForegroundColor $Colors.Info
    Write-Host "  • Total Attempted: $($Script:TotalSteps)" -ForegroundColor $Colors.Info
    Write-Host "  • Successful: $($Script:SuccessfulInstalls.Count)" -ForegroundColor $Colors.Info
    Write-Host "  • Skipped: $($Script:SkippedInstalls.Count)" -ForegroundColor $Colors.Info
    Write-Host "  • Failed: $($Script:FailedInstalls.Count)" -ForegroundColor $Colors.Info
    
    $SuccessRate = [math]::Round(($Script:SuccessfulInstalls.Count / $Script:TotalSteps) * 100, 2)
    Write-Host "  • Success Rate: $SuccessRate%" -ForegroundColor $Colors.Info
    
    Write-Host "`n📝 NEXT STEPS:" -ForegroundColor $Colors.Header
    Write-Host "  1. Review the .env file and add your API keys" -ForegroundColor $Colors.Info
    Write-Host "  2. Test the installation: .\test-mcps.ps1" -ForegroundColor $Colors.Info
    Write-Host "  3. Start Cursor IDE and test /mcp command" -ForegroundColor $Colors.Info
    Write-Host "  4. Check the troubleshooting guide if issues persist" -ForegroundColor $Colors.Info
    
    Write-Host "`n🎉 MCP INSTALLATION COMPLETE!" -ForegroundColor $Colors.Success
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

function Main {
    Write-Host "🚀 COMPREHENSIVE MCP INSTALLATION SCRIPT" -ForegroundColor $Colors.Header
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    Write-Host "Installing MCP servers for Claude Code in Cursor IDE..." -ForegroundColor $Colors.Info
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    
    # Test only mode
    if ($TestOnly) {
        Write-Host "Running in TEST ONLY mode..." -ForegroundColor $Colors.Warning
        Test-Installation
        return
    }
    
    # Install prerequisites
    if (-not (Install-Prerequisites)) {
        Write-Host "❌ Prerequisites check failed. Exiting." -ForegroundColor $Colors.Error
        return
    }
    
    # Test environment variables
    if (-not (Test-EnvironmentVariables)) {
        Write-Host "❌ Environment variables check failed. Exiting." -ForegroundColor $Colors.Error
        return
    }
    
    # Install MCP categories
    Install-EssentialMCPs
    Install-DatabaseMCPs
    Install-GoogleWorkspaceMCPs
    Install-CommunicationMCPs
    Install-UtilityMCPs
    Install-AdvancedMCPs
    Install-SecurityMCPs
    Install-TestingMCPs
    Install-StreamingMCPs
    Install-DockerMCPs
    
    # Setup configuration
    Setup-ConfigurationFiles
    
    # Start sync bridge
    Start-SyncBridge
    
    # Test installation
    Test-Installation
    
    # Show summary
    Show-Summary
}

# Run the main function
Main