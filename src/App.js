import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import api from './api/api';
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.fetchTasks();
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTasksChange = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} tasks={tasks} />
      <TaskList tasks={tasks} onTasksChange={handleTasksChange} />
    </div>
  );
}

export default App;
