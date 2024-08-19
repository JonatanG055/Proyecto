// src/axios.ts

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esta URL si tu API está en otro puerto o dominio
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;
