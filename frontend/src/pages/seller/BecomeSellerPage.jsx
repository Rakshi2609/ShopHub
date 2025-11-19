import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { login } from '../../redux/slices/authSlice';

const BecomeSellerPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        '/api/users/become-seller',
        formData,
        config
      );

      // Update user info in localStorage and Redux
      const updatedUserInfo = { ...userInfo, ...data, token: userInfo.token };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      dispatch(login(updatedUserInfo));

      toast.success('Welcome to the seller community! 🎉');
      navigate('/seller/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to become a seller');
    } finally {
      setLoading(false);
    }
  };

  if (userInfo?.isSeller) {
    navigate('/seller/dashboard');
    return null;
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Become a Seller</h1>
            <p className="text-gray-600">
              Start selling your products and reach millions of customers!
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-1">Easy Setup</h3>
              <p className="text-sm text-gray-600">Start selling in minutes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold mb-1">Earn More</h3>
              <p className="text-sm text-gray-600">Set your own prices</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Track Sales</h3>
              <p className="text-sm text-gray-600">Monitor your growth</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-semibold mb-2">Business Name *</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="input"
                placeholder="e.g., Tech Store, Fashion Hub"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be displayed on your products
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Business Description *
              </label>
              <textarea
                value={formData.businessDescription}
                onChange={(e) =>
                  setFormData({ ...formData, businessDescription: e.target.value })
                }
                className="input"
                rows="4"
                placeholder="Tell customers about your business..."
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3 text-lg">Seller Benefits:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Dedicated Dashboard:</strong> Manage your entire business from one place</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Unlimited Products:</strong> Add as many products as you want with no restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Smart Image Search:</strong> Automatically find high-quality product images from Pexels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Pricing Calculator:</strong> Set cost price and margin percentage to auto-calculate selling price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Order Management:</strong> Track all customer orders and sales in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Inventory Control:</strong> Monitor stock levels and get low-stock alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Performance Analytics:</strong> View total sales, revenue, and customer ratings</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? 'Setting up...' : 'Become a Seller'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
