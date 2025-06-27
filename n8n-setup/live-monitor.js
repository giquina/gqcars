#!/usr/bin/env node

// Live Development Monitor
// Watches for file changes and triggers AI workflows

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');

class LiveDevelopmentMonitor {
  constructor() {
    this.n8nUrl = 'http://localhost:5678';
    this.watchedExtensions = ['.js', '.py', '.ts', '.json', '.md'];
    this.isMonitoring = false;
  }

  async start() {
    console.log('🔴 LIVE: Starting AI Development Monitor');
    console.log('👀 Watching for code changes...');
    console.log('🤖 Connected to n8n, Claude, ChatGPT, and Perplexity');
    console.log('=' * 50);
    
    this.isMonitoring = true;
    this.watchDirectory('./');
    this.startHeartbeat();
  }

  watchDirectory(directory) {
    fs.watch(directory, { recursive: true }, (eventType, filename) => {
      if (!filename || !this.isMonitoring) return;
      
      const ext = path.extname(filename);
      if (!this.watchedExtensions.includes(ext)) return;
      
      console.log(`📁 ${eventType.toUpperCase()}: ${filename}`);
      
      if (eventType === 'change') {
        this.onFileChange(filename);
      }
    });
  }

  async onFileChange(filename) {
    const timestamp = new Date().toISOString();
    console.log(`⚡ [${timestamp}] Processing change: ${filename}`);
    
    try {
      // Read the changed file
      const content = fs.readFileSync(filename, 'utf8');
      
      // Trigger AI analysis workflow in n8n
      await this.triggerWorkflow('ai-code-analysis', {
        filename: filename,
        content: content,
        timestamp: timestamp,
        changeType: 'file_modified'
      });
      
      console.log(`✅ AI analysis triggered for ${filename}`);
      
    } catch (error) {
      console.log(`❌ Error processing ${filename}: ${error.message}`);
    }
  }

  async triggerWorkflow(workflowName, data) {
    try {
      const webhookUrl = `${this.n8nUrl}/webhook/${workflowName}`;
      
      const response = await axios.post(webhookUrl, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      });
      
      return response.data;
      
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('⚠️  n8n not accessible. Make sure it\'s running on port 5678');
      } else {
        console.log(`⚠️  Webhook error: ${error.message}`);
      }
    }
  }

  startHeartbeat() {
    setInterval(() => {
      const now = new Date().toLocaleTimeString();
      console.log(`💓 [${now}] Monitor active - watching for changes...`);
    }, 30000); // Every 30 seconds
  }

  stop() {
    this.isMonitoring = false;
    console.log('🛑 Development monitor stopped');
  }
}

// Auto-start if run directly
if (require.main === module) {
  const monitor = new LiveDevelopmentMonitor();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down monitor...');
    monitor.stop();
    process.exit(0);
  });
  
  monitor.start().catch(console.error);
}

module.exports = LiveDevelopmentMonitor;
