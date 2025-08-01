
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { validateAndRefreshToken } from './api_service';

const isTokenExpired = (token) => {
  // alert("Checking token expiration");
  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    return now > exp;
  } catch {
    return true;
  }
};

const SessionValidator = ({ children }) => {
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);

  const sessionTimeoutMinutes = parseInt(process.env.REACT_APP_SESSION_TIMEOUT, 10) || 10;
  const sessionTimeoutMs = sessionTimeoutMinutes * 60 * 1000;

  const logout = (message) => {
    sessionStorage.clear();
    
    // if (message) alert(message);
   
    navigate('/login' , { replace: true } );
       window.location.reload(); 
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      logout('Session expired due to inactivity.');
    }, sessionTimeoutMs);
  };

  const setupActivityListeners = () => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event =>
      window.addEventListener(event, resetInactivityTimer)
    );
    resetInactivityTimer();
  };

  const removeActivityListeners = () => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event =>
      window.removeEventListener(event, resetInactivityTimer)
    );
    clearTimeout(inactivityTimer.current);
  };

  useEffect(() => {
    const checkAndRefreshToken = async () => {
    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const loginTimeStr = sessionStorage.getItem('loginTime');

    if (!token || !refreshToken || !loginTimeStr) {
      logout('Session invalid or missing. Please login again.');
      navigate("/login");
      return;
    }

    
      try {
        
        if (isTokenExpired(token)) {
          console.log(refreshToken);
          const newToken = await validateAndRefreshToken(refreshToken);
          console.log("New Token:", newToken);
          if (!newToken) {
            logout('Session expired. Please login again.');
            return;
          }

        }

        
        // const loginTime = parseInt(loginTimeStr, 10);
        // const currentTime = Date.now();
        // if (currentTime - loginTime > sessionTimeoutMs) {
        //   logout('Session expired. Please login again.');
        //   return;
        // }

        setupActivityListeners();
      } catch (error) {
        logout('Session refresh failed. Please login again.');
      }
    };

    checkAndRefreshToken();

    return () => {
      removeActivityListeners();
    };
  }, [navigate]);

  return children;
};

export default SessionValidator;