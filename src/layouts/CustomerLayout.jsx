import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HFHeader from '../../components/design-system/high-fidelity/HFHeader';
import HFFooter from '../../components/design-system/high-fidelity/HFFooter';

export const CustomerLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavigate = (screenId) => {
    const routes = {
      'landing': '/',
      'catalog': '/catalog',
      'cart': '/cart',
      'profile': '/profile',
      'login': '/login',
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
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-neutral-100)',
      fontFamily: 'var(--font-primary)'
    }}>
      <HFHeader 
        isAuthenticated={!!user} 
        cartItems={0} 
        variant="transparent" 
        onNavigate={handleNavigate}
        onLogout={logout}
      />
      <main>
        {children || <Outlet />}
      </main>
      <HFFooter onNavigate={handleNavigate} />
    </div>
  );
};
