// src/app/providers/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../features/authentication/services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loadingInit, setLoadingInit] = useState(true);

  useEffect(() => {
    const current = authService.getCurrentUsuario();
    // getCurrentUsuario now returns just the username string, so set it directly
    setUsuario(current);
    setLoadingInit(false);
  }, []);

  const login = async (credentials) => {
    const userObject = await authService.login(credentials); // This will now be { usuario: "ale" }
    console.log('Usuario seteado en contexto:', userObject.usuario); // <-- CHANGE HERE
    setUsuario(userObject.usuario); // <-- CHANGE HERE: Set the actual username string
    return userObject.usuario; // Return the username string
  };

  const logout = async () => {
    await authService.logout();
    setUsuario(null);
  };

  const isAuthenticated = Boolean(usuario); // This will now be true if usuario is not null

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
      { !loadingInit && children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}