import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, loading } = useApp();

  console.log('PrivateRoute - isLoggedIn:', isLoggedIn, 'loading:', loading); // Debug log

  if (loading) return null; // Show loader or null while checking auth

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;