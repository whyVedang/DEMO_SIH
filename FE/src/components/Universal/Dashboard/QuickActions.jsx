import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Search, 
  Heart, 
  MessageSquare, 
  MapPin, 
  Shield, 
  TrendingUp,
  Camera,
  Star,
  Filter,
  Bell,
  Bookmark,
  Plus,
  Package,
  Leaf
} from 'lucide-react';

const QuickActions = ({ 
  onScanQR, 
  onBrowseProducts, 
  onViewTraced, 
  onViewSaved,
  onContactFarmer,
  variant = 'consumer' // 'consumer', 'farmer', 'admin'
}) => {
  const [hoveredAction, setHoveredAction] = useState(null);

  // Consumer-specific quick actions
  const consumerActions = [
    {
      id: 'scan',
      title: 'Scan QR Code',
      description: 'Verify product authenticity',
      icon: QrCode,
      color: 'sage-500',
      bgColor: 'sage-100',
      onClick: onScanQR,
      shortcut: 'S',
      featured: true,
    },
    {
      id: 'browse',
      title: 'Browse Products',
      description: 'Discover fresh produce',
      icon: Search,
      color: 'sage-600',
      bgColor: 'sage-100',
      onClick: onBrowseProducts,
      shortcut: 'B',
    },
    {
      id: 'traced',
      title: 'My Traced Items',
      description: 'View scanned products',
      icon: Shield,
      color: 'blue-500',
      bgColor: 'blue-100',
      onClick: onViewTraced,
      shortcut: 'T',
    },
    {
      id: 'saved',
      title: 'Saved Products',
      description: 'Your bookmarked items',
      icon: Heart,
      color: 'red-500',
      bgColor: 'red-100',
      onClick: onViewSaved,
      shortcut: 'H',
    },
    {
      id: 'contact',
      title: 'Contact Farmer',
      description: 'Connect with producers',
      icon: MessageSquare,
      color: 'green-500',
      bgColor: 'green-100',
      onClick: onContactFarmer,
      shortcut: 'C',
    },
    {
      id: 'trending',
      title: 'Trending Now',
      description: 'Popular products',
      icon: TrendingUp,
      color: 'purple-500',
      bgColor: 'purple-100',
      onClick: () => onBrowseProducts?.({ filter: 'trending' }),
    },
  ];

  // Farmer-specific quick actions
  const farmerActions = [
    {
      id: 'add-product',
      title: 'Add Product',
      description: 'List new produce',
      icon: Plus,
      color: 'sage-500',
      bgColor: 'sage-100',
      featured: true,
    },
    {
      id: 'manage-inventory',
      title: 'Manage Inventory',
      description: 'Update stock levels',
      icon: Package,
      color: 'blue-500',
      bgColor: 'blue-100',
    },
    // Add more farmer actions...
  ];

  // Admin-specific quick actions
  const adminActions = [
    {
      id: 'verify-farms',
      title: 'Verify Farms',
      description: 'Review farm applications',
      icon: Shield,
      color: 'green-500',
      bgColor: 'green-100',
      featured: true,
    },
    // Add more admin actions...
  ];

  const getActions = () => {
    switch (variant) {
      case 'farmer':
        return farmerActions;
      case 'admin':
        return adminActions;
      default:
        return consumerActions;
    }
  };

  const actions = getActions();

  const handleKeyboardShortcut = (e) => {
    if (e.altKey || e.ctrlKey) {
      const action = actions.find(a => a.shortcut?.toLowerCase() === e.key.toLowerCase());
      if (action && action.onClick) {
        e.preventDefault();
        action.onClick();
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-glass p-6 border border-sage-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        <div className="text-sm text-gray-500">
          Hold Alt + Key for shortcuts
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02, 
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            className={`
              relative p-4 rounded-xl text-left transition-all duration-300
              ${action.featured 
                ? 'bg-gradient-to-br from-sage-500 to-sage-600 text-white shadow-sage' 
                : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-sage-200 hover:shadow-sage'
              }
              ${hoveredAction === action.id ? 'shadow-lg transform -translate-y-1' : ''}
            `}
          >
            {/* Keyboard shortcut badge */}
            {action.shortcut && (
              <div className={`
                absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono
                ${action.featured 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {action.shortcut}
              </div>
            )}

            <div className="flex items-start space-x-4">
              <div className={`
                flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                ${action.featured 
                  ? 'bg-white/20' 
                  : `bg-${action.bgColor}`
                }
              `}>
                <action.icon className={`
                  w-6 h-6 
                  ${action.featured 
                    ? 'text-white' 
                    : `text-${action.color}`
                  }
                `} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`
                  font-semibold text-lg mb-1
                  ${action.featured ? 'text-white' : 'text-gray-900'}
                `}>
                  {action.title}
                </h3>
                <p className={`
                  text-sm
                  ${action.featured ? 'text-white/80' : 'text-gray-600'}
                `}>
                  {action.description}
                </p>
              </div>
            </div>

            {/* Hover effect overlay */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-sage-400/10 to-sage-600/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredAction === action.id ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Consumer-specific additional actions */}
      {variant === 'consumer' && (
        <div className="mt-6 pt-6 border-t border-sage-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular This Week</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Organic Tomatoes', icon: Leaf, trend: '+12%' },
              { label: 'Local Honey', icon: Star, trend: '+8%' },
              { label: 'Free-Range Eggs', icon: Shield, trend: '+15%' },
              { label: 'Artisan Cheese', icon: Heart, trend: '+6%' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="p-3 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer"
                onClick={() => onBrowseProducts?.({ search: item.label })}
              >
                <div className="flex items-center justify-between mb-2">
                  <item.icon className="w-4 h-4 text-sage-600" />
                  <span className="text-xs font-medium text-green-600">{item.trend}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Quick stats for consumers */}
      {variant === 'consumer' && (
        <div className="mt-6 pt-6 border-t border-sage-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-sage-600">24</p>
              <p className="text-sm text-gray-600">Products Scanned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-sage-600">12</p>
              <p className="text-sm text-gray-600">Farms Discovered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-sage-600">$127</p>
              <p className="text-sm text-gray-600">Money Saved</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
