/** This module contains a component for showing logout functionality. */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

/** This logout function handles the logout functionality in order to be loggedout. */
const Logout = () => {
  const [IsSignedIn, setIsSignedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    if (IsSignedIn === true) {
      setIsSignedIn(false);
      navigate('/');
    }
  }, [IsSignedIn, navigate]);
};

export default Logout;
