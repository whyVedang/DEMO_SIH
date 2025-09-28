import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Truck, Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Calendar, IndianRupee, ArrowLeft,
  Warehouse, Clock, User as UserIcon, CheckCircle, AlertCircle, MapPin
} from "lucide-react";
import { ProfileForm } from "@/components/ProfileForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const DistributorDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("inventory");
  const [showProfileForm, setShowProfileForm] = useState(false);

  const handleLogout = () => {
    logout();
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
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('distributorDashboard')}</h1>
              <p className="text-gray-600">{t('manageDistribution')}</p>
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
            <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
              <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                {t('myStock')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                {t('orders')}
              </TabsTrigger>
              <TabsTrigger value="logistics" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
                {t('logistics')}
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                {t('network')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{t('myStock')}</h3>
                <Button className="text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addNewStock')}
                </Button>
              </div>

              <div className="grid gap-4">
                {currentInventory.map((item) => (
                  <Card key={item.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{item.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>{t('quantity')}: {item.quantity}</div>
                            <div>Supplier: {item.supplier}</div>
                            <div>Last Updated: {item.lastUpdated}</div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                                {getStatusIcon(item.status)}
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {t('edit')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

            <TabsContent value="logistics" className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('activeDeliveries')}</h3>
              <div className="grid gap-4">
                {activeDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{delivery.route}</h4>
                          <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
                            <div>Driver: {delivery.driver}</div>
                            <div>Vehicle: {delivery.vehicle}</div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              ETA: {delivery.eta}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(delivery.status)} flex items-center gap-1`}>
                            {getStatusIcon(delivery.status)}
                            {delivery.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Track Live
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-6">
              <div className="py-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-300" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{t('retailerNetwork')}</h3>
                <p className="mb-6 text-gray-600">{t('retailerNetworkDesc')}</p>
                <Button className="text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Retailer
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;