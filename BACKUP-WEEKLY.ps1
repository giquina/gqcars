# 🛡️ GQ Cars Weekly Full Backup Script
# PowerShell automation for complete system backup

$BackupDir = "C:\Users\Student\Backups\gqcars-weekly"
$ProjectDir = "C:\Users\Student\Documents\Development_Projects\gqcars-main-production"
$Date = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "🛡️ Starting weekly full backup: $Date" -ForegroundColor Cyan

# Create backup directory
New-Item -ItemType Directory -Force -Path "$BackupDir\$Date" | Out-Null
New-Item -ItemType Directory -Force -Path "$BackupDir" -ErrorAction SilentlyContinue | Out-Null

# 1. Complete Agent System
Write-Host "🤖 Backing up complete agent system..." -ForegroundColor Green
if (Test-Path "$ProjectDir\.agents") {
    Copy-Item -Recurse "$ProjectDir\.agents" "$BackupDir\$Date\" -Force
    Write-Host "   ✅ Agent system backed up" -ForegroundColor White
} else {
    Write-Host "   ⚠️ Agent system not found" -ForegroundColor Yellow
}

# 2. Complete Web Application
Write-Host "🌐 Backing up web application..." -ForegroundColor Green
if (Test-Path "$ProjectDir\apps") {
    Copy-Item -Recurse "$ProjectDir\apps" "$BackupDir\$Date\" -Force
    Write-Host "   ✅ Web application backed up" -ForegroundColor White
} else {
    Write-Host "   ⚠️ Web application not found" -ForegroundColor Yellow
}

# 3. All Documentation
Write-Host "📚 Backing up all documentation..." -ForegroundColor Green
$mdFiles = Get-ChildItem "$ProjectDir\*.md" -ErrorAction SilentlyContinue
if ($mdFiles) {
    Copy-Item "$ProjectDir\*.md" "$BackupDir\$Date\" -Force
    Write-Host "   ✅ Documentation backed up ($($mdFiles.Count) files)" -ForegroundColor White
} else {
    Write-Host "   ⚠️ No documentation files found" -ForegroundColor Yellow
}

# 4. All Scripts
Write-Host "🚀 Backing up all scripts..." -ForegroundColor Green
$scripts = @()
$ps1Files = Get-ChildItem "$ProjectDir\*.ps1" -ErrorAction SilentlyContinue
$shFiles = Get-ChildItem "$ProjectDir\*.sh" -ErrorAction SilentlyContinue

if ($ps1Files) {
    Copy-Item "$ProjectDir\*.ps1" "$BackupDir\$Date\" -Force
    $scripts += $ps1Files
}
if ($shFiles) {
    Copy-Item "$ProjectDir\*.sh" "$BackupDir\$Date\" -Force  
    $scripts += $shFiles
}

if ($scripts) {
    Write-Host "   ✅ Scripts backed up ($($scripts.Count) files)" -ForegroundColor White
} else {
    Write-Host "   ⚠️ No script files found" -ForegroundColor Yellow
}

# 5. Configuration Files
Write-Host "⚙️ Backing up configurations..." -ForegroundColor Green
$configs = @()
if (Test-Path "$ProjectDir\package.json") {
    Copy-Item "$ProjectDir\package.json" "$BackupDir\$Date\" -Force
    $configs += "package.json"
}
if (Test-Path "$ProjectDir\.env*") {
    Copy-Item "$ProjectDir\.env*" "$BackupDir\$Date\" -Force -ErrorAction SilentlyContinue
    $configs += ".env files"
}
if (Test-Path "$ProjectDir\apps\web\package.json") {
    Copy-Item "$ProjectDir\apps\web\package.json" "$BackupDir\$Date\web-package.json" -Force
    $configs += "web-package.json"
}

Write-Host "   ✅ Configurations backed up ($($configs -join ', '))" -ForegroundColor White

# 6. Git Repository State
Write-Host "📝 Saving git repository state..." -ForegroundColor Green
try {
    Set-Location $ProjectDir
    git log --oneline -20 2>$null | Out-File "$BackupDir\$Date\git-commits.txt" -Encoding UTF8
    git status 2>$null | Out-File "$BackupDir\$Date\git-status.txt" -Encoding UTF8
    git branch -a 2>$null | Out-File "$BackupDir\$Date\git-branches.txt" -Encoding UTF8
    Write-Host "   ✅ Git state saved" -ForegroundColor White
} catch {
    Write-Host "   ⚠️ Git state could not be saved" -ForegroundColor Yellow
    "Git information unavailable" | Out-File "$BackupDir\$Date\git-status.txt"
}

# 7. System Information
Write-Host "📊 Saving system information..." -ForegroundColor Green
try {
    Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, TotalPhysicalMemory | Out-File "$BackupDir\$Date\system-info.txt" -Encoding UTF8
    Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Out-File "$BackupDir\$Date\node-processes.txt" -Encoding UTF8
    Write-Host "   ✅ System information saved" -ForegroundColor White
} catch {
    Write-Host "   ⚠️ System information could not be saved" -ForegroundColor Yellow
}

# 8. Create backup summary
Write-Host "📋 Creating backup summary..." -ForegroundColor Green
$summary = @"
=== GQ Cars Weekly Full Backup Summary ===
Date: $Date
Backup Location: $BackupDir\$Date

Backup Contents:
$(Get-ChildItem "$BackupDir\$Date" | Format-Table Name, Length, LastWriteTime | Out-String)

Total Backup Size: $([math]::Round((Get-ChildItem "$BackupDir\$Date" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB, 2)) MB

System Information:
- Windows Version: $((Get-ComputerInfo).WindowsProductName)
- PowerShell Version: $($PSVersionTable.PSVersion)
- Backup Script Version: 1.0

Next Backup Due: $(Get-Date (Get-Date).AddDays(7) -Format 'yyyy-MM-dd HH:mm:ss')
"@

$summary | Out-File "$BackupDir\$Date\backup-summary.txt" -Encoding UTF8

# 9. Create ZIP Archive
Write-Host "📦 Creating ZIP archive..." -ForegroundColor Green
try {
    $zipPath = "$BackupDir\gqcars-backup-$Date.zip"
    Compress-Archive -Path "$BackupDir\$Date\*" -DestinationPath $zipPath -Force
    $zipSize = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
    Write-Host "   ✅ ZIP archive created: $zipSize MB" -ForegroundColor White
} catch {
    Write-Host "   ⚠️ ZIP archive creation failed: $_" -ForegroundColor Yellow
}

# 10. Cleanup old backups (keep 4 weeks)
Write-Host "🧹 Cleaning up old backups..." -ForegroundColor Green
try {
    $oldBackups = Get-ChildItem "$BackupDir" -Directory | Where-Object {$_.CreationTime -lt (Get-Date).AddDays(-28)}
    $oldZips = Get-ChildItem "$BackupDir\*.zip" | Where-Object {$_.CreationTime -lt (Get-Date).AddDays(-28)}
    
    $cleanupCount = 0
    $oldBackups | ForEach-Object { Remove-Item $_.FullName -Recurse -Force; $cleanupCount++ }
    $oldZips | ForEach-Object { Remove-Item $_.FullName -Force; $cleanupCount++ }
    
    if ($cleanupCount -gt 0) {
        Write-Host "   ✅ Cleaned up $cleanupCount old backup(s)" -ForegroundColor White
    } else {
        Write-Host "   ✅ No old backups to clean up" -ForegroundColor White
    }
} catch {
    Write-Host "   ⚠️ Cleanup failed: $_" -ForegroundColor Yellow
}

# Final Summary
Write-Host "`n🎉 Weekly backup complete!" -ForegroundColor Green
Write-Host "📁 Location: $BackupDir\$Date" -ForegroundColor Yellow
if (Test-Path "$BackupDir\gqcars-backup-$Date.zip") {
    $finalSize = [math]::Round((Get-Item "$BackupDir\gqcars-backup-$Date.zip").Length / 1MB, 2)
    Write-Host "📦 ZIP Archive: gqcars-backup-$Date.zip ($finalSize MB)" -ForegroundColor Yellow
}
Write-Host "📊 Backup Contents:" -ForegroundColor Cyan
Get-ChildItem "$BackupDir\$Date" | Format-Table Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,1)}} | Out-Host

Write-Host "`n✅ Your GQ Cars autonomous development environment is fully protected! 🚗💨" -ForegroundColor Green