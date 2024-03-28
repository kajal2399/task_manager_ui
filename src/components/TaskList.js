// TaskList.js

import React, { useState } from 'react';
import api from '../api/api'; // Adjust the relative path if necessary
import Button from '@mui/material/Button';
function TaskList({ tasks, onTasksChange }) {
  const [filter, setFilter] = useState('All');
  const [statusUpdates, setStatusUpdates] = useState({});
  const handleUpdate = async (newStatus, task) => {
    setStatusUpdates(prevStatuses => ({
      ...prevStatuses,
      [task.id]: newStatus
    }));
    
    try {
      await api.updateTask(task.id, {
        "title": task.title,
        "description": task.description,
        "status": newStatus
      });
      onTasksChange(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      onTasksChange(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <>
      {/* Dropdown for selecting the task status filter */}
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {/* Task list that renders filtered tasks */}
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            {task.title} - <select
              value={statusUpdates[task.id] || task.status}
              onChange={e => handleUpdate(e.target.value, task)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <Button variant="contained" color='success' onClick={() => handleDelete(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
