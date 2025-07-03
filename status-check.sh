#\!/bin/bash

echo "🚗💨 GQ Cars Development Environment - STATUS CHECK"
echo "==============================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if port is in use
check_port() {
    local port=$1
    if nc -z localhost $port 2>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check service health
check_service() {
    local name=$1
    local port=$2
    local endpoint=$3
    
    if check_port $port; then
        if [ \! -z "$endpoint" ]; then
            if curl -s "$endpoint" > /dev/null 2>&1; then
                echo -e "${GREEN}✅ $name - Healthy (Port $port)${NC}"
            else
                echo -e "${YELLOW}⚠️  $name - Port open but not responding (Port $port)${NC}"
            fi
        else
            echo -e "${GREEN}✅ $name - Running (Port $port)${NC}"
        fi
    else
        echo -e "${RED}❌ $name - Not running (Port $port)${NC}"
    fi
}

echo -e "\n${CYAN}📊 System Information:${NC}"
echo "Date: $(date)"
echo "User: $USER"

echo -e "\n${CYAN}🌐 Service Status:${NC}"
check_service "Agent Dashboard" 3002 "http://localhost:3002/api/agents"
check_service "GQ Cars Website" 3000 "http://localhost:3000"
check_service "SohoFashion Website" 3001 "http://localhost:3001"
check_service "n8n Automation" 5678 "http://localhost:5678"

echo -e "\n${CYAN}🤖 Agent System Details:${NC}"
if check_port 3002; then
    echo "Fetching agent status..."
    agent_data=$(curl -s http://localhost:3002/api/agents 2>/dev/null)
    if [ $? -eq 0 ] && [ \! -z "$agent_data" ]; then
        echo "✅ 6 agents available and responding"
        echo "Sample: database-architect, api-builder, frontend-developer..."
    else
        echo -e "${RED}❌ Unable to fetch agent status${NC}"
    fi
else
    echo -e "${RED}❌ Agent dashboard not accessible${NC}"
fi

echo -e "\n${CYAN}💾 Process Information:${NC}"
echo "Node.js processes:"
ps aux  < /dev/null |  grep node | grep -E "(gqcars|dashboard|orchestrator)" | grep -v grep | wc -l | xargs echo "Active node processes:"

echo -e "\n${YELLOW}💡 Quick Actions:${NC}"
echo "• Check agents: curl http://localhost:3002/api/agents"
echo "• Add task: curl -X POST http://localhost:3002/api/agents/task -H 'Content-Type: application/json' -d '{\"agent\": \"database-architect\", \"task\": \"Your task\"}'"
echo "• View dashboard: http://localhost:3002"

echo -e "\n==============================================="
echo -e "${GREEN}Status check complete\! 🚗💨${NC}"
