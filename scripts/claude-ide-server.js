const http = require('http');
const fs = require('fs');
const path = require('path');

class ClaudeCodeIDEServer {
    constructor(port = 8080) {
        this.port = port;
        this.startTime = new Date();
        this.connections = 0;
        this.projectRoot = path.dirname(__dirname);
        this.projectName = path.basename(this.projectRoot);
        
        this.initializeServer();
    }
    
    initializeServer() {
        this.server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });
        
        this.server.listen(this.port, () => {
            console.log(`✅ Claude Code IDE Server running on port ${this.port}`);
            console.log(`🎯 Project: ${this.projectName}`);
            console.log(`📍 Root: ${this.projectRoot}`);
            this.createStatusFiles();
        });
        
        this.setupErrorHandling();
    }
    
    handleRequest(req, res) {
        this.connections++;
        
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'X-IDE-Server': 'Claude Code IDE',
            'X-Project': this.projectName
        };
        
        res.writeHead(200, headers);
        
        const response = this.getResponse(req.url);
        res.end(JSON.stringify(response, null, 2));
    }
    
    getResponse(url) {
        const baseResponse = {
            server: 'Claude Code IDE',
            version: '2.0.0',
            project: this.projectName,
            status: 'connected',
            uptime: Math.floor((new Date() - this.startTime) / 1000),
            connections: this.connections,
            timestamp: new Date().toISOString()
        };
        
        switch (url) {
            case '/ide/status':
                return {
                    ...baseResponse,
                    features: ['cursor-integration', 'mcp-support', 'real-time'],
                    endpoints: ['/ide/status', '/ide/connect', '/ide/cursor', '/ide/mcp'],
                    mcp_status: this.getMCPStatus()
                };
                
            case '/ide/connect':
                return {
                    ...baseResponse,
                    message: 'IDE connection established',
                    capabilities: ['code-completion', 'debugging', 'mcp-tools', 'file-operations']
                };
                
            case '/ide/cursor':
                return {
                    ...baseResponse,
                    cursor_integration: true,
                    commands: ['/ide', '/help', '/status', '/mcp', '/connect'],
                    project_root: this.projectRoot,
                    integration_files: this.getIntegrationFiles()
                };
                
            case '/ide/mcp':
                return {
                    ...baseResponse,
                    mcp_servers: this.getMCPStatus(),
                    mcp_config: this.checkMCPConfig()
                };
                
            default:
                return {
                    ...baseResponse,
                    message: 'Claude Code IDE Server Active',
                    available_endpoints: ['/ide/status', '/ide/connect', '/ide/cursor', '/ide/mcp']
                };
        }
    }
    
    getMCPStatus() {
        try {
            if (fs.existsSync(path.join(this.projectRoot, '.mcp-status'))) {
                return JSON.parse(fs.readFileSync(path.join(this.projectRoot, '.mcp-status'), 'utf8'));
            }
        } catch (err) {
            console.warn('MCP status read error:', err.message);
        }
        return { status: 'unknown', servers: [] };
    }
    
    checkMCPConfig() {
        try {
            if (fs.existsSync(path.join(this.projectRoot, '.mcp.json'))) {
                const config = JSON.parse(fs.readFileSync(path.join(this.projectRoot, '.mcp.json'), 'utf8'));
                return {
                    valid: true,
                    servers: Object.keys(config.mcpServers || {}),
                    count: Object.keys(config.mcpServers || {}).length
                };
            }
        } catch (err) {
            return { valid: false, error: err.message };
        }
        return { valid: false, error: 'No .mcp.json found' };
    }
    
    getIntegrationFiles() {
        const files = ['.cursor-ide-active', '.vscode/settings.json', 'gqcars.code-workspace'];
        const existing = files.filter(file => 
            fs.existsSync(path.join(this.projectRoot, file))
        );
        return existing;
    }
    
    createStatusFiles() {
        const statusData = {
            server: 'Claude Code IDE',
            status: 'active',
            port: this.port,
            started: this.startTime.toISOString(),
            project: this.projectName,
            root: this.projectRoot,
            version: '2.0.0',
            features: ['cursor-integration', 'mcp-support']
        };
        
        // Create status files
        fs.writeFileSync(path.join(this.projectRoot, '.claude-ide-status'), 
                        JSON.stringify(statusData, null, 2));
        fs.writeFileSync(path.join(this.projectRoot, '.cursor-ide-active'), 
                        'ACTIVE\n' + new Date().toISOString());
    }
    
    setupErrorHandling() {
        this.server.on('error', (err) => {
            console.error('IDE Server error:', err);
        });
        
        process.on('SIGINT', () => {
            console.log('\n🛑 Claude Code IDE Server shutting down...');
            this.cleanup();
            process.exit(0);
        });
        
        process.on('uncaughtException', (err) => {
            console.error('Uncaught exception:', err);
            this.cleanup();
        });
    }
    
    cleanup() {
        const filesToClean = ['.claude-ide-status', '.cursor-ide-active'];
        filesToClean.forEach(file => {
            const filePath = path.join(this.projectRoot, file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }
}

// Start the server
new ClaudeCodeIDEServer(8080);