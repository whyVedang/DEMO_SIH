import React, { useState } from 'react';
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
  Bell,
  Menu,
  X,
  ArrowRight,
  Package,
  Award,
  Truck,
  Users,
  ChevronRight,
  Gift,
  Zap,
  ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WorkingConsumerPortal = () => {
  const navigate = useNavigate();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample product data
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Tomato Sauce",
      brand: "FreshPure",
      price: "₹185",
      originalPrice: "₹220",
      rating: 4.5,
      reviewCount: 234,
      image: "🍅",
      verified: true,
      inStock: true
    },
    {
      id: 2,
      name: "Cold-Pressed Coconut Oil",
      brand: "PureHarvest", 
      price: "₹450",
      rating: 4.8,
      reviewCount: 189,
      image: "🥥",
      verified: true,
      inStock: true
    },
    {
      id: 3,
      name: "Organic Honey",
      brand: "GoldenBee",
      price: "₹320",
      originalPrice: "₹380",
      rating: 4.6,
      reviewCount: 156,
      image: "🍯",
      verified: true,
      inStock: true
    },
    {
      id: 4,
      name: "Quinoa Flour",
      brand: "HealthyGrains",
      price: "₹280",
      rating: 4.3,
      reviewCount: 98,
      image: "🌾",
      verified: true,
      inStock: true
    },
    {
      id: 5,
      name: "Organic Green Tea",
      brand: "PureTea",
      price: "₹150",
      originalPrice: "₹180",
      rating: 4.7,
      reviewCount: 203,
      image: "🍃",
      verified: true,
      inStock: true
    },
    {
      id: 6,
      name: "Almond Butter",
      brand: "NutriSpread",
      price: "₹520",
      rating: 4.4,
      reviewCount: 145,
      image: "🥜",
      verified: true,
      inStock: true
    },
    {
      id: 7,
      name: "Turmeric Powder",
      brand: "SpiceGarden",
      price: "₹120",
      originalPrice: "₹140",
      rating: 4.8,
      reviewCount: 267,
      image: "🧄",
      verified: true,
      inStock: true
    },
    {
      id: 8,
      name: "Organic Rice",
      brand: "PureGrains",
      price: "₹180",
      rating: 4.5,
      reviewCount: 189,
      image: "🍚",
      verified: true,
      inStock: true
    }
  ];

  const categories = [
    { id: 'organic-foods', name: 'Organic Foods', featured: true, productCount: 245 },
    { id: 'beverages', name: 'Beverages', featured: true, productCount: 89 },
    { id: 'snacks', name: 'Snacks', featured: true, productCount: 156 },
    { id: 'dairy', name: 'Dairy Products', featured: true, productCount: 67 },
    { id: 'grains', name: 'Grains & Cereals', featured: true, productCount: 134 }
  ];

  // Sample data
  const trustIndicators = [
    { label: '50K+ Products', icon: Package },
    { label: '500+ Farmers', icon: Users },
    { label: '100% Verified', icon: Shield },
    { label: 'Home Delivery', icon: Truck }
  ];

  const heroFeatures = [
    {
      icon: Shield,
      title: 'Blockchain Verified',
      description: 'Every product traceable from farm to your table with immutable blockchain technology',
      color: 'sage-500'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Hand-picked, certified organic products from trusted farmers nationwide',
      color: 'sage-600'
    },
    {
      icon: Gift,
      title: 'Best Prices',
      description: 'Direct from farmers, no middlemen markup - authentic products at fair prices',
      color: 'sage-700'
    }
  ];

  // Header Component
  const ModernHeader = () => (
    <header className="modern-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="logo-text">HerbiProof</div>
            <div className="logo-tagline">Authentic • Traceable • Pure</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#products" className="nav-link">Products</a>
          <a href="#why-choose-us" className="nav-link">Why Choose Us</a>
          <a href="#traceability" className="nav-link">Traceability</a>
          <a href="#about" className="nav-link">About</a>
          <button 
            onClick={() => navigate('/auth/login')}
            className="nav-link bg-sage-500 text-white px-4 py-2 rounded-lg hover:bg-sage-600 transition-colors"
          >
            SELL PRODUCTS
          </button>
        </nav>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <Search className="w-5 h-5 search-icon" />
            <input 
              type="text" 
              placeholder="Search for organic tomatoes, cold-pressed oils..."
              className="search-input"
            />
            <button className="search-btn">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          <button className="action-btn">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="action-btn">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="cart-badge">0</span>
          </button>
          <button className="action-btn">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );

  // Hero Section Component
  const HeroSection = () => (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-container">
        {/* Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-badge"
        >
          <Shield className="w-5 h-5" />
          <span>Blockchain Verified • Trusted by 50K+ Customers</span>
        </motion.div>
        
        {/* Main Headlines */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-title"
        >
          HerbiProof
          <span className="hero-title-gradient">
            Fresh, Verified & Authentic
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hero-description"
        >
          Shop premium organic products with complete blockchain traceability. 
          From farm to your table, every step verified for ultimate transparency and trust.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="hero-actions"
        >
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            <Package className="w-5 h-5" />
            Shop Now
          </button>
          <button
            onClick={() => setShowQRScanner(true)}
            className="btn-secondary"
          >
            <QrCode className="w-5 h-5" />
            Scan Product
          </button>
          <button
            onClick={() => navigate('/auth/login')}
            className="btn-secondary bg-sage-600 text-white border-sage-600 hover:bg-sage-700"
          >
            <Users className="w-5 h-5" />
            Sell Products
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="trust-indicators"
        >
          {trustIndicators.map((indicator, index) => (
            <div key={indicator.label} className="trust-item">
              <div className="trust-icon">
                <indicator.icon className="w-8 h-8 text-sage-600" />
              </div>
              <p className="trust-label">{indicator.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="feature-grid"
        >
          {heroFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div 
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-sage-100"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="text-6xl text-center mb-4 bg-sage-50 rounded-xl py-8">
        {product.image}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-sage-600 font-medium">{product.brand}</span>
          {product.verified && (
            <Shield className="w-4 h-4 text-sage-500" />
          )}
        </div>
        <h3 className="font-bold text-lg text-gray-900 leading-tight">{product.name}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-sage-600">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviewCount})</span>
        </div>
        <button className="w-full mt-4 bg-sage-500 text-white py-2 px-4 rounded-lg hover:bg-sage-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Categories Section
  const CategoriesSection = () => (
    <section className="py-20 bg-gradient-to-br from-sage-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-sage-600 bg-clip-text text-transparent mb-6"
          >
            Shop by Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover our carefully curated selection of premium organic products
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.filter(cat => cat.featured).map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/category/${category.id}`)}
              className="group bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-sage-100 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sage-100/50 to-sage-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-sage-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-sage-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                  {category.productCount} products
                </p>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-sage-300/20 to-transparent rounded-bl-full"></div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );

  // Featured Products Section
  const FeaturedProductsSection = () => (
    <section id="featured-products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-xl text-gray-600">Handpicked premium products from our best farmers</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="flex items-center space-x-2 px-6 py-3 border border-sage-500 text-sage-600 rounded-xl hover:bg-sage-50 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Why Choose Us Section
  const WhyChooseUsSection = () => (
    <section className="py-20 bg-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose HerbiProof?</h2>
          <p className="text-xl text-gray-600">The future of food transparency is here</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">100% Verified</h3>
            <p className="text-gray-600 leading-relaxed">
              Every product is blockchain-verified from farm to your table. Complete transparency guaranteed.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform shadow-lg">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
            <p className="text-gray-600 leading-relaxed">
              Same-day delivery in most cities. Fresh products delivered right to your doorstep.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-sage-400 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              Hand-picked, certified organic products from trusted farmers. Quality you can taste.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <ModernHeader />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <WhyChooseUsSection />
      </main>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div
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
              <p className="text-gray-600 mb-6">Scan product QR code for blockchain verification</p>
              
              <div className="bg-sage-100 rounded-xl h-64 flex items-center justify-center mb-6">
                <div className="text-sage-600 text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2" />
                  <p>Camera integration would be here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Scan to verify product authenticity and view farm origin
                  </p>
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
                  onClick={() => {
                    setShowQRScanner(false);
                    navigate('/product/1');
                  }}
                  className="flex-1 px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
                >
                  Demo Scan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating QR Scan Button */}
      <motion.div 
        className="floating-qr"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      >
        <button
          onClick={() => setShowQRScanner(true)}
          className="w-full h-full flex items-center justify-center"
        >
          <QrCode className="w-6 h-6 text-white" />
        </button>
      </motion.div>
    </div>
  );
};

export default WorkingConsumerPortal;