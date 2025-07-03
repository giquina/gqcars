#!/bin/bash

echo "🚗 GQ Cars Agent Testing Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

echo -e "${BLUE}1. Checking prerequisites...${NC}"

# Check if Node.js is installed
if command_exists node; then
    echo -e "${GREEN}✅ Node.js is installed${NC}"
else
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

# Check if npm is installed
if command_exists npm; then
    echo -e "${GREEN}✅ npm is installed${NC}"
else
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${BLUE}2. Checking agent system status...${NC}"

# Check if agent orchestrator is running
if pgrep -f "agent-orchestrator" > /dev/null; then
    echo -e "${GREEN}✅ Agent orchestrator is running${NC}"
else
    echo -e "${YELLOW}⚠️  Agent orchestrator is not running${NC}"
    echo -e "${BLUE}   Starting agent system...${NC}"
    cd .agents && npm run dev &
    sleep 5
fi

# Check if dashboard is accessible
if port_in_use 3002; then
    echo -e "${GREEN}✅ Dashboard server is running on port 3002${NC}"
else
    echo -e "${YELLOW}⚠️  Dashboard server is not running${NC}"
fi

echo -e "${BLUE}3. Testing agent configuration...${NC}"

# Check if config file exists
if [ -f ".agents/config/gqcars-master-config.json" ]; then
    echo -e "${GREEN}✅ Agent configuration file exists${NC}"
    
    # Count active agents
    AGENT_COUNT=$(grep -c '"status":' .agents/config/gqcars-master-config.json)
    echo -e "${BLUE}   Found $AGENT_COUNT agents in configuration${NC}"
else
    echo -e "${RED}❌ Agent configuration file not found${NC}"
fi

echo -e "${BLUE}4. Testing agent logs...${NC}"

# Check if logs directory exists
if [ -d ".agents/logs" ]; then
    echo -e "${GREEN}✅ Logs directory exists${NC}"
    
    # Check for recent log files
    LOG_FILES=$(ls -la .agents/logs/*.log 2>/dev/null | wc -l)
    if [ $LOG_FILES -gt 0 ]; then
        echo -e "${GREEN}✅ Found $LOG_FILES log files${NC}"
        
        # Show recent log entries
        echo -e "${BLUE}   Recent log entries:${NC}"
        tail -n 5 .agents/logs/master.log 2>/dev/null || echo "   No master log found"
    else
        echo -e "${YELLOW}⚠️  No log files found yet${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Logs directory not found${NC}"
fi

echo -e "${BLUE}5. Testing agent output...${NC}"

# Check if agent output directories exist
if [ -d ".agents/agents" ]; then
    echo -e "${GREEN}✅ Agent output directory exists${NC}"
    
    # List agent output directories
    for dir in .agents/agents/*/; do
        if [ -d "$dir" ]; then
            AGENT_NAME=$(basename "$dir")
            FILE_COUNT=$(ls -1 "$dir" 2>/dev/null | wc -l)
            echo -e "${BLUE}   $AGENT_NAME: $FILE_COUNT files${NC}"
        fi
    done
else
    echo -e "${YELLOW}⚠️  Agent output directory not found${NC}"
fi

echo -e "${BLUE}6. Testing project integration...${NC}"

# Check if main project is accessible
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ Main project package.json found${NC}"
    
    # Check if development server can start
    if port_in_use 3000; then
        echo -e "${GREEN}✅ Development server is running on port 3000${NC}"
    else
        echo -e "${YELLOW}⚠️  Development server is not running${NC}"
        echo -e "${BLUE}   You can start it with: npm run dev${NC}"
    fi
else
    echo -e "${RED}❌ Main project package.json not found${NC}"
fi

echo -e "${BLUE}7. Testing database connection...${NC}"

# Check if Prisma is configured
if [ -f "prisma/schema.prisma" ]; then
    echo -e "${GREEN}✅ Prisma schema found${NC}"
    
    # Check if database can be generated
    if npx prisma generate --silent 2>/dev/null; then
        echo -e "${GREEN}✅ Prisma client generated successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Prisma client generation failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Prisma schema not found${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Agent Testing Complete!${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Open http://localhost:3002 to view the agent dashboard"
echo "2. Run 'tail -f .agents/logs/master.log' to monitor agent activity"
echo "3. Check .agents/agents/ for generated code and documentation"
echo "4. Test the main application at http://localhost:3000"
echo ""
echo -e "${YELLOW}To stop agents: pkill -f 'agent-orchestrator'${NC}" 