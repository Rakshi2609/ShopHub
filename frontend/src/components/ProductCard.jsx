import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Link to={`/product/${product._id}`} className="card hover:shadow-xl transition group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm mb-1">{product.category}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <FiStar className="text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({product.numReviews})</span>
        </div>

        <div className="flex items-center gap-2">
          {product.discountPrice > 0 ? (
            <>
              <span className="text-xl font-bold text-primary-600">
                ${product.discountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
