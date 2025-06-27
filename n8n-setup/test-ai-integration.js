// AI Integration Test Suite
// This file tests all AI API connections and n8n integrations

const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

class AIIntegrationTester {
  constructor() {
    this.results = {
      openai: { status: 'pending', response: null, error: null },
      claude: { status: 'pending', response: null, error: null },
      perplexity: { status: 'pending', response: null, error: null },
      n8n: { status: 'pending', response: null, error: null }
    };
    
    this.testQuery = "What is the current state of AI development?";
  }

  async testOpenAI() {
    console.log('🔵 Testing OpenAI API...');
    
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: this.testQuery }],
        max_tokens: 100
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      this.results.openai.status = 'success';
      this.results.openai.response = response.data.choices[0].message.content;
      console.log('✅ OpenAI API working!');
      
    } catch (error) {
      this.results.openai.status = 'error';
      this.results.openai.error = error.message;
      console.log('❌ OpenAI API failed:', error.message);
    }
  }

  async testClaude() {
    console.log('🟣 Testing Claude API...');
    
    try {
      const response = await axios.post('https://api.anthropic.com/v1/messages', {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 100,
        messages: [{ role: 'user', content: this.testQuery }]
      }, {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      });
      
      this.results.claude.status = 'success';
      this.results.claude.response = response.data.content[0].text;
      console.log('✅ Claude API working!');
      
    } catch (error) {
      this.results.claude.status = 'error';
      this.results.claude.error = error.message;
      console.log('❌ Claude API failed:', error.message);
    }
  }

  async testPerplexity() {
    console.log('🟡 Testing Perplexity API...');
    
    try {
      const response = await axios.post('https://api.perplexity.ai/chat/completions', {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: this.testQuery }
        ],
        max_tokens: 100
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      this.results.perplexity.status = 'success';
      this.results.perplexity.response = response.data.choices[0].message.content;
      console.log('✅ Perplexity API working!');
      
    } catch (error) {
      this.results.perplexity.status = 'error';
      this.results.perplexity.error = error.message;
      console.log('❌ Perplexity API failed:', error.message);
    }
  }

  async testN8N() {
    console.log('🔴 Testing n8n connection...');
    
    try {
      const response = await axios.get('http://localhost:5678/rest/active-workflows');
      
      this.results.n8n.status = 'success';
      this.results.n8n.response = `Connected. Active workflows: ${response.data.length}`;
      console.log('✅ n8n connection working!');
      
    } catch (error) {
      this.results.n8n.status = 'error';
      this.results.n8n.error = error.message;
      console.log('❌ n8n connection failed:', error.message);
    }
  }

  async runAllTests() {
    console.log('🚀 Starting AI Integration Tests...\n');
    
    // Run all tests
    await this.testOpenAI();
    await this.testClaude();
    await this.testPerplexity();
    await this.testN8N();
    
    // Generate report
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    
    Object.entries(this.results).forEach(([service, result]) => {
      const icon = result.status === 'success' ? '✅' : result.status === 'error' ? '❌' : '⏳';
      console.log(`${icon} ${service.toUpperCase()}: ${result.status}`);
      
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      if (result.response) {
        console.log(`   Response: ${result.response.substring(0, 100)}...`);
      }
    });
    
    // Save results to file
    const reportPath = './test-results.json';
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📝 Detailed results saved to: ${reportPath}`);
    
    // Check overall success
    const successCount = Object.values(this.results).filter(r => r.status === 'success').length;
    const totalTests = Object.keys(this.results).length;
    
    console.log(`\n🎯 Overall Success Rate: ${successCount}/${totalTests} (${Math.round(successCount/totalTests*100)}%)`);
    
    if (successCount === totalTests) {
      console.log('🎉 All systems operational! Your AI stack is ready!');
    } else {
      console.log('⚠️  Some services need attention. Check the errors above.');
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new AIIntegrationTester();
  tester.runAllTests().catch(console.error);
}

module.exports = AIIntegrationTester;
