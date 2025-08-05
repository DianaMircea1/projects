const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test CORS Integration</title>
      </head>
      <body>
        <h1>Test API Integration</h1>
        <button onclick="testAPI()">Test Backend Connection</button>
        <div id="result"></div>
        
        <script>
        async function testAPI() {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = 'Testing...';
          
          try {
            const response = await fetch('https://api.tourism-audit.devidevs.com/api/generate-audit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('tourism-audit:Dev2024!')
              },
              body: JSON.stringify({
                property_id: 'test-123',
                property_url: 'https://example.com',
                contact_name: 'Test User',
                contact_email: 'test@example.com',
                captcha_token: 'test-token'
              })
            });
            
            const data = await response.text();
            resultDiv.innerHTML = '<pre>' + data + '</pre>';
          } catch (error) {
            resultDiv.innerHTML = 'Error: ' + error.message;
          }
        }
        </script>
      </body>
      </html>
    `);
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

const port = 3000;
server.listen(port, () => {
  console.log('Test server running at http://localhost:' + port);
});
