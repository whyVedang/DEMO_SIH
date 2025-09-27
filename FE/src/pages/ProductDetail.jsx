import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Shield,
  MapPin,
  Truck,
  Award,
  Leaf,
  Clock,
  QrCode,
  Plus,
  Minus,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Package,
  Users,
  Calendar,
  Zap,
  CheckCircle
} from 'lucide-react';
import { getProductById } from '../data/sampleProducts';
import { useCartStore } from '../stores/cartStore';
import { useConsumerStore } from '../stores/consumerStore';
import ProductCard from '../components/Universal/Product/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showTraceModal, setShowTraceModal] = useState(false);

  const { addItem, isInCart } = useCartStore();
  const { toggleSavedProduct, isProductSaved, addToRecentlyScanned } = useConsumerStore();

  useEffect(() => {
    const productData = getProductById(id);
    if (productData) {
      setProduct(productData);
      // Track as viewed
      addToRecentlyScanned(productData.id);
    } else {
      navigate('/');
    }
  }, [id, navigate, addToRecentlyScanned]);

  if (!product) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-500"></div>
      </div>
    );
  }

  const isSaved = isProductSaved(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    
    setTimeout(() => {
      addItem(product, quantity);
      setIsAddingToCart(false);
    }, 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from ${product.brand}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'nutrition', label: 'Nutrition', icon: Zap },
    { id: 'traceability', label: 'Traceability', icon: Shield },
    { id: 'reviews', label: 'Reviews', icon: Users }
  ];

  const renderImageGallery = () => (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-sage-100">
        <img
          src={product.images?.[selectedImageIndex] || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        {product.images && product.images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex(prev => 
                prev === 0 ? product.images.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setSelectedImageIndex(prev => 
                prev === product.images.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}

        {/* Verification Badge */}
        {product.blockchain?.verified && (
          <div className="absolute top-4 left-4">
            <div className="bg-verified/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Blockchain Verified
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleSavedProduct(product)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              isSaved 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-sage-600 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {product.images && product.images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImageIndex === index 
                  ? 'border-sage-500' 
                  : 'border-transparent hover:border-sage-300'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderProductInfo = () => (
    <div className="space-y-6">
      {/* Product Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-600">({product.reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-sage-600">{product.brand}</span>
          <span>•</span>
          <span>{product.category}</span>
          <span>•</span>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {product.sourceLocation}
          </div>
        </div>
      </div>

      {/* Certifications */}
      {product.certifications && product.certifications.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.certifications.map((cert) => (
            <span
              key={cert}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1"
            >
              <Award className="w-3 h-3" />
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      {/* Key Features */}
      <div className="grid grid-cols-2 gap-4">
        {product.sustainabilityScore && (
          <div className="bg-sage-50 rounded-lg p-4 text-center">
            <Leaf className="w-6 h-6 text-sage-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-sage-600">{product.sustainabilityScore}%</div>
            <div className="text-sm text-gray-600">Sustainability</div>
          </div>
        )}
        
        {product.nutritionScore && (
          <div className="bg-sage-50 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-sage-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-sage-600">{product.nutritionScore}%</div>
            <div className="text-sm text-gray-600">Nutrition Score</div>
          </div>
        )}
      </div>

      {/* Price and Purchase */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gray-900">
              {product.currency}{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">
                {product.currency}{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-gray-600">per {product.unit}</span>
        </div>

        {/* Stock and Delivery */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? `${product.stockCount} items available` : 'Out of stock'}
          </span>
          {product.deliveryTime && (
            <div className="flex items-center text-gray-600">
              <Truck className="w-4 h-4 mr-1" />
              <span>{product.deliveryTime}</span>
            </div>
          )}
        </div>

        {/* Quantity and Add to Cart */}
        {product.inStock && (
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-sage-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-sage-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAddingToCart ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : inCart ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart • {product.currency}{(product.price * quantity).toLocaleString()}
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nutrition':
        return (
          <div className="bg-white rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Nutritional Information</h3>
            {product.nutritionalInfo && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-sage-50 rounded-lg">
                    <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-lg font-bold text-gray-900">{value}</div>
                  </div>
                ))}
              </div>
            )}
            
            {product.ingredients && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span key={index} className="px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'traceability':
        return (
          <div className="bg-white rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Blockchain Traceability</h3>
              <button
                onClick={() => setShowTraceModal(true)}
                className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors flex items-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                View Full Trace
              </button>
            </div>

            {product.blockchain && (
              <div className="space-y-4">
                {/* Farm Information */}
                <div className="border border-sage-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Source Farm</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Farm:</span> {product.blockchain.farmName}</div>
                    <div><span className="font-medium">Location:</span> {product.blockchain.farmer.location}</div>
                    <div><span className="font-medium">Experience:</span> {product.blockchain.farmer.experience}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.blockchain.farmer.certifications.map((cert, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Supply Chain */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Supply Chain Journey</h4>
                  <div className="space-y-3">
                    {product.blockchain.supplyChain.map((stage, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-sage-50 rounded-lg">
                        <div className="w-8 h-8 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{stage.stage}</div>
                          <div className="text-sm text-gray-600">{stage.location}</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(stage.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Reviews coming soon...</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Product Overview</h3>
            <p className="text-gray-700">{product.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Product Details</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Brand:</span> {product.brand}</div>
                  <div><span className="font-medium">Category:</span> {product.category}</div>
                  <div><span className="font-medium">Package Size:</span> {product.packageSize}</div>
                  <div><span className="font-medium">Source:</span> {product.sourceLocation}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Quality Scores</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Sustainability:</span> {product.sustainabilityScore}%</div>
                  <div><span className="font-medium">Nutrition:</span> {product.nutritionScore}%</div>
                  <div><span className="font-medium">Harvest Date:</span> {new Date(product.harvestDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-sage-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            {renderImageGallery()}
          </div>

          {/* Product Information */}
          <div>
            {renderProductInfo()}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-sage-500 text-sage-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>

      {/* Trace Modal */}
      <AnimatePresence>
        {showTraceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTraceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Blockchain Traceability</h3>
                <button
                  onClick={() => setShowTraceModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-16 h-16 text-sage-600" />
                  </div>
                  <p className="text-gray-600">QR Code scanner would be integrated here</p>
                </div>

                {/* Full trace information would be displayed here */}
                <div className="bg-sage-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Verification Status</h4>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Blockchain Verified
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
