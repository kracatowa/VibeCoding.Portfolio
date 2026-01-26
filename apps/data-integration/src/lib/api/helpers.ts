/**
 * Helpers partagés pour les appels API
 */

/**
 * Prépare les options de fetch en sérialisant le body JSON et en ajoutant les headers par défaut
 */
export function prepareFetchInit(init: Omit<RequestInit, 'body'> & { body?: unknown } = {}): RequestInit {
  return {
    ...init,
    body: (init.body && typeof init.body !== 'string' ? JSON.stringify(init.body) : init.body) as BodyInit | null | undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  };
}

/**
 * Émet un événement `network-error` sur `window` (côté client uniquement)
 */
export function emitNetworkError(message: string): void {
  try {
    window.dispatchEvent(new CustomEvent('network-error', { detail: { message } }));
  } catch (e) {
    // Ignore en environnement serveur
  }
}
