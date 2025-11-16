import React, { useState, useEffect } from "react";
import { Timer } from "../components/Timer";
import { useAppState } from "../context/AppContext";

export function PomodoroTab() {
    const { state, updateState } = useAppState();
    const { tasks } = state;
    const [timerActive, setTimerActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(25 * 60);
    const [newTaskName, setNewTaskName] = useState("");
    const estimatedTime = tasks.length * 25;
    const completedCount = tasks.filter((t) => t.completed).length;

    useEffect(() => {
        if (!timerActive || timeRemaining <= 0) return;

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setTimerActive(false);
                    playNotificationSound();
                    if (Notification.permission === "granted") {
                        new Notification("Pomodoro Complete!", {
                            body: "Great work! Take a break.",
                            icon: "/icon.png",
                        });
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive, timeRemaining, tasks]);

    const playNotificationSound = () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    };

    const handleAddTask = () => {
        if (!newTaskName.trim()) return;
        updateState((prev) => ({
            ...prev,
            tasks: [
                ...prev.tasks,
                { id: Date.now().toString(), name: newTaskName, completed: false },
            ],
        }));
        setNewTaskName("");
    };

    const handleToggleTask = (id: string) => {
        updateState((prev) => ({
            ...prev,
            tasks: prev.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ),
        }));
    };

    const handleDeleteTask = (id: string) => {
        updateState((prev) => ({
            ...prev,
            tasks: prev.tasks.filter((task) => task.id !== id),
        }));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1a1a1a', padding: '24px' }}>
            {/* Stats Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>
                        {estimatedTime}m
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Estimated Time</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>
                        {tasks.length}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Tasks to be Completed</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>
                        {formatTime(timeRemaining)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Elapsed Time</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>
                        {completedCount}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Completed Tasks</div>
                </div>
            </div>

            {/* Task Input */}
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '18px', color: '#6b7280' }}>+</div>
                <input
                    type="text"
                    placeholder="Add a task to &quot;Tasks&quot;, press Enter to save"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #374151',
                        color: '#ffffff',
                        fontSize: '14px',
                        padding: '8px 0',
                        outline: 'none',
                    }}
                />
            </div>

            {/* Tasks or Empty State */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                {tasks.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '80px', marginBottom: '16px', opacity: 0.5 }}>📋</div>
                        <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '4px' }}>No Task</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Click the input box above to add a new task</div>
                    </div>
                ) : (
                    <div style={{ width: '100%' }}>
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px',
                                    marginBottom: '8px',
                                    backgroundColor: '#252525',
                                    borderRadius: '6px',
                                    borderLeft: `3px solid ${task.completed ? '#10b981' : '#ef4444'}`,
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task.id)}
                                    style={{ marginRight: '12px', cursor: 'pointer' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            color: task.completed ? '#6b7280' : '#ffffff',
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {task.name}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#6b7280',
                                        fontSize: '18px',
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Timer Controls at Bottom */}
            <Timer
                time={formatTime(timeRemaining)}
                isActive={timerActive}
                onStart={() => setTimerActive(true)}
                onPause={() => setTimerActive(false)}
                onReset={() => setTimeRemaining(25 * 60)}
            />
        </div>
    );
}
