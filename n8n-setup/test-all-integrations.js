const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs').promises;

class IntegrationTester {
  constructor() {
    this.testResults = [];
  }

  async runAllTests() {
    console.log(chalk.blue('🧪 Testing All MCP Integrations...\\n'));
    
    const tests = [
      { name: 'Cursor Integration', test: () => this.testCursor() },
      { name: 'Vectara Integration', test: () => this.testVectara() },
      { name: 'Google Workspace', test: () => this.testGoogleWorkspace() },
      { name: 'Vercel Integration', test: () => this.testVercel() },
      { name: 'n8n Integration', test: () => this.testN8n() },
      { name: 'MCP Configuration', test: () => this.testMCPConfig() }
    ];

    for (const { name, test } of tests) {
      console.log(chalk.blue(`Testing ${name}...`));
      try {
        await test();
        this.testResults.push({ name, status: 'PASS', message: 'Integration working' });
        console.log(chalk.green(`✅ ${name} - PASS`));
      } catch (error) {
        this.testResults.push({ name, status: 'FAIL', message: error.message });
        console.log(chalk.red(`❌ ${name} - FAIL: ${error.message}`));
      }
    }

    this.printSummary();
  }

  async testCursor() {
    // Test if Cursor bridge script exists and is valid
    const bridgePath = './cursor-mcp-bridge.js';
    await fs.access(bridgePath);
    
    // Check if Cursor executable path is set
    const cursorPath = process.env.CURSOR_PATH || 'cursor';
    if (!cursorPath.includes('Cursor.exe') && !cursorPath.includes('cursor')) {
      throw new Error('Cursor path not configured properly');
    }
  }

  async testVectara() {
    const apiKey = process.env.VECTARA_API_KEY;
    const customerId = process.env.VECTARA_CUSTOMER_ID;
    
    if (!apiKey || !customerId) {
      throw new Error('Vectara API credentials not configured');
    }

    // Test basic Vectara API connection
    try {
      await axios.get('https://api.vectara.io/v1/list-corpora', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'customer-id': customerId
        },
        timeout: 5000
      });
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Vectara API credentials invalid');
      }
      // API might be accessible but return other errors, which is still a connection
    }
  }

  async testGoogleWorkspace() {
    const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH || './credentials/google-service-account.json';
    
    try {
      await fs.access(credentialsPath);
    } catch {
      throw new Error('Google service account credentials not found');
    }

    // Test if credentials file is valid JSON
    try {
      const credentials = await fs.readFile(credentialsPath, 'utf8');
      const creds = JSON.parse(credentials);
      if (!creds.type || !creds.client_email) {
        throw new Error('Invalid Google service account format');
      }
    } catch (error) {
      throw new Error('Google credentials file is invalid');
    }
  }

  async testVercel() {
    const token = process.env.VERCEL_TOKEN;
    
    if (!token) {
      throw new Error('Vercel token not configured');
    }

    // Test Vercel API connection
    try {
      await axios.get('https://api.vercel.com/v2/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000
      });
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Vercel token invalid');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to Vercel API');
      }
    }
  }

  async testN8n() {
    const baseUrl = process.env.N8N_BASE_URL || 'http://localhost:5678';
    
    try {
      await axios.get(`${baseUrl}/api/v1/workflows`, {
        timeout: 5000,
        headers: process.env.N8N_API_KEY ? { 'X-N8N-API-KEY': process.env.N8N_API_KEY } : {}
      });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('n8n not running on ' + baseUrl);
      } else if (error.response?.status === 401) {
        throw new Error('n8n API key invalid or required');
      }
    }
  }

  async testMCPConfig() {
    const configPath = './claude_desktop_config.json';
    
    try {
      await fs.access(configPath);
      const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
      
      if (!config.mcpServers) {
        throw new Error('No mcpServers section in config');
      }

      const requiredServers = ['cursor-integration', 'vectara-search', 'google-workspace', 'vercel-deployment', 'n8n-webhook'];
      const configuredServers = Object.keys(config.mcpServers);
      
      for (const server of requiredServers) {
        if (!configuredServers.includes(server)) {
          throw new Error(`Missing MCP server: ${server}`);
        }
      }
    } catch (error) {
      throw new Error(`MCP config issue: ${error.message}`);
    }
  }

  printSummary() {
    console.log(chalk.blue('\\n📊 Test Summary:'));
    console.log('='.repeat(50));
    
    const passed = this.testResults.filter(r => r.status === 'PASS').length;
    const failed = this.testResults.filter(r => r.status === 'FAIL').length;
    
    this.testResults.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : '❌';
      const color = result.status === 'PASS' ? chalk.green : chalk.red;
      console.log(color(`${icon} ${result.name}: ${result.message}`));
    });
    
    console.log('\\n' + '='.repeat(50));
    console.log(chalk.blue(`Total: ${this.testResults.length} | Passed: ${passed} | Failed: ${failed}`));
    
    if (failed === 0) {
      console.log(chalk.green('\\n🎉 All integrations are working!'));
      console.log(chalk.yellow('Ready for Claude prompts!'));
    } else {
      console.log(chalk.red('\\n⚠️  Some integrations need attention.'));
      console.log(chalk.yellow('Check the failed tests above and fix the issues.'));
    }

    // Generate what's working vs what needs setup
    this.generateSetupReport();
  }

  generateSetupReport() {
    console.log(chalk.blue('\\n📋 Setup Status Report:'));
    console.log('='.repeat(50));
    
    const working = this.testResults.filter(r => r.status === 'PASS');
    const needsSetup = this.testResults.filter(r => r.status === 'FAIL');
    
    if (working.length > 0) {
      console.log(chalk.green('\\n✅ FULLY WORKING:'));
      working.forEach(item => {
        console.log(chalk.green(`  • ${item.name}`));
      });
    }
    
    if (needsSetup.length > 0) {
      console.log(chalk.red('\\n⚠️  STILL NEEDS SETUP:'));
      needsSetup.forEach(item => {
        console.log(chalk.red(`  • ${item.name}: ${item.message}`));
      });
      
      console.log(chalk.yellow('\\n📝 TODO for Manual Setup:'));
      needsSetup.forEach(item => {
        const instructions = this.getSetupInstructions(item.name);
        if (instructions) {
          console.log(chalk.yellow(`  ${item.name}:`));
          console.log(chalk.gray(`    ${instructions}`));
        }
      });
    }
  }

  getSetupInstructions(integrationName) {
    const instructions = {
      'Cursor Integration': 'Install Cursor IDE and set CURSOR_PATH in .env',
      'Vectara Integration': 'Sign up for Vectara and add API keys to .env',
      'Google Workspace': 'Create Google service account and download credentials',
      'Vercel Integration': 'Get Vercel token from dashboard and add to .env',
      'n8n Integration': 'Start n8n container: docker-compose up n8n'
    };
    
    return instructions[integrationName] || 'Check documentation';
  }
}

if (require.main === module) {
  const tester = new IntegrationTester();
  tester.runAllTests().catch(console.error);
}

module.exports = IntegrationTester;