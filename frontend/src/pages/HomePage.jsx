import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones, FiDollarSign, FiTrendingUp, FiUsers, FiPackage, FiZap, FiStar } from 'react-icons/fi';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
    
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, [dispatch]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: ['#f97316', '#fb923c', '#fdba74', '#fbbf24', '#fef3c7'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const features = [
    {
      icon: <FiShoppingBag size={40} />,
      title: 'Start Dropshipping',
      description: 'Sell products without holding inventory'
    },
    {
      icon: <FiTruck size={40} />,
      title: 'Direct Shipping',
      description: 'We ship directly to your customers'
    },
    {
      icon: <FiShield size={40} />,
      title: 'No Upfront Costs',
      description: 'List and sell with zero inventory investment'
    },
    {
      icon: <FiHeadphones size={40} />,
      title: 'Seller Support',
      description: 'Dedicated support for your business'
    }
  ];

  return (
    <div className="relative">
      {/* Confetti Animation */}
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="fixed pointer-events-none z-50 w-3 h-3 animate-confetti"
          style={{
            left: `${conf.x}%`,
            top: `${conf.y}%`,
            backgroundColor: conf.color,
            transform: `rotate(${conf.rotation}deg)`,
            animation: 'confetti-fall 3s ease-out forwards'
          }}
        />
      ))}

      {/* Hero Section with Interactive Gradient Background */}
      <section 
        className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 cursor-pointer"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}

        {/* Decorative Background Elements with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob transition-transform duration-300"
            style={{
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) scale(1)`
            }}
          ></div>
          <div 
            className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 transition-transform duration-300"
            style={{
              transform: `translate(${-mousePosition.x * 40}px, ${mousePosition.y * 40}px) scale(1.1)`
            }}
          ></div>
          <div 
            className="absolute -bottom-8 left-1/3 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 transition-transform duration-300"
            style={{
              transform: `translate(${mousePosition.x * 25}px, ${-mousePosition.y * 25}px) scale(0.9)`
            }}
          ></div>
          
          {/* Additional floating elements */}
          <div 
            className="absolute top-1/4 right-1/3 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 transition-transform duration-500"
            style={{
              transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transition-transform duration-700"
            style={{
              transform: `translate(${-mousePosition.x * 35}px, ${-mousePosition.y * 35}px)`
            }}
          ></div>
        </div>

        {/* Content with Parallax Effect */}
        <div 
          className="container-custom relative z-10 transition-transform duration-200"
          style={{
            transform: `translate(${mousePosition.x * 10 - 5}px, ${mousePosition.y * 10 - 5}px)`
          }}
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse-slow">
              Your Dropshipping Marketplace
            </h1>
            <p className="text-xl mb-8 text-white drop-shadow-md hover:scale-102 transition-transform duration-300">
              ShopHub - Where anyone can become a seller. List products, we handle shipping, you earn profits. 
              Start your dropshipping business today with zero inventory risk.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/become-seller" 
                className="btn bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group"
                onClick={triggerConfetti}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiZap className="group-hover:animate-spin" />
                  Become a Seller
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link 
                to="/products" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiStar className="group-hover:animate-bounce" />
                  Shop Products
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 hover:scale-105 transition-transform duration-300">Why Choose ShopHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-gray-50 border border-gray-100 group"
              >
                <div className="text-primary-600 flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">How Dropshipping Works on ShopHub</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Launch your e-commerce business without the overhead costs of traditional retail. 
            Our platform handles the logistics while you focus on growing your sales.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage size={32} className="text-primary-600" />
              </div>
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">1</div>
              <h3 className="text-xl font-bold mb-3">List Products</h3>
              <p className="text-gray-600 mb-2">
                Browse our extensive catalog of quality products across multiple categories.
              </p>
              <p className="text-sm text-gray-500">
                Add products to your store with auto-fetched images and detailed descriptions. 
                No upfront inventory investment required.
              </p>
            </div>
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign size={32} className="text-primary-600" />
              </div>
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">2</div>
              <h3 className="text-xl font-bold mb-3">Customer Places Order</h3>
              <p className="text-gray-600 mb-2">
                When customers buy from you, you purchase from us at wholesale price.
              </p>
              <p className="text-sm text-gray-500">
                Keep the difference as your profit. Our smart pricing calculator helps you 
                set competitive prices while maximizing margins.
              </p>
            </div>
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck size={32} className="text-primary-600" />
              </div>
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">3</div>
              <h3 className="text-xl font-bold mb-3">We Ship Directly</h3>
              <p className="text-gray-600 mb-2">
                We handle all packaging, shipping, and delivery to your customer's doorstep.
              </p>
              <p className="text-sm text-gray-500">
                Focus on marketing and customer service while we take care of the logistics. 
                Track all shipments in real-time from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Trending Products</h2>
              <p className="text-gray-600 mt-2">Discover what's popular in our marketplace</p>
            </div>
            <Link to="/products" className="text-primary-600 hover:underline font-semibold">
              View All →
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories from Our Sellers</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have built successful businesses on ShopHub
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "ShopHub transformed my side hustle into a full-time business. The platform's intuitive interface 
                and automated features allow me to manage everything efficiently. I went from struggling with inventory 
                management to focusing purely on customer acquisition and marketing."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiUsers className="text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Fashion & Accessories Seller</p>
                  <p className="text-xs text-primary-600 mt-1">Member since 2024 • 500+ Sales</p>
                </div>
              </div>
            </div>
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The best part about ShopHub is the reliability and speed of shipping. My customers are always impressed 
                with how quickly they receive their orders. The platform's customer support has been exceptional, helping me 
                resolve issues within minutes. Highly recommend for serious sellers."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiUsers className="text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-500">Electronics & Gadgets Seller</p>
                  <p className="text-xs text-primary-600 mt-1">Member since 2023 • 1,200+ Sales</p>
                </div>
              </div>
            </div>
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I achieved my first $10,000 monthly revenue milestone just three months after joining ShopHub. 
                The analytics dashboard helped me identify my best-selling products and optimize my pricing strategy. 
                This platform is a complete game-changer for aspiring entrepreneurs."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiTrendingUp className="text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">Home & Garden Specialist</p>
                  <p className="text-xs text-primary-600 mt-1">Member since 2024 • 800+ Sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Dropshipping Business?</h2>
          <p className="text-xl mb-8">
            Join thousands of successful sellers on ShopHub. No inventory, no hassle, just profits.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/become-seller" className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold">
              Start Selling
            </Link>
            <Link to="/register" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold">
              Sign Up as Buyer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
