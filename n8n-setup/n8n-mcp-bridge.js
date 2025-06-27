const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const axios = require('axios');

class N8nMCPBridge {
  constructor() {
    this.server = new Server(
      {
        name: 'n8n-webhook',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.n8nApiKey = process.env.N8N_API_KEY;
    this.n8nBaseUrl = process.env.N8N_BASE_URL || 'http://localhost:5678';
    
    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'trigger_n8n_workflow',
          description: 'Trigger n8n workflow from Claude prompts',
          inputSchema: {
            type: 'object',
            properties: {
              workflow_id: { type: 'string', description: 'n8n workflow ID' },
              input_data: { type: 'object', description: 'Data to pass to workflow' },
              wait_for_completion: { type: 'boolean', description: 'Wait for workflow to complete', default: true }
            },
            required: ['workflow_id']
          }
        },
        {
          name: 'create_claude_workflow',
          description: 'Create new n8n workflow controlled by Claude',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Workflow name' },
              description: { type: 'string', description: 'Workflow description' },
              trigger_type: { type: 'string', description: 'How workflow is triggered' },
              actions: { type: 'array', items: { type: 'object' }, description: 'Workflow actions' }
            },
            required: ['name', 'actions']
          }
        },
        {
          name: 'execute_multi_ai_workflow',
          description: 'Execute workflow that uses Claude + ChatGPT + other AIs',
          inputSchema: {
            type: 'object',
            properties: {
              task: { type: 'string', description: 'Task description' },
              ai_models: { type: 'array', items: { type: 'string' }, description: 'AI models to use' },
              comparison_mode: { type: 'boolean', description: 'Compare outputs from different AIs' }
            },
            required: ['task']
          }
        },
        {
          name: 'sync_with_external_services',
          description: 'Sync Claude output with external services via n8n',
          inputSchema: {
            type: 'object',
            properties: {
              services: { type: 'array', items: { type: 'string' }, description: 'Services to sync with' },
              data: { type: 'object', description: 'Data to sync' },
              sync_type: { type: 'string', description: 'Type of sync operation' }
            },
            required: ['services', 'data']
          }
        },
        {
          name: 'get_workflow_status',
          description: 'Get status of running n8n workflows',
          inputSchema: {
            type: 'object',
            properties: {
              workflow_id: { type: 'string', description: 'Workflow ID (optional)' },
              execution_id: { type: 'string', description: 'Specific execution ID (optional)' }
            }
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'trigger_n8n_workflow':
            return await this.triggerWorkflow(args);
          case 'create_claude_workflow':
            return await this.createClaudeWorkflow(args);
          case 'execute_multi_ai_workflow':
            return await this.executeMultiAIWorkflow(args);
          case 'sync_with_external_services':
            return await this.syncWithExternalServices(args);
          case 'get_workflow_status':
            return await this.getWorkflowStatus(args);
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

  async triggerWorkflow(args) {
    const { workflow_id, input_data = {}, wait_for_completion = true } = args;
    
    try {
      const response = await axios.post(
        `${this.n8nBaseUrl}/api/v1/workflows/${workflow_id}/execute`,
        input_data,
        {
          headers: this.getHeaders()
        }
      );

      const executionId = response.data.data?.executionId;

      if (wait_for_completion && executionId) {
        // Poll for completion
        const result = await this.waitForExecution(executionId);
        return {
          content: [{
            type: 'text',
            text: `✅ Workflow executed successfully\\n🆔 Workflow ID: ${workflow_id}\\n⚡ Execution ID: ${executionId}\\n📊 Status: ${result.status}\\n📋 Result: ${JSON.stringify(result.data, null, 2)}`
          }]
        };
      } else {
        return {
          content: [{
            type: 'text',
            text: `🚀 Workflow triggered\\n🆔 Workflow ID: ${workflow_id}\\n⚡ Execution ID: ${executionId || 'N/A'}\\n📝 Running asynchronously`
          }]
        };
      }
    } catch (error) {
      throw new Error(`Failed to trigger workflow: ${error.response?.data?.message || error.message}`);
    }
  }

  async createClaudeWorkflow(args) {
    const { name, description, trigger_type = 'webhook', actions } = args;
    
    // Create basic workflow structure
    const workflowData = {
      name: name,
      active: true,
      nodes: [
        {
          parameters: {},
          name: 'Webhook',
          type: 'n8n-nodes-base.webhook',
          typeVersion: 1,
          position: [250, 300],
          webhookId: 'claude-' + Date.now()
        },
        ...this.convertActionsToNodes(actions)
      ],
      connections: this.generateConnections(actions.length + 1),
      settings: {},
      staticData: {},
      meta: {
        description: description || `Claude-generated workflow: ${name}`
      }
    };

    try {
      const response = await axios.post(
        `${this.n8nBaseUrl}/api/v1/workflows`,
        workflowData,
        {
          headers: this.getHeaders()
        }
      );

      const workflow = response.data.data;
      
      return {
        content: [{
          type: 'text',
          text: `✅ Created Claude workflow\\n📝 Name: ${name}\\n🆔 ID: ${workflow.id}\\n🔗 Webhook URL: ${this.n8nBaseUrl}/webhook/${workflowData.nodes[0].webhookId}\\n⚙️ Actions: ${actions.length}`
        }]
      };
    } catch (error) {
      throw new Error(`Failed to create workflow: ${error.response?.data?.message || error.message}`);
    }
  }

  async executeMultiAIWorkflow(args) {
    const { task, ai_models = ['claude', 'chatgpt'], comparison_mode = false } = args;
    
    // This triggers a pre-built multi-AI workflow
    const workflowData = {
      task: task,
      ai_models: ai_models,
      comparison_mode: comparison_mode,
      triggered_by: 'claude-mcp',
      timestamp: new Date().toISOString()
    };

    // Trigger the multi-AI comparison workflow
    return await this.triggerWorkflow({
      workflow_id: 'multi-ai-comparison', // This should be created in n8n
      input_data: workflowData,
      wait_for_completion: true
    });
  }

  async syncWithExternalServices(args) {
    const { services, data, sync_type = 'update' } = args;
    
    const syncData = {
      services: services,
      data: data,
      sync_type: sync_type,
      source: 'claude-mcp',
      timestamp: new Date().toISOString()
    };

    return await this.triggerWorkflow({
      workflow_id: 'external-sync', // This should be created in n8n
      input_data: syncData,
      wait_for_completion: false
    });
  }

  async getWorkflowStatus(args) {
    const { workflow_id, execution_id } = args;
    
    try {
      let url = `${this.n8nBaseUrl}/api/v1/executions`;
      if (execution_id) {
        url += `/${execution_id}`;
      } else if (workflow_id) {
        url += `?workflowId=${workflow_id}&limit=5`;
      }

      const response = await axios.get(url, {
        headers: this.getHeaders()
      });

      const data = response.data.data;
      
      if (execution_id) {
        return {
          content: [{
            type: 'text',
            text: `📊 Execution Status\\n🆔 ID: ${data.id}\\n📈 Status: ${data.finished ? 'Completed' : 'Running'}\\n⏱️ Started: ${new Date(data.startedAt).toISOString()}\\n${data.stoppedAt ? `🏁 Finished: ${new Date(data.stoppedAt).toISOString()}` : ''}`
          }]
        };
      } else {
        const executions = Array.isArray(data) ? data : [data];
        const statusText = executions.map((exec, i) => 
          `${i + 1}. ${exec.id} - ${exec.finished ? 'Completed' : 'Running'} (${new Date(exec.startedAt).toLocaleDateString()})`
        ).join('\\n');
        
        return {
          content: [{
            type: 'text',
            text: `📊 Recent Executions${workflow_id ? ` for Workflow ${workflow_id}` : ''}\\n\\n${statusText || 'No executions found'}`
          }]
        };
      }
    } catch (error) {
      throw new Error(`Failed to get workflow status: ${error.response?.data?.message || error.message}`);
    }
  }

  convertActionsToNodes(actions) {
    return actions.map((action, index) => ({
      parameters: action.parameters || {},
      name: action.name || `Action ${index + 1}`,
      type: action.type || 'n8n-nodes-base.function',
      typeVersion: 1,
      position: [250 + (index + 1) * 200, 300]
    }));
  }

  generateConnections(nodeCount) {
    const connections = {};
    for (let i = 0; i < nodeCount - 1; i++) {
      connections[`Node ${i}`] = {
        main: [[{ node: `Node ${i + 1}`, type: 'main', index: 0 }]]
      };
    }
    return connections;
  }

  async waitForExecution(executionId, maxWait = 30000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWait) {
      try {
        const response = await axios.get(
          `${this.n8nBaseUrl}/api/v1/executions/${executionId}`,
          { headers: this.getHeaders() }
        );
        
        const execution = response.data.data;
        
        if (execution.finished) {
          return {
            status: execution.mode,
            data: execution.data
          };
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        throw new Error(`Failed to check execution status: ${error.message}`);
      }
    }
    
    throw new Error('Execution timeout');
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.n8nApiKey) {
      headers['X-N8N-API-KEY'] = this.n8nApiKey;
    }
    return headers;
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('n8n MCP Bridge started');
  }
}

const bridge = new N8nMCPBridge();
bridge.start().catch(console.error);