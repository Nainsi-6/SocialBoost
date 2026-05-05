// ============================================
// Next.js API Route: GET /api/service-ids
// BFF proxy: SocialBoost Frontend → Next.js → Express backend
// Returns the service ID map (followers, likes, views, comments, etc.)
// so the frontend can dynamically resolve ssmServiceId values.
// ============================================

import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/api-config';

export interface ServiceIdEntry {
  id: number;
  name: string;
  provider: string;
  category: string;
  platform: string;
  allowedQuantities: number[];
  description?: string;
}

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/service-ids`, {
      headers: { 'Content-Type': 'application/json' },
      // Cache for 60 seconds — service IDs rarely change
      next: { revalidate: 60 },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[API /service-ids] Error fetching from backend:', error);
    // Fallback: return the hardcoded defaults so the site never breaks
    return NextResponse.json(
      {
        success: true,
        data: [
          { id: 10183, name: 'Followers', provider: 'IND', category: 'followers', platform: 'instagram', allowedQuantities: [50, 100, 200] },
          { id: 12587, name: 'Likes', provider: 'IND', category: 'likes', platform: 'instagram', allowedQuantities: [1000] },
          { id: 602, name: 'Reel Views', provider: 'SUPPORTIVE', category: 'views', platform: 'instagram', allowedQuantities: [5000, 10000, 25000] },
          { id: 670, name: 'Comments', provider: 'SUPPORTIVE', category: 'comments', platform: 'instagram', allowedQuantities: [100] },
        ],
      },
      { status: 200 }
    );
  }
}
