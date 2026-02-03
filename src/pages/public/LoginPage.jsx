import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFLogin from '../../../components/design-system/high-fidelity/HFLogin';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNavigate = async (screenId) => {
    if (screenId === 'catalog' || screenId === 'dashboard') {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulación de login
        await login('user@example.com', 'password', 'customer');
        
        // Redirigir a la página desde donde vino o al catálogo
        const from = location.state?.from?.pathname || '/catalog';
        navigate(from, { replace: true });
      } catch (err) {
        setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
        setIsLoading(false);
      }
    } else if (screenId === 'register') {
      navigate('/register');
    } else if (screenId === 'recover') {
      navigate('/recover');
    } else if (screenId === 'landing') {
      navigate('/');
    }
  };

  if (isLoading) {
    return <LoadingState message="Iniciando sesión..." />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Error de autenticación" 
        message={error}
        onRetry={() => {
          setError(null);
          navigate('/login');
        }}
      />
    );
  }

  return <HFLogin onNavigate={handleNavigate} />;
};

