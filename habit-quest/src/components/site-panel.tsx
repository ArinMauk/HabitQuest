import React, { useState } from 'react';

interface Site {
  domain: string;
  favicon?: string;
}

export function SitePanel({
  title,
  type,
  sites,
  onAdd,
  onRemove,
}: {
  title: string;
  type: 'productive' | 'distraction';
  sites: Site[];
  onAdd: (domain: string, type: 'productive' | 'distraction') => void;
  onRemove: (domain: string, type: 'productive' | 'distraction') => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    onAdd(inputValue.trim(), type);
    setInputValue('');
  };

  return (
    <div style={{
      backgroundColor: '#2a2a2a',
      border: '1px solid #404040',
      borderRadius: '8px',
      padding: '16px',
    }}>
      <div style={{
        fontWeight: '600',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: type === 'productive' ? '#22c55e' : '#ef4444',
      }}>
        {type === 'productive' ? '✅' : '❌'} {title}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '12px',
        maxHeight: '150px',
        overflowY: 'auto',
      }}>
        {sites.map((site) => (
          <div key={site.domain} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#b0b0b0',
          }}>
            {site.favicon && (
              <img
                src={site.favicon || "/placeholder.svg"}
                alt=""
                style={{ width: '16px', height: '16px', borderRadius: '2px' }}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
            <span style={{ flex: 1, wordBreak: 'break-all' }}>{site.domain}</span>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#b0b0b0',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '0',
                transition: 'color 0.2s ease',
              }}
              onClick={() => onRemove(site.domain, type)}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#b0b0b0')}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder={`Add ${type === 'productive' ? 'productive' : 'distracting'} site...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #404040',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
            fontFamily: 'inherit',
            fontSize: '13px',
            transition: 'all 0.2s ease',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#ef4444';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#404040';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '13px',
            backgroundColor: '#ef4444',
            color: 'white',
          }}
          onClick={handleAdd}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
        >
          + Add
        </button>
      </div>
    </div>
  );
}
