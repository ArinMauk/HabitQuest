import React from 'react';

export function CurrencyTracker({ balance }: { balance: number }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
      border: '1px solid #ef4444',
      color: '#ef4444',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Your Balance
      </div>
      <div style={{ fontSize: '36px', fontWeight: '700' }}>
        💰 {balance}
      </div>
    </div>
  );
}
