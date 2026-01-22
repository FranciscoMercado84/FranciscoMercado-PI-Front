import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFProductCatalog from '../../../components/design-system/high-fidelity/HFProductCatalog';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular carga de productos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screenId) => {
    const routes = {
      'product-detail': '/product/1',
      'cart': '/cart',
      'profile': '/profile'
    };
    
    const route = routes[screenId];
    if (route) {
      navigate(route);
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando catálogo..." />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Error al cargar el catálogo" 
        message={error}
        onRetry={() => {
          setError(null);
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 800);
        }}
      />
    );
  }

  return <HFProductCatalog onNavigate={handleNavigate} />;
};

