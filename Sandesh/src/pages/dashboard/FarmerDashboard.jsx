import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  Star, 
  User, 
  Plus, 
  Eye,
  Calendar,
  TrendingUp,
  Leaf,
  ArrowLeft,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle,
  Crop,
  IndianRupee
} from "lucide-react";
import { BatchForm } from "@/components/BatchForm";
import { ProfileForm } from "@/components/ProfileForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage(); // Add language here
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const handleLogout = () => {
    logout();
  };

  // Mock data - more realistic for farmers
  const stats = {
    totalBatches: 8,
    activeOrders: 3,
    rating: 4.2,
    earnings: 12500
  };

  // Language-aware batch data
  const getBatchData = () => {
    const baseData = [
      { 
        id: 1, 
        crop: {
          en: "Tomatoes",
          hi: "टमाटर"
        },
        quantity: `50 ${t('kgUnit')}`, 
        status: "Available", 
        price: `₹40${t('perKg')}`, 
        date: t('today'),
        quality: "A+",
        location: t('fieldNumber1')
      },
      { 
        id: 2, 
        crop: {
          en: "Onions", 
          hi: "प्याज"
        },
        quantity: `100 ${t('kgUnit')}`, 
        status: "Sold", 
        price: `₹25${t('perKg')}`, 
        date: t('yesterday'),
        quality: "A",
        location: t('fieldNumber2')
      },
      { 
        id: 3, 
        crop: {
          en: "Potatoes",
          hi: "आलू"
        },
        quantity: `75 ${t('kgUnit')}`, 
        status: "Low Stock", 
        price: `₹30${t('perKg')}`, 
        date: t('twoDaysAgo'),
        quality: "B+",
        location: t('fieldNumber1')
      },
    ];

    return baseData.map(batch => ({
      ...batch,
      crop: batch.crop[language] || batch.crop.en
    }));
  };

  // Language-aware orders data
  const getOrdersData = () => {
    const baseData = [
      { 
        id: 1, 
        buyer: {
          en: "Ram Vegetable Market",
          hi: "राम सब्जी मंडी"
        },
        crop: {
          en: "Tomatoes",
          hi: "टमाटर"
        },
        quantity: `20 ${t('kgUnit')}`, 
        amount: "₹800", 
        status: "Confirmed",
        date: t('today'),
        phone: "+91 98765 43210"
      },
      { 
        id: 2, 
        buyer: {
          en: "Green Store",
          hi: "ग्रीन स्टोर"
        },
        crop: {
          en: "Onions",
          hi: "प्याज"
        },
        quantity: `50 ${t('kgUnit')}`, 
        amount: "₹1,250", 
        status: "Pending",
        date: t('yesterday'),
        phone: "+91 98765 43211"
      },
      { 
        id: 3, 
        buyer: {
          en: "City Market",
          hi: "सिटी मार्केट"
        },
        crop: {
          en: "Potatoes",
          hi: "आलू"
        },
        quantity: `30 ${t('kgUnit')}`, 
        amount: "₹900", 
        status: "Delivered",
        date: t('threeDaysAgo'),
        phone: "+91 98765 43212"
      },
    ];

    return baseData.map(order => ({
      ...order,
      buyer: order.buyer[language] || order.buyer.en,
      crop: order.crop[language] || order.crop.en
    }));
  };

  const recentBatches = getBatchData();
  const recentOrders = getOrdersData();

  const quickActions = [
    { label: t('addNewCrop'), icon: Plus, action: "addBatch", color: "bg-green-500" },
    { label: t('viewAllOrders'), icon: Eye, action: "viewOrders", color: "bg-blue-500" },
    { label: t('harvestTime'), icon: Calendar, action: "scheduleHarvest", color: "bg-orange-500" },
    { label: t('createProfile'), icon: User, action: "editProfile", color: "bg-purple-500" }
  ];

  if (showBatchForm) {
    return <BatchForm onBack={() => setShowBatchForm(false)} entityType="farmer" />;
  }

  if (showProfileForm) {
    return <ProfileForm onBack={() => setShowProfileForm(false)} entityType="farmer" />;
  }

  const handleQuickAction = (action) => {
    switch (action) {
      case "addBatch":
        setShowBatchForm(true);
        break;
      case "viewOrders":
        setActiveTab("orders");
        break;
      case "editProfile":
        setShowProfileForm(true);
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Delivered': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return <CheckCircle className="w-4 h-4" />;
      case 'Sold': return <CheckCircle className="w-4 h-4" />;
      case 'Low Stock': return <AlertCircle className="w-4 h-4" />;
      case 'Confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Available': return t('available');
      case 'Sold': return t('sold');
      case 'Low Stock': return t('lowStock');
      case 'Confirmed': return t('confirmed');
      case 'Pending': return t('pending');
      case 'Delivered': return t('delivered');
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('farmerDashboard')}</h1>
              <p className="text-gray-600">{t('manageFarm')}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <LanguageSwitcher />
              <Button
                onClick={() => setShowProfileForm(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
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
                <CardTitle className="text-sm font-medium text-gray-600">{t('totalCrops')}</CardTitle>
                <Crop className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.totalBatches}</div>
                <p className="text-xs text-green-600">+2 {t('thisWeek')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('activeOrders')}</CardTitle>
                <ShoppingCart className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.activeOrders}</div>
                <p className="text-xs text-green-600">+1 {t('newText')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('rating')}</CardTitle>
                <Star className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.rating}</div>
                <p className="text-xs text-green-600">{t('excellent')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('earnings')}</CardTitle>
                <IndianRupee className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">₹{stats.earnings.toLocaleString()}</div>
                <p className="text-xs text-green-600">+8% {t('fromLastMonth')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Leaf className="w-5 h-5 text-green-600" />
                {t('quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className={`p-4 rounded-lg text-white ${action.color} hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <action.icon className="w-6 h-6" />
                      <span className="text-sm font-medium text-center">{action.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                {t('overview')}
              </TabsTrigger>
              <TabsTrigger value="batches" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                {t('myCrops')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                {t('orders')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">{t('recentActivity')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{t('newOrderReceived')}</p>
                          <p className="text-xs text-gray-600">{t('ramVegetableMarket')} - 20 {t('kgUnit')} {t('tomatoes')}</p>
                        </div>
                        <span className="text-xs text-gray-600">2 {t('hoursAgo')}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{t('cropStatusUpdate')}</p>
                          <p className="text-xs text-gray-600">{t('potatoes')} - {t('lowStock')}</p>
                        </div>
                        <span className="text-xs text-gray-600">5 {t('hoursAgo')}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{t('newRatingReceived')}</p>
                          <p className="text-xs text-gray-600">{t('fiveStars')} {t('cityMarket')}</p>
                        </div>
                        <span className="text-xs text-gray-600">1 {t('dayAgo')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips for Farmers */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">{t('farmerTips')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-green-50">
                        <p className="text-sm text-green-800">
                          <strong>{t('tipLabel')}</strong> {t('takeCropPhotos')}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50">
                        <p className="text-sm text-blue-800">
                          <strong>{t('suggestionLabel')}</strong> {t('updatePricesRegularly')}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-yellow-50">
                        <p className="text-sm text-yellow-800">
                          <strong>{t('rememberLabel')}</strong> {t('treatCustomersWell')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="batches" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{t('myCrops')}</h3>
                <Button 
                  onClick={() => setShowBatchForm(true)}
                  className="text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addNewCrop')}
                </Button>
              </div>

              <div className="grid gap-4">
                {recentBatches.map((batch) => (
                  <Card key={batch.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{batch.crop}</h4>
                          <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                            <div>{t('quantity')}: {batch.quantity}</div>
                            <div>{t('price')}: {batch.price}</div>
                            <div>{t('quality')}: {batch.quality}</div>
                            <div>{t('location')}: {batch.location}</div>
                          </div>
                          <div className="text-xs text-gray-500">{t('addedOn')}: {batch.date}</div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(batch.status)} flex items-center gap-1`}>
                            {getStatusIcon(batch.status)}
                            {getStatusText(batch.status)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {t('edit')}
                          </Button>
                        </div>
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
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{order.buyer}</h4>
                          <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
                            <div>{t('crop')}: {order.crop}</div>
                            <div>{t('quantity')}: {order.quantity}</div>
                            <div>{t('amount')}: {order.amount}</div>
                            <div>{t('date')}: {order.date}</div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Phone className="w-3 h-3" />
                            {order.phone}
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
