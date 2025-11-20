import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, savePaymentMethod } from '../redux/slices/cartSlice';
import { createOrder } from '../redux/slices/orderSlice';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';
const stripePromise = loadStripe('your_stripe_publishable_key');

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    street: shippingAddress.street || '',
    city: shippingAddress.city || '',
    state: shippingAddress.state || '',
    zipCode: shippingAddress.zipCode || '',
    country: shippingAddress.country || ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethod || 'Stripe');
  const [loading, setLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  // Auto-fetch location based on city name when Enter is pressed
  const handleCityChange = (cityName) => {
    setAddress({ ...address, city: cityName });
  };

  const handleCityKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cityName = address.city;

      if (cityName.length < 3) {
        toast.error('Please enter a valid city name');
        return;
      }

      setCityLoading(true);
      try {
        // Using OpenStreetMap's Nominatim API (free, no API key required)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const location = data[0];
          const addressParts = location.display_name.split(', ');
          
          // Extract state/province and country
          const country = addressParts[addressParts.length - 1];
          const state = addressParts[addressParts.length - 2] || '';

          setAddress(prev => ({
            ...prev,
            state: state,
            country: country
          }));
          
          toast.success(`Location found: ${state}, ${country}`);
        } else {
          toast.error('City not found. Please enter manually.');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        toast.error('Failed to fetch location');
      } finally {
        setCityLoading(false);
      }
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address));
    setStep(2);
  };

  const handlePaymentMethodSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(selectedPaymentMethod));
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price
        })),
        shippingAddress: address,
        paymentMethod: selectedPaymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total
      };

      if (selectedPaymentMethod === 'Stripe') {
        // Create payment intent
        const { data } = await axios.post(`${API_URL}/api/orders/create-payment-intent`, {
          amount: total
        }, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        });

        // Confirm payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)
            }
          }
        );

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        // Create order with payment result
        const result = await dispatch(createOrder(orderData)).unwrap();
        
        // Update order to paid
        await axios.put(
          `/api/orders/${result._id}/pay`,
          {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
            email_address: userInfo.email
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        );

        toast.success('Order placed successfully!');
        navigate(`/order/${result._id}`);
      } else {
        // COD order
        const result = await dispatch(createOrder(orderData)).unwrap();
        toast.success('Order placed successfully!');
        navigate(`/order/${result._id}`);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {['Shipping', 'Payment', 'Review'].map((label, idx) => (
          <div key={label} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step > idx ? 'bg-primary-600 text-white' : 'bg-gray-300'
              }`}
            >
              {idx + 1}
            </div>
            <span className={`ml-2 ${step > idx ? 'text-primary-600' : 'text-gray-500'}`}>
              {label}
            </span>
            {idx < 2 && <div className="w-20 h-0.5 bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-semibold mb-2">
                      City {cityLoading && <span className="text-sm text-gray-500">(searching...)</span>}
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      onKeyPress={handleCityKeyPress}
                      className="input"
                      placeholder="Enter city name and press Enter"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Press Enter to auto-fill State & Country</p>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">State/Province</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="input"
                      placeholder="Auto-filled"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block font-semibold mb-2">Zip Code</label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      className="input"
                      placeholder="Enter zip code"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Country</label>
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className="input"
                      placeholder="Auto-filled"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Continue
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              <form onSubmit={handlePaymentMethodSubmit}>
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Stripe"
                      checked={selectedPaymentMethod === 'Stripe'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-semibold">Credit/Debit Card (Stripe)</span>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={selectedPaymentMethod === 'COD'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-semibold">Cash on Delivery</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-secondary"
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Review Order */}
          {step === 3 && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Review Order</h2>
              
              {selectedPaymentMethod === 'Stripe' && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Card Details</h3>
                  <div className="border p-4 rounded-lg">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-gray-600">
                  {address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Order Items</h3>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between py-2 border-b">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !stripe}
                  className="btn btn-primary flex-1"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
