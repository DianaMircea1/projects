import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.tourism-audit.devidevs.com';
const API_CLIENT_ID = process.env.API_CLIENT_ID || '1D_xoyV2m-KUyz1rUkVk9cGqxj1zHPo5';
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET || 'HVKpMqzrUPVBQ-NTCDe94Mqdl_npHZyc0eVRH8DHnHKNxZeMt190WC7oZ-BsS2Cw';

function getBasicAuthHeader(): string {
  const credentials = Buffer.from(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`).toString('base64');
  return `Basic ${credentials}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward request to backend
    const response = await fetch(`${BACKEND_URL}/api/generate-audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getBasicAuthHeader(),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // Return response with proper CORS headers
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      {
        message: 'Internal server error',
        status_message: 'failed',
        status_code: 500
      },
      { status: 500 }
    );
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
