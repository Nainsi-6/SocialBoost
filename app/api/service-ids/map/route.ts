// ============================================
// Next.js API Route: GET /api/service-ids/map
// BFF proxy: SocialBoost Frontend → Next.js → Express backend
// Returns the simple category → id mapping.
// ============================================

import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/api-config';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/service-ids/map`, {
      headers: { 'Content-Type': 'application/json' },
      // Cache for 60 seconds
      next: { revalidate: 60 },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[API /service-ids/map] Error fetching from backend:', error);
    // Fallback: return the hardcoded defaults
    return NextResponse.json(
      {
        success: true,
        data: {
          followers: 10183,
          likes: 12587,
          views: 602,
          comments: 670,
        },
      },
      { status: 200 }
    );
  }
}
