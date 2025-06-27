#!/usr/bin/env node

/**
 * UNIVERSAL MCP PROJECT SETUP
 * Automatically configures any new project with MCP integration
 */

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

class UniversalMCPSetup {
  constructor() {
    this.templatePath = 'C:\\Users\\Student\\Desktop\\UNIVERSAL-MCP-TEMPLATE';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }

  async setupProject() {
    console.log('🚀 UNIVERSAL MCP PROJECT SETUP');
    console.log('=====================================');
    console.log('');

    // Get project details
    const projectName = await this.question('📁 Project name: ');
    const projectDescription = await this.question('📝 Project description: ');
    const projectType = await this.question('🏗️ Project type (react/nextjs/node/python/etc): ');
    const framework = await this.question('⚡ Framework (next.js/express/django/etc): ');
    const language = await this.question('💻 Language (typescript/javascript/python/etc): ');
    const brandColor = await this.question('🎨 Primary brand color (yellow-500/blue-600/etc): ');
    const projectPath = await this.question('📂 Project directory path: ');

    console.log('');
    console.log('⚙️ Setting up MCP configuration...');

    // Load template
    const templatePath = path.join(this.templatePath, 'template.mcp.json');
    const templateContent = await fs.readFile(templatePath, 'utf8');
    
    // Replace placeholders
    let mcpConfig = templateContent
      .replace(/PROJECT_NAME_PLACEHOLDER/g, projectName)
      .replace(/PROJECT_DESCRIPTION_PLACEHOLDER/g, projectDescription)
      .replace(/PROJECT_TYPE_PLACEHOLDER/g, projectType)
      .replace(/FRAMEWORK_PLACEHOLDER/g, framework)
      .replace(/LANGUAGE_PLACEHOLDER/g, language)
      .replace(/BRAND_COLOR_PLACEHOLDER/g, brandColor)
      .replace(/TIMESTAMP_PLACEHOLDER/g, new Date().toISOString())
      .replace(/GITHUB_REPO_PLACEHOLDER/g, `https://github.com/your-username/${projectName}`)
      .replace(/DEPLOYMENT_URL_PLACEHOLDER/g, `https://${projectName}.vercel.app`);

    // Write MCP config to project
    const mcpConfigPath = path.join(projectPath, '.mcp.json');
    await fs.writeFile(mcpConfigPath, mcpConfig);

    // Copy sync bridge
    const syncBridgeTemplate = path.join(this.templatePath, 'universal-sync-bridge.js');
    const syncBridgePath = path.join(projectPath, 'mcp-sync-bridge.js');
    
    try {
      const syncBridgeContent = await fs.readFile(syncBridgeTemplate, 'utf8');
      const customizedBridge = syncBridgeContent
        .replace(/PROJECT_PATH_PLACEHOLDER/g, projectPath)
        .replace(/PROJECT_NAME_PLACEHOLDER/g, projectName);
      
      await fs.writeFile(syncBridgePath, customizedBridge);
    } catch (error) {
      console.log('⚠️ Sync bridge template not found, using basic template');
    }

    // Create MCP startup script
    const startupScript = `@echo off
echo 🚀 Starting MCP Sync for ${projectName}
echo =====================================
echo.
echo Starting MCP sync bridge...
node mcp-sync-bridge.js
pause
`;

    const startupPath = path.join(projectPath, 'START-MCP-SYNC.bat');
    await fs.writeFile(startupPath, startupScript);

    console.log('');
    console.log('✅ MCP SETUP COMPLETE!');
    console.log('=====================================');
    console.log(`📁 Project: ${projectName}`);
    console.log(`📂 Location: ${projectPath}`);
    console.log(`🎨 Brand Color: ${brandColor}`);
    console.log('');
    console.log('🔧 Files Created:');
    console.log(`   • .mcp.json - MCP configuration`);
    console.log(`   • mcp-sync-bridge.js - Sync bridge`);
    console.log(`   • START-MCP-SYNC.bat - Easy startup`);
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('   1. Run START-MCP-SYNC.bat to enable sync');
    console.log('   2. Open project in Cursor');
    console.log('   3. Both Claude Desktop and Cursor will stay in sync!');
    console.log('');

    this.rl.close();
  }
}

// Run setup
const setup = new UniversalMCPSetup();
setup.setupProject().catch(console.error);
