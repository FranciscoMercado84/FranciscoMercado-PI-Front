import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFAdminProducts from '../../../components/design-system/high-fidelity/HFAdminProducts';
import { LoadingState } from '../../components/states/LoadingState';
import { EmptyState } from '../../components/states/EmptyState';
import { Package } from 'lucide-react';

export const AdminProductsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasProducts] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screenId, productId) => {
    if (screenId === 'edit-product' && productId) {
      navigate(`/admin/products/edit/${productId}`);
    } else {
      const routes = {
        'product-form': '/admin/products/new',
        'dashboard': '/admin/dashboard',
        'categories': '/admin/categories'
      };
      
      const route = routes[screenId];
      if (route) {
        navigate(route);
      }
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando productos..." />;
  }

  if (!hasProducts) {
    return (
      <EmptyState
        title="No hay productos"
        message="Aún no has creado ningún producto. Comienza agregando tu primer producto."
        actionLabel="Crear producto"
        onAction={() => navigate('/admin/products/new')}
        icon={<Package size={32} style={{ color: 'var(--color-neutral-600)' }} />}
      />
    );
  }

  return <HFAdminProducts onNavigate={handleNavigate} />;
};

