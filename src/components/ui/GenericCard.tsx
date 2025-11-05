import React from 'react';

export interface GenericCardProps<T> {
  data: T;
  renderContent: (item: T) => React.ReactNode;
  onClick?: (item: T) => void;
  className?: string;
}

export function GenericCard<T>({ data, renderContent, onClick, className }: GenericCardProps<T>) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={() => onClick?.(data)}
      onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) onClick(data); }}
      className={`generic-card ${className ?? ''}`}
      style={{
        borderRadius: 8,
        padding: 10,
        background: '#fff',
        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {renderContent(data)}
    </div>
  );
}
