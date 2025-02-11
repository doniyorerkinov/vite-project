import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // You can also use a context hook to get user if desired:
  // const { user } = useContext(AuthContext);
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    // If no user found, redirect to login page.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
