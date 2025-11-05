import React from 'react';

export default function Loading() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <div className="spinner" style={{ margin: '0 auto 12px', width: 36, height: 36, borderRadius: 18, background: 'linear-gradient(90deg,#6b6bff,#9b8cff)' }} />
      <div>Carregando...</div>
    </div>
  );
}
