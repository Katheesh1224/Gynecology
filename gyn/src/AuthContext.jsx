import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const AuthContext = createContext();

// Create Provider Component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem('token');
    if (token) {
      // Perform token validation if needed
      setAuth(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
