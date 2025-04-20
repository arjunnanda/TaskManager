import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTasks([newTask, ...tasks]);
    setTaskTitle('');
    setTaskDescription('');
  };

  const markTaskCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>📝 My Task List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Task title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Description (optional)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <button onClick={addTask} style={{ padding: '8px 16px' }}>
          ➕ Add Task
        </button>
      </div>

      <h2>📋 Current Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks added yet. Start by adding one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: task.completed ? '#e0ffe0' : '#fff',
              }}
            >
              <h3 style={{ margin: '0 0 5px' }}>{task.title}</h3>
              {task.description && <p style={{ margin: '5px 0' }}>{task.description}</p>}
              <small>Created on: {task.createdAt}</small>
              <br />
              <strong>Status:</strong> {task.completed ? '✅ Completed' : '⏳ In Progress'}
              <br />
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => markTaskCompleted(task.id)}
                  disabled={task.completed}
                  style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    cursor: task.completed ? 'not-allowed' : 'pointer',
                  }}
                >
                  ✅ Mark Completed
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#f44336', color: '#fff' }}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;
