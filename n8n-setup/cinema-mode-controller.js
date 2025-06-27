// 🎬 VISUAL AUTOMATION CINEMA CONTROLLER
// Real-time visual feedback for AI automation

class AutomationCinema {
  constructor() {
    this.isRunning = false;
    this.currentWorkflow = null;
    this.visualElements = {};
    this.autoScrollers = {};
    
    this.initializeInterface();
    this.setupWebSocket();
  }

  /**
   * 🎥 Initialize Cinema Mode Interface
   */
  initializeInterface() {
    // Create floating control panel
    this.createControlPanel();
    
    // Setup auto-scrolling for various applications
    this.setupAutoScrollers();
    
    // Create live status overlay
    this.createStatusOverlay();
    
    // Setup window management
    this.setupWindowManager();
  }

  /**
   * 📱 Mobile Command Processor
   */
  async processMobileCommand(command) {
    console.log(`🎬 CINEMA MODE: Processing command: "${command}"`);
    
    // Parse command intent
    const intent = this.parseCommandIntent(command);
    
    // Show visual feedback
    this.showCommandProcessing(command);
    
    // Execute automation
    const result = await this.executeAutomation(intent);
    
    // Update visual displays
    this.updateCinemaDisplay(result);
    
    return result;
  }

  /**
   * 🎭 Command Intent Parser
   */
  parseCommandIntent(command) {
    const intents = {
      // Code generation
      code: /create|generate|build|write.*code|function|component/i,
      
      // Document creation  
      document: /create.*document|generate.*report|write.*doc/i,
      
      // Data manipulation
      data: /update.*sheet|create.*spreadsheet|sync.*data/i,
      
      // Git operations
      git: /commit|push|create.*repo|update.*github/i,
      
      // Research tasks
      research: /research|analyze|investigate|compare/i,
      
      // Invoice/business
      invoice: /invoice|bill|quote|proposal/i
    };
    
    for (const [type, regex] of Object.entries(intents)) {
      if (regex.test(command)) {
        return {
          type: type,
          command: command,
          timestamp: new Date().toISOString()
        };
      }
    }
    
    return { type: 'general', command: command, timestamp: new Date().toISOString() };
  }

  /**
   * ⚡ Execute Automation Workflow
   */
  async executeAutomation(intent) {
    const webhookUrl = 'http://localhost:5678/webhook/cinema-mode';
    
    try {
      // Start cinema mode
      this.startCinemaMode(intent);
      
      // Send to n8n
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: intent,
          cinemaMode: true,
          visualFeedback: true
        })
      });
      
      const result = await response.json();
      
      // Process visual updates
      this.processAutomationSteps(result);
      
      return result;
      
    } catch (error) {
      this.showError(`Automation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * 🎬 Start Cinema Mode
   */
  startCinemaMode(intent) {
    this.isRunning = true;
    
    // Arrange windows for optimal viewing
    this.arrangeWindows(intent.type);
    
    // Start progress tracking
    this.startProgressTracking();
    
    // Enable auto-scrolling
    this.enableAutoScrolling();
    
    // Show command banner
    this.showCommandBanner(intent.command);
  }

  /**
   * 🪟 Window Management for Cinema Mode
   */
  arrangeWindows(workflowType) {
    const arrangements = {
      code: {
        primary: 'cursor',      // Main code editor
        secondary: 'github',    // GitHub repository
        tertiary: 'n8n'        // Workflow monitor
      },
      document: {
        primary: 'googledocs',  // Document creation
        secondary: 'drive',     // File management  
        tertiary: 'n8n'        // Workflow monitor
      },
      data: {
        primary: 'googlesheets', // Spreadsheet
        secondary: 'airtable',   // Database
        tertiary: 'n8n'         // Workflow monitor
      }
    };
    
    const arrangement = arrangements[workflowType] || arrangements.code;
    
    // Use Windows PowerShell to arrange windows
    this.executeWindowArrangement(arrangement);
  }

  /**
   * 📜 Auto-Scrolling Controller
   */
  setupAutoScrollers() {
    // Cursor/VS Code auto-scroller
    this.autoScrollers.cursor = {
      element: null,
      speed: 50,
      direction: 'down',
      active: false
    };
    
    // Browser auto-scroller (for n8n, Google Sheets, etc.)
    this.autoScrollers.browser = {
      element: document.body,
      speed: 30,
      direction: 'down', 
      active: false
    };
    
    // Terminal auto-scroller
    this.autoScrollers.terminal = {
      element: null,
      speed: 40,
      direction: 'down',
      active: false
    };
  }

  /**
   * 🔄 Enable Auto-Scrolling
   */
  enableAutoScrolling() {
    Object.values(this.autoScrollers).forEach(scroller => {
      if (scroller.element) {
        scroller.active = true;
        this.startAutoScroll(scroller);
      }
    });
  }

  /**
   * 📊 Start Auto-Scroll Animation
   */
  startAutoScroll(scroller) {
    if (!scroller.active) return;
    
    const scroll = () => {
      if (!scroller.active) return;
      
      if (scroller.element) {
        scroller.element.scrollTop += scroller.speed;
        
        // Continue scrolling
        requestAnimationFrame(scroll);
      }
    };
    
    scroll();
  }

  /**
   * 🎯 Live Status Overlay
   */
  createStatusOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'cinema-status-overlay';
    overlay.innerHTML = `
      <div class="cinema-panel">
        <h3>🎬 AI AUTOMATION CINEMA</h3>
        <div class="status-section">
          <div class="current-command">Command: <span id="current-command">Ready</span></div>
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
          <div class="active-tools">
            <span class="tool" id="tool-n8n">n8n</span>
            <span class="tool" id="tool-claude">Claude</span>
            <span class="tool" id="tool-github">GitHub</span>
            <span class="tool" id="tool-sheets">Sheets</span>
          </div>
        </div>
        <div class="live-log">
          <div id="live-log-content"></div>
        </div>
      </div>
    `;
    
    // Styling
    overlay.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 400px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      border-radius: 10px;
      padding: 20px;
      z-index: 10000;
      font-family: 'Courier New', monospace;
      border: 2px solid #00ff41;
      box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    `;
    
    document.body.appendChild(overlay);
    this.visualElements.overlay = overlay;
  }

  /**
   * 📝 Update Live Log
   */
  updateLiveLog(message, type = 'info') {
    const logElement = document.getElementById('live-log-content');
    if (!logElement) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    logEntry.innerHTML = `<span class="timestamp">${timestamp}</span> ${message}`;
    
    logElement.appendChild(logEntry);
    logElement.scrollTop = logElement.scrollHeight;
    
    // Keep only last 10 entries
    while (logElement.children.length > 10) {
      logElement.removeChild(logElement.firstChild);
    }
  }

  /**
   * 🎮 WebSocket Connection for Real-time Updates
   */
  setupWebSocket() {
    // Connect to n8n WebSocket for live updates
    try {
      this.ws = new WebSocket('ws://localhost:5678/webhook/cinema-updates');
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleRealtimeUpdate(data);
      };
      
      this.ws.onerror = (error) => {
        console.log('WebSocket connection failed, using polling fallback');
        this.setupPollingFallback();
      };
      
    } catch (error) {
      console.log('WebSocket not available, using polling');
      this.setupPollingFallback();
    }
  }

  /**
   * 🔄 Handle Real-time Updates
   */
  handleRealtimeUpdate(data) {
    switch (data.type) {
      case 'workflow_started':
        this.updateLiveLog(`🚀 Started: ${data.workflow}`, 'success');
        this.updateProgress(10);
        break;
        
      case 'node_executing':
        this.updateLiveLog(`⚡ Executing: ${data.node}`, 'info');
        this.updateProgress(data.progress || 50);
        break;
        
      case 'file_created':
        this.updateLiveLog(`📁 Created: ${data.filename}`, 'success');
        this.triggerFileAnimation(data.filename);
        break;
        
      case 'github_commit':
        this.updateLiveLog(`📤 Committed: ${data.message}`, 'success');
        this.updateProgress(80);
        break;
        
      case 'workflow_complete':
        this.updateLiveLog(`✅ Complete: ${data.workflow}`, 'success');
        this.updateProgress(100);
        setTimeout(() => this.stopCinemaMode(), 2000);
        break;
        
      case 'error':
        this.updateLiveLog(`❌ Error: ${data.message}`, 'error');
        break;
    }
  }

  /**
   * 📊 Update Progress Bar
   */
  updateProgress(percentage) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
      progressFill.style.background = percentage === 100 ? '#00ff41' : '#0088ff';
    }
  }

  /**
   * 🎭 Show Command Banner
   */
  showCommandBanner(command) {
    const banner = document.createElement('div');
    banner.id = 'command-banner';
    banner.innerHTML = `
      <div class="banner-content">
        <h2>🎬 EXECUTING COMMAND</h2>
        <p>"${command}"</p>
        <div class="loading-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    `;
    
    banner.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.95);
      color: #00ff41;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      z-index: 9999;
      font-family: 'Courier New', monospace;
      border: 3px solid #00ff41;
      box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
      animation: fadeIn 0.5s ease-in;
    `;
    
    document.body.appendChild(banner);
    
    // Remove banner after 3 seconds
    setTimeout(() => {
      if (banner.parentNode) {
        banner.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => banner.remove(), 500);
      }
    }, 3000);
  }

  /**
   * 🛑 Stop Cinema Mode
   */
  stopCinemaMode() {
    this.isRunning = false;
    
    // Disable auto-scrolling
    Object.values(this.autoScrollers).forEach(scroller => {
      scroller.active = false;
    });
    
    // Show completion message
    this.updateLiveLog('🎬 Cinema mode complete!', 'success');
    
    // Reset progress
    setTimeout(() => this.updateProgress(0), 3000);
  }
}

// Initialize Cinema Mode
const cinema = new AutomationCinema();

// Expose global functions
window.processMobileCommand = (command) => cinema.processMobileCommand(command);
window.startCinemaMode = () => cinema.startCinemaMode();
window.stopCinemaMode = () => cinema.stopCinemaMode();

console.log('🎬 AI Automation Cinema is ready!');
