import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InvalidRole = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth token from local storage
    window.localStorage.removeItem('authToken');
  }, []);

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Invalid Role</h2>
      <p>Your role is not authorized to access this page.</p>
      <button onClick={handleLogin}>Login Again</button>
    </div>
  );
};

export default InvalidRole;