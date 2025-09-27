import React, { useState } from 'react';
import { 
  QrCode, 
  Search, 
  User, 
  Star, 
  Shield, 
  Leaf, 
  Heart,
  Menu,
  X,
  Package,
  Award,
  Truck,
  Users,
  Gift,
  ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';

const CleanPortal = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <button className="btn-primary">
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

  // Test CSS Section
  const TestCSSSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          CSS Styling Test Section
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Sage Color Test Cards */}
          <div className="bg-sage-100 p-6 rounded-xl border border-sage-200">
            <h3 className="text-xl font-semibold text-sage-700 mb-4">Sage Colors Test</h3>
            <div className="space-y-3">
              <div className="bg-sage-50 p-3 rounded-lg text-sage-800">Sage 50</div>
              <div className="bg-sage-100 p-3 rounded-lg text-sage-800">Sage 100</div>
              <div className="bg-sage-400 p-3 rounded-lg text-white">Sage 400</div>
              <div className="bg-sage-500 p-3 rounded-lg text-white">Sage 500</div>
            </div>
          </div>

          {/* Button Styles Test */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Button Styles Test</h3>
            <div className="space-y-3">
              <button className="btn-sage-primary w-full">Primary Button</button>
              <button className="btn-sage-secondary w-full">Secondary Button</button>
              <button className="btn-add-cart-compact">Add to Cart</button>
            </div>
          </div>

          {/* Animation Test */}
          <div className="bg-gradient-to-br from-sage-50 to-sage-100 p-6 rounded-xl border border-sage-200">
            <h3 className="text-xl font-semibold text-sage-700 mb-4">Animation Test</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg hover-lift cursor-pointer">Hover Lift Effect</div>
              <div className="bg-white p-3 rounded-lg product-hover cursor-pointer">Product Hover</div>
              <div className="bg-sage-glass p-3 rounded-lg backdrop-blur-sm">Glass Effect</div>
            </div>
          </div>
        </div>

        {/* Product Cards Test */}
        <div className="products-grid-compact">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-card-compact">
              <div className="product-image-compact">
                <div className="product-badge-verified">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
                <div className="product-badge-featured">Featured</div>
                <div className="text-4xl text-sage-400">🌱</div>
              </div>
              <div className="product-content-compact">
                <div className="product-title-compact">Organic Test Product {item}</div>
                <div className="product-brand-compact">HerbiProof Farms</div>
                <div className="product-price-compact">₹{99 + item * 10}</div>
                <div className="product-rating-compact">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>4.{item + 5}</span>
                  <span>(12{item} reviews)</span>
                </div>
                <div className="product-actions-compact">
                  <button className="btn-add-cart-compact">Add to Cart</button>
                  <button className="btn-heart-compact">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen">
      {/* Modern Header */}
      <ModernHeader />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <TestCSSSection />
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
                  <div className="text-4xl mb-2">📱</div>
                  <p>CSS Test: Camera integration would be here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    All styles are rendering correctly!
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
                  onClick={() => setShowQRScanner(false)}
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

export default CleanPortal;
