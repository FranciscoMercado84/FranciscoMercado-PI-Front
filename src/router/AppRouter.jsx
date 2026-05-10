import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ProtectedRoute } from './ProtectedRoute';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { RecoverPage } from '../pages/public/RecoverPage';
import { ResetPasswordPage } from '../pages/public/ResetPasswordPage';
import { LegalPage } from '../pages/public/LegalPage';

// Customer Pages
import { CatalogPage } from '../pages/customer/CatalogPage';
import { ProductDetailPage } from '../pages/customer/ProductDetailPage';
import { CartPage } from '../pages/customer/CartPage';
import { CheckoutPage } from '../pages/customer/CheckoutPage';
import { OrdersPage } from '../pages/customer/OrdersPage';
import { OrderDetailPage } from '../pages/customer/OrderDetailPage';
import { ProfilePage } from '../pages/customer/ProfilePage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminProductFormPage } from '../pages/admin/AdminProductFormPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminOrderDetailPage } from '../pages/admin/AdminOrderDetailPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

// Special Pages
import { NotFoundPage } from '../pages/NotFoundPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recover" element={<RecoverPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/privacidad" element={<LegalPage type="privacy" />} />
            <Route path="/terminos" element={<LegalPage type="terms" />} />
            <Route path="/cookies" element={<LegalPage type="cookies" />} />
          </Route>

          {/* Public Customer Routes (accessible without auth) */}
          <Route element={<CustomerLayout />}>
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          {/* Protected Customer Routes (require auth) */}
          <Route
            element={
              <ProtectedRoute>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Public Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Routes */}
          <Route
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/new" element={<AdminProductFormPage />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductFormPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Special Routes */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
