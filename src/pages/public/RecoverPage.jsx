import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import HFPasswordRecovery from '../../../components/design-system/high-fidelity/HFPasswordRecovery';

export const RecoverPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRecover = async (email) => {
    if (!email) {
      setError('Ingresa un correo válido para continuar.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(email);
      setSuccessMessage('Si el correo existe, te enviamos un enlace de recuperación. Revisa tu bandeja de entrada y spam.');
    } catch (err) {
      console.error('Error solicitando recuperación:', err);
      setError(err.data?.message || err.data?.error || err.message || 'No se pudo enviar el enlace de recuperación.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (screenId) => {
    const routes = {
      'login': '/login',
      'landing': '/'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  return (
    <HFPasswordRecovery
      onNavigate={handleNavigate}
      onSubmit={handleRecover}
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
    />
  );
};

