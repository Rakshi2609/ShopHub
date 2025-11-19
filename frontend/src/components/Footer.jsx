import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-500">ShopHub</h3>
            <p className="text-gray-400">
              Your dropshipping marketplace. Sell products without inventory, we handle the rest.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/become-seller" className="text-gray-400 hover:text-white transition">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-white transition">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/seller/dashboard" className="text-gray-400 hover:text-white transition">
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="mb-2">&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          <p className="text-sm">
            Made with ❤️ by{' '}
            <a 
              href="https://www.linkedin.com/in/rakshith-ganjimut/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition"
            >
              Rakshith
            </a>
            {' '}& AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
