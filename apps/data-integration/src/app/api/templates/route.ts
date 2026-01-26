import { NextRequest, NextResponse } from 'next/server';
import { getTemplates } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const sourceId = url.searchParams.get('source') || undefined;

    const templates = getTemplates(sourceId);
    return NextResponse.json( templates );
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
