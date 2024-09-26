import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './AuthContext'; // Ensure the path is correct
import App from './App';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
