/**
 * retryableFetch
 *
 * Helper autonome pour effectuer des tentatives de nouvelle requête pour les
 * requêtes idempotentes (GET).
 * - Respecte l'en-tête `Retry-After` si présent.
 * - Utilise un backoff exponentiel avec full jitter.
 * - Émet un événement `network-error` sur `window` en cas d'échec final (côté client).
 */
import { prepareFetchInit, emitNetworkError } from './helpers';

export async function retryableFetch<R>(
  url: string,
  init: Omit<RequestInit, 'body'> & { body?: unknown } = {},
  attempts = 3,
  baseDelay = 300
): Promise<R> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, prepareFetchInit(init));

      if (res.ok) return res.json();

      const status = res.status;
      // Retryable statuses (network/timeouts/server-side transient)
      const retryable = [408, 429, 500, 502, 503, 504].includes(status);

      // Non-retryable client errors (409 conflict, validation errors, etc.)
      const isClientError = status >= 400 && status < 500 && ![408, 429].includes(status);

      if (isClientError || attempt === attempts || !retryable) {
        // For client errors (ex: 409) surface server message when possible
        if (isClientError) {
          try {
            const body = await res.json();
            const msg = body?.error || body?.message || JSON.stringify(body);
            const e = new Error(`Erreur d'API ${status}: ${msg}`);
            (e as any).isClientError = true;
            throw e;
          } catch (parseErr) {
            // Fallback to generic message if parsing fails
            const e = new Error(`Erreur d'API ${status}`);
            (e as any).isClientError = true;
            throw e;
          }
        }

        emitNetworkError(`Erreur d'API ${status}`);
        throw new Error(`Erreur d'API ${status}`);
      }

      // compute delay (respect Retry-After if present)
      let delay = baseDelay * Math.pow(2, attempt - 1);
      const ra = res.headers.get('retry-after');
      if (ra) {
        const seconds = Number(ra);
        if (!Number.isNaN(seconds)) delay = seconds * 1000;
        else {
          const t = Date.parse(ra);
          if (!Number.isNaN(t)) delay = Math.max(0, t - Date.now());
        }
      }

      // full jitter
      const jitter = Math.random() * delay;
      await new Promise((r) => setTimeout(r, jitter));
      continue;
    } catch (err) {
      if (attempt === attempts) {
        const message = err instanceof Error ? err.message : String(err);
        // Do not emit network error for client-side (4xx) errors
        if (err instanceof Error && (err as any).isClientError) {
          throw err;
        }

        emitNetworkError(message);
        throw err;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      const jitter = Math.random() * delay;
      await new Promise((r) => setTimeout(r, jitter));
      continue;
    }
  }

  throw new Error('retryableFetch: exhausted attempts');
}
