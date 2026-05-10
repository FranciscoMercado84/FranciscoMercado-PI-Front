import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFAdminProducts from '../../../components/design-system/high-fidelity/HFAdminProducts';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { EmptyState } from '../../components/states/EmptyState';
import { Package } from 'lucide-react';
import { productService } from '../../services/api';

export const AdminProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productService.getAllAdmin();
      // La respuesta puede ser un array directamente o estar en response.data
      const productsData = Array.isArray(response) ? response : (response.data || response.productos || []);
      setProducts(productsData);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleToggleAvailable = async (productId, disponible) => {
    try {
      await productService.update(productId, { disponible });
      // Recargar la lista para reflejar el cambio (producto desaparecerá si queda no disponible)
      loadProducts();
    } catch (err) {
      console.error('Error al actualizar disponibilidad:', err);
      alert('No se pudo actualizar la disponibilidad: ' + (err.message || 'Error'));
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      await productService.delete(productId);
      // Recargar la lista de productos
      loadProducts();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar el producto: ' + (err.message || 'Error desconocido'));
    }
  };

  const handleNavigate = (screenId, productId) => {
    if (screenId === 'edit-product' && productId) {
      navigate(`/admin/products/edit/${productId}`);
    } else if (screenId === 'view-product' && productId) {
      // No existe ruta de detalle admin, redirigimos a la edición como vista rápida
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

  if (error) {
    return (
      <ErrorState
        title="Error al cargar productos"
        message={error}
        onRetry={loadProducts}
      />
    );
  }

  if (products.length === 0) {
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

  return <HFAdminProducts products={products} onNavigate={handleNavigate} onDelete={handleDelete} onToggleAvailable={handleToggleAvailable} />;
};

