import React from 'react';
import { PokemonType } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';

type Props = {
  type: PokemonType;
  className?: string;
};

export default function TypeBadge({ type, className }: Props) {
  const color = TYPE_COLORS[type] ?? '#777';
  return (
    <span
      className={className}
      style={{
        background: color,
        color: '#fff',
        padding: '4px 8px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'capitalize',
        marginRight: 6
      }}
    >
      {type}
    </span>
  );
}
