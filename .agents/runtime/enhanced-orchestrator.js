const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class EnhancedAgentOrchestrator extends EventEmitter {
  constructor() {
    super();
    this.agents = new Map();
    this.taskQueue = [];
    this.activeJobs = new Map();
    this.taskHistory = [];
    this.learningData = new Map();
    
    this.configPath = path.join(__dirname, '../config/gqcars-master-config.json');
    this.logPath = path.join(__dirname, '../logs');
    this.dataPath = path.join(__dirname, '../data');
    
    this.init();
  }

  init() {
    console.log('🚗💨 Enhanced GQ Cars Agent Orchestrator Starting...');
    console.log('📊 Advanced Dashboard available at: http://localhost:3002');
    
    // Ensure directories exist
    [this.logPath, this.dataPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    this.loadAgentConfiguration();
    this.loadLearningData();
    this.startAdvancedTaskProcessor();
    this.startIntelligentMonitoring();
    this.setupAdvancedSignalHandlers();
    
    console.log(`✅ Enhanced Orchestrator initialized with ${this.agents.size} intelligent agents`);
    console.log('🧠 Machine learning and optimization enabled');
  }

  loadAgentConfiguration() {
    try {
      if (fs.existsSync(this.configPath)) {
        const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        
        if (config.agents) {
          Object.entries(config.agents).forEach(([name, agentConfig]) => {
            this.agents.set(name, {
              ...agentConfig,
              // Enhanced tracking
              lastActivity: new Date(),
              tasksCompleted: 0,
              averageTaskTime: 0,
              currentTask: null,
              // Learning capabilities
              expertiseLevel: 1.0,
              preferredTaskTypes: [],
              collaborationHistory: new Map(),
              performanceMetrics: {
                successRate: 1.0,
                efficiency: 1.0,
                qualityScore: 1.0
              },
              // Adaptive capabilities
              workloadCapacity: 1,
              currentWorkload: 0,
              adaptiveScheduling: true
            });
            console.log(`🤖 ${name}: Enhanced agent loaded (Level ${this.agents.get(name).expertiseLevel})`);
          });
        }
      } else {
        console.log('⚠️ No agent configuration found, creating enhanced defaults');
        this.createEnhancedDefaultAgents();
      }
    } catch (error) {
      console.error('❌ Failed to load agent configuration:', error.message);
      this.createEnhancedDefaultAgents();
    }
  }

  createEnhancedDefaultAgents() {
    const enhancedAgents = {
      'database-architect': {
        specialty: 'Advanced database schema design and optimization',
        priority: 'high',
        status: 'ready',
        capabilities: ['schema-design', 'migrations', 'optimization', 'performance-tuning'],
        expertiseAreas: ['PostgreSQL', 'Prisma', 'MongoDB', 'Redis'],
        learningRate: 0.1
      },
      'api-builder': {
        specialty: 'Intelligent REST API and microservices development',
        priority: 'high', 
        status: 'ready',
        capabilities: ['rest-api', 'graphql', 'authentication', 'middleware', 'security'],
        expertiseAreas: ['Express', 'FastAPI', 'JWT', 'OAuth', 'Rate-limiting'],
        learningRate: 0.1
      },
      'frontend-developer': {
        specialty: 'Advanced React and modern frontend development',
        priority: 'high',
        status: 'ready',
        capabilities: ['react', 'typescript', 'ui-components', 'state-management', 'testing'],
        expertiseAreas: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer-Motion'],
        learningRate: 0.1
      },
      'integration-specialist': {
        specialty: 'Third-party integrations and API orchestration',
        priority: 'medium',
        status: 'ready',
        capabilities: ['stripe', 'email', 'maps', 'webhooks', 'api-integration'],
        expertiseAreas: ['Stripe', 'SendGrid', 'Google-APIs', 'Webhook-Security'],
        learningRate: 0.1
      },
      'testing-agent': {
        specialty: 'Comprehensive testing and quality assurance',
        priority: 'medium',
        status: 'ready',
        capabilities: ['unit-tests', 'integration-tests', 'e2e-tests', 'performance-tests'],
        expertiseAreas: ['Jest', 'Playwright', 'Cypress', 'Load-Testing'],
        learningRate: 0.1
      },
      'documentation-writer': {
        specialty: 'Intelligent documentation and knowledge management',
        priority: 'low',
        status: 'ready',
        capabilities: ['api-docs', 'user-guides', 'tutorials', 'knowledge-base'],
        expertiseAreas: ['Markdown', 'OpenAPI', 'Docusaurus', 'Technical-Writing'],
        learningRate: 0.1
      }
    };

    Object.entries(enhancedAgents).forEach(([name, config]) => {
      this.agents.set(name, {
        ...config,
        lastActivity: new Date(),
        tasksCompleted: 0,
        averageTaskTime: 0,
        currentTask: null,
        expertiseLevel: 1.0,
        preferredTaskTypes: [],
        collaborationHistory: new Map(),
        performanceMetrics: {
          successRate: 1.0,
          efficiency: 1.0,
          qualityScore: 1.0
        },
        workloadCapacity: 1,
        currentWorkload: 0,
        adaptiveScheduling: true
      });
    });
  }

  loadLearningData() {
    const learningFile = path.join(this.dataPath, 'agent-learning.json');
    try {
      if (fs.existsSync(learningFile)) {
        const data = JSON.parse(fs.readFileSync(learningFile, 'utf8'));
        this.learningData = new Map(Object.entries(data));
        console.log('🧠 Learning data loaded - agents will adapt based on experience');
      }
    } catch (error) {
      console.log('🧠 Starting with fresh learning data');
    }
  }

  startAdvancedTaskProcessor() {
    // Intelligent task processing every 3 seconds
    setInterval(() => {
      this.processIntelligentTaskQueue();
    }, 3000);

    // Adaptive optimization every 30 seconds
    setInterval(() => {
      this.optimizeAgentPerformance();
    }, 30000);

    // Learning and adaptation every 5 minutes
    setInterval(() => {
      this.updateAgentLearning();
    }, 300000);
  }

  processIntelligentTaskQueue() {
    if (this.taskQueue.length === 0) {
      return;
    }

    // Intelligent agent selection based on:
    // 1. Expertise match
    // 2. Current workload
    // 3. Historical performance
    // 4. Learning data
    const availableAgents = this.getOptimalAgentAssignments();

    if (availableAgents.length === 0) {
      return;
    }

    // Process tasks with intelligent matching
    while (this.taskQueue.length > 0 && availableAgents.length > 0) {
      const task = this.taskQueue.shift();
      const bestAgent = this.findBestAgentForTask(task, availableAgents);
      
      if (bestAgent) {
        this.assignIntelligentTask(bestAgent.name, task);
        // Remove assigned agent from available list
        const index = availableAgents.findIndex(a => a.name === bestAgent.name);
        if (index > -1) availableAgents.splice(index, 1);
      }
    }
  }

  getOptimalAgentAssignments() {
    return Array.from(this.agents.entries())
      .filter(([name, agent]) => {
        // Agent must be ready and have capacity
        if (agent.status !== 'ready') return false;
        if (agent.currentWorkload >= agent.workloadCapacity) return false;
        return true;
      })
      .map(([name, agent]) => ({
        name,
        agent,
        // Calculate availability score
        availabilityScore: this.calculateAvailabilityScore(agent),
        // Calculate expertise score
        expertiseScore: agent.expertiseLevel * agent.performanceMetrics.efficiency
      }))
      .sort((a, b) => {
        // Sort by combined score
        const scoreA = a.availabilityScore * a.expertiseScore;
        const scoreB = b.availabilityScore * b.expertiseScore;
        return scoreB - scoreA;
      });
  }

  calculateAvailabilityScore(agent) {
    // Factor in workload, recent activity, and performance
    const workloadFactor = 1 - (agent.currentWorkload / agent.workloadCapacity);
    const activityFactor = Math.min(1, (Date.now() - agent.lastActivity) / 60000); // Prefer recently active
    const performanceFactor = agent.performanceMetrics.successRate;
    
    return (workloadFactor * 0.4) + (activityFactor * 0.2) + (performanceFactor * 0.4);
  }

  findBestAgentForTask(task, availableAgents) {
    let bestAgent = null;
    let bestScore = 0;

    for (const agentData of availableAgents) {
      const score = this.calculateTaskAgentCompatibility(task, agentData.agent);
      if (score > bestScore) {
        bestScore = score;
        bestAgent = agentData;
      }
    }

    return bestAgent;
  }

  calculateTaskAgentCompatibility(task, agent) {
    let score = 0;

    // Expertise matching
    if (agent.capabilities && task.requiredCapabilities) {
      const matchingCaps = task.requiredCapabilities.filter(cap => 
        agent.capabilities.includes(cap)
      );
      score += (matchingCaps.length / task.requiredCapabilities.length) * 0.4;
    }

    // Specialty matching (fuzzy string matching)
    if (task.description && agent.specialty) {
      const descWords = task.description.toLowerCase().split(' ');
      const specWords = agent.specialty.toLowerCase().split(' ');
      const matches = descWords.filter(word => 
        specWords.some(specWord => specWord.includes(word) || word.includes(specWord))
      );
      score += (matches.length / descWords.length) * 0.3;
    }

    // Performance history
    score += agent.performanceMetrics.successRate * 0.2;

    // Expertise level
    score += Math.min(agent.expertiseLevel / 10, 0.1);

    return score;
  }

  assignIntelligentTask(agentName, task) {
    const agent = this.agents.get(agentName);
    if (!agent) return;

    // Enhanced task assignment
    agent.status = 'working';
    agent.currentWorkload += 1;
    agent.currentTask = {
      ...task,
      startTime: new Date(),
      id: this.generateAdvancedTaskId(),
      estimatedDuration: this.estimateTaskDuration(task, agent),
      complexity: this.analyzeTaskComplexity(task)
    };
    agent.lastActivity = new Date();

    console.log(`🎯 ${agentName}: Intelligent assignment - ${task.description}`);
    console.log(`   Estimated duration: ${Math.round(agent.currentTask.estimatedDuration/1000)}s`);
    
    // Record assignment for learning
    this.recordTaskAssignment(agentName, task);
    
    // Simulate intelligent task execution
    this.executeIntelligentTask(agentName, agent.currentTask);
  }

  estimateTaskDuration(task, agent) {
    // Base estimation from agent's historical performance
    const baseTime = agent.averageTaskTime || 30000; // 30 seconds default
    
    // Adjust for task complexity
    const complexity = this.analyzeTaskComplexity(task);
    const complexityMultiplier = { low: 0.5, medium: 1, high: 2, expert: 3 };
    
    // Adjust for agent expertise
    const expertiseMultiplier = Math.max(0.3, 1 / agent.expertiseLevel);
    
    return baseTime * complexityMultiplier[complexity] * expertiseMultiplier;
  }

  analyzeTaskComplexity(task) {
    const description = task.description.toLowerCase();
    
    // Complex keywords
    const expertKeywords = ['architecture', 'optimization', 'security', 'scalability', 'performance'];
    const highKeywords = ['integration', 'authentication', 'migration', 'refactor'];
    const mediumKeywords = ['implement', 'create', 'build', 'develop'];
    const lowKeywords = ['fix', 'update', 'modify', 'adjust'];

    if (expertKeywords.some(keyword => description.includes(keyword))) return 'expert';
    if (highKeywords.some(keyword => description.includes(keyword))) return 'high';
    if (mediumKeywords.some(keyword => description.includes(keyword))) return 'medium';
    return 'low';
  }

  executeIntelligentTask(agentName, task) {
    const agent = this.agents.get(agentName);
    
    // Emit advanced task started event
    this.emit('intelligentTaskStarted', { agentName, task, estimatedCompletion: new Date(Date.now() + task.estimatedDuration) });

    // Simulate task execution with progress updates
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - task.startTime;
      const progress = Math.min(elapsed / task.estimatedDuration, 1);
      
      this.emit('taskProgress', { agentName, task, progress });
      
      if (progress >= 1) {
        clearInterval(progressInterval);
      }
    }, 5000);

    setTimeout(() => {
      clearInterval(progressInterval);
      this.completeIntelligentTask(agentName, task);
    }, task.estimatedDuration);
  }

  completeIntelligentTask(agentName, task) {
    const agent = this.agents.get(agentName);
    if (!agent || !agent.currentTask) return;

    const actualDuration = new Date() - task.startTime;
    const estimationAccuracy = Math.min(task.estimatedDuration / actualDuration, actualDuration / task.estimatedDuration);
    
    // Update agent statistics and learning
    agent.tasksCompleted++;
    agent.currentWorkload = Math.max(0, agent.currentWorkload - 1);
    agent.averageTaskTime = (agent.averageTaskTime * (agent.tasksCompleted - 1) + actualDuration) / agent.tasksCompleted;
    agent.status = 'ready';
    agent.currentTask = null;
    agent.lastActivity = new Date();

    // Update performance metrics
    this.updateAgentPerformanceMetrics(agent, task, actualDuration, estimationAccuracy);

    console.log(`✅ ${agentName}: Intelligent completion - ${task.description}`);
    console.log(`   Duration: ${Math.round(actualDuration/1000)}s (${Math.round(estimationAccuracy*100)}% estimation accuracy)`);
    
    // Advanced logging and learning
    this.logIntelligentTaskCompletion(agentName, task, actualDuration, estimationAccuracy);
    this.updateTaskLearning(agentName, task, actualDuration, estimationAccuracy);
    
    // Emit enhanced completion event
    this.emit('intelligentTaskCompleted', { 
      agentName, 
      task, 
      actualDuration, 
      estimationAccuracy,
      qualityScore: this.calculateTaskQuality(task, actualDuration)
    });
  }

  updateAgentPerformanceMetrics(agent, task, duration, accuracy) {
    const metrics = agent.performanceMetrics;
    
    // Update success rate (assume 95% success for simulation)
    const success = Math.random() > 0.05;
    metrics.successRate = (metrics.successRate * agent.tasksCompleted + (success ? 1 : 0)) / (agent.tasksCompleted + 1);
    
    // Update efficiency based on duration vs average
    const efficiency = agent.averageTaskTime > 0 ? Math.min(2, agent.averageTaskTime / duration) : 1;
    metrics.efficiency = (metrics.efficiency * 0.8) + (efficiency * 0.2);
    
    // Update quality score based on estimation accuracy
    metrics.qualityScore = (metrics.qualityScore * 0.8) + (accuracy * 0.2);
    
    // Increase expertise level based on performance
    if (metrics.successRate > 0.9 && metrics.efficiency > 1.2) {
      agent.expertiseLevel = Math.min(10, agent.expertiseLevel * 1.01);
    }
  }

  calculateTaskQuality(task, duration) {
    // Simulate quality calculation based on various factors
    const baseQuality = 0.8 + Math.random() * 0.2; // 80-100% quality
    
    // Bonus for completing under estimated time
    const timeBonus = task.estimatedDuration > duration ? 0.1 : 0;
    
    return Math.min(1, baseQuality + timeBonus);
  }

  generateAdvancedTaskId() {
    return 'etask_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
  }

  recordTaskAssignment(agentName, task) {
    if (!this.learningData.has(agentName)) {
      this.learningData.set(agentName, {
        taskTypes: new Map(),
        assignments: [],
        preferences: new Map()
      });
    }

    const agentData = this.learningData.get(agentName);
    agentData.assignments.push({
      taskId: task.id,
      description: task.description,
      timestamp: new Date(),
      complexity: task.complexity
    });

    // Keep only last 100 assignments for memory efficiency
    if (agentData.assignments.length > 100) {
      agentData.assignments = agentData.assignments.slice(-100);
    }
  }

  updateTaskLearning(agentName, task, duration, accuracy) {
    const agentData = this.learningData.get(agentName);
    if (!agentData) return;

    const taskType = this.categorizeTask(task);
    
    if (!agentData.taskTypes.has(taskType)) {
      agentData.taskTypes.set(taskType, {
        count: 0,
        averageDuration: 0,
        averageAccuracy: 0,
        successRate: 1
      });
    }

    const typeData = agentData.taskTypes.get(taskType);
    typeData.count++;
    typeData.averageDuration = (typeData.averageDuration * (typeData.count - 1) + duration) / typeData.count;
    typeData.averageAccuracy = (typeData.averageAccuracy * (typeData.count - 1) + accuracy) / typeData.count;

    // Update agent's preferred task types
    const agent = this.agents.get(agentName);
    if (accuracy > 0.8 && !agent.preferredTaskTypes.includes(taskType)) {
      agent.preferredTaskTypes.push(taskType);
    }
  }

  categorizeTask(task) {
    const description = task.description.toLowerCase();
    
    if (description.includes('database') || description.includes('schema')) return 'database';
    if (description.includes('api') || description.includes('endpoint')) return 'api';
    if (description.includes('frontend') || description.includes('component')) return 'frontend';
    if (description.includes('test') || description.includes('testing')) return 'testing';
    if (description.includes('integration')) return 'integration';
    if (description.includes('documentation') || description.includes('docs')) return 'documentation';
    
    return 'general';
  }

  optimizeAgentPerformance() {
    this.agents.forEach((agent, agentName) => {
      // Adjust workload capacity based on performance
      if (agent.performanceMetrics.efficiency > 1.5 && agent.performanceMetrics.successRate > 0.9) {
        agent.workloadCapacity = Math.min(3, agent.workloadCapacity * 1.1);
      } else if (agent.performanceMetrics.efficiency < 0.8 || agent.performanceMetrics.successRate < 0.7) {
        agent.workloadCapacity = Math.max(1, agent.workloadCapacity * 0.9);
      }
      
      // Log optimization adjustments
      if (Math.floor(Date.now() / 60000) % 10 === 0) { // Every 10 minutes
        console.log(`📈 ${agentName}: Optimized (Capacity: ${agent.workloadCapacity.toFixed(1)}, Expertise: ${agent.expertiseLevel.toFixed(1)})`);
      }
    });
  }

  updateAgentLearning() {
    // Save learning data
    const learningFile = path.join(this.dataPath, 'agent-learning.json');
    const dataToSave = Object.fromEntries(
      Array.from(this.learningData.entries()).map(([key, value]) => [
        key,
        {
          ...value,
          taskTypes: Object.fromEntries(value.taskTypes),
          preferences: Object.fromEntries(value.preferences)
        }
      ])
    );
    
    fs.writeFileSync(learningFile, JSON.stringify(dataToSave, null, 2));
    console.log('🧠 Agent learning data updated and saved');
  }

  startIntelligentMonitoring() {
    // Enhanced health monitoring every 30 seconds
    setInterval(() => {
      this.performIntelligentHealthCheck();
    }, 30000);

    // Advanced performance analysis every 5 minutes
    setInterval(() => {
      this.performAdvancedAnalysis();
    }, 300000);
  }

  performIntelligentHealthCheck() {
    const stats = this.getAdvancedSystemStats();
    
    // Intelligent alerting
    if (stats.averageEfficiency < 0.7) {
      console.log('⚠️ System efficiency below optimal - consider agent optimization');
    }
    
    if (stats.queueWaitTime > 60000) {
      console.log('⚠️ High queue wait time - consider adding more agents');
    }
    
    // Predictive maintenance
    this.predictSystemNeeds(stats);
  }

  getAdvancedSystemStats() {
    const agents = Array.from(this.agents.values());
    const totalAgents = agents.length;
    const workingAgents = agents.filter(a => a.status === 'working').length;
    const averageExpertise = agents.reduce((sum, a) => sum + a.expertiseLevel, 0) / totalAgents;
    const averageEfficiency = agents.reduce((sum, a) => sum + a.performanceMetrics.efficiency, 0) / totalAgents;
    const totalCapacity = agents.reduce((sum, a) => sum + a.workloadCapacity, 0);
    const currentWorkload = agents.reduce((sum, a) => sum + a.currentWorkload, 0);
    
    return {
      totalAgents,
      workingAgents,
      readyAgents: totalAgents - workingAgents,
      queueLength: this.taskQueue.length,
      averageExpertise,
      averageEfficiency,
      systemUtilization: currentWorkload / totalCapacity,
      queueWaitTime: this.calculateAverageQueueWaitTime(),
      totalTasksCompleted: agents.reduce((sum, a) => sum + a.tasksCompleted, 0)
    };
  }

  calculateAverageQueueWaitTime() {
    if (this.taskQueue.length === 0) return 0;
    
    const now = new Date();
    const totalWaitTime = this.taskQueue.reduce((sum, task) => {
      return sum + (now - (task.queuedAt || now));
    }, 0);
    
    return totalWaitTime / this.taskQueue.length;
  }

  predictSystemNeeds(stats) {
    // Simple predictive analysis
    if (stats.systemUtilization > 0.8 && stats.queueLength > 5) {
      console.log('🔮 Prediction: System may benefit from additional agents');
    }
    
    if (stats.averageEfficiency > 1.5 && stats.queueLength < 2) {
      console.log('🔮 Prediction: System has excess capacity - consider more complex tasks');
    }
  }

  performAdvancedAnalysis() {
    const analysis = this.generateSystemAnalysis();
    console.log('📊 Advanced Analysis:', analysis.summary);
    
    // Log detailed analysis
    const analysisFile = path.join(this.logPath, 'system-analysis.log');
    fs.appendFileSync(analysisFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      ...analysis
    }) + '\n');
  }

  generateSystemAnalysis() {
    const stats = this.getAdvancedSystemStats();
    const trends = this.analyzeTrends();
    
    return {
      performance: stats.averageEfficiency > 1.2 ? 'excellent' : stats.averageEfficiency > 0.8 ? 'good' : 'needs-improvement',
      utilization: stats.systemUtilization > 0.8 ? 'high' : stats.systemUtilization > 0.4 ? 'moderate' : 'low',
      expertise: stats.averageExpertise > 5 ? 'expert' : stats.averageExpertise > 2 ? 'experienced' : 'developing',
      trends,
      recommendations: this.generateRecommendations(stats),
      summary: `System performance: ${stats.averageEfficiency.toFixed(2)}x efficiency, ${Math.round(stats.systemUtilization * 100)}% utilization`
    };
  }

  analyzeTrends() {
    // Simple trend analysis (would be more sophisticated with more data)
    const recentTasks = this.taskHistory.slice(-50);
    if (recentTasks.length < 10) return 'insufficient-data';
    
    const recentAvgDuration = recentTasks.reduce((sum, t) => sum + t.duration, 0) / recentTasks.length;
    const olderTasks = this.taskHistory.slice(-100, -50);
    
    if (olderTasks.length === 0) return 'improving';
    
    const olderAvgDuration = olderTasks.reduce((sum, t) => sum + t.duration, 0) / olderTasks.length;
    
    return recentAvgDuration < olderAvgDuration ? 'improving' : 'stable';
  }

  generateRecommendations(stats) {
    const recommendations = [];
    
    if (stats.systemUtilization > 0.9) {
      recommendations.push('Consider adding more agents to handle workload');
    }
    
    if (stats.averageEfficiency < 0.8) {
      recommendations.push('Review task assignment algorithm for optimization');
    }
    
    if (stats.queueLength > 10) {
      recommendations.push('Implement task prioritization or load balancing');
    }
    
    return recommendations;
  }

  setupAdvancedSignalHandlers() {
    process.on('SIGINT', () => {
      console.log('\n🛑 Enhanced graceful shutdown initiated...');
      this.advancedShutdown();
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Enhanced termination signal received...');
      this.advancedShutdown();
    });
  }

  advancedShutdown() {
    console.log('💾 Saving enhanced state and learning data...');
    
    // Save comprehensive state
    const enhancedState = {
      agents: Object.fromEntries(this.agents),
      taskQueue: this.taskQueue,
      taskHistory: this.taskHistory.slice(-1000), // Keep last 1000 tasks
      systemStats: this.getAdvancedSystemStats(),
      timestamp: new Date().toISOString(),
      version: '2.0.0-enhanced'
    };
    
    const stateFile = path.join(this.logPath, 'enhanced-shutdown-state.json');
    fs.writeFileSync(stateFile, JSON.stringify(enhancedState, null, 2));
    
    // Save learning data
    this.updateAgentLearning();
    
    console.log('✅ Enhanced state saved. System optimized for next startup!');
    process.exit(0);
  }

  // Enhanced API methods for dashboard
  getEnhancedAgentStatus() {
    const result = {};
    this.agents.forEach((agent, name) => {
      result[name] = {
        ...agent,
        currentTask: agent.currentTask ? {
          description: agent.currentTask.description,
          startTime: agent.currentTask.startTime,
          estimatedDuration: agent.currentTask.estimatedDuration,
          actualDuration: Date.now() - agent.currentTask.startTime,
          progress: Math.min(1, (Date.now() - agent.currentTask.startTime) / agent.currentTask.estimatedDuration)
        } : null,
        learningStats: this.getAgentLearningStats(name)
      };
    });
    return result;
  }

  getAgentLearningStats(agentName) {
    const learningData = this.learningData.get(agentName);
    if (!learningData) return null;
    
    return {
      totalAssignments: learningData.assignments.length,
      preferredTasks: Object.fromEntries(learningData.taskTypes),
      recentPerformance: learningData.assignments.slice(-10).length
    };
  }

  getAdvancedQueueStatus() {
    return {
      pending: this.taskQueue.map(task => ({
        ...task,
        waitTime: Date.now() - (task.queuedAt || Date.now()),
        estimatedAssignment: this.estimateTaskAssignmentTime(task)
      })),
      stats: this.getAdvancedSystemStats(),
      analysis: this.generateSystemAnalysis()
    };
  }

  estimateTaskAssignmentTime(task) {
    const availableAgents = this.getOptimalAgentAssignments();
    if (availableAgents.length === 0) return 'unknown';
    
    const bestAgent = this.findBestAgentForTask(task, availableAgents);
    if (!bestAgent) return 'unknown';
    
    return this.estimateTaskDuration(task, bestAgent.agent);
  }

  // Enhanced task addition with intelligent queuing
  addIntelligentTask(task) {
    const enhancedTask = {
      ...task,
      id: this.generateAdvancedTaskId(),
      queuedAt: new Date(),
      priority: task.priority || 'medium',
      requiredCapabilities: task.requiredCapabilities || [],
      complexity: this.analyzeTaskComplexity(task),
      estimatedDuration: null // Will be calculated when assigned
    };

    // Intelligent queue placement based on priority and urgency
    const insertIndex = this.findOptimalQueuePosition(enhancedTask);
    this.taskQueue.splice(insertIndex, 0, enhancedTask);
    
    console.log(`📝 Intelligent task queued: ${task.description} (Position: ${insertIndex + 1}, Complexity: ${enhancedTask.complexity})`);
    
    return enhancedTask.id;
  }

  findOptimalQueuePosition(newTask) {
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    const newTaskPriority = priorityOrder[newTask.priority] || 2;
    
    // Find position based on priority and wait time
    for (let i = 0; i < this.taskQueue.length; i++) {
      const existingTask = this.taskQueue[i];
      const existingPriority = priorityOrder[existingTask.priority] || 2;
      
      // If new task has higher priority, insert here
      if (newTaskPriority > existingPriority) {
        return i;
      }
      
      // If same priority, consider wait time
      if (newTaskPriority === existingPriority) {
        const existingWaitTime = Date.now() - existingTask.queuedAt;
        if (existingWaitTime > 300000) { // 5 minutes
          continue; // Let older tasks go first
        }
      }
    }
    
    return this.taskQueue.length; // Add to end
  }
}

// Enhanced orchestrator instance
const enhancedOrchestrator = new EnhancedAgentOrchestrator();

// Demonstration of enhanced capabilities
setTimeout(() => {
  console.log('\n🎯 Demonstrating Enhanced Intelligence...');
  
  enhancedOrchestrator.addIntelligentTask({
    description: 'Implement advanced user authentication with JWT and refresh tokens',
    priority: 'high',
    requiredCapabilities: ['authentication', 'jwt', 'security'],
    complexity: 'high'
  });

  enhancedOrchestrator.addIntelligentTask({
    description: 'Create responsive dashboard with real-time updates',
    priority: 'medium',
    requiredCapabilities: ['react', 'typescript', 'real-time'],
    complexity: 'medium'
  });

  enhancedOrchestrator.addIntelligentTask({
    description: 'Optimize database queries for user search functionality',
    priority: 'high',
    requiredCapabilities: ['database', 'optimization', 'performance'],
    complexity: 'expert'
  });

  enhancedOrchestrator.addIntelligentTask({
    description: 'Write comprehensive API documentation',
    priority: 'low',
    requiredCapabilities: ['documentation', 'api-docs'],
    complexity: 'low'
  });
}, 3000);

module.exports = enhancedOrchestrator;