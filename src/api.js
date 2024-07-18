import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Update with your json-server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
