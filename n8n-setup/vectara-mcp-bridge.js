const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const axios = require('axios');

class VectaraMCPBridge {
  constructor() {
    this.server = new Server(
      {
        name: 'vectara-search',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.apiKey = process.env.VECTARA_API_KEY;
    this.customerId = process.env.VECTARA_CUSTOMER_ID;
    this.corpusId = process.env.VECTARA_CORPUS_ID;
    this.baseUrl = 'https://api.vectara.io';

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'vectara_index_document',
          description: 'Index a document or text in Vectara for semantic search',
          inputSchema: {
            type: 'object',
            properties: {
              title: { type: 'string', description: 'Document title' },
              content: { type: 'string', description: 'Document content to index' },
              metadata: { type: 'object', description: 'Additional metadata' },
              document_id: { type: 'string', description: 'Unique document ID' }
            },
            required: ['title', 'content']
          }
        },
        {
          name: 'vectara_semantic_search',
          description: 'Search indexed documents using semantic/AI-powered search',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query' },
              num_results: { type: 'number', description: 'Number of results to return', default: 10 },
              score_threshold: { type: 'number', description: 'Minimum relevance score', default: 0.5 }
            },
            required: ['query']
          }
        },
        {
          name: 'vectara_index_code_project',
          description: 'Index an entire code project for semantic code search',
          inputSchema: {
            type: 'object',
            properties: {
              project_path: { type: 'string', description: 'Path to code project' },
              project_name: { type: 'string', description: 'Name of the project' },
              include_extensions: { type: 'array', items: { type: 'string' }, description: 'File extensions to include' }
            },
            required: ['project_path', 'project_name']
          }
        },
        {
          name: 'vectara_index_workflow_output',
          description: 'Index Claude/ChatGPT workflow outputs for future reference',
          inputSchema: {
            type: 'object',
            properties: {
              workflow_name: { type: 'string', description: 'Name of the workflow' },
              output_content: { type: 'string', description: 'Workflow output content' },
              ai_model: { type: 'string', description: 'AI model that generated output' },
              timestamp: { type: 'string', description: 'Timestamp of generation' }
            },
            required: ['workflow_name', 'output_content']
          }
        },
        {
          name: 'vectara_query_knowledge_base',
          description: 'Query the entire knowledge base with context-aware search',
          inputSchema: {
            type: 'object',
            properties: {
              question: { type: 'string', description: 'Question to ask the knowledge base' },
              context_filter: { type: 'string', description: 'Filter by document type or category' },
              include_code: { type: 'boolean', description: 'Include code results', default: true }
            },
            required: ['question']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'vectara_index_document':
            return await this.indexDocument(args);
          case 'vectara_semantic_search':
            return await this.semanticSearch(args);
          case 'vectara_index_code_project':
            return await this.indexCodeProject(args);
          case 'vectara_index_workflow_output':
            return await this.indexWorkflowOutput(args);
          case 'vectara_query_knowledge_base':
            return await this.queryKnowledgeBase(args);
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

  async indexDocument(args) {
    const { title, content, metadata = {}, document_id } = args;
    
    const indexData = {
      customer_id: this.customerId,
      corpus_id: this.corpusId,
      document: {
        document_id: document_id || `doc_${Date.now()}`,
        title: title,
        metadata_json: JSON.stringify({
          ...metadata,
          indexed_at: new Date().toISOString(),
          indexed_by: 'claude-mcp'
        }),
        section: [
          {
            text: content
          }
        ]
      }
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/index`,
        indexData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        content: [{
          type: 'text',
          text: `✅ Document indexed in Vectara\\n📄 Title: ${title}\\n🆔 ID: ${indexData.document.document_id}\\n📊 Status: ${response.data.status || 'Success'}`
        }]
      };
    } catch (error) {
      throw new Error(`Failed to index document: ${error.response?.data?.message || error.message}`);
    }
  }

  async semanticSearch(args) {
    const { query, num_results = 10, score_threshold = 0.5 } = args;
    
    const searchData = {
      query: [
        {
          query: query,
          num_results: num_results,
          corpus_key: [
            {
              customer_id: this.customerId,
              corpus_id: this.corpusId
            }
          ]
        }
      ]
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/query`,
        searchData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const results = response.data.responseSet?.[0]?.response || [];
      const filteredResults = results.filter(r => r.score >= score_threshold);

      const formattedResults = filteredResults.map(result => ({
        title: result.documentMetadata?.title || 'Untitled',
        score: result.score,
        text: result.text,
        document_id: result.documentMetadata?.document_id
      }));

      return {
        content: [{
          type: 'text',
          text: `🔍 Vectara Search Results for: "${query}"\\n\\n` +
            formattedResults.map((r, i) => 
              `${i + 1}. **${r.title}** (Score: ${r.score.toFixed(3)})\\n${r.text.substring(0, 200)}...\\n`
            ).join('\\n') +
            `\\n📊 Found ${filteredResults.length} relevant results`
        }]
      };
    } catch (error) {
      throw new Error(`Search failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async indexCodeProject(args) {
    const { project_path, project_name, include_extensions = ['.js', '.ts', '.py', '.md', '.json'] } = args;
    const fs = require('fs').promises;
    const path = require('path');

    try {
      const files = await this.getProjectFiles(project_path, include_extensions);
      let indexedCount = 0;

      for (const file of files) {
        const content = await fs.readFile(file.path, 'utf8');
        const relativePath = path.relative(project_path, file.path);
        
        await this.indexDocument({
          title: `${project_name}: ${relativePath}`,
          content: content,
          metadata: {
            project: project_name,
            file_type: file.extension,
            file_path: relativePath,
            project_path: project_path
          },
          document_id: `${project_name}_${relativePath.replace(/[^a-zA-Z0-9]/g, '_')}`
        });
        
        indexedCount++;
      }

      return {
        content: [{
          type: 'text',
          text: `✅ Indexed code project: ${project_name}\\n📁 Project path: ${project_path}\\n📄 Files indexed: ${indexedCount}\\n🔍 Now searchable in Vectara`
        }]
      };
    } catch (error) {
      throw new Error(`Failed to index project: ${error.message}`);
    }
  }

  async indexWorkflowOutput(args) {
    const { workflow_name, output_content, ai_model = 'claude', timestamp } = args;
    
    const metadata = {
      workflow_type: 'ai_generated',
      ai_model: ai_model,
      generated_at: timestamp || new Date().toISOString(),
      workflow_category: 'automation'
    };

    return await this.indexDocument({
      title: `Workflow: ${workflow_name}`,
      content: output_content,
      metadata: metadata,
      document_id: `workflow_${workflow_name}_${Date.now()}`
    });
  }

  async queryKnowledgeBase(args) {
    const { question, context_filter, include_code = true } = args;
    
    // Enhance query with context
    let enhancedQuery = question;
    if (context_filter) {
      enhancedQuery += ` context:${context_filter}`;
    }
    if (!include_code) {
      enhancedQuery += ' -filetype:code';
    }

    const results = await this.semanticSearch({
      query: enhancedQuery,
      num_results: 15,
      score_threshold: 0.3
    });

    return {
      content: [{
        type: 'text',
        text: `🧠 Knowledge Base Query: "${question}"\\n${results.content[0].text}`
      }]
    };
  }

  async getProjectFiles(dirPath, extensions) {
    const fs = require('fs').promises;
    const path = require('path');
    const files = [];

    async function scan(currentPath) {
      const items = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item.name);
        
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          await scan(fullPath);
        } else if (item.isFile()) {
          const ext = path.extname(item.name);
          if (extensions.includes(ext)) {
            files.push({
              path: fullPath,
              extension: ext,
              name: item.name
            });
          }
        }
      }
    }

    await scan(dirPath);
    return files;
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Vectara MCP Bridge started');
  }
}

const bridge = new VectaraMCPBridge();
bridge.start().catch(console.error);