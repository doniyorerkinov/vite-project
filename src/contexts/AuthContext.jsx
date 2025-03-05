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
      return await ApiService.post(`/accounts/access-token/`, {
        phone_number,
        password,
      })
        .then((res) => {
          // ✅ Use optional chaining to safely access `accessToken`
          setUser(res);
          localStorage.setItem('access_token', res?.access);
          localStorage.setItem('refresh_token', res?.refresh);
          localStorage.setItem('user', JSON.stringify(res?.user_data));
          return res;
        })
        .catch((error) => {
          throw new Error(`Login failed: ${error || error.statusText}`);
        });
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
