import React from 'react';

interface Task {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  xp: number;
  xpMax: number;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="task-list">
      {sortedTasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af', fontSize: '14px' }}>
          No tasks yet. Add one to get started!
        </div>
      ) : (
        sortedTasks.map((task) => (
          <div key={task.id} className="task-card">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <div className="task-info">
              <div className="task-name" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.name}
              </div>
              <div className="task-streak">
                {task.streak > 0 && (
                  <>
                    🔥 {task.streak} day streak
                  </>
                )}
              </div>
              <div className="xp-bar">
                <div
                  className="xp-bar-fill"
                  style={{ width: `${(task.xp / task.xpMax) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                fontSize: '18px',
              }}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );
}
