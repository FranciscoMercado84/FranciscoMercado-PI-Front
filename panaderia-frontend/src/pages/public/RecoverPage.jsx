import React from 'react';
import { useNavigate } from 'react-router-dom';
import HFPasswordRecovery from '../../../components/design-system/high-fidelity/HFPasswordRecovery';

export const RecoverPage = () => {
  const navigate = useNavigate();

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

  return <HFPasswordRecovery onNavigate={handleNavigate} />;
};

