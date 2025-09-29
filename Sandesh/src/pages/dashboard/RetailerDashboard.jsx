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
import {
  Store, Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Calendar, IndianRupee, ArrowLeft,
  User as UserIcon, Star, Phone, CheckCircle, Clock, AlertCircle, Search
} from "lucide-react";
import { ProfileForm } from "@/components/ProfileForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import dataSyncService from "@/services/dataSyncService";

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showBuyStockModal, setShowBuyStockModal] = useState(false);
  const [retailerStock, setRetailerStock] = useState([]);
  const [availableFarmerBatches, setAvailableFarmerBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState('');

  const handleLogout = () => {
    logout();
  };

  // Load retailer stock and available farmer batches
  useEffect(() => {
    loadRetailerStock();
    loadAvailableDistributorInventory();
  }, []);

  const loadRetailerStock = () => {
    const stock = dataSyncService.getRetailerStock();
    setRetailerStock(stock);
  };

  const loadAvailableDistributorInventory = () => {
    const distributorInventory = dataSyncService.getDistributorInventory();
    // Filter only available inventory
    const availableInventory = distributorInventory.filter(item => item.status === 'In Stock');
    setAvailableFarmerBatches(availableInventory);
  };

  const handleBuyStock = () => {
    if (!selectedBatch || !orderQuantity) {
      toast({
        title: "Error!",
        description: "Please select a batch and enter quantity.",
        variant: "destructive"
      });
      return;
    }

    const quantity = parseFloat(orderQuantity);
    const maxQuantity = parseFloat(selectedBatch.totalQuantity);

    if (quantity > maxQuantity) {
      toast({
        title: "Error!",
        description: `Only ${maxQuantity} ${selectedBatch.unit} available.`,
        variant: "destructive"
      });
      return;
    }

    // Use data sync service to handle the transaction
    const newStockItem = dataSyncService.syncDistributorInventoryToRetailer(
      selectedBatch.id,
      user?.id || 'retailer-1',
      quantity
    );

    toast({
      title: "Stock Purchased Successfully!",
      description: `Added ${quantity} ${selectedBatch.unit} of ${selectedBatch.cropName} to your inventory.`,
    });

    // Reset form and reload data
    setSelectedBatch(null);
    setOrderQuantity('');
    setShowBuyStockModal(false);
    loadRetailerStock();
    loadAvailableFarmerBatches();
  };

  // Stats based on actual data
  const retailerStats = {
    totalProducts: retailerStock.length,
    activeOrders: 8,
    totalCustomers: 156,
    thisMonthSales: 85000,
  };

  const currentProducts = [
    { id: 1, name: "ऑर्गेनिक टमाटर (Organic Tomatoes)", quantity: "50 किलो", status: "In Stock", price: "₹60/किलो", category: "सब्जियां (Vegetables)", supplier: "ग्रीन वैली फार्म" },
    { id: 2, name: "कोल्ड-प्रेस्ड नारियल तेल (Cold-Pressed Coconut Oil)", quantity: "25 लीटर", status: "Low Stock", price: "₹450/लीटर", category: "तेल (Oils)", supplier: "प्योर हार्वेस्ट" },
    { id: 3, name: "हिमालयन गुलाबी नमक (Himalayan Pink Salt)", quantity: "15 किलो", status: "In Stock", price: "₹320/किलो", category: "मसाले (Spices)", supplier: "प्योर मिनरल्स" },
  ];

  const recentOrders = [
    { id: 1, customer: "राम कुमार (Ram Kumar)", product: "ऑर्गेनिक टमाटर", quantity: "2 किलो", amount: "₹120", status: "Completed", contact: "9876543210" },
    { id: 2, customer: "सीता देवी (Sita Devi)", product: "नारियल तेल", quantity: "1 लीटर", amount: "₹450", status: "Processing", contact: "8765432109" },
    { id: 3, customer: "अमित शर्मा (Amit Sharma)", product: "गुलाबी नमक", quantity: "500 ग्राम", amount: "₹160", status: "Completed", contact: "7654321098" },
  ];

  const topCustomers = [
    { id: 1, name: "राम कुमार (Ram Kumar)", orders: 15, totalSpent: "₹12,500", rating: 5 },
    { id: 2, name: "सीता देवी (Sita Devi)", orders: 12, totalSpent: "₹9,800", rating: 4 },
    { id: 3, name: "अमित शर्मा (Amit Sharma)", orders: 8, totalSpent: "₹6,200", rating: 5 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock': return <CheckCircle className="w-4 h-4" />;
      case 'Low Stock': return <AlertCircle className="w-4 h-4" />;
      case 'Out of Stock': return <AlertCircle className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (showProfileForm) {
    return <ProfileForm onBack={() => setShowProfileForm(false)} entityType="retailer" />;
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
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="logo-text">{t('logoText')}</div>
                  <div className="logo-tagline">{t('logoDesc')}</div>
                </div>
              </div>
            </div>

            {/* Dashboard Title - Centered */}
            <div className="flex-1 mb-4 text-center md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{t('retailerDashboard')}</h1>
              <p className="text-sm text-gray-600">{t('manageStore')}</p>
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
                <CardTitle className="text-sm font-medium text-gray-600">{t('totalProducts')}</CardTitle>
                <Package className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{retailerStats.totalProducts}</div>
                <p className="text-xs text-purple-600">+3 this week</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('activeOrders')}</CardTitle>
                <ShoppingCart className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{retailerStats.activeOrders}</div>
                <p className="text-xs text-purple-600">+2 new</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('totalCustomers')}</CardTitle>
                <Users className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{retailerStats.totalCustomers}</div>
                <p className="text-xs text-purple-600">+8 new</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('thisMonthSales')}</CardTitle>
                <IndianRupee className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">₹{retailerStats.thisMonthSales.toLocaleString()}</div>
                <p className="text-xs text-purple-600">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
              <TabsTrigger value="products" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                {t('myProducts')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                {t('orders')}
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                {t('customers')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{t('myProducts')}</h3>
                <div className="flex gap-2">
                  <Dialog open={showBuyStockModal} onOpenChange={setShowBuyStockModal}>
                    <DialogTrigger asChild>
                      <Button className="text-white bg-green-600 hover:bg-green-700">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy New Stock
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Buy Stock from Distributors</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Available Distributor Inventory</Label>
                          <Select value={selectedBatch?.id || ''} onValueChange={(value) => {
                            const batch = availableFarmerBatches.find(b => b.id === value);
                            setSelectedBatch(batch);
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select distributor inventory" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableFarmerBatches.map((batch) => (
                                <SelectItem key={batch.id} value={batch.id}>
                                  {batch.cropName} {batch.variety && `(${batch.variety})`} - 
                                  {batch.totalQuantity} {batch.unit} @ ₹{batch.pricePerUnit}/{batch.unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {selectedBatch && (
                          <div className="p-4 rounded-lg bg-gray-50">
                            <h4 className="mb-2 font-semibold">{selectedBatch.cropName}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div>Available: {selectedBatch.totalQuantity} {selectedBatch.unit}</div>
                              <div>Price: ₹{selectedBatch.pricePerUnit}/{selectedBatch.unit}</div>
                              <div>Min Order: {selectedBatch.minOrderQuantity} {selectedBatch.unit}</div>
                              <div>Harvest Date: {new Date(selectedBatch.harvestDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="orderQuantity">Quantity to Purchase</Label>
                          <Input
                            id="orderQuantity"
                            type="number"
                            placeholder="Enter quantity"
                            value={orderQuantity}
                            onChange={(e) => setOrderQuantity(e.target.value)}
                            max={selectedBatch?.totalQuantity || ''}
                          />
                          {selectedBatch && (
                            <p className="text-xs text-gray-500">
                              Max available: {selectedBatch.totalQuantity} {selectedBatch.unit}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowBuyStockModal(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button onClick={handleBuyStock} className="flex-1 bg-green-600 hover:bg-green-700">
                            Purchase Stock
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                </div>
              </div>

              <div className="grid gap-4">
                {/* Display purchased stock */}
                {retailerStock.map((product) => (
                  <Card key={product.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">
                            {product.productName} {product.variety && `(${product.variety})`}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>{t('quantity')}: {product.quantity} {product.unit}</div>
                            <div>Purchase Price: ₹{product.purchasePrice}/{product.unit}</div>
                            <div>Selling Price: ₹{product.sellingPrice}/{product.unit}</div>
                            <div>Supplier: {product.supplier}</div>
                            <div>Purchase Date: {product.purchaseDate}</div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(product.status)} flex items-center gap-1`}>
                                {getStatusIcon(product.status)}
                                {product.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600">
                              Profit Margin: ₹{(parseFloat(product.sellingPrice) - parseFloat(product.purchasePrice)).toFixed(2)}
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
                
                {retailerStock.length === 0 && (
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h4 className="mb-2 text-lg font-semibold text-gray-900">No stock available</h4>
                      <p className="mb-4 text-gray-600">Start by purchasing stock from farmers</p>
                      <Button
                        onClick={() => setShowBuyStockModal(true)}
                        className="text-white bg-green-600 hover:bg-green-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy First Stock
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
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{order.customer}</h4>
                          <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
                            <div>Product: {order.product}</div>
                            <div>{t('quantity')}: {order.quantity}</div>
                            <div>{t('amount')}: {order.amount}</div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {order.contact}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {t('call')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('myCustomers')}</h3>
              <div className="grid gap-4">
                {topCustomers.map((customer) => (
                  <Card key={customer.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{customer.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>{t('orders')}: {customer.orders}</div>
                            <div>Total Spent: {customer.totalSpent}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{customer.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
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

export default RetailerDashboard;