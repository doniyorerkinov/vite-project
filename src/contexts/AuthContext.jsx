import React, { createContext, useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to perform login (using dummyjson API)
  const login = async (phone_number, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/accounts/access-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number,
          password,
        }),
        credentials: 'include',
      });
      const data = await res.json();

      // Check for a token or similar property in the response
      if (data && data.accessToken) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      } else {
        throw new Error('Invalid login');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

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
