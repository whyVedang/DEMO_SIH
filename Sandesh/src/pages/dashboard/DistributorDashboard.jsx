import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Truck, Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Calendar, IndianRupee, ArrowLeft,
  Warehouse, Clock, User as UserIcon, CheckCircle, AlertCircle, MapPin
} from "lucide-react";
import { ProfileForm } from "@/components/ProfileForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import dataSyncService from "@/services/dataSyncService";

const DistributorDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("inventory");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showBuyFromFarmersModal, setShowBuyFromFarmersModal] = useState(false);
  const [distributorInventory, setDistributorInventory] = useState([]);
  const [availableRetailerStock, setAvailableRetailerStock] = useState([]);
  const [selectedFarmerBatch, setSelectedFarmerBatch] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [newStockForm, setNewStockForm] = useState({
    productName: '',
    variety: '',
    quantity: '',
    unit: '',
    purchasePrice: '',
    sellingPrice: '',
    supplier: '',
    category: '',
    description: ''
  });

  const handleLogout = () => {
    logout();
  };

  // Load distributor inventory
  useEffect(() => {
    loadDistributorInventory();
    loadAvailableFarmerBatches();
  }, []);

  const loadDistributorInventory = () => {
    const inventory = dataSyncService.getDistributorInventory();
    setDistributorInventory(inventory);
  };

  const loadAvailableFarmerBatches = () => {
    const farmerBatches = dataSyncService.getFarmerBatches();
    // Filter only available batches
    const availableBatches = farmerBatches.filter(batch => batch.status === 'Available');
    setAvailableRetailerStock(availableBatches);
  };

  const handleInputChange = (field, value) => {
    setNewStockForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setNewStockForm({
      productName: '',
      variety: '',
      quantity: '',
      unit: '',
      purchasePrice: '',
      sellingPrice: '',
      supplier: '',
      category: '',
      description: ''
    });
  };

  const handleAddStock = () => {
    if (!newStockForm.productName || !newStockForm.quantity || !newStockForm.purchasePrice) {
      toast({
        title: "Error!",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new inventory item
    const newInventoryItem = {
      ...newStockForm,
      status: 'In Stock',
      dateAdded: new Date().toLocaleDateString(),
      lastUpdated: new Date().toLocaleDateString(),
      totalValue: (parseFloat(newStockForm.quantity) * parseFloat(newStockForm.purchasePrice)).toFixed(2)
    };

    // Add to distributor inventory using data sync service
    const addedItem = dataSyncService.addDistributorInventory(newInventoryItem);

    toast({
      title: "Stock Added Successfully!",
      description: `Added ${newStockForm.quantity} ${newStockForm.unit} of ${newStockForm.productName} to inventory.`,
    });

    // Reset form and reload data
    resetForm();
    setShowAddStockModal(false);
    loadDistributorInventory();
  };

  const handleBuyFromFarmers = () => {
    if (!selectedFarmerBatch || !purchaseQuantity) {
      toast({
        title: "Error!",
        description: "Please select a batch and enter quantity.",
        variant: "destructive"
      });
      return;
    }

    // Use data sync service to handle the transaction
    const newInventoryItem = dataSyncService.syncFarmerBatchToDistributor(
      selectedFarmerBatch.id,
      user?.id || 'distributor-1',
      purchaseQuantity
    );

    toast({
      title: "Stock Purchased Successfully!",
      description: `Added ${purchaseQuantity} ${selectedFarmerBatch.unit} of ${selectedFarmerBatch.cropName} to your inventory.`,
    });

    setSelectedFarmerBatch(null);
    setPurchaseQuantity('');
    setShowBuyFromFarmersModal(false);
    loadDistributorInventory();
    loadAvailableFarmerBatches();
  };

  // Mock Data for Distributor Dashboard
  const distributorStats = {
    totalInventory: 8500,
    activeDeliveries: 12,
    retailersServed: 35,
    thisMonthRevenue: 1200000,
  };

  const currentInventory = [
    { id: 1, name: "ऑर्गेनिक टमाटर (Organic Tomatoes)", quantity: "1500 किलो", status: "In Stock", supplier: "ग्रीन वैली फार्म", lastUpdated: "2024-09-25" },
    { id: 2, name: "कोल्ड-प्रेस्ड नारियल तेल (Cold-Pressed Coconut Oil)", quantity: "500 लीटर", status: "Low Stock", supplier: "प्योर हार्वेस्ट", lastUpdated: "2024-09-24" },
    { id: 3, name: "हिमालयन गुलाबी नमक (Himalayan Pink Salt)", quantity: "200 किलो", status: "In Stock", supplier: "प्योर मिनरल्स", lastUpdated: "2024-09-23" },
  ];

  const recentOrders = [
    { id: 1, retailer: "सिटी मार्ट (City Mart)", product: "ऑर्गेनिक टमाटर", quantity: "200 किलो", amount: "₹8,000", status: "Processing", deliveryDate: "2024-09-28" },
    { id: 2, retailer: "सुपर बाज़ार (Super Bazaar)", product: "नारियल तेल", quantity: "50 लीटर", amount: "₹22,500", status: "Shipped", deliveryDate: "2024-09-27" },
    { id: 3, retailer: "स्थानीय किराना (Local Grocery)", product: "गुलाबी नमक", quantity: "20 किलो", amount: "₹6,400", status: "Delivered", deliveryDate: "2024-09-26" },
  ];

  const activeDeliveries = [
    { id: 1, route: "रूट A (Route A)", driver: "अमित कुमार (Amit Kumar)", status: "In Transit", eta: "2 घंटे", vehicle: "DL12AB3456" },
    { id: 2, route: "रूट B (Route B)", driver: "सुनील वर्मा (Sunil Verma)", status: "Scheduled", eta: "कल सुबह", vehicle: "UP78CD9012" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock': return <CheckCircle className="w-4 h-4" />;
      case 'Low Stock': return <AlertCircle className="w-4 h-4" />;
      case 'Out of Stock': return <AlertCircle className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Scheduled': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (showProfileForm) {
    return <ProfileForm onBack={() => setShowProfileForm(false)} entityType="distributor" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="logo-section">
                {/* Logo */}
                <div className="logo-icon">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="logo-text">{t('logoText')}</div>
                  <div className="logo-tagline">{t('logoDesc')}</div>
                </div>
              </div>
            </div>

            {/* Dashboard Title - Centered */}
            <div className="flex-1 mb-4 text-center md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{t('distributorDashboard')}</h1>
              <p className="text-sm text-gray-600">{t('manageDistribution')}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <LanguageSwitcher />
              <Button
                onClick={() => setShowProfileForm(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                {t('editProfile')}
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
              >
                {t('logout')}
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('totalInventory')}</CardTitle>
                <Warehouse className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{distributorStats.totalInventory.toLocaleString()}</div>
                <p className="text-xs text-blue-600">+150 this week</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('activeDeliveries')}</CardTitle>
                <Truck className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{distributorStats.activeDeliveries}</div>
                <p className="text-xs text-blue-600">+2 new</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('retailersServed')}</CardTitle>
                <Users className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{distributorStats.retailersServed}</div>
                <p className="text-xs text-blue-600">+5 new partnerships</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('thisMonthRevenue')}</CardTitle>
                <IndianRupee className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">₹{distributorStats.thisMonthRevenue.toLocaleString()}</div>
                <p className="text-xs text-blue-600">+12% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
              <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                {t('myStock')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                {t('orders')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{t('myStock')}</h3>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowBuyFromFarmersModal(true)}
                    className="text-white bg-green-600 hover:bg-green-700"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Buy from Farmers
                  </Button>
                  </div>
              </div>

              {/* Buy from Farmers Modal */}
              <Dialog open={showBuyFromFarmersModal} onOpenChange={setShowBuyFromFarmersModal}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Buy Stock from Farmers</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Available Farmer Batches</Label>
                      <Select value={selectedFarmerBatch?.id || ''} onValueChange={(value) => {
                        const batch = availableRetailerStock.find(b => b.id === value);
                        setSelectedFarmerBatch(batch);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a farmer batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRetailerStock.map((batch) => (
                            <SelectItem key={batch.id} value={batch.id}>
                              {batch.cropName} - {batch.totalQuantity} {batch.unit} - ₹{batch.pricePerUnit}/{batch.unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedFarmerBatch && (
                      <div className="p-4 space-y-4 rounded-lg bg-gray-50">
                        <div className="space-y-2">
                          <Label>Quantity to Purchase</Label>
                          <Input
                            type="number"
                            placeholder="Enter quantity"
                            value={purchaseQuantity}
                            onChange={(e) => setPurchaseQuantity(e.target.value)}
                            max={selectedFarmerBatch.totalQuantity}
                          />
                          <p className="text-xs text-gray-600">
                            Available: {selectedFarmerBatch.totalQuantity} {selectedFarmerBatch.unit}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>Total Cost</Label>
                          <div className="p-2 bg-white border rounded-md">
                            ₹{purchaseQuantity ? (parseFloat(purchaseQuantity) * parseFloat(selectedFarmerBatch.pricePerUnit)).toFixed(2) : '0.00'}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowBuyFromFarmersModal(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleBuyFromFarmers} 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={!selectedFarmerBatch || !purchaseQuantity}
                      >
                        Purchase Stock
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="grid gap-4">
                {/* Display added inventory */}
                {distributorInventory.map((item) => (
                  <Card key={item.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">
                            {item.productName} {item.variety && `(${item.variety})`}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>{t('quantity')}: {item.quantity} {item.unit}</div>
                            <div>Purchase Price: ₹{item.purchasePrice}/{item.unit}</div>
                            <div>Selling Price: ₹{item.sellingPrice}/{item.unit}</div>
                            <div>Supplier: {item.supplier}</div>
                            <div>Category: {item.category}</div>
                            <div>Added: {item.dateAdded}</div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                                {getStatusIcon(item.status)}
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                          {item.description && (
                            <div className="mt-2 text-sm text-gray-600">
                              <strong>Description:</strong> {item.description}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600">
                              Total Value: ₹{item.totalValue}
                            </div>
                            <div className="text-sm text-gray-600">
                              Profit Margin: ₹{(parseFloat(item.sellingPrice) - parseFloat(item.purchasePrice)).toFixed(2)}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {t('edit')}
                        </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {distributorInventory.length === 0 && (
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <Warehouse className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h4 className="mb-2 text-lg font-semibold text-gray-900">No inventory available</h4>
                      <p className="mb-4 text-gray-600">Start by adding stock to your inventory</p>
                      <Button
                        onClick={() => setShowAddStockModal(true)}
                        className="text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Stock
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('recentOrders')}</h3>
              <div className="grid gap-4">
                {recentOrders.map((order) => (
                  <Card key={order.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{order.retailer}</h4>
                          <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
                            <div>Product: {order.product}</div>
                            <div>{t('quantity')}: {order.quantity}</div>
                            <div>{t('amount')}: {order.amount}</div>
                            <div>Delivery: {order.deliveryDate}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Track Order
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;