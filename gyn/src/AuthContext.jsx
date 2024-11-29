import React, { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const login = (token, role, userId) => {
    localStorage.setItem('token', token);       
    localStorage.setItem('role', role);        
    localStorage.setItem('userId', userId);     
  };

  const logout = () => {
    localStorage.removeItem('token');            
    localStorage.removeItem('role');            
    localStorage.removeItem('userId');        
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
