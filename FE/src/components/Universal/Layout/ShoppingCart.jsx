import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Shield,
  Gift
} from 'lucide-react';
import { useCartStore } from '../../../stores/cartStore';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getFinalTotal,
    getTotalItems
  } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getFinalTotal();
  const itemCount = getTotalItems();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate('/');
  };

  const handleProductClick = (productId) => {
    closeCart();
    navigate(`/product/${productId}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Cart ({itemCount})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty Cart */
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-12 h-12 text-sage-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Discover our fresh, verified products</p>
                  <button
                    onClick={handleContinueShopping}
                    className="px-6 py-3 bg-sage-500 text-white rounded-xl font-medium hover:bg-sage-600 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                /* Cart Items */
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex space-x-3 bg-sage-50 rounded-xl p-3"
                    >
                      {/* Product Image */}
                      <button
                        onClick={() => handleProductClick(item.id)}
                        className="flex-shrink-0 w-16 h-16 bg-sage-200 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={item.images?.[0] || '/placeholder-product.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </button>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => handleProductClick(item.id)}
                          className="text-left w-full hover:text-sage-600 transition-colors"
                        >
                          <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                        </button>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-900">
                              {item.currency}{item.price}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {item.currency}{item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-medium text-gray-900">
                            {item.currency}{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        {/* Stock Warning */}
                        {item.quantity >= item.stockCount && (
                          <p className="text-xs text-red-600 mt-1">
                            Only {item.stockCount} available
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Delivery Benefits */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-4">
                    <div className="flex items-center space-x-2 text-green-700">
                      {deliveryFee === 0 ? (
                        <>
                          <Truck className="w-4 h-4" />
                          <span className="text-sm font-medium">Free delivery on this order!</span>
                        </>
                      ) : (
                        <>
                          <Truck className="w-4 h-4" />
                          <span className="text-sm">
                            Add ₹{(500 - subtotal).toLocaleString()} more for free delivery
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Shield className="w-3 h-3 text-sage-500" />
                      <span>Blockchain Verified</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Gift className="w-3 h-3 text-sage-500" />
                      <span>Quality Guaranteed</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Totals and Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4 bg-white">
                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-lg">
                    <span>Total</span>
                    <span className="text-sage-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-sage-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-sage-600 transition-colors"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  
                  <button
                    onClick={handleContinueShopping}
                    className="w-full border border-sage-500 text-sage-600 py-3 rounded-xl font-medium hover:bg-sage-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Security Note */}
                <p className="text-xs text-gray-500 text-center">
                  🔒 Secure checkout • 100% satisfaction guaranteed
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
