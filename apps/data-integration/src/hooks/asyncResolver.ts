import { useEffect, useState } from 'react';

interface UseAsyncDataOptions<T> {
  fetcher: () => T | Promise<T>;
  dependencies?: React.DependencyList;
}

export function useAsyncData<T>({ fetcher, dependencies = [] }: UseAsyncDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await Promise.resolve(fetcher());
        if (mounted) setData(result);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}