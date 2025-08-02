import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import axiosInstance from '../../api/axiosInstance.js';
import {toast} from 'react-hot-toast';

const EditProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [updatedUsername, setUpdatedUsername] = useState("");
  console.log("updatedUsername:", updatedUsername);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  // console.log("image",preview);


  useEffect(() => {
  if (user && user.user?.profilePic) {
    const baseUrl = import.meta.env.VITE_BACKEND_URL; // adjust as needed
    setPreview(`${baseUrl}${user.user.profilePic}`);
  }
}, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const token = localStorage.getItem('accessToken');
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('username', updatedUsername);
      if (image) formData.append('profilePic', image);

      const res = await axiosInstance.put(`/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true // 
      });
      const { updateData } = res.data;
      updateUser({ user: { ...user.user, ...updateData } });

      console.log(" Updated:", res.data);
      toast.success(res.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ Failed to update profile:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 space-y-6 bg-gray-50">
      {/* Profile Image */}
      <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center shadow-md">
        {preview ? (
          <img src={preview} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>

      {/* User Info */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold">{user ? user.user.username : ""}</h2>
        <p className="text-gray-800 text-xl">{user ? user.user.email : ""}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            setUpdatedUsername(user?.user?.username || ""); setIsModalOpen(true)
          }}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
        <Link to="/">
          <button className="bg-yellow-400 px-5 py-2 rounded-lg hover:bg-yellow-500 transition">
            Go to Home
          </button>
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-5 shadow-xl">
            <h2 className="text-xl font-semibold text-center">Edit Profile</h2>

            {/* Preview */}
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
              {preview ? (
                <img src={preview} alt="No Image" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm text-gray-500">No Image</span>
              )}
            </div>

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />

            {/* User Info */}
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-700">Username</label>
                <input
                  type="text"
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  value={user ? user.user.email : ""}
                  disabled
                  className="w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProfile