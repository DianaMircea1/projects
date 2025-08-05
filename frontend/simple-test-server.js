/**
 * Simple test server to verify API route functionality
 * Run with: node simple-test-server.js
 */

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Serve the test HTML file
  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/test') {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const htmlContent = fs.readFileSync(path.join(__dirname, 'public', 'test-cors.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlContent);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Test file not found');
    }
    return;
  }
  
  // Mock API endpoint to test CORS resolution
  if (parsedUrl.pathname === '/api/generate-audit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        console.log('📥 Received test request:', data.property_id);
        
        // Test actual backend call
        const response = await fetch('https://api.tourism-audit.devidevs.com/api/generate-audit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from('1D_xoyV2m-KUyz1rUkVk9cGqxj1zHPo5:HVKpMqzrUPVBQ-NTCDe94Mqdl_npHZyc0eVRH8DHnHKNxZeMt190WC7oZ-BsS2Cw').toString('base64'),
          },
          body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        res.writeHead(response.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        
        console.log('📤 Backend responded:', result.status_message);
      } catch (error) {
        console.error('❌ Error:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: error.message,
          status_message: 'failed',
          status_code: 500
        }));
      }
    });
    return;
  }
  
  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('🚀 Test server running at http://localhost:' + PORT);
  console.log('📋 Visit http://localhost:' + PORT + '/test to test CORS solution');
  console.log('🔧 This server acts as a proxy to avoid CORS issues');
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down test server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
