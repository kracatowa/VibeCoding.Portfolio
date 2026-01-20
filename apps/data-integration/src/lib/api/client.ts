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
import { retryableFetch } from './retryableFetch';
import { prepareFetchInit, emitNetworkError } from './helpers';

export async function apiFetch<T>(
  path: string,
  init?: Omit<RequestInit, 'body'> & { body?: unknown }
): Promise<T> {
  const options = init ?? {};
  const method = (options.method ?? 'GET').toString().toUpperCase();
  const isGet = method === 'GET';

  if (isGet) return retryableFetch<T>(`${base}${path}`, options);

  // Non-GET: single attempt
  try {
    const res = await fetch(`${base}${path}`, prepareFetchInit(options));

    if (!res.ok) {
      emitNetworkError(`Erreur d'API ${res.status}`);
      throw new Error(`Erreur d'API ${res.status}`);
    }

    return res.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    emitNetworkError(message);
    throw err;
  }
}