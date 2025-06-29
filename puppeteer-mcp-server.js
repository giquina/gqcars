#!/usr/bin/env node

/**
 * Puppeteer MCP Server for GQ Cars Website Testing
 * Provides automated browser testing capabilities via MCP protocol
 */

const puppeteer = require('puppeteer');
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');

class PuppeteerMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'puppeteer-testing-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.browser = null;
    this.page = null;
    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'launch_browser',
          description: 'Launch Puppeteer browser instance',
          inputSchema: {
            type: 'object',
            properties: {
              headless: { type: 'boolean', default: true },
              viewport: {
                type: 'object',
                properties: {
                  width: { type: 'number', default: 1200 },
                  height: { type: 'number', default: 800 }
                }
              }
            }
          }
        },
        {
          name: 'navigate_to_page',
          description: 'Navigate to a specific URL',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'URL to navigate to' },
              waitUntil: { type: 'string', default: 'networkidle2' }
            },
            required: ['url']
          }
        },
        {
          name: 'take_screenshot',
          description: 'Take a screenshot of the current page',
          inputSchema: {
            type: 'object',
            properties: {
              path: { type: 'string', description: 'Path to save screenshot' },
              fullPage: { type: 'boolean', default: true }
            }
          }
        },
        {
          name: 'check_hero_design',
          description: 'Check which hero design is currently loaded',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string', default: 'http://localhost:3000' }
            }
          }
        },
        {
          name: 'test_page_elements',
          description: 'Test for specific elements on the page',
          inputSchema: {
            type: 'object',
            properties: {
              selectors: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'CSS selectors to test for'
              }
            },
            required: ['selectors']
          }
        },
        {
          name: 'get_page_content',
          description: 'Get page content and extract specific information',
          inputSchema: {
            type: 'object',
            properties: {
              selector: { type: 'string', description: 'CSS selector to extract content from' },
              attribute: { type: 'string', description: 'Attribute to extract (optional)' }
            }
          }
        },
        {
          name: 'close_browser',
          description: 'Close the browser instance',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'launch_browser':
            return await this.launchBrowser(args);
          
          case 'navigate_to_page':
            return await this.navigateToPage(args);
          
          case 'take_screenshot':
            return await this.takeScreenshot(args);
          
          case 'check_hero_design':
            return await this.checkHeroDesign(args);
          
          case 'test_page_elements':
            return await this.testPageElements(args);
          
          case 'get_page_content':
            return await this.getPageContent(args);
          
          case 'close_browser':
            return await this.closeBrowser();
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        throw new Error(`Tool execution failed: ${error.message}`);
      }
    });
  }

  async launchBrowser(args = {}) {
    const { headless = true, viewport = { width: 1200, height: 800 } } = args;
    
    this.browser = await puppeteer.launch({
      headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport(viewport);
    
    return {
      content: [
        {
          type: 'text',
          text: `Browser launched successfully. Viewport: ${viewport.width}x${viewport.height}, Headless: ${headless}`
        }
      ]
    };
  }

  async navigateToPage(args) {
    if (!this.page) {
      throw new Error('Browser not launched. Call launch_browser first.');
    }

    const { url, waitUntil = 'networkidle2' } = args;
    await this.page.goto(url, { waitUntil });
    
    const title = await this.page.title();
    
    return {
      content: [
        {
          type: 'text',
          text: `Navigated to: ${url}\nPage title: ${title}`
        }
      ]
    };
  }

  async takeScreenshot(args = {}) {
    if (!this.page) {
      throw new Error('Browser not launched. Call launch_browser first.');
    }

    const { path = 'screenshot.png', fullPage = true } = args;
    await this.page.screenshot({ path, fullPage });
    
    return {
      content: [
        {
          type: 'text',
          text: `Screenshot saved to: ${path}`
        }
      ]
    };
  }

  async checkHeroDesign(args = {}) {
    if (!this.page) {
      await this.launchBrowser();
    }

    const { url = 'http://localhost:3000' } = args;
    await this.page.goto(url, { waitUntil: 'networkidle2' });

    // Check for different hero design indicators
    const heroChecks = await this.page.evaluate(() => {
      const results = {};
      
      // Check for Classic Premium design
      results.classicPremium = {
        premiumBadge: !!document.querySelector('*:contains("PREMIUM SECURITY TRANSPORT")'),
        slateBackground: !!document.querySelector('[class*="from-slate-900"]'),
        elegantLayout: !!document.querySelector('[class*="min-h-screen"]')
      };
      
      // Check for Modern Minimal design
      results.modernMinimal = {
        cleanTypography: !!document.querySelector('h1:contains("GQ.")'),
        minimalGrid: !!document.querySelector('[style*="background-image"]'),
        lightFont: !!document.querySelector('[class*="font-light"]')
      };
      
      // Check for Bold Dynamic design
      results.boldDynamic = {
        liveActivity: !!document.querySelector('*:contains("LIVE ACTIVITY")'),
        boldText: !!document.querySelector('[class*="font-black"]'),
        dynamicElements: !!document.querySelector('[class*="animate-ping"]')
      };
      
      // Get main heading text
      const mainHeading = document.querySelector('h1');
      results.mainHeading = mainHeading ? mainHeading.textContent.trim() : 'Not found';
      
      // Get background classes
      const heroElement = document.querySelector('[class*="bg-gradient"]');
      results.backgroundClasses = heroElement ? heroElement.className : 'Not found';
      
      return results;
    });

    return {
      content: [
        {
          type: 'text',
          text: `Hero Design Analysis:\n${JSON.stringify(heroChecks, null, 2)}`
        }
      ]
    };
  }

  async testPageElements(args) {
    if (!this.page) {
      throw new Error('Browser not launched. Call launch_browser first.');
    }

    const { selectors } = args;
    const results = {};
    
    for (const selector of selectors) {
      try {
        const element = await this.page.$(selector);
        results[selector] = {
          exists: !!element,
          visible: element ? await element.isVisible() : false,
          text: element ? await element.textContent() : null
        };
      } catch (error) {
        results[selector] = {
          exists: false,
          error: error.message
        };
      }
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `Element Test Results:\n${JSON.stringify(results, null, 2)}`
        }
      ]
    };
  }

  async getPageContent(args) {
    if (!this.page) {
      throw new Error('Browser not launched. Call launch_browser first.');
    }

    const { selector, attribute } = args;
    
    const content = await this.page.evaluate((sel, attr) => {
      const element = document.querySelector(sel);
      if (!element) return null;
      
      if (attr) {
        return element.getAttribute(attr);
      } else {
        return element.textContent.trim();
      }
    }, selector, attribute);
    
    return {
      content: [
        {
          type: 'text',
          text: `Content for "${selector}": ${content || 'Not found'}`
        }
      ]
    };
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
    
    return {
      content: [
        {
          type: 'text',
          text: 'Browser closed successfully'
        }
      ]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Puppeteer MCP Server running on stdio');
  }
}

// Run the server
if (require.main === module) {
  const server = new PuppeteerMCPServer();
  server.run().catch(console.error);
}

module.exports = PuppeteerMCPServer;