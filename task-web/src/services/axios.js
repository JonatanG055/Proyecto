import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // La URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
