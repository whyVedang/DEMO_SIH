import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  List, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  Star, 
  Heart, 
  Eye, 
  ShoppingCart,
  Shield,
  Leaf,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import ProductCard from './ProductCard';
import { useProductSearch } from '../../../hooks/useProductQuery';
import { useConsumerStore } from '../../../stores/consumerStore';

const ProductTable = ({ 
  searchQuery = '',
  onProductSelect,
  variant = 'consumer', // 'consumer', 'farmer', 'admin'
  initialView = 'grid', // 'grid', 'list'
  pageSize = 12,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState(initialView);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');

  const { activeFilters } = useConsumerStore();
  
  // Use the product search hook with filters
  const { 
    data: productData, 
    isLoading, 
    error,
    filters,
    setFilters 
  } = useProductSearch();

  const products = productData?.products || [];
  const totalProducts = productData?.total || 0;

  // Pagination
  const totalPages = Math.ceil(totalProducts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'freshness', label: 'Freshness' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'distance', label: 'Distance' },
    { value: 'name', label: 'Name' },
  ];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderViewToggle = () => (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'grid' 
            ? 'bg-white text-sage-600 shadow-sm' 
            : 'text-gray-600 hover:text-sage-600'
        }`}
      >
        <Grid className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list' 
            ? 'bg-white text-sage-600 shadow-sm' 
            : 'text-gray-600 hover:text-sage-600'
        }`}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );

  const renderSortDropdown = () => (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
        className="appearance-none bg-white border border-sage-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );

  const renderToolbar = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold text-gray-900">
          Products {totalProducts > 0 && <span className="text-sage-600">({totalProducts})</span>}
        </h2>
        {renderViewToggle()}
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Sort by:</span>
        {renderSortDropdown()}
      </div>
    </div>
  );

  const renderLoadingSkeleton = () => {
    const skeletonCount = viewMode === 'grid' ? 12 : 8;
    return (
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }
      `}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            className={`animate-pulse bg-sage-100 rounded-2xl ${
              viewMode === 'grid' ? 'h-80' : 'h-32'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {currentProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProductCard
            product={product}
            variant={variant}
            onSelect={onProductSelect}
            showActions={variant === 'consumer'}
          />
        </motion.div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {currentProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow-glass border border-sage-100 p-6 hover:shadow-sage-lg transition-all duration-300 cursor-pointer"
          onClick={() => onProductSelect?.(product)}
        >
          <div className="flex items-center space-x-6">
            {/* Product Image */}
            <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-sage-100">
              <img
                src={product.images?.[0] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sage-600 text-sm mb-2">{product.category}</p>
                  
                  {/* Farmer info */}
                  {product.farmer && (
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={product.farmer.avatar || '/placeholder-avatar.jpg'}
                        alt={product.farmer.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{product.farmer.name}</span>
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{product.origin}</span>
                      {product.farmer.rating && (
                        <>
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{product.farmer.rating}</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Certifications */}
                  {product.certifications && product.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.certifications.slice(0, 3).map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="text-right">
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-gray-600 text-sm">/{product.unit}</span>
                  </div>

                  {variant === 'consumer' && (
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-sage-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {product.inStock && (
                        <button className="px-3 py-2 bg-sage-500 text-white rounded-lg text-sm hover:bg-sage-600 transition-colors">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom metrics */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-sage-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {product.sustainabilityScore && (
                    <div className="flex items-center space-x-1">
                      <Leaf className="w-4 h-4 text-sage-500" />
                      <span>{product.sustainabilityScore}/100</span>
                    </div>
                  )}
                  {product.blockchain?.verified && (
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-verified" />
                      <span>Verified</span>
                    </div>
                  )}
                  {product.harvestDate && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{Math.floor((new Date() - new Date(product.harvestDate)) / (1000 * 60 * 60 * 24))}d fresh</span>
                    </div>
                  )}
                </div>

                {!product.inStock && (
                  <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-sage-200 text-sage-600 hover:bg-sage-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 rounded-lg text-sage-600 hover:bg-sage-50 transition-colors"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 text-gray-400">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-sage-500 text-white'
                : 'text-sage-600 hover:bg-sage-50'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-400">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 rounded-lg text-sage-600 hover:bg-sage-50 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-sage-200 text-sage-600 hover:bg-sage-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <Search className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Error loading products</h3>
          <p className="text-sm text-gray-600">{error.message}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-glass border border-sage-100 p-6 ${className}`}>
      {renderToolbar()}

      {isLoading ? (
        renderLoadingSkeleton()
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-sage-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? renderGridView() : renderListView()}
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default ProductTable;
