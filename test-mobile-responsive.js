// Simple mobile responsiveness test using Node.js fetch
const testMobileResponsiveness = async () => {
  console.log('📱 Testing Mobile Responsiveness...');
  
  try {
    // Test if server is responding
    const response = await fetch('http://127.0.0.1:3000', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      }
    });
    
    if (response.ok) {
      const html = await response.text();
      
      // Check for responsive classes
      const responsiveChecks = {
        'Tailwind responsive classes': html.includes('sm:') || html.includes('md:') || html.includes('lg:'),
        'Viewport meta tag': html.includes('viewport'),
        'Bold Dynamic elements': html.includes('BoldCard') || html.includes('bg-gradient-to-r'),
        'Mobile-first design': html.includes('flex-col') && html.includes('sm:flex-row'),
        'Responsive typography': html.includes('text-sm') || html.includes('text-base') || html.includes('text-lg')
      };
      
      console.log('📱 Mobile Responsiveness Test Results:');
      Object.entries(responsiveChecks).forEach(([check, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${check}`);
      });
      
      // Check for specific Bold Dynamic mobile patterns
      const boldDynamicMobile = {
        'Mobile-optimized gradients': html.includes('from-blue-') && html.includes('to-purple-'),
        'Mobile button sizing': html.includes('py-3') || html.includes('py-4'),
        'Mobile spacing': html.includes('space-y-3') || html.includes('space-y-4'),
        'Mobile grid layouts': html.includes('grid-cols-1') && html.includes('md:grid-cols')
      };
      
      console.log('\n🎨 Bold Dynamic Mobile Features:');
      Object.entries(boldDynamicMobile).forEach(([check, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${check}`);
      });
      
      return true;
    } else {
      console.log('❌ Server not responding properly');
      return false;
    }
  } catch (error) {
    console.log('❌ Error testing mobile responsiveness:', error.message);
    return false;
  }
};

// Test if we have fetch available
if (typeof fetch === 'undefined') {
  // Use node-fetch for Node.js environments
  const fetch = require('node-fetch');
  global.fetch = fetch;
}

testMobileResponsiveness();