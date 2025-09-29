// Demo Data Service for Initializing Sample Data
import dataSyncService from './dataSyncService';

class DemoDataService {
  constructor() {
    this.isInitialized = false;
  }

  // Initialize demo data if not already done
  initializeDemoData() {
    if (this.isInitialized) return;
    
    const existingData = dataSyncService.getData();
    if (existingData && existingData.farmers.batches.length > 0) {
      this.isInitialized = true;
      return;
    }

    this.createSampleFarmerBatches();
    this.createSampleRetailerStock();
    this.createSampleDistributorInventory();
    this.createSampleOrders();
    
    this.isInitialized = true;
  }

  createSampleFarmerBatches() {
    const sampleBatches = [
      {
        cropName: 'Organic Tomatoes',
        variety: 'Cherry',
        description: 'Fresh organic cherry tomatoes grown without pesticides',
        totalQuantity: '100',
        unit: 'kg',
        pricePerUnit: '60',
        minOrderQuantity: '10',
        harvestDate: '2024-10-15',
        availableUntil: '2024-11-15',
        location: 'Green Valley Farm, Maharashtra',
        farmName: 'Green Valley Farm'
      },
      {
        cropName: 'Basmati Rice',
        variety: 'Premium',
        description: 'High-quality basmati rice, perfect for daily consumption',
        totalQuantity: '500',
        unit: 'kg',
        pricePerUnit: '80',
        minOrderQuantity: '50',
        harvestDate: '2024-10-20',
        availableUntil: '2024-12-20',
        location: 'Punjab Rice Fields, Punjab',
        farmName: 'Punjab Rice Fields'
      },
      {
        cropName: 'Cold-Pressed Coconut Oil',
        variety: 'Virgin',
        description: 'Pure virgin coconut oil extracted using traditional methods',
        totalQuantity: '200',
        unit: 'liters',
        pricePerUnit: '300',
        minOrderQuantity: '10',
        harvestDate: '2024-10-10',
        availableUntil: '2025-10-10',
        location: 'Kerala Coconut Plantation, Kerala',
        farmName: 'Kerala Coconut Plantation'
      },
      {
        cropName: 'Himalayan Pink Salt',
        variety: 'Fine',
        description: 'Natural Himalayan pink salt with trace minerals',
        totalQuantity: '150',
        unit: 'kg',
        pricePerUnit: '120',
        minOrderQuantity: '5',
        harvestDate: '2024-09-01',
        availableUntil: '2025-09-01',
        location: 'Himalayan Salt Mines, Himachal Pradesh',
        farmName: 'Himalayan Salt Mines'
      },
      {
        cropName: 'Organic Spinach',
        variety: 'Baby',
        description: 'Tender baby spinach leaves, rich in iron and vitamins',
        totalQuantity: '80',
        unit: 'kg',
        pricePerUnit: '45',
        minOrderQuantity: '5',
        harvestDate: '2024-10-12',
        availableUntil: '2024-11-12',
        location: 'Urban Farm Delhi, Delhi',
        farmName: 'Urban Farm Delhi'
      }
    ];

    sampleBatches.forEach(batch => {
      dataSyncService.addFarmerBatch(batch);
    });
  }

  createSampleRetailerStock() {
    const sampleStock = [
      {
        productName: 'Organic Tomatoes',
        variety: 'Cherry',
        quantity: '25',
        unit: 'kg',
        purchasePrice: '60',
        sellingPrice: '78',
        supplier: 'Green Valley Farm',
        purchaseDate: '2024-10-01',
        status: 'In Stock',
        category: 'vegetables'
      },
      {
        productName: 'Cold-Pressed Coconut Oil',
        variety: 'Virgin',
        quantity: '15',
        unit: 'liters',
        purchasePrice: '300',
        sellingPrice: '390',
        supplier: 'Kerala Coconut Plantation',
        purchaseDate: '2024-09-28',
        status: 'In Stock',
        category: 'oils'
      },
      {
        productName: 'Himalayan Pink Salt',
        variety: 'Fine',
        quantity: '20',
        unit: 'kg',
        purchasePrice: '120',
        sellingPrice: '156',
        supplier: 'Himalayan Salt Mines',
        purchaseDate: '2024-09-25',
        status: 'Low Stock',
        category: 'spices'
      }
    ];

    sampleStock.forEach(stock => {
      dataSyncService.addRetailerStock(stock);
    });
  }

  createSampleDistributorInventory() {
    const sampleInventory = [
      {
        productName: 'Organic Tomatoes',
        variety: 'Cherry',
        quantity: '100',
        unit: 'kg',
        purchasePrice: '78',
        sellingPrice: '94',
        supplier: 'City Mart Retail',
        category: 'vegetables',
        description: 'Premium organic cherry tomatoes for wholesale distribution',
        status: 'In Stock'
      },
      {
        productName: 'Basmati Rice',
        variety: 'Premium',
        quantity: '200',
        unit: 'kg',
        purchasePrice: '95',
        sellingPrice: '114',
        supplier: 'Grain Distributors Ltd',
        category: 'grains',
        description: 'High-quality basmati rice for restaurants and hotels',
        status: 'In Stock'
      },
      {
        productName: 'Cold-Pressed Coconut Oil',
        variety: 'Virgin',
        quantity: '50',
        unit: 'liters',
        purchasePrice: '390',
        sellingPrice: '468',
        supplier: 'Oil Distributors Inc',
        category: 'oils',
        description: 'Pure virgin coconut oil for health-conscious consumers',
        status: 'In Stock'
      }
    ];

    sampleInventory.forEach(inventory => {
      dataSyncService.addDistributorInventory(inventory);
    });
  }

  createSampleOrders() {
    const sampleOrders = [
      {
        type: 'farmerToDistributor',
        from: 'Green Valley Farm',
        to: 'Metro Distributors',
        product: 'Organic Tomatoes',
        quantity: '50',
        unit: 'kg',
        price: '60',
        totalAmount: '3000',
        status: 'Completed',
        orderDate: '2024-10-01'
      },
      {
        type: 'farmerToDistributor',
        from: 'Kerala Coconut Plantation',
        to: 'Regional Distributors',
        product: 'Cold-Pressed Coconut Oil',
        quantity: '30',
        unit: 'liters',
        price: '300',
        totalAmount: '9000',
        status: 'Completed',
        orderDate: '2024-09-28'
      },
      {
        type: 'distributorToRetailer',
        from: 'Metro Distributors',
        to: 'City Mart Retail',
        product: 'Organic Tomatoes',
        quantity: '25',
        unit: 'kg',
        price: '72',
        totalAmount: '1800',
        status: 'Completed',
        orderDate: '2024-10-05'
      },
      {
        type: 'distributorToRetailer',
        from: 'Regional Distributors',
        to: 'Health Store Plus',
        product: 'Cold-Pressed Coconut Oil',
        quantity: '15',
        unit: 'liters',
        price: '360',
        totalAmount: '5400',
        status: 'Processing',
        orderDate: '2024-10-08'
      }
    ];

    sampleOrders.forEach(order => {
      dataSyncService.createOrder(order);
    });
  }

  // Get demo statistics
  getDemoStats() {
    return {
      totalFarmerBatches: dataSyncService.getFarmerBatches().length,
      totalRetailerStock: dataSyncService.getRetailerStock().length,
      totalDistributorInventory: dataSyncService.getDistributorInventory().length,
      totalOrders: dataSyncService.getOrders().length,
      availableFarmerBatches: dataSyncService.getFarmerBatches().filter(b => b.status === 'Available').length,
      lowStockItems: dataSyncService.getRetailerStock().filter(s => s.status === 'Low Stock').length
    };
  }

  // Reset all demo data
  resetDemoData() {
    dataSyncService.clearAllData();
    this.isInitialized = false;
    this.initializeDemoData();
  }

  // Export demo data for backup
  exportDemoData() {
    dataSyncService.exportData();
  }
}

// Create singleton instance
const demoDataService = new DemoDataService();

export default demoDataService;
