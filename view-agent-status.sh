#!/bin/bash

echo "🚗 GQ Cars Agent Status Dashboard"
echo "================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to get agent status from config
get_agent_status() {
    local agent_name=$1
    local status=$(grep -A 10 "\"$agent_name\"" .agents/config/gqcars-master-config.json | grep '"status"' | cut -d'"' -f4)
    echo $status
}

# Function to get current task
get_current_task() {
    local agent_name=$1
    local task=$(grep -A 15 "\"$agent_name\"" .agents/config/gqcars-master-config.json | grep '"currentTask"' | cut -d'"' -f4)
    echo $task
}

# Function to get task count
get_task_count() {
    local agent_name=$1
    local count=$(grep -A 20 "\"$agent_name\"" .agents/config/gqcars-master-config.json | grep -c '"tasks"')
    echo $count
}

echo -e "${BLUE}Agent Status Overview:${NC}"
echo ""

# Check each agent
agents=("database-architect" "api-builder" "frontend-developer" "integration-specialist" "testing-agent" "documentation-writer")

for agent in "${agents[@]}"; do
    status=$(get_agent_status $agent)
    current_task=$(get_current_task $agent)
    
    case $status in
        "working")
            echo -e "🔄 ${GREEN}$agent${NC} - ${YELLOW}WORKING${NC}"
            echo -e "   Current: $current_task"
            ;;
        "waiting")
            echo -e "⏳ ${BLUE}$agent${NC} - ${YELLOW}WAITING${NC}"
            ;;
        "completed")
            echo -e "✅ ${GREEN}$agent${NC} - ${GREEN}COMPLETED${NC}"
            ;;
        "error")
            echo -e "❌ ${RED}$agent${NC} - ${RED}ERROR${NC}"
            ;;
        *)
            echo -e "❓ ${BLUE}$agent${NC} - ${YELLOW}UNKNOWN${NC}"
            ;;
    esac
    echo ""
done

echo -e "${BLUE}Recent Activity:${NC}"
echo "=================="
tail -n 10 .agents/logs/master.log 2>/dev/null || echo "No logs found"

echo ""
echo -e "${BLUE}Quick Commands:${NC}"
echo "=================="
echo "📊 View dashboard: http://localhost:3002"
echo "📝 Live logs: tail -f .agents/logs/master.log"
echo "🛑 Stop agents: pkill -f 'agent-orchestrator'"
echo "🔄 Restart: cd .agents && npm run dev"
echo ""
echo -e "${YELLOW}Press Ctrl+C to exit${NC}" 