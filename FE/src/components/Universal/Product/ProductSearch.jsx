import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  DollarSign, 
  Award, 
  Leaf, 
  Star,
  Clock,
  Truck,
  ChevronDown,
  SlidersHorizontal,
  History,
  TrendingUp
} from 'lucide-react';
import { useConsumerStore } from '../../../stores/consumerStore';

const ProductSearch = ({ 
  onSearch, 
  onFilterChange,
  expanded = false,
  placeholder = "Search products, farms, or locations...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(expanded);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const searchRef = useRef(null);
  const { 
    activeFilters, 
    updateFilters, 
    clearFilters,
    searchHistory,
    addToSearchHistory 
  } = useConsumerStore();

  const [localFilters, setLocalFilters] = useState(activeFilters);

  // Search suggestions
  const suggestions = [
    { type: 'trending', text: 'Organic tomatoes', icon: TrendingUp },
    { type: 'trending', text: 'Local honey', icon: TrendingUp },
    { type: 'history', text: 'Fresh spinach', icon: History },
    { type: 'history', text: 'Farm eggs', icon: History },
    { type: 'suggestion', text: 'Seasonal vegetables', icon: Leaf },
    { type: 'suggestion', text: 'Dairy products', icon: Award },
  ];

  const categories = [
    'All', 'Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Meat', 'Beverages'
  ];

  const certifications = [
    'Organic', 'Non-GMO', 'Fair Trade', 'Sustainable', 'Local', 'Kosher', 'Halal'
  ];

  const locations = [
    'Within 10 miles', 'Within 25 miles', 'Within 50 miles', 'Within 100 miles', 'Anywhere'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'freshness', label: 'Freshest' },
    { value: 'sustainability', label: 'Most Sustainable' },
    { value: 'distance', label: 'Nearest' },
  ];

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        onSearch?.(query);
        addToSearchHistory(query);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, onSearch, addToSearchHistory]);

  useEffect(() => {
    onFilterChange?.(localFilters);
  }, [localFilters, onFilterChange]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      certification: [],
      priceRange: [0, 100],
      sustainabilityScore: 0,
      inStock: true,
      category: 'All',
      sortBy: 'relevance',
    };
    setLocalFilters(clearedFilters);
    clearFilters();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.certification?.length > 0) count++;
    if (localFilters.location) count++;
    if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 100) count++;
    if (localFilters.sustainabilityScore > 0) count++;
    if (localFilters.category && localFilters.category !== 'All') count++;
    return count;
  };

  const renderSearchInput = () => (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 border border-sage-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-sage-100 z-50 overflow-hidden"
          >
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Suggestions</h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-sage-50 rounded-lg transition-colors text-left"
                  >
                    <suggestion.icon className={`w-4 h-4 ${
                      suggestion.type === 'trending' ? 'text-purple-500' :
                      suggestion.type === 'history' ? 'text-gray-500' :
                      'text-sage-500'
                    }`} />
                    <span className="text-gray-700">{suggestion.text}</span>
                    {suggestion.type === 'trending' && (
                      <span className="ml-auto text-xs text-purple-600 font-medium">Trending</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderFilterButton = () => (
    <button
      onClick={() => setShowFilters(!showFilters)}
      className={`
        relative flex items-center space-x-2 px-4 py-4 border border-sage-200 rounded-2xl
        transition-all duration-300 hover:bg-sage-50 min-w-fit
        ${showFilters ? 'bg-sage-100 border-sage-300' : 'bg-white/80 backdrop-blur-sm'}
      `}
    >
      <SlidersHorizontal className="w-5 h-5 text-sage-600" />
      <span className="text-sage-700 font-medium">Filters</span>
      {getActiveFilterCount() > 0 && (
        <span className="absolute -top-2 -right-2 bg-sage-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
          {getActiveFilterCount()}
        </span>
      )}
    </button>
  );

  const renderFilters = () => (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sage-100 p-6 space-y-6"
        >
          {/* Filter header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filter Products</h3>
            <button
              onClick={handleClearFilters}
              className="text-sage-600 hover:text-sage-700 text-sm font-medium transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Category tabs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange('category', category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${localFilters.category === category
                      ? 'bg-sage-500 text-white shadow-sage'
                      : 'bg-gray-100 text-gray-700 hover:bg-sage-100 hover:text-sage-700'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <select
                value={localFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full p-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white"
              >
                <option value="">Any location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Price Range
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [localFilters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-sage-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span className="font-medium">${localFilters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sustainability Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Leaf className="w-4 h-4 inline mr-2" />
                Min Sustainability Score
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localFilters.sustainabilityScore}
                  onChange={(e) => handleFilterChange('sustainabilityScore', parseInt(e.target.value))}
                  className="w-full h-2 bg-sage-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span className="font-medium">{localFilters.sustainabilityScore}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Award className="w-4 h-4 inline mr-2" />
              Certifications
            </label>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <button
                  key={cert}
                  onClick={() => {
                    const newCerts = localFilters.certification?.includes(cert)
                      ? localFilters.certification.filter(c => c !== cert)
                      : [...(localFilters.certification || []), cert];
                    handleFilterChange('certification', newCerts);
                  }}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                    ${localFilters.certification?.includes(cert)
                      ? 'bg-sage-100 border-sage-300 text-sage-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-sage-200'
                    }
                  `}
                >
                  {cert}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
            <select
              value={localFilters.sortBy || 'relevance'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full md:w-64 p-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="inStock"
              checked={localFilters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="w-4 h-4 text-sage-600 bg-gray-100 border-gray-300 rounded focus:ring-sage-500"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
              Show only products in stock
            </label>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (expanded) {
    return (
      <div className={`space-y-4 ${className}`}>
        {renderSearchInput()}
        {renderFilters()}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-3">
        <div className="flex-1">
          {renderSearchInput()}
        </div>
        {renderFilterButton()}
      </div>
      {renderFilters()}
    </div>
  );
};

export default ProductSearch;
