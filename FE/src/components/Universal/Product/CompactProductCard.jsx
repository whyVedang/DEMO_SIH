import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Shield } from 'lucide-react';
import { useCartStore } from '../../../stores/cartStore';
import { useConsumerStore } from '../../../stores/consumerStore';

const CompactProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { toggleSavedProduct, isProductSaved } = useConsumerStore();

  const isSaved = isProductSaved(product.id);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSavedProduct(product);
  };

  return (
    <div className="product-card-compact hover-lift" onClick={handleProductClick}>
      <div className="product-image-compact">
        {/* Product Image */}
        <img
          src={product.images?.[0] || '/placeholder-product.jpg'}
          alt={product.name}
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        
        {/* Badges */}
        {product.blockchain?.verified && (
          <div className="product-badge-verified">
            <Shield className="w-3 h-3" />
            Verified
          </div>
        )}
        
        {product.featured && (
          <div className="product-badge-featured">
            Featured
          </div>
        )}
      </div>

      <div className="product-content-compact">
        {/* Product Title */}
        <h3 className="product-title-compact">{product.name}</h3>
        
        {/* Brand */}
        <p className="product-brand-compact">{product.brand}</p>
        
        {/* Rating */}
        <div className="product-rating-compact">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="font-medium">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="product-price-compact">
          {product.currency}{product.price}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {product.currency}{product.originalPrice}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="product-actions-compact">
          <button 
            className="btn-add-cart-compact"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button 
            className={`btn-heart-compact ${isSaved ? 'text-red-500 border-red-500' : ''}`}
            onClick={handleSave}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactProductCard;
