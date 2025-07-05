#!/usr/bin/env node

const http = require('http');

class IDECommand {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
        this.commands = {
            'status': 'Show IDE connection status',
            'connect': 'Connect to Claude Code IDE', 
            'cursor': 'Show Cursor integration info',
            'mcp': 'Show MCP server status',
            'help': 'Show this help'
        };
    }
    
    async execute(args) {
        if (args.length === 0 || args[0] === 'help') {
            this.showHelp();
            return;
        }
        
        const command = args[0];
        
        if (!this.commands[command]) {
            console.log(`❌ Unknown command: ${command}`);
            this.showHelp();
            return;
        }
        
        try {
            await this.callEndpoint(command);
        } catch (err) {
            console.log(`❌ Command failed: ${err.message}`);
            console.log('💡 Make sure IDE server is running: npm run ide-server');
        }
    }
    
    showHelp() {
        console.log('🎯 Claude Code IDE Commands');
        console.log('===========================');
        Object.entries(this.commands).forEach(([cmd, desc]) => {
            console.log(`  ide ${cmd.padEnd(8)} - ${desc}`);
        });
        console.log('\nExamples:');
        console.log('  ide status    # Check connection');
        console.log('  ide mcp       # Check MCP servers');
    }
    
    callEndpoint(command) {
        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}/ide/${command}`;
            const req = http.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const response = JSON.parse(data);
                        this.displayResponse(command, response);
                        resolve(response);
                    } catch (err) {
                        reject(new Error('Invalid response from server'));
                    }
                });
            });
            
            req.on('error', (err) => {
                reject(new Error('Cannot connect to IDE server'));
            });
            
            req.setTimeout(5000, () => {
                reject(new Error('Request timeout'));
            });
        });
    }
    
    displayResponse(command, response) {
        console.log(`🎯 IDE ${command.toUpperCase()}:`);
        console.log('===============');
        
        switch (command) {
            case 'status':
                console.log(`✅ Status: ${response.status}`);
                console.log(`🎯 Project: ${response.project}`);
                console.log(`⏱️  Uptime: ${response.uptime}s`);
                console.log(`🔗 Connections: ${response.connections}`);
                if (response.features) {
                    console.log(`🔧 Features: ${response.features.join(', ')}`);
                }
                break;
                
            case 'connect':
                console.log(`✅ ${response.message}`);
                console.log(`🔧 Capabilities: ${response.capabilities.join(', ')}`);
                break;
                
            case 'cursor':
                console.log(`✅ Cursor Integration: ${response.cursor_integration ? 'Active' : 'Inactive'}`);
                console.log(`🔧 Commands: ${response.commands.join(', ')}`);
                console.log(`📁 Project Root: ${response.project_root}`);
                break;
                
            case 'mcp':
                const mcpStatus = response.mcp_servers;
                console.log(`✅ MCP Status: ${mcpStatus.status || 'Unknown'}`);
                if (mcpStatus.servers) {
                    console.log(`🔧 Servers: ${mcpStatus.servers.join(', ')}`);
                    console.log(`📊 Count: ${mcpStatus.count || mcpStatus.servers.length}`);
                }
                break;
                
            default:
                console.log(JSON.stringify(response, null, 2));
        }
    }
}

// Execute command
const ide = new IDECommand();
const args = process.argv.slice(2);
ide.execute(args);