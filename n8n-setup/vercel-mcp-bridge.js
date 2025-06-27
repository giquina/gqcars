const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

class VercelMCPBridge {
  constructor() {
    this.server = new Server(
      {
        name: 'vercel-deployment',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.vercelToken = process.env.VERCEL_TOKEN;
    this.apiBase = 'https://api.vercel.com';
    
    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'deploy_to_vercel',
          description: 'Deploy code project directly to Vercel from Claude prompts',
          inputSchema: {
            type: 'object',
            properties: {
              project_path: { type: 'string', description: 'Path to project directory' },
              project_name: { type: 'string', description: 'Vercel project name' },
              environment: { type: 'string', enum: ['development', 'preview', 'production'], description: 'Deployment environment' },
              build_command: { type: 'string', description: 'Custom build command' },
              env_vars: { type: 'object', description: 'Environment variables' }
            },
            required: ['project_path', 'project_name']
          }
        },
        {
          name: 'create_vercel_project',
          description: 'Create new Vercel project from Claude-generated code',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Project name' },
              framework: { type: 'string', description: 'Framework (nextjs, react, vue, etc.)' },
              github_repo: { type: 'string', description: 'GitHub repository URL' },
              auto_deploy: { type: 'boolean', description: 'Enable automatic deployments' }
            },
            required: ['name']
          }
        },
        {
          name: 'create_and_deploy_app',
          description: 'Complete pipeline: create app from Claude code and deploy to Vercel',
          inputSchema: {
            type: 'object',
            properties: {
              app_name: { type: 'string', description: 'Application name' },
              app_type: { type: 'string', description: 'Type of app (react, nextjs, vue, static)' },
              features: { type: 'array', items: { type: 'string' }, description: 'Features to include' },
              custom_code: { type: 'string', description: 'Custom code to include' }
            },
            required: ['app_name', 'app_type']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'deploy_to_vercel':
            return await this.deployToVercel(args);
          case 'create_vercel_project':
            return await this.createVercelProject(args);
          case 'create_and_deploy_app':
            return await this.createAndDeployApp(args);
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

  async deployToVercel(args) {
    const { project_path, project_name, environment = 'production' } = args;
    
    if (!this.vercelToken) {
      throw new Error('Vercel token not configured');
    }

    return new Promise((resolve, reject) => {
      const deployCmd = `cd "${project_path}" && npx vercel --token ${this.vercelToken} --yes ${environment === 'production' ? '--prod' : ''}`;
      
      exec(deployCmd, (error, stdout, stderr) => {
        if (error) {
          resolve({
            content: [{ type: 'text', text: `❌ Deployment failed: ${error.message}` }],
            isError: true
          });
        } else {
          const deployUrl = this.extractDeploymentUrl(stdout);
          resolve({
            content: [{
              type: 'text',
              text: `✅ Deployed to Vercel successfully!\\n🚀 Project: ${project_name}\\n🌐 URL: ${deployUrl}\\n📊 Environment: ${environment}`
            }]
          });
        }
      });
    });
  }

  async createAndDeployApp(args) {
    const { app_name, app_type, features = [], custom_code } = args;
    
    const projectPath = path.join(process.cwd(), 'vercel-projects', app_name);
    await fs.mkdir(projectPath, { recursive: true });
    
    await this.generateApp(projectPath, app_name, app_type, features, custom_code);
    
    const deployment = await this.deployToVercel({
      project_path: projectPath,
      project_name: app_name,
      environment: 'production'
    });
    
    return {
      content: [{
        type: 'text',
        text: `🎉 Complete App Creation & Deployment\\n📱 App: ${app_name}\\n🛠️ Type: ${app_type}\\n📁 Local: ${projectPath}\\n${deployment.content[0].text}`
      }]
    };
  }

  async generateApp(projectPath, appName, appType, features, customCode) {
    const templates = {
      react: {
        'package.json': JSON.stringify({
          name: appName,
          version: '1.0.0',
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test'
          },
          dependencies: {
            react: '^18.0.0',
            'react-dom': '^18.0.0',
            'react-scripts': '^5.0.0'
          }
        }, null, 2),
        'public/index.html': `<!DOCTYPE html><html><head><title>${appName}</title></head><body><div id="root"></div></body></html>`,
        'src/App.js': customCode || `import React from 'react';\\nfunction App() {\\n  return <div><h1>${appName}</h1><p>Generated by Claude MCP</p></div>;\\n}\\nexport default App;`,
        'src/index.js': `import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App';\\nconst root = ReactDOM.createRoot(document.getElementById('root'));\\nroot.render(<App />);`
      },
      nextjs: {
        'package.json': JSON.stringify({
          name: appName,
          version: '1.0.0',
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start'
          },
          dependencies: {
            next: '^13.0.0',
            react: '^18.0.0',
            'react-dom': '^18.0.0'
          }
        }, null, 2),
        'pages/index.js': customCode || `export default function Home() {\\n  return <div><h1>${appName}</h1><p>Generated by Claude MCP</p></div>;\\n}`,
        'next.config.js': `module.exports = { reactStrictMode: true };`
      },
      static: {
        'index.html': customCode || `<!DOCTYPE html><html><head><title>${appName}</title></head><body><h1>${appName}</h1><p>Generated by Claude MCP</p></body></html>`,
        'package.json': JSON.stringify({ name: appName, version: '1.0.0' }, null, 2)
      }
    };

    const template = templates[appType] || templates.static;
    
    for (const [filePath, content] of Object.entries(template)) {
      const fullPath = path.join(projectPath, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content);
    }
  }

  extractDeploymentUrl(stdout) {
    const urlMatch = stdout.match(/https:\\/\\/[\\w\\-\\.]+\\.vercel\\.app/);
    return urlMatch ? urlMatch[0] : 'Deployment URL not found';
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Vercel MCP Bridge started');
  }
}

const bridge = new VercelMCPBridge();
bridge.start().catch(console.error);