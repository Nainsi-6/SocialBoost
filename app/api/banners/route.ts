// ============================================
// Next.js API Route: GET /api/banners
// BFF proxy: Frontend → Next.js → Express backend
// ============================================

import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/banners`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[API /banners] Error:', error);
    return NextResponse.json(
      { success: true, data: [] },
      { status: 200 }
    );
  }
}
