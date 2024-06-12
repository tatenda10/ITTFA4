import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust as necessary
});

export default api;
