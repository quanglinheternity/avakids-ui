import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/avakids/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refreshToken');
      const isAuthPath = originalRequest.url?.includes('/auth/login') || 
                         originalRequest.url?.includes('/auth/register') || 
                         originalRequest.url?.includes('/users/create');

      if (refreshToken && !isAuthPath) {
        try {
          // Attempt to refresh token
          // Note: Adjust the endpoint as per your backend API
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken: refreshToken,
          });

          if (response.status === 200) {
            const { token, refreshToken: newRefreshToken } = response.data;
            
            // Save new tokens
            Cookies.set('token', token, { expires: 7 });
            if (newRefreshToken) {
              Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
            }

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, clear cookies and redirect to login
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else if (!isAuthPath) {
        // No refresh token available, redirect to login
        Cookies.remove('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
