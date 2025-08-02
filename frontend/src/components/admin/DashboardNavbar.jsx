import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'
import { toast } from "react-hot-toast"
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DashboardNavbar = () => {
    const { admin, logout } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
    
    try {
      await axiosInstance.post('/admin/logout', {}, { withCredentials: true });
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      logout()
      toast.success('Logged out');
      navigate('/admin/login');

    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed');
    }
  };

  return (
    <div className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md ">
      <div className="text-xl font-semibold text-center w-full">Admin Dashboard</div>
      <button
        onClick={handleLogout}
        className="absolute right-4 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded transition"
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardNavbar