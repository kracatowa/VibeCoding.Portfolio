import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllSources, 
  createSource, 
  deleteSource
} from '@/lib/database';
import { AdminSource } from './sources.dto';

/**
 * GET /api/admin/sources
 * Récupère toutes les sources configurées
 */
export async function GET() {
  try {
    const sources = getAllSources();
    return NextResponse.json(sources);
  } catch (error) {
    console.error('Erreur lors de la récupération des sources:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des sources' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/sources
 * Crée une nouvelle source
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, apiUrl, authType, authToken, headers } = body;

    if (!name || !apiUrl) {
      return NextResponse.json(
        { error: 'Nom et URL API requis' },
        { status: 400 }
      );
    }

    const normalizedUrl = apiUrl.trim().toLowerCase();

    const existing = getAllSources().find(s => s.apiUrl?.trim().toLowerCase() === normalizedUrl);
    if (existing) {
      console.log("ici")
      return NextResponse.json(
        { error: 'Source already exists' },
        { status: 409 }
      );
    }

    const newSource: Omit<AdminSource, 'id' | 'createdAt'> = {
      name,
      apiUrl,
      authType: authType || 'none',
      authToken,
      headers: headers || {}
    };

    const created = createSource(newSource);
    return NextResponse.json(created, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de la source:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la source' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/sources
 * Supprime une source
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    const success = deleteSource(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Source non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur lors de la suppression de la source:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la source' },
      { status: 500 }
    );
  }
}
