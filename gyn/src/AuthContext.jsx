import React, { createContext } from 'react';

// Create Context
export const AuthContext = createContext();

// Create Provider Component
export const AuthProvider = ({ children }) => {

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);  // Store role in localStorage
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');  // Remove role from localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
