import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, createReview } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import toast from 'react-hot-toast';
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiZap, FiTrendingUp, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { product, loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [imageHover, setImageHover] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (product) {
      // Trigger sparkle effect
      const newSparkles = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 1000);

      dispatch(
        addToCart({
          _id: product._id,
          name: product.name,
          image: product.images[0]?.url,
          price: product.discountPrice || product.price,
          stock: product.stock,
          quantity
        })
      );
      toast.success('Added to cart!', {
        icon: '🛒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error('Please login to write a review');
      navigate('/login');
      return;
    }

    try {
      await dispatch(
        createReview({
          productId: id,
          review: { rating, comment }
        })
      ).unwrap();
      toast.success('Review submitted!');
      setRating(5);
      setComment('');
      dispatch(fetchProductById(id));
    } catch (err) {
      toast.error(err || 'Failed to submit review');
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="error">{error}</Message>;
  if (!product) return <Message variant="error">Product not found</Message>;

  const finalPrice = product.discountPrice || product.price;

  return (
    <div className="container-custom py-8 relative">
      {/* Sparkle effects when adding to cart */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-50 w-4 h-4 bg-yellow-400 rounded-full animate-ping"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
        />
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:items-start">
        {/* Product Images */}
        <div 
          className="relative group sticky top-4"
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <div className={`transition-all duration-500 ${imageHover ? 'scale-105 rotate-1' : 'scale-100'}`}>
            {product.images && product.images.length > 0 ? (
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <Carousel 
                  showThumbs={true} 
                  infiniteLoop 
                  autoPlay
                  interval={3000}
                  transitionTime={500}
                  stopOnHover={false}
                  className="animate-fade-in"
                >
                  {product.images.map((image, idx) => (
                    <div key={idx} className="relative" style={{ height: '500px' }}>
                      <img 
                        src={image.url} 
                        alt={`${product.name} ${idx + 1}`}
                        className="transition-transform duration-700 group-hover:scale-110 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/500"
                alt={product.name}
                className="w-full rounded-lg object-cover"
                style={{ height: '500px' }}
              />
            )}
          </div>
          
          {/* Floating action buttons */}
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-3 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-all duration-300">
              <FiHeart className="text-red-500 hover:fill-current" size={20} />
            </button>
            <button className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 hover:scale-110 transition-all duration-300">
              <FiShare2 className="text-blue-500" size={20} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="animate-slide-in-right flex flex-col">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4 bg-white rounded-lg p-2 shadow-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`transition-all duration-300 hover:scale-125 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current animate-pulse' : 'text-gray-300'}`}
                    size={16}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 hover:text-primary-600 transition-colors font-semibold">
                ({product.numReviews} reviews)
              </span>
            </div>

            <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200 transform hover:scale-105 transition-transform duration-300">
              {product.discountPrice > 0 ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary-600 animate-pulse">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce inline-flex items-center gap-1 w-fit">
                    <FiZap className="animate-spin" size={12} />
                    SAVE {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF!
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-primary-600">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-700 leading-relaxed hover:text-gray-900 transition-colors">{product.description}</p>
            </div>

            <div className="mb-4 space-y-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl">
              <p className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300 text-sm">
                <span className="font-bold text-gray-700">Brand:</span> 
                <span className="text-primary-600 font-semibold">{product.brand}</span>
              </p>
              <p className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300 text-sm">
                <span className="font-bold text-gray-700">Category:</span> 
                <span className="text-primary-600 font-semibold">{product.category}</span>
              </p>
              <p className={`flex items-center gap-2 font-bold text-sm hover:translate-x-2 transition-all duration-300 ${product.stock > 0 ? 'text-green-600 animate-pulse' : 'text-red-600'}`}>
                {product.stock > 0 ? (
                  <>
                    <span className="bg-green-500 w-2 h-2 rounded-full animate-ping absolute"></span>
                    <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                    In Stock ({product.stock} available)
                  </>
                ) : (
                  <>
                    <span className="bg-red-500 w-2 h-2 rounded-full"></span>
                    Out of Stock
                  </>
                )}
              </p>
            </div>

            {product.stock > 0 && (
              <div className="mb-4 bg-white p-3 rounded-lg shadow-sm">
                <label className="block font-bold mb-2 text-sm text-gray-700">Quantity</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input w-full hover:border-primary-600 transition-all transform hover:scale-105 text-sm font-semibold"
                >
                  {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.stock === 0}
              className="btn btn-primary w-full text-base py-2.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 font-bold"
            >
              <FiShoppingCart size={20} />
              Add to Cart
            </button>

            {/* Additional Info Section */}
            <div className="mt-4 space-y-3">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <FiTruck size={18} />
                  <span className="font-semibold">Free shipping on orders over $100</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <FiShield size={18} />
                  <span className="font-semibold">30-day money-back guarantee</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <FiHeadphones size={18} />
                  <span className="font-semibold">24/7 customer support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Write Review */}
        <div className="card p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FiStar className="text-yellow-400 animate-spin-slow" />
            Write a Review
          </h2>
          <form onSubmit={submitReviewHandler}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="input hover:border-primary-600 transition-colors focus:scale-105"
              >
                <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                <option value={4}>⭐⭐⭐⭐ Good</option>
                <option value={3}>⭐⭐⭐ Average</option>
                <option value={2}>⭐⭐ Poor</option>
                <option value={1}>⭐ Terrible</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Comment</label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input hover:border-primary-600 transition-all focus:scale-105"
                required
                placeholder="Share your experience..."
              />
            </div>
            <button type="submit" className="btn btn-primary transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl">
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="card p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          {product.reviews && product.reviews.length === 0 ? (
            <p className="text-gray-600 italic">No reviews yet - Be the first! 🌟</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {product.reviews.map((review, idx) => (
                <div 
                  key={review._id} 
                  className="border-b pb-4 hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-primary-600">{review.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`transition-all duration-300 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    📅 {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 hover:text-gray-900 transition-colors">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
