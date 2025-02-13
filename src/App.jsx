import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Layout from './layout/Layout';
import TodoList from './pages/Todos/TodoList';
import TodoDetail from './pages/Todos/TodoDetail';
import Login from './pages/Login';
import Dashboard from './pages/index';
import PrivateRoute from './components/PrivateRoute';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <Routes>
            {/* Public login page */}
            <Route path="/login" element={<Login />} />

            {/* Redirect root path ("/") to "/dashboard" */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            {/* Protected routes */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" index element={<Dashboard />} />
                      <Route path="/todos" element={<TodoList />} />
                      <Route path="/todo/:id" element={<TodoDetail />} />
                      {/* Additional protected routes can be added here */}
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;