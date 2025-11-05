import React from 'react';
import PokemonCard from './PokemonCard';
import { Pokemon } from '@/lib/types';

type Props = {
  pokemons: Pokemon[];
  emptyFallback?: React.ReactNode;
};

export default function PokemonGrid({ pokemons, emptyFallback }: Props) {
  if (!pokemons || pokemons.length === 0) {
    return <div>{emptyFallback ?? <div>Nenhum pokémon encontrado.</div>}</div>;
  }
  return (
    <div style={{
      display: 'grid',
      gap: 16,
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
    }}>
      {pokemons.map(p => <PokemonCard key={p.id} pokemon={p} />)}
    </div>
  );
}
