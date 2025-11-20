import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../redux/slices/orderSlice';
import { fetchProducts } from '../redux/slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import { FiPackage } from 'react-icons/fi';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    // Get random 4 products for recommendations
    if (products && products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRecommendedProducts(shuffled.slice(0, 4));
    }
  }, [products]);

  if (loading) return <Loader />;
  if (error) return <Message variant="error">{error}</Message>;

  return (
    <div className="container-custom py-8 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders && orders.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">No orders yet</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="card overflow-x-auto mb-12">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid
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
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="max-w-xs">
                        {order.orderItems && order.orderItems.length > 0 ? (
                          <div>
                            <div className="font-semibold">{order.orderItems[0].name}</div>
                            {order.orderItems.length > 1 && (
                              <div className="text-xs text-gray-500 mt-1">
                                +{order.orderItems.length - 1} more item{order.orderItems.length > 2 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">No items</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.isPaid ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommended Products Section */}
          {recommendedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">You Might Also Like</h2>
                <Link to="/products" className="text-primary-600 hover:text-primary-700 font-semibold">
                  View All Products →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage;
