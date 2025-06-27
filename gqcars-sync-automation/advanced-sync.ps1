# GQ Cars Advanced Auto-Sync PowerShell Script
param(
    [string]$SourcePath = "C:\Users\Student\Desktop\gqcars-frontend",
    [string]$DestPath = "C:\Users\Student\Desktop\gqcars-latest",
    [int]$IntervalSeconds = 10
)

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "GQ Cars Advanced Auto-Sync System" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

# Create file system watcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $SourcePath
$watcher.Filter = "*.*"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Create destination directory if it doesn't exist
if (!(Test-Path $DestPath)) {
    New-Item -ItemType Directory -Path $DestPath -Force
}

function Sync-Files {
    try {
        Write-Host "🔄 Syncing files..." -ForegroundColor Cyan
        
        # Use robocopy for efficient sync
        $robocopyArgs = @(
            $SourcePath,
            $DestPath,
            "/MIR",  # Mirror directory
            "/R:3",  # Retry 3 times
            "/W:1",  # Wait 1 second between retries
            "/NP",   # No progress
            "/NDL",  # No directory list
            "/NC",   # No class
            "/NS"    # No size
        )
        
        $result = Start-Process robocopy -ArgumentList $robocopyArgs -Wait -PassThru -WindowStyle Hidden
        
        if ($result.ExitCode -le 3) {
            Write-Host "✅ Sync completed successfully! $(Get-Date)" -ForegroundColor Green
        } else {
            Write-Host "❌ Sync failed with exit code: $($result.ExitCode)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "❌ Error during sync: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Initial sync
Sync-Files

# Register event handlers
Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action { Sync-Files }
Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action { Sync-Files }
Register-ObjectEvent -InputObject $watcher -EventName "Deleted" -Action { Sync-Files }
Register-ObjectEvent -InputObject $watcher -EventName "Renamed" -Action { Sync-Files }

Write-Host "👁️ Monitoring for changes... Press Ctrl+C to stop" -ForegroundColor Green

try {
    while ($true) {
        Start-Sleep -Seconds $IntervalSeconds
    }
}
finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Write-Host "🛑 Auto-sync stopped" -ForegroundColor Yellow
}
