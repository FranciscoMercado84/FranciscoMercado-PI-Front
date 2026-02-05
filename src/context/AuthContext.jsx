import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    try {
      // Llamada real a la API del backend
      const response = await authService.login(email, password);
      
      // Mapear la respuesta del backend a la estructura esperada
      const userData = {
        id: response.data.user.id || response.data.user._id,
        email: response.data.user.email,
        role: response.data.user.rol, // Mapear 'rol' del backend a 'role'
        name: response.data.user.nombre || response.data.user.name,
        token: response.data.access_token, // Guardar el token JWT
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error.data?.message || 'Error al iniciar sesión');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Restaurar sesión del localStorage al montar
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // O un spinner de carga
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
