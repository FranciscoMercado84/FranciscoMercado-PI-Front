import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HFHeader from '../../../components/design-system/high-fidelity/HFHeader';
import HFLanding from '../../../components/design-system/high-fidelity/HFLanding';
import HFFooter from '../../../components/design-system/high-fidelity/HFFooter';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavigate = (screenId) => {
    const routes = {
      'login': '/login',
      'register': '/register',
      'catalog': '/catalog',
      'cart': '/cart',
      'profile': '/profile',
      'landing': '/',
      'admin-login': '/admin/login',
      'contact': 'footer'
    };
    
    const route = routes[screenId];
    if (route === 'footer') {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <div>
      <HFHeader 
        isAuthenticated={!!user} 
        cartItems={0} 
        variant="transparent" 
        onNavigate={handleNavigate}
        onLogout={logout}
      />
      <HFLanding onNavigate={handleNavigate} />
    </div>
  );
};

