import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Bell,
  Leaf,
  Package,
  Clock,
  Star
} from 'lucide-react';
import { useCartStore } from '../../../stores/cartStore';
import { useConsumerStore } from '../../../stores/consumerStore';
import { searchProducts, categories } from '../../../data/sampleProducts';

const EcommerceHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const { getTotalItems, isOpen: cartOpen, toggleCart } = useCartStore();
  const { user, savedProducts } = useConsumerStore();

  const cartItemCount = getTotalItems();
  const savedItemCount = savedProducts?.length || 0;

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery).slice(0, 5);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const deliveryLocation = user?.location || 'Select location';

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-sage-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Delivery Location */}
              <div className="relative">
                <button
                  onClick={() => setShowLocationMenu(!showLocationMenu)}
                  className="flex items-center space-x-1 hover:text-sage-200 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Deliver to {deliveryLocation}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                <AnimatePresence>
                  {showLocationMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 p-4 z-50"
                    >
                      <h3 className="font-semibold mb-2">Choose your location</h3>
                      <p className="text-sm text-gray-600 mb-3">To see product availability and delivery options</p>
                      <button className="w-full bg-sage-500 text-white py-2 rounded-lg hover:bg-sage-600 transition-colors">
                        Update Location
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className="hidden lg:inline">🌱 Free delivery on orders above ₹500</span>
              <span className="hidden md:inline">📞 1800-123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold text-gray-900">HerbiProof</span>
              <p className="text-sm text-sage-600 hidden sm:block font-medium">Farm to Fork Verified</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="search-bar-enhanced">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for organic tomatoes, cold-pressed oils..."
                className="search-input-enhanced"
              />
              <Search className="search-icon-enhanced w-5 h-5" />
              <button
                type="submit"
                className="search-btn-enhanced"
              >
                Search
              </button>
            </form>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearchResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
                >
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-sage-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-sage-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{product.brand}</span>
                          <span>•</span>
                          <span>{product.currency}{product.price}</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="ml-1">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  <div className="p-3 border-t border-gray-100">
                    <button
                      onClick={(e) => handleSearch(e)}
                      className="w-full text-center text-sage-600 hover:text-sage-700 font-medium"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Saved Products */}
            <button
              onClick={() => navigate('/saved')}
              className="relative p-3 text-gray-600 hover:text-sage-600 hover:bg-sage-50 rounded-xl transition-all duration-200"
            >
              <Heart className="w-6 h-6" />
              {savedItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-sm">
                  {savedItemCount > 9 ? '9+' : savedItemCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={toggleCart}
              className="relative p-3 text-gray-600 hover:text-sage-600 hover:bg-sage-50 rounded-xl transition-all duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sage-500 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-sm">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-sage-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">Hello, {user?.name || 'User'}</p>
                  <p className="text-xs text-sage-600">Account & Orders</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                    </div>
                    
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/orders');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-sage-50 transition-colors flex items-center space-x-2"
                      >
                        <Package className="w-4 h-4" />
                        <span>Your Orders</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/saved');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-sage-50 transition-colors flex items-center space-x-2"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Saved Items</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/account');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-sage-50 transition-colors flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 py-2">
                      <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-sage-600 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="hidden md:block bg-sage-50 border-t border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {categories.filter(cat => cat.featured).map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-sage-600 transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.filter(cat => cat.featured).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        navigate(`/category/${category.id}`);
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left py-2 text-gray-700 hover:text-sage-600 transition-colors"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile User Actions */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Account</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate('/orders');
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left py-2 text-gray-700 hover:text-sage-600 transition-colors"
                  >
                    Your Orders
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved');
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left py-2 text-gray-700 hover:text-sage-600 transition-colors"
                  >
                    Saved Items
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default EcommerceHeader;
