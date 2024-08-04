import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);
  console.log('ProtectedRoute auth state:', auth);

  if (!auth) {
    console.log('No auth token, redirecting to login');
    return <Navigate to='/login' />;
  }

  console.log('Auth token found, rendering Outlet');
  return <Outlet />;
};

export default ProtectedRoute;
