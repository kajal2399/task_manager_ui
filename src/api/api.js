import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';
const api = {
  fetchTasks: () => axios.get(`${API_BASE_URL}/tasks`),
  createTask: (task) => axios.post(`${API_BASE_URL}/tasks`, task),
  updateTask: (id, task) => axios.put(`${API_BASE_URL}/tasks/${id}`, task),
  deleteTask: (id) => axios.delete(`${API_BASE_URL}/tasks/${id}`)
};

export default api;
