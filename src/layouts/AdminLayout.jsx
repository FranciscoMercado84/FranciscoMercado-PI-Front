import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNav } from '../components/common/Navigation';

export const AdminLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-neutral-50)',
      fontFamily: 'var(--font-primary)'
    }}>
      <AdminNav />
      <main style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '40px'
      }}>
        {children || <Outlet />}
      </main>
    </div>
  );
};
