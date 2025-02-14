import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // You can also use a context hook to get user if desired:
  // const { user } = useContext(AuthContext);
  const storedUser = localStorage.getItem('user');

  return children;
};

export default PrivateRoute;
