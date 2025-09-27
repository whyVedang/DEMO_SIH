import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useConsumerStore = create(
  persist(
    (set, get) => ({
      // User data
      user: {
        id: 'consumer_001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null,
        location: 'San Francisco, CA',
        joinedDate: '2024-01-15',
        preferences: {
          sustainabilityFocus: true,
          localProducts: true,
          organicOnly: false,
          priceRange: [0, 100],
        }
      },

      // Consumer activity data
      recentlyScanned: [],
      savedProducts: [],
      tracedProducts: [],
      reviewedProducts: [],
      favoritesFarms: [],
      notifications: [],

      // User statistics
      userStats: {
        totalScanned: 0,
        totalSaved: 0,
        farmsDiscovered: 0,
        moneySaved: 0,
        carbonFootprintReduced: 0,
        transparencyScore: 85,
      },

      // UI state
      activeFilters: {
        location: '',
        certification: [],
        priceRange: [0, 100],
        sustainabilityScore: 0,
        inStock: true,
      },
      
      searchHistory: [],
      quickAccessItems: [],

      // Actions
      addToRecentlyScanned: (productId) => set((state) => {
        const existing = state.recentlyScanned.find(item => item.productId === productId);
        if (existing) {
          return {
            recentlyScanned: [
              { ...existing, scannedAt: new Date().toISOString() },
              ...state.recentlyScanned.filter(item => item.productId !== productId)
            ]
          };
        }
        
        return {
          recentlyScanned: [
            {
              productId,
              scannedAt: new Date().toISOString(),
              verificationStatus: 'verified',
              location: state.user.location,
            },
            ...state.recentlyScanned.slice(0, 19) // Keep last 20 items
          ],
          userStats: {
            ...state.userStats,
            totalScanned: state.userStats.totalScanned + 1
          }
        };
      }),

      toggleSavedProduct: (product) => set((state) => {
        const existingIndex = state.savedProducts.findIndex(p => p.id === product.id);
        
        if (existingIndex >= 0) {
          return {
            savedProducts: state.savedProducts.filter(p => p.id !== product.id),
            userStats: {
              ...state.userStats,
              totalSaved: Math.max(0, state.userStats.totalSaved - 1)
            }
          };
        } else {
          return {
            savedProducts: [
              {
                ...product,
                savedAt: new Date().toISOString(),
              },
              ...state.savedProducts
            ],
            userStats: {
              ...state.userStats,
              totalSaved: state.userStats.totalSaved + 1
            }
          };
        }
      }),

      addTracedProduct: (product, traceData) => set((state) => ({
        tracedProducts: [
          {
            ...product,
            traceData,
            tracedAt: new Date().toISOString(),
          },
          ...state.tracedProducts.filter(p => p.id !== product.id)
        ]
      })),

      addReview: (productId, review) => set((state) => ({
        reviewedProducts: [
          {
            productId,
            review,
            reviewedAt: new Date().toISOString(),
          },
          ...state.reviewedProducts.filter(r => r.productId !== productId)
        ]
      })),

      addFavoriteFarm: (farm) => set((state) => {
        const exists = state.favoritesFarms.find(f => f.id === farm.id);
        if (exists) return state;
        
        return {
          favoritesFarms: [...state.favoritesFarms, farm],
          userStats: {
            ...state.userStats,
            farmsDiscovered: state.userStats.farmsDiscovered + 1
          }
        };
      }),

      removeFavoriteFarm: (farmId) => set((state) => ({
        favoritesFarms: state.favoritesFarms.filter(f => f.id !== farmId),
        userStats: {
          ...state.userStats,
          farmsDiscovered: Math.max(0, state.userStats.farmsDiscovered - 1)
        }
      })),

      updateFilters: (filters) => set((state) => ({
        activeFilters: { ...state.activeFilters, ...filters }
      })),

      clearFilters: () => set((state) => ({
        activeFilters: {
          location: '',
          certification: [],
          priceRange: [0, 100],
          sustainabilityScore: 0,
          inStock: true,
        }
      })),

      addToSearchHistory: (query) => set((state) => {
        if (!query.trim()) return state;
        
        const filtered = state.searchHistory.filter(q => q !== query);
        return {
          searchHistory: [query, ...filtered].slice(0, 10) // Keep last 10 searches
        };
      }),

      clearSearchHistory: () => set(() => ({ searchHistory: [] })),

      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            id: Date.now().toString(),
            ...notification,
            createdAt: new Date().toISOString(),
            read: false,
          },
          ...state.notifications
        ]
      })),

      markNotificationRead: (notificationId) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      })),

      clearNotifications: () => set(() => ({ notifications: [] })),

      updateUserPreferences: (preferences) => set((state) => ({
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...preferences }
        }
      })),

      updateUserStats: (stats) => set((state) => ({
        userStats: { ...state.userStats, ...stats }
      })),

      // Computed getters
      getUnreadNotificationCount: () => {
        const { notifications } = get();
        return notifications.filter(n => !n.read).length;
      },

      isProductSaved: (productId) => {
        const { savedProducts } = get();
        return savedProducts.some(p => p.id === productId);
      },

      isProductTraced: (productId) => {
        const { tracedProducts } = get();
        return tracedProducts.some(p => p.id === productId);
      },

      isFarmFavorited: (farmId) => {
        const { favoritesFarms } = get();
        return favoritesFarms.some(f => f.id === farmId);
      },

      getRecentActivity: () => {
        const state = get();
        const activities = [];

        // Add recent scans
        state.recentlyScanned.slice(0, 5).forEach(scan => {
          activities.push({
            type: 'scan',
            timestamp: scan.scannedAt,
            data: scan,
          });
        });

        // Add recent saves
        state.savedProducts.slice(0, 5).forEach(product => {
          activities.push({
            type: 'save',
            timestamp: product.savedAt,
            data: product,
          });
        });

        // Add recent reviews
        state.reviewedProducts.slice(0, 5).forEach(review => {
          activities.push({
            type: 'review',
            timestamp: review.reviewedAt,
            data: review,
          });
        });

        // Sort by timestamp and return latest 10
        return activities
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 10);
      },
    }),
    {
      name: 'consumer-store',
      partialize: (state) => ({
        user: state.user,
        recentlyScanned: state.recentlyScanned,
        savedProducts: state.savedProducts,
        tracedProducts: state.tracedProducts,
        reviewedProducts: state.reviewedProducts,
        favoritesFarms: state.favoritesFarms,
        userStats: state.userStats,
        searchHistory: state.searchHistory,
      }),
    }
  )
);

// Export individual selectors for performance
export const useUser = () => useConsumerStore(state => state.user);
export const useUserStats = () => useConsumerStore(state => state.userStats);
export const useSavedProducts = () => useConsumerStore(state => state.savedProducts);
export const useTracedProducts = () => useConsumerStore(state => state.tracedProducts);
export const useRecentlyScanned = () => useConsumerStore(state => state.recentlyScanned);
export const useFavoritesFarms = () => useConsumerStore(state => state.favoritesFarms);
export const useNotifications = () => useConsumerStore(state => state.notifications);
export const useActiveFilters = () => useConsumerStore(state => state.activeFilters);
export const useSearchHistory = () => useConsumerStore(state => state.searchHistory);
