import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the hamburger menu

function Navbar({ isAuth, setAuth }) {
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/home');
  };

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 border-b border-gray-600 ${
        openNavigation ? 'bg-gray-800' : 'bg-gray-800/70 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/home" className="text-white text-xl font-bold hover:text-gray-300 transition duration-200">
          SmartChat AI
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6">
          {isAuth ? (
            <>
              <Link to="/home" className="text-gray-300 py-3 hover:text-white transition duration-200">
                Home
              </Link>
              <Link to="/chats" className="text-gray-300 py-3 hover:text-white transition duration-200">
                Chats
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/home" className="text-gray-300 hover:text-white transition duration-200">
                Home
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-white transition duration-200">
                Login
              </Link>
              <Link to="/register" className="text-gray-300 hover:text-white transition duration-200">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="lg:hidden text-white text-2xl" onClick={toggleNavigation}>
          {openNavigation ? null : <FaBars />}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 transform ${
          openNavigation ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40`}
      >
        <div className="flex justify-between p-4">
          <h2 className="text-white text-2xl font-bold">Menu</h2>
          {/* X button to close the mobile menu */}
          <button onClick={toggleNavigation} className="text-white text-3xl">
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link to="/home" onClick={toggleNavigation} className="text-white text-xl">
            Home
          </Link>
          {isAuth ? (
            <>
              <Link to="/home" onClick={toggleNavigation} className="text-white text-xl">
                Home
              </Link>
              <Link to="/chats" onClick={toggleNavigation} className="text-white text-xl">
                Chats
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleNavigation();
                }}
                className="bg-blue-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/home" onClick={toggleNavigation} className="text-white text-xl">
                Home
              </Link>
              <Link to="/login" onClick={toggleNavigation} className="text-white text-xl">
                Login
              </Link>
              <Link to="/register" onClick={toggleNavigation} className="text-white text-xl">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
