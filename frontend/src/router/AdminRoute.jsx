import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          height: '100vh', 
          width: '100vw', 
          alignItems: 'center', 
          justify: 'center', 
          fontFamily: 'Plus Jakarta Sans, sans-serif' 
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--blue)', marginBottom: '0.5rem' }}>Mathify Admin</div>
          <div style={{ color: 'var(--text-muted)' }}>Memeriksa hak akses admin...</div>
        </div>
      </div>
    );
  }

  // Redirect to home if not authenticated or not an admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
