import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Search, 
  User, 
  MapPin, 
  Star, 
  Shield, 
  Leaf, 
  TrendingUp, 
  Heart, 
  Camera,
  Filter,
  Bell,
  Menu,
  X
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import Universal components
import DashboardLayout from '../components/Universal/Dashboard/DashboardLayout';
import QuickActions from '../components/Universal/Dashboard/QuickActions';
import ActivityFeed from '../components/Universal/Dashboard/ActivityFeed';
import StatsFeed from '../components/Universal/Dashboard/StatsFeed';
import ProductCard from '../components/Universal/Product/ProductCard';
import ProductSearch from '../components/Universal/Product/ProductSearch';
import ProductTable from '../components/Universal/Product/ProductTable';

// Import stores and hooks
import { useConsumerStore } from '../stores/consumerStore';
import { useProductQuery } from '../hooks/useProductQuery';

const ConsumerPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Consumer store
  const { 
    user, 
    recentlyScanned, 
    savedProducts, 
    tracedProducts,
    addToRecentlyScanned,
    toggleSavedProduct,
    userStats 
  } = useConsumerStore();

  // Mock featured products - Replace with actual API call
  const { data: featuredProducts, isLoading } = useProductQuery('featured');

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'browse', label: 'Browse Products', icon: Search },
    { id: 'traced', label: 'My Traced Items', icon: Shield },
    { id: 'saved', label: 'Saved Products', icon: Heart },
  ];

  const heroFeatures = [
    {
      icon: QrCode,
      title: 'Scan & Verify',
      description: 'Instantly verify product authenticity with QR codes',
      color: 'sage-400'
    },
    {
      icon: MapPin,
      title: 'Farm to Fork',
      description: 'Track complete journey from farm to your table',
      color: 'sage-500'
    },
    {
      icon: Shield,
      title: 'Blockchain Verified',
      description: 'Trust in immutable, transparent supply chain',
      color: 'sage-600'
    },
    {
      icon: Leaf,
      title: 'Sustainability Score',
      description: 'Make eco-conscious choices with detailed insights',
      color: 'sage-700'
    }
  ];

  const handleQRScan = (result) => {
    // Mock QR scan handling - Replace with actual scan logic
    toast.success(`Product scanned: ${result}`);
    addToRecentlyScanned(result);
    setShowQRScanner(false);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    // Navigate to product detail or open modal
  };

  const renderHeroSection = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-sage-50 to-white">
      <div className="absolute inset-0 bg-sage-glass backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Trust Your
            <span className="text-sage-500 block">Food Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the complete story behind your food with blockchain-verified traceability. 
            From farm to fork, make informed choices with transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQRScanner(true)}
              className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 shadow-sage transition-all duration-300"
            >
              <Camera className="w-6 h-6" />
              Scan QR Code
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('browse')}
              className="border-2 border-sage-500 text-sage-600 hover:bg-sage-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Browse Products
            </motion.button>
          </div>

          {/* Hero Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {heroFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-glass border border-sage-100 hover:shadow-sage transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <nav className="bg-white/90 backdrop-blur-md border-b border-sage-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-sage-600">HerbiProof</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-sage-100 text-sage-700'
                      : 'text-gray-600 hover:text-sage-600 hover:bg-sage-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <ProductSearch 
              onSearch={setSearchQuery}
              className="hidden md:block"
            />
            <button className="p-2 text-gray-600 hover:text-sage-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-sage-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-sage-600 transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-sage-100">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-3 ${
                      activeTab === item.id
                        ? 'bg-sage-100 text-sage-700'
                        : 'text-gray-600 hover:text-sage-600 hover:bg-sage-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <QuickActions />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <StatsFeed />
        </div>
      </div>
      
      {/* Featured Products Section */}
      <div className="bg-white rounded-2xl shadow-glass p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <button 
            onClick={() => setActiveTab('browse')}
            className="text-sage-600 hover:text-sage-700 font-medium transition-colors"
          >
            View All
          </button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-sage-100 rounded-xl h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts?.slice(0, 6).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onSelect={handleProductSelect}
                variant="consumer"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-glass p-6">
        <ProductSearch onSearch={setSearchQuery} expanded />
      </div>
      <ProductTable 
        searchQuery={searchQuery}
        onProductSelect={handleProductSelect}
        variant="consumer"
      />
    </div>
  );

  const renderTracedItems = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-glass p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Traced Products</h2>
        <p className="text-gray-600 mb-6">Products you've scanned and verified</p>
        
        {tracedProducts.length === 0 ? (
          <div className="text-center py-12">
            <QrCode className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No traced products yet</h3>
            <p className="text-gray-600 mb-6">Start scanning QR codes to track your products</p>
            <button
              onClick={() => setShowQRScanner(true)}
              className="bg-sage-500 hover:bg-sage-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Scan First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onSelect={handleProductSelect}
                variant="traced"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSavedProducts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-glass p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Saved Products</h2>
        <p className="text-gray-600 mb-6">Products you've bookmarked for later</p>
        
        {savedProducts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved products yet</h3>
            <p className="text-gray-600 mb-6">Save products you're interested in for easy access</p>
            <button
              onClick={() => setActiveTab('browse')}
              className="bg-sage-500 hover:bg-sage-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onSelect={handleProductSelect}
                variant="saved"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'browse':
        return renderBrowse();
      case 'traced':
        return renderTracedItems();
      case 'saved':
        return renderSavedProducts();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-sage-50">
      {renderNavigation()}
      
      {/* Show hero section only on dashboard */}
      {activeTab === 'dashboard' && renderHeroSection()}
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* QR Scanner Modal - This would contain the actual QR scanner component */}
      <AnimatePresence>
        {showQRScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQRScanner(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <QrCode className="w-16 h-16 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">QR Scanner</h3>
                <p className="text-gray-600 mb-6">Position the QR code within the frame</p>
                
                {/* QR Scanner Component will be integrated here */}
                <div className="bg-sage-100 rounded-xl h-64 flex items-center justify-center mb-6">
                  <div className="text-sage-600">
                    <Camera className="w-12 h-12 mx-auto mb-2" />
                    <p>Camera view will appear here</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowQRScanner(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleQRScan('DEMO_PRODUCT_123')}
                    className="flex-1 px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
                  >
                    Demo Scan
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating QR Scan Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowQRScanner(true)}
        className="fixed bottom-6 right-6 bg-sage-500 hover:bg-sage-600 text-white p-4 rounded-full shadow-sage-lg z-40 transition-all duration-300"
      >
        <QrCode className="w-6 h-6" />
      </motion.button>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#9CAF88',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default ConsumerPortal;
