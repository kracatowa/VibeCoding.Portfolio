import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/admin/test-source
 * 
 * Teste la connexion à une source API REST avant de la sauvegarder
 */
export async function POST(request: NextRequest) {
  try {
    const { apiUrl, authType, authToken, headers = {} } = await request.json();

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'URL API requise' },
        { status: 400 }
      );
    }

    // Prépare les headers
    const fetchHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    };

    // Ajoute l'authentification si nécessaire
    if (authType === 'bearer' && authToken) {
      fetchHeaders['Authorization'] = `Bearer ${authToken}`;
    } else if (authType === 'apikey' && authToken) {
      fetchHeaders['X-API-Key'] = authToken;
    }

    // Test de la connexion
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: fetchHeaders
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Erreur HTTP ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Vérifie que c'est du JSON
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'La réponse n\'est pas du JSON' },
        { status: 400 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      preview: data,
      status: response.status
    });

  } catch (error) {
    console.error('Erreur lors du test de connexion:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Erreur lors du test de connexion',
        success: false
      },
      { status: 500 }
    );
  }
}
