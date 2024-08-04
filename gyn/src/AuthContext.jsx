import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Retrieved token from localStorage:', token);
    if (token) {
      try {
        const actualToken = token.replace('Bearer ', ''); // Remove the Bearer prefix for decoding
        const decodedToken = jwtDecode(actualToken);
        console.log('Decoded token:', decodedToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log('Token expired');
          localStorage.removeItem('authToken');
          setAuth(null);
        } else {
          console.log('Token valid');
          setAuth(true); // Store the token with Bearer prefix for authentication
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authToken');
        setAuth(null);
      }
    }
  }, []);

  const login = (token) => {
    console.log('Setting authToken in localStorage:', `Bearer ${token}`);
    localStorage.setItem('authToken', `Bearer ${token}`);
    setAuth(true);
  };

  const logout = () => {
    console.log('Removing authToken from localStorage');
    localStorage.removeItem('authToken');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
