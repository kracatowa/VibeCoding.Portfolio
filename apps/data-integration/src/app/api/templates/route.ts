import { NextResponse } from 'next/server';
import { getTemplates } from '@/lib/database';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const source = url.searchParams.get('source') || undefined;
    const templates = getTemplates(source);
    return NextResponse.json({ templates });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export const dynamic = 'force-static';
