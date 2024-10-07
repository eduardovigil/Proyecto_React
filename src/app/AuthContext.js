"use client";
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Revisar si el token JWT está en el localStorage al cargar la página
    const savetoken = localStorage.getItem('token');
    const saveUser = localStorage.getItem('user');
    if (savetoken) {
      setAuthToken(savetoken);
      // Opcional: obtener datos de usuario desde la API usando el token
    }
    if(saveUser){
      setUser(JSON.parse(saveUser));
    }else if(savetoken){
      const fetchUser = async () => {
        try {
          const response = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${savetoken}`
            }
          });
          const userData = response.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
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
