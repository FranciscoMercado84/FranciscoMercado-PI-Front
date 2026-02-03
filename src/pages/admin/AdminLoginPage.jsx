import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFAdminLogin from '../../../components/design-system/high-fidelity/HFAdminLogin';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNavigate = async (screenId) => {
    if (screenId === 'dashboard' || screenId === 'admin-dashboard') {
      setIsLoading(true);
      setError(null);
      
      try {
        // Login como administrador
        await login('admin@panaderia.com', 'admin123', 'admin');
        
        const from = location.state?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } catch (err) {
        setError('Error al iniciar sesión como administrador.');
        setIsLoading(false);
      }
    } else if (screenId === 'landing') {
      navigate('/');
    }
  };

  if (isLoading) {
    return <LoadingState message="Iniciando sesión como administrador..." />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Error de autenticación" 
        message={error}
        onRetry={() => {
          setError(null);
          navigate('/admin/login');
        }}
      />
    );
  }

  return <HFAdminLogin onNavigate={handleNavigate} />;
};

