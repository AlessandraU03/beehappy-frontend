// src/app/providers/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../features/authentication/services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingInit, setLoadingInit] = useState(true);

  useEffect(() => {
    const current = authService.getCurrentUser();
    setUser(current);
    setLoadingInit(false);
  }, []);


  const login = async (credentials) => {
    const u = await authService.login(credentials);
    setUser(u);
    return u;
  };

 
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      { !loadingInit && children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
