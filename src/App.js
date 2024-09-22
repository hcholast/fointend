import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chats from './components/Chats';
import Navbar from './components/Navbar'; // Import the Navbar component
import LandingPage from './components/LandingPage';
import OAuthSuccess from './components/OAuthSuccess';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token')); // Check if token exists in localStorage for authentication

  return (
    <Router>
      <div>
        {/* Navbar is rendered regardless of authentication status */}
        <Navbar isAuth={isAuth} setAuth={setIsAuth} />

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <Routes>
            {/* Redirect to home if authenticated, otherwise login */}
            <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Navigate to="/login" />} />

            {/* LandingPage (home) only visible if authenticated */}
            <Route path="/home" element={<LandingPage isAuth={isAuth} setAuth={setIsAuth} />} />

            {/* Login and Register routes */}
            <Route path="/login" element={<Login setAuth={setIsAuth} />} />
            <Route path="/register" element={<Register />} />

            {/* Chats route only available when authenticated */}
            <Route path="/chats" element={isAuth ? <Chats /> : <Navigate to="/login" />} />

            {/* OAuthSuccess route to handle redirection after Google OAuth */}
            <Route path="/oauth-success" element={<OAuthSuccess setAuth={setIsAuth} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
