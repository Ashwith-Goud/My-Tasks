import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginState,setLoginState]=useState(false);
  const navigate = useNavigate();

  // On mount, clear auth state
  useEffect(() => {
    localStorage.removeItem('loggedInUser');  // Clear user on app load
    setUser(null);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setLoginState(true);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));  // Save user temporarily
  };

  const logout = () => {
    setUser(null);
    setLoginState(false);
    localStorage.removeItem('loggedInUser');
    navigate('/');  // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loginState ,setLoginState}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

