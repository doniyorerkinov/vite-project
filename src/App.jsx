import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import TodoList from './pages/Todos/TodoList';
import TodoDetail from './pages/Todos/TodoDetail';
import Login from './pages/Login';
import Dashboard from './pages/index';
import Orders from './pages/Orders/index';

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
        handle: { title: "Dashboard" },
      },
      {
        path: '/todos',
        element: <TodoList />,
        handle: { title: "Todos" },
      },
      {
        path: '/todo/:id',
        element: <TodoDetail />,
        handle: { title: "Todo Detail" },
      },
      {
        path: '/orders',
        element: <Orders />,
        handle: { title: "Orders" },
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
