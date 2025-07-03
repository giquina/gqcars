# 🛡️ GQ Cars Development Environment - Backup & Recovery Procedures

## 📊 **CRITICAL SYSTEM ASSETS TO PROTECT**

### **🔒 HIGH PRIORITY ASSETS:**
1. **Agent Configuration** - `.agents/config/` (Business logic)
2. **Agent Dashboard** - `.agents/dashboard/` (Interface)
3. **Runtime System** - `.agents/runtime/` (Core engine)
4. **Startup Scripts** - `START-EVERYTHING.ps1`, `start-everything.sh`
5. **Documentation** - All `.md` files (Knowledge base)

### **🔧 MEDIUM PRIORITY ASSETS:**
1. **Main Website** - `apps/web/` (Development state)
2. **Database Schema** - `apps/web/prisma/` (Data structure)
3. **Environment Config** - `.env` files (Settings)
4. **Package Dependencies** - `package.json`, `package-lock.json`

---

## 🔄 **AUTOMATED BACKUP PROCEDURES**

### **Daily Backup Script (Linux/WSL)**
```bash
#!/bin/bash
# File: backup-daily.sh

BACKUP_DIR="/mnt/c/Users/Student/Backups/gqcars-daily"
PROJECT_DIR="/mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production"
DATE=$(date +%Y%m%d_%H%M%S)

echo "🛡️ Starting daily backup: $DATE"

# Create backup directory
mkdir -p "$BACKUP_DIR/$DATE"

# 1. Agent System (Critical)
echo "📁 Backing up agent system..."
cp -r "$PROJECT_DIR/.agents" "$BACKUP_DIR/$DATE/"

# 2. Documentation (Critical)
echo "📚 Backing up documentation..."
cp "$PROJECT_DIR"/*.md "$BACKUP_DIR/$DATE/"

# 3. Startup Scripts (Critical)
echo "🚀 Backing up startup scripts..."
cp "$PROJECT_DIR"/*.ps1 "$PROJECT_DIR"/*.sh "$BACKUP_DIR/$DATE/"

# 4. Configuration Files
echo "⚙️ Backing up configurations..."
cp "$PROJECT_DIR/package.json" "$BACKUP_DIR/$DATE/" 2>/dev/null || true
cp "$PROJECT_DIR/apps/web/package.json" "$BACKUP_DIR/$DATE/web-package.json" 2>/dev/null || true

# 5. Git commit info
echo "📝 Saving git state..."
cd "$PROJECT_DIR"
git log --oneline -10 > "$BACKUP_DIR/$DATE/git-recent-commits.txt"
git status > "$BACKUP_DIR/$DATE/git-status.txt"

# 6. System state
echo "📊 Saving system state..."
./status-check.sh > "$BACKUP_DIR/$DATE/system-status.txt" 2>&1 || echo "Status check failed" > "$BACKUP_DIR/$DATE/system-status.txt"

# 7. Cleanup old backups (keep 7 days)
find "$BACKUP_DIR" -maxdepth 1 -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null

echo "✅ Daily backup complete: $BACKUP_DIR/$DATE"
ls -la "$BACKUP_DIR/$DATE"
```

### **Weekly Full Backup Script (PowerShell)**
```powershell
# File: BACKUP-WEEKLY.ps1

$BackupDir = "C:\Users\Student\Backups\gqcars-weekly"
$ProjectDir = "C:\Users\Student\Documents\Development_Projects\gqcars-main-production"
$Date = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "🛡️ Starting weekly full backup: $Date" -ForegroundColor Cyan

# Create backup directory
New-Item -ItemType Directory -Force -Path "$BackupDir\$Date" | Out-Null

# 1. Complete Agent System
Write-Host "🤖 Backing up complete agent system..." -ForegroundColor Green
Copy-Item -Recurse "$ProjectDir\.agents" "$BackupDir\$Date\" -Force

# 2. Complete Web Application
Write-Host "🌐 Backing up web application..." -ForegroundColor Green
Copy-Item -Recurse "$ProjectDir\apps" "$BackupDir\$Date\" -Force

# 3. All Documentation
Write-Host "📚 Backing up all documentation..." -ForegroundColor Green
Copy-Item "$ProjectDir\*.md" "$BackupDir\$Date\" -Force

# 4. All Scripts
Write-Host "🚀 Backing up all scripts..." -ForegroundColor Green
Copy-Item "$ProjectDir\*.ps1" "$BackupDir\$Date\" -Force
Copy-Item "$ProjectDir\*.sh" "$BackupDir\$Date\" -Force

# 5. Configuration Files
Write-Host "⚙️ Backing up configurations..." -ForegroundColor Green
Copy-Item "$ProjectDir\package.json" "$BackupDir\$Date\" -Force -ErrorAction SilentlyContinue
Copy-Item "$ProjectDir\.env*" "$BackupDir\$Date\" -Force -ErrorAction SilentlyContinue

# 6. Git Repository State
Write-Host "📝 Saving git repository state..." -ForegroundColor Green
cd $ProjectDir
git log --oneline -20 | Out-File "$BackupDir\$Date\git-commits.txt"
git status | Out-File "$BackupDir\$Date\git-status.txt"
git branch -a | Out-File "$BackupDir\$Date\git-branches.txt"

# 7. System Information
Write-Host "📊 Saving system information..." -ForegroundColor Green
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, TotalPhysicalMemory | Out-File "$BackupDir\$Date\system-info.txt"
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Out-File "$BackupDir\$Date\node-processes.txt"

# 8. Create ZIP Archive
Write-Host "📦 Creating ZIP archive..." -ForegroundColor Green
Compress-Archive -Path "$BackupDir\$Date\*" -DestinationPath "$BackupDir\gqcars-backup-$Date.zip" -Force

# 9. Cleanup old backups (keep 4 weeks)
Get-ChildItem "$BackupDir" -Directory | Where-Object {$_.CreationTime -lt (Get-Date).AddDays(-28)} | Remove-Item -Recurse -Force

Write-Host "✅ Weekly backup complete!" -ForegroundColor Green
Write-Host "📁 Location: $BackupDir\gqcars-backup-$Date.zip" -ForegroundColor Yellow
Write-Host "📊 Size: $((Get-Item "$BackupDir\gqcars-backup-$Date.zip").Length / 1MB) MB" -ForegroundColor White
```

---

## 🔧 **RECOVERY PROCEDURES**

### **Emergency Agent System Recovery**
```bash
#!/bin/bash
# Quick recovery for agent system failure

BACKUP_DIR="/mnt/c/Users/Student/Backups/gqcars-daily"
PROJECT_DIR="/mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production"

echo "🚨 EMERGENCY AGENT RECOVERY INITIATED"

# 1. Stop all running agents
echo "🛑 Stopping all agents..."
pkill -f "node.*gqcars" 2>/dev/null || true
pkill -f "npm.*dashboard" 2>/dev/null || true

# 2. Find latest backup
LATEST_BACKUP=$(ls -t "$BACKUP_DIR" | head -1)
echo "📁 Using backup: $LATEST_BACKUP"

# 3. Backup current broken state
echo "💾 Backing up current state..."
mv "$PROJECT_DIR/.agents" "$PROJECT_DIR/.agents.broken.$(date +%Y%m%d_%H%M%S)" 2>/dev/null || true

# 4. Restore from backup
echo "🔄 Restoring agent system..."
cp -r "$BACKUP_DIR/$LATEST_BACKUP/.agents" "$PROJECT_DIR/"

# 5. Reinstall dependencies
echo "📦 Reinstalling dependencies..."
cd "$PROJECT_DIR/.agents"
npm install

# 6. Test recovery
echo "🧪 Testing recovery..."
timeout 30s npm run dashboard &
sleep 10

if curl -s http://localhost:3002/api/agents > /dev/null; then
    echo "✅ RECOVERY SUCCESSFUL!"
    echo "🌐 Dashboard: http://localhost:3002"
else
    echo "❌ Recovery failed - manual intervention needed"
fi
```

### **Complete System Recovery (PowerShell)**
```powershell
# EMERGENCY-RECOVERY.ps1
# Complete system restoration from weekly backup

param(
    [string]$BackupDate = ""
)

$BackupDir = "C:\Users\Student\Backups\gqcars-weekly"
$ProjectDir = "C:\Users\Student\Documents\Development_Projects\gqcars-main-production"

Write-Host "🚨 EMERGENCY COMPLETE SYSTEM RECOVERY" -ForegroundColor Red

# 1. Find backup to restore
if ($BackupDate -eq "") {
    $LatestBackup = Get-ChildItem "$BackupDir\*.zip" | Sort-Object CreationTime -Descending | Select-Object -First 1
} else {
    $LatestBackup = Get-ChildItem "$BackupDir\*$BackupDate*.zip" | Select-Object -First 1
}

if (-not $LatestBackup) {
    Write-Host "❌ No backup found!" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Using backup: $($LatestBackup.Name)" -ForegroundColor Yellow

# 2. Stop all processes
Write-Host "🛑 Stopping all processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*node*" -and $_.CommandLine -like "*gqcars*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# 3. Backup current broken state
$BackupCurrentDate = Get-Date -Format "yyyyMMdd_HHmmss"
Write-Host "💾 Backing up current broken state..." -ForegroundColor Yellow
Move-Item "$ProjectDir" "$ProjectDir.broken.$BackupCurrentDate" -Force -ErrorAction SilentlyContinue

# 4. Extract backup
Write-Host "🔄 Extracting backup..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path $ProjectDir | Out-Null
Expand-Archive -Path $LatestBackup.FullName -DestinationPath $ProjectDir -Force

# 5. Restore dependencies
Write-Host "📦 Restoring dependencies..." -ForegroundColor Green
cd "$ProjectDir\.agents"
npm install

cd "$ProjectDir\apps\web"
npm install

# 6. Test recovery
Write-Host "🧪 Testing recovery..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ProjectDir\.agents'; npm run dashboard" -WindowStyle Minimized
Start-Sleep 10

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3002/api/agents" -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ RECOVERY SUCCESSFUL!" -ForegroundColor Green
    Write-Host "🌐 Dashboard: http://localhost:3002" -ForegroundColor Cyan
    Write-Host "🚀 Website: http://localhost:3000" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Recovery failed - manual intervention needed" -ForegroundColor Red
    Write-Host "Check logs and try manual startup" -ForegroundColor Yellow
}
```

---

## 📋 **BACKUP VERIFICATION CHECKLIST**

### **Daily Verification (Automated)**
```bash
# backup-verify.sh
#!/bin/bash

BACKUP_DIR="/mnt/c/Users/Student/Backups/gqcars-daily"
LATEST=$(ls -t "$BACKUP_DIR" | head -1)

echo "🔍 Verifying backup: $LATEST"

# Check critical files exist
FILES=(
    ".agents/config/gqcars-master-config.json"
    ".agents/dashboard/server.js"
    ".agents/runtime/agent-orchestrator.js"
    "START-EVERYTHING.ps1"
    "start-everything.sh"
    "MAINTENANCE_PROCEDURES.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$BACKUP_DIR/$LATEST/$file" ]; then
        echo "✅ $file"
    else
        echo "❌ MISSING: $file"
    fi
done

# Check backup size (should be > 1MB)
SIZE=$(du -sm "$BACKUP_DIR/$LATEST" | cut -f1)
if [ $SIZE -gt 1 ]; then
    echo "✅ Backup size: ${SIZE}MB"
else
    echo "⚠️ Backup size too small: ${SIZE}MB"
fi

echo "🔍 Verification complete"
```

### **Weekly Verification Checklist**
- [ ] All agent configurations present
- [ ] Dashboard server functional
- [ ] Documentation complete
- [ ] Startup scripts executable
- [ ] Git history preserved
- [ ] ZIP archive created successfully
- [ ] Archive size > 10MB
- [ ] Old backups cleaned up

---

## 🔄 **AUTOMATED SCHEDULING**

### **Linux/WSL Cron Jobs**
```bash
# Add to crontab: crontab -e

# Daily backup at 2 AM
0 2 * * * /mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production/backup-daily.sh

# Weekly backup verification at 3 AM on Sundays
0 3 * * 0 /mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production/backup-verify.sh

# Monthly cleanup at 4 AM on 1st of month
0 4 1 * * find /mnt/c/Users/Student/Backups -type f -mtime +90 -delete
```

### **Windows Task Scheduler (PowerShell)**
```powershell
# Create scheduled task for weekly backup
$Action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument '-File "C:\Users\Student\Documents\Development_Projects\gqcars-main-production\BACKUP-WEEKLY.ps1"'
$Trigger = New-ScheduledTaskTrigger -Weekly -WeeksInterval 1 -DaysOfWeek Sunday -At 2am
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

Register-ScheduledTask -TaskName "GQCars Weekly Backup" -Action $Action -Trigger $Trigger -Principal $Principal -Settings $Settings
```

---

## 🚨 **DISASTER RECOVERY SCENARIOS**

### **Scenario 1: Agent System Corruption**
**Symptoms:** Dashboard won't start, agents not responding
**Recovery Time:** 2-5 minutes
**Procedure:** Use Emergency Agent Recovery script

### **Scenario 2: Complete Project Loss**
**Symptoms:** Entire project directory missing/corrupted
**Recovery Time:** 10-15 minutes
**Procedure:** Use Complete System Recovery from weekly backup

### **Scenario 3: Database Schema Corruption**
**Symptoms:** Prisma errors, database won't connect
**Recovery Time:** 5-10 minutes
**Procedure:** Restore from backup, regenerate Prisma client

### **Scenario 4: Configuration Drift**
**Symptoms:** Agents behaving unexpectedly
**Recovery Time:** 1-2 minutes
**Procedure:** Restore agent configuration from daily backup

---

## 📊 **RECOVERY TESTING SCHEDULE**

### **Monthly Recovery Test**
1. Create test corruption scenario
2. Execute recovery procedure
3. Verify all systems operational
4. Document any issues found
5. Update procedures if needed

### **Quarterly Full Recovery Test**
1. Simulate complete system loss
2. Restore from weekly backup
3. Test all functionality
4. Measure recovery time
5. Validate backup integrity

---

## 🛡️ **BACKUP SECURITY & INTEGRITY**

### **Backup Encryption (Optional)**
```bash
# Encrypt sensitive backups
gpg --symmetric --cipher-algo AES256 backup-file.zip
```

### **Backup Verification**
```bash
# Create checksums for integrity verification
find backup-directory -type f -exec sha256sum {} \; > backup-checksums.txt
```

### **Off-site Backup Strategy**
1. **Local Backups:** Daily/Weekly on same machine
2. **Network Backups:** Copy to network drive weekly
3. **Cloud Backups:** Sync critical configs to cloud storage
4. **Version Control:** Git repository serves as code backup

---

## 🎯 **BACKUP SUCCESS METRICS**

### **Daily Metrics**
- [ ] Backup completed successfully
- [ ] All critical files included
- [ ] Backup size within expected range
- [ ] Previous day's backup exists

### **Weekly Metrics**
- [ ] Full system backup completed
- [ ] ZIP archive created successfully
- [ ] Old backups cleaned up
- [ ] Recovery test passed

### **Monthly Metrics**
- [ ] All recovery procedures tested
- [ ] Documentation updated
- [ ] Backup scripts working correctly
- [ ] Storage usage optimized

---

## 🚀 **QUICK RECOVERY COMMANDS**

```bash
# Emergency agent recovery
./EMERGENCY-RECOVERY.sh

# Quick backup before major changes
./backup-daily.sh

# Verify latest backup
./backup-verify.sh

# Test recovery (safe)
./test-recovery.sh

# View backup history
ls -la /mnt/c/Users/Student/Backups/gqcars-daily/
```

---

**🛡️ YOUR AUTONOMOUS DEVELOPMENT ENVIRONMENT IS NOW FULLY PROTECTED!**

*With automated daily backups, weekly full system snapshots, and tested recovery procedures, your GQ Cars project is safe from any disaster! 🚗💨*

---

*Last Updated: 2025-07-03 | Next Review: Monthly*