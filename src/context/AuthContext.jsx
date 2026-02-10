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
      
      console.log('🔍 [AuthContext] Respuesta completa del backend:', response);
      console.log('🔍 [AuthContext] response.data:', response.data);
      console.log('🔍 [AuthContext] response.data.user:', response.data?.user);
      
      // Mapear la respuesta del backend a la estructura esperada
      const userData = {
        id: response.data.user.id || response.data.user._id,
        email: response.data.user.email,
        role: response.data.user.rol || response.data.user.role, // Mapear 'rol' del backend a 'role'
        name: response.data.user.nombre || response.data.user.name,
        token: response.data.access_token, // Guardar el token JWT
      };
      
      console.log('✅ [AuthContext] Usuario mapeado:', userData);
      console.log('✅ [AuthContext] isAdmin será:', userData.role === 'admin');
      
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
    console.log('🔄 [AuthContext] Restaurando sesión del localStorage:', storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('✅ [AuthContext] Usuario restaurado:', parsedUser);
        console.log('✅ [AuthContext] isAdmin será:', parsedUser.role === 'admin');
        setUser(parsedUser);
      } catch (error) {
        console.error('❌ [AuthContext] Error al parsear usuario del localStorage:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('ℹ️ [AuthContext] No hay usuario en localStorage');
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
