import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, restrictedForSuperadmin = [] }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
  const location = useLocation();

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }

  if (userRole === 'superadmin') {
    // Redirect superadmin to /backup if the route is restricted
    if (restrictedForSuperadmin.includes(location.pathname)) {
      return <Navigate to="/backup" />;
    }
    return element; // Allow access for superadmin if not restricted
  }

  if (userRole !== 'superadmin') {
    // Redirect non-superadmin users to /backup only when accessing /home
    if (location.pathname === '/home' || location.pathname === '/analysis' ) {
      return <Navigate to="/backup" />;
    }
  }

  // Allow access to the route if none of the above conditions apply
  return element;
};

export default ProtectedRoute;
