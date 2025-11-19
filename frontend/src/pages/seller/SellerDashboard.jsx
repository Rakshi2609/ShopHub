import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    activeOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo?.isSeller) {
      navigate('/become-seller');
      return;
    }
    fetchSellerData();
  }, [userInfo, navigate]);

  const fetchSellerData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      // Fetch fresh user data to get updated sales
      const userResponse = await axios.get('/api/users/profile', config);
      const updatedUser = userResponse.data;

      // Fetch seller's products
      const { data } = await axios.get('/api/products/my-products', config);
      setProducts(data);

      // Calculate stats
      setStats({
        totalProducts: data.length,
        totalSales: updatedUser.sellerInfo?.totalSales || 0,
        totalRevenue: data.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0),
        activeOrders: 0 // This would come from orders API
      });
    } catch (error) {
      toast.error('Failed to load seller data');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      toast.success('Product deleted');
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">{userInfo.sellerInfo?.businessName}</p>
        </div>
        <Link to="/seller/add-product" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-blue-100 mb-1">Total Products</p>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-green-100 mb-1">Total Sales</p>
          <p className="text-3xl font-bold">{stats.totalSales}</p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-purple-100 mb-1">Inventory Value</p>
          <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <p className="text-orange-100 mb-1">Rating</p>
          <p className="text-3xl font-bold">
            ⭐ {userInfo.sellerInfo?.rating?.toFixed(1) || '0.0'}
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Your Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven't added any products yet</p>
            <Link to="/seller/add-product" className="btn btn-primary">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.images?.[0]?.url || 'https://via.placeholder.com/50'}
                          alt={product.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div className="ml-3">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold">${product.price}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      ⭐ {product.rating.toFixed(1)} ({product.numReviews})
                    </td>
                    <td className="px-4 py-4 space-x-2">
                      <Link
                        to={`/seller/edit-product/${product._id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
