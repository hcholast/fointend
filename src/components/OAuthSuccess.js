import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuthSuccess({ setAuth }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Set the user as authenticated
      setAuth(true);

      // Redirect to home page or wherever you want after success
      navigate('/home');
    } else {
      // Handle missing token or invalid login attempt
      navigate('/login');
    }
  }, [location, setAuth, navigate]);

  return (
    <div>
      <h2>Authenticating...</h2>
    </div>
  );
}

export default OAuthSuccess;
