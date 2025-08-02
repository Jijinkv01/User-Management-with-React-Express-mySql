import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const AdminPublicRoute = ({ children }) => {
  const { admin } = useContext(AdminContext);

  if (admin && admin.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default AdminPublicRoute;
