import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Base URL for all requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// ApiService class to encapsulate API logic
class ApiService {
  // Generic GET request
  async get(endpoint) {
    try {
      const response = await apiClient.get(endpoint);
      return response.data; // Return the full response data
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error; // Re-throw the error for handling in the component
    }
  }

  // Generic POST request
  async post(endpoint, data) {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data; // Return the newly created resource
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic PUT request
  async put(endpoint, data) {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data; // Return the updated resource
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data; // Return the deleted resource
    } catch (error) {
      console.error(`Error deleting data at ${endpoint}:`, error);
      throw error;
    }
  }
}

// Export an instance of the ApiService
export default new ApiService();
