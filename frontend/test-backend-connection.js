/**
 * Test script pentru verificarea conectivității cu backend-ul
 * Rulează: node test-backend-connection.js
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.tourism-audit.devidevs.com';
const API_CLIENT_ID = process.env.API_CLIENT_ID || '1D_xoyV2m-KUyz1rUkVk9cGqxj1zHPo5';
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET || 'HVKpMqzrUPVBQ-NTCDe94Mqdl_npHZyc0eVRH8DHnHKNxZeMt190WC7oZ-BsS2Cw';

function getBasicAuthHeader() {
  const credentials = Buffer.from(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`).toString('base64');
  return `Basic ${credentials}`;
}

async function testHealthEndpoint() {
  console.log('🔍 Testing health endpoint...');
  try {
    const response = await fetch(`${API_BASE_URL}/healthz`, {
      method: 'GET'
    });
    
    const data = await response.json();
    console.log('✅ Health check:', data);
    return true;
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return false;
  }
}

async function testAuditEndpoint() {
  console.log('🔍 Testing audit endpoint with dummy data...');
  
  const testPayload = {
    property_id: 'test_' + Date.now(),
    email: 'test@example.com',
    owner_name: 'Test User',
    phone_number: '+40123456789',
    property_name: 'Test Hotel',
    property_address: 'Test Address 123, Bucharest',
    website_url: 'https://test-hotel.com',
    booking_platform_links: ['https://booking.com/test'],
    social_media_links: ['https://facebook.com/test'],
    google_my_business_link: 'https://goo.gl/maps/test',
    primary_marketing_goal: 'Test marketing goal',
    past_marketing_methods: 'Test methods',
    marketing_team_structure: 'none',
    online_challenges: 'Test challenges',
    content_update_frequency: 'monthly',
    review_management_strategy: 'Test strategy',
    target_customer_segments: 'Test segments',
    unique_selling_points: 'Test USP',
    public_performance_data: 'Test data',
    business_description: 'Test business description',
    recaptcha_token: 'test-token-' + Date.now(),
    _hp_website: '' // Honeypot field
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getBasicAuthHeader(),
      },
      body: JSON.stringify(testPayload),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Audit endpoint test successful:', data);
      return true;
    } else {
      console.log('⚠️ Audit endpoint returned error:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ Audit endpoint test failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting backend connectivity tests...');
  console.log('📍 Backend URL:', API_BASE_URL);
  console.log('🔑 Using API Client ID:', API_CLIENT_ID);
  console.log('');

  const healthOk = await testHealthEndpoint();
  console.log('');
  
  if (healthOk) {
    await testAuditEndpoint();
  } else {
    console.log('⏭️ Skipping audit test due to health check failure');
  }
  
  console.log('');
  console.log('🏁 Tests completed!');
}

// Run tests
runTests().catch(console.error);
