#!/usr/bin/env node
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class IDECommandInterface {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
        this.projectRoot = path.dirname(__dirname);
        this.commands = {
            'status': 'Show IDE server and MCP status',
            'connect': 'Test connection to IDE server',
            'mcp': 'Show MCP servers status',
            'start': 'Start all servers (MCP + IDE)',
            'stop': 'Stop all servers',
            'restart': 'Restart all servers',
            'health': 'Health check all services',
            'logs': 'Show IDE server logs',
            'project': 'Show project information',
            'files': 'List project files',
            'install': 'Install recommended VSCode/Cursor extensions',
            'setup': 'Run complete setup wizard'
        };
    }

    async makeRequest(endpoint, options = {}) {
        return new Promise((resolve, reject) => {
            const reqOptions = {
                method: options.method || 'GET',
                timeout: options.timeout || 10000,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'IDE-Command-Interface/1.0'
                }
            };

            const req = http.request(`${this.baseUrl}${endpoint}`, reqOptions, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(data);
                        resolve({ status: res.statusCode, data: parsed });
                    } catch (error) {
                        resolve({ status: res.statusCode, data: data });
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.setTimeout(reqOptions.timeout, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            if (options.body) {
                req.write(JSON.stringify(options.body));
            }

            req.end();
        });
    }

    async status() {
        console.log('🔍 System Status Check');
        console.log('====================');
        
        try {
            console.log('📡 Checking IDE Server...');
            const response = await this.makeRequest('/status?detailed=true');
            
            if (response.status === 200) {
                const data = response.data;
                console.log('✅ IDE Server: Running');
                console.log(`   Port: ${data.port}`);
                console.log(`   Uptime: ${data.uptime}s`);
                console.log(`   Connections: ${data.connections}`);
                console.log(`   Project: ${data.project.name}`);
                
                if (data.detailed) {
                    console.log(`   Memory: ${Math.round(data.detailed.memoryUsage.heapUsed / 1024 / 1024)}MB`);
                    console.log(`   Node: ${data.detailed.nodeVersion}`);
                }
            } else {
                console.log('❌ IDE Server: Unexpected response');
            }
        } catch (error) {
            console.log('❌ IDE Server: Not responding');
            console.log(`   Error: ${error.message}`);
        }

        console.log('');
        console.log('🤖 Checking MCP Status...');
        try {
            const mcpResponse = await this.makeRequest('/mcp');
            if (mcpResponse.status === 200) {
                const mcpData = mcpResponse.data;
                console.log('✅ MCP Config: Found');
                console.log(`   Servers configured: ${mcpData.serverCount}`);
                console.log(`   Servers: ${mcpData.servers.join(', ')}`);
            } else {
                console.log('❌ MCP Config: Not found');
            }
        } catch (error) {
            console.log('❌ MCP Status: Could not check');
        }
    }

    async connect() {
        console.log('🔗 Testing IDE Connection');
        console.log('=========================');
        
        try {
            const start = Date.now();
            const response = await this.makeRequest('/health');
            const duration = Date.now() - start;
            
            if (response.status === 200) {
                console.log('✅ Connection: Successful');
                console.log(`   Response time: ${duration}ms`);
                console.log(`   Health status: ${response.data.status}`);
                
                if (response.data.checks) {
                    console.log('   Health checks:');
                    Object.entries(response.data.checks).forEach(([name, check]) => {
                        const status = check.status === 'ok' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
                        console.log(`     ${name}: ${status} ${check.message}`);
                    });
                }
            } else {
                console.log(`❌ Connection: Failed (HTTP ${response.status})`);
            }
        } catch (error) {
            console.log('❌ Connection: Failed');
            console.log(`   Error: ${error.message}`);
            console.log('   Possible causes:');
            console.log('   - IDE server not running');
            console.log('   - Port 8080 blocked');
            console.log('   - Firewall issues');
        }
    }

    async mcp() {
        console.log('🤖 MCP Status Check');
        console.log('==================');
        
        try {
            const MCPManager = require('./mcp-server-manager.js');
            const manager = new MCPManager();
            console.log('✅ MCP Manager loaded');
            console.log('');
            manager.getStatus();
        } catch (error) {
            console.log('❌ MCP Manager not available');
            console.log(`   Error: ${error.message}`);
            console.log('');
            
            // Try to get MCP info from IDE server
            try {
                const response = await this.makeRequest('/mcp');
                if (response.status === 200) {
                    console.log('📊 MCP Configuration (from IDE server):');
                    console.log(`   Servers configured: ${response.data.serverCount}`);
                    console.log(`   Available servers: ${response.data.servers.join(', ')}`);
                } else {
                    console.log('❌ Could not get MCP status from IDE server');
                }
            } catch (ideError) {
                console.log('❌ Could not check MCP status');
            }
        }
    }

    async startServers() {
        console.log('🚀 Starting All Servers');
        console.log('=======================');
        
        console.log('🤖 Starting MCP servers...');
        try {
            const mcpProcess = spawn('node', [path.join(__dirname, 'mcp-server-manager.js'), 'start'], {
                stdio: 'inherit',
                cwd: this.projectRoot
            });
            
            // Give MCP servers time to start
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log('✅ MCP servers started');
        } catch (error) {
            console.log('❌ Failed to start MCP servers:', error.message);
        }
        
        console.log('');
        console.log('🖥️ Starting IDE server...');
        try {
            const ideProcess = spawn('node', [path.join(__dirname, 'claude-code-ide-server.js')], {
                stdio: 'inherit',
                cwd: this.projectRoot,
                detached: true
            });
            
            ideProcess.unref(); // Allow parent to exit
            
            // Give IDE server time to start
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('✅ IDE server started');
        } catch (error) {
            console.log('❌ Failed to start IDE server:', error.message);
        }
        
        console.log('');
        console.log('🎯 Startup complete!');
        console.log('   IDE Server: http://localhost:8080');
        console.log('   Check status: ./ide status');
    }

    async stopServers() {
        console.log('🛑 Stopping All Servers');
        console.log('=======================');
        
        console.log('🤖 Stopping MCP servers...');
        try {
            spawn('node', [path.join(__dirname, 'mcp-server-manager.js'), 'stop'], {
                stdio: 'inherit',
                cwd: this.projectRoot
            });
        } catch (error) {
            console.log('❌ Error stopping MCP servers:', error.message);
        }
        
        console.log('🖥️ Stopping IDE server...');
        try {
            // Try graceful shutdown first
            await this.makeRequest('/api/restart', { method: 'POST' });
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            // Fallback to process kill
            try {
                spawn('pkill', ['-f', 'claude-code-ide-server.js'], { stdio: 'inherit' });
            } catch (killError) {
                console.log('⚠️ Could not stop IDE server processes');
            }
        }
        
        console.log('✅ All servers stopped');
    }

    async logs() {
        console.log('📋 IDE Server Logs');
        console.log('==================');
        
        try {
            const response = await this.makeRequest('/logs?limit=50');
            if (response.status === 200) {
                const { logs, total } = response.data;
                console.log(`Showing last ${logs.length} of ${total} entries:\n`);
                
                logs.forEach(log => {
                    const time = new Date(log.timestamp).toLocaleTimeString();
                    console.log(`${time} ${log.method} ${log.url}`);
                });
            } else {
                console.log('❌ Could not retrieve logs');
            }
        } catch (error) {
            console.log('❌ Could not connect to IDE server');
            console.log(`   Error: ${error.message}`);
        }
    }

    async project() {
        console.log('📁 Project Information');
        console.log('=====================');
        
        try {
            const response = await this.makeRequest('/project');
            if (response.status === 200) {
                const data = response.data;
                console.log(`Name: ${data.name}`);
                console.log(`Root: ${data.root}`);
                console.log(`Package.json: ${data.hasPackageJson ? '✅' : '❌'}`);
                console.log(`Git repository: ${data.hasGit ? '✅' : '❌'}`);
                console.log(`MCP configuration: ${data.hasMCP ? '✅' : '❌'}`);
                
                if (data.version) console.log(`Version: ${data.version}`);
                if (data.description) console.log(`Description: ${data.description}`);
                
                if (data.scripts && data.scripts.length > 0) {
                    console.log(`\nAvailable scripts: ${data.scripts.join(', ')}`);
                }
                
                if (data.mcpServers && data.mcpServers.length > 0) {
                    console.log(`\nMCP servers: ${data.mcpServers.join(', ')}`);
                }
            } else {
                console.log('❌ Could not retrieve project information');
            }
        } catch (error) {
            console.log('❌ Could not connect to IDE server');
            console.log(`   Error: ${error.message}`);
        }
    }

    async files() {
        console.log('📄 Project Files');
        console.log('================');
        
        try {
            const response = await this.makeRequest('/files?filter=&limit=100');
            if (response.status === 200) {
                const { files, count } = response.data;
                console.log(`Found ${count} files:\n`);
                
                // Group files by type
                const filesByType = {};
                files.forEach(file => {
                    const ext = file.type || 'other';
                    if (!filesByType[ext]) filesByType[ext] = [];
                    filesByType[ext].push(file);
                });
                
                Object.entries(filesByType).forEach(([type, typeFiles]) => {
                    console.log(`${type.toUpperCase()} files (${typeFiles.length}):`);
                    typeFiles.slice(0, 10).forEach(file => {
                        const size = file.size < 1024 ? `${file.size}B` : `${Math.round(file.size/1024)}KB`;
                        console.log(`  ${file.path} (${size})`);
                    });
                    if (typeFiles.length > 10) {
                        console.log(`  ... and ${typeFiles.length - 10} more`);
                    }
                    console.log('');
                });
            } else {
                console.log('❌ Could not retrieve file list');
            }
        } catch (error) {
            console.log('❌ Could not connect to IDE server');
            console.log(`   Error: ${error.message}`);
        }
    }

    async install() {
        console.log('🔧 Installing Recommended Extensions');
        console.log('===================================');
        
        const extensions = [
            'ms-vscode.vscode-typescript-next',
            'bradlc.vscode-tailwindcss',
            'esbenp.prettier-vscode',
            'ms-vscode.vscode-eslint',
            'PKief.material-icon-theme',
            'formulahendry.auto-rename-tag',
            'christian-kohler.path-intellisense',
            'ms-vscode.vscode-json',
            'redhat.vscode-yaml',
            'ms-vscode.vscode-markdown',
            'antropic.claude-code'
        ];
        
        console.log('📦 Recommended extensions for this project:');
        extensions.forEach(ext => console.log(`  - ${ext}`));
        
        console.log('\n🔍 Checking for Cursor or VSCode...');
        
        // Try to install extensions
        for (const ext of extensions) {
            try {
                console.log(`Installing ${ext}...`);
                const process = spawn('code', ['--install-extension', ext], { 
                    stdio: 'pipe',
                    timeout: 30000
                });
                
                await new Promise((resolve, reject) => {
                    process.on('close', (code) => {
                        if (code === 0) {
                            console.log(`✅ ${ext} installed`);
                        } else {
                            console.log(`⚠️ ${ext} installation failed`);
                        }
                        resolve();
                    });
                    
                    process.on('error', () => {
                        console.log(`⚠️ ${ext} installation failed`);
                        resolve();
                    });
                });
            } catch (error) {
                console.log(`⚠️ Could not install ${ext}`);
            }
        }
        
        console.log('\n📋 Manual installation instructions:');
        console.log('1. Open Cursor/VSCode');
        console.log('2. Press Ctrl+Shift+X (Cmd+Shift+X on Mac)');
        console.log('3. Search for and install each extension above');
        console.log('4. Restart your editor');
    }

    async setup() {
        console.log('🎯 Complete Setup Wizard');
        console.log('========================');
        
        console.log('1️⃣ Checking project structure...');
        await this.project();
        
        console.log('\n2️⃣ Installing extensions...');
        await this.install();
        
        console.log('\n3️⃣ Starting services...');
        await this.startServers();
        
        console.log('\n4️⃣ Running health check...');
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for services
        await this.status();
        
        console.log('\n🎉 Setup Complete!');
        console.log('==================');
        console.log('Next steps:');
        console.log('1. Restart Cursor/VSCode completely');
        console.log('2. Open this project folder');
        console.log('3. Look for Claude Code icon in the toolbar');
        console.log('4. Start coding with Claude assistance!');
        console.log('');
        console.log('🔗 Useful links:');
        console.log('   IDE Server: http://localhost:8080');
        console.log('   Status check: ./ide status');
        console.log('   Help: ./ide help');
    }

    showHelp() {
        console.log('🔧 IDE Command Interface');
        console.log('========================');
        console.log('');
        console.log('Available commands:');
        console.log('');
        
        Object.entries(this.commands).forEach(([cmd, desc]) => {
            console.log(`  ${cmd.padEnd(12)} - ${desc}`);
        });
        
        console.log('');
        console.log('Usage: ./ide <command>');
        console.log('Example: ./ide status');
        console.log('');
        console.log('🎯 Quick start: ./ide setup');
    }

    async executeCommand(command) {
        switch (command) {
            case 'status':
                await this.status();
                break;
            case 'connect':
                await this.connect();
                break;
            case 'mcp':
                await this.mcp();
                break;
            case 'start':
                await this.startServers();
                break;
            case 'stop':
                await this.stopServers();
                break;
            case 'restart':
                await this.stopServers();
                console.log('\n⏳ Waiting before restart...');
                await new Promise(resolve => setTimeout(resolve, 3000));
                await this.startServers();
                break;
            case 'health':
                await this.status();
                await this.connect();
                await this.mcp();
                break;
            case 'logs':
                await this.logs();
                break;
            case 'project':
                await this.project();
                break;
            case 'files':
                await this.files();
                break;
            case 'install':
                await this.install();
                break;
            case 'setup':
                await this.setup();
                break;
            case 'help':
            default:
                this.showHelp();
        }
    }
}

// CLI Interface
if (require.main === module) {
    const interface = new IDECommandInterface();
    const command = process.argv[2];
    
    if (!command) {
        interface.showHelp();
    } else {
        interface.executeCommand(command).catch(error => {
            console.error('❌ Command failed:', error.message);
            process.exit(1);
        });
    }
}

module.exports = IDECommandInterface;