import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, createReview } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import toast from 'react-hot-toast';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
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

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (product) {
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
      toast.success('Added to cart!');
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
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          {product.images && product.images.length > 0 ? (
            <Carousel showThumbs={true} infiniteLoop autoPlay>
              {product.images.map((image, idx) => (
                <div key={idx}>
                  <img src={image.url} alt={`${product.name} ${idx + 1}`} />
                </div>
              ))}
            </Carousel>
          ) : (
            <img
              src="https://via.placeholder.com/500"
              alt={product.name}
              className="w-full rounded-lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>

          <div className="mb-6">
            {product.discountPrice > 0 ? (
              <div>
                <span className="text-3xl font-bold text-primary-600">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through ml-3">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-3 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <p className="mb-2">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input w-32"
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
            className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Write Review */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <form onSubmit={submitReviewHandler}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="input"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Terrible</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Comment</label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {product.reviews && product.reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {product.reviews.map((review) => (
                <div key={review._id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{review.comment}</p>
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
