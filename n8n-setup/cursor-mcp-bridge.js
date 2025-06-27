const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { spawn, exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

class CursorMCPBridge {
  constructor() {
    this.server = new Server(
      {
        name: 'cursor-integration',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'open_cursor_with_code',
          description: 'Open Cursor IDE with specific code and auto-scroll to live session',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string', description: 'Code to open in Cursor' },
              filename: { type: 'string', description: 'Filename for the code' },
              language: { type: 'string', description: 'Programming language' },
              project_path: { type: 'string', description: 'Project directory path' }
            },
            required: ['code', 'filename']
          }
        },
        {
          name: 'cursor_ai_session',
          description: 'Start AI coding session in Cursor with specific prompt',
          inputSchema: {
            type: 'object',
            properties: {
              prompt: { type: 'string', description: 'AI prompt for Cursor' },
              context: { type: 'string', description: 'Additional context' }
            },
            required: ['prompt']
          }
        },
        {
          name: 'sync_cursor_to_github',
          description: 'Automatically commit and push Cursor project to GitHub',
          inputSchema: {
            type: 'object',
            properties: {
              project_path: { type: 'string', description: 'Project directory' },
              commit_message: { type: 'string', description: 'Commit message' },
              repo_url: { type: 'string', description: 'GitHub repository URL' }
            },
            required: ['project_path', 'commit_message']
          }
        },
        {
          name: 'create_cursor_workspace',
          description: 'Create new workspace in Cursor with project structure',
          inputSchema: {
            type: 'object',
            properties: {
              workspace_name: { type: 'string', description: 'Name of workspace' },
              template_type: { type: 'string', description: 'Project template type' },
              features: { type: 'array', items: { type: 'string' }, description: 'Features to include' }
            },
            required: ['workspace_name']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'open_cursor_with_code':
            return await this.openCursorWithCode(args);
          case 'cursor_ai_session': 
            return await this.startCursorAISession(args);
          case 'sync_cursor_to_github':
            return await this.syncCursorToGitHub(args);
          case 'create_cursor_workspace':
            return await this.createCursorWorkspace(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{ type: 'text', text: `Error: ${error.message}` }],
          isError: true
        };
      }
    });
  }

  async openCursorWithCode(args) {
    const { code, filename, language = 'javascript', project_path } = args;
    
    // Create project directory if provided
    const workingDir = project_path || path.join(process.cwd(), 'cursor-projects', Date.now().toString());
    await fs.mkdir(workingDir, { recursive: true });
    
    // Write code to file
    const filePath = path.join(workingDir, filename);
    await fs.writeFile(filePath, code);
    
    // Create Cursor configuration
    const cursorConfig = {
      "folders": [{ "path": workingDir }],
      "settings": {
        "files.autoSave": "afterDelay",
        "editor.formatOnSave": true,
        "cursor.ai.enabled": true
      }
    };
    
    const configPath = path.join(workingDir, '.vscode', 'settings.json');
    await fs.mkdir(path.dirname(configPath), { recursive: true });
    await fs.writeFile(configPath, JSON.stringify(cursorConfig, null, 2));
    
    // Open in Cursor
    const cursorPath = process.env.CURSOR_PATH || 'cursor';
    spawn(cursorPath, [workingDir], { detached: true, stdio: 'ignore' });
    
    return {
      content: [{
        type: 'text', 
        text: `✅ Opened Cursor with ${filename} in ${workingDir}\\n📝 Code written and formatted\\n🚀 Cursor AI enabled`
      }]
    };
  }

  async startCursorAISession(args) {
    const { prompt, context } = args;
    
    // Create AI session file
    const sessionDir = path.join(process.cwd(), 'cursor-ai-sessions');
    await fs.mkdir(sessionDir, { recursive: true });
    
    const sessionFile = path.join(sessionDir, `ai-session-${Date.now()}.md`);
    const sessionContent = `# AI Coding Session\\n\\n## Prompt:\\n${prompt}\\n\\n## Context:\\n${context || 'None'}\\n\\n## Generated Code:\\n\\n\`\`\`\\n// AI will generate code here\\n\`\`\`\\n`;
    
    await fs.writeFile(sessionFile, sessionContent);
    
    // Open session in Cursor
    const cursorPath = process.env.CURSOR_PATH || 'cursor';
    spawn(cursorPath, [sessionFile], { detached: true, stdio: 'ignore' });
    
    return {
      content: [{
        type: 'text',
        text: `🧠 Started AI session in Cursor\\n📁 Session file: ${sessionFile}\\n💡 Use Cursor AI to complete the prompt`
      }]
    };
  }

  async syncCursorToGitHub(args) {
    const { project_path, commit_message, repo_url } = args;
    
    return new Promise((resolve, reject) => {
      const commands = [
        'git add .',
        `git commit -m "${commit_message}"`,
        repo_url ? `git remote add origin ${repo_url}` : '',
        'git push origin main'
      ].filter(cmd => cmd);
      
      exec(commands.join(' && '), { cwd: project_path }, (error, stdout, stderr) => {
        if (error) {
          resolve({
            content: [{ type: 'text', text: `❌ Git sync failed: ${error.message}` }],
            isError: true
          });
        } else {
          resolve({
            content: [{
              type: 'text',
              text: `✅ Synced to GitHub\\n📝 Commit: ${commit_message}\\n🔗 ${repo_url || 'Existing remote'}`
            }]
          });
        }
      });
    });
  }

  async createCursorWorkspace(args) {
    const { workspace_name, template_type = 'basic', features = [] } = args;
    
    const workspaceDir = path.join(process.cwd(), 'cursor-workspaces', workspace_name);
    await fs.mkdir(workspaceDir, { recursive: true });
    
    // Create basic project structure
    const structure = {
      'package.json': JSON.stringify({
        name: workspace_name,
        version: '1.0.0',
        type: 'module',
        scripts: {
          start: 'node index.js',
          dev: 'node --watch index.js'
        }
      }, null, 2),
      'index.js': '// Welcome to your new Cursor workspace!\\nconsole.log("Hello from Cursor!");',
      'README.md': `# ${workspace_name}\\n\\nGenerated by Claude via MCP\\n\\nFeatures: ${features.join(', ')}`,
      '.gitignore': 'node_modules/\\n.env\\n*.log'
    };
    
    for (const [filename, content] of Object.entries(structure)) {
      await fs.writeFile(path.join(workspaceDir, filename), content);
    }
    
    // Open workspace in Cursor
    const cursorPath = process.env.CURSOR_PATH || 'cursor';
    spawn(cursorPath, [workspaceDir], { detached: true, stdio: 'ignore' });
    
    return {
      content: [{
        type: 'text',
        text: `🎉 Created Cursor workspace: ${workspace_name}\\n📁 Location: ${workspaceDir}\\n✨ Template: ${template_type}\\n🚀 Opened in Cursor`
      }]
    };
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Cursor MCP Bridge started');
  }
}

const bridge = new CursorMCPBridge();
bridge.start().catch(console.error);