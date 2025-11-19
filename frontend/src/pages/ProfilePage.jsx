import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { login } from '../redux/slices/authSlice';
import { FiUser, FiMail, FiLock, FiSave } from 'react-icons/fi';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setFormData({
      name: userInfo.name || '',
      email: userInfo.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Validate name and email
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        '/api/users/profile',
        {
          name: formData.name,
          email: formData.email
        },
        config
      );

      dispatch(login({ ...data, token: userInfo.token }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.put(
        '/api/users/password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        config
      );

      toast.success('Password updated successfully!');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser size={40} className="text-primary-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">{userInfo?.name}</h2>
              <p className="text-gray-600 mb-4">{userInfo?.email}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    userInfo?.role === 'admin' 
                      ? 'bg-red-100 text-red-800'
                      : userInfo?.isSeller
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {userInfo?.role === 'admin' ? 'Admin' : userInfo?.isSeller ? 'Seller' : 'User'}
                  </span>
                </div>
                {userInfo?.isSeller && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold mb-2">Business Info</p>
                    <p className="text-gray-600">{userInfo?.sellerInfo?.businessName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Update Profile Form */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiUser className="text-primary-600" />
                Update Profile Information
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">
                    <FiUser className="inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">
                    <FiMail className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="input bg-gray-100 cursor-not-allowed"
                    placeholder="Email cannot be changed"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  <FiSave />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>

            {/* Change Password Form - Only for non-Google users */}
            {!userInfo?.googleId && (
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiLock className="text-primary-600" />
                Change Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  <FiLock />
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
