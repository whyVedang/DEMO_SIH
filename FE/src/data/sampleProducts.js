// Comprehensive sample product data for end products (packaged goods)
export const sampleProducts = [
  {
    id: 1,
    name: "Organic Tomato Sauce",
    brand: "FreshPure",
    category: "Organic Foods",
    price: 185,
    originalPrice: 220,
    currency: "₹",
    rating: 4.5,
    reviewCount: 234,
    images: [
      "/images/products/tomato-sauce-1.jpg",
      "/images/products/tomato-sauce-2.jpg",
      "/images/products/tomato-sauce-3.jpg"
    ],
    inStock: true,
    stockCount: 45,
    verified: true,
    sourceLocation: "Karnataka, India",
    certifications: ["Organic", "FSSAI Approved", "Chemical-Free"],
    deliveryTime: "1-2 days",
    description: "Premium organic tomato sauce made from farm-fresh tomatoes. Rich in flavor and nutrients, perfect for pasta, pizza, and cooking.",
    ingredients: ["Organic Tomatoes", "Sea Salt", "Basil", "Oregano", "Garlic"],
    nutritionalInfo: {
      calories: 25,
      protein: "1.2g",
      carbs: "5.8g",
      fat: "0.2g",
      fiber: "1.4g",
      sodium: "380mg"
    },
    sustainabilityScore: 92,
    nutritionScore: 88,
    harvestDate: "2024-01-20",
    packageSize: "500ml",
    unit: "bottle",
    featured: true,
    trending: false,
    seasonal: false,
    blockchain: {
      verified: true,
      farmId: "FARM_001",
      farmName: "Green Valley Organic Farm",
      farmer: {
        name: "Rajesh Kumar",
        location: "Bangalore Rural, Karnataka",
        experience: "15 years",
        certifications: ["Organic Farming", "IFOAM Certified"]
      },
      supplyChain: [
        { stage: "Harvest", date: "2024-01-20", location: "Green Valley Farm" },
        { stage: "Processing", date: "2024-01-22", location: "FreshPure Processing Unit" },
        { stage: "Packaging", date: "2024-01-23", location: "FreshPure Facility" },
        { stage: "Quality Check", date: "2024-01-24", location: "QC Lab" },
        { stage: "Distribution", date: "2024-01-25", location: "Warehouse" }
      ]
    }
  },
  {
    id: 2,
    name: "Cold-Pressed Coconut Oil",
    brand: "PureHarvest",
    category: "Organic Foods",
    price: 450,
    originalPrice: 525,
    currency: "₹",
    rating: 4.8,
    reviewCount: 189,
    images: [
      "/images/products/coconut-oil-1.jpg",
      "/images/products/coconut-oil-2.jpg"
    ],
    inStock: true,
    stockCount: 23,
    verified: true,
    sourceLocation: "Kerala, India",
    certifications: ["Organic", "Cold-Pressed", "Chemical-Free", "FSSAI Approved"],
    deliveryTime: "Same day delivery",
    description: "Pure, cold-pressed coconut oil extracted from fresh coconuts. Rich in MCTs and perfect for cooking, hair care, and skin care.",
    ingredients: ["100% Organic Coconut"],
    nutritionalInfo: {
      calories: 862,
      protein: "0g",
      carbs: "0g",
      fat: "100g",
      saturatedFat: "87g",
      mcfOil: "65g"
    },
    sustainabilityScore: 95,
    nutritionScore: 85,
    harvestDate: "2024-01-18",
    packageSize: "500ml",
    unit: "bottle",
    featured: false,
    trending: true,
    seasonal: false,
    blockchain: {
      verified: true,
      farmId: "FARM_002",
      farmName: "Kerala Coconut Co-op",
      farmer: {
        name: "Suresh Nair",
        location: "Thrissur, Kerala",
        experience: "20 years",
        certifications: ["Organic Farming", "Fair Trade"]
      },
      supplyChain: [
        { stage: "Harvest", date: "2024-01-18", location: "Kerala Coconut Farm" },
        { stage: "Cold Pressing", date: "2024-01-19", location: "PureHarvest Mill" },
        { stage: "Filtration", date: "2024-01-20", location: "Processing Unit" },
        { stage: "Bottling", date: "2024-01-21", location: "Packaging Facility" },
        { stage: "Quality Testing", date: "2024-01-22", location: "Lab" }
      ]
    }
  },
  {
    id: 3,
    name: "Himalayan Pink Salt",
    brand: "PureMinerals",
    category: "Spices & Condiments",
    price: 320,
    currency: "₹",
    rating: 4.6,
    reviewCount: 412,
    images: [
      "/images/products/pink-salt-1.jpg",
      "/images/products/pink-salt-2.jpg"
    ],
    inStock: true,
    stockCount: 67,
    verified: true,
    sourceLocation: "Himachal Pradesh, India",
    certifications: ["Natural", "Unprocessed", "Chemical-Free"],
    deliveryTime: "2-3 days",
    description: "Pure Himalayan pink salt with natural minerals. Hand-mined from ancient salt deposits, perfect for cooking and finishing dishes.",
    ingredients: ["100% Himalayan Pink Salt"],
    nutritionalInfo: {
      sodium: "38g",
      chloride: "59g",
      minerals: "84 trace minerals",
      calories: 0
    },
    sustainabilityScore: 88,
    nutritionScore: 90,
    harvestDate: "2024-01-15",
    packageSize: "1kg",
    unit: "pack",
    featured: false,
    trending: false,
    seasonal: false,
    blockchain: {
      verified: true,
      farmId: "MINE_001",
      farmName: "Himalayan Salt Mines",
      farmer: {
        name: "Vikram Singh",
        location: "Mandi, Himachal Pradesh",
        experience: "25 years",
        certifications: ["Traditional Mining", "Sustainable Extraction"]
      }
    }
  },
  {
    id: 4,
    name: "Organic Turmeric Powder",
    brand: "GoldenSpice",
    category: "Spices & Condiments",
    price: 280,
    originalPrice: 350,
    currency: "₹",
    rating: 4.7,
    reviewCount: 298,
    images: [
      "/images/products/turmeric-1.jpg",
      "/images/products/turmeric-2.jpg"
    ],
    inStock: true,
    stockCount: 89,
    verified: true,
    sourceLocation: "Tamil Nadu, India",
    certifications: ["Organic", "FSSAI Approved", "Pesticide-Free"],
    deliveryTime: "1-2 days",
    description: "Premium organic turmeric powder with high curcumin content. Sourced from organic farms and processed using traditional methods.",
    ingredients: ["100% Organic Turmeric"],
    nutritionalInfo: {
      calories: 312,
      protein: "9.7g",
      carbs: "67g",
      fat: "3.2g",
      fiber: "22.7g",
      curcumin: "3.5%"
    },
    sustainabilityScore: 93,
    nutritionScore: 94,
    harvestDate: "2024-01-10",
    packageSize: "250g",
    unit: "pack",
    featured: true,
    trending: true,
    seasonal: false,
    blockchain: {
      verified: true,
      farmId: "FARM_003",
      farmName: "Tamil Organic Spices",
      farmer: {
        name: "Murugan Raman",
        location: "Erode, Tamil Nadu",
        experience: "18 years",
        certifications: ["Organic Farming", "NPOP Certified"]
      }
    }
  },
  {
    id: 5,
    name: "Organic Honey",
    brand: "BeeNatural",
    category: "Natural Products",
    price: 650,
    currency: "₹",
    rating: 4.9,
    reviewCount: 567,
    images: [
      "/images/products/honey-1.jpg",
      "/images/products/honey-2.jpg",
      "/images/products/honey-3.jpg"
    ],
    inStock: true,
    stockCount: 34,
    verified: true,
    sourceLocation: "Uttarakhand, India",
    certifications: ["Organic", "Raw", "Unprocessed", "FSSAI Approved"],
    deliveryTime: "2-3 days",
    description: "Pure, raw organic honey from mountain flowers. Unprocessed and unfiltered to retain all natural enzymes and nutrients.",
    ingredients: ["100% Raw Organic Honey"],
    nutritionalInfo: {
      calories: 304,
      protein: "0.3g",
      carbs: "82.4g",
      sugars: "82.1g",
      antioxidants: "High",
      enzymes: "Natural"
    },
    sustainabilityScore: 96,
    nutritionScore: 87,
    harvestDate: "2024-01-12",
    packageSize: "500g",
    unit: "jar",
    featured: true,
    trending: true,
    seasonal: true,
    blockchain: {
      verified: true,
      farmId: "APIARY_001",
      farmName: "Mountain Bee Farm",
      farmer: {
        name: "Arun Sharma",
        location: "Dehradun, Uttarakhand",
        experience: "22 years",
        certifications: ["Organic Beekeeping", "Natural Apiary"]
      }
    }
  },
  {
    id: 6,
    name: "Quinoa Grain",
    brand: "SuperGrains",
    category: "Grains & Cereals",
    price: 420,
    originalPrice: 480,
    currency: "₹",
    rating: 4.4,
    reviewCount: 156,
    images: [
      "/images/products/quinoa-1.jpg",
      "/images/products/quinoa-2.jpg"
    ],
    inStock: true,
    stockCount: 52,
    verified: true,
    sourceLocation: "Rajasthan, India",
    certifications: ["Organic", "Gluten-Free", "Protein-Rich"],
    deliveryTime: "1-2 days",
    description: "Premium quinoa grains packed with complete proteins and essential amino acids. Perfect for healthy meals and protein bowls.",
    ingredients: ["100% Organic Quinoa"],
    nutritionalInfo: {
      calories: 368,
      protein: "14.1g",
      carbs: "64.2g",
      fat: "6.1g",
      fiber: "7g",
      iron: "4.6mg"
    },
    sustainabilityScore: 89,
    nutritionScore: 95,
    harvestDate: "2024-01-08",
    packageSize: "1kg",
    unit: "pack",
    featured: false,
    trending: false,
    seasonal: false,
    blockchain: {
      verified: true,
      farmId: "FARM_004",
      farmName: "Rajasthan Organic Grains",
      farmer: {
        name: "Ramesh Choudhary",
        location: "Jodhpur, Rajasthan",
        experience: "12 years",
        certifications: ["Organic Farming", "Sustainable Agriculture"]
      }
    }
  },
  {
    id: 7,
    name: "Green Tea Leaves",
    brand: "TeaPure",
    category: "Beverages",
    price: 380,
    currency: "₹",
    rating: 4.6,
    reviewCount: 234,
    images: [
      "/images/products/green-tea-1.jpg",
      "/images/products/green-tea-2.jpg"
    ],
    inStock: true,
    stockCount: 78,
    verified: true,
    sourceLocation: "Darjeeling, West Bengal",
    certifications: ["Organic", "Fresh", "Hand-Picked"],
    deliveryTime: "2-3 days",
    description: "Premium Darjeeling green tea leaves with delicate flavor and high antioxidants. Hand-picked from high-altitude gardens.",
    ingredients: ["100% Organic Green Tea Leaves"],
    nutritionalInfo: {
      calories: 2,
      antioxidants: "High",
      catechins: "25mg",
      caffeine: "28mg",
      polyphenols: "Rich"
    },
    sustainabilityScore: 91,
    nutritionScore: 92,
    harvestDate: "2024-01-16",
    packageSize: "200g",
    unit: "pack",
    featured: false,
    trending: true,
    seasonal: true,
    blockchain: {
      verified: true,
      farmId: "TEA_001",
      farmName: "Darjeeling Tea Gardens",
      farmer: {
        name: "Pemba Sherpa",
        location: "Darjeeling, West Bengal",
        experience: "28 years",
        certifications: ["Organic Tea Cultivation", "Fair Trade"]
      }
    }
  },
  {
    id: 8,
    name: "Organic Basmati Rice",
    brand: "GrainKing",
    category: "Grains & Cereals",
    price: 540,
    currency: "₹",
    rating: 4.8,
    reviewCount: 423,
    images: [
      "/images/products/basmati-1.jpg",
      "/images/products/basmati-2.jpg"
    ],
    inStock: true,
    stockCount: 91,
    verified: true,
    sourceLocation: "Punjab, India",
    certifications: ["Organic", "Aged", "Premium Quality"],
    deliveryTime: "1-2 days",
    description: "Premium aged organic basmati rice with distinctive aroma and long grains. Perfect for biryanis and special occasions.",
    ingredients: ["100% Organic Basmati Rice"],
    nutritionalInfo: {
      calories: 356,
      protein: "7.1g",
      carbs: "78.2g",
      fat: "0.9g",
      fiber: "1.3g",
      glycemicIndex: "Medium"
    },
    sustainabilityScore: 87,
    nutritionScore: 84,
    harvestDate: "2023-11-15",
    packageSize: "5kg",
    unit: "bag",
    featured: true,
    trending: false,
    seasonal: false,
    blockchain: {
      verified: true,
      farmId: "FARM_005",
      farmName: "Punjab Organic Rice Co-op",
      farmer: {
        name: "Harpreet Singh",
        location: "Amritsar, Punjab",
        experience: "30 years",
        certifications: ["Organic Rice Farming", "Traditional Methods"]
      }
    }
  }
];

export const categories = [
  {
    id: "organic-foods",
    name: "Organic Foods",
    description: "Certified organic food products",
    icon: "leaf",
    productCount: 15,
    featured: true
  },
  {
    id: "spices-condiments",
    name: "Spices & Condiments",
    description: "Pure spices and natural seasonings",
    icon: "spice",
    productCount: 12,
    featured: true
  },
  {
    id: "grains-cereals",
    name: "Grains & Cereals",
    description: "Wholesome grains and healthy cereals",
    icon: "grain",
    productCount: 8,
    featured: true
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Natural and healthy drinks",
    icon: "cup",
    productCount: 6,
    featured: true
  },
  {
    id: "natural-products",
    name: "Natural Products",
    description: "Pure natural health products",
    icon: "nature",
    productCount: 10,
    featured: true
  },
  {
    id: "dairy-products",
    name: "Dairy Products",
    description: "Fresh and organic dairy items",
    icon: "milk",
    productCount: 5,
    featured: false
  }
];

export const featuredProducts = sampleProducts.filter(product => product.featured);
export const trendingProducts = sampleProducts.filter(product => product.trending);
export const seasonalProducts = sampleProducts.filter(product => product.seasonal);

// Helper functions
export const getProductById = (id) => sampleProducts.find(product => product.id === parseInt(id));
export const getProductsByCategory = (category) => sampleProducts.filter(product => 
  product.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
);
export const searchProducts = (query) => sampleProducts.filter(product => 
  product.name.toLowerCase().includes(query.toLowerCase()) ||
  product.brand.toLowerCase().includes(query.toLowerCase()) ||
  product.category.toLowerCase().includes(query.toLowerCase()) ||
  product.description.toLowerCase().includes(query.toLowerCase())
);
