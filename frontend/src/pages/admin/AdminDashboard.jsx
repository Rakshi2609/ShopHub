import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { FiPackage, FiDollarSign, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const [ordersRes, productsRes, usersRes] = await Promise.all([
          axios.get(`${API_URL}/api/orders/stats`, config),
          axios.get(`${API_URL}/api/products`, config),
          axios.get(`${API_URL}/api/users`, config)
        ]);

        setStats({
          totalOrders: ordersRes.data.totalOrders,
          totalRevenue: ordersRes.data.totalRevenue,
          recentOrders: ordersRes.data.recentOrders,
          totalProducts: productsRes.data.total,
          totalUsers: usersRes.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [userInfo]);

  if (loading) return <Loader />;

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || 0}`,
      icon: <FiDollarSign size={32} />,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <FiPackage size={32} />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: <FiShoppingBag size={32} />,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <FiUsers size={32} />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/admin/products/add" className="card p-6 hover:shadow-xl transition bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <FiPackage size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Add New Product</h3>
          <p className="text-blue-100">Create a new product listing</p>
        </Link>
        <Link to="/admin/products" className="card p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Manage Products</h3>
          <p className="text-gray-600">Add, edit, or remove products</p>
        </Link>
        <Link to="/orders" className="card p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
          <p className="text-gray-600">View and update order status</p>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">{card.title}</p>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              <div className={`${card.color} text-white p-4 rounded-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.user?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/order/${order._id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
