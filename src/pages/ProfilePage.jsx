import React, { useEffect, useState } from 'react';
import RiderSidebar from '../component/sidebar/RiderSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backend = import.meta.env.VITE_BACKEND_URL;

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem('userId');
    const access_token = localStorage.getItem('access_token');
    if (!userId || !access_token) {
      setLoading(false);
      setError({ message: "Authentication failed. Please log in." });
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(`${backend}/user/data/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      setUserProfile(res.data.user[0]);

      setNewName(res.data.user?.full_name || '');
      setNewNumber(res.data.user?.phone_number || '');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log(newName, newNumber);
    const userId = localStorage.getItem('userId');
    const access_token = localStorage.getItem('access_token');

    // Check for missing data before making the API call
    if (!newName || !newNumber) {
      alert('Missing updated data. Please fill in both fields.');
      return;
    }

    try {
      await axios.put(`${backend}/user/updateProfile/${userId}`, {
        // Change the keys to match your backend's expected keys
        newName: newName,
        newNumber: newNumber
      }, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      // After successful update, re-fetch the user profile to get the latest data
      // This is a good practice to ensure the UI is in sync with the backend
      await fetchUserProfile();

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      // Log the error message from the server for better debugging
      console.error("Update profile error:", err.response?.data?.error || err.message);
      alert('Failed to update profile.');
    }
  };

  const handleCancel = () => {

    setNewName(userProfile.full_name || '');
    setNewNumber(userProfile.phone_number || '');
    setIsEditing(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading profile...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className='w-full h-screen pt-1 flex flex-wrap justify-center bg-yellow-300/20'>
      <div className='w-full flex h-fit bg-gray-900/20 p-2 shadow-xl font-extrabold text-center'>
        <h1 className='flex justify-bottom ml-4 text-xl text-black/80 font-bold'>
          <span className='mt-2 cursor-pointer' onClick={() => navigate('/')}>RATHI</span>
        </h1>
        <div className='w-9/10'>
          <h1 className='text-blue-700 font-bold text-3xl'>Rider Dashboard</h1>
        </div>
      </div>
      <div className='w-full m-10 mt-9 flex justify-between'>
        <div className='w-15/100 shadow-2xl shadow-reverse-md h-100vh rounded-xl'>
          <RiderSidebar />
        </div>
        <div className='w-85/100 rounded-xl shadow-2xl shadow-reverse-2xl bg-yellow-100/20 p-6'>
          {userProfile ? (
            <div className="bg-green-200/40 rounded-lg p-8 shadow-md">
              <div className="flex justify-between  items-start mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mr-4">
                    {userProfile.full_name ? userProfile.full_name?.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">{userProfile.full_name || 'User Profile'}</h2>
                    <p className="text-gray-500">{userProfile.email}</p>
                  </div>
                </div>
                {!isEditing && (
                  <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                    Edit Profile
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="profile-detail-item">
                    <p className="font-semibold text-gray-700">Full Name:</p>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="profile-detail-item">
                    <p className="font-semibold text-gray-700">Phone Number:</p>
                    <input
                      type="text"
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
                    <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                      Save
                    </button>
                    <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 text-xl md:grid-cols-2 gap-4">
                  <div className="profile-detail-item">
                    <p className="font-semibold text-gray-700">Full Name:</p>
                    <p className="text-gray-600">{userProfile.full_name || 'N/A'}</p>
                  </div>
                  <div className="profile-detail-item">
                    <p className="font-semibold text-gray-700">Phone Number:</p>
                    <p className="text-gray-600">{userProfile.phone_number || 'N/A'}</p>
                  </div>
                  <div className="profile-detail-item">
                    <p className="font-semibold text-gray-700">Email:</p>
                    <p className="text-gray-600">{userProfile.email || 'N/A'}</p>
                  </div>
               
                  <div className="profile-detail-item">
                    <p className="font-semibold text-gray-700">Created On:</p>
                    <p className="text-gray-600">{new Date(userProfile.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="profile-detail-item">
                    <p className="font-semibold text-gray-700">Status:</p>
                    <p className="text-green-500 font-bold">{userProfile.email ? 'Verified✅' : 'Unverified'}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-lg text-gray-500 p-8">No profile data found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;