"use client";
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Revisar si el token JWT está en el localStorage al cargar la página
    const savetoken = localStorage.getItem('token');
    const saveUser = JSON.parse(localStorage.getItem('user'));
    if (savetoken && saveUser) {
      setAuthToken(savetoken);
      setUser(saveUser);
      // Opcional: obtener datos de usuario desde la API usando el token
    }
  }, []);

  const login = (token) => {
    setAuthToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{user, token, login, logout }}>
    
      {children}
    </AuthContext.Provider>

  );
};
