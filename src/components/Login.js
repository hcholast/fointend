import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Disable scrolling for the entire page
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable page scrolling
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling on unmount
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login endpoint with the username and password
      const response = await axios.post('http://chats-d3hvf0cwgdb2dggr.westeurope-01.azurewebsites.net/login', { username, password });

      // If the login is successful, store the JWT token in localStorage
      localStorage.setItem('token', response.data.access_token);

      // Update the authentication state
      setAuth(true);

      // Redirect the user to the chats page
      navigate('/chats');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials'); // Show an alert if the credentials are invalid
    }
  };

  // Handle Google OAuth login
  function handleGoogleLogin() {
    window.location.href = "http://chats-d3hvf0cwgdb2dggr.westeurope-01.azurewebsites.net/auth/google";
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mb-4 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-white mb-2">Or</p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
