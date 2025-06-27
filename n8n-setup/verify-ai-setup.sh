#!/bin/bash

# AI Environment Verification Script
# This script checks if all AI tools are properly connected

echo "🤖 AI Development Environment Verification"
echo "=========================================="
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check service status
check_service() {
    local service_name=$1
    local url=$2
    local expected_response=$3
    
    echo -n "Checking $service_name... "
    
    if command -v curl >/dev/null 2>&1; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
        if [ "$response" = "$expected_response" ]; then
            echo -e "${GREEN}✅ Running${NC}"
            return 0
        else
            echo -e "${RED}❌ Not responding (HTTP $response)${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️ curl not available${NC}"
        return 2
    fi
}

# Function to check Docker container
check_docker_container() {
    local container_name=$1
    echo -n "Checking Docker container '$container_name'... "
    
    if command -v docker >/dev/null 2>&1; then
        if docker ps --format "table {{.Names}}" | grep -q "^$container_name$"; then
            echo -e "${GREEN}✅ Running${NC}"
            return 0
        else
            echo -e "${RED}❌ Not running${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️ Docker not available${NC}"
        return 2
    fi
}

# Function to check API connectivity
check_api() {
    local api_name=$1
    local api_key_var=$2
    
    echo -n "Checking $api_name API... "
    
    if [ -z "${!api_key_var}" ]; then
        echo -e "${YELLOW}⚠️ API key not set${NC}"
        return 1
    else
        echo -e "${GREEN}✅ API key configured${NC}"
        return 0
    fi
}

echo "1. 🐳 Docker Environment"
echo "------------------------"
check_docker_container "n8n"
check_docker_container "n8n-postgres"
check_docker_container "n8n-redis"
echo

echo "2. 🌐 Service Accessibility"
echo "---------------------------"
check_service "n8n Web Interface" "http://localhost:5678" "200"
echo

echo "3. 🔑 API Configuration"
echo "----------------------"
check_api "OpenAI" "OPENAI_API_KEY"
check_api "Anthropic Claude" "ANTHROPIC_API_KEY"
echo

echo "4. 📁 File System Setup"
echo "----------------------"
echo -n "Checking n8n workflows directory... "
if [ -d "/mnt/c/Users/Student/Desktop/n8n-setup/workflows" ]; then
    echo -e "${GREEN}✅ Exists${NC}"
else
    echo -e "${RED}❌ Missing${NC}"
fi

echo -n "Checking n8n credentials directory... "
if [ -d "/mnt/c/Users/Student/Desktop/n8n-setup/credentials" ]; then
    echo -e "${GREEN}✅ Exists${NC}"
else
    echo -e "${RED}❌ Missing${NC}"
fi

echo -n "Checking docker-compose.yml... "
if [ -f "/mnt/c/Users/Student/Desktop/n8n-setup/docker-compose.yml" ]; then
    echo -e "${GREEN}✅ Exists${NC}"
else
    echo -e "${RED}❌ Missing${NC}"
fi
echo

echo "5. 🔧 Quick Fixes"
echo "-----------------"
echo "If any services are not running, try:"
echo -e "${BLUE}cd /mnt/c/Users/Student/Desktop/n8n-setup${NC}"
echo -e "${BLUE}docker-compose up -d${NC}"
echo
echo "To set API keys, add them to your .env file:"
echo -e "${BLUE}echo 'OPENAI_API_KEY=your_key_here' >> .env${NC}"
echo -e "${BLUE}echo 'ANTHROPIC_API_KEY=your_key_here' >> .env${NC}"
echo

echo "6. 🚀 Next Steps"
echo "---------------"
echo "1. Open n8n: http://localhost:5678"
echo "2. Configure Cursor with Claude API"
echo "3. Create your first AI workflow"
echo "4. Test API integrations"
echo

echo "📖 For detailed setup instructions, see:"
echo "   ai-integration-setup.md"
echo
echo "Verification complete! 🎉"
