import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mb-12">
          <svg
            className="w-64 h-64 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center justify-center gap-2"
          >
            <FiHome size={20} />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="btn btn-secondary inline-flex items-center justify-center gap-2"
          >
            <FiShoppingBag size={20} />
            Shop Products
          </Link>
        </div>

        <div className="mt-12 text-gray-500">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
