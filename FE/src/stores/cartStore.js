import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      // Cart state
      items: [],
      isOpen: false,
      
      // Delivery and user preferences
      deliveryAddress: {
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
      },
      
      // Payment and checkout
      paymentMethod: '',
      orderNotes: '',
      
      // Cart actions
      addItem: (product, quantity = 1) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { 
            ...product, 
            quantity,
            addedAt: new Date().toISOString()
          }]
        };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter(item => item.id !== productId)
          };
        }
        
        return {
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        };
      }),
      
      clearCart: () => set(() => ({
        items: [],
        orderNotes: ''
      })),
      
      // Cart UI actions
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set(() => ({ isOpen: true })),
      closeCart: () => set(() => ({ isOpen: false })),
      
      // Delivery actions
      updateDeliveryAddress: (address) => set((state) => ({
        deliveryAddress: { ...state.deliveryAddress, ...address }
      })),
      
      setPaymentMethod: (method) => set(() => ({ paymentMethod: method })),
      setOrderNotes: (notes) => set(() => ({ orderNotes: notes })),
      
      // Computed getters
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getDeliveryFee: () => {
        const { getTotalPrice } = get();
        const total = getTotalPrice();
        // Free delivery above ₹500
        return total >= 500 ? 0 : 50;
      },
      
      getTax: () => {
        const { getSubtotal } = get();
        const subtotal = getSubtotal();
        // 5% GST
        return Math.round(subtotal * 0.05);
      },
      
      getFinalTotal: () => {
        const { getSubtotal, getDeliveryFee, getTax } = get();
        return getSubtotal() + getDeliveryFee() + getTax();
      },
      
      getItemById: (productId) => {
        const { items } = get();
        return items.find(item => item.id === productId);
      },
      
      isInCart: (productId) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },
      
      getCartSummary: () => {
        const state = get();
        return {
          itemCount: state.getTotalItems(),
          subtotal: state.getSubtotal(),
          deliveryFee: state.getDeliveryFee(),
          tax: state.getTax(),
          total: state.getFinalTotal(),
          items: state.items
        };
      },
      
      // Quick actions
      quickAdd: (product) => {
        const { addItem, openCart } = get();
        addItem(product, 1);
        openCart();
        
        // Close cart after 3 seconds
        setTimeout(() => {
          const { closeCart } = get();
          closeCart();
        }, 3000);
      },
      
      // Wishlist integration (if needed)
      moveToWishlist: (productId) => {
        const { items, removeItem } = get();
        const item = items.find(item => item.id === productId);
        
        if (item) {
          // Here you could integrate with consumer store's saved products
          removeItem(productId);
          return item;
        }
        return null;
      },
      
      // Order history integration
      createOrder: () => {
        const state = get();
        const order = {
          id: `ORDER_${Date.now()}`,
          items: state.items,
          summary: state.getCartSummary(),
          deliveryAddress: state.deliveryAddress,
          paymentMethod: state.paymentMethod,
          orderNotes: state.orderNotes,
          status: 'pending',
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days
        };
        
        // Clear cart after order
        state.clearCart();
        
        return order;
      },
      
      // Validation helpers
      validateCart: () => {
        const { items } = get();
        const errors = [];
        
        if (items.length === 0) {
          errors.push('Cart is empty');
        }
        
        items.forEach(item => {
          if (!item.inStock) {
            errors.push(`${item.name} is out of stock`);
          }
          if (item.quantity > (item.stockCount || 0)) {
            errors.push(`Only ${item.stockCount} ${item.name} available`);
          }
        });
        
        return {
          isValid: errors.length === 0,
          errors
        };
      },
      
      validateDeliveryAddress: () => {
        const { deliveryAddress } = get();
        const errors = [];
        
        if (!deliveryAddress.name?.trim()) errors.push('Name is required');
        if (!deliveryAddress.address?.trim()) errors.push('Address is required');
        if (!deliveryAddress.city?.trim()) errors.push('City is required');
        if (!deliveryAddress.state?.trim()) errors.push('State is required');
        if (!deliveryAddress.pincode?.trim()) errors.push('Pincode is required');
        if (!deliveryAddress.phone?.trim()) errors.push('Phone number is required');
        
        return {
          isValid: errors.length === 0,
          errors
        };
      },
      
      // Discount and coupon support
      appliedCoupon: null,
      applyCoupon: (couponCode) => set((state) => {
        // Mock coupon validation
        const coupons = {
          'WELCOME10': { discount: 10, type: 'percentage', minOrder: 200 },
          'SAVE50': { discount: 50, type: 'fixed', minOrder: 500 },
          'NEWUSER': { discount: 15, type: 'percentage', minOrder: 300 }
        };
        
        const coupon = coupons[couponCode.toUpperCase()];
        if (coupon && state.getSubtotal() >= coupon.minOrder) {
          return { appliedCoupon: { code: couponCode, ...coupon } };
        }
        return state;
      }),
      
      removeCoupon: () => set(() => ({ appliedCoupon: null })),
      
      getDiscountAmount: () => {
        const { appliedCoupon, getSubtotal } = get();
        if (!appliedCoupon) return 0;
        
        const subtotal = getSubtotal();
        if (appliedCoupon.type === 'percentage') {
          return Math.round(subtotal * (appliedCoupon.discount / 100));
        }
        return appliedCoupon.discount;
      },
      
      getFinalTotalWithDiscount: () => {
        const { getFinalTotal, getDiscountAmount } = get();
        return Math.max(0, getFinalTotal() - getDiscountAmount());
      }
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({
        items: state.items,
        deliveryAddress: state.deliveryAddress,
        paymentMethod: state.paymentMethod,
        appliedCoupon: state.appliedCoupon
      }),
    }
  )
);

// Export individual selectors for performance optimization
export const useCartItems = () => useCartStore(state => state.items);
export const useCartTotal = () => useCartStore(state => state.getTotalItems());
export const useCartPrice = () => useCartStore(state => state.getFinalTotal());
export const useCartSummary = () => useCartStore(state => state.getCartSummary());
export const useCartIsOpen = () => useCartStore(state => state.isOpen);
export const useDeliveryAddress = () => useCartStore(state => state.deliveryAddress);
export const useAppliedCoupon = () => useCartStore(state => state.appliedCoupon);

// Utility hooks
export const useAddToCart = () => useCartStore(state => state.addItem);
export const useRemoveFromCart = () => useCartStore(state => state.removeItem);
export const useUpdateQuantity = () => useCartStore(state => state.updateQuantity);
export const useToggleCart = () => useCartStore(state => state.toggleCart);
export const useClearCart = () => useCartStore(state => state.clearCart);
