#!/bin/bash
echo "🚀 Starting GQ Cars Development Environment"
echo "=========================================="

# Function to check if port is available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1
    else
        return 0
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            echo "✅ $name is ready!"
            return 0
        fi
        
        echo -n "."
        sleep 1
        attempt=$((attempt + 1))
    done
    
    echo "❌ $name failed to start within ${max_attempts} seconds"
    return 1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"

# Check if ports are available
if ! check_port 8080; then
    echo "⚠️ Port 8080 is already in use"
    echo "   You may need to stop existing services first"
    echo "   Run: ./stop-all.sh"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start MCP servers in background
echo "🤖 Starting MCP servers..."
node scripts/mcp-server-manager.js start &
MCP_PID=$!

# Give MCP servers time to initialize
sleep 3

# Check if MCP servers started successfully
if ps -p $MCP_PID > /dev/null; then
    echo "✅ MCP servers process started (PID: $MCP_PID)"
else
    echo "❌ MCP servers failed to start"
fi

# Start IDE server in background
echo "🖥️ Starting Claude Code IDE server..."
node scripts/claude-code-ide-server.js &
IDE_PID=$!

# Give IDE server time to initialize
sleep 2

# Check if IDE server started successfully
if ps -p $IDE_PID > /dev/null; then
    echo "✅ IDE server process started (PID: $IDE_PID)"
else
    echo "❌ IDE server failed to start"
    exit 1
fi

# Wait for IDE server to be responsive
if wait_for_service "http://localhost:8080/health" "IDE Server"; then
    echo ""
    
    # Optionally start development server
    read -p "Start development server (apps/web)? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [ -d "apps/web" ]; then
            echo "🌐 Starting development server..."
            cd apps/web
            npm run dev &
            DEV_PID=$!
            cd ..
            echo "✅ Development server started (PID: $DEV_PID)"
        else
            echo "⚠️ apps/web directory not found"
        fi
    fi
    
    echo ""
    echo "🎉 All services started successfully!"
    echo "======================================="
    echo "🔗 IDE Server: http://localhost:8080"
    echo "📊 Status: http://localhost:8080/status"
    echo "🏥 Health: http://localhost:8080/health"
    if [ ! -z "$DEV_PID" ]; then
        echo "🌐 Development: http://localhost:3000"
    fi
    echo ""
    echo "📋 Quick commands:"
    echo "   ./ide status    - Check system status"
    echo "   ./ide health    - Run health check"
    echo "   ./ide logs      - View server logs"
    echo "   ./stop-all.sh   - Stop all services"
    echo ""
    echo "✨ Ready for Claude Code integration!"
    echo "   1. Open Cursor/VSCode"
    echo "   2. Install Claude Code extension"
    echo "   3. Look for Claude icon in toolbar"
    echo ""
    echo "💡 Press Ctrl+C to stop all services"
    
    # Wait for interrupt
    trap 'echo ""; echo "🛑 Shutting down..."; ./stop-all.sh; exit 0' INT
    wait
else
    echo "❌ Services failed to start properly"
    echo "   Check logs above for errors"
    exit 1
fi