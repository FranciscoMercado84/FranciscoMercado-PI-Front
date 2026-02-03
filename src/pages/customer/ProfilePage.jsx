import React from 'react';
import { useNavigate } from 'react-router-dom';
import HFProfile from '../../../components/design-system/high-fidelity/HFProfile';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (screenId) => {
    const routes = {
      'orders': '/orders',
      'catalog': '/catalog',
      'login': '/login'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  return <HFProfile onNavigate={handleNavigate} />;
};

