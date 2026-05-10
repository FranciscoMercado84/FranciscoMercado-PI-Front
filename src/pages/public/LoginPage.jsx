import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFLogin from '../../../components/design-system/high-fidelity/HFLogin';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password, remember = true) => {
    if (!email || !password) {
      setError('Por favor, ingresa tu email y contraseña');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password, remember);
      
      // Redirigir a la página desde donde vino o al catálogo
      const from = location.state?.from?.pathname || '/catalog';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error en login:', err);
      setError(err.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
      setIsLoading(false);
    }
  };

  const handleNavigate = (screenId) => {
    if (screenId === 'register') {
      navigate('/register');
    } else if (screenId === 'recover') {
      navigate('/recover');
    } else if (screenId === 'landing') {
      navigate('/');
    }
  };

  return (
    <HFLogin 
      onNavigate={handleNavigate} 
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  );
};

