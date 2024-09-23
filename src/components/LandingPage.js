import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRobot, FaUserFriends, FaRegSmileBeam } from 'react-icons/fa';
import { BackgroundCircles, BottomLine } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import Notification from "./design/Notification";
import Terminal from './design/Terminal'; // Import Terminal component
import Features from './design/Benefits'; // Import Terminal component

function LandingPage({ isAuth, setAuth }) {
  const navigate = useNavigate();
  const parallaxRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  return (
    <div className="relative bg-gray-900 text-gray-100 w-full min-h-screen z-10">
      {/* Add BackgroundCircles and position it similarly to the Hero component */}
      <BackgroundCircles 
        parallaxRef={parallaxRef}
        className="absolute inset-0 flex items-center justify-center z-0" 
      />

  <BottomLine />  

      <div className="container relative pt-32" ref={parallaxRef}>
        {/* Main content wrapped in a higher z-index container */}
        <div className="relative z-10 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6 text-6xl font-bold text-gray-100">
            Explore the Possibilities of&nbsp;AI&nbsp;Chatting with{" "}
            <span className="inline-block relative">
              SmartChat AI{" "}
              <img
                src={"path-to-your-curve-asset"} 
                className="absolute top-full left-0 w-full xl:-mt-2"
                alt=""
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-gray-300 lg:mb-8">
            Seamless AI-powered conversations in real-time. Your personal AI assistant is here to help, 24/7.
          </p>
          {!isAuth ? (
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300"
              >
                Login
              </Link>
            </div>
          ) : (
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Hero Image and Parallax Effects */}
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          {/* Terminal Component */}
          <div className="hidden lg:block w-full h-[500px]">
            <Terminal /> {/* Use the Terminal component */}
          </div>

          <ScrollParallax isAbsolutelyPositioned>
            <Notification
              className="hidden absolute -right-[5.5rem] bottom-[15rem] w-[18rem] xl:flex"
              title="Code generation"
            />
          </ScrollParallax>

          <ScrollParallax isAbsolutelyPositioned>
            {/* Icons moved to background with a lower z-index */}
            <ul className="absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-gray-700/60 backdrop-blur-md border border-gray-600 rounded-2xl xl:flex z-0"> 
              <li className="p-5">
                <FaRobot className="w-6 h-6 text-blue-500" />
              </li>
              <li className="p-5">
                <FaUserFriends className="w-6 h-6 text-green-500" />
              </li>
              <li className="p-5">
                <FaRegSmileBeam className="w-6 h-6 text-yellow-500" />
              </li>
            </ul>
          </ScrollParallax>

          
        </div>

        

      </div>
      <Features />


    </div>
  );
}

export default LandingPage;
