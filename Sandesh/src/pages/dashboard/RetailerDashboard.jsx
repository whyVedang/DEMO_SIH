import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Store, Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Calendar, IndianRupee, ArrowLeft,
  User as UserIcon, Star, Phone, CheckCircle, Clock, AlertCircle
} from "lucide-react";
import { ProfileForm } from "@/components/ProfileForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [showProfileForm, setShowProfileForm] = useState(false);

  const handleLogout = () => {
    logout();
  };

  // Mock Data for Retailer Dashboard
  const retailerStats = {
    totalProducts: 45,
    activeOrders: 8,
    totalCustomers: 156,
    thisMonthSales: 85000,
  };

  // Language-aware product data
  const getProductsData = () => {
    const baseData = [
      {
        id: 1,
        name: {
          en: "Organic Tomatoes",
          hi: "जैविक टमाटर"
        },
        quantity: `50 ${t('kg')}`,
        status: "In Stock",
        price: `₹60${t('perKg')}`,
        category: {
          en: "Vegetables",
          hi: "सब्जियां"
        },
        supplier: {
          en: "Green Valley Farm",
          hi: "ग्रीन वैली फार्म"
        }
      },
      {
        id: 2,
        name: {
          en: "Cold-Pressed Coconut Oil",
          hi: "कोल्ड-प्रेस्ड नारियल तेल"
        },
        quantity: `25 ${t('liters')}`,
        status: "Low Stock",
        price: `₹450${t('perLiter')}`,
        category: {
          en: "Oils",
          hi: "तेल"
        },
        supplier: {
          en: "Pure Harvest",
          hi: "प्योर हार्वेस्ट"
        }
      },
      {
        id: 3,
        name: {
          en: "Himalayan Pink Salt",
          hi: "हिमालयन गुलाबी नमक"
        },
        quantity: `15 ${t('kg')}`,
        status: "In Stock",
        price: `₹320${t('perKg')}`,
        category: {
          en: "Spices",
          hi: "मसाले"
        },
        supplier: {
          en: "Pure Minerals",
          hi: "प्योर मिनरल्स"
        }
      }
    ];

    return baseData.map(product => ({
      ...product,
      name: product.name[currentLanguage] || product.name.en,
      category: product.category[currentLanguage] || product.category.en,
      supplier: product.supplier[currentLanguage] || product.supplier.en
    }));
  };

  // Language-aware orders data
  const getOrdersData = () => {
    const baseData = [
      {
        id: 1,
        customer: {
          en: "Ram Kumar",
          hi: "राम कुमार"
        },
        product: {
          en: "Organic Tomatoes",
          hi: "जैविक टमाटर"
        },
        quantity: `2 ${t('kg')}`,
        amount: "₹120",
        status: "Completed",
        contact: "9876543210"
      },
      {
        id: 2,
        customer: {
          en: "Sita Devi",
          hi: "सीता देवी"
        },
        product: {
          en: "Coconut Oil",
          hi: "नारियल तेल"
        },
        quantity: `1 ${t('liters')}`,
        amount: "₹450",
        status: "Processing",
        contact: "8765432109"
      },
      {
        id: 3,
        customer: {
          en: "Amit Sharma",
          hi: "अमित शर्मा"
        },
        product: {
          en: "Pink Salt",
          hi: "गुलाबी नमक"
        },
        quantity: `500 ${t('grams')}`,
        amount: "₹160",
        status: "Completed",
        contact: "7654321098"
      }
    ];

    return baseData.map(order => ({
      ...order,
      customer: order.customer[currentLanguage] || order.customer.en,
      product: order.product[currentLanguage] || order.product.en
    }));
  };

  // Language-aware customers data
  const getCustomersData = () => {
    const baseData = [
      {
        id: 1,
        name: {
          en: "Ram Kumar",
          hi: "राम कुमार"
        },
        orders: 15,
        totalSpent: "₹12,500",
        rating: 5
      },
      {
        id: 2,
        name: {
          en: "Sita Devi",
          hi: "सीता देवी"
        },
        orders: 12,
        totalSpent: "₹9,800",
        rating: 4
      },
      {
        id: 3,
        name: {
          en: "Amit Sharma",
          hi: "अमित शर्मा"
        },
        orders: 8,
        totalSpent: "₹6,200",
        rating: 5
      }
    ];

    return baseData.map(customer => ({
      ...customer,
      name: customer.name[currentLanguage] || customer.name.en
    }));
  };

  const currentProducts = getProductsData();
  const recentOrders = getOrdersData();
  const topCustomers = getCustomersData();

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

  const getStatusText = (status) => {
    switch (status) {
      case 'In Stock': return t('inStock');
      case 'Low Stock': return t('lowStock');
      case 'Out of Stock': return t('outOfStock');
      case 'Completed': return t('completed');
      case 'Processing': return t('processing');
      case 'Pending': return t('pending');
      default: return status;
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
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('retailerDashboard')}</h1>
              <p className="text-gray-600">{t('manageStore')}</p>
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
                <p className="text-xs text-purple-600">{t('threeThisWeek')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('activeOrders')}</CardTitle>
                <ShoppingCart className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{retailerStats.activeOrders}</div>
                <p className="text-xs text-purple-600">{t('twoNew')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('totalCustomers')}</CardTitle>
                <Users className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{retailerStats.totalCustomers}</div>
                <p className="text-xs text-purple-600">{t('eightNew')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{t('thisMonthSales')}</CardTitle>
                <IndianRupee className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">₹{retailerStats.thisMonthSales.toLocaleString()}</div>
                <p className="text-xs text-purple-600">{t('fifteenPercentIncrease')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
              <TabsTrigger value="products" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                {t('myProducts')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                {t('orders')}
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                {t('customers')}
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
                {t('sales')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{t('myProducts')}</h3>
                <Button className="text-white bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addNewProduct')}
                </Button>
              </div>

              <div className="grid gap-4">
                {currentProducts.map((product) => (
                  <Card key={product.id} className="transition-shadow bg-white border border-gray-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{product.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>{t('quantity')}: {product.quantity}</div>
                            <div>{t('price')}: {product.price}</div>
                            <div>{t('category')}: {product.category}</div>
                            <div>{t('supplier')}: {product.supplier}</div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(product.status)} flex items-center gap-1`}>
                                {getStatusIcon(product.status)}
                                {getStatusText(product.status)}
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
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">{order.customer}</h4>
                          <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
                            <div>{t('product')}: {order.product}</div>
                            <div>{t('quantity')}: {order.quantity}</div>
                            <div>{t('amount')}: {order.amount}</div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {t('contact')}: {order.contact}
                            </div>
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
                            <div>{t('totalSpent')}: {customer.totalSpent}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{customer.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {t('viewDetails')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('salesOverview')}</h3>
              <div className="py-12 text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>{t('customerInfo')}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;