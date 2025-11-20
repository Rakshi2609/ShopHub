import { Link } from 'react-router-dom';
import { FiStar, FiZap } from 'react-icons/fi';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Link 
      to={`/product/${product._id}`} 
      className="card hover:shadow-xl transition-all duration-300 group relative overflow-hidden transform hover:-translate-y-2 hover:rotate-1 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Crazy animated border */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-rainbow -z-10" style={{ padding: '2px' }}></div>
      
      <div className="relative overflow-hidden bg-white" style={{ aspectRatio: '1/1.2' }}>
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-500"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold animate-bounce">
            <FiZap className="inline mr-1" />
            -{discountPercentage}%
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg animate-pulse">Out of Stock</span>
          </div>
        )}
        
        {/* Sparkle effect on hover */}
        {isHovered && (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-orange-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </>
        )}
      </div>
      <div className="p-4 bg-white relative flex flex-col flex-grow">
        <p className="text-gray-500 text-sm mb-1 group-hover:text-orange-500 transition-colors">{product.category}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition group-hover:animate-pulse min-h-[3.5rem]">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <FiStar className="text-yellow-400 fill-current group-hover:animate-spin" />
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({product.numReviews})</span>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          {product.discountPrice > 0 ? (
            <>
              <span className="text-xl font-bold text-primary-600 group-hover:scale-110 transition-transform inline-block">
                ${product.discountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-primary-600 group-hover:scale-110 transition-transform inline-block">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
