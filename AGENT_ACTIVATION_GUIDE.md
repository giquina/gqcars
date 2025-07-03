# 🚗 GQ Cars Background Agent Activation & Testing Guide

## **Overview**
This guide shows you how to activate, monitor, and test the 6 background agents working on your GQ Cars project.

## **🎯 The 6 Background Agents**

### **1. 🚗 Booking & Fleet Management Agent**
- **Focus**: Core booking system, driver/vehicle management
- **Status**: `database-architect` in config
- **Files**: `prisma/schema.prisma`, `src/app/api/bookings/`

### **2. 🔐 Security & Authentication Agent** 
- **Focus**: User auth, security protocols, access control
- **Status**: `api-builder` in config
- **Files**: `src/auth/`, `src/app/api/`

### **3. 💳 Payment & Financial Agent**
- **Focus**: Payment processing, billing, corporate accounts
- **Status**: `integration-specialist` in config
- **Files**: `src/app/api/payments/`, `src/lib/stripe.ts`

### **4. 📱 Frontend & UX Agent**
- **Focus**: UI/UX, responsive design, components
- **Status**: `frontend-developer` in config
- **Files**: `src/components/`, `src/app/`

### **5. 🗺️ Location & Maps Agent**
- **Focus**: Maps integration, location services, routing
- **Status**: Part of `integration-specialist`
- **Files**: `src/app/api/maps/`

### **6. 🤖 AI & Automation Agent**
- **Focus**: AI features, automation, analytics
- **Status**: `testing-agent` in config
- **Files**: `src/app/api/ai/`

## **🚀 Activation Process**

### **Step 1: Start the Agent System**
```bash
cd .agents
npm run dev
```

This starts:
- Agent orchestrator (main controller)
- Dashboard server (monitoring interface)
- Real-time logging system

### **Step 2: Monitor Agent Status**
```bash
# Check all agent statuses
curl http://localhost:3002/api/status

# View live logs
npm run logs

# Check specific agent
curl http://localhost:3002/api/agent/database-architect
```

### **Step 3: Access Dashboard**
Open: `http://localhost:3002` in your browser

## **🧪 Testing Process**

### **Phase 1: Agent Activation Testing**
```bash
# 1. Check if agents are running
ps aux | grep "agent-orchestrator"

# 2. Verify configuration loaded
cat .agents/config/gqcars-master-config.json

# 3. Check log files
ls -la .agents/logs/
```

### **Phase 2: Task Execution Testing**
```bash
# 1. Monitor task progress
tail -f .agents/logs/master.log

# 2. Check agent output
ls -la .agents/agents/database/
ls -la .agents/agents/api/
ls -la .agents/agents/frontend/
```

### **Phase 3: Code Quality Testing**
```bash
# 1. Test database changes
cd prisma && npx prisma generate
npx prisma db push

# 2. Test API endpoints
curl http://localhost:3000/api/bookings

# 3. Test frontend components
npm run dev
```

## **📊 Monitoring & Debugging**

### **Real-time Monitoring**
```bash
# Live agent status
watch -n 5 'curl -s http://localhost:3002/api/status'

# Live logs with colors
tail -f .agents/logs/master.log | grep --color=always -E "(ERROR|SUCCESS|WARNING)"
```

### **Agent-Specific Monitoring**
```bash
# Database agent logs
tail -f .agents/logs/database-architect.log

# API agent logs  
tail -f .agents/logs/api-builder.log

# Frontend agent logs
tail -f .agents/logs/frontend-developer.log
```

### **Performance Monitoring**
```bash
# Check agent memory usage
ps aux | grep agent-orchestrator | awk '{print $6/1024 " MB"}'

# Monitor task completion rates
grep "Task completed" .agents/logs/master.log | wc -l
```

## **🔧 Troubleshooting**

### **Common Issues & Solutions**

#### **Issue 1: Agents not starting**
```bash
# Solution: Check dependencies
cd .agents && npm install

# Restart orchestrator
pkill -f "agent-orchestrator"
node runtime/agent-orchestrator.js
```

#### **Issue 2: Dashboard not accessible**
```bash
# Solution: Check port conflicts
lsof -i :3002

# Restart dashboard
cd .agents && npm run dashboard
```

#### **Issue 3: Tasks stuck in "waiting"**
```bash
# Solution: Check dependencies
cat .agents/config/gqcars-master-config.json | grep -A 5 "dependencies"

# Force task execution
curl -X POST http://localhost:3002/api/agent/database-architect/force-task
```

#### **Issue 4: Code changes not appearing**
```bash
# Solution: Check output paths
ls -la .agents/agents/

# Restart development server
npm run dev
```

## **📈 Success Metrics**

### **Agent Performance Indicators**
- ✅ **Task Completion Rate**: >90% tasks completed successfully
- ✅ **Code Quality**: No TypeScript errors, passing tests
- ✅ **Performance**: <3s page load times
- ✅ **Coverage**: All major features implemented

### **Testing Checklist**
- [ ] Database schema updated and migrated
- [ ] API endpoints responding correctly
- [ ] Frontend components rendering properly
- [ ] Payment integration working
- [ ] Maps integration functional
- [ ] Authentication system secure
- [ ] Mobile responsiveness verified
- [ ] Performance benchmarks met

## **🎮 Quick Commands Reference**

```bash
# Start everything
cd .agents && npm run dev

# Check status
curl http://localhost:3002/api/status

# View logs
tail -f .agents/logs/master.log

# Stop agents
pkill -f "agent-orchestrator"

# Restart specific agent
curl -X POST http://localhost:3002/api/agent/database-architect/restart

# Force task execution
curl -X POST http://localhost:3002/api/agent/database-architect/force-task

# View agent output
ls -la .agents/agents/database/
```

## **🔍 Advanced Testing**

### **Integration Testing**
```bash
# Test full booking flow
npm run test:e2e

# Test payment processing
npm run test:payments

# Test mobile responsiveness
npm run test:mobile
```

### **Performance Testing**
```bash
# Load testing
npm run test:load

# Lighthouse audit
npm run test:lighthouse

# Bundle analysis
npm run analyze
```

---

**🎯 Next Steps**: After activating agents, monitor their progress and test the generated code to ensure it meets your business requirements. 