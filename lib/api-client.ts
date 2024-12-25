import axios from 'axios';
import { config } from './config';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth header for Instagram API requests
apiClient.interceptors.request.use((config) => {
  if (config.url?.includes('instagram')) {
    config.headers['Authorization'] = `Bearer ${config.instagram.accessToken}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;