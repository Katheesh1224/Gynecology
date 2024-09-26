
// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute; // Ensure default export
