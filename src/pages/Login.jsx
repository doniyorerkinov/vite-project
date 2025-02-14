import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { LoaderPinwheel } from 'lucide-react';
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);

  // For demonstration, you can hardcode credentials or create input fields.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Here you can pass user-entered username and password
      await login('emilys', 'emilyspass');
      // Redirect to the main page upon successful login
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex justify-center items-center"
          disabled={loading} // Disable button during loading
        >
          {/* Conditionally render LoaderPinwheel */}
          {loading ? <LoaderPinwheel className="animate-spin" /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
