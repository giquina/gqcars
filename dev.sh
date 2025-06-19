#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting development environment...${NC}"

# Kill any existing Node processes
echo "Cleaning up existing processes..."
pkill -f node

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run type checking in background
echo -e "${GREEN}Running type checking...${NC}"
npm run typecheck &

# Start development server
echo -e "${GREEN}Starting development server...${NC}"
npm run dev