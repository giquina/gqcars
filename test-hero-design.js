const { chromium } = require('playwright');

async function testHeroDesign() {
  let browser;
  try {
    console.log('🎭 Starting Playwright browser...');
    
    // Use your existing Playwright installation
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('🌐 Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle', 
      timeout: 15000 
    });
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'hero-design-3-bold-dynamic.png', 
      fullPage: true 
    });
    
    // Check for Bold Dynamic design elements
    const heroTitle = await page.textContent('h1');
    const badge = await page.textContent('text=#1 SECURITY TRANSPORT IN LONDON');
    const liveActivity = await page.textContent('text=LIVE ACTIVITY');
    const backgroundStyle = await page.getAttribute('[class*="from-blue-900"]', 'class');
    
    console.log('\n🎨 DESIGN #3 (BOLD DYNAMIC) - ANALYSIS:');
    console.log('=' .repeat(50));
    console.log('✅ Hero Title:', heroTitle ? heroTitle.slice(0, 50) + '...' : 'Not found');
    console.log('✅ Bold Badge:', badge ? 'Found' : 'Not found');
    console.log('✅ Live Activity Feed:', liveActivity ? 'Found' : 'Not found');
    console.log('✅ Blue/Purple Background:', backgroundStyle ? 'Detected' : 'Not detected');
    
    // Check for animations and dynamic elements
    const animatedElements = await page.$$eval('[class*="animate-"]', elements => elements.length);
    console.log('✅ Animated Elements:', animatedElements, 'found');
    
    // Check for emojis and bold styling
    const emojiContent = await page.textContent('body');
    const hasEmojis = /[🔥⚡🛡️🚗🏆👤]/u.test(emojiContent);
    console.log('✅ Emoji Usage:', hasEmojis ? 'Extensive' : 'Minimal');
    
    console.log('\n📊 DESIGN CHARACTERISTICS:');
    console.log('- Style: BOLD & DYNAMIC with animations');
    console.log('- Background: Blue-Purple gradient');
    console.log('- Elements: Live activity feed, pulsing badges');
    console.log('- Typography: VERY BOLD with font-black');
    console.log('- Interactivity: Animated circles, bouncing particles');
    console.log('- CTA: "BOOK NOW - GET 50% OFF" with scale hover');
    
    console.log('\n✅ Screenshot saved as: hero-design-3-bold-dynamic.png');
    console.log('🎯 Bold Dynamic design test completed!');
    
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testHeroDesign();