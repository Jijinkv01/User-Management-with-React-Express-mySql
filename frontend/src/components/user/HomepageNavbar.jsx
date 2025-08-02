import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'
import { toast } from "react-hot-toast"
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


const HomepageNavbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    try {
      await axiosInstance.post('/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      logout()
      toast.success('Logged out');
      navigate('/login');

    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed');
    }
  };


  return (
    <div className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <div>
        {user ? <h1 className="text-lg font-semibold">Hi, {user.user.username}</h1> : null}
      </div>
      <Link to="/profile">
        <div>
          <button className='bg-blue-600 p-1 rounded-lg cursor-pointer hover:bg-blue-700'>View Profile</button>
        </div>
      </Link>
      <div>
        <button onClick={handleLogout} className='bg-red-500 p-1 rounded-lg cursor-pointer hover:bg-red-600'>Logout</button>
      </div>
    </div>
  )
}

export default HomepageNavbar