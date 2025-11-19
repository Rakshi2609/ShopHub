import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?keyword=${searchQuery}`;
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ShopHub
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pr-10"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <FiSearch className="text-gray-400" />
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/products" className="hover:text-primary-600 transition">
              Products
            </Link>
            
            <Link to="/cart" className="relative hover:text-primary-600 transition">
              <FiShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center gap-2 hover:text-primary-600 transition">
                  <FiUser size={24} />
                  <span>{userInfo.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  {userInfo.isSeller && (
                    <Link
                      to="/seller/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 text-green-600 font-semibold"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  {!userInfo.isSeller && userInfo.role !== 'admin' && (
                    <Link
                      to="/become-seller"
                      className="block px-4 py-2 hover:bg-gray-100 text-blue-600 font-semibold"
                    >
                      Become a Seller
                    </Link>
                  )}
                  {userInfo.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem('userInfo');
                      window.location.href = '/';
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </form>
            <nav className="flex flex-col gap-4">
              <Link to="/products" className="hover:text-primary-600">
                Products
              </Link>
              {userInfo ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  {userInfo.isSeller && (
                    <Link to="/seller/dashboard" className="text-green-600 font-semibold">
                      Seller Dashboard
                    </Link>
                  )}
                  {!userInfo.isSeller && userInfo.role !== 'admin' && (
                    <Link to="/become-seller" className="text-blue-600 font-semibold">
                      Become a Seller
                    </Link>
                  )}
                  {userInfo.role === 'admin' && (
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem('userInfo');
                      window.location.href = '/';
                    }}
                    className="text-left text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary w-full">
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
