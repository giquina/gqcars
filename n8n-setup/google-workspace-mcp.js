const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { google } = require('googleapis');
const fs = require('fs').promises;

class GoogleWorkspaceMCPBridge {
  constructor() {
    this.server = new Server(
      {
        name: 'google-workspace',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupAuth();
    this.setupHandlers();
  }

  async setupAuth() {
    try {
      const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH;
      if (credentialsPath) {
        const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));
        this.auth = new google.auth.GoogleAuth({
          credentials,
          scopes: [
            'https://www.googleapis.com/auth/documents',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/script.projects',
            'https://www.googleapis.com/auth/spreadsheets'
          ]
        });
      }
    } catch (error) {
      console.error('Google auth setup failed:', error.message);
    }
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'create_google_doc',
          description: 'Create a new Google Doc with content from Claude/workflow outputs',
          inputSchema: {
            type: 'object',
            properties: {
              title: { type: 'string', description: 'Document title' },
              content: { type: 'string', description: 'Document content (supports markdown)' },
              folder_id: { type: 'string', description: 'Google Drive folder ID' },
              share_settings: { type: 'object', description: 'Sharing permissions' }
            },
            required: ['title', 'content']
          }
        },
        {
          name: 'update_google_doc',
          description: 'Update existing Google Doc with new content',
          inputSchema: {
            type: 'object',
            properties: {
              document_id: { type: 'string', description: 'Google Doc ID' },
              content: { type: 'string', description: 'New content to append/replace' },
              mode: { type: 'string', enum: ['append', 'replace'], description: 'Update mode' }
            },
            required: ['document_id', 'content']
          }
        },
        {
          name: 'trigger_apps_script',
          description: 'Trigger Google Apps Script automation (PDF generation, email, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              script_id: { type: 'string', description: 'Apps Script project ID' },
              function_name: { type: 'string', description: 'Function to execute' },
              parameters: { type: 'object', description: 'Function parameters' }
            },
            required: ['script_id', 'function_name']
          }
        },
        {
          name: 'create_workflow_summary_doc',
          description: 'Create summary document from workflow logs and outputs',
          inputSchema: {
            type: 'object',
            properties: {
              workflow_name: { type: 'string', description: 'Name of the workflow' },
              workflow_data: { type: 'object', description: 'Workflow execution data' },
              include_logs: { type: 'boolean', description: 'Include detailed logs' },
              template_style: { type: 'string', description: 'Document template style' }
            },
            required: ['workflow_name', 'workflow_data']
          }
        },
        {
          name: 'sync_logs_to_drive',
          description: 'Sync Claude/n8n logs and summaries to Google Drive',
          inputSchema: {
            type: 'object',
            properties: {
              log_content: { type: 'string', description: 'Log content to sync' },
              log_type: { type: 'string', description: 'Type of log (claude, n8n, workflow)' },
              date_range: { type: 'string', description: 'Date range for logs' }
            },
            required: ['log_content', 'log_type']
          }
        },
        {
          name: 'generate_pdf_report',
          description: 'Generate PDF from Google Doc using Apps Script',
          inputSchema: {
            type: 'object',
            properties: {
              document_id: { type: 'string', description: 'Source Google Doc ID' },
              report_title: { type: 'string', description: 'PDF report title' },
              include_timestamp: { type: 'boolean', description: 'Include generation timestamp' }
            },
            required: ['document_id']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_google_doc':
            return await this.createGoogleDoc(args);
          case 'update_google_doc':
            return await this.updateGoogleDoc(args);
          case 'trigger_apps_script':
            return await this.triggerAppsScript(args);
          case 'create_workflow_summary_doc':
            return await this.createWorkflowSummaryDoc(args);
          case 'sync_logs_to_drive':
            return await this.syncLogsToDrive(args);
          case 'generate_pdf_report':
            return await this.generatePDFReport(args);
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

  async createGoogleDoc(args) {
    const { title, content, folder_id, share_settings } = args;
    
    if (!this.auth) {
      throw new Error('Google authentication not configured');
    }

    const docs = google.docs({ version: 'v1', auth: this.auth });
    const drive = google.drive({ version: 'v3', auth: this.auth });

    // Create document
    const doc = await docs.documents.create({
      requestBody: {
        title: title
      }
    });

    const documentId = doc.data.documentId;

    // Convert markdown-like content to Google Docs format
    const requests = this.convertContentToRequests(content);

    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId: documentId,
        requestBody: {
          requests: requests
        }
      });
    }

    // Move to folder if specified
    if (folder_id) {
      await drive.files.update({
        fileId: documentId,
        addParents: folder_id,
        fields: 'id, parents'
      });
    }

    // Apply sharing settings
    if (share_settings) {
      await this.applyShareSettings(documentId, share_settings);
    }

    const docUrl = `https://docs.google.com/document/d/${documentId}/edit`;

    return {
      content: [{
        type: 'text',
        text: `✅ Created Google Doc: "${title}"\\n🆔 Document ID: ${documentId}\\n🔗 URL: ${docUrl}\\n📁 ${folder_id ? 'Moved to specified folder' : 'In root folder'}`
      }]
    };
  }

  async updateGoogleDoc(args) {
    const { document_id, content, mode = 'append' } = args;
    
    if (!this.auth) {
      throw new Error('Google authentication not configured');
    }

    const docs = google.docs({ version: 'v1', auth: this.auth });

    if (mode === 'replace') {
      // Clear document content first
      const doc = await docs.documents.get({ documentId: document_id });
      const endIndex = doc.data.body.content[doc.data.body.content.length - 1].endIndex - 1;
      
      await docs.documents.batchUpdate({
        documentId: document_id,
        requestBody: {
          requests: [{
            deleteContentRange: {
              range: {
                startIndex: 1,
                endIndex: endIndex
              }
            }
          }]
        }
      });
    }

    // Add new content
    const requests = this.convertContentToRequests(content, mode === 'append' ? undefined : 1);

    await docs.documents.batchUpdate({
      documentId: document_id,
      requestBody: {
        requests: requests
      }
    });

    return {
      content: [{
        type: 'text',
        text: `✅ Updated Google Doc\\n🆔 Document ID: ${document_id}\\n📝 Mode: ${mode}\\n🔗 URL: https://docs.google.com/document/d/${document_id}/edit`
      }]
    };
  }

  async triggerAppsScript(args) {
    const { script_id, function_name, parameters = {} } = args;
    
    if (!this.auth) {
      throw new Error('Google authentication not configured');
    }

    const script = google.script({ version: 'v1', auth: this.auth });

    try {
      const response = await script.scripts.run({
        scriptId: script_id,
        requestBody: {
          function: function_name,
          parameters: Object.values(parameters)
        }
      });

      const result = response.data.response;

      return {
        content: [{
          type: 'text',
          text: `✅ Apps Script executed successfully\\n🔧 Function: ${function_name}\\n📋 Script ID: ${script_id}\\n📊 Result: ${JSON.stringify(result.result, null, 2)}`
        }]
      };
    } catch (error) {
      throw new Error(`Apps Script execution failed: ${error.message}`);
    }
  }

  async createWorkflowSummaryDoc(args) {
    const { workflow_name, workflow_data, include_logs = false, template_style = 'professional' } = args;
    
    // Generate summary content
    const timestamp = new Date().toISOString();
    const summaryContent = this.generateWorkflowSummary(workflow_name, workflow_data, include_logs, template_style);
    
    return await this.createGoogleDoc({
      title: `Workflow Summary: ${workflow_name} - ${new Date().toLocaleDateString()}`,
      content: summaryContent
    });
  }

  async syncLogsToDrive(args) {
    const { log_content, log_type, date_range } = args;
    
    const title = `${log_type.toUpperCase()} Logs - ${date_range || new Date().toLocaleDateString()}`;
    const content = `# ${title}\\n\\n## Generated: ${new Date().toISOString()}\\n\\n## Log Content:\\n\\n\`\`\`\\n${log_content}\\n\`\`\``;
    
    return await this.createGoogleDoc({
      title: title,
      content: content
    });
  }

  async generatePDFReport(args) {
    const { document_id, report_title, include_timestamp = true } = args;
    
    // This requires a custom Apps Script function
    const appsScriptId = process.env.GOOGLE_APPS_SCRIPT_ID;
    if (!appsScriptId) {
      throw new Error('Google Apps Script ID not configured');
    }

    return await this.triggerAppsScript({
      script_id: appsScriptId,
      function_name: 'generatePDFFromDoc',
      parameters: {
        documentId: document_id,
        reportTitle: report_title || 'Generated Report',
        includeTimestamp: include_timestamp
      }
    });
  }

  convertContentToRequests(content, startIndex = 1) {
    const requests = [];
    
    // Simple markdown-to-docs conversion
    const lines = content.split('\\n');
    let currentIndex = startIndex;
    
    for (const line of lines) {
      if (line.trim()) {
        // Handle headers
        if (line.startsWith('# ')) {
          requests.push({
            insertText: {
              location: { index: currentIndex },
              text: line.substring(2) + '\\n'
            }
          });
          requests.push({
            updateParagraphStyle: {
              range: {
                startIndex: currentIndex,
                endIndex: currentIndex + line.length - 1
              },
              paragraphStyle: {
                namedStyleType: 'HEADING_1'
              },
              fields: 'namedStyleType'
            }
          });
        } else if (line.startsWith('## ')) {
          requests.push({
            insertText: {
              location: { index: currentIndex },
              text: line.substring(3) + '\\n'
            }
          });
          requests.push({
            updateParagraphStyle: {
              range: {
                startIndex: currentIndex,
                endIndex: currentIndex + line.length - 2
              },
              paragraphStyle: {
                namedStyleType: 'HEADING_2'
              },
              fields: 'namedStyleType'
            }
          });
        } else {
          requests.push({
            insertText: {
              location: { index: currentIndex },
              text: line + '\\n'
            }
          });
        }
        currentIndex += line.length + 1;
      } else {
        requests.push({
          insertText: {
            location: { index: currentIndex },
            text: '\\n'
          }
        });
        currentIndex += 1;
      }
    }
    
    return requests;
  }

  generateWorkflowSummary(workflowName, workflowData, includeLogs, templateStyle) {
    const timestamp = new Date().toISOString();
    
    let summary = `# Workflow Summary: ${workflowName}\\n\\n`;
    summary += `**Generated:** ${timestamp}\\n`;
    summary += `**Template:** ${templateStyle}\\n\\n`;
    
    summary += `## Overview\\n`;
    summary += `Workflow executed successfully with the following details:\\n\\n`;
    
    summary += `## Execution Details\\n`;
    if (workflowData.status) summary += `**Status:** ${workflowData.status}\\n`;
    if (workflowData.duration) summary += `**Duration:** ${workflowData.duration}\\n`;
    if (workflowData.steps) summary += `**Steps Completed:** ${workflowData.steps}\\n`;
    
    summary += `\\n## Results\\n`;
    summary += `${JSON.stringify(workflowData.results || {}, null, 2)}\\n`;
    
    if (includeLogs && workflowData.logs) {
      summary += `\\n## Detailed Logs\\n`;
      summary += `\`\`\`\\n${workflowData.logs}\\n\`\`\`\\n`;
    }
    
    summary += `\\n## Generated by Claude MCP Integration\\n`;
    summary += `This document was automatically generated by the Claude MCP system.`;
    
    return summary;
  }

  async applyShareSettings(documentId, shareSettings) {
    const drive = google.drive({ version: 'v3', auth: this.auth });
    
    if (shareSettings.public) {
      await drive.permissions.create({
        fileId: documentId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
    }
    
    if (shareSettings.emails) {
      for (const email of shareSettings.emails) {
        await drive.permissions.create({
          fileId: documentId,
          requestBody: {
            role: shareSettings.role || 'reader',
            type: 'user',
            emailAddress: email
          }
        });
      }
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Google Workspace MCP Bridge started');
  }
}

const bridge = new GoogleWorkspaceMCPBridge();
bridge.start().catch(console.error);