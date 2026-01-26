import { NextResponse } from 'next/server';

type AuthType = 'none' | 'bearer' | 'apikey';

/**
 * Development-only mock responder for `mock://` URLs.
 * Returns a NextResponse when the URL is a mock and NODE_ENV is 'development', otherwise null.
 *
 * Mock tokens supported (for local testing):
 * - API key: 'valid-api-key' => 200 OK
 * - Bearer: 'valid-bearer-token' => 200 OK
 */
export function handleMockTest(opts: { apiUrl: unknown; authType?: AuthType; authToken?: string; headers?: Record<string, string> }): NextResponse | null {
  const { apiUrl, authType = 'none', authToken } = opts;
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev || typeof apiUrl !== 'string' || !apiUrl.startsWith('http://mock')) {
    return null;
  }

  // Simple mock behavior for common auth types
  if (authType === 'apikey') {
    if (!authToken) {
      return NextResponse.json({ error: 'API key requise (mock)' }, { status: 401 });
    }

    if (authToken === 'valid-api-key') {
      return NextResponse.json({ success: true, message: 'Connexion mock réussie', preview: { items: [{ id: 1, name: 'Mock Item' }] }, status: 200 });
    }

    return NextResponse.json({ error: 'Unauthorized (mock)' }, { status: 401 });
  }

  if (authType === 'bearer') {
    if (authToken === 'valid-bearer-token') {
      return NextResponse.json({ success: true, message: 'Connexion mock réussie', preview: { user: { id: 'u1', name: 'Mock User' } }, status: 200 });
    }

    return NextResponse.json({ error: 'Unauthorized (mock)' }, { status: 401 });
  }

  // No auth required
  return NextResponse.json({ success: true, message: 'Connexion mock réussie (no auth)', preview: { hello: 'world' }, status: 200 });
}
