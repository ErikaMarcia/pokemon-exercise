import { useEffect, useState } from 'react';
import { Pokemon } from '@/lib/types';

type DetailResult<T = Pokemon> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function usePokemonDetail<T = Pokemon>(id?: number): DetailResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id));
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!id) return;
  let cancelled = false;

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const r = await fetch(`/api/proxy/pokemon/${id}`);
      if (!r.ok) throw new Error('Failed to load');
      const json = await r.json();
      if (!cancelled) setData(json as T);
    } catch (e) {
      if (!cancelled) setError((e as Error)?.message ?? 'Error');
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  fetchPokemon();

  return () => {
    cancelled = true;
  };
}, [id]);


  return { data, loading, error };
}
