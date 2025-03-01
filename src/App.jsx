import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/index';
import Orders from './pages/Orders/index';
import Menu from './pages/Menu/index';
import Client from './pages/Client/index';
import Employees from './pages/Employees/index';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
        handle: { title: 'Dashboard' },
      },
      {
        path: '/menu',
        element: <Menu />,
        handle: { title: 'Menu' },
      },
      {
        path: '/orders',
        element: <Orders />,
        handle: { title: 'Orders' },
      },
      {
        path: '/client',
        element: <Client />,
        handle: { title: 'Client' },
      },
      {
        path: '/employees',
        element: <Employees />,
        handle: { title: 'Employees' },
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
