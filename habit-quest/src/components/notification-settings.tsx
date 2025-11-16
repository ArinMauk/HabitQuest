import React from 'react';

export function NotificationSettings({
  notifyOnLoss,
  notifyOnGain,
  lossThreshold,
  gainThreshold,
  onToggleLoss,
  onToggleGain,
  onChangeLossThreshold,
  onChangeGainThreshold,
}: {
  notifyOnLoss: boolean;
  notifyOnGain: boolean;
  lossThreshold: number;
  gainThreshold: number;
  onToggleLoss: () => void;
  onToggleGain: () => void;
  onChangeLossThreshold: (value: number) => void;
  onChangeGainThreshold: (value: number) => void;
}) {
  return (
    <div style={{
      backgroundColor: '#2a2a2a',
      border: '1px solid #404040',
      borderRadius: '8px',
      padding: '16px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        fontSize: '13px',
      }}>
        <span>Notify on coin loss</span>
        <button
          style={{
            width: '40px',
            height: '24px',
            backgroundColor: notifyOnLoss ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            border: '1px solid #ef4444',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
          onClick={onToggleLoss}
        >
          <div
            style={{
              position: 'absolute',
              width: '18px',
              height: '18px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              top: '2px',
              left: notifyOnLoss ? '18px' : '2px',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
      </div>

      {notifyOnLoss && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', marginBottom: '8px' }}>
            Threshold: {lossThreshold} coins
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={lossThreshold}
            onChange={(e) => onChangeLossThreshold(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              outline: 'none',
              WebkitAppearance: 'none',
              appearance: 'none',
              cursor: 'pointer',
            }}
          />
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        fontSize: '13px',
      }}>
        <span>Notify on coin gain</span>
        <button
          style={{
            width: '40px',
            height: '24px',
            backgroundColor: notifyOnGain ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            border: '1px solid #ef4444',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
          onClick={onToggleGain}
        >
          <div
            style={{
              position: 'absolute',
              width: '18px',
              height: '18px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              top: '2px',
              left: notifyOnGain ? '18px' : '2px',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
      </div>

      {notifyOnGain && (
        <div>
          <div style={{ fontSize: '13px', marginBottom: '8px' }}>
            Threshold: {gainThreshold} coins
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={gainThreshold}
            onChange={(e) => onChangeGainThreshold(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              outline: 'none',
              WebkitAppearance: 'none',
              appearance: 'none',
              cursor: 'pointer',
            }}
          />
        </div>
      )}
    </div>
  );
}
