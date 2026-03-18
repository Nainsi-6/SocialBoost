// ============================================
// Next.js API Route: POST /api/orders
// BFF proxy: Frontend → Next.js → Express backend
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/api-config';
const API_AUTH_KEY = process.env.BACKEND_API_KEY || '';

async function getHeaders() {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (API_AUTH_KEY) {
        headers['Authorization'] = `Bearer ${API_AUTH_KEY}`;
    }
    return headers;
}

export async function POST(request: NextRequest) {
    try {
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ success: false, message: 'Invalid JSON body' }, { status: 400 });
        }

        const response = await fetch(`${BACKEND_URL}/api/orders`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('[API /orders POST] Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const queryString = searchParams.toString();
        const url = `${BACKEND_URL}/api/orders${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: await getHeaders(),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('[API /orders GET] Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
