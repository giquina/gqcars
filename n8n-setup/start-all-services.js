const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');

class MCPSystemManager {
  constructor() {
    this.services = [
      { name: 'Cursor MCP Bridge', script: 'cursor-mcp-bridge.js', port: null },
      { name: 'Vectara MCP Bridge', script: 'vectara-mcp-bridge.js', port: null },
      { name: 'Google Workspace MCP', script: 'google-workspace-mcp.js', port: null },
      { name: 'Vercel MCP Bridge', script: 'vercel-mcp-bridge.js', port: null },
      { name: 'n8n MCP Bridge', script: 'n8n-mcp-bridge.js', port: null }
    ];
    this.processes = new Map();
  }

  async startAllServices() {
    console.log(chalk.blue('🚀 Starting Complete MCP Automation System...\\n'));
    
    for (const service of this.services) {
      await this.startService(service);
      await this.delay(2000);
    }
    
    await this.healthCheckAll();
    
    console.log(chalk.green('\\n✅ All MCP services started successfully!'));
    console.log(chalk.yellow('\\n📋 Next Steps:'));
    console.log('1. Copy claude_desktop_config.json to Claude Desktop config folder');
    console.log('2. Add your API keys to .env file');
    console.log('3. Restart Claude Desktop');
    console.log('4. Start using Claude prompts to control everything!');
    
    process.on('SIGINT', () => {
      console.log(chalk.red('\\n🛑 Shutting down...'));
      this.stopAllServices();
      process.exit(0);
    });
  }

  async startService(service) {
    console.log(chalk.blue(`Starting ${service.name}...`));
    
    try {
      const process = spawn('node', [service.script], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: __dirname
      });
      
      this.processes.set(service.name, process);
      
      process.stderr.on('data', (data) => {
        const message = data.toString().trim();
        if (message.includes('started')) {
          console.log(chalk.green(`✅ ${service.name} ready`));
        }
      });
      
    } catch (error) {
      console.log(chalk.red(`❌ Failed to start ${service.name}: ${error.message}`));
    }
  }

  async stopAllServices() {
    for (const [name, process] of this.processes) {
      process.kill();
    }
    this.processes.clear();
  }

  async healthCheckAll() {
    console.log(chalk.blue('\\n🔍 Health Check...'));
    
    try {
      await fs.access(path.join(__dirname, 'claude_desktop_config.json'));
      console.log(chalk.green('✅ MCP Config'));
    } catch {
      console.log(chalk.red('❌ MCP Config missing'));
    }
    
    try {
      await fs.access(path.join(__dirname, 'node_modules'));
      console.log(chalk.green('✅ Dependencies'));
    } catch {
      console.log(chalk.yellow('⚠️  Run npm install'));
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

if (require.main === module) {
  const manager = new MCPSystemManager();
  manager.startAllServices().catch(console.error);
}

module.exports = MCPSystemManager;