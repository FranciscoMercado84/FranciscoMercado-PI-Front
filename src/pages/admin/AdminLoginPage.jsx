import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFAdminLogin from '../../../components/design-system/high-fidelity/HFAdminLogin';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      setError('Por favor, ingresa tu email y contraseña');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Login como administrador - el backend verificará el rol
      await login(email, password, 'admin');
      
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error en admin login:', err);
      setError(err.message || 'Credenciales inválidas o sin permisos de administrador.');
      setIsLoading(false);
    }
  };

  const handleNavigate = (screenId) => {
    if (screenId === 'landing') {
      navigate('/');
    }
  };

  return (
    <HFAdminLogin 
      onNavigate={handleNavigate} 
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  );
};

