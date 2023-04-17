import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
