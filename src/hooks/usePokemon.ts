import { useEffect, useState } from 'react';
import { Pokemon } from '@/lib/types';

type UsePokemonResult<T = Pokemon[]> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function usePokemon<T = Pokemon[]>(fetcher: () => Promise<T>): UsePokemonResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      setData(res);
    } catch (err: unknown ) {
      setError((err as Error).message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { data, loading, error, refetch: load };
}
