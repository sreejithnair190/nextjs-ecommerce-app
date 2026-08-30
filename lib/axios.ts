import axios from 'axios';

// Creating a basic Axios instance. 
// Using '/api' as the base URL since all API routes will be within this Next.js app.
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // You can also define a timeout here if desired
  // timeout: 10000, 
});

// Optional: Add request interceptors (e.g., for attaching auth tokens)
api.interceptors.request.use(
  (config) => {
    // Modify config before sending the request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors (e.g., for handling global errors like 401s)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You can handle global errors here
    return Promise.reject(error);
  }
);

export default api;
