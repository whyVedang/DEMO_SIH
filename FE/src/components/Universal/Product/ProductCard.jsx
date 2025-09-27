import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  MapPin, 
  Shield, 
  QrCode, 
  Eye, 
  ShoppingCart,
  Leaf,
  Award,
  Clock,
  TrendingUp,
  Share2,
  MoreVertical,
  Calendar,
  Truck,
  DollarSign,
  Plus,
  Check
} from 'lucide-react';
import { useConsumerStore } from '../../../stores/consumerStore';
import { useCartStore } from '../../../stores/cartStore';

const ProductCard = ({ 
  product, 
  variant = 'ecommerce', // 'ecommerce', 'consumer', 'traced', 'saved', 'compact'
  onSelect,
  onTrace,
  onSave,
  className = '',
  showActions = true,
  showQuickAdd = true,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { 
    toggleSavedProduct, 
    isProductSaved, 
    isProductTraced,
    addToRecentlyScanned 
  } = useConsumerStore();

  const { 
    addItem, 
    isInCart, 
    openCart 
  } = useCartStore();

  const isSaved = isProductSaved(product.id);
  const isTraced = isProductTraced(product.id);
  const inCart = isInCart(product.id);

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSavedProduct(product);
    onSave?.(product);
  };

  const handleTrace = (e) => {
    e.stopPropagation();
    addToRecentlyScanned(product.id);
    onTrace?.(product);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from ${product.brand || 'HerbiProof'}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    
    // Add to cart with animation delay
    setTimeout(() => {
      addItem(product, 1);
      setIsAddingToCart(false);
    }, 500);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    
    addItem(product, 1);
    openCart();
    
    // Close cart after 2 seconds
    setTimeout(() => {
      useCartStore.getState().closeCart();
    }, 2000);
  };

  const handleProductClick = () => {
    // Navigate to product detail page
    navigate(`/product/${product.id}`);
    onSelect?.(product);
  };

  const getCertificationColor = (cert) => {
    const colors = {
      'Organic': 'bg-green-100 text-green-800',
      'Non-GMO': 'bg-blue-100 text-blue-800',
      'Fair Trade': 'bg-purple-100 text-purple-800',
      'Sustainable': 'bg-sage-100 text-sage-800',
      'Local': 'bg-yellow-100 text-yellow-800',
    };
    return colors[cert] || 'bg-gray-100 text-gray-800';
  };

  const getSustainabilityColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-sage-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFreshnessColor = (harvestDate) => {
    const days = Math.floor((new Date() - new Date(harvestDate)) / (1000 * 60 * 60 * 24));
    if (days <= 2) return 'text-green-600';
    if (days <= 5) return 'text-sage-600';
    if (days <= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderImage = () => (
    <div className="relative aspect-square overflow-hidden bg-sage-100">
      {/* Product Image */}
      <img
        src={product.images?.[0] || '/placeholder-product.jpg'}
        alt={product.name}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          e.target.src = '/placeholder-product.jpg';
          setImageLoaded(true);
        }}
      />

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-sage-200 animate-pulse flex items-center justify-center">
          <Leaf className="w-8 h-8 text-sage-400" />
        </div>
      )}

      {/* Overlay badges */}
      <div className="absolute top-3 left-3 space-y-2">
        {product.featured && (
          <div className="bg-sage-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        {product.trending && (
          <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}
        {product.seasonal && (
          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Seasonal
          </div>
        )}
      </div>

      {/* Actions overlay */}
      {showActions && (
        <div className="absolute top-3 right-3 space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              isSaved 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </motion.button>

          {variant === 'consumer' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-sage-600 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      )}

      {/* Quick action menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-14 right-3 bg-white rounded-lg shadow-lg border border-sage-100 py-2 z-10"
          >
            <button
              onClick={handleTrace}
              className="w-full px-4 py-2 text-left text-sm hover:bg-sage-50 flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              View Trace
            </button>
            <button
              onClick={handleShare}
              className="w-full px-4 py-2 text-left text-sm hover:bg-sage-50 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blockchain verification badge */}
      {product.blockchain?.verified && (
        <div className="absolute bottom-3 left-3">
          <div className="bg-verified/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Verified
          </div>
        </div>
      )}

      {/* Freshness indicator */}
      {product.harvestDate && (
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className={`w-3 h-3 ${getFreshnessColor(product.harvestDate)}`} />
            <span className={getFreshnessColor(product.harvestDate)}>
              {Math.floor((new Date() - new Date(product.harvestDate)) / (1000 * 60 * 60 * 24))}d
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => (
    <div className="p-4 space-y-3">
      {/* Product name and brand */}
      <div>
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sage-600 text-sm">{product.brand}</p>
          <div className="flex items-center text-xs text-gray-600">
            <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
            <span className="font-medium">{product.rating}</span>
            <span className="ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Source location and category */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{product.category}</span>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="text-xs">{product.sourceLocation}</span>
        </div>
      </div>

      {/* Certifications */}
      {product.certifications && product.certifications.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {product.certifications.slice(0, 3).map((cert) => (
            <span
              key={cert}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCertificationColor(cert)}`}
            >
              {cert}
            </span>
          ))}
          {product.certifications.length > 3 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{product.certifications.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Sustainability and nutrition scores */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {product.sustainabilityScore && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Sustainability</span>
            <span className={`font-medium ${getSustainabilityColor(product.sustainabilityScore)}`}>
              {product.sustainabilityScore}/100
            </span>
          </div>
        )}
        {product.nutritionScore && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Nutrition</span>
            <span className={`font-medium ${getSustainabilityColor(product.nutritionScore)}`}>
              {product.nutritionScore}/100
            </span>
          </div>
        )}
      </div>

      {/* Price and actions */}
      <div className="pt-2 border-t border-sage-100 space-y-3">
        {/* Price section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {product.currency}{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {product.currency}{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-gray-600 text-sm">/{product.unit}</span>
        </div>

        {/* Stock status */}
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
          </span>
          {product.deliveryTime && (
            <div className="flex items-center text-gray-600">
              <Truck className="w-3 h-3 mr-1" />
              <span className="text-xs">{product.deliveryTime}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {variant === 'ecommerce' && showActions && (
          <div className="flex space-x-2">
            {/* Quick Add Button */}
            {showQuickAdd && product.inStock && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickAdd}
                className="flex-1 px-3 py-2 bg-sage-100 text-sage-700 rounded-lg text-sm font-medium hover:bg-sage-200 transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Quick Add
              </motion.button>
            )}
            
            {/* Main Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={product.inStock ? handleAddToCart : undefined}
              disabled={!product.inStock || isAddingToCart}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                product.inStock 
                  ? 'bg-sage-500 text-white hover:bg-sage-600' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAddingToCart ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : inCart ? (
                <>
                  <Check className="w-4 h-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </motion.button>
          </div>
        )}

        {/* Alternative view buttons for other variants */}
        {variant === 'consumer' && showActions && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTrace}
              className="px-3 py-2 bg-sage-100 text-sage-700 rounded-lg text-sm font-medium hover:bg-sage-200 transition-colors flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Trace
            </motion.button>
            {product.inStock && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProductClick}
                className="px-3 py-2 bg-sage-500 text-white rounded-lg text-sm font-medium hover:bg-sage-600 transition-colors flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View Details
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Stock status */}
      {!product.inStock && (
        <div className="text-center py-2">
          <span className="text-red-600 text-sm font-medium">Out of Stock</span>
        </div>
      )}

      {/* Additional info for traced/saved variants */}
      {(variant === 'traced' || variant === 'saved') && (
        <div className="pt-2 border-t border-sage-100 text-xs text-gray-600 space-y-1">
          {variant === 'traced' && (
            <div className="flex items-center justify-between">
              <span>Traced on:</span>
              <span>{new Date(product.tracedAt || Date.now()).toLocaleDateString()}</span>
            </div>
          )}
          {variant === 'saved' && (
            <div className="flex items-center justify-between">
              <span>Saved on:</span>
              <span>{new Date(product.savedAt || Date.now()).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white rounded-2xl shadow-glass border border-sage-100 overflow-hidden cursor-pointer
        hover:shadow-sage-lg transition-all duration-300
        ${isHovered ? 'shadow-sage-lg' : ''}
        ${className}
      `}
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
      }}
    >
      {renderImage()}
      {renderContent()}
    </motion.div>
  );
};

export default ProductCard;
