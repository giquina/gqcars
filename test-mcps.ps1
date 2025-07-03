# =============================================================================
# COMPREHENSIVE MCP TESTING SCRIPT FOR WINDOWS
# =============================================================================
# This script tests all installed MCP servers for Claude Code in Cursor IDE

param(
    [switch]$Verbose,
    [switch]$QuickTest,
    [switch]$GenerateReport,
    [string]$ConfigFile = "claude_desktop_config_comprehensive.json",
    [string]$ReportFile = "mcp-test-report.json"
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
    Test    = "Blue"
}

# Test Results
$Script:TestResults = @{
    Total = 0
    Passed = 0
    Failed = 0
    Skipped = 0
    Tests = @()
}

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

function Write-TestResult {
    param(
        [string]$TestName,
        [string]$Status,
        [string]$Message = "",
        [string]$Details = "",
        [int]$Duration = 0
    )
    
    $Script:TestResults.Total++
    
    switch ($Status) {
        "PASS" {
            $Script:TestResults.Passed++
            Write-Host "✅ PASS: $TestName" -ForegroundColor $Colors.Success
        }
        "FAIL" {
            $Script:TestResults.Failed++
            Write-Host "❌ FAIL: $TestName" -ForegroundColor $Colors.Error
            if ($Message) { Write-Host "   $Message" -ForegroundColor $Colors.Error }
        }
        "SKIP" {
            $Script:TestResults.Skipped++
            Write-Host "⏭️ SKIP: $TestName" -ForegroundColor $Colors.Warning
            if ($Message) { Write-Host "   $Message" -ForegroundColor $Colors.Warning }
        }
    }
    
    if ($Verbose -and $Details) {
        Write-Host "   Details: $Details" -ForegroundColor $Colors.Info
    }
    
    $Script:TestResults.Tests += @{
        Name = $TestName
        Status = $Status
        Message = $Message
        Details = $Details
        Duration = $Duration
        Timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    }
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

function Test-NodePackage {
    param(
        [string]$PackageName,
        [string]$TestName,
        [string]$TestCommand = "--help"
    )
    
    $StartTime = Get-Date
    
    try {
        $Output = & npx $PackageName $TestCommand 2>&1
        $Duration = ((Get-Date) - $StartTime).TotalMilliseconds
        
        if ($LASTEXITCODE -eq 0) {
            Write-TestResult -TestName $TestName -Status "PASS" -Duration $Duration
            return $true
        } else {
            Write-TestResult -TestName $TestName -Status "FAIL" -Message "Command failed" -Details $Output -Duration $Duration
            return $false
        }
    }
    catch {
        $Duration = ((Get-Date) - $StartTime).TotalMilliseconds
        Write-TestResult -TestName $TestName -Status "FAIL" -Message "Exception occurred" -Details $_.Exception.Message -Duration $Duration
        return $false
    }
}

function Test-DockerImage {
    param(
        [string]$ImageName,
        [string]$TestName
    )
    
    $StartTime = Get-Date
    
    try {
        $Output = & docker images $ImageName --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}" 2>&1
        $Duration = ((Get-Date) - $StartTime).TotalMilliseconds
        
        if ($LASTEXITCODE -eq 0 -and $Output -match $ImageName) {
            Write-TestResult -TestName $TestName -Status "PASS" -Duration $Duration
            return $true
        } else {
            Write-TestResult -TestName $TestName -Status "FAIL" -Message "Docker image not found" -Details $Output -Duration $Duration
            return $false
        }
    }
    catch {
        $Duration = ((Get-Date) - $StartTime).TotalMilliseconds
        Write-TestResult -TestName $TestName -Status "FAIL" -Message "Exception occurred" -Details $_.Exception.Message -Duration $Duration
        return $false
    }
}

function Test-EnvironmentFile {
    Write-Host "`n🔍 Testing Environment Configuration" -ForegroundColor $Colors.Header
    
    if (-not (Test-Path ".env")) {
        Write-TestResult -TestName "Environment File Exists" -Status "FAIL" -Message ".env file not found"
        return $false
    } else {
        Write-TestResult -TestName "Environment File Exists" -Status "PASS"
    }
    
    # Test for critical environment variables
    $EnvContent = Get-Content ".env" -Raw
    $CriticalVars = @(
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "NOTION_API_KEY",
        "SUPABASE_URL",
        "GOOGLE_CLIENT_ID"
    )
    
    foreach ($Var in $CriticalVars) {
        if ($EnvContent -match "$Var=.+") {
            Write-TestResult -TestName "Environment Variable: $Var" -Status "PASS"
        } else {
            Write-TestResult -TestName "Environment Variable: $Var" -Status "FAIL" -Message "Not configured"
        }
    }
    
    return $true
}

function Test-ConfigurationFile {
    Write-Host "`n📄 Testing Configuration File" -ForegroundColor $Colors.Header
    
    if (-not (Test-Path $ConfigFile)) {
        Write-TestResult -TestName "Configuration File Exists" -Status "FAIL" -Message "$ConfigFile not found"
        return $false
    } else {
        Write-TestResult -TestName "Configuration File Exists" -Status "PASS"
    }
    
    try {
        $Config = Get-Content $ConfigFile -Raw | ConvertFrom-Json
        Write-TestResult -TestName "Configuration File Valid JSON" -Status "PASS"
        
        if ($Config.mcpServers) {
            $ServerCount = ($Config.mcpServers | Get-Member -MemberType NoteProperty | Where-Object { $_.Name -notmatch "^//" }).Count
            Write-TestResult -TestName "MCP Servers Configuration" -Status "PASS" -Message "$ServerCount servers configured"
        } else {
            Write-TestResult -TestName "MCP Servers Configuration" -Status "FAIL" -Message "No mcpServers section found"
        }
    }
    catch {
        Write-TestResult -TestName "Configuration File Valid JSON" -Status "FAIL" -Message "Invalid JSON format" -Details $_.Exception.Message
        return $false
    }
    
    return $true
}

function Test-Prerequisites {
    Write-Host "`n🔧 Testing Prerequisites" -ForegroundColor $Colors.Header
    
    # Test Node.js
    if (Test-Command "node") {
        $NodeVersion = & node --version 2>&1
        Write-TestResult -TestName "Node.js Available" -Status "PASS" -Message "Version: $NodeVersion"
    } else {
        Write-TestResult -TestName "Node.js Available" -Status "FAIL" -Message "Node.js not found"
    }
    
    # Test npm
    if (Test-Command "npm") {
        $NpmVersion = & npm --version 2>&1
        Write-TestResult -TestName "npm Available" -Status "PASS" -Message "Version: $NpmVersion"
    } else {
        Write-TestResult -TestName "npm Available" -Status "FAIL" -Message "npm not found"
    }
    
    # Test Docker
    if (Test-Command "docker") {
        $DockerVersion = & docker --version 2>&1
        Write-TestResult -TestName "Docker Available" -Status "PASS" -Message "Version: $DockerVersion"
    } else {
        Write-TestResult -TestName "Docker Available" -Status "SKIP" -Message "Docker not found (optional)"
    }
    
    # Test uvx
    if (Test-Command "uvx") {
        $UvxVersion = & uvx --version 2>&1
        Write-TestResult -TestName "uvx Available" -Status "PASS" -Message "Version: $UvxVersion"
    } else {
        Write-TestResult -TestName "uvx Available" -Status "SKIP" -Message "uvx not found (optional)"
    }
    
    # Test npx
    if (Test-Command "npx") {
        $NpxVersion = & npx --version 2>&1
        Write-TestResult -TestName "npx Available" -Status "PASS" -Message "Version: $NpxVersion"
    } else {
        Write-TestResult -TestName "npx Available" -Status "FAIL" -Message "npx not found"
    }
}

function Test-EssentialMCPs {
    Write-Host "`n🚀 Testing Essential Development MCPs" -ForegroundColor $Colors.Header
    
    # Filesystem MCP
    Test-NodePackage "@modelcontextprotocol/server-filesystem" "Filesystem MCP"
    
    # Memory MCP
    Test-NodePackage "@modelcontextprotocol/server-memory" "Memory MCP"
    
    # Git MCP
    Test-NodePackage "@cyanheads/git-mcp-server" "Git MCP"
    
    # NPM MCP
    Test-NodePackage "@modelcontextprotocol/server-npm" "NPM MCP"
    
    # Context7 MCP
    Test-NodePackage "@context7/mcp-server" "Context7 MCP"
}

function Test-DatabaseMCPs {
    Write-Host "`n🗄️ Testing Database MCPs" -ForegroundColor $Colors.Header
    
    # PostgreSQL MCP
    Test-NodePackage "@modelcontextprotocol/server-postgres" "PostgreSQL MCP"
    
    # SQLite MCP
    Test-NodePackage "@modelcontextprotocol/server-sqlite" "SQLite MCP"
}

function Test-GoogleWorkspaceMCPs {
    Write-Host "`n🔧 Testing Google Workspace MCPs" -ForegroundColor $Colors.Header
    
    # Google Drive MCP
    Test-NodePackage "@google-cloud/mcp-server-drive" "Google Drive MCP"
    
    # Google Sheets MCP
    Test-NodePackage "@google-cloud/mcp-server-sheets" "Google Sheets MCP"
    
    # Google Docs MCP
    Test-NodePackage "@google-cloud/mcp-server-docs" "Google Docs MCP"
    
    # Google Calendar MCP
    Test-NodePackage "@google-cloud/mcp-server-calendar" "Google Calendar MCP"
    
    # Gmail MCP
    Test-NodePackage "@google-cloud/mcp-server-gmail" "Gmail MCP"
}

function Test-CommunicationMCPs {
    Write-Host "`n💬 Testing Communication MCPs" -ForegroundColor $Colors.Header
    
    # Slack MCP
    Test-NodePackage "@slack/mcp-server" "Slack MCP"
    
    # Linear MCP
    Test-NodePackage "@linear/mcp-server" "Linear MCP"
    
    # Trello MCP
    Test-NodePackage "@trello/mcp-server" "Trello MCP"
    
    # Email MCP
    Test-NodePackage "@modelcontextprotocol/server-email" "Email MCP"
}

function Test-UtilityMCPs {
    Write-Host "`n🛠️ Testing Utility MCPs" -ForegroundColor $Colors.Header
    
    # Time MCP
    Test-NodePackage "@modelcontextprotocol/server-time" "Time MCP"
    
    # PDF MCP
    Test-NodePackage "@modelcontextprotocol/server-pdf" "PDF MCP"
    
    # Image Processing MCP
    Test-NodePackage "@modelcontextprotocol/server-image" "Image Processing MCP"
    
    # Translation MCP
    Test-NodePackage "@modelcontextprotocol/server-translate" "Translation MCP"
    
    # Weather MCP
    Test-NodePackage "@modelcontextprotocol/server-weather" "Weather MCP"
}

function Test-ExistingMCPs {
    Write-Host "`n✅ Testing Existing Working MCPs" -ForegroundColor $Colors.Header
    
    # Test Docker-based MCPs
    if (Test-Command "docker") {
        Test-DockerImage "mcp/notion" "Notion MCP (Docker)"
        Test-DockerImage "mcp/exa" "Exa MCP (Docker)"
        Test-DockerImage "mcp/github-mcp-server" "GitHub MCP (Docker)"
    }
    
    # Test GitHub MCP
    Test-NodePackage "@modelcontextprotocol/server-github" "GitHub MCP"
    
    # Test Playwright MCP
    Test-NodePackage "@playwright/mcp@latest" "Playwright MCP"
}

function Test-ClaudeDesktopIntegration {
    Write-Host "`n🖥️ Testing Claude Desktop Integration" -ForegroundColor $Colors.Header
    
    $ClaudeConfigDir = "$env:APPDATA\Claude"
    $ClaudeConfigFile = "$ClaudeConfigDir\claude_desktop_config.json"
    
    if (Test-Path $ClaudeConfigFile) {
        Write-TestResult -TestName "Claude Desktop Config File" -Status "PASS"
        
        try {
            $Config = Get-Content $ClaudeConfigFile -Raw | ConvertFrom-Json
            if ($Config.mcpServers) {
                $ServerCount = ($Config.mcpServers | Get-Member -MemberType NoteProperty | Where-Object { $_.Name -notmatch "^//" }).Count
                Write-TestResult -TestName "Claude Desktop MCP Servers" -Status "PASS" -Message "$ServerCount servers configured"
            } else {
                Write-TestResult -TestName "Claude Desktop MCP Servers" -Status "FAIL" -Message "No mcpServers section found"
            }
        }
        catch {
            Write-TestResult -TestName "Claude Desktop Config Validation" -Status "FAIL" -Message "Invalid JSON format"
        }
    } else {
        Write-TestResult -TestName "Claude Desktop Config File" -Status "FAIL" -Message "Config file not found at $ClaudeConfigFile"
    }
}

function Test-SyncBridge {
    Write-Host "`n🔄 Testing MCP Sync Bridge" -ForegroundColor $Colors.Header
    
    if (Test-Path "mcp-sync-bridge.js") {
        Write-TestResult -TestName "Sync Bridge Script Available" -Status "PASS"
        
        # Test if sync bridge process is running
        $SyncProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -match "mcp-sync-bridge" }
        if ($SyncProcess) {
            Write-TestResult -TestName "Sync Bridge Running" -Status "PASS" -Message "Process ID: $($SyncProcess.Id)"
        } else {
            Write-TestResult -TestName "Sync Bridge Running" -Status "FAIL" -Message "Process not found"
        }
    } else {
        Write-TestResult -TestName "Sync Bridge Script Available" -Status "FAIL" -Message "mcp-sync-bridge.js not found"
    }
}

function Test-QuickHealthCheck {
    Write-Host "`n⚡ Quick Health Check" -ForegroundColor $Colors.Header
    
    # Test only the most critical MCPs
    $CriticalMCPs = @(
        @{ Package = "@modelcontextprotocol/server-filesystem"; Name = "Filesystem MCP" },
        @{ Package = "@modelcontextprotocol/server-memory"; Name = "Memory MCP" },
        @{ Package = "@cyanheads/git-mcp-server"; Name = "Git MCP" }
    )
    
    foreach ($MCP in $CriticalMCPs) {
        Test-NodePackage $MCP.Package $MCP.Name
    }
}

function Generate-TestReport {
    Write-Host "`n📊 Generating Test Report" -ForegroundColor $Colors.Header
    
    $Report = @{
        Timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        Summary = @{
            Total = $Script:TestResults.Total
            Passed = $Script:TestResults.Passed
            Failed = $Script:TestResults.Failed
            Skipped = $Script:TestResults.Skipped
            SuccessRate = if ($Script:TestResults.Total -gt 0) { [math]::Round(($Script:TestResults.Passed / $Script:TestResults.Total) * 100, 2) } else { 0 }
        }
        Environment = @{
            OS = $env:OS
            NodeVersion = if (Test-Command "node") { & node --version } else { "Not Available" }
            NpmVersion = if (Test-Command "npm") { & npm --version } else { "Not Available" }
            DockerVersion = if (Test-Command "docker") { & docker --version } else { "Not Available" }
        }
        Tests = $Script:TestResults.Tests
    }
    
    $Report | ConvertTo-Json -Depth 10 | Out-File $ReportFile -Encoding UTF8
    Write-TestResult -TestName "Test Report Generated" -Status "PASS" -Message "Report saved to $ReportFile"
}

function Show-TestSummary {
    Write-Host "`n" -NoNewline
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    Write-Host "MCP TESTING SUMMARY" -ForegroundColor $Colors.Header
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    
    $SuccessRate = if ($Script:TestResults.Total -gt 0) { [math]::Round(($Script:TestResults.Passed / $Script:TestResults.Total) * 100, 2) } else { 0 }
    
    Write-Host "`n📊 TEST STATISTICS:" -ForegroundColor $Colors.Info
    Write-Host "  • Total Tests: $($Script:TestResults.Total)" -ForegroundColor $Colors.Info
    Write-Host "  • Passed: $($Script:TestResults.Passed)" -ForegroundColor $Colors.Success
    Write-Host "  • Failed: $($Script:TestResults.Failed)" -ForegroundColor $Colors.Error
    Write-Host "  • Skipped: $($Script:TestResults.Skipped)" -ForegroundColor $Colors.Warning
    Write-Host "  • Success Rate: $SuccessRate%" -ForegroundColor $Colors.Info
    
    if ($Script:TestResults.Failed -gt 0) {
        Write-Host "`n❌ FAILED TESTS:" -ForegroundColor $Colors.Error
        $Script:TestResults.Tests | Where-Object { $_.Status -eq "FAIL" } | ForEach-Object {
            Write-Host "  • $($_.Name): $($_.Message)" -ForegroundColor $Colors.Error
        }
    }
    
    if ($Script:TestResults.Skipped -gt 0) {
        Write-Host "`n⏭️ SKIPPED TESTS:" -ForegroundColor $Colors.Warning
        $Script:TestResults.Tests | Where-Object { $_.Status -eq "SKIP" } | ForEach-Object {
            Write-Host "  • $($_.Name): $($_.Message)" -ForegroundColor $Colors.Warning
        }
    }
    
    Write-Host "`n📝 RECOMMENDATIONS:" -ForegroundColor $Colors.Header
    if ($Script:TestResults.Failed -gt 0) {
        Write-Host "  • Review failed tests and check installation" -ForegroundColor $Colors.Info
        Write-Host "  • Ensure all required API keys are configured" -ForegroundColor $Colors.Info
        Write-Host "  • Run installation script if packages are missing" -ForegroundColor $Colors.Info
    }
    if ($SuccessRate -ge 80) {
        Write-Host "  • Overall health is good! ✅" -ForegroundColor $Colors.Success
    } elseif ($SuccessRate -ge 60) {
        Write-Host "  • Some issues detected, review failed tests ⚠️" -ForegroundColor $Colors.Warning
    } else {
        Write-Host "  • Significant issues detected, reinstallation recommended ❌" -ForegroundColor $Colors.Error
    }
    
    Write-Host "`n🎉 MCP TESTING COMPLETE!" -ForegroundColor $Colors.Success
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

function Main {
    Write-Host "🧪 COMPREHENSIVE MCP TESTING SCRIPT" -ForegroundColor $Colors.Header
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    Write-Host "Testing MCP servers for Claude Code in Cursor IDE..." -ForegroundColor $Colors.Info
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    
    # Quick test mode
    if ($QuickTest) {
        Write-Host "Running in QUICK TEST mode..." -ForegroundColor $Colors.Warning
        Test-Prerequisites
        Test-ConfigurationFile
        Test-QuickHealthCheck
        Show-TestSummary
        return
    }
    
    # Full test suite
    Test-Prerequisites
    Test-EnvironmentFile
    Test-ConfigurationFile
    Test-ExistingMCPs
    Test-EssentialMCPs
    Test-DatabaseMCPs
    Test-GoogleWorkspaceMCPs
    Test-CommunicationMCPs
    Test-UtilityMCPs
    Test-ClaudeDesktopIntegration
    Test-SyncBridge
    
    # Generate report if requested
    if ($GenerateReport) {
        Generate-TestReport
    }
    
    # Show summary
    Show-TestSummary
}

# Run the main function
Main