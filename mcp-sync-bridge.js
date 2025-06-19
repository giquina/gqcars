#!/usr/bin/env node

/**
 * GQ CARS - CLAUDE DESKTOP ↔ CURSOR SYNC BRIDGE
 * Enables real-time communication between Claude Desktop and Cursor Claude
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn, exec } = require('child_process');
const chokidar = require('chokidar');

class GQCarsMCPSync {
  constructor() {
    this.projectPath = 'C:\\Users\\Student\\Desktop\\gqcars';
    this.mcpConfig = null;
    this.isRunning = false;
    this.changeLog = [];
  }

  async initialize() {
    console.log('🚀 Initializing GQ Cars MCP Sync Bridge...');
    
    try {
      // Load MCP configuration
      const mcpPath = path.join(this.projectPath, '.mcp.json');
      const mcpData = await fs.readFile(mcpPath, 'utf8');
      this.mcpConfig = JSON.parse(mcpData);
      
      console.log('✅ MCP Configuration loaded');
      console.log(`📁 Project: ${this.mcpConfig.name}`);
      console.log(`🎨 Brand Color: ${this.mcpConfig.claude_context.primary_brand_color}`);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to load MCP config:', error.message);
      return false;
    }
  }

  async startFileWatcher() {
    console.log('👀 Starting file watcher...');
    
    const watchPaths = this.mcpConfig.mcp.watch_patterns.map(pattern => 
      path.join(this.projectPath, pattern)
    );
    
    const watcher = chokidar.watch(watchPaths, {
      ignored: /node_modules|\.git|\.next/,
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('change', (filePath) => this.handleFileChange(filePath, 'modified'));
    watcher.on('add', (filePath) => this.handleFileChange(filePath, 'added'));
    watcher.on('unlink', (filePath) => this.handleFileChange(filePath, 'deleted'));
    
    console.log('✅ File watcher active');
  }

  async handleFileChange(filePath, action) {
    const relativePath = path.relative(this.projectPath, filePath);
    const timestamp = new Date().toISOString();
    
    const change = {
      file: relativePath,
      action: action,
      timestamp: timestamp,
      project: 'gq-cars-ltd'
    };
    
    this.changeLog.push(change);
    
    console.log(`📝 [${action.toUpperCase()}] ${relativePath}`);
    
    // Write change log for Cursor Claude to read
    await this.updateChangeLog();
    
    // Notify other MCP clients
    await this.broadcastChange(change);
  }

  async updateChangeLog() {
    const changeLogPath = path.join(this.projectPath, '.mcp-changes.json');
    
    const changeLogData = {
      project: this.mcpConfig.name,
      last_updated: new Date().toISOString(),
      total_changes: this.changeLog.length,
      recent_changes: this.changeLog.slice(-10), // Keep last 10 changes
      sync_status: 'active',
      claude_desktop_active: true
    };
    
    await fs.writeFile(changeLogPath, JSON.stringify(changeLogData, null, 2));
  }

  async broadcastChange(change) {
    // Send to Cursor MCP bridge if running
    try {
      const response = await fetch('http://localhost:3001/desktop-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'claude-desktop',
          change: change,
          project: this.mcpConfig.name
        })
      });
      
      if (response.ok) {
        console.log('📡 Change broadcasted to Cursor');
      }
    } catch (error) {
      // Cursor bridge not running, store for later sync
      console.log('📝 Cursor bridge offline, change logged');
    }
  }

  async generateSyncReport() {
    const report = {
      project: this.mcpConfig.name,
      sync_bridge_status: 'running',
      last_sync: new Date().toISOString(),
      files_watched: this.mcpConfig.mcp.watch_patterns.length,
      total_changes: this.changeLog.length,
      recent_activity: this.changeLog.slice(-5),
      cursor_sync_enabled: true,
      desktop_claude_version: 'claude-desktop-mcp-bridge-1.0'
    };
    
    const reportPath = path.join(this.projectPath, '.mcp-sync-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  async start() {
    if (this.isRunning) {
      console.log('⚠️ MCP Sync already running');
      return;
    }

    const initialized = await this.initialize();
    if (!initialized) {
      console.log('❌ Failed to initialize MCP sync');
      return;
    }

    this.isRunning = true;
    
    await this.startFileWatcher();
    await this.generateSyncReport();
    
    console.log('');
    console.log('🎉 GQ CARS MCP SYNC BRIDGE ACTIVE!');
    console.log('');
    console.log('📊 CAPABILITIES:');
    console.log('   ✅ File change detection');
    console.log('   ✅ Cursor Claude synchronization');  
    console.log('   ✅ Change logging');
    console.log('   ✅ Cross-platform communication');
    console.log('');
    console.log('🔄 Now all changes will sync between:');
    console.log('   • Claude Desktop (me)');
    console.log('   • Cursor Claude');
    console.log('   • Project files');
    console.log('');
    console.log('Press Ctrl+C to stop...');
    
    // Keep process alive
    setInterval(async () => {
      await this.generateSyncReport();
    }, 30000); // Update report every 30 seconds
  }
}

// Start the sync bridge
const syncBridge = new GQCarsMCPSync();
syncBridge.start().catch(console.error);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\\n🛑 Shutting down GQ Cars MCP Sync Bridge...');
  process.exit(0);
});
