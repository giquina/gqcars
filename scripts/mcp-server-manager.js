#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

class MCPServerManager extends EventEmitter {
    constructor() {
        super();
        this.configPath = path.join(__dirname, '..', '.mcp.json');
        this.servers = new Map();
        this.healthChecks = new Map();
        this.loadConfig();
    }

    loadConfig() {
        try {
            const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
            this.mcpConfig = config.mcpServers || {};
            console.log('✅ MCP configuration loaded');
            console.log(`📊 Found ${Object.keys(this.mcpConfig).length} MCP servers configured`);
        } catch (error) {
            console.error('❌ Failed to load MCP config:', error.message);
            process.exit(1);
        }
    }

    async startServer(name, config) {
        return new Promise((resolve, reject) => {
            console.log(`🚀 Starting ${name} server...`);
            
            const serverProcess = spawn(config.command, config.args, {
                env: { ...process.env, ...config.env },
                stdio: ['pipe', 'pipe', 'pipe'],
                detached: false
            });

            let startupSuccessful = false;
            const timeout = setTimeout(() => {
                if (!startupSuccessful) {
                    console.log(`⚠️ ${name} server taking longer than expected to start`);
                    resolve(); // Don't fail, just continue
                }
            }, 10000);

            serverProcess.stdout.on('data', (data) => {
                const output = data.toString().trim();
                console.log(`[${name}] ${output}`);
                
                // Check for successful startup indicators
                if (output.includes('server running') || output.includes('listening') || output.includes('started')) {
                    startupSuccessful = true;
                    clearTimeout(timeout);
                    resolve();
                }
            });

            serverProcess.stderr.on('data', (data) => {
                const error = data.toString().trim();
                console.log(`[${name}] ${error}`);
            });

            serverProcess.on('close', (code) => {
                clearTimeout(timeout);
                if (code === 0) {
                    console.log(`✅ ${name} server started successfully`);
                    startupSuccessful = true;
                    resolve();
                } else if (code !== null) {
                    console.log(`❌ ${name} server failed with code ${code}`);
                    reject(new Error(`Server ${name} failed with code ${code}`));
                }
            });

            serverProcess.on('error', (error) => {
                clearTimeout(timeout);
                console.error(`❌ Failed to start ${name}:`, error.message);
                reject(error);
            });

            this.servers.set(name, {
                process: serverProcess,
                config: config,
                startTime: new Date(),
                restarts: 0
            });

            // Set up health monitoring
            this.setupHealthCheck(name);
        });
    }

    setupHealthCheck(name) {
        const interval = setInterval(() => {
            const server = this.servers.get(name);
            if (server && server.process && !server.process.killed) {
                // Server is still running
                this.emit('health-check', { name, status: 'healthy' });
            } else if (server) {
                // Server has died, attempt restart
                console.log(`🔄 ${name} server died, attempting restart...`);
                clearInterval(interval);
                this.restartServer(name);
            }
        }, 30000); // Check every 30 seconds

        this.healthChecks.set(name, interval);
    }

    async restartServer(name) {
        const server = this.servers.get(name);
        if (!server) return;

        if (server.restarts < 3) {
            server.restarts++;
            console.log(`🔄 Restarting ${name} (attempt ${server.restarts}/3)...`);
            
            try {
                await this.startServer(name, server.config);
                console.log(`✅ ${name} restarted successfully`);
            } catch (error) {
                console.error(`❌ Failed to restart ${name}:`, error.message);
            }
        } else {
            console.error(`❌ ${name} has failed too many times, giving up`);
            this.servers.delete(name);
        }
    }

    async startAllServers() {
        console.log('🚀 Starting all MCP servers...');
        console.log('==============================');
        
        const startPromises = [];
        
        for (const [name, config] of Object.entries(this.mcpConfig)) {
            startPromises.push(
                this.startServer(name, config).catch(error => {
                    console.error(`❌ Failed to start ${name}:`, error.message);
                    return null;
                })
            );
        }
        
        try {
            await Promise.allSettled(startPromises);
            console.log('✅ All MCP servers startup completed');
            console.log(`📊 Running servers: ${this.getRunningServersCount()}/${Object.keys(this.mcpConfig).length}`);
        } catch (error) {
            console.error('❌ Error during server startup:', error.message);
        }
    }

    stopAllServers() {
        console.log('🛑 Stopping all MCP servers...');
        console.log('==============================');
        
        for (const [name, server] of this.servers) {
            try {
                // Clear health check
                const healthCheck = this.healthChecks.get(name);
                if (healthCheck) {
                    clearInterval(healthCheck);
                    this.healthChecks.delete(name);
                }

                // Stop the process
                if (server.process && !server.process.killed) {
                    server.process.kill('SIGTERM');
                    console.log(`✅ ${name} server stopped`);
                } else {
                    console.log(`⚠️ ${name} server was already stopped`);
                }
            } catch (error) {
                console.error(`❌ Failed to stop ${name}:`, error.message);
                // Force kill if graceful shutdown fails
                try {
                    server.process.kill('SIGKILL');
                } catch (killError) {
                    console.error(`❌ Failed to force kill ${name}:`, killError.message);
                }
            }
        }
        
        this.servers.clear();
        this.healthChecks.clear();
        console.log('✅ All servers stopped');
    }

    getRunningServersCount() {
        let running = 0;
        for (const [name, server] of this.servers) {
            if (server.process && !server.process.killed) {
                running++;
            }
        }
        return running;
    }

    getStatus() {
        console.log('📊 MCP Server Status:');
        console.log('=====================');
        
        if (this.servers.size === 0) {
            console.log('No servers currently managed');
            return;
        }

        for (const [name, server] of this.servers) {
            const isRunning = server.process && !server.process.killed;
            const status = isRunning ? '✅ Running' : '❌ Stopped';
            const uptime = isRunning ? Math.floor((Date.now() - server.startTime.getTime()) / 1000) : 0;
            const pid = isRunning ? server.process.pid : 'N/A';
            
            console.log(`${name}:`);
            console.log(`  Status: ${status}`);
            console.log(`  PID: ${pid}`);
            console.log(`  Uptime: ${uptime}s`);
            console.log(`  Restarts: ${server.restarts}`);
            console.log('');
        }

        console.log(`Total servers: ${this.servers.size}`);
        console.log(`Running: ${this.getRunningServersCount()}`);
        console.log(`Configured: ${Object.keys(this.mcpConfig).length}`);
    }

    async healthCheck() {
        console.log('🏥 MCP Health Check:');
        console.log('===================');
        
        const results = [];
        
        for (const [name, server] of this.servers) {
            const isRunning = server.process && !server.process.killed;
            const result = {
                name,
                status: isRunning ? 'healthy' : 'unhealthy',
                pid: isRunning ? server.process.pid : null,
                uptime: isRunning ? Math.floor((Date.now() - server.startTime.getTime()) / 1000) : 0
            };
            
            results.push(result);
            console.log(`${name}: ${result.status} (PID: ${result.pid || 'N/A'})`);
        }
        
        return results;
    }

    async restart() {
        console.log('🔄 Restarting all MCP servers...');
        await this.stopAllServers();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        await this.startAllServers();
    }
}

// CLI Interface
if (require.main === module) {
    const manager = new MCPServerManager();
    const command = process.argv[2];

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Received interrupt signal, shutting down gracefully...');
        manager.stopAllServers();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log('\n🛑 Received termination signal, shutting down gracefully...');
        manager.stopAllServers();
        process.exit(0);
    });

    switch (command) {
        case 'start':
            manager.startAllServers();
            break;
        case 'stop':
            manager.stopAllServers();
            break;
        case 'status':
            manager.getStatus();
            break;
        case 'health':
            manager.healthCheck();
            break;
        case 'restart':
            manager.restart();
            break;
        default:
            console.log('🔧 MCP Server Manager');
            console.log('Usage: node mcp-server-manager.js [start|stop|status|health|restart]');
            console.log('');
            console.log('Commands:');
            console.log('  start   - Start all MCP servers');
            console.log('  stop    - Stop all MCP servers');
            console.log('  status  - Show server status');
            console.log('  health  - Run health check');
            console.log('  restart - Restart all servers');
    }
}

module.exports = MCPServerManager;