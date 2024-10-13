import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for token in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      // Optionally decode the token to get user data if it's a JWT
      const decodedUser = JSON.parse(atob(storedToken.split('.')[1]));
      setUser(decodedUser);
    }
  }, []);

  const login = (userData, token) => {
    
    setIsLoggedIn(true);
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData)) // Store the token in local storage
    // Optional: Set a timeout to automatically log out the user after 1 hour
    setTimeout(() => {
      logout();
    }, 3600000); // 1 hour
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // Remove the token from local storage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy access to the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};