import React from 'react';
import { useNavigate } from 'react-router-dom';
import HFAdminSettings from '../../../components/design-system/high-fidelity/HFAdminSettings';

export const AdminSettingsPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (screenId) => {
    const routes = {
      'dashboard': '/admin/dashboard',
      'categories': '/admin/categories',
      'pickup-times': '/admin/pickup-times'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  return <HFAdminSettings onNavigate={handleNavigate} />;
};

