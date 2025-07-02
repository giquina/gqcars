# ============================================================================
# Test-MCP-Servers.ps1
# Comprehensive MCP Server Testing & Validation Script
# ============================================================================

param(
    [switch]$Detailed = $false,
    [switch]$Interactive = $false,
    [switch]$SkipFunctionTests = $false,
    [string[]]$ServersToTest = @(),
    [int]$TimeoutSeconds = 30
)

# Script Configuration
$Script:LogFile = "$env:TEMP\MCP-Test-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$Script:ConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
$Script:TestResults = @()

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
            "INFO" { "Cyan" }
            default { "White" }
        }
    )
    Add-Content -Path $Script:LogFile -Value $logEntry
}

function New-TestResult {
    param(
        [string]$ServerName,
        [string]$TestName,
        [bool]$Passed,
        [string]$Message = "",
        [string]$Details = ""
    )
    
    return [PSCustomObject]@{
        ServerName = $ServerName
        TestName = $TestName
        Passed = $Passed
        Message = $Message
        Details = $Details
        Timestamp = Get-Date
    }
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

function Invoke-CommandWithTimeout {
    param(
        [string]$Command,
        [string[]]$Arguments,
        [int]$TimeoutSeconds = 30,
        [hashtable]$Environment = @{}
    )
    
    try {
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = $Command
        $psi.Arguments = $Arguments -join " "
        $psi.RedirectStandardOutput = $true
        $psi.RedirectStandardError = $true
        $psi.UseShellExecute = $false
        $psi.CreateNoWindow = $true
        
        # Add environment variables
        foreach ($key in $Environment.Keys) {
            $psi.EnvironmentVariables[$key] = $Environment[$key]
        }
        
        $process = New-Object System.Diagnostics.Process
        $process.StartInfo = $psi
        
        $outputBuilder = New-Object System.Text.StringBuilder
        $errorBuilder = New-Object System.Text.StringBuilder
        
        $outputAction = {
            if ($Event.SourceEventArgs.Data) {
                $outputBuilder.AppendLine($Event.SourceEventArgs.Data)
            }
        }
        
        $errorAction = {
            if ($Event.SourceEventArgs.Data) {
                $errorBuilder.AppendLine($Event.SourceEventArgs.Data)
            }
        }
        
        Register-ObjectEvent -InputObject $process -EventName OutputDataReceived -Action $outputAction | Out-Null
        Register-ObjectEvent -InputObject $process -EventName ErrorDataReceived -Action $errorAction | Out-Null
        
        $process.Start() | Out-Null
        $process.BeginOutputReadLine()
        $process.BeginErrorReadLine()
        
        if (-not $process.WaitForExit($TimeoutSeconds * 1000)) {
            $process.Kill()
            return @{
                Success = $false
                Output = ""
                Error = "Process timed out after $TimeoutSeconds seconds"
                ExitCode = -1
            }
        }
        
        return @{
            Success = $process.ExitCode -eq 0
            Output = $outputBuilder.ToString()
            Error = $errorBuilder.ToString()
            ExitCode = $process.ExitCode
        }
        
    } catch {
        return @{
            Success = $false
            Output = ""
            Error = $_.Exception.Message
            ExitCode = -2
        }
    }
}

# ============================================================================
# CONFIGURATION LOADING
# ============================================================================

function Get-MCPConfiguration {
    if (-not (Test-Path $Script:ConfigPath)) {
        Write-Log "Configuration file not found: $Script:ConfigPath" "ERROR"
        return $null
    }
    
    try {
        $configContent = Get-Content $Script:ConfigPath -Raw
        $config = $configContent | ConvertFrom-Json
        Write-Log "Configuration loaded successfully" "SUCCESS"
        return $config
    } catch {
        Write-Log "Failed to parse configuration: $($_.Exception.Message)" "ERROR"
        return $null
    }
}

# ============================================================================
# INDIVIDUAL SERVER TESTS
# ============================================================================

function Test-NotionMCP {
    param([hashtable]$ServerConfig)
    
    $results = @()
    
    # Test 1: Command availability
    $dockerAvailable = Test-Command "docker"
    $results += New-TestResult -ServerName "notion" -TestName "Command Available (docker)" -Passed $dockerAvailable -Message $(if ($dockerAvailable) { "Docker command found" } else { "Docker command not found" })
    
    if (-not $dockerAvailable) {
        return $results
    }
    
    # Test 2: Docker image availability
    try {
        $imageCheck = & docker images --format "table {{.Repository}}:{{.Tag}}" | Select-String "mcp/notion"
        $imageAvailable = $null -ne $imageCheck
        $results += New-TestResult -ServerName "notion" -TestName "Docker Image Available" -Passed $imageAvailable -Message $(if ($imageAvailable) { "mcp/notion image found" } else { "mcp/notion image not found" })
    } catch {
        $results += New-TestResult -ServerName "notion" -TestName "Docker Image Available" -Passed $false -Message "Error checking Docker images: $($_.Exception.Message)"
    }
    
    # Test 3: Environment variable check
    $envVarSet = $ServerConfig.env -and $ServerConfig.env.INTERNAL_INTEGRATION_TOKEN
    $results += New-TestResult -ServerName "notion" -TestName "Environment Variable Set" -Passed $envVarSet -Message $(if ($envVarSet) { "INTERNAL_INTEGRATION_TOKEN configured" } else { "INTERNAL_INTEGRATION_TOKEN not configured" })
    
    # Test 4: Token format validation
    if ($envVarSet) {
        $token = $ServerConfig.env.INTERNAL_INTEGRATION_TOKEN
        $tokenValid = $token -match "^ntn_[A-Za-z0-9]{50}$"
        $results += New-TestResult -ServerName "notion" -TestName "Token Format Valid" -Passed $tokenValid -Message $(if ($tokenValid) { "Token format appears valid" } else { "Token format invalid (should be ntn_[50 chars])" })
    }
    
    return $results
}

function Test-PlaywrightMCP {
    param([hashtable]$ServerConfig)
    
    $results = @()
    
    # Test 1: Command availability
    $npxAvailable = Test-Command "npx"
    $results += New-TestResult -ServerName "playwright" -TestName "Command Available (npx)" -Passed $npxAvailable -Message $(if ($npxAvailable) { "npx command found" } else { "npx command not found" })
    
    if (-not $npxAvailable) {
        return $results
    }
    
    # Test 2: Package availability check
    try {
        $packageCheck = Invoke-CommandWithTimeout -Command "npx" -Arguments @("@playwright/mcp@latest", "--help") -TimeoutSeconds 15
        $packageAvailable = $packageCheck.Success -or $packageCheck.Output -match "playwright" -or $packageCheck.Error -match "playwright"
        $results += New-TestResult -ServerName "playwright" -TestName "Package Available" -Passed $packageAvailable -Message $(if ($packageAvailable) { "Playwright MCP package accessible" } else { "Playwright MCP package not accessible" }) -Details $packageCheck.Error
    } catch {
        $results += New-TestResult -ServerName "playwright" -TestName "Package Available" -Passed $false -Message "Error testing package: $($_.Exception.Message)"
    }
    
    return $results
}

function Test-DockerMCP {
    param([hashtable]$ServerConfig)
    
    $results = @()
    
    # Test 1: Command availability
    $uvxAvailable = Test-Command "uvx"
    $results += New-TestResult -ServerName "docker-mcp" -TestName "Command Available (uvx)" -Passed $uvxAvailable -Message $(if ($uvxAvailable) { "uvx command found" } else { "uvx command not found" })
    
    if (-not $uvxAvailable) {
        return $results
    }
    
    # Test 2: Package availability
    try {
        $packageCheck = Invoke-CommandWithTimeout -Command "uvx" -Arguments @("docker-mcp", "--help") -TimeoutSeconds 15
        $packageAvailable = $packageCheck.Success -or $packageCheck.Output -match "docker" -or $packageCheck.Error -match "docker"
        $results += New-TestResult -ServerName "docker-mcp" -TestName "Package Available" -Passed $packageAvailable -Message $(if ($packageAvailable) { "docker-mcp package accessible" } else { "docker-mcp package not accessible" }) -Details $packageCheck.Error
    } catch {
        $results += New-TestResult -ServerName "docker-mcp" -TestName "Package Available" -Passed $false -Message "Error testing package: $($_.Exception.Message)"
    }
    
    # Test 3: Docker daemon accessibility
    try {
        $dockerCheck = & docker ps
        $dockerRunning = $LASTEXITCODE -eq 0
        $results += New-TestResult -ServerName "docker-mcp" -TestName "Docker Daemon Running" -Passed $dockerRunning -Message $(if ($dockerRunning) { "Docker daemon accessible" } else { "Docker daemon not running or not accessible" })
    } catch {
        $results += New-TestResult -ServerName "docker-mcp" -TestName "Docker Daemon Running" -Passed $false -Message "Error checking Docker daemon: $($_.Exception.Message)"
    }
    
    return $results
}

function Test-GitHubMCP {
    param([hashtable]$ServerConfig)
    
    $results = @()
    
    # Test 1: Command availability
    $npxAvailable = Test-Command "npx"
    $results += New-TestResult -ServerName "github" -TestName "Command Available (npx)" -Passed $npxAvailable -Message $(if ($npxAvailable) { "npx command found" } else { "npx command not found" })
    
    if (-not $npxAvailable) {
        return $results
    }
    
    # Test 2: Package availability
    try {
        $packageCheck = Invoke-CommandWithTimeout -Command "npx" -Arguments @("-y", "@modelcontextprotocol/server-github", "--help") -TimeoutSeconds 15
        $packageAvailable = $packageCheck.Success -or $packageCheck.Output -match "github" -or $packageCheck.Error -match "github"
        $results += New-TestResult -ServerName "github" -TestName "Package Available" -Passed $packageAvailable -Message $(if ($packageAvailable) { "GitHub MCP package accessible" } else { "GitHub MCP package not accessible" }) -Details $packageCheck.Error
    } catch {
        $results += New-TestResult -ServerName "github" -TestName "Package Available" -Passed $false -Message "Error testing package: $($_.Exception.Message)"
    }
    
    # Test 3: Environment variable check
    $envVarSet = $ServerConfig.env -and $ServerConfig.env.GITHUB_PERSONAL_ACCESS_TOKEN
    $results += New-TestResult -ServerName "github" -TestName "Environment Variable Set" -Passed $envVarSet -Message $(if ($envVarSet) { "GITHUB_PERSONAL_ACCESS_TOKEN configured" } else { "GITHUB_PERSONAL_ACCESS_TOKEN not configured" })
    
    # Test 4: Token format validation
    if ($envVarSet) {
        $token = $ServerConfig.env.GITHUB_PERSONAL_ACCESS_TOKEN
        $tokenValid = $token -match "^(ghp_|github_pat_)[A-Za-z0-9_]+"
        $results += New-TestResult -ServerName "github" -TestName "Token Format Valid" -Passed $tokenValid -Message $(if ($tokenValid) { "Token format appears valid" } else { "Token format invalid (should start with ghp_ or github_pat_)" })
    }
    
    return $results
}

function Test-ExaMCP {
    param([hashtable]$ServerConfig)
    
    $results = @()
    
    # Test 1: Command availability
    $dockerAvailable = Test-Command "docker"
    $results += New-TestResult -ServerName "exa" -TestName "Command Available (docker)" -Passed $dockerAvailable -Message $(if ($dockerAvailable) { "Docker command found" } else { "Docker command not found" })
    
    if (-not $dockerAvailable) {
        return $results
    }
    
    # Test 2: Docker image availability
    try {
        $imageCheck = & docker images --format "table {{.Repository}}:{{.Tag}}" | Select-String "mcp/exa"
        $imageAvailable = $null -ne $imageCheck
        $results += New-TestResult -ServerName "exa" -TestName "Docker Image Available" -Passed $imageAvailable -Message $(if ($imageAvailable) { "mcp/exa image found" } else { "mcp/exa image not found" })
    } catch {
        $results += New-TestResult -ServerName "exa" -TestName "Docker Image Available" -Passed $false -Message "Error checking Docker images: $($_.Exception.Message)"
    }
    
    # Test 3: Environment variable check
    $envVarSet = $ServerConfig.env -and $ServerConfig.env.EXA_API_KEY
    $results += New-TestResult -ServerName "exa" -TestName "Environment Variable Set" -Passed $envVarSet -Message $(if ($envVarSet) { "EXA_API_KEY configured" } else { "EXA_API_KEY not configured" })
    
    # Test 4: API key format validation
    if ($envVarSet) {
        $apiKey = $ServerConfig.env.EXA_API_KEY
        $keyValid = $apiKey -match "^[A-Za-z0-9]{32,}$"
        $results += New-TestResult -ServerName "exa" -TestName "API Key Format Valid" -Passed $keyValid -Message $(if ($keyValid) { "API key format appears valid" } else { "API key format invalid (should be 32+ alphanumeric characters)" })
    }
    
    return $results
}

# ============================================================================
# FUNCTIONAL TESTS
# ============================================================================

function Test-ServerFunctionality {
    param(
        [string]$ServerName,
        [hashtable]$ServerConfig
    )
    
    if ($SkipFunctionTests) {
        Write-Log "Skipping functional tests for $ServerName (user requested)" "INFO"
        return @()
    }
    
    Write-Log "Running functional test for $ServerName..." "INFO"
    
    $results = @()
    
    try {
        $command = $ServerConfig.command
        $args = $ServerConfig.args
        $env = if ($ServerConfig.env) { $ServerConfig.env } else { @{} }
        
        # Try to start the server and get initial response
        $testResult = Invoke-CommandWithTimeout -Command $command -Arguments $args -TimeoutSeconds $TimeoutSeconds -Environment $env
        
        $functionalTest = $testResult.Success -or ($testResult.Output -match "server|listening|started|ready") -or ($testResult.Error -match "server|listening|started|ready")
        
        $results += New-TestResult -ServerName $ServerName -TestName "Functional Test" -Passed $functionalTest -Message $(if ($functionalTest) { "Server appears to start correctly" } else { "Server failed to start or respond" }) -Details "$($testResult.Output)`n$($testResult.Error)"
        
    } catch {
        $results += New-TestResult -ServerName $ServerName -TestName "Functional Test" -Passed $false -Message "Error during functional test: $($_.Exception.Message)"
    }
    
    return $results
}

# ============================================================================
# MAIN TESTING FUNCTIONS
# ============================================================================

function Test-AllMCPServers {
    param([PSCustomObject]$Config)
    
    Write-Log "Starting comprehensive MCP server testing..." "INFO"
    
    $allResults = @()
    $serverTesters = @{
        "notion" = { param($config) Test-NotionMCP $config }
        "playwright" = { param($config) Test-PlaywrightMCP $config }
        "docker-mcp" = { param($config) Test-DockerMCP $config }
        "github" = { param($config) Test-GitHubMCP $config }
        "exa" = { param($config) Test-ExaMCP $config }
    }
    
    $serversToTest = if ($ServersToTest.Count -gt 0) { $ServersToTest } else { $Config.mcpServers.PSObject.Properties.Name }
    
    foreach ($serverName in $serversToTest) {
        if (-not $Config.mcpServers.$serverName) {
            Write-Log "Server '$serverName' not found in configuration" "WARN"
            continue
        }
        
        Write-Host "`n--- Testing $serverName ---" -ForegroundColor Yellow
        
        $serverConfig = $Config.mcpServers.$serverName
        
        # Run server-specific tests
        if ($serverTesters[$serverName]) {
            $serverResults = & $serverTesters[$serverName] $serverConfig
        } else {
            Write-Log "No specific tests available for $serverName" "WARN"
            $serverResults = @()
        }
        
        # Run functional tests
        $functionalResults = Test-ServerFunctionality -ServerName $serverName -ServerConfig $serverConfig
        
        $allResults += $serverResults + $functionalResults
        
        # Display results for this server
        foreach ($result in ($serverResults + $functionalResults)) {
            $status = if ($result.Passed) { "✅ PASS" } else { "❌ FAIL" }
            $color = if ($result.Passed) { "Green" } else { "Red" }
            Write-Host "  $status $($result.TestName): $($result.Message)" -ForegroundColor $color
            
            if ($Detailed -and $result.Details) {
                Write-Host "    Details: $($result.Details)" -ForegroundColor Gray
            }
        }
        
        if ($Interactive) {
            Read-Host "Press Enter to continue to next server..."
        }
    }
    
    return $allResults
}

function Show-TestSummary {
    param([array]$Results)
    
    Write-Host "`n============================================================================" -ForegroundColor Cyan
    Write-Host "                              TEST SUMMARY" -ForegroundColor Cyan
    Write-Host "============================================================================" -ForegroundColor Cyan
    
    $totalTests = $Results.Count
    $passedTests = ($Results | Where-Object { $_.Passed }).Count
    $failedTests = $totalTests - $passedTests
    
    Write-Host "`nOverall Results:" -ForegroundColor White
    Write-Host "  Total Tests: $totalTests"
    Write-Host "  Passed: $passedTests" -ForegroundColor Green
    Write-Host "  Failed: $failedTests" -ForegroundColor Red
    Write-Host "  Success Rate: $([math]::Round(($passedTests / $totalTests) * 100, 1))%"
    
    # Group by server
    $serverGroups = $Results | Group-Object ServerName
    
    Write-Host "`nResults by Server:" -ForegroundColor White
    foreach ($group in $serverGroups) {
        $serverPassed = ($group.Group | Where-Object { $_.Passed }).Count
        $serverTotal = $group.Group.Count
        $serverStatus = if ($serverPassed -eq $serverTotal) { "✅" } else { "❌" }
        
        Write-Host "  $serverStatus $($group.Name): $serverPassed/$serverTotal tests passed"
        
        if ($Detailed) {
            foreach ($test in $group.Group) {
                $testStatus = if ($test.Passed) { "✅" } else { "❌" }
                Write-Host "    $testStatus $($test.TestName): $($test.Message)" -ForegroundColor Gray
            }
        }
    }
    
    # Show failed tests
    $failedTests = $Results | Where-Object { -not $_.Passed }
    if ($failedTests.Count -gt 0) {
        Write-Host "`nFailed Tests:" -ForegroundColor Red
        foreach ($test in $failedTests) {
            Write-Host "  ❌ $($test.ServerName) - $($test.TestName): $($test.Message)" -ForegroundColor Red
            if ($test.Details) {
                Write-Host "     $($test.Details)" -ForegroundColor Gray
            }
        }
    }
    
    Write-Host "`n📋 Full log: $Script:LogFile" -ForegroundColor Cyan
}

function Show-Recommendations {
    param([array]$Results)
    
    Write-Host "`n============================================================================" -ForegroundColor Cyan
    Write-Host "                           RECOMMENDATIONS" -ForegroundColor Cyan
    Write-Host "============================================================================" -ForegroundColor Cyan
    
    $recommendations = @()
    
    # Analyze failed tests and provide recommendations
    $failedTests = $Results | Where-Object { -not $_.Passed }
    
    foreach ($test in $failedTests) {
        switch ($test.TestName) {
            "Command Available (docker)" {
                $recommendations += "Install Docker Desktop: https://www.docker.com/products/docker-desktop/"
            }
            "Command Available (npx)" {
                $recommendations += "Install Node.js (includes npm/npx): https://nodejs.org/"
            }
            "Command Available (uvx)" {
                $recommendations += "Install uv and uvx: pip install uv && uv tool install uvx"
            }
            "Docker Image Available" {
                if ($test.ServerName -eq "notion") {
                    $recommendations += "Pull Notion Docker image: docker pull mcp/notion"
                }
                if ($test.ServerName -eq "exa") {
                    $recommendations += "Pull Exa Docker image: docker pull mcp/exa"
                }
            }
            "Package Available" {
                if ($test.ServerName -eq "playwright") {
                    $recommendations += "Install Playwright MCP: npm install -g @playwright/mcp@latest"
                }
                if ($test.ServerName -eq "github") {
                    $recommendations += "Install GitHub MCP: npm install -g @modelcontextprotocol/server-github"
                }
                if ($test.ServerName -eq "docker-mcp") {
                    $recommendations += "Install docker-mcp: uv tool install docker-mcp"
                }
            }
            "Environment Variable Set" {
                $recommendations += "Configure environment variables in claude_desktop_config.json"
            }
            "Token Format Valid" {
                if ($test.ServerName -eq "notion") {
                    $recommendations += "Check Notion integration token format (should be ntn_[50 chars])"
                }
                if ($test.ServerName -eq "github") {
                    $recommendations += "Check GitHub token format (should start with ghp_ or github_pat_)"
                }
            }
            "Docker Daemon Running" {
                $recommendations += "Start Docker Desktop or Docker daemon"
            }
        }
    }
    
    # Remove duplicates and display
    $uniqueRecommendations = $recommendations | Select-Object -Unique
    
    if ($uniqueRecommendations.Count -gt 0) {
        Write-Host "`nTo fix the issues above:" -ForegroundColor Yellow
        for ($i = 0; $i -lt $uniqueRecommendations.Count; $i++) {
            Write-Host "  $($i + 1). $($uniqueRecommendations[$i])" -ForegroundColor Yellow
        }
    } else {
        Write-Host "`n🎉 All tests passed! Your MCP servers are configured correctly." -ForegroundColor Green
    }
    
    Write-Host "`n💡 Additional Tips:" -ForegroundColor Cyan
    Write-Host "  • Restart Claude Desktop after making configuration changes"
    Write-Host "  • Check the Claude Desktop logs if servers still don't appear"
    Write-Host "  • Run this test script after any configuration changes"
    Write-Host "  • Use -Detailed flag for more verbose output"
}

# ============================================================================
# SCRIPT ENTRY POINT
# ============================================================================

function Start-MCPTesting {
    Write-Host "============================================================================" -ForegroundColor Cyan
    Write-Host "     MCP Server Testing & Validation Script" -ForegroundColor Cyan
    Write-Host "============================================================================" -ForegroundColor Cyan
    
    Write-Log "Starting MCP server testing..." "INFO"
    Write-Log "Log file: $Script:LogFile" "INFO"
    
    # Load configuration
    $config = Get-MCPConfiguration
    if (-not $config -or -not $config.mcpServers) {
        Write-Log "No valid MCP configuration found. Run Setup-All-MCP-Servers.ps1 first." "ERROR"
        return $false
    }
    
    Write-Host "`nFound $($config.mcpServers.PSObject.Properties.Count) MCP servers in configuration" -ForegroundColor Green
    
    # Run tests
    $results = Test-AllMCPServers $config
    
    # Save results
    $Script:TestResults = $results
    
    # Show summary
    Show-TestSummary $results
    
    # Show recommendations
    Show-Recommendations $results
    
    # Determine overall success
    $overallSuccess = ($results | Where-Object { -not $_.Passed }).Count -eq 0
    
    return $overallSuccess
}

# Execute main testing
try {
    $result = Start-MCPTesting
    if ($result) {
        Write-Host "`n🎉 All tests passed!" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "`n⚠️ Some tests failed. Check the summary above." -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Log "Unexpected error: $($_.Exception.Message)" "ERROR"
    Write-Log "Stack trace: $($_.ScriptStackTrace)" "ERROR"
    exit 1
}