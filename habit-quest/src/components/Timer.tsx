import React from 'react';

export function Timer({
    time,
    isActive,
    onStart,
    onPause,
    onReset,
}: {
    time: string;
    isActive: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}) {
    return (
        <div className="timer-section">
            <svg
                width="120"
                height="120"
                style={{
                    transform: 'rotate(-90deg)',
                    margin: '0 auto 12px',
                }}
            >
                <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                />
                <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="url(#timerGradient)"
                    strokeWidth="3"
                    strokeDasharray={`${(1500 - parseInt(time.split(':')[0]) * 60 - parseInt(time.split(':')[1])) / 25} 345.6`}
                    style={{
                        transition: 'stroke-dasharray 1s linear',
                        strokeLinecap: 'round',
                    }}
                />
                <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="timer-display">{time}</div>
            <div className="timer-label">Focus Session → +25 XP</div>
            <div className="timer-controls">
                {!isActive ? (
                    <button className="btn btn-primary" onClick={onStart}>
                        Start
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={onPause}>
                        Pause
                    </button>
                )}
                <button className="btn btn-secondary" onClick={onReset}>
                    Reset
                </button>
            </div>
        </div>
    );
}
