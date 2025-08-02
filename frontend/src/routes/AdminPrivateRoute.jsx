import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const AdminPrivateRoute = ({ children }) => {
  const { admin } = useContext(AdminContext);

  // If user not logged in or not an admin
  if (!admin || admin.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminPrivateRoute;
