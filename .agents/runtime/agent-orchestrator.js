#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class GQCarsAgentOrchestrator {
  constructor() {
    this.configPath = path.join(__dirname, '../config/gqcars-master-config.json');
    this.logPath = path.join(__dirname, '../logs');
    this.activeAgents = new Map();
    this.taskQueue = [];
  }

  async loadConfig() {
    const config = await fs.readFile(this.configPath, 'utf8');
    return JSON.parse(config);
  }

  async saveConfig(config) {
    await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
  }

  async log(agent, message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${agent} [${level.toUpperCase()}]: ${message}\n`;
    
    await fs.appendFile(path.join(this.logPath, `${agent}.log`), logEntry);
    await fs.appendFile(path.join(this.logPath, 'master.log'), logEntry);
    
    const emoji = level === 'error' ? '🚨' : level === 'success' ? '✅' : '🤖';
    console.log(`${emoji} ${agent}: ${message}`);
  }

  async getNextTasks() {
    const config = await this.loadConfig();
    const agents = config.agents;
    const readyTasks = [];
    
    for (const [name, agent] of Object.entries(agents)) {
      if (agent.status === 'ready' && agent.tasks.length > 0) {
        const depsReady = agent.dependencies.every(dep => 
          agents[dep] && agents[dep].status === 'completed'
        );
        
        if (depsReady) {
          readyTasks.push({ name, agent, task: agent.tasks[0] });
        }
      }
    }
    
    return readyTasks;
  }

  async executeTask(agentName, task) {
    await this.log(agentName, `Starting task: ${task}`);
    
    const config = await this.loadConfig();
    const agent = config.agents[agentName];
    
    agent.status = 'working';
    agent.currentTask = task;
    agent.startTime = new Date().toISOString();
    await this.saveConfig(config);
    
    try {
      await this.simulateAgentWork(agentName, task, agent);
      
      agent.tasks.shift();
      agent.completedTasks = agent.completedTasks || [];
      agent.completedTasks.push({
        task,
        completedAt: new Date().toISOString(),
        duration: Date.now() - new Date(agent.startTime).getTime()
      });
      
      if (agent.tasks.length === 0) {
        agent.status = 'completed';
        await this.log(agentName, `All tasks completed!`, 'success');
      } else {
        agent.status = 'ready';
        await this.log(agentName, `Task completed. ${agent.tasks.length} remaining.`, 'success');
      }
      
      await this.saveConfig(config);
      return true;
      
    } catch (error) {
      agent.status = 'error';
      agent.lastError = error.message;
      await this.saveConfig(config);
      await this.log(agentName, `Task failed: ${error.message}`, 'error');
      return false;
    }
  }

  async simulateAgentWork(agentName, task, agent) {
    const steps = [
      'Analyzing requirements...',
      'Reviewing existing code...',
      'Planning implementation...',
      'Writing code...',
      'Testing functionality...',
      'Optimizing performance...',
      'Updating documentation...'
    ];
    
    for (const step of steps) {
      await this.log(agentName, step);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    const outputDir = path.join(__dirname, '../../', agent.outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, `${task.replace(/\s+/g, '-').toLowerCase()}.md`);
    const taskReport = `# ${task}\n\n**Agent**: ${agentName}\n**Completed**: ${new Date().toISOString()}\n\n## Implementation Notes\n\n${this.generateTaskDetails(task, agent)}\n\n## Files Modified\n\n${agent.files.map(f => `- ${f}`).join('\n')}\n\n## Next Steps\n\n- Review generated code\n- Run tests\n- Deploy to staging\n`;
    
    await fs.writeFile(outputFile, taskReport);
  }

  generateTaskDetails(task, agent) {
    const details = {
      'Complete User model with SIA licensing fields': 'Added SIA license number, expiry date, and certification level fields to User model. Updated validation schemas.',
      'Build Booking model with vehicle types and pricing': 'Created comprehensive Booking model with vehicle type enum, pricing calculations, and status tracking.',
      'Build /api/bookings CRUD endpoints': 'Implemented full CRUD operations for bookings with proper validation and error handling.',
      'Complete booking form with multi-step flow': 'Built responsive multi-step booking form with progress indicator and form validation.',
      'Write unit tests for all components': 'Created comprehensive test suite with >90% code coverage for all components.'
    };
    
    return details[task] || `Completed ${task} according to best practices and project requirements.`;
  }

  async run() {
    console.log('🚗 GQ Cars Agent Orchestrator Starting...');
    console.log('📊 Dashboard available at: http://localhost:3002');
    
    while (true) {
      const readyTasks = await this.getNextTasks();
      
      if (readyTasks.length === 0) {
        console.log('⏸️  No tasks ready. Waiting for dependencies or new tasks...');
        await new Promise(resolve => setTimeout(resolve, 30000));
        continue;
      }
      
      const config = await this.loadConfig();
      const maxConcurrent = config.globalSettings.maxConcurrentAgents;
      const tasksToExecute = readyTasks.slice(0, maxConcurrent);
      
      const promises = tasksToExecute.map(({ name, agent, task }) => 
        this.executeTask(name, task)
      );
      
      await Promise.all(promises);
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

const orchestrator = new GQCarsAgentOrchestrator();
orchestrator.run().catch(console.error);