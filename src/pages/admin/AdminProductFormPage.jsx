import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFAdminProductForm from '../../../components/design-system/high-fidelity/HFAdminProductForm';
import { SuccessState } from '../../components/states/SuccessState';

export const AdminProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productSaved, setProductSaved] = useState(false);

  const handleNavigate = (screenId) => {
    if (screenId === 'products' || screenId === 'success') {
      if (screenId === 'success') {
        setProductSaved(true);
      } else {
        navigate('/admin/products');
      }
    } else if (screenId === 'dashboard') {
      navigate('/admin/dashboard');
    }
  };

  if (productSaved) {
    return (
      <SuccessState
        title={id ? '¡Producto actualizado!' : '¡Producto creado!'}
        message={id ? 'El producto se ha actualizado correctamente.' : 'El producto se ha creado correctamente.'}
        actionLabel="Ver productos"
        onAction={() => navigate('/admin/products')}
      />
    );
  }

  return <HFAdminProductForm onNavigate={handleNavigate} />;
};

