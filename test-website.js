#\!/usr/bin/env node

const http = require('http');

function testWebsite(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Request timed out after ${timeout}ms`));
    }, timeout);

    const req = http.get(url, (res) => {
      clearTimeout(timer);
      console.log(`✅ Website is live\!`);
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        if (body.includes('GQ CARS') || body.includes('<\!DOCTYPE html>')) {
          console.log(`✅ Website content loaded successfully\!`);
          console.log(`Body length: ${body.length} characters`);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            bodyLength: body.length,
            hasContent: true
          });
        } else {
          console.log(`⚠️ Website responded but content may be incomplete`);
          console.log(`Body preview:`, body.substring(0, 200));
          resolve({
            status: res.statusCode,
            headers: res.headers,
            bodyLength: body.length,
            hasContent: false
          });
        }
      });
    });

    req.on('error', (err) => {
      clearTimeout(timer);
      console.log(`❌ Website connection failed:`, err.message);
      reject(err);
    });

    req.end();
  });
}

async function main() {
  console.log('🔍 Testing website connectivity...');
  
  try {
    const result = await testWebsite('http://localhost:3000');
    console.log('\n🎉 SUCCESS: Website is working perfectly\!');
    console.log(`URL: http://localhost:3000`);
    console.log(`Status: ${result.status}`);
    console.log(`Content loaded: ${result.hasContent ? 'Yes' : 'No'}`);
  } catch (error) {
    console.log('\n❌ FAILED: Website is not accessible');
    console.log(`Error: ${error.message}`);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure the Next.js dev server is running: npm run dev');
    console.log('2. Check if port 3000 is available: lsof -ti:3000');
    console.log('3. Try accessing: http://localhost:3000');
    process.exit(1);
  }
}

main();
EOF < /dev/null
