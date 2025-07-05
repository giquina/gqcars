const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting MCP Servers...');

// Read MCP configuration
const configPath = path.join(__dirname, '..', '.mcp.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const servers = Object.keys(config.mcpServers);
let startedCount = 0;

servers.forEach(serverName => {
    const serverConfig = config.mcpServers[serverName];
    
    console.log(`🔧 Starting ${serverName}...`);
    
    const server = spawn(serverConfig.command, serverConfig.args, {
        env: { ...process.env, ...serverConfig.env },
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: path.join(__dirname, '..')
    });
    
    let isStarted = false;
    
    server.stdout.on('data', (data) => {
        if (!isStarted) {
            console.log(`✅ ${serverName} server started`);
            isStarted = true;
            startedCount++;
            
            if (startedCount === servers.length) {
                console.log('🎉 All MCP servers started!');
                
                // Create status file
                fs.writeFileSync(path.join(__dirname, '..', '.mcp-status'), JSON.stringify({
                    status: 'active',
                    servers: servers,
                    started: new Date().toISOString(),
                    count: servers.length
                }));
            }
        }
    });
    
    server.stderr.on('data', (data) => {
        console.log(`📝 ${serverName}: ${data}`);
    });
    
    server.on('error', (err) => {
        console.error(`❌ ${serverName} error:`, err.message);
    });
    
    // Store reference
    process[`server_${serverName}`] = server;
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down MCP servers...');
    servers.forEach(name => {
        if (process[`server_${name}`]) {
            process[`server_${name}`].kill();
        }
    });
    const statusPath = path.join(__dirname, '..', '.mcp-status');
    if (fs.existsSync(statusPath)) {
        fs.unlinkSync(statusPath);
    }
    process.exit(0);
});

console.log(`🎯 Starting ${servers.length} MCP servers...`);