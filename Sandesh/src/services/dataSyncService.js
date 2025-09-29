// Data Synchronization Service for Cross-Dashboard Data Management
class DataSyncService {
  constructor() {
    this.storageKey = 'agriculturePlatformData';
    this.initializeData();
  }

  // Initialize data structure if not exists
  initializeData() {
    const existingData = this.getData();
    if (!existingData) {
      const initialData = {
        farmers: {
          batches: [],
          lastUpdated: new Date().toISOString()
        },
        retailers: {
          stock: [],
          lastUpdated: new Date().toISOString()
        },
        distributors: {
          inventory: [],
          lastUpdated: new Date().toISOString()
        },
        orders: {
          farmerToRetailer: [],
          retailerToDistributor: [],
          lastUpdated: new Date().toISOString()
        },
        syncHistory: []
      };
      this.saveData(initialData);
    }
  }

  // Get all data
  getData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }

  // Save all data
  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.logSync('Data saved to localStorage', data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Farmer batch operations
  addFarmerBatch(batch) {
    const data = this.getData();
    if (data) {
      batch.id = this.generateId();
      batch.createdAt = new Date().toISOString();
      batch.status = 'Available';
      data.farmers.batches.unshift(batch);
      data.farmers.lastUpdated = new Date().toISOString();
      this.saveData(data);
      this.logSync('Farmer batch added', batch);
      return batch;
    }
    return null;
  }

  getFarmerBatches() {
    const data = this.getData();
    return data ? data.farmers.batches : [];
  }

  updateFarmerBatch(batchId, updates) {
    const data = this.getData();
    if (data) {
      const batchIndex = data.farmers.batches.findIndex(b => b.id === batchId);
      if (batchIndex !== -1) {
        data.farmers.batches[batchIndex] = { ...data.farmers.batches[batchIndex], ...updates };
        data.farmers.lastUpdated = new Date().toISOString();
        this.saveData(data);
        this.logSync('Farmer batch updated', { batchId, updates });
        return data.farmers.batches[batchIndex];
      }
    }
    return null;
  }

  // Retailer stock operations
  addRetailerStock(stockItem) {
    const data = this.getData();
    if (data) {
      stockItem.id = this.generateId();
      stockItem.createdAt = new Date().toISOString();
      data.retailers.stock.unshift(stockItem);
      data.retailers.lastUpdated = new Date().toISOString();
      this.saveData(data);
      this.logSync('Retailer stock added', stockItem);
      return stockItem;
    }
    return null;
  }

  getRetailerStock() {
    const data = this.getData();
    return data ? data.retailers.stock : [];
  }

  updateRetailerStock(stockId, updates) {
    const data = this.getData();
    if (data) {
      const stockIndex = data.retailers.stock.findIndex(s => s.id === stockId);
      if (stockIndex !== -1) {
        data.retailers.stock[stockIndex] = { ...data.retailers.stock[stockIndex], ...updates };
        data.retailers.lastUpdated = new Date().toISOString();
        this.saveData(data);
        this.logSync('Retailer stock updated', { stockId, updates });
        return data.retailers.stock[stockIndex];
      }
    }
    return null;
  }

  // Distributor inventory operations
  addDistributorInventory(inventoryItem) {
    const data = this.getData();
    if (data) {
      inventoryItem.id = this.generateId();
      inventoryItem.createdAt = new Date().toISOString();
      data.distributors.inventory.unshift(inventoryItem);
      data.distributors.lastUpdated = new Date().toISOString();
      this.saveData(data);
      this.logSync('Distributor inventory added', inventoryItem);
      return inventoryItem;
    }
    return null;
  }

  getDistributorInventory() {
    const data = this.getData();
    return data ? data.distributors.inventory : [];
  }

  updateDistributorInventory(inventoryId, updates) {
    const data = this.getData();
    if (data) {
      const inventoryIndex = data.distributors.inventory.findIndex(i => i.id === inventoryId);
      if (inventoryIndex !== -1) {
        data.distributors.inventory[inventoryIndex] = { ...data.distributors.inventory[inventoryIndex], ...updates };
        data.distributors.lastUpdated = new Date().toISOString();
        this.saveData(data);
        this.logSync('Distributor inventory updated', { inventoryId, updates });
        return data.distributors.inventory[inventoryIndex];
      }
    }
    return null;
  }

  // Order operations
  createOrder(order) {
    const data = this.getData();
    if (data) {
      order.id = this.generateId();
      order.createdAt = new Date().toISOString();
      order.status = 'Pending';
      
      if (order.type === 'farmerToDistributor') {
        if (!data.orders.farmerToDistributor) data.orders.farmerToDistributor = [];
        data.orders.farmerToDistributor.unshift(order);
      } else if (order.type === 'distributorToRetailer') {
        if (!data.orders.distributorToRetailer) data.orders.distributorToRetailer = [];
        data.orders.distributorToRetailer.unshift(order);
      }
      
      data.orders.lastUpdated = new Date().toISOString();
      this.saveData(data);
      this.logSync('Order created', order);
      return order;
    }
    return null;
  }

  getOrders(type = 'all') {
    const data = this.getData();
    if (!data) return [];
    
    if (type === 'farmerToDistributor') {
      return data.orders.farmerToDistributor || [];
    } else if (type === 'distributorToRetailer') {
      return data.orders.distributorToRetailer || [];
    }
    
    return [...(data.orders.farmerToDistributor || []), ...(data.orders.distributorToRetailer || [])];
  }

  // Cross-dashboard sync operations
  syncFarmerBatchToDistributor(batchId, distributorId, quantity) {
    const data = this.getData();
    if (data) {
      const batch = data.farmers.batches.find(b => b.id === batchId);
      if (batch) {
        // Update farmer batch quantity
        const remainingQuantity = parseFloat(batch.totalQuantity) - parseFloat(quantity);
        this.updateFarmerBatch(batchId, {
          totalQuantity: remainingQuantity.toString(),
          status: remainingQuantity <= 0 ? 'Sold' : 'Available'
        });

        // Create distributor inventory item
        const inventoryItem = {
          productName: batch.cropName,
          variety: batch.variety,
          quantity: quantity,
          unit: batch.unit,
          purchasePrice: batch.pricePerUnit,
          sellingPrice: (parseFloat(batch.pricePerUnit) * 1.2).toFixed(2), // 20% markup
          supplier: batch.farmName || 'Farm Supplier',
          category: 'General',
          description: batch.description || '',
          status: 'In Stock',
          batchId: batchId,
          distributorId: distributorId
        };

        this.addDistributorInventory(inventoryItem);

        // Create order record
        this.createOrder({
          type: 'farmerToDistributor',
          from: 'Farmer',
          to: 'Distributor',
          product: batch.cropName,
          quantity: quantity,
          unit: batch.unit,
          price: batch.pricePerUnit,
          totalAmount: (parseFloat(quantity) * parseFloat(batch.pricePerUnit)).toFixed(2),
          status: 'Completed'
        });

        return inventoryItem;
      }
    }
    return null;
  }

  syncDistributorInventoryToRetailer(inventoryId, retailerId, quantity) {
    const data = this.getData();
    if (data) {
      const inventory = data.distributors.inventory.find(i => i.id === inventoryId);
      if (inventory) {
        // Update distributor inventory quantity
        const remainingQuantity = parseFloat(inventory.quantity) - parseFloat(quantity);
        this.updateDistributorInventory(inventoryId, {
          quantity: remainingQuantity.toString(),
          status: remainingQuantity <= 0 ? 'Sold' : 'In Stock'
        });

        // Create retailer stock item
        const stockItem = {
          productName: inventory.productName,
          variety: inventory.variety,
          quantity: quantity,
          unit: inventory.unit,
          purchasePrice: inventory.sellingPrice, // Distributor's selling price becomes retailer's purchase price
          sellingPrice: (parseFloat(inventory.sellingPrice) * 1.3).toFixed(2), // 30% markup
          supplier: inventory.supplier,
          category: inventory.category || 'General',
          description: inventory.description || '',
          status: 'In Stock',
          inventoryId: inventoryId,
          retailerId: retailerId
        };

        this.addRetailerStock(stockItem);

        // Create order record
        this.createOrder({
          type: 'distributorToRetailer',
          from: 'Distributor',
          to: 'Retailer',
          product: inventory.productName,
          quantity: quantity,
          unit: inventory.unit,
          price: inventory.sellingPrice,
          totalAmount: (parseFloat(quantity) * parseFloat(inventory.sellingPrice)).toFixed(2),
          status: 'Completed'
        });

        return stockItem;
      }
    }
    return null;
  }

  // Utility functions
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  logSync(action, data) {
    const dataSync = this.getData();
    if (dataSync) {
      dataSync.syncHistory.unshift({
        action,
        timestamp: new Date().toISOString(),
        data: typeof data === 'object' ? JSON.stringify(data) : data
      });
      
      // Keep only last 100 sync logs
      if (dataSync.syncHistory.length > 100) {
        dataSync.syncHistory = dataSync.syncHistory.slice(0, 100);
      }
      
      this.saveData(dataSync);
    }
  }

  // Export data for backup
  exportData() {
    const data = this.getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agriculture-platform-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Import data from backup
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.saveData(data);
          this.logSync('Data imported from backup', { fileName: file.name });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // Get sync statistics
  getSyncStats() {
    const data = this.getData();
    if (!data) return null;

    return {
      totalFarmerBatches: data.farmers.batches.length,
      totalRetailerStock: data.retailers.stock.length,
      totalDistributorInventory: data.distributors.inventory.length,
      totalOrders: data.orders.farmerToRetailer.length + data.orders.retailerToDistributor.length,
      lastSync: data.syncHistory[0]?.timestamp || 'Never',
      syncHistoryCount: data.syncHistory.length
    };
  }

  // Clear all data (for testing)
  clearAllData() {
    localStorage.removeItem(this.storageKey);
    this.initializeData();
    this.logSync('All data cleared', {});
  }
}

// Create singleton instance
const dataSyncService = new DataSyncService();

export default dataSyncService;
