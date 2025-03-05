import React, { createContext, useState } from 'react';
import ApiService from '../services/ApiService';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const login = async (phone_number, password) => {
    try {
      const res = await ApiService.post(`/accounts/access-token/`, {
        phone_number,
        password,
      });

      if (!res.ok) {
        // ✅ Handle HTTP errors (like 401 Unauthorized)
        const errorText = await res.text();
        throw new Error(`Login failed: ${errorText || res.statusText}`);
      }

      const data = await res.json();

      if (data?.accessToken) {
        // ✅ Use optional chaining to safely access `accessToken`
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      } else {
        throw new Error('Invalid login response: No access token provided');
      }
    } catch (error) {
      console.error('Login error:', error.message || error);
      throw error; // ✅ Ensure calling function can catch the error
    }
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Optionally, call an API endpoint to log out on the server side
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
