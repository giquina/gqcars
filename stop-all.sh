#!/bin/bash
echo "🛑 Stopping All Services"
echo "========================"

# Function to kill processes by pattern
kill_by_pattern() {
    local pattern=$1
    local name=$2
    
    echo "🔍 Looking for $name processes..."
    
    # Find processes
    local pids=$(pgrep -f "$pattern" 2>/dev/null)
    
    if [ -z "$pids" ]; then
        echo "   ℹ️ No $name processes found"
        return 0
    fi
    
    echo "   📋 Found PIDs: $pids"
    
    # Try graceful shutdown first
    echo "   ⏳ Attempting graceful shutdown..."
    for pid in $pids; do
        if kill -TERM "$pid" 2>/dev/null; then
            echo "   ✅ Sent SIGTERM to PID $pid"
        fi
    done
    
    # Wait for graceful shutdown
    sleep 3
    
    # Check if processes are still running
    local remaining=$(pgrep -f "$pattern" 2>/dev/null)
    
    if [ -z "$remaining" ]; then
        echo "   ✅ $name stopped gracefully"
        return 0
    fi
    
    # Force kill remaining processes
    echo "   ⚠️ Force killing remaining processes..."
    for pid in $remaining; do
        if kill -KILL "$pid" 2>/dev/null; then
            echo "   💥 Force killed PID $pid"
        fi
    done
    
    # Final check
    sleep 1
    local final_check=$(pgrep -f "$pattern" 2>/dev/null)
    
    if [ -z "$final_check" ]; then
        echo "   ✅ $name stopped"
    else
        echo "   ❌ Some $name processes may still be running"
    fi
}

# Stop MCP servers
echo "🤖 Stopping MCP servers..."
if [ -f "scripts/mcp-server-manager.js" ]; then
    node scripts/mcp-server-manager.js stop 2>/dev/null
    sleep 2
fi

# Kill any remaining MCP processes
kill_by_pattern "mcp-server-manager" "MCP Manager"
kill_by_pattern "@modelcontextprotocol" "MCP Servers"

# Stop IDE server
echo ""
echo "🖥️ Stopping IDE server..."

# Try graceful shutdown via API
if curl -s -X POST http://localhost:8080/api/restart >/dev/null 2>&1; then
    echo "   ✅ Sent graceful shutdown request"
    sleep 2
fi

# Kill IDE server processes
kill_by_pattern "claude-code-ide-server" "IDE Server"

# Stop development server if running
echo ""
echo "🌐 Stopping development server..."
kill_by_pattern "npm run dev" "Development Server"
kill_by_pattern "next dev" "Next.js Server"

# Stop any other Node.js processes that might be related
echo ""
echo "🧹 Cleaning up..."

# Kill any processes using our ports
if lsof -ti:8080 >/dev/null 2>&1; then
    echo "   🔌 Killing processes on port 8080..."
    lsof -ti:8080 | xargs kill -9 2>/dev/null
fi

if lsof -ti:3000 >/dev/null 2>&1; then
    echo "   🔌 Killing processes on port 3000..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
fi

# Clean up temporary files
echo "   🗑️ Cleaning temporary files..."
rm -f .mcp-status .claude-ide-status .cursor-* temp/* 2>/dev/null

echo ""
echo "🎉 Cleanup Complete!"
echo "==================="

# Verify ports are free
if ! lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Port 8080: Available"
else
    echo "⚠️ Port 8080: Still in use"
fi

if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Port 3000: Available"
else
    echo "⚠️ Port 3000: Still in use"
fi

echo ""
echo "💡 To restart services, run: ./start-all.sh"