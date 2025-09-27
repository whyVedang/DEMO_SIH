import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Grid,
  List,
  ChevronDown,
  X,
  Star,
  MapPin,
  Leaf,
  Award,
  SlidersHorizontal
} from 'lucide-react';
import ProductCard from './ProductCard';
import { categories } from '../../../data/sampleProducts';

const ProductGrid = ({ 
  products = [], 
  title = "Products",
  showFilters = true,
  showSorting = true,
  variant = 'ecommerce',
  loading = false,
  emptyMessage = "No products found",
  className = ""
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    certification: [],
    sustainabilityScore: 0,
    inStock: false
  });

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'sustainability', label: 'Sustainability Score' },
    { value: 'newest', label: 'Newest First' }
  ];

  const certificationOptions = [
    'Organic',
    'FSSAI Approved',
    'Chemical-Free',
    'Fair Trade',
    'Non-GMO',
    'Gluten-Free'
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    if (filters.certification.length > 0) {
      filtered = filtered.filter(product =>
        product.certifications?.some(cert => 
          filters.certification.includes(cert)
        )
      );
    }

    if (filters.sustainabilityScore > 0) {
      filtered = filtered.filter(product => 
        product.sustainabilityScore >= filters.sustainabilityScore
      );
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'sustainability':
        filtered.sort((a, b) => (b.sustainabilityScore || 0) - (a.sustainabilityScore || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.harvestDate || 0) - new Date(a.harvestDate || 0));
        break;
      default:
        // Relevance - keep original order or apply custom logic
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      certification: [],
      sustainabilityScore: 0,
      inStock: false
    });
  };

  const toggleCertification = (cert) => {
    setFilters(prev => ({
      ...prev,
      certification: prev.certification.includes(cert)
        ? prev.certification.filter(c => c !== cert)
        : [...prev.certification, cert]
    }));
  };

  const hasActiveFilters = Object.values(filters).some(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value > 0;
    if (typeof value === 'string') return value !== '';
    if (Array.isArray(value) && value.length === 2) {
      return value[0] > 0 || value[1] < 1000;
    }
    return false;
  });

  const renderFilters = () => (
    <AnimatePresence>
      {showFilterPanel && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-sage-600 hover:text-sage-700"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setShowFilterPanel(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                    className={`flex items-center space-x-2 w-full text-left p-2 rounded-lg transition-colors ${
                      filters.rating === rating ? 'bg-sage-100 text-sage-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">& up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sustainability Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Sustainability: {filters.sustainabilityScore}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={filters.sustainabilityScore}
                onChange={(e) => updateFilter('sustainabilityScore', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <div className="flex flex-wrap gap-2">
              {certificationOptions.map(cert => (
                <button
                  key={cert}
                  onClick={() => toggleCertification(cert)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.certification.includes(cert)
                      ? 'bg-sage-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Filter */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">In Stock Only</span>
            </label>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderHeader = () => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600">
          {filteredAndSortedProducts.length} of {products.length} products
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Filter Toggle */}
        {showFilters && (
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
              showFilterPanel || hasActiveFilters
                ? 'border-sage-500 bg-sage-50 text-sage-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-sage-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                !
              </span>
            )}
          </button>
        )}

        {/* Sort Dropdown */}
        {showSorting && (
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 pr-8 appearance-none bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-400"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* View Mode Toggle */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-colors ${
              viewMode === 'grid' ? 'bg-sage-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-colors ${
              viewMode === 'list' ? 'bg-sage-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
          ))}
        </div>
      );
    }

    if (filteredAndSortedProducts.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-12 h-12 text-sage-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">{emptyMessage}</p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      );
    }

    const gridClass = viewMode === 'grid' 
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
      : 'space-y-4';

    return (
      <motion.div layout className={gridClass}>
        {filteredAndSortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard
              product={product}
              variant={variant}
              className={viewMode === 'list' ? 'flex-row max-w-none' : ''}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {renderHeader()}
      {renderFilters()}
      {renderProducts()}
    </div>
  );
};

export default ProductGrid;
