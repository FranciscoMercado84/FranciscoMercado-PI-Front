import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFRegister from '../../../components/design-system/high-fidelity/HFRegister';
import { authService } from '../../services/api';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Registrar usuario
      await authService.register({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono
      });
      
      // Login automático después del registro
      await login(formData.email, formData.password);
      navigate('/catalog', { replace: true });
    } catch (err) {
      console.error('Error en registro:', err);
      // Intentar obtener mensaje detallado del servidor
      let serverMsg = null;
      if (err && err.data) {
        const d = err.data;
        if (d.message) serverMsg = d.message;
        else if (d.error) serverMsg = d.error;
        else if (d.errors) {
          if (Array.isArray(d.errors)) serverMsg = d.errors.map(e => e.msg || e.message || JSON.stringify(e)).join('; ');
          else if (typeof d.errors === 'object') serverMsg = Object.values(d.errors).flat().join('; ');
        }
      }
      setError(serverMsg || err.message || 'Error al crear la cuenta. Por favor, intenta de nuevo.');
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
    <HFRegister 
      onNavigate={handleNavigate} 
      onRegister={handleRegister}
      isLoading={isLoading}
      error={error}
    />
  );
};

