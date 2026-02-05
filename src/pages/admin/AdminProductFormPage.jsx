import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HFAdminProductForm from '../../../components/design-system/high-fidelity/HFAdminProductForm';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { SuccessState } from '../../components/states/SuccessState';
import { productService } from '../../services/api';

export const AdminProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id); // Solo cargar si hay ID
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [productSaved, setProductSaved] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await productService.getById(id);
        const productData = response.data || response.producto || response;
        setProduct(productData);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleNavigate = (screenId) => {
    if (screenId === 'products') {
      navigate('/admin/products');
    } else if (screenId === 'dashboard') {
      navigate('/admin/dashboard');
    }
  };

  const handleSubmit = async (productData) => {
    try {
      setIsProcessing(true);
      setError(null);

      if (id) {
        // Actualizar producto existente
        await productService.update(id, productData);
      } else {
        // Crear nuevo producto
        await productService.create(productData);
      }

      setProductSaved(true);
    } catch (err) {
      console.error('Error al guardar producto:', err);
      alert('Error al guardar el producto: ' + (err.message || 'Error desconocido'));
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando producto..." />;
  }

  if (error && id) {
    return (
      <ErrorState
        title="Error al cargar el producto"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

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

  return (
    <HFAdminProductForm 
      product={product}
      onNavigate={handleNavigate} 
      onSubmit={handleSubmit}
      isProcessing={isProcessing}
    />
  );
};

