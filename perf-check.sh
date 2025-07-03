#\!/bin/bash
echo "⚡ GQ Cars Performance Check"
echo "=========================="

echo "📊 System Info:"
echo "Date: $(date)"
echo "User: $USER"

echo -e "\n🤖 Agent Dashboard:"
if curl -s http://localhost:3002/api/agents > /dev/null 2>&1; then
    echo "✅ Dashboard responding"
    response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:3002/api/agents 2>/dev/null)
    echo "Response time: ${response_time}s"
else
    echo "❌ Dashboard not responding"
fi

echo -e "\n📈 Node Processes:"
ps aux  < /dev/null |  grep node | grep -E "(gqcars|dashboard)" | grep -v grep | wc -l | xargs echo "Active processes:"

echo -e "\n🔌 Port Status:"
for port in 3000 3002; do
    if nc -z localhost $port 2>/dev/null; then
        echo "Port $port: OPEN"
    else
        echo "Port $port: CLOSED"
    fi
done

echo -e "\n✅ Performance check complete!"
