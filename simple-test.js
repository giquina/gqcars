const puppeteer = require('puppeteer');

async function testWebsite() {
  let browser;
  try {
    console.log('Starting browser...');
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'hero-test.png', fullPage: true });
    
    // Check what hero design is loaded
    const heroText = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.textContent : 'No h1 found';
    });
    
    console.log('Hero text found:', heroText);
    console.log('Website test completed successfully!');
    console.log('Screenshot saved as hero-test.png');
    
  } catch (error) {
    console.error('Error during test:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testWebsite();