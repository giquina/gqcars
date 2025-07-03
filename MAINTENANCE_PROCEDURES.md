# 🔧 GQ Cars Development Environment - Maintenance Procedures

## 📊 **CURRENT SYSTEM STATUS: OPERATIONAL**

### **✅ WORKING COMPONENTS:**
- **6 Autonomous Agents**: Database, API, Frontend, Integration, Testing, Documentation
- **Agent Dashboard**: http://localhost:3002 (Real-time monitoring)
- **Agent API**: Task assignment and status tracking
- **Comprehensive Startup Scripts**: PowerShell & Bash automation
- **Status Monitoring**: Automated health checks

### **📋 MAINTENANCE SCHEDULE**

---

## 🔄 **DAILY MAINTENANCE (2 minutes)**

### **Morning Startup Routine**
```bash
# 1. Run status check
./status-check.sh

# 2. If agents not running, start them
cd .agents
npm run dev

# 3. Verify dashboard is accessible
curl -s http://localhost:3002/api/agents > /dev/null && echo "✅ Agents operational"
```

### **Agent Health Check**
```bash
# Check all 6 agents are responding
curl -s http://localhost:3002/api/agents | grep -o '"status":"[^"]*"' | sort | uniq -c

# Expected output:
# 6 "status":"ready" (or "working")
```

### **Task Queue Monitoring**
- Check dashboard for stuck tasks
- Review completed tasks count
- Add new high-priority tasks as needed

---

## 📅 **WEEKLY MAINTENANCE (15 minutes)**

### **1. Dependencies Update**
```bash
# Update agent system
cd .agents
npm update

# Update main website
cd ../apps/web  
npm update

# Check for security vulnerabilities
npm audit
```

### **2. Log Cleanup**
```bash
# Clear old logs (if any)
find . -name "*.log" -mtime +7 -delete

# Clear npm cache
npm cache clean --force
```

### **3. Performance Check**
```bash
# Check disk usage
df -h .

# Check memory usage
free -h

# Monitor port usage
ss -tulpn | grep -E ":(3000|3001|3002|5678)"
```

### **4. Backup Agent Configuration**
```bash
# Backup agent configs
cp -r .agents/config .agents/config.backup.$(date +%Y%m%d)

# Remove old backups (keep 4 weeks)
ls -t .agents/config.backup.* | tail -n +5 | xargs rm -rf
```

---

## 🗓️ **MONTHLY MAINTENANCE (30 minutes)**

### **1. Complete System Update**
```bash
# Update Node.js if needed
node --version  # Check current version

# Update npm globally
npm update -g npm

# Update all project dependencies
npm update
```

### **2. Security Audit**
```bash
# Security audit
npm audit --audit-level moderate

# Fix automatically fixable issues
npm audit fix
```

### **3. Performance Optimization**
```bash
# Clear all caches
npm cache clean --force
rm -rf node_modules/.cache

# Reinstall dependencies clean
rm -rf node_modules
npm install
```

### **4. Agent Configuration Review**
- Review agent task assignments
- Update agent priorities if needed
- Check for new requirements

---

## 🚨 **TROUBLESHOOTING PROCEDURES**

### **Problem: Agents Not Starting**
```bash
# 1. Kill any hanging processes
pkill -f "node.*gqcars"
pkill -f "npm.*dev"

# 2. Clear any port locks
lsof -ti:3002 | xargs kill -9 2>/dev/null || true

# 3. Restart cleanly
cd .agents
npm install
npm run dev
```

### **Problem: Dashboard Not Accessible**
```bash
# 1. Check if port is in use
ss -tulpn | grep :3002

# 2. Check process status
ps aux | grep dashboard

# 3. Restart dashboard only
cd .agents
npm run dashboard
```

### **Problem: Task Assignment Failing**
```bash
# 1. Test API directly
curl -X POST http://localhost:3002/api/agents/task \
  -H "Content-Type: application/json" \
  -d '{"agent": "database-architect", "task": "Test task"}'

# 2. Check agent logs
# (View dashboard terminal output)

# 3. Restart agent system if needed
cd .agents
npm run dev
```

### **Problem: High Resource Usage**
```bash
# 1. Check process resource usage
top -p $(pgrep -d',' -f "node.*gqcars")

# 2. Restart specific agents if needed
# (Use dashboard to monitor individual agents)

# 3. Increase system resources if consistently high
```

---

## 🔧 **CONFIGURATION MANAGEMENT**

### **Agent Configuration Files**
- **Location**: `.agents/config/`
- **Main Config**: `gqcars-master-config.json`
- **Backup Policy**: Weekly automatic backups
- **Change Control**: Manual edits only

### **Environment Variables**
```bash
# Required for full functionality
export NODE_ENV=development
export AGENT_DASHBOARD_PORT=3002
export AGENT_LOG_LEVEL=info
```

### **Port Configuration**
| Service | Port | Purpose |
|---------|------|---------|
| Agent Dashboard | 3002 | Web interface & API |
| GQ Cars Website | 3000 | Main development server |
| SohoFashion | 3001 | Secondary website |
| n8n Automation | 5678 | Workflow automation |

---

## 📊 **MONITORING & ALERTS**

### **Health Check Indicators**
- ✅ **Green**: All 6 agents ready/working
- ⚠️ **Yellow**: Some agents unavailable  
- ❌ **Red**: Dashboard not accessible

### **Key Metrics to Monitor**
- Agent response time
- Task completion rate
- Memory usage
- Port availability

### **Automated Monitoring**
```bash
# Add to crontab for automatic checks
# 0 */6 * * * /path/to/status-check.sh >> /tmp/agent-health.log
```

---

## 🔄 **UPDATE PROCEDURES**

### **Updating Agent System**
1. **Test new changes in development**
2. **Backup current configuration**
3. **Apply updates during low-usage periods**
4. **Verify all agents restart successfully**
5. **Test task assignment functionality**

### **Rollback Procedure**
```bash
# If updates cause issues:
cd .agents
git checkout HEAD~1  # Rollback to previous version
npm install
npm run dev
```

---

## 📝 **DOCUMENTATION UPDATES**

### **When to Update Documentation**
- New agent types added
- Configuration changes
- New startup procedures
- Troubleshooting solutions

### **Documentation Files to Maintain**
- `MAINTENANCE_PROCEDURES.md` (this file)
- `COMPLETE_SYSTEM_STARTUP_GUIDE.md`
- `CLAUDIA_BUILD_STATUS_COMPLETE.md`
- `.agents/config/gqcars-master-config.json`

---

## 🎯 **SUCCESS METRICS**

### **Daily Success Indicators**
- [ ] All 6 agents responding
- [ ] Dashboard accessible at localhost:3002  
- [ ] Task assignment working
- [ ] No error messages in logs

### **Weekly Success Indicators**
- [ ] All dependencies up to date
- [ ] Security audit clean
- [ ] Backups created successfully
- [ ] Performance within acceptable ranges

### **Monthly Success Indicators**
- [ ] Complete system update successful
- [ ] Documentation current
- [ ] All troubleshooting procedures tested
- [ ] Resource usage optimized

---

## 🚀 **QUICK REFERENCE COMMANDS**

```bash
# Start everything
./start-everything.sh

# Check status
./status-check.sh

# Restart agents
cd .agents && npm run dev

# Test API
curl http://localhost:3002/api/agents

# Add task
curl -X POST http://localhost:3002/api/agents/task \
  -H "Content-Type: application/json" \
  -d '{"agent": "database-architect", "task": "Your task here"}'

# View dashboard
# Open browser to: http://localhost:3002
```

---

**🏁 MAINTENANCE COMPLETE - Your autonomous development environment is optimized and operational! 🚗💨**

*Last Updated: 2025-07-03 | Next Review: Weekly*