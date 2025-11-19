import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/slices/orderSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <Message variant="error">{error}</Message>;
  if (!order) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FiPackage className="text-blue-600" size={24} />;
      case 'Shipped':
        return <FiTruck className="text-yellow-600" size={24} />;
      case 'Delivered':
        return <FiCheckCircle className="text-green-600" size={24} />;
      default:
        return <FiPackage className="text-gray-600" size={24} />;
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Order #{order._id}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon(order.orderStatus)}
              <div>
                <h2 className="text-xl font-semibold">Order Status</h2>
                <p className="text-gray-600">{order.orderStatus}</p>
              </div>
            </div>
            
            {order.isPaid ? (
              <Message variant="success">
                Paid on {new Date(order.paidAt).toLocaleDateString()}
              </Message>
            ) : (
              <Message variant="warning">Not Paid</Message>
            )}

            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
              </Message>
            ) : (
              <Message variant="info">Not Delivered</Message>
            )}
          </div>

          {/* Shipping Address */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <p className="text-gray-700">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p className="text-gray-700">{order.paymentMethod}</p>
          </div>

          {/* Order Items */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
