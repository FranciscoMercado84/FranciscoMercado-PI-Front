import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HFProductCatalog from '../../../components/design-system/high-fidelity/HFProductCatalog';
import { LoadingState } from '../../components/states/LoadingState';
import { ErrorState } from '../../components/states/ErrorState';
import { EmptyState } from '../../components/states/EmptyState';
import { productService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadProducts();
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, sortOption]);

  const getQueryParams = () => {
    const params = {};

    if (searchTerm.trim()) {
      params.q = searchTerm.trim();
    }

    if (selectedCategory) {
      params.categoria = selectedCategory;
    }

    if (sortOption) {
      params.sort = sortOption;
    }

    return params;
  };

  const mergeCategories = (productsList) => {
    const categories = productsList
      .map((product) => product.categoria || product.category)
      .filter(Boolean);

    setAvailableCategories((current) => {
      const merged = new Set(current);
      categories.forEach((category) => merged.add(category));
      return Array.from(merged).sort((a, b) => a.localeCompare(b, 'es'));
    });
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productService.getAll(getQueryParams());
      // La respuesta puede venir como response.data o directamente como array
      const productList = response.data || response.productos || response || [];
      const normalizedProducts = Array.isArray(productList) ? productList : [];
      setProducts(normalizedProducts);
      mergeCategories(normalizedProducts);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOption('');
    setFiltersOpen(false);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await addItem(productId, 1);
      // Buscar nombre del producto para el toast
      const product = products.find(p => (p.id || p._id) === productId);
      const productName = product?.nombre || product?.name || 'Producto';
      showToast(`${productName} añadido al carrito`, 'success');
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      showToast(err.message || 'Error al agregar el producto', 'error');
    }
  };

  const handleNavigate = (screenId, productId) => {
    if (screenId === 'product-detail' && productId) {
      navigate(`/product/${productId}`);
    } else {
      const routes = {
        'product-detail': '/product/1',
        'cart': '/cart',
        'profile': '/profile'
      };
      
      const route = routes[screenId];
      if (route) {
        navigate(route);
      }
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
        onRetry={loadProducts}
      />
    );
  }

  if (products.length === 0) {
    const hasActiveFilters = Boolean(searchTerm.trim() || selectedCategory || sortOption);

    return (
      <EmptyState
        title={hasActiveFilters ? 'No hay resultados' : 'No hay productos disponibles'}
        message={hasActiveFilters
          ? 'Prueba a cambiar la búsqueda, la categoría o el orden para ver más productos.'
          : 'Aún no hay productos en el catálogo. Vuelve pronto.'}
        actionLabel={hasActiveFilters ? 'Limpiar filtros' : undefined}
        onAction={hasActiveFilters ? handleClearFilters : undefined}
      />
    );
  }

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 1000,
          padding: '12px 20px',
          background: toast.type === 'success' ? 'var(--color-success, #22c55e)' : 'var(--color-error, #ef4444)',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '500'
        }}>
          <span style={{ fontSize: '18px' }}>{toast.type === 'success' ? '✓' : '✕'}</span>
          {toast.message}
        </div>
      )}
      <HFProductCatalog 
        products={products}
        categories={availableCategories}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortOption={sortOption}
        filtersOpen={filtersOpen}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortOption}
        onToggleFilters={() => setFiltersOpen((current) => !current)}
        onResetFilters={handleClearFilters}
        onNavigate={handleNavigate}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

