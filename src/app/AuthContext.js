"use client";
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(null);

  useEffect(() => {
    // Revisar si el token JWT está en el localStorage al cargar la página
    const savetoken = localStorage.getItem('token');
    if (savetoken) {
      setAuthToken(savetoken);
      // Opcional: obtener datos de usuario desde la API usando el token
    }
  }, []);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
    
      {children}
    </AuthContext.Provider>

  );
};
