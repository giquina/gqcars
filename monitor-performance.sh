#!/bin/bash
# ⚡ GQ Cars Performance Monitor

echo "⚡ GQ Cars Performance Monitor"
echo "============================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

# System Resources
echo -e "\n${CYAN}📊 System Resources:${NC}"
if command -v free >/dev/null 2>&1; then
    echo "Memory: $(free -h | grep Mem | awk '{print $3 "/" $2}')"
else
    echo "Memory: Not available on this system"
fi

if command -v top >/dev/null 2>&1; then
    cpu_info=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//' 2>/dev/null || echo "N/A")
    echo "CPU: ${cpu_info}"
else
    echo "CPU: Not available"
fi

disk_usage=$(df -h . 2>/dev/null | tail -1 | awk '{print $5}' || echo "N/A")
echo "Disk: ${disk_usage} used"

# Agent System Performance
echo -e "\n${CYAN}🤖 Agent System:${NC}"
if curl -s http://localhost:3002/api/agents > /tmp/agents.json 2>/dev/null; then
    echo -e "${GREEN}✅ Dashboard responsive${NC}"
    
    # Count agents by status
    ready_count=$(grep -o '"status":"ready"' /tmp/agents.json | wc -l)
    working_count=$(grep -o '"status":"working"' /tmp/agents.json | wc -l)
    error_count=$(grep -o '"status":"error"' /tmp/agents.json | wc -l)
    
    echo "Ready Agents: $ready_count"
    echo "Working Agents: $working_count"
    echo "Error Agents: $error_count"
    echo "Total Agents: $((ready_count + working_count + error_count))"
    
    # Count tasks
    total_tasks=$(grep -o '"tasks":\[[^]]*\]' /tmp/agents.json | grep -o ',"[^"]*"' | wc -l)
    completed_tasks=$(grep -o '"completedTasks":\[[^]]*\]' /tmp/agents.json | grep -o ',"[^"]*"' | wc -l)
    
    echo "Pending Tasks: $total_tasks"
    echo "Completed Tasks: $completed_tasks"
    
    rm -f /tmp/agents.json
else
    echo -e "${RED}❌ Dashboard not responding${NC}"
fi

# Response Time Test
echo -e "\n${CYAN}🌐 Network Performance:${NC}"
if command -v curl >/dev/null 2>&1; then
    response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:3002/api/agents 2>/dev/null || echo "N/A")
    if [ "$response_time" != "N/A" ]; then
        echo "API Response Time: ${response_time}s"
        
        # Check if response time is good
        if (( $(echo "$response_time < 0.2" | bc -l 2>/dev/null || echo "0") )); then
            echo -e "${GREEN}✅ Excellent response time${NC}"
        elif (( $(echo "$response_time < 0.5" | bc -l 2>/dev/null || echo "0") )); then
            echo -e "${YELLOW}⚠️ Acceptable response time${NC}"
        else
            echo -e "${RED}❌ Slow response time${NC}"
        fi
    else
        echo "API Response Time: Not available"
    fi
else
    echo "Network test: curl not available"
fi

# Process Information
echo -e "\n${CYAN}📈 Process Information:${NC}"
node_processes=$(ps aux 2>/dev/null | grep node | grep -E "(gqcars|dashboard)" | grep -v grep | wc -l)
echo "Node.js Processes: $node_processes"

if [ $node_processes -gt 0 ]; then
    ps aux 2>/dev/null | grep node | grep -E "(gqcars|dashboard)" | grep -v grep | while read line; do
        pid=$(echo $line | awk '{print $2}')
        cpu=$(echo $line | awk '{print $3}')
        mem=$(echo $line | awk '{print $4}')
        cmd=$(echo $line | awk '{print $11}' | sed 's/.*\///')
        echo "  PID $pid: CPU ${cpu}% MEM ${mem}% ($cmd)"
    done
fi

# Port Status
echo -e "\n${CYAN}🔌 Port Status:${NC}"
ports=(3000 3001 3002 5678)
for port in "${ports[@]}"; do
    if command -v nc >/dev/null 2>&1; then
        if nc -z localhost $port 2>/dev/null; then
            echo -e "Port $port: ${GREEN}OPEN${NC}"
        else
            echo -e "Port $port: ${RED}CLOSED${NC}"
        fi
    else
        # Fallback using netstat or ss
        if netstat -tuln 2>/dev/null | grep -q ":$port "; then
            echo -e "Port $port: ${GREEN}OPEN${NC}"
        elif ss -tuln 2>/dev/null | grep -q ":$port "; then
            echo -e "Port $port: ${GREEN}OPEN${NC}"
        else
            echo -e "Port $port: ${RED}CLOSED${NC}"
        fi
    fi
done

# Performance Health Check
echo -e "\n${CYAN}🚨 Performance Health Check:${NC}"
health_score=0
max_score=5

# Check 1: Dashboard responding
if curl -s http://localhost:3002/api/agents > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Dashboard responsive${NC}"
    health_score=$((health_score + 1))
else
    echo -e "${RED}❌ Dashboard not responding${NC}"
fi

# Check 2: Agents operational
if [ $node_processes -ge 2 ]; then
    echo -e "${GREEN}✅ Agent processes running${NC}"
    health_score=$((health_score + 1))
else
    echo -e "${RED}❌ Insufficient agent processes${NC}"
fi

# Check 3: Key ports open
open_ports=0
for port in 3002 3000; do
    if nc -z localhost $port 2>/dev/null || netstat -tuln 2>/dev/null | grep -q ":$port " || ss -tuln 2>/dev/null | grep -q ":$port "; then
        open_ports=$((open_ports + 1))
    fi
done

if [ $open_ports -ge 1 ]; then
    echo -e "${GREEN}✅ Key ports accessible${NC}"
    health_score=$((health_score + 1))
else
    echo -e "${RED}❌ Key ports not accessible${NC}"
fi

# Check 4: Response time acceptable
if [ "$response_time" != "N/A" ] && (( $(echo "$response_time < 1.0" | bc -l 2>/dev/null || echo "1") )); then
    echo -e "${GREEN}✅ Response time acceptable${NC}"
    health_score=$((health_score + 1))
else
    echo -e "${YELLOW}⚠️ Response time concerning${NC}"
fi

# Check 5: System load reasonable
if command -v uptime >/dev/null 2>&1; then
    load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//' 2>/dev/null || echo "0")
    if (( $(echo "$load_avg < 3.0" | bc -l 2>/dev/null || echo "1") )); then
        echo -e "${GREEN}✅ System load normal${NC}"
        health_score=$((health_score + 1))
    else
        echo -e "${RED}❌ High system load: $load_avg${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ System load check unavailable${NC}"
    health_score=$((health_score + 1))  # Give benefit of doubt
fi

# Overall Health Score
echo -e "\n${CYAN}📊 Overall Health Score: $health_score/$max_score${NC}"
if [ $health_score -ge 4 ]; then
    echo -e "${GREEN}🎉 System performance: EXCELLENT${NC}"
elif [ $health_score -ge 3 ]; then
    echo -e "${YELLOW}⚠️ System performance: GOOD${NC}"
else
    echo -e "${RED}🚨 System performance: NEEDS ATTENTION${NC}"
fi

# Quick Actions
echo -e "\n${CYAN}💡 Quick Actions:${NC}"
echo "• Check detailed status: ./status-check.sh"
echo "• Restart agents: cd .agents && npm run dev"
echo "• View dashboard: http://localhost:3002"
echo "• Add task: Use dashboard or API"

echo -e "\n${GREEN}⚡ Performance monitoring complete! 🚗💨${NC}"