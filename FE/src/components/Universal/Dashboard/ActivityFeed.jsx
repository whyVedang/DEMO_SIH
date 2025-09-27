import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock,
  QrCode,
  Heart,
  Star,
  MessageSquare,
  ShoppingCart,
  Eye,
  Share2,
  MapPin,
  Award,
  TrendingUp,
  Filter,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import { useConsumerStore } from '../../../stores/consumerStore';

const ActivityFeed = ({ 
  variant = 'consumer', // 'consumer', 'farmer', 'admin'
  maxItems = 20,
  className = ''
}) => {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('week');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { getRecentActivity, recentlyScanned, savedProducts, reviewedProducts } = useConsumerStore();

  const activityTypes = {
    scan: { icon: QrCode, color: 'sage-500', label: 'Scanned' },
    save: { icon: Heart, color: 'red-500', label: 'Saved' },
    review: { icon: Star, color: 'yellow-500', label: 'Reviewed' },
    purchase: { icon: ShoppingCart, color: 'green-500', label: 'Purchased' },
    view: { icon: Eye, color: 'blue-500', label: 'Viewed' },
    share: { icon: Share2, color: 'purple-500', label: 'Shared' },
    contact: { icon: MessageSquare, color: 'indigo-500', label: 'Contacted' },
  };

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'scan', label: 'Scans' },
    { value: 'save', label: 'Saved Items' },
    { value: 'review', label: 'Reviews' },
    { value: 'purchase', label: 'Purchases' },
  ];

  const timeRangeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ];

  // Mock activity data - In real app, this would come from the store or API
  const mockActivities = useMemo(() => [
    {
      id: '1',
      type: 'scan',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      product: {
        id: 'prod_1',
        name: 'Organic Tomatoes',
        farmer: 'Green Valley Farm',
        image: 'https://images.unsplash.com/photo-1546470427-e5d1b820b2fc?auto=format&fit=crop&w=100&q=80',
      },
      metadata: { verificationStatus: 'verified' }
    },
    {
      id: '2',
      type: 'save',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      product: {
        id: 'prod_2',
        name: 'Free-Range Eggs',
        farmer: 'Sunrise Poultry',
        image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=100&q=80',
      }
    },
    {
      id: '3',
      type: 'review',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      product: {
        id: 'prod_3',
        name: 'Local Honey',
        farmer: 'Mountain Bee Farm',
        image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&w=100&q=80',
      },
      metadata: { rating: 5, comment: 'Absolutely delicious!' }
    },
    {
      id: '4',
      type: 'purchase',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      product: {
        id: 'prod_4',
        name: 'Artisan Cheese',
        farmer: 'Valley Dairy Co.',
        image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=100&q=80',
      },
      metadata: { price: 12.99, quantity: 2 }
    },
    {
      id: '5',
      type: 'contact',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      farmer: {
        id: 'farmer_1',
        name: 'Green Valley Farm',
        image: 'https://images.unsplash.com/photo-1472099103084-30c0f4d6cf57?auto=format&fit=crop&w=100&q=80',
      },
      metadata: { subject: 'Question about organic certification' }
    },
    {
      id: '6',
      type: 'share',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      product: {
        id: 'prod_5',
        name: 'Heritage Apples',
        farmer: 'Orchard Hills',
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=100&q=80',
      },
      metadata: { platform: 'social', recipients: 3 }
    },
  ], []);

  const filteredActivities = useMemo(() => {
    let filtered = mockActivities;

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(activity => activity.type === filter);
    }

    // Filter by time range
    const now = new Date();
    const timeFilters = {
      day: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      month: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      all: new Date(0),
    };

    const cutoffDate = timeFilters[timeRange];
    filtered = filtered.filter(activity => new Date(activity.timestamp) >= cutoffDate);

    return filtered.slice(0, maxItems);
  }, [mockActivities, filter, timeRange, maxItems]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const renderActivityIcon = (type) => {
    const config = activityTypes[type];
    if (!config) return null;

    const Icon = config.icon;
    return (
      <div className={`w-10 h-10 rounded-full bg-${config.color}/10 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 text-${config.color}`} />
      </div>
    );
  };

  const renderActivityContent = (activity) => {
    const { type, product, farmer, metadata } = activity;
    const config = activityTypes[type];

    switch (type) {
      case 'scan':
        return (
          <div>
            <p className="font-medium text-gray-900">
              {config.label} <span className="text-sage-600">{product.name}</span>
            </p>
            <p className="text-sm text-gray-600">from {product.farmer}</p>
            {metadata?.verificationStatus && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-verified/10 text-verified mt-1">
                <Award className="w-3 h-3 mr-1" />
                Verified
              </span>
            )}
          </div>
        );

      case 'save':
        return (
          <div>
            <p className="font-medium text-gray-900">
              {config.label} <span className="text-sage-600">{product.name}</span>
            </p>
            <p className="text-sm text-gray-600">from {product.farmer}</p>
          </div>
        );

      case 'review':
        return (
          <div>
            <p className="font-medium text-gray-900">
              {config.label} <span className="text-sage-600">{product.name}</span>
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < metadata.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {metadata.comment && (
                <p className="text-sm text-gray-600">"{metadata.comment}"</p>
              )}
            </div>
          </div>
        );

      case 'purchase':
        return (
          <div>
            <p className="font-medium text-gray-900">
              {config.label} <span className="text-sage-600">{product.name}</span>
            </p>
            <p className="text-sm text-gray-600">
              {metadata.quantity}x @ ${metadata.price} from {product.farmer}
            </p>
          </div>
        );

      case 'contact':
        return (
          <div>
            <p className="font-medium text-gray-900">
              {config.label} <span className="text-sage-600">{farmer.name}</span>
            </p>
            <p className="text-sm text-gray-600">{metadata.subject}</p>
          </div>
        );

      case 'share':
        return (
          <div>
            <p className="font-medium text-gray-900">
              {config.label} <span className="text-sage-600">{product.name}</span>
            </p>
            <p className="text-sm text-gray-600">
              with {metadata.recipients} {metadata.recipients === 1 ? 'person' : 'people'}
            </p>
          </div>
        );

      default:
        return (
          <p className="font-medium text-gray-900">
            {config.label} activity
          </p>
        );
    }
  };

  const renderFilters = () => (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white text-sm"
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white text-sm"
      >
        {timeRangeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="px-3 py-2 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors flex items-center space-x-2 text-sm disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        <span>Refresh</span>
      </button>
    </div>
  );

  return (
    <div className={`bg-white rounded-2xl shadow-glass border border-sage-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
        <div className="text-sm text-gray-500">
          {filteredActivities.length} activities
        </div>
      </div>

      {renderFilters()}

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredActivities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Clock className="w-16 h-16 text-sage-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'Start scanning products to see your activity here' 
                  : `No ${filterOptions.find(o => o.value === filter)?.label.toLowerCase()} found`
                }
              </p>
            </motion.div>
          ) : (
            filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start space-x-4 p-4 hover:bg-sage-50 rounded-xl transition-colors"
              >
                {/* Activity Icon */}
                {renderActivityIcon(activity.type)}

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  {renderActivityContent(activity)}
                </div>

                {/* Product/Farmer Image */}
                {(activity.product || activity.farmer) && (
                  <img
                    src={activity.product?.image || activity.farmer?.image}
                    alt={activity.product?.name || activity.farmer?.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}

                {/* Timestamp */}
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {filteredActivities.length >= maxItems && (
        <div className="text-center mt-6">
          <button className="px-4 py-2 text-sage-600 hover:text-sage-700 font-medium transition-colors">
            Load More Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
