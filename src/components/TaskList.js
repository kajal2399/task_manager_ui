// TaskList.js

import React, { useState } from 'react';
import api from '../api/api'; // Adjust the relative path if necessary

function TaskList({ tasks, onTasksChange }) {
  // State for tracking the current filter
  const [filter, setFilter] = useState('All');

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      onTasksChange(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Filter tasks based on the selected status
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
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
