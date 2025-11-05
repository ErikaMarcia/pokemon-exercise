import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>404 — Não encontrado</h1>
      <p>Ops — a página que você procura não existe.</p>
      <p><Link href="/">Voltar para a listagem</Link></p>
    </div>
  );
}
