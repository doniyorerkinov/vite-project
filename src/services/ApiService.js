import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

class ApiService {
  setAuthTokens(tokens) {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  clearAuthTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Generic GET request
  async get(endpoint, config = {}) {
    try {
      const response = await apiClient.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic POST request with optional config
  async post(endpoint, data, config = {}) {
    try {
      const response = await apiClient.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic PUT request with optional config
  async put(endpoint, data, config = {}) {
    try {
      const response = await apiClient.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic PATCH request with optional config
  async patch(endpoint, data, config = {}) {
    try {
      const response = await apiClient.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error patching data at ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic DELETE request with optional config
  async delete(endpoint, config = {}) {
    try {
      const response = await apiClient.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`Error deleting data at ${endpoint}:`, error);
      throw error;
    }
  }
}

export default new ApiService();
