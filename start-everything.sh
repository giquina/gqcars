#!/bin/bash

# 🚀 GQ Cars Complete Development Environment Startup Script
# Linux/WSL2 automation for all systems

echo "🚗💨 GQ Cars Development Environment - FULL STARTUP"
echo "==============================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# System Information
echo -e "\n📊 System Status:"
echo "Date: $(date)"
echo "User: $USER"
echo "Working Directory: $(pwd)"

# Function to check if port is in use
check_port() {
    local port=$1
    if nc -z localhost $port 2>/dev/null; then
        return 0  # Port is open
    else
        return 1  # Port is closed
    fi
}

# Function to start service in background
start_service() {
    local name=$1
    local directory=$2
    local command=$3
    local port=$4
    
    if [ ! -z "$port" ] && check_port $port; then
        echo -e "${YELLOW}⚠️  Port $port already in use - skipping $name${NC}"
        return
    fi
    
    echo -e "${GREEN}🚀 Starting $name...${NC}"
    cd "$directory"
    
    # Start in new terminal session
    gnome-terminal --tab --title="$name" -- bash -c "$command; exec bash" 2>/dev/null || \
    xterm -T "$name" -e "$command; bash" 2>/dev/null || \
    screen -dmS "$name" bash -c "cd '$directory'; $command" || \
    (nohup bash -c "$command" > "/tmp/$name.log" 2>&1 &)
    
    sleep 3
    echo -e "${GREEN}✅ $name started${NC}"
}

# 1. Kill any existing processes
echo -e "\n${YELLOW}🔄 Cleaning up existing processes...${NC}"
pkill -f "node.*gqcars" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
sleep 2
echo -e "${GREEN}✅ Process cleanup complete${NC}"

# 2. Start Autonomous Agent System
echo -e "\n${CYAN}🤖 Starting Autonomous Agent System...${NC}"
AGENT_PATH="/mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production/.agents"

if [ -d "$AGENT_PATH" ]; then
    start_service "Agent Dashboard" "$AGENT_PATH" "npm run dashboard" "3002"
    sleep 5
    start_service "Agent Orchestrator" "$AGENT_PATH" "npm run start"
else
    echo -e "${RED}❌ Agent directory not found${NC}"
fi

# 3. Start Main GQ Cars Website
echo -e "\n${CYAN}🌐 Starting GQ Cars Website...${NC}"
WEB_PATH="/mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production/apps/web"

if [ -d "$WEB_PATH" ]; then
    start_service "GQ Cars Website" "$WEB_PATH" "npm run dev" "3000"
else
    echo -e "${RED}❌ GQ Cars web directory not found${NC}"
fi

# 4. Start SohoFashion Website (if exists)
SOHO_PATH="/mnt/c/Users/Student/Desktop/sohofashion-frontend"
if [ -d "$SOHO_PATH" ]; then
    echo -e "\n${CYAN}👗 Starting SohoFashion Website...${NC}"
    start_service "SohoFashion Website" "$SOHO_PATH" "npm run dev" "3001"
fi

# 5. Start n8n Automation (if Docker is available)
echo -e "\n${CYAN}🔄 Checking n8n Automation...${NC}"
N8N_PATH="/mnt/c/Users/Student/Desktop/n8n-setup"
if [ -d "$N8N_PATH" ] && command -v docker &> /dev/null; then
    echo -e "${GREEN}🐳 Starting n8n with Docker...${NC}"
    start_service "n8n Automation" "$N8N_PATH" "docker-compose up" "5678"
else
    echo -e "${YELLOW}⚠️  Docker not available or n8n directory not found - skipping n8n${NC}"
fi

# 6. Wait for services to initialize
echo -e "\n${YELLOW}⏳ Waiting for all services to initialize...${NC}"
sleep 10

# 7. Service Status Check
echo -e "\n${GREEN}📊 Service Status Check:${NC}"
services=(
    "Agent Dashboard:3002:http://localhost:3002"
    "GQ Cars Website:3000:http://localhost:3000"
    "SohoFashion:3001:http://localhost:3001"
    "n8n Automation:5678:http://localhost:5678"
)

for service in "${services[@]}"; do
    IFS=':' read -r name port url <<< "$service"
    if check_port $port; then
        echo -e "${GREEN}✅ $name - Running on port $port${NC}"
    else
        echo -e "${RED}❌ $name - Not responding on port $port${NC}"
    fi
done

# 8. Open browsers (if in graphical environment)
if [ ! -z "$DISPLAY" ]; then
    echo -e "\n${CYAN}🌐 Opening dashboards in browser...${NC}"
    sleep 3
    
    # Open Agent Dashboard
    if check_port 3002; then
        echo -e "${GREEN}🤖 Opening Agent Dashboard...${NC}"
        xdg-open "http://localhost:3002" 2>/dev/null &
        sleep 2
    fi
    
    # Open Main Website
    if check_port 3000; then
        echo -e "${GREEN}🚗 Opening GQ Cars Website...${NC}"
        xdg-open "http://localhost:3000" 2>/dev/null &
        sleep 2
    fi
    
    # Open n8n if available
    if check_port 5678; then
        echo -e "${GREEN}🔄 Opening n8n Automation...${NC}"
        xdg-open "http://localhost:5678" 2>/dev/null &
    fi
fi

# 9. Final Status Report
echo -e "\n${GREEN}🎉 STARTUP COMPLETE!${NC}"
echo "==============================================="

echo -e "\n${CYAN}📋 Available Services:${NC}"
echo "• Agent Dashboard: http://localhost:3002"
echo "• GQ Cars Website: http://localhost:3000"
echo "• SohoFashion: http://localhost:3001"
echo "• n8n Automation: http://localhost:5678"

echo -e "\n${CYAN}🤖 Your 6 Autonomous Agents are now active:${NC}"
echo "• Database Architect"
echo "• API Builder"
echo "• Frontend Developer"
echo "• Integration Specialist"
echo "• Testing Agent"
echo "• Documentation Writer"

echo -e "\n${YELLOW}💡 Quick Commands:${NC}"
echo "• Check agents: curl http://localhost:3002/api/agents"
echo "• Add task: Use the web dashboard or API"
echo "• View logs: Check /tmp/*.log files"

echo -e "\n${GREEN}🚀 Your autonomous development environment is OPERATIONAL!${NC}"
echo -e "${CYAN}Happy coding! 🚗💨${NC}"

# Return to original directory
cd /mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production