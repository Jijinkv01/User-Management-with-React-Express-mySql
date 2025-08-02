import React from 'react'
import DashboardNavbar from '../../components/admin/DashboardNavbar'
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const USERS_PER_PAGE = 5;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
        `/admin/getUsers?page=${currentPage}&limit=${USERS_PER_PAGE}&search=${searchTerm}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      } catch (error) {
         console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage , searchTerm]);

  // Filter users by search
  // useEffect(() => {
  //   const filtered = users.filter(user =>
  //     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.role.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredUsers(filtered);
  // }, [searchTerm, users]);

  const handleNext = () => {
  if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
};

const handlePrev = () => {
  if (currentPage > 1) setCurrentPage(prev => prev - 1);
};


  return (
    <div>
      <DashboardNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">Users Details</h1>

        {/* Search Bar */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 border-b border-gray-300  text-lg font-bold">SL No</th>
                <th className="px-6 py-3 border-b border-gray-300  text-lg font-bold">Profile</th>
                <th className="px-6 py-3 border-b border-gray-300  text-lg font-bold">Username</th>
                <th className="px-6 py-3 border-b border-gray-300  text-lg font-bold">Email</th>
                <th className="px-6 py-3 border-b border-gray-300  text-lg font-bold">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-300 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-lg text-center text-gray-800">{index + 1}</td>
                    <td className="px-6 py-2 ">
                      <div className="flex items-center justify-center">
                        <img
                          src={
                            user.profilePic
                              ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePic}`
                              : '/default-avatar.png'
                          }
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover "
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-lg text-center text-gray-800">{user.username}</td>
                    <td className="px-6 py-4 text-lg text-center text-gray-800">{user.email}</td>
                    <td className="px-6 py-4 text-lg text-center capitalize text-gray-800">{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-6 text-center text-gray-500 text-sm">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

<div className="flex justify-center items-center mt-6 space-x-4">
    <button
      onClick={handlePrev}
      disabled={currentPage === 1}
      className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-80 hover:bg-blue-700"
    >
      Previous
    </button>
    <span className="text-lg font-medium text-gray-700">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-80 hover:bg-blue-700"
    >
      Next
    </button>
  </div>




        </div>
      </div>
    </div>
  )
}

export default AdminDashboard