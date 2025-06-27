# Docker & WSL Troubleshooting Guide

## Quick Fixes

### 1. WSL Update Failed
If you see "WSL update failed" in Docker Desktop:

**Option A: Manual WSL Update**
```bash
wsl --update
```

**Option B: Download MSI Installer**
- Go to: https://github.com/microsoft/WSL/releases/latest
- Download the .msi file
- Install it manually

### 2. Docker Desktop Won't Start
```bash
# Restart Docker Desktop service
net stop com.docker.service
net start com.docker.service

# Or restart from Task Manager:
# 1. Open Task Manager (Ctrl+Shift+Esc)
# 2. Find "Docker Desktop" processes
# 3. End them
# 4. Restart Docker Desktop
```

### 3. Docker Engine Not Running
- Check system tray for Docker icon
- Should be green when running
- If red/orange, click it and select "Start"

### 4. WSL Integration Issues
In Docker Desktop:
1. Go to Settings
2. Resources → WSL Integration
3. Enable integration with your WSL distributions
4. Apply & Restart

### 5. Port Already in Use
If port 5678 is taken:
```yaml
# In docker-compose.yml, change:
ports:
  - "5679:5678"  # Use 5679 instead
```

### 6. Permission Issues
Run PowerShell as Administrator:
```powershell
# Enable WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# Enable Virtual Machine Platform
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart computer
shutdown /r /t 0
```

### 7. Docker Desktop Hangs
```bash
# Reset Docker Desktop to factory defaults
# Settings → Troubleshoot → Reset to factory defaults
```

## Verification Commands

```bash
# Check WSL status
wsl --status

# Check WSL version
wsl --version

# List WSL distributions
wsl --list --verbose

# Check Docker version
docker --version

# Test Docker
docker run hello-world

# Check running containers
docker ps

# Check Docker system info
docker system info
```

## System Requirements Check

### Windows Version
- Windows 10 version 2004 or higher (Build 19041+)
- Windows 11 (any version)

### WSL2 Requirements
- Virtual Machine Platform enabled
- Windows Subsystem for Linux enabled
- WSL2 kernel installed

### Hardware Requirements
- 64-bit processor with SLAT
- 4GB RAM minimum (8GB recommended)
- BIOS virtualization enabled

## Step-by-Step Setup

### 1. Enable Windows Features
```powershell
# Run as Administrator
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

### 2. Install WSL2 Kernel
- Download from: https://aka.ms/wsl2kernel
- Install the package

### 3. Set WSL2 as Default
```bash
wsl --set-default-version 2
```

### 4. Install Ubuntu (optional but recommended)
```bash
wsl --install -d Ubuntu
```

### 5. Install Docker Desktop
- Download from: https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe
- Run installer
- Enable WSL2 integration during setup

## Still Having Issues?

### Reset WSL
```bash
wsl --unregister Ubuntu
wsl --install -d Ubuntu
```

### Reset Docker
1. Docker Desktop → Settings → Troubleshoot
2. "Reset to factory defaults"
3. Restart computer

### Check Windows Updates
- Settings → Update & Security → Windows Update
- Install all available updates
- Restart if required

### Alternative: Use Git Bash or Linux
If Windows continues to have issues:
1. Install Git for Windows (includes Git Bash)
2. Use Git Bash terminal instead of PowerShell
3. Or use Windows Terminal with WSL2

## Contact Support
- Docker Desktop: https://docs.docker.com/desktop/troubleshoot/
- WSL: https://docs.microsoft.com/en-us/windows/wsl/troubleshooting
- n8n: https://docs.n8n.io
