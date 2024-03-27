import React, { useState } from 'react';
import './TaskForm.css';
import api from '../api/api';

function TaskForm({ onAddTask, tasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  
  // A function to check if the "To Do" limit has been reached.
  const todoLimitReached = () => {
    const todoTasks = tasks.filter(task => task.status === 'To Do').length;
    console.log(todoTasks, tasks)
    return todoTasks > 0 ? todoTasks >= tasks.length / 2 : false
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Prevent form submission if the "To Do" limit is reached and the status is "To Do".
    if (status === 'To Do' && todoLimitReached()) {
      alert("Cannot create more 'To Do' tasks because they are 50% or more of total tasks.");
      return;
    }

    try {
      const response = await api.createTask({ title, description, status });
      onAddTask(response.data);
      setTitle('');
      setDescription('');
      setStatus('To Do');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        disabled={status === 'To Do' && todoLimitReached()} // Disable the dropdown if limit is reached
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" disabled={status === 'To Do' && todoLimitReached()}>Add Task</button>
    </form>
  );
}

export default TaskForm;
