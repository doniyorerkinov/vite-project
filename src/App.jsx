import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Layout from './layout/Layout';
import TodoList from './pages/Todos/TodoList';
import TodoDetail from './pages/Todos/TodoDetail';
import Login from './pages/Login';
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

            {/* Protected routes */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<TodoList />} />
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
