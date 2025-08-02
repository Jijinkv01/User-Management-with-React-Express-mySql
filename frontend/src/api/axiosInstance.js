import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor: auto-refresh on 401/403
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axisInstance.post('/refresh');
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);

        // Retry the original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axisInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem('token');
        window.location.href = "/login"; // Or use navigate if in React
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
