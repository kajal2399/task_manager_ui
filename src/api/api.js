import axios from 'axios';

const API_BASE_URL = 'https://task-manager-api-5jam.onrender.com';
const api = {
  fetchTasks: () => axios.get(`${API_BASE_URL}/tasks`),
  createTask: (task) => axios.post(`${API_BASE_URL}/tasks`, task),
  updateTask: (id, task) => axios.put(`${API_BASE_URL}/tasks/${id}`, task),
  deleteTask: (id) => axios.delete(`${API_BASE_URL}/tasks/${id}`)
};

export default api;
