# Complete Automation Environment Setup Guide

## 🎯 Overview
This guide will help you replicate the exact automation environment on your laptop with all scripts, configurations, and settings.

## 📋 Prerequisites
- Windows 10/11 (64-bit)
- PowerShell 5.1+
- Administrator privileges
- Internet connection

## 🚀 Step-by-Step Setup

### Step 1: Create Directory Structure
```powershell
# Create main directories
New-Item -ItemType Directory -Path "C:\Automation" -Force
New-Item -ItemType Directory -Path "C:\Scripts" -Force
New-Item -ItemType Directory -Path "C:\Logs" -Force
New-Item -ItemType Directory -Path "C:\Backups" -Force
New-Item -ItemType Directory -Path "C:\Temp" -Force
New-Item -ItemType Directory -Path "C:\Automation\workflows" -Force
```

### Step 2: Install Dependencies
```powershell
# Install Node.js dependencies
npm install -g n8n typescript ts-node pm2 nodemon

# Install Python dependencies
pip install pywin32 psutil requests beautifulsoup4 lxml
pip install scikit-learn opencv-python nltk spacy transformers
pip install jupyter notebook jupyterlab mlflow
pip install python-nmap paramiko cryptography prometheus-client

# Install Windows tools via Chocolatey
choco install docker-desktop -y
choco install awscli -y
choco install azure-cli -y
choco install nmap -y
```

### Step 3: Set Environment Variables
```powershell
[Environment]::SetEnvironmentVariable("DEV_HOME", "C:\Users\Student\Documents\GitHub\gqcars", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("AUTOMATION_CONFIG", "C:\Automation", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("BACKUP_PATH", "C:\Backups", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("LOG_PATH", "C:\Logs", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("SCRIPTS_PATH", "C:\Scripts", [EnvironmentVariableTarget]::Machine)
```

### Step 4: Configure Security
```powershell
# Windows Defender exclusions
Add-MpPreference -ExclusionPath "C:\Users\Student\Documents\GitHub\gqcars"
Add-MpPreference -ExclusionPath "C:\Automation"
Add-MpPreference -ExclusionPath "C:\Logs"
Add-MpPreference -ExclusionPath "C:\Backups"

# Firewall rules
New-NetFirewallRule -DisplayName "Development Ports" -Direction Inbound -Protocol TCP -LocalPort 3000,5000,8000,8080,9000 -Action Allow
New-NetFirewallRule -DisplayName "Database Ports" -Direction Inbound -Protocol TCP -LocalPort 1433,5432,27017,6379 -Action Allow
```

## 📜 Script Files

### 1. AI Automation Script (C:\Scripts\ai-automation.py)
```python
#!/usr/bin/env python3
"""
AI Automation System
Handles intelligent automation tasks using AI/ML
"""

import os
import sys
import logging
import psutil
import win32api
import win32con
import win32gui
import time
import json
from datetime import datetime
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('C:\\Logs\\ai-automation.log'),
        logging.StreamHandler()
    ]
)

class AIAutomation:
    def __init__(self):
        self.config = self.load_config()
        self.running = True
        
    def load_config(self):
        """Load configuration from file"""
        config_path = Path("C:\\Automation\\config.json")
        if config_path.exists():
            with open(config_path, 'r') as f:
                return json.load(f)
        return {
            "monitoring_interval": 30,
            "ai_enabled": True,
            "auto_optimization": True
        }
    
    def monitor_system(self):
        """Monitor system performance"""
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('C:\\')
        
        logging.info(f"CPU: {cpu_percent}%, Memory: {memory.percent}%, Disk: {disk.percent}%")
        
        # AI-based optimization
        if self.config.get("ai_enabled"):
            self.optimize_system(cpu_percent, memory.percent, disk.percent)
    
    def optimize_system(self, cpu, memory, disk):
        """AI-based system optimization"""
        if cpu > 80:
            logging.info("High CPU usage detected - optimizing processes")
            self.kill_unnecessary_processes()
        
        if memory > 85:
            logging.info("High memory usage detected - clearing cache")
            self.clear_memory_cache()
        
        if disk > 90:
            logging.info("High disk usage detected - cleaning temp files")
            self.clean_temp_files()
    
    def kill_unnecessary_processes(self):
        """Kill unnecessary processes"""
        unnecessary = ['chrome.exe', 'firefox.exe', 'msedge.exe']
        for proc in psutil.process_iter(['pid', 'name']):
            try:
                if proc.info['name'] in unnecessary:
                    proc.terminate()
                    logging.info(f"Terminated process: {proc.info['name']}")
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass
    
    def clear_memory_cache(self):
        """Clear memory cache"""
        try:
            import ctypes
            ctypes.windll.kernel32.SetProcessWorkingSetSize(-1, -1)
            logging.info("Memory cache cleared")
        except Exception as e:
            logging.error(f"Failed to clear memory cache: {e}")
    
    def clean_temp_files(self):
        """Clean temporary files"""
        temp_dirs = [
            os.environ.get('TEMP'),
            os.environ.get('TMP'),
            'C:\\Windows\\Temp'
        ]
        
        for temp_dir in temp_dirs:
            if temp_dir and os.path.exists(temp_dir):
                try:
                    for file in os.listdir(temp_dir):
                        file_path = os.path.join(temp_dir, file)
                        if os.path.isfile(file_path):
                            os.unlink(file_path)
                    logging.info(f"Cleaned temp directory: {temp_dir}")
                except Exception as e:
                    logging.error(f"Failed to clean {temp_dir}: {e}")
    
    def run(self):
        """Main automation loop"""
        logging.info("AI Automation System started")
        
        while self.running:
            try:
                self.monitor_system()
                time.sleep(self.config.get("monitoring_interval", 30))
            except KeyboardInterrupt:
                logging.info("AI Automation System stopped by user")
                self.running = False
            except Exception as e:
                logging.error(f"Error in automation loop: {e}")
                time.sleep(10)

if __name__ == "__main__":
    automation = AIAutomation()
    automation.run()
```

### 2. System Monitor Script (C:\Scripts\monitor-system.ps1)
```powershell
# System Monitoring Script
param(
    [switch]$RealTime,
    [int]$Interval = 30
)

# Configuration
$LogFile = "C:\Logs\system-monitor.log"
$ErrorLogFile = "C:\Logs\system-monitor-errors.log"

# Create log directory if it doesn't exist
if (!(Test-Path "C:\Logs")) {
    New-Item -ItemType Directory -Path "C:\Logs" -Force | Out-Null
}

# Logging function
function Write-Log {
    param($Message, $Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"
    Write-Host $logMessage
    Add-Content -Path $LogFile -Value $logMessage
}

function Write-ErrorLog {
    param($Message, $Exception)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $errorMessage = "[$timestamp] [ERROR] $Message"
    if ($Exception) {
        $errorMessage += "`nException: $($Exception.Message)"
    }
    Write-Host $errorMessage -ForegroundColor Red
    Add-Content -Path $ErrorLogFile -Value $errorMessage
}

# Monitor system performance
function Monitor-SystemPerformance {
    try {
        $cpu = Get-Counter -Counter "\Processor(_Total)\% Processor Time" -SampleInterval 1 -MaxSamples 1
        $memory = Get-Counter -Counter "\Memory\Available MBytes" -SampleInterval 1 -MaxSamples 1
        $disk = Get-Counter -Counter "\PhysicalDisk(_Total)\% Disk Time" -SampleInterval 1 -MaxSamples 1
        
        $cpuPercent = [math]::Round($cpu.CounterSamples[0].CookedValue, 2)
        $memoryMB = [math]::Round($memory.CounterSamples[0].CookedValue, 2)
        $diskPercent = [math]::Round($disk.CounterSamples[0].CookedValue, 2)
        
        Write-Log "CPU: $cpuPercent%, Memory Available: $memoryMB MB, Disk: $diskPercent%"
        
        # Alert if thresholds exceeded
        if ($cpuPercent -gt 80) {
            Write-Log "WARNING: High CPU usage detected" "WARN"
        }
        if ($memoryMB -lt 1000) {
            Write-Log "WARNING: Low memory available" "WARN"
        }
        if ($diskPercent -gt 90) {
            Write-Log "WARNING: High disk usage detected" "WARN"
        }
    }
    catch {
        Write-ErrorLog "Failed to monitor system performance" $_
    }
}

# Monitor running processes
function Monitor-Processes {
    try {
        $processes = Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
        Write-Log "Top 10 CPU processes:"
        foreach ($proc in $processes) {
            Write-Log "  $($proc.ProcessName): $([math]::Round($proc.CPU, 2)) CPU, $([math]::Round($proc.WorkingSet64/1MB, 2)) MB RAM"
        }
    }
    catch {
        Write-ErrorLog "Failed to monitor processes" $_
    }
}

# Monitor services
function Monitor-Services {
    try {
        $services = Get-Service | Where-Object {$_.Status -eq "Stopped" -and $_.StartType -eq "Automatic"}
        if ($services) {
            Write-Log "Stopped automatic services:"
            foreach ($service in $services) {
                Write-Log "  $($service.Name): $($service.DisplayName)"
            }
        }
    }
    catch {
        Write-ErrorLog "Failed to monitor services" $_
    }
}

# Main monitoring loop
function Start-Monitoring {
    Write-Log "System monitoring started"
    
    while ($true) {
        try {
            Monitor-SystemPerformance
            Monitor-Processes
            Monitor-Services
            
            if ($RealTime) {
                Start-Sleep -Seconds 5
            } else {
                Start-Sleep -Seconds $Interval
            }
        }
        catch {
            Write-ErrorLog "Error in monitoring loop" $_
            Start-Sleep -Seconds 10
        }
    }
}

# Start monitoring
Start-Monitoring
```

### 3. Backup System Script (C:\Scripts\backup-system.ps1)
```powershell
# System Backup Script
param(
    [switch]$FullBackup,
    [switch]$Incremental,
    [string]$BackupPath = "C:\Backups"
)

# Configuration
$LogFile = "C:\Logs\backup-system.log"
$ErrorLogFile = "C:\Logs\backup-system-errors.log"

# Create directories if they don't exist
if (!(Test-Path "C:\Logs")) {
    New-Item -ItemType Directory -Path "C:\Logs" -Force | Out-Null
}
if (!(Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
}

# Logging function
function Write-Log {
    param($Message, $Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"
    Write-Host $logMessage
    Add-Content -Path $LogFile -Value $logMessage
}

function Write-ErrorLog {
    param($Message, $Exception)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $errorMessage = "[$timestamp] [ERROR] $Message"
    if ($Exception) {
        $errorMessage += "`nException: $($Exception.Message)"
    }
    Write-Host $errorMessage -ForegroundColor Red
    Add-Content -Path $ErrorLogFile -Value $errorMessage
}

# Create backup
function Create-Backup {
    param($Source, $Destination, $BackupType)
    
    try {
        $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
        $backupName = "$BackupType-$timestamp"
        $backupPath = Join-Path $Destination $backupName
        
        Write-Log "Creating $BackupType backup: $backupPath"
        
        # Use robocopy for reliable copying
        $robocopyArgs = @(
            $Source,
            $backupPath,
            "/MIR",  # Mirror
            "/R:3",  # Retry 3 times
            "/W:10", # Wait 10 seconds between retries
            "/MT:8", # Use 8 threads
            "/LOG:$LogFile.append"  # Append to log
        )
        
        $result = robocopy @robocopyArgs
        
        if ($result -le 7) {
            Write-Log "Backup completed successfully: $backupPath"
            return $backupPath
        } else {
            Write-ErrorLog "Backup failed with exit code: $result"
            return $null
        }
    }
    catch {
        Write-ErrorLog "Failed to create backup" $_
        return $null
    }
}

# Backup important directories
function Backup-ImportantDirectories {
    $backupItems = @{
        "Documents" = "$env:USERPROFILE\Documents"
        "Desktop" = "$env:USERPROFILE\Desktop"
        "Downloads" = "$env:USERPROFILE\Downloads"
        "Automation" = "C:\Automation"
        "Scripts" = "C:\Scripts"
        "GitHub" = "$env:USERPROFILE\Documents\GitHub"
    }
    
    $backupType = if ($FullBackup) { "FULL" } else { "INCREMENTAL" }
    
    foreach ($item in $backupItems.GetEnumerator()) {
        if (Test-Path $item.Value) {
            $backupPath = Create-Backup -Source $item.Value -Destination $BackupPath -BackupType $backupType
            if ($backupPath) {
                Write-Log "Backed up $($item.Key): $backupPath"
            }
        } else {
            Write-Log "Source path not found: $($item.Value)" "WARN"
        }
    }
}

# Clean old backups
function Clean-OldBackups {
    try {
        $retentionDays = 30
        $cutoffDate = (Get-Date).AddDays(-$retentionDays)
        
        $oldBackups = Get-ChildItem -Path $BackupPath -Directory | Where-Object { $_.CreationTime -lt $cutoffDate }
        
        foreach ($backup in $oldBackups) {
            Remove-Item -Path $backup.FullName -Recurse -Force
            Write-Log "Removed old backup: $($backup.Name)"
        }
    }
    catch {
        Write-ErrorLog "Failed to clean old backups" $_
    }
}

# Main backup process
function Start-Backup {
    Write-Log "Starting system backup process"
    
    try {
        # Create backup
        Backup-ImportantDirectories
        
        # Clean old backups
        Clean-OldBackups
        
        Write-Log "System backup process completed"
    }
    catch {
        Write-ErrorLog "Backup process failed" $_
    }
}

# Start backup
Start-Backup
```

### 4. Test Automation Script (C:\Scripts\test-automation.js)
```javascript
// Test Automation System
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

class AutomationTester {
    constructor() {
        this.logFile = 'C:\\Logs\\test-automation.log';
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;
        console.log(logMessage);
        
        // Ensure log directory exists
        const logDir = path.dirname(this.logFile);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        fs.appendFileSync(this.logFile, logMessage + '\n');
    }

    async runTest(testName, testFunction) {
        this.log(`Running test: ${testName}`);
        
        try {
            await testFunction();
            this.results.passed++;
            this.results.tests.push({ name: testName, status: 'PASSED' });
            this.log(`✓ ${testName} - PASSED`);
        } catch (error) {
            this.results.failed++;
            this.results.tests.push({ name: testName, status: 'FAILED', error: error.message });
            this.log(`✗ ${testName} - FAILED: ${error.message}`);
        }
    }

    async testSystemInfo() {
        const platform = os.platform();
        const arch = os.arch();
        const cpus = os.cpus().length;
        const memory = Math.round(os.totalmem() / (1024 * 1024 * 1024));
        
        this.log(`System: ${platform} ${arch}, CPUs: ${cpus}, Memory: ${memory}GB`);
        
        if (platform !== 'win32') {
            throw new Error('System must be Windows');
        }
    }

    async testDirectories() {
        const requiredDirs = [
            'C:\\Automation',
            'C:\\Scripts',
            'C:\\Logs',
            'C:\\Backups'
        ];

        for (const dir of requiredDirs) {
            if (!fs.existsSync(dir)) {
                throw new Error(`Required directory missing: ${dir}`);
            }
        }
    }

    async testNodeJS() {
        return new Promise((resolve, reject) => {
            exec('node --version', (error, stdout) => {
                if (error) {
                    reject(new Error('Node.js not found'));
                } else {
                    this.log(`Node.js version: ${stdout.trim()}`);
                    resolve();
                }
            });
        });
    }

    async testPython() {
        return new Promise((resolve, reject) => {
            exec('python --version', (error, stdout) => {
                if (error) {
                    reject(new Error('Python not found'));
                } else {
                    this.log(`Python version: ${stdout.trim()}`);
                    resolve();
                }
            });
        });
    }

    async testN8N() {
        return new Promise((resolve, reject) => {
            exec('n8n --version', (error, stdout) => {
                if (error) {
                    reject(new Error('n8n not found'));
                } else {
                    this.log(`n8n version: ${stdout.trim()}`);
                    resolve();
                }
            });
        });
    }

    async testPowerShell() {
        return new Promise((resolve, reject) => {
            exec('powershell -Command "Get-ExecutionPolicy"', (error, stdout) => {
                if (error) {
                    reject(new Error('PowerShell execution policy test failed'));
                } else {
                    this.log(`PowerShell execution policy: ${stdout.trim()}`);
                    resolve();
                }
            });
        });
    }

    async testServices() {
        return new Promise((resolve, reject) => {
            exec('powershell -Command "Get-Service | Where-Object {$_.Status -eq \'Running\'} | Measure-Object | Select-Object -ExpandProperty Count"', (error, stdout) => {
                if (error) {
                    reject(new Error('Service check failed'));
                } else {
                    const runningServices = parseInt(stdout.trim());
                    this.log(`Running services: ${runningServices}`);
                    resolve();
                }
            });
        });
    }

    async testNetwork() {
        return new Promise((resolve, reject) => {
            exec('ping -n 1 google.com', (error, stdout) => {
                if (error) {
                    reject(new Error('Network connectivity test failed'));
                } else {
                    this.log('Network connectivity: OK');
                    resolve();
                }
            });
        });
    }

    async runAllTests() {
        this.log('Starting automation system tests...');
        
        await this.runTest('System Information', () => this.testSystemInfo());
        await this.runTest('Required Directories', () => this.testDirectories());
        await this.runTest('Node.js Installation', () => this.testNodeJS());
        await this.runTest('Python Installation', () => this.testPython());
        await this.runTest('n8n Installation', () => this.testN8N());
        await this.runTest('PowerShell Configuration', () => this.testPowerShell());
        await this.runTest('System Services', () => this.testServices());
        await this.runTest('Network Connectivity', () => this.testNetwork());

        // Generate report
        this.generateReport();
    }

    generateReport() {
        this.log('\n=== TEST RESULTS ===');
        this.log(`Total Tests: ${this.results.passed + this.results.failed}`);
        this.log(`Passed: ${this.results.passed}`);
        this.log(`Failed: ${this.results.failed}`);
        this.log(`Success Rate: ${Math.round((this.results.passed / (this.results.passed + this.results.failed)) * 100)}%`);
        
        this.log('\n=== DETAILED RESULTS ===');
        this.results.tests.forEach(test => {
            this.log(`${test.status === 'PASSED' ? '✓' : '✗'} ${test.name}`);
            if (test.error) {
                this.log(`  Error: ${test.error}`);
            }
        });

        // Save detailed report
        const reportPath = 'C:\\Logs\\test-report.json';
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        this.log(`\nDetailed report saved to: ${reportPath}`);
    }
}

// Run tests
const tester = new AutomationTester();
tester.runAllTests().catch(console.error);
```

### 5. Generate Report Script (C:\Scripts\generate-report.py)
```python
#!/usr/bin/env python3
"""
System Report Generator
Generates comprehensive system reports
"""

import os
import sys
import json
import psutil
import platform
import subprocess
import win32api
import win32con
import win32gui
from datetime import datetime
from pathlib import Path

class SystemReporter:
    def __init__(self):
        self.report = {
            "timestamp": datetime.now().isoformat(),
            "system": {},
            "performance": {},
            "software": {},
            "automation": {},
            "security": {},
            "recommendations": []
        }
        
    def generate_system_info(self):
        """Generate system information"""
        self.report["system"] = {
            "platform": platform.platform(),
            "architecture": platform.architecture(),
            "processor": platform.processor(),
            "hostname": platform.node(),
            "python_version": platform.python_version(),
            "boot_time": datetime.fromtimestamp(psutil.boot_time()).isoformat()
        }
        
    def generate_performance_info(self):
        """Generate performance information"""
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('C:\\')
        
        self.report["performance"] = {
            "cpu": {
                "usage_percent": cpu_percent,
                "count": psutil.cpu_count(),
                "frequency": psutil.cpu_freq()._asdict() if psutil.cpu_freq() else None
            },
            "memory": {
                "total_gb": round(memory.total / (1024**3), 2),
                "available_gb": round(memory.available / (1024**3), 2),
                "used_gb": round(memory.used / (1024**3), 2),
                "percent": memory.percent
            },
            "disk": {
                "total_gb": round(disk.total / (1024**3), 2),
                "used_gb": round(disk.used / (1024**3), 2),
                "free_gb": round(disk.free / (1024**3), 2),
                "percent": round((disk.used / disk.total) * 100, 2)
            }
        }
        
    def generate_software_info(self):
        """Generate software information"""
        software = {
            "nodejs": self.get_nodejs_version(),
            "python": self.get_python_version(),
            "n8n": self.get_n8n_version(),
            "docker": self.get_docker_version(),
            "git": self.get_git_version()
        }
        
        self.report["software"] = software
        
    def get_nodejs_version(self):
        """Get Node.js version"""
        try:
            result = subprocess.run(['node', '--version'], capture_output=True, text=True)
            return result.stdout.strip() if result.returncode == 0 else "Not installed"
        except:
            return "Not installed"
            
    def get_python_version(self):
        """Get Python version"""
        return platform.python_version()
        
    def get_n8n_version(self):
        """Get n8n version"""
        try:
            result = subprocess.run(['n8n', '--version'], capture_output=True, text=True)
            return result.stdout.strip() if result.returncode == 0 else "Not installed"
        except:
            return "Not installed"
            
    def get_docker_version(self):
        """Get Docker version"""
        try:
            result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
            return result.stdout.strip() if result.returncode == 0 else "Not installed"
        except:
            return "Not installed"
            
    def get_git_version(self):
        """Get Git version"""
        try:
            result = subprocess.run(['git', '--version'], capture_output=True, text=True)
            return result.stdout.strip() if result.returncode == 0 else "Not installed"
        except:
            return "Not installed"
            
    def generate_automation_info(self):
        """Generate automation information"""
        automation_dirs = [
            "C:\\Automation",
            "C:\\Scripts",
            "C:\\Logs",
            "C:\\Backups"
        ]
        
        automation_status = {}
        for dir_path in automation_dirs:
            path = Path(dir_path)
            automation_status[dir_path] = {
                "exists": path.exists(),
                "size_mb": self.get_directory_size(path) if path.exists() else 0
            }
            
        self.report["automation"] = {
            "directories": automation_status,
            "environment_variables": {
                "DEV_HOME": os.environ.get("DEV_HOME", "Not set"),
                "AUTOMATION_CONFIG": os.environ.get("AUTOMATION_CONFIG", "Not set"),
                "BACKUP_PATH": os.environ.get("BACKUP_PATH", "Not set"),
                "LOG_PATH": os.environ.get("LOG_PATH", "Not set")
            }
        }
        
    def get_directory_size(self, path):
        """Get directory size in MB"""
        try:
            total_size = 0
            for dirpath, dirnames, filenames in os.walk(path):
                for filename in filenames:
                    filepath = os.path.join(dirpath, filename)
                    if os.path.exists(filepath):
                        total_size += os.path.getsize(filepath)
            return round(total_size / (1024 * 1024), 2)
        except:
            return 0
            
    def generate_security_info(self):
        """Generate security information"""
        try:
            # Check Windows Defender status
            result = subprocess.run(['powershell', '-Command', 'Get-MpComputerStatus'], capture_output=True, text=True)
            defender_status = "Unknown"
            if result.returncode == 0:
                if "RealTimeProtectionEnabled : True" in result.stdout:
                    defender_status = "Enabled"
                else:
                    defender_status = "Disabled"
                    
            self.report["security"] = {
                "windows_defender": defender_status,
                "firewall_enabled": self.check_firewall_status(),
                "uac_enabled": self.check_uac_status()
            }
        except:
            self.report["security"] = {"error": "Unable to retrieve security information"}
            
    def check_firewall_status(self):
        """Check firewall status"""
        try:
            result = subprocess.run(['powershell', '-Command', 'Get-NetFirewallProfile | Select-Object Name, Enabled'], capture_output=True, text=True)
            return "Enabled" if "True" in result.stdout else "Disabled"
        except:
            return "Unknown"
            
    def check_uac_status(self):
        """Check UAC status"""
        try:
            result = subprocess.run(['powershell', '-Command', 'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" | Select-Object EnableLUA'], capture_output=True, text=True)
            return "Enabled" if "1" in result.stdout else "Disabled"
        except:
            return "Unknown"
            
    def generate_recommendations(self):
        """Generate system recommendations"""
        recommendations = []
        
        # Performance recommendations
        if self.report["performance"]["cpu"]["usage_percent"] > 80:
            recommendations.append("High CPU usage detected. Consider closing unnecessary applications.")
            
        if self.report["performance"]["memory"]["percent"] > 85:
            recommendations.append("High memory usage detected. Consider increasing RAM or closing applications.")
            
        if self.report["performance"]["disk"]["percent"] > 90:
            recommendations.append("High disk usage detected. Consider cleaning up files or expanding storage.")
            
        # Software recommendations
        if self.report["software"]["nodejs"] == "Not installed":
            recommendations.append("Node.js is not installed. Install Node.js for development automation.")
            
        if self.report["software"]["python"] == "Not installed":
            recommendations.append("Python is not installed. Install Python for AI automation.")
            
        if self.report["software"]["n8n"] == "Not installed":
            recommendations.append("n8n is not installed. Install n8n for workflow automation.")
            
        # Security recommendations
        if self.report["security"].get("windows_defender") == "Disabled":
            recommendations.append("Windows Defender is disabled. Enable for better security.")
            
        if self.report["security"].get("firewall_enabled") == "Disabled":
            recommendations.append("Firewall is disabled. Enable for better security.")
            
        self.report["recommendations"] = recommendations
        
    def save_report(self):
        """Save report to file"""
        report_path = Path("C:\\Logs\\system-report.json")
        report_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(report_path, 'w') as f:
            json.dump(self.report, f, indent=2)
            
        print(f"System report saved to: {report_path}")
        
    def print_summary(self):
        """Print report summary"""
        print("\n=== SYSTEM REPORT SUMMARY ===")
        print(f"Generated: {self.report['timestamp']}")
        print(f"Platform: {self.report['system']['platform']}")
        print(f"CPU Usage: {self.report['performance']['cpu']['usage_percent']}%")
        print(f"Memory Usage: {self.report['performance']['memory']['percent']}%")
        print(f"Disk Usage: {self.report['performance']['disk']['percent']}%")
        
        print("\n=== SOFTWARE STATUS ===")
        for software, version in self.report['software'].items():
            print(f"{software.upper()}: {version}")
            
        print("\n=== RECOMMENDATIONS ===")
        for recommendation in self.report['recommendations']:
            print(f"• {recommendation}")
            
    def generate(self):
        """Generate complete report"""
        print("Generating system report...")
        
        self.generate_system_info()
        self.generate_performance_info()
        self.generate_software_info()
        self.generate_automation_info()
        self.generate_security_info()
        self.generate_recommendations()
        
        self.save_report()
        self.print_summary()

if __name__ == "__main__":
    reporter = SystemReporter()
    reporter.generate()
```

### 6. Real-time Monitor Script (C:\Scripts\real-time-monitor.ps1)
```powershell
# Real-time System Monitor
param(
    [int]$RefreshInterval = 2
)

# Configuration
$LogFile = "C:\Logs\real-time-monitor.log"

# Create log directory if it doesn't exist
if (!(Test-Path "C:\Logs")) {
    New-Item -ItemType Directory -Path "C:\Logs" -Force | Out-Null
}

# Clear screen and set up display
Clear-Host
Write-Host "=== REAL-TIME SYSTEM MONITOR ===" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to exit" -ForegroundColor Yellow
Write-Host ""

function Get-SystemMetrics {
    $cpu = Get-Counter -Counter "\Processor(_Total)\% Processor Time" -SampleInterval 1 -MaxSamples 1
    $memory = Get-Counter -Counter "\Memory\Available MBytes" -SampleInterval 1 -MaxSamples 1
    $disk = Get-Counter -Counter "\PhysicalDisk(_Total)\% Disk Time" -SampleInterval 1 -MaxSamples 1
    $network = Get-Counter -Counter "\Network Interface(*)\Bytes Total/sec" -SampleInterval 1 -MaxSamples 1
    
    return @{
        CPU = [math]::Round($cpu.CounterSamples[0].CookedValue, 1)
        Memory = [math]::Round($memory.CounterSamples[0].CookedValue, 0)
        Disk = [math]::Round($disk.CounterSamples[0].CookedValue, 1)
        Network = [math]::Round($network.CounterSamples[0].CookedValue, 0)
        Timestamp = Get-Date -Format "HH:mm:ss"
    }
}

function Show-ProgressBar {
    param($Value, $MaxValue, $Label, $Width = 20)
    
    $percentage = [math]::Min(($Value / $MaxValue) * 100, 100)
    $filled = [math]::Floor(($percentage / 100) * $Width)
    $empty = $Width - $filled
    
    $bar = "█" * $filled + "░" * $empty
    $color = if ($percentage -gt 80) { "Red" } elseif ($percentage -gt 60) { "Yellow" } else { "Green" }
    
    Write-Host "$Label`: " -NoNewline
    Write-Host $bar -ForegroundColor $color -NoNewline
    Write-Host " $([math]::Round($percentage, 1))%"
}

function Show-SystemStatus {
    $metrics = Get-SystemMetrics
    
    # Clear previous lines
    $linesToClear = 10
    for ($i = 0; $i -lt $linesToClear; $i++) {
        Write-Host "`r" -NoNewline
        Write-Host (" " * 80) -NoNewline
        Write-Host "`r" -NoNewline
    }
    
    # Move cursor up
    for ($i = 0; $i -lt $linesToClear; $i++) {
        Write-Host "`e[A" -NoNewline
    }
    
    Write-Host "Time: $($metrics.Timestamp)" -ForegroundColor White
    Write-Host ""
    
    # CPU Usage
    Show-ProgressBar -Value $metrics.CPU -MaxValue 100 -Label "CPU Usage"
    
    # Memory Usage (inverted - show used instead of available)
    $totalMemory = (Get-Counter -Counter "\Memory\Committed Bytes" -SampleInterval 1 -MaxSamples 1).CounterSamples[0].CookedValue
    $usedMemory = $totalMemory - ($metrics.Memory * 1024 * 1024)
    $memoryPercent = ($usedMemory / $totalMemory) * 100
    Show-ProgressBar -Value $memoryPercent -MaxValue 100 -Label "Memory Usage"
    
    # Disk Usage
    Show-ProgressBar -Value $metrics.Disk -MaxValue 100 -Label "Disk Usage"
    
    # Network Activity
    $networkMB = $metrics.Network / (1024 * 1024)
    Write-Host "Network: $([math]::Round($networkMB, 2)) MB/s" -ForegroundColor Cyan
    
    Write-Host ""
    
    # Top processes
    $topProcesses = Get-Process | Sort-Object CPU -Descending | Select-Object -First 3
    Write-Host "Top Processes:" -ForegroundColor Magenta
    foreach ($proc in $topProcesses) {
        $cpuPercent = [math]::Round($proc.CPU, 1)
        $memoryMB = [math]::Round($proc.WorkingSet64 / (1024 * 1024), 1)
        Write-Host "  $($proc.ProcessName): $cpuPercent% CPU, $memoryMB MB RAM" -ForegroundColor Gray
    }
}

# Main monitoring loop
try {
    while ($true) {
        Show-SystemStatus
        Start-Sleep -Seconds $RefreshInterval
    }
}
catch [System.Management.Automation.PipelineStoppedException] {
    Write-Host "`nMonitoring stopped by user" -ForegroundColor Yellow
}
catch {
    Write-Host "`nError in monitoring: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    Write-Host "`nReal-time monitoring stopped" -ForegroundColor Cyan
}
```

## 🚀 Complete Setup Commands

### Run these commands in order:

```powershell
# 1. Create directory structure
New-Item -ItemType Directory -Path "C:\Automation" -Force
New-Item -ItemType Directory -Path "C:\Scripts" -Force
New-Item -ItemType Directory -Path "C:\Logs" -Force
New-Item -ItemType Directory -Path "C:\Backups" -Force
New-Item -ItemType Directory -Path "C:\Temp" -Force
New-Item -ItemType Directory -Path "C:\Automation\workflows" -Force

# 2. Install dependencies
npm install -g n8n typescript ts-node pm2 nodemon
pip install pywin32 psutil requests beautifulsoup4 lxml scikit-learn opencv-python nltk spacy transformers jupyter notebook jupyterlab mlflow python-nmap paramiko cryptography prometheus-client

# 3. Set environment variables
[Environment]::SetEnvironmentVariable("DEV_HOME", "C:\Users\Student\Documents\GitHub\gqcars", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("AUTOMATION_CONFIG", "C:\Automation", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("BACKUP_PATH", "C:\Backups", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("LOG_PATH", "C:\Logs", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("SCRIPTS_PATH", "C:\Scripts", [EnvironmentVariableTarget]::Machine)

# 4. Configure security
Add-MpPreference -ExclusionPath "C:\Users\Student\Documents\GitHub\gqcars"
Add-MpPreference -ExclusionPath "C:\Automation"
Add-MpPreference -ExclusionPath "C:\Logs"
Add-MpPreference -ExclusionPath "C:\Backups"

# 5. Start automation system
cd C:\Automation
n8n start &
python C:\Scripts\ai-automation.py &
powershell -File C:\Scripts\monitor-system.ps1 &
start http://localhost:5678

# 6. Test system
node C:\Scripts\test-automation.js

# 7. Generate report
python C:\Scripts\generate-report.py

# 8. Start real-time monitoring
powershell -File C:\Scripts\real-time-monitor.ps1
```

## 📊 System Verification

After setup, verify everything is working:

1. **Check n8n**: Open http://localhost:5678 in browser
2. **Check logs**: Review C:\Logs\ for any errors
3. **Run tests**: Execute `node C:\Scripts\test-automation.js`
4. **Monitor system**: Run `powershell -File C:\Scripts\real-time-monitor.ps1`

## 🔧 Troubleshooting

### Common Issues:
- **Permission errors**: Run PowerShell as Administrator
- **Port conflicts**: Change n8n port with `n8n start --port 5679`
- **Missing dependencies**: Re-run installation commands
- **Path issues**: Restart terminal after setting environment variables

### Log Locations:
- System logs: `C:\Logs\`
- n8n logs: `%USERPROFILE%\.n8n\logs\`
- Automation logs: `C:\Logs\ai-automation.log`

This complete setup guide provides everything needed to replicate the exact automation environment on your laptop with all scripts, configurations, and monitoring capabilities. 