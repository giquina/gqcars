#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { EventEmitter } = require('events');

class ClaudeCodeIDEServer extends EventEmitter {
    constructor(port = 8080) {
        super();
        this.port = port;
        this.startTime = new Date();
        this.connections = 0;
        this.projectRoot = path.dirname(__dirname);
        this.server = null;
        this.requestLog = [];
        this.maxLogEntries = 1000;
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const query = parsedUrl.query;

        // Log the request
        this.logRequest(req);

        // Set CORS headers for all requests
        this.setCORSHeaders(res);

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        this.connections++;

        try {
            switch (pathname) {
                case '/':
                case '/status':
                    this.handleStatus(req, res, query);
                    break;
                case '/health':
                    this.handleHealth(req, res);
                    break;
                case '/project':
                    this.handleProjectInfo(req, res);
                    break;
                case '/files':
                    this.handleFilesList(req, res, query);
                    break;
                case '/file':
                    this.handleFileContent(req, res, query);
                    break;
                case '/mcp':
                    this.handleMCPStatus(req, res);
                    break;
                case '/logs':
                    this.handleLogs(req, res, query);
                    break;
                case '/system':
                    this.handleSystemInfo(req, res);
                    break;
                case '/api/restart':
                    this.handleRestart(req, res);
                    break;
                default:
                    this.handle404(req, res);
            }
        } catch (error) {
            this.handleError(req, res, error);
        }
    }

    logRequest(req) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            userAgent: req.headers['user-agent'] || 'Unknown',
            ip: req.connection.remoteAddress || 'Unknown'
        };

        this.requestLog.push(logEntry);
        
        // Keep only the last N entries
        if (this.requestLog.length > this.maxLogEntries) {
            this.requestLog.shift();
        }

        console.log(`${logEntry.timestamp} ${logEntry.method} ${logEntry.url}`);
    }

    setCORSHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    }

    handleStatus(req, res, query) {
        const uptime = Date.now() - this.startTime.getTime();
        const detailed = query.detailed === 'true';
        
        const status = {
            service: 'Claude Code IDE Server',
            status: 'running',
            port: this.port,
            uptime: Math.floor(uptime / 1000),
            connections: this.connections,
            project: {
                root: this.projectRoot,
                name: path.basename(this.projectRoot)
            },
            endpoints: [
                '/status - Server status (add ?detailed=true for more info)',
                '/health - Health check',
                '/project - Project information',
                '/files - Project files list (add ?filter=pattern)',
                '/file?path=... - Get file content',
                '/mcp - MCP servers status',
                '/logs - Server request logs',
                '/system - System information',
                '/api/restart - Restart server (POST)'
            ],
            timestamp: new Date().toISOString()
        };

        if (detailed) {
            status.detailed = {
                requestCount: this.requestLog.length,
                memoryUsage: process.memoryUsage(),
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch,
                pid: process.pid
            };
        }

        this.sendJSON(res, 200, status);
    }

    handleHealth(req, res) {
        const health = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: Math.floor((Date.now() - this.startTime.getTime()) / 1000),
            checks: {
                filesystem: this.checkFilesystem(),
                project: this.checkProject(),
                mcp: this.checkMCPConfig()
            }
        };

        const allHealthy = Object.values(health.checks).every(check => check.status === 'ok');
        const statusCode = allHealthy ? 200 : 503;

        this.sendJSON(res, statusCode, health);
    }

    checkFilesystem() {
        try {
            fs.accessSync(this.projectRoot, fs.constants.R_OK);
            return { status: 'ok', message: 'Project directory accessible' };
        } catch (error) {
            return { status: 'error', message: 'Project directory not accessible' };
        }
    }

    checkProject() {
        const packageJsonPath = path.join(this.projectRoot, 'package.json');
        try {
            if (fs.existsSync(packageJsonPath)) {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                return { status: 'ok', message: 'Valid package.json found', name: packageJson.name };
            } else {
                return { status: 'warning', message: 'No package.json found' };
            }
        } catch (error) {
            return { status: 'error', message: 'Invalid package.json' };
        }
    }

    checkMCPConfig() {
        const mcpConfigPath = path.join(this.projectRoot, '.mcp.json');
        try {
            if (fs.existsSync(mcpConfigPath)) {
                const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
                const serverCount = Object.keys(mcpConfig.mcpServers || {}).length;
                return { status: 'ok', message: `MCP config found with ${serverCount} servers` };
            } else {
                return { status: 'warning', message: 'No MCP config found' };
            }
        } catch (error) {
            return { status: 'error', message: 'Invalid MCP config' };
        }
    }

    handleProjectInfo(req, res) {
        const packageJsonPath = path.join(this.projectRoot, 'package.json');
        let projectInfo = {
            name: path.basename(this.projectRoot),
            root: this.projectRoot,
            hasPackageJson: fs.existsSync(packageJsonPath)
        };

        if (projectInfo.hasPackageJson) {
            try {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                projectInfo.version = packageJson.version;
                projectInfo.description = packageJson.description;
                projectInfo.scripts = Object.keys(packageJson.scripts || {});
                projectInfo.dependencies = Object.keys(packageJson.dependencies || {});
                projectInfo.devDependencies = Object.keys(packageJson.devDependencies || {});
            } catch (error) {
                projectInfo.packageJsonError = error.message;
            }
        }

        // Add git info if available
        const gitPath = path.join(this.projectRoot, '.git');
        projectInfo.hasGit = fs.existsSync(gitPath);

        // Add MCP info
        const mcpPath = path.join(this.projectRoot, '.mcp.json');
        projectInfo.hasMCP = fs.existsSync(mcpPath);
        if (projectInfo.hasMCP) {
            try {
                const mcpConfig = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
                projectInfo.mcpServers = Object.keys(mcpConfig.mcpServers || {});
            } catch (error) {
                projectInfo.mcpConfigError = error.message;
            }
        }

        this.sendJSON(res, 200, projectInfo);
    }

    handleFilesList(req, res, query) {
        try {
            const filter = query.filter || '';
            const includeContent = query.content === 'true';
            const maxDepth = parseInt(query.depth) || 10;
            
            const files = this.getProjectFiles(filter, includeContent, maxDepth);
            
            this.sendJSON(res, 200, { 
                files, 
                count: files.length,
                filter,
                includeContent,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            this.handleError(req, res, error);
        }
    }

    handleFileContent(req, res, query) {
        const filePath = query.path;
        if (!filePath) {
            this.sendJSON(res, 400, { error: 'Missing path parameter' });
            return;
        }

        try {
            const fullPath = path.resolve(this.projectRoot, filePath);
            
            // Security check - ensure path is within project
            if (!fullPath.startsWith(this.projectRoot)) {
                this.sendJSON(res, 403, { error: 'Access denied - path outside project' });
                return;
            }

            if (!fs.existsSync(fullPath)) {
                this.sendJSON(res, 404, { error: 'File not found' });
                return;
            }

            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                this.sendJSON(res, 400, { error: 'Path is a directory, not a file' });
                return;
            }

            const content = fs.readFileSync(fullPath, 'utf8');
            
            this.sendJSON(res, 200, {
                path: filePath,
                content,
                size: stats.size,
                modified: stats.mtime.toISOString(),
                encoding: 'utf8'
            });
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.sendJSON(res, 404, { error: 'File not found' });
            } else if (error.code === 'EACCES') {
                this.sendJSON(res, 403, { error: 'Permission denied' });
            } else {
                this.handleError(req, res, error);
            }
        }
    }

    handleMCPStatus(req, res) {
        try {
            const mcpConfigPath = path.join(this.projectRoot, '.mcp.json');
            
            if (!fs.existsSync(mcpConfigPath)) {
                this.sendJSON(res, 404, { error: 'MCP configuration not found' });
                return;
            }

            const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
            const servers = mcpConfig.mcpServers || {};
            
            const status = {
                configFound: true,
                serverCount: Object.keys(servers).length,
                servers: Object.keys(servers),
                timestamp: new Date().toISOString()
            };

            this.sendJSON(res, 200, status);
            
        } catch (error) {
            this.handleError(req, res, error);
        }
    }

    handleLogs(req, res, query) {
        const limit = parseInt(query.limit) || 100;
        const offset = parseInt(query.offset) || 0;
        
        const logs = this.requestLog
            .slice(-limit - offset, -offset || undefined)
            .reverse();

        this.sendJSON(res, 200, {
            logs,
            total: this.requestLog.length,
            limit,
            offset,
            timestamp: new Date().toISOString()
        });
    }

    handleSystemInfo(req, res) {
        const systemInfo = {
            server: {
                version: '1.0.0',
                uptime: Math.floor((Date.now() - this.startTime.getTime()) / 1000),
                port: this.port
            },
            node: {
                version: process.version,
                platform: process.platform,
                arch: process.arch,
                pid: process.pid
            },
            memory: process.memoryUsage(),
            environment: {
                nodeEnv: process.env.NODE_ENV || 'development',
                user: process.env.USER || process.env.USERNAME || 'unknown'
            },
            timestamp: new Date().toISOString()
        };

        this.sendJSON(res, 200, systemInfo);
    }

    handleRestart(req, res) {
        if (req.method !== 'POST') {
            this.sendJSON(res, 405, { error: 'Method not allowed' });
            return;
        }

        this.sendJSON(res, 200, { 
            message: 'Server restart initiated',
            timestamp: new Date().toISOString()
        });

        // Restart after sending response
        setTimeout(() => {
            console.log('🔄 Restarting server...');
            process.exit(0);
        }, 1000);
    }

    getProjectFiles(filter = '', includeContent = false, maxDepth = 10) {
        const files = [];
        const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'temp'];
        
        function scanDir(dir, relativePath = '', depth = 0) {
            if (depth > maxDepth) return;
            
            try {
                const items = fs.readdirSync(dir);
                
                for (const item of items) {
                    if (excludeDirs.includes(item)) continue;
                    
                    const fullPath = path.join(dir, item);
                    const relPath = path.join(relativePath, item);
                    
                    try {
                        const stat = fs.statSync(fullPath);
                        
                        if (stat.isDirectory()) {
                            scanDir(fullPath, relPath, depth + 1);
                        } else {
                            // Apply filter if specified
                            if (filter && !relPath.toLowerCase().includes(filter.toLowerCase())) {
                                continue;
                            }
                            
                            const fileInfo = {
                                path: relPath,
                                size: stat.size,
                                modified: stat.mtime.toISOString(),
                                type: path.extname(relPath).slice(1) || 'file'
                            };
                            
                            if (includeContent && stat.size < 100000) { // Only include content for small files
                                try {
                                    fileInfo.content = fs.readFileSync(fullPath, 'utf8');
                                } catch (error) {
                                    fileInfo.contentError = 'Could not read as text';
                                }
                            }
                            
                            files.push(fileInfo);
                        }
                    } catch (error) {
                        // Skip files we can't stat
                        continue;
                    }
                }
            } catch (error) {
                // Skip directories we can't read
                return;
            }
        }
        
        scanDir(this.projectRoot);
        return files.sort((a, b) => a.path.localeCompare(b.path));
    }

    sendJSON(res, statusCode, data) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data, null, 2));
    }

    handle404(req, res) {
        this.sendJSON(res, 404, { 
            error: 'Not Found', 
            path: req.url,
            availableEndpoints: [
                '/status',
                '/health', 
                '/project',
                '/files',
                '/file?path=...',
                '/mcp',
                '/logs',
                '/system'
            ]
        });
    }

    handleError(req, res, error) {
        console.error('Server error:', error);
        this.sendJSON(res, 500, { 
            error: 'Internal Server Error', 
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }

    start() {
        this.server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        this.server.listen(this.port, () => {
            console.log('🚀 Claude Code IDE Server Started');
            console.log('================================');
            console.log(`📡 Server: http://localhost:${this.port}`);
            console.log(`📁 Project: ${this.projectRoot}`);
            console.log(`🕐 Started: ${this.startTime.toISOString()}`);
            console.log('');
            console.log('Available endpoints:');
            console.log('  /status   - Server status');
            console.log('  /health   - Health check');
            console.log('  /project  - Project info');
            console.log('  /files    - File listing');
            console.log('  /mcp      - MCP status');
            console.log('');
            this.emit('started');
        });

        this.server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${this.port} is already in use`);
                console.log('Try using a different port or stop the existing server');
            } else {
                console.error('❌ Server error:', error.message);
            }
            this.emit('error', error);
        });

        this.server.on('close', () => {
            console.log('🛑 Claude Code IDE Server stopped');
            this.emit('stopped');
        });
    }

    stop() {
        if (this.server) {
            this.server.close(() => {
                console.log('🛑 Claude Code IDE Server stopped gracefully');
            });
        }
    }
}

// CLI Interface
if (require.main === module) {
    const port = parseInt(process.argv[2]) || 8080;
    const server = new ClaudeCodeIDEServer(port);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down server...');
        server.stop();
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        console.log('\n🛑 Shutting down server...');
        server.stop();
        process.exit(0);
    });
    
    server.start();
}

module.exports = ClaudeCodeIDEServer;