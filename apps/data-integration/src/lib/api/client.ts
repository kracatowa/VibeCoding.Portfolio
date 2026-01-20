/**
 * apiFetch - petit wrapper fetch
 *
 * - Sérialise `init.body` en JSON et force `Content-Type: application/json`.
 * - Émet un événement `network-error` (window) sur erreur réseau/HTTP.
 * - Rejette l'erreur pour que l'appelant la gère.
 *
 * Note: dispatch sur `window` uniquement côté client.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { body?: unknown } = {}
): Promise<T> {
  try {
    const res = await fetch(`${base}${path}`, {
      ...init,
      body:
        init.body && typeof init.body !== 'string'
          ? JSON.stringify(init.body)
          : init.body,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      }
    });

    if (!res.ok) {
      // Emit a network-error event for server error statuses
      try {
        window.dispatchEvent(new CustomEvent('network-error', { detail: { message: `API error ${res.status}` } }));
      } catch (e) {
        // ignore in non-browser environments
      }
      throw new Error(`API error ${res.status}`);
    }

    return res.json();
  } catch (err) {
    // Network-level failures (DNS, offline, CORS, etc.)
    try {
      const message = err instanceof Error ? err.message : String(err);
      window.dispatchEvent(new CustomEvent('network-error', { detail: { message } }));
    } catch (e) {
      // ignore
    }
    throw err;
  }
}