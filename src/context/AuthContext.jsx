import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = () => {
    setUser(null);
    try {
      // Borrar ambos storages para asegurar que la sesión quede limpia
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    } catch (err) {
      console.warn('⚠️ [AuthContext] Error limpiando storage al cerrar sesión:', err);
    }
  };

  const normalizeUser = (response) => {
    const sourceUser = response?.data?.user || response?.user || response?.data || response;

    if (!sourceUser || typeof sourceUser !== 'object') {
      return null;
    }

    return {
      id: sourceUser.id || sourceUser._id,
      email: sourceUser.email,
      role: sourceUser.rol || sourceUser.role,
      name: sourceUser.nombre || sourceUser.name,
      telefono: sourceUser.telefono || sourceUser.phone || '',
      direccion: sourceUser.direccion || '',
      cedula: sourceUser.cedula || '',
      token: sourceUser.token || response?.data?.access_token || response?.access_token,
    };
  };

  const login = async (email, password, remember = true) => {
    try {
      // Llamada real a la API del backend
      const response = await authService.login(email, password);
      
      console.log('🔍 [AuthContext] Respuesta completa del backend:', response);
      console.log('🔍 [AuthContext] response.data:', response.data);
      console.log('🔍 [AuthContext] response.data.user:', response.data?.user);
      
      // Mapear la respuesta del backend a la estructura esperada
      const userData = normalizeUser(response);

      if (!userData) {
        throw new Error('No se pudo obtener la información del usuario');
      }
      
      console.log('✅ [AuthContext] Usuario mapeado:', userData);
      console.log('✅ [AuthContext] isAdmin será:', userData.role === 'admin');
      
      setUser(userData);
      // Guardar en localStorage si el usuario marca "Recordarme",
      // si no, usar sessionStorage para que la sesión expire al cerrar la pestaña.
      try {
        if (remember) {
          localStorage.setItem('user', JSON.stringify(userData));
          sessionStorage.removeItem('user');
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
          localStorage.removeItem('user');
        }
      } catch (err) {
        console.warn('No se pudo persistir sesión en el almacenamiento local:', err);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error.data?.message || 'Error al iniciar sesión');
    }
  };

  const logout = () => {
    clearSession();
  };

  // Restaurar sesión del localStorage al montar
  React.useEffect(() => {
    const validateStoredSession = async (parsedUser) => {
      try {
        const profileResponse = await authService.getProfile();
        const normalizedProfile = normalizeUser(profileResponse);

        if (normalizedProfile) {
          setUser({
            ...parsedUser,
            ...normalizedProfile,
            token: parsedUser.token,
          });
          return;
        }

        setUser(parsedUser);
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          console.warn('⚠️ [AuthContext] Sesión inválida o cuenta inactiva, limpiando estado local');
          clearSession();
        } else {
          console.warn('⚠️ [AuthContext] No se pudo validar la sesión local, se conserva temporalmente:', error);
          setUser(parsedUser);
        }
      }
    };

    const restoreSession = async () => {
      // Revisar primero localStorage (persistente). Si no existe, revisar sessionStorage.
      const fromLocal = localStorage.getItem('user');
      const fromSession = sessionStorage.getItem('user');
      const storedUser = fromLocal || fromSession;
      console.log('🔄 [AuthContext] Restaurando sesión. localStorage:', !!fromLocal, 'sessionStorage:', !!fromSession);

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('✅ [AuthContext] Usuario restaurado:', parsedUser);
          console.log('✅ [AuthContext] isAdmin será:', parsedUser.role === 'admin');
          await validateStoredSession(parsedUser);
        } catch (error) {
          console.error('❌ [AuthContext] Error al parsear usuario del storage:', error);
          clearSession();
        }
      } else {
        console.log('ℹ️ [AuthContext] No hay usuario en storage');
      }

      setIsLoading(false);
    };

    restoreSession();
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
        updateUser: (updates) => {
          setUser((currentUser) => {
            if (!currentUser) return currentUser;
            const nextUser = {
              ...currentUser,
              ...updates,
            };
            localStorage.setItem('user', JSON.stringify(nextUser));
            return nextUser;
          });
        },
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
