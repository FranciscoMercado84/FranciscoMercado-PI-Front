import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFRegister from '../../../components/design-system/high-fidelity/HFRegister';
import { LoadingState } from '../../components/states/LoadingState';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = async (screenId) => {
    if (screenId === 'catalog' || screenId === 'register') {
      // Usuario hace clic en "Crear Cuenta"
      setIsLoading(true);
      try {
        // Simular registro y login automático
        await login('newuser@example.com', 'password', 'customer');
        navigate('/catalog', { replace: true });
      } catch (err) {
        setIsLoading(false);
      }
    } else {
      const routes = {
        'login': '/login',
        'landing': '/'
      };
      
      const route = routes[screenId];
      if (route) {
        navigate(route);
      }
    }
  };

  if (isLoading) {
    return <LoadingState message="Creando tu cuenta..." />;
  }

  return <HFRegister onNavigate={handleNavigate} />;
};

