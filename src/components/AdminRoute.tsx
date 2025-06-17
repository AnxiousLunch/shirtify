import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../context/AuthContext';

const AdminRoute: React.FC = () => {
  const { isAdmin, loading } = useAdmin();
  const { currentUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute; 