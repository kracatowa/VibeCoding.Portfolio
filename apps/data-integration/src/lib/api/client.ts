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

class ClientError extends Error {
  isClientError = true;
}

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
      const status = res.status;
      // Do not treat 4xx client errors (validation/conflict) as network errors.
      if (status >= 400 && status < 500 && ![408, 429].includes(status)) {
        let msg = `Erreur d'API ${status}`;
        try {
          const body = await res.json();
          msg = body?.error || body?.message || msg;
        } catch {
          // JSON parsing failed, use default message
        }
        throw new ClientError(msg);
      }
      emitNetworkError(`Erreur d'API ${res.status}`);
      throw new Error(`Erreur d'API ${res.status}`);
    }

    return res.json();
  } catch (err) {
    // Don't dispatch network-error for client (4xx) errors
    if (err instanceof ClientError) {
      throw err;
    }

    const message = err instanceof Error ? err.message : String(err);
    emitNetworkError(message);
    throw err;
  }
}