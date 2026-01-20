const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { body?: unknown } = {}
): Promise<T> {
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
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}