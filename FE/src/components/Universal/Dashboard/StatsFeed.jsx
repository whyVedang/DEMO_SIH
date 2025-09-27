import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  QrCode, 
  Heart, 
  MapPin, 
  DollarSign, 
  Leaf, 
  Award, 
  Target,
  Calendar,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Users,
  ShoppingCart
} from 'lucide-react';
import { useConsumerStore } from '../../../stores/consumerStore';

const StatsFeed = ({ 
  variant = 'consumer', // 'consumer', 'farmer', 'admin'
  timeRange = 'month',
  className = ''
}) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const { userStats, recentlyScanned, savedProducts, tracedProducts } = useConsumerStore();

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ];

  // Mock data for different periods (in real app, this would come from API)
  const periodData = {
    week: {
      scanned: 6,
      saved: 3,
      farmsDiscovered: 2,
      moneySaved: 23.50,
      carbonReduced: 1.2,
      transparencyScore: 88,
    },
    month: {
      scanned: 24,
      saved: 12,
      farmsDiscovered: 8,
      moneySaved: 127.80,
      carbonReduced: 5.4,
      transparencyScore: 85,
    },
    quarter: {
      scanned: 78,
      saved: 34,
      farmsDiscovered: 15,
      moneySaved: 345.20,
      carbonReduced: 18.7,
      transparencyScore: 89,
    },
    year: {
      scanned: 312,
      saved: 128,
      farmsDiscovered: 42,
      moneySaved: 1247.60,
      carbonReduced: 67.3,
      transparencyScore: 92,
    },
  };

  const currentStats = periodData[selectedPeriod];

  const statCards = [
    {
      id: 'scanned',
      title: 'Products Scanned',
      value: currentStats.scanned,
      icon: QrCode,
      color: 'sage-500',
      bgColor: 'sage-100',
      change: '+12%',
      changeType: 'positive',
      description: 'Products verified with QR code scanning',
      details: [
        { label: 'Vegetables', value: Math.floor(currentStats.scanned * 0.4) },
        { label: 'Fruits', value: Math.floor(currentStats.scanned * 0.3) },
        { label: 'Dairy', value: Math.floor(currentStats.scanned * 0.2) },
        { label: 'Other', value: Math.floor(currentStats.scanned * 0.1) },
      ]
    },
    {
      id: 'farms',
      title: 'Farms Discovered',
      value: currentStats.farmsDiscovered,
      icon: MapPin,
      color: 'green-500',
      bgColor: 'green-100',
      change: '+23%',
      changeType: 'positive',
      description: 'Unique farms you\'ve connected with',
      details: [
        { label: 'Local (< 50mi)', value: Math.floor(currentStats.farmsDiscovered * 0.6) },
        { label: 'Regional (< 200mi)', value: Math.floor(currentStats.farmsDiscovered * 0.3) },
        { label: 'National', value: Math.floor(currentStats.farmsDiscovered * 0.1) },
      ]
    },
    {
      id: 'saved',
      title: 'Money Saved',
      value: `$${currentStats.moneySaved.toFixed(2)}`,
      icon: DollarSign,
      color: 'blue-500',
      bgColor: 'blue-100',
      change: '+8%',
      changeType: 'positive',
      description: 'Savings through transparent pricing',
      details: [
        { label: 'Direct from farm', value: `$${(currentStats.moneySaved * 0.7).toFixed(2)}` },
        { label: 'Bulk purchases', value: `$${(currentStats.moneySaved * 0.2).toFixed(2)}` },
        { label: 'Seasonal discounts', value: `$${(currentStats.moneySaved * 0.1).toFixed(2)}` },
      ]
    },
    {
      id: 'sustainability',
      title: 'Transparency Score',
      value: `${currentStats.transparencyScore}/100`,
      icon: Award,
      color: 'purple-500',
      bgColor: 'purple-100',
      change: '+5%',
      changeType: 'positive',
      description: 'Your commitment to sustainable choices',
      details: [
        { label: 'Organic products', value: '78%' },
        { label: 'Local sourcing', value: '65%' },
        { label: 'Verified farms', value: '89%' },
      ]
    },
    {
      id: 'carbon',
      title: 'Carbon Reduced',
      value: `${currentStats.carbonReduced}kg`,
      icon: Leaf,
      color: 'emerald-500',
      bgColor: 'emerald-100',
      change: '+15%',
      changeType: 'positive',
      description: 'CO₂ footprint reduction this period',
      details: [
        { label: 'Local sourcing', value: `${(currentStats.carbonReduced * 0.6).toFixed(1)}kg` },
        { label: 'Organic choices', value: `${(currentStats.carbonReduced * 0.3).toFixed(1)}kg` },
        { label: 'Reduced packaging', value: `${(currentStats.carbonReduced * 0.1).toFixed(1)}kg` },
      ]
    },
    {
      id: 'favorites',
      title: 'Saved Products',
      value: currentStats.saved,
      icon: Heart,
      color: 'red-500',
      bgColor: 'red-100',
      change: '+18%',
      changeType: 'positive',
      description: 'Products bookmarked for later',
      details: [
        { label: 'Frequently bought', value: Math.floor(currentStats.saved * 0.5) },
        { label: 'Seasonal items', value: Math.floor(currentStats.saved * 0.3) },
        { label: 'New discoveries', value: Math.floor(currentStats.saved * 0.2) },
      ]
    },
  ];

  const toggleExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const renderStatCard = (stat, index) => {
    const isExpanded = expandedCard === stat.id;
    const Icon = stat.icon;

    return (
      <motion.div
        key={stat.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`
          bg-white rounded-2xl shadow-glass border border-sage-100 p-6 cursor-pointer
          hover:shadow-sage-lg transition-all duration-300
          ${isExpanded ? 'ring-2 ring-sage-400 shadow-sage-lg' : ''}
        `}
        onClick={() => toggleExpand(stat.id)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-${stat.bgColor} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 text-${stat.color}`} />
          </div>
          <div className="text-right">
            <div className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${stat.changeType === 'positive' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
              }
            `}>
              <TrendingUp className={`w-3 h-3 mr-1 ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600 rotate-180'
              }`} />
              {stat.change}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.description}</p>
        </div>

        {/* Expand/Collapse indicator */}
        <div className="flex items-center justify-center mt-4 pt-4 border-t border-sage-100">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-sage-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-sage-500" />
          )}
        </div>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="pt-4 space-y-3">
              {stat.details.map((detail, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{detail.label}</span>
                  <span className="font-medium text-gray-900">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  const renderSummaryCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl shadow-sage-lg p-6 text-white mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Your Impact Summary</h2>
        <Activity className="w-6 h-6 text-white/80" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{currentStats.scanned}</div>
          <div className="text-white/80 text-sm">Products Verified</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{currentStats.farmsDiscovered}</div>
          <div className="text-white/80 text-sm">Farms Connected</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/80">Transparency Level</span>
          <span className="font-semibold">{currentStats.transparencyScore}%</span>
        </div>
        <div className="mt-2 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${currentStats.transparencyScore}%` }}
          />
        </div>
      </div>
    </motion.div>
  );

  const renderPeriodSelector = () => (
    <div className="flex justify-center mb-6">
      <div className="bg-sage-100 rounded-xl p-1 flex">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setSelectedPeriod(period.value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedPeriod === period.value
                ? 'bg-white text-sage-700 shadow-sm'
                : 'text-sage-600 hover:text-sage-700'
              }
            `}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Period Selector */}
      {renderPeriodSelector()}

      {/* Summary Card */}
      {renderSummaryCard()}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((stat, index) => renderStatCard(stat, index))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-glass border border-sage-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center p-3 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors">
            <BarChart3 className="w-4 h-4 text-sage-600 mr-2" />
            <span className="text-sm font-medium text-sage-700">View Analytics</span>
          </button>
          <button className="flex items-center justify-center p-3 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors">
            <Target className="w-4 h-4 text-sage-600 mr-2" />
            <span className="text-sm font-medium text-sage-700">Set Goals</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsFeed;
