import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, roleRestriction }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roleRestriction && userRole === 'data_entry' && location.pathname !== '/backup') {
    // Redirect data_entry role users to /backup if they try to access other routes
    return <Navigate to="/backup" />;
  }

  return element;
};

export default ProtectedRoute;
