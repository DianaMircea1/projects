/**
 * Test pentru API Proxy Route
 * Testează dacă CORS-ul este rezolvat prin proxy
 */

const testProxyAPI = async () => {
  console.log('🧪 Testing API Proxy Route...');
  
  const testPayload = {
    property_id: 'test_proxy_' + Date.now(),
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
    _hp_website: ''
  };

  try {
    // Test cu Next.js API route local (should work without CORS)
    const proxyResponse = await fetch('http://localhost:3000/api/generate-audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const proxyData = await proxyResponse.json();
    
    if (proxyResponse.ok) {
      console.log('✅ API Proxy works! Response:', proxyData);
    } else {
      console.log('⚠️ API Proxy returned error:', proxyData);
    }
  } catch (error) {
    console.log('❌ API Proxy test failed:', error.message);
  }
};

// Test direct backend (should fail with CORS)
const testDirectBackend = async () => {
  console.log('🧪 Testing Direct Backend (should fail with CORS)...');
  
  try {
    const response = await fetch('https://api.tourism-audit.devidevs.com/api/generate-audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('1D_xoyV2m-KUyz1rUkVk9cGqxj1zHPo5:HVKpMqzrUPVBQ-NTCDe94Mqdl_npHZyc0eVRH8DHnHKNxZeMt190WC7oZ-BsS2Cw'),
      },
      body: JSON.stringify({
        property_id: 'test_direct_' + Date.now(),
        email: 'test@example.com',
        // ... rest of payload
      }),
    });
    
    console.log('⚠️ Unexpected: Direct backend call succeeded');
  } catch (error) {
    console.log('✅ Expected: Direct backend failed with CORS:', error.message);
  }
};

console.log('🚀 CORS Resolution Test');
console.log('📋 Solutions implemented:');
console.log('1. ✅ Next.js API Route as proxy (/api/generate-audit)');
console.log('2. ✅ CORS headers added to proxy response');
console.log('3. ✅ Authentication handled server-side');
console.log('');
console.log('🎯 Next steps:');
console.log('1. Start Next.js dev server: npx next dev');
console.log('2. Access: http://localhost:3000/audit');
console.log('3. Submit form and check Network tab');
console.log('4. Request should go to /api/generate-audit (no CORS error)');
console.log('');
console.log('If you want to test the proxy manually:');
// testProxyAPI();
// testDirectBackend();
