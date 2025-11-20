import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    // Fetch products for recommendations
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    // Get random 4 products for recommendations (excluding items already in cart)
    if (products && products.length > 0) {
      const cartProductIds = cartItems.map(item => item._id);
      const availableProducts = products.filter(p => !cartProductIds.includes(p._id));
      const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
      setRecommendedProducts(shuffled.slice(0, 4));
    }
  }, [products, cartItems]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const updateQuantityHandler = (id, quantity) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <FiShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="card">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-4 border-b last:border-b-0"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <Link
                    to={`/product/${item._id}`}
                    className="font-semibold hover:text-primary-600 transition"
                  >
                    {item.name}
                  </Link>
                  <p className="text-primary-600 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantityHandler(item._id, Number(e.target.value))
                    }
                    className="input w-20"
                  >
                    {[...Array(Math.min(item.stock, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/checkout" className="btn btn-primary w-full">
              Proceed to Checkout
            </Link>
            
            <Link
              to="/products"
              className="btn btn-secondary w-full mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
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
    </div>
  );
};

export default CartPage;
