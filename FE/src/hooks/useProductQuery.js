import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

// Mock API endpoints - Replace with actual API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const endpoints = {
  products: `${API_BASE_URL}/consumer/products`,
  trace: (productId) => `${API_BASE_URL}/trace/${productId}`,
  farmers: (farmerId) => `${API_BASE_URL}/farmers/${farmerId}`,
  scan: `${API_BASE_URL}/scan/verify`,
  reviews: (productId) => `${API_BASE_URL}/products/${productId}/reviews`,
  featured: `${API_BASE_URL}/consumer/products/featured`,
  search: `${API_BASE_URL}/consumer/products/search`,
};

// Mock product data generator
const generateMockProducts = (count = 10, type = 'all') => {
  const categories = ['Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Meat'];
  const origins = ['California', 'Oregon', 'Washington', 'Texas', 'Florida', 'Iowa'];
  const certifications = ['Organic', 'Non-GMO', 'Fair Trade', 'Sustainable', 'Local'];
  const farmNames = ['Green Valley Farm', 'Sunrise Acres', 'Mountain View Ranch', 'Coastal Harvest', 'Prairie Gold Farm', 'Riverside Organics'];

  return Array.from({ length: count }, (_, i) => ({
    id: `product_${type}_${i + 1}`,
    name: `${categories[i % categories.length]} Product ${i + 1}`,
    category: categories[i % categories.length],
    price: Math.round((Math.random() * 50 + 5) * 100) / 100,
    unit: 'lb',
    description: `Fresh, high-quality ${categories[i % categories.length].toLowerCase()} from sustainable farming practices.`,
    images: [
      `https://images.unsplash.com/photo-1${560987297 + i}?auto=format&fit=crop&w=400&q=80`,
    ],
    farmer: {
      id: `farmer_${i % 6 + 1}`,
      name: farmNames[i % farmNames.length],
      location: origins[i % origins.length],
      avatar: `https://images.unsplash.com/photo-${1472099103084 + i}?auto=format&fit=crop&w=100&q=80`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
      verified: true,
    },
    origin: origins[i % origins.length],
    certifications: certifications.slice(0, Math.floor(Math.random() * 3) + 1),
    sustainabilityScore: Math.floor(Math.random() * 40) + 60, // 60-100
    inStock: Math.random() > 0.1, // 90% chance in stock
    harvestDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
    blockchain: {
      verified: true,
      transactionId: `0x${Math.random().toString(16).substr(2, 32)}`,
      lastUpdated: new Date().toISOString(),
    },
    reviews: {
      average: Math.round((Math.random() * 2 + 3) * 10) / 10,
      count: Math.floor(Math.random() * 100) + 5,
    },
    nutritionScore: Math.floor(Math.random() * 30) + 70,
    carbonFootprint: Math.round((Math.random() * 5 + 1) * 100) / 100,
    waterUsage: Math.round((Math.random() * 100 + 50) * 100) / 100,
    featured: type === 'featured' || Math.random() > 0.7,
    trending: Math.random() > 0.8,
    seasonal: Math.random() > 0.6,
  }));
};

// Mock API functions
const mockApi = {
  getProducts: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    let products = generateMockProducts(20);
    
    // Apply filters
    if (filters.category) {
      products = products.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.farmer.name.toLowerCase().includes(searchLower) ||
        p.origin.toLowerCase().includes(searchLower)
      );
    }
    if (filters.priceRange) {
      products = products.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }
    if (filters.certifications && filters.certifications.length > 0) {
      products = products.filter(p => 
        filters.certifications.some(cert => p.certifications.includes(cert))
      );
    }
    if (filters.sustainabilityScore) {
      products = products.filter(p => p.sustainabilityScore >= filters.sustainabilityScore);
    }
    if (filters.inStock) {
      products = products.filter(p => p.inStock);
    }
    
    return {
      products,
      total: products.length,
      page: filters.page || 1,
      limit: filters.limit || 20,
    };
  },

  getFeaturedProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return generateMockProducts(8, 'featured').map(p => ({ ...p, featured: true }));
  },

  getProductById: async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const products = generateMockProducts(1);
    return { ...products[0], id: productId };
  },

  getTraceData: async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const stages = ['Planting', 'Growing', 'Harvesting', 'Processing', 'Packaging', 'Distribution', 'Retail'];
    
    return {
      productId,
      stages: stages.map((stage, index) => ({
        id: `stage_${index + 1}`,
        name: stage,
        date: new Date(Date.now() - (stages.length - index) * 24 * 60 * 60 * 1000).toISOString(),
        location: `Location ${index + 1}`,
        operator: `Operator ${index + 1}`,
        verified: true,
        documents: [`doc_${index + 1}.pdf`],
        temperature: stage === 'Growing' ? `${Math.floor(Math.random() * 20) + 60}°F` : null,
        humidity: stage === 'Growing' ? `${Math.floor(Math.random() * 30) + 40}%` : null,
      })),
      blockchain: {
        verified: true,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
      },
      certificationDocs: [
        { name: 'Organic Certificate', url: '/docs/organic-cert.pdf', verified: true },
        { name: 'Quality Assurance', url: '/docs/qa-cert.pdf', verified: true },
      ],
    };
  },

  scanProduct: async (qrCode) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate QR code verification
    if (qrCode.includes('INVALID')) {
      throw new Error('Invalid QR code');
    }
    
    const products = generateMockProducts(1);
    const product = { ...products[0], qrCode };
    const traceData = await mockApi.getTraceData(product.id);
    
    return {
      product,
      traceData,
      verified: true,
      scannedAt: new Date().toISOString(),
    };
  },

  getFarmer: async (farmerId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: farmerId,
      name: 'Green Valley Farm',
      owner: 'John Smith',
      location: 'California, USA',
      established: '1985',
      size: '250 acres',
      certifications: ['Organic', 'Sustainable', 'Fair Trade'],
      avatar: 'https://images.unsplash.com/photo-1472099103084-30c0f4d6cf57?auto=format&fit=crop&w=200&q=80',
      banner: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 245,
      description: 'Family-owned organic farm committed to sustainable agriculture and environmental stewardship.',
      products: generateMockProducts(5),
      contact: {
        email: 'info@greenvalleyfarm.com',
        phone: '+1 (555) 123-4567',
        website: 'https://greenvalleyfarm.com',
      },
      socialMedia: {
        instagram: '@greenvalleyfarm',
        facebook: 'GreenValleyFarm',
        twitter: '@greenvalley',
      },
      sustainability: {
        waterConservation: 85,
        soilHealth: 92,
        biodiversity: 78,
        carbonSequestration: 88,
      },
    };
  },
};

// React Query hooks
export const useProductQuery = (type = 'all', filters = {}) => {
  return useQuery({
    queryKey: ['products', type, filters],
    queryFn: () => {
      switch (type) {
        case 'featured':
          return mockApi.getFeaturedProducts();
        case 'search':
          return mockApi.getProducts(filters);
        default:
          return mockApi.getProducts(filters);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductById = (productId) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => mockApi.getProductById(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
  });
};

export const useTraceData = (productId) => {
  return useQuery({
    queryKey: ['trace', productId],
    queryFn: () => mockApi.getTraceData(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFarmerData = (farmerId) => {
  return useQuery({
    queryKey: ['farmer', farmerId],
    queryFn: () => mockApi.getFarmer(farmerId),
    enabled: !!farmerId,
    staleTime: 15 * 60 * 1000,
  });
};

export const useScanProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.scanProduct,
    onSuccess: (data) => {
      // Cache the scanned product
      queryClient.setQueryData(['product', data.product.id], data.product);
      queryClient.setQueryData(['trace', data.product.id], data.traceData);
    },
  });
};

// Custom hook for real-time product search
export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const query = useQuery({
    queryKey: ['products', 'search', debouncedQuery, filters],
    queryFn: () => mockApi.getProducts({ search: debouncedQuery, ...filters }),
    enabled: debouncedQuery.length > 0,
    staleTime: 2 * 60 * 1000,
  });

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    ...query,
  };
};

// Export mock API for testing
export { mockApi };
