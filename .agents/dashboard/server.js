const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Agent status storage
const agentStatus = {
  'database-architect': {
    status: 'ready',
    specialty: 'Database schema design and Prisma management',
    priority: 'high',
    tasks: ['Complete User model with SIA licensing fields'],
    completedTasks: []
  },
  'api-builder': {
    status: 'ready', 
    specialty: 'REST API endpoints and authentication',
    priority: 'high',
    tasks: ['Create booking CRUD endpoints'],
    completedTasks: []
  },
  'frontend-developer': {
    status: 'ready',
    specialty: 'React components and user interfaces', 
    priority: 'high',
    tasks: ['Build responsive booking form'],
    completedTasks: []
  },
  'integration-specialist': {
    status: 'ready',
    specialty: 'Third-party integrations (Stripe, email, maps)',
    priority: 'medium',
    tasks: ['Set up Stripe payment integration'],
    completedTasks: []
  },
  'testing-agent': {
    status: 'ready',
    specialty: 'Test suites and quality assurance',
    priority: 'medium', 
    tasks: ['Create comprehensive test coverage'],
    completedTasks: []
  },
  'documentation-writer': {
    status: 'ready',
    specialty: 'Documentation and API guides',
    priority: 'low',
    tasks: ['Update API documentation'],
    completedTasks: []
  }
};

// Routes
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 GQ Cars Autonomous Agents Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            min-height: 100vh;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: rgba(255,255,255,0.15);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        .stat-number { font-size: 2em; font-weight: bold; color: #ffd700; }
        .agents-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
        }
        .agent-card {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 20px;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .agent-card:hover {
            border-color: #ffd700;
            transform: translateY(-5px);
        }
        .agent-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .agent-name { 
            font-size: 1.3em; 
            font-weight: bold; 
            color: #ffd700;
        }
        .status {
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            text-transform: uppercase;
            font-weight: bold;
        }
        .status.ready { background: #28a745; }
        .status.working { background: #ffc107; color: #000; }
        .status.error { background: #dc3545; }
        .progress-bar {
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            height: 8px;
            margin: 10px 0;
            overflow: hidden;
        }
        .progress-fill {
            background: linear-gradient(90deg, #ffd700, #ffed4e);
            height: 100%;
            transition: width 0.3s ease;
        }
        .tasks {
            margin: 15px 0;
            padding: 15px;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
        }
        .task {
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .task:last-child { border-bottom: none; }
        .task.current {
            color: #ffd700;
            font-weight: bold;
        }
        .add-task {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .add-task input {
            flex: 1;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            background: rgba(255,255,255,0.9);
            color: #333;
        }
        .add-task button {
            padding: 8px 15px;
            border: none;
            border-radius: 5px;
            background: #ffd700;
            color: #333;
            font-weight: bold;
            cursor: pointer;
        }
        .add-task button:hover {
            background: #ffed4e;
        }
        .live-indicator {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-weight: bold;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    </style>
</head>
<body>
    <div class="live-indicator">🟢 LIVE</div>
    
    <div class="header">
        <h1>🤖 GQ Cars Autonomous Agents</h1>
        <p>Real-time monitoring dashboard for your AI development team</p>
    </div>

    <div class="stats">
        <div class="stat-card">
            <div class="stat-number" id="activeAgents">6</div>
            <div>Active Agents</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="completedTasks">0</div>
            <div>Completed Tasks</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="pendingTasks">6</div>
            <div>Pending Tasks</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="overallProgress">0%</div>
            <div>Overall Progress</div>
        </div>
    </div>

    <div class="agents-grid" id="agents">
        <!-- Agents will be loaded here -->
    </div>

    <script>
        async function loadAgents() {
            try {
                const response = await fetch('/api/agents');
                const agents = await response.json();
                updateDashboard(agents);
            } catch (error) {
                console.error('Failed to load agents:', error);
            }
        }

        function updateDashboard(agents) {
            const agentEntries = Object.entries(agents);
            let activeAgents = 0;
            let completedTasks = 0;
            let pendingTasks = 0;

            agentEntries.forEach(([name, agent]) => {
                if (agent.status === 'ready' || agent.status === 'working') activeAgents++;
                completedTasks += agent.completedTasks.length;
                pendingTasks += agent.tasks.length;
            });

            const totalTasks = completedTasks + pendingTasks;
            const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            document.getElementById('activeAgents').textContent = activeAgents;
            document.getElementById('completedTasks').textContent = completedTasks;
            document.getElementById('pendingTasks').textContent = pendingTasks;
            document.getElementById('overallProgress').textContent = overallProgress + '%';

            const agentsContainer = document.getElementById('agents');
            agentsContainer.innerHTML = '';

            agentEntries.forEach(([name, agent]) => {
                const agentCard = document.createElement('div');
                agentCard.className = 'agent-card';

                const progress = agent.completedTasks.length + agent.tasks.length > 0 ? 
                    Math.round((agent.completedTasks.length / (agent.completedTasks.length + agent.tasks.length)) * 100) : 0;

                agentCard.innerHTML = \`
                    <div class="agent-header">
                        <div class="agent-name">\${name}</div>
                        <div class="status \${agent.status}">\${agent.status}</div>
                    </div>
                    <div><strong>Specialty:</strong> \${agent.specialty}</div>
                    <div><strong>Priority:</strong> \${agent.priority}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: \${progress}%"></div>
                    </div>
                    <div><strong>Progress:</strong> \${progress}%</div>
                    <div class="tasks">
                        <strong>Current Tasks:</strong>
                        \${agent.tasks.slice(0, 3).map((task, index) => \`
                            <div class="task \${index === 0 && agent.status === 'working' ? 'current' : ''}">
                                \${task}
                            </div>
                        \`).join('')}
                        \${agent.tasks.length > 3 ? \`<div class="task">... +\${agent.tasks.length - 3} more</div>\` : ''}
                    </div>
                    <div class="add-task">
                        <input type="text" placeholder="Add new task..." id="task-\${name}">
                        <button onclick="addTask('\${name}')">Add Task</button>
                    </div>
                \`;

                agentsContainer.appendChild(agentCard);
            });
        }

        async function addTask(agentName) {
            const input = document.getElementById(\`task-\${agentName}\`);
            const task = input.value.trim();
            
            if (task) {
                try {
                    await fetch('/api/agents/task', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ agent: agentName, task: task })
                    });
                    input.value = '';
                    loadAgents(); // Refresh
                } catch (error) {
                    console.error('Failed to add task:', error);
                }
            }
        }

        // Load agents on page load
        loadAgents();
        
        // Auto-refresh every 5 seconds
        setInterval(loadAgents, 5000);
    </script>
</body>
</html>
  `);
});

// API Routes
app.get('/api/agents', (req, res) => {
  res.json(agentStatus);
});

app.post('/api/agents/task', (req, res) => {
  const { agent, task } = req.body;
  
  if (agentStatus[agent]) {
    agentStatus[agent].tasks.push(task);
    agentStatus[agent].status = 'working';
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Agent not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GQ Cars Agent Dashboard running at http://localhost:${PORT}`);
  console.log(`📊 Monitor your 6 autonomous agents in real-time!`);
});