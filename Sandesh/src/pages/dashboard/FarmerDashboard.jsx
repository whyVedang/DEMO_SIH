import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  AlertCircle
} from "lucide-react";
import { BatchForm } from "@/components/BatchForm";
import { ProfileForm } from "@/components/ProfileForm";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  // Mock data - more realistic for farmers
  const stats = {
    totalBatches: 8,
    activeOrders: 3,
    rating: 4.2,
    earnings: 12500
  };

  const recentBatches = [
    { 
      id: 1, 
      crop: "टमाटर (Tomatoes)", 
      quantity: "50 किलो", 
      status: "Available", 
      price: "₹40/किलो", 
      date: "आज (Today)",
      quality: "A+",
      location: "खेत नंबर 1"
    },
    { 
      id: 2, 
      crop: "प्याज (Onions)", 
      quantity: "100 किलो", 
      status: "Sold", 
      price: "₹25/किलो", 
      date: "कल (Yesterday)",
      quality: "A",
      location: "खेत नंबर 2"
    },
    { 
      id: 3, 
      crop: "आलू (Potatoes)", 
      quantity: "75 किलो", 
      status: "Low Stock", 
      price: "₹30/किलो", 
      date: "2 दिन पहले",
      quality: "B+",
      location: "खेत नंबर 1"
    },
  ];

  const recentOrders = [
    { 
      id: 1, 
      buyer: "राम सब्जी मंडी", 
      crop: "टमाटर", 
      quantity: "20 किलो", 
      amount: "₹800", 
      status: "Confirmed",
      date: "आज",
      phone: "+91 98765 43210"
    },
    { 
      id: 2, 
      buyer: "ग्रीन स्टोर", 
      crop: "प्याज", 
      quantity: "50 किलो", 
      amount: "₹1,250", 
      status: "Pending",
      date: "कल",
      phone: "+91 98765 43211"
    },
    { 
      id: 3, 
      buyer: "सिटी मार्केट", 
      crop: "आलू", 
      quantity: "30 किलो", 
      amount: "₹900", 
      status: "Delivered",
      date: "3 दिन पहले",
      phone: "+91 98765 43212"
    },
  ];

  const quickActions = [
    { label: "नई फसल जोड़ें", icon: Plus, action: "addBatch", color: "bg-green-500" },
    { label: "सभी ऑर्डर देखें", icon: Eye, action: "viewOrders", color: "bg-blue-500" },
    { label: "कटाई का समय", icon: Calendar, action: "scheduleHarvest", color: "bg-orange-500" },
    { label: "प्रोफाइल बनाएं", icon: User, action: "editProfile", color: "bg-purple-500" }
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

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              वापस जाएं
            </Button>
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-sage-600" />
              <span className="text-lg font-semibold text-gray-900">किसान डैशबोर्ड</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => setShowProfileForm(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              प्रोफाइल
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
            >
              लॉगआउट
            </Button>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Welcome Message */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">नमस्ते! आपका स्वागत है</h1>
            <p className="text-gray-600">अपनी फसलों को बेचें और पैसा कमाएं</p>
          </div>

          {/* Stats Overview - Simple Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
            <Card className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <Crop className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalBatches}</div>
              <div className="text-sm text-gray-600">कुल फसलें</div>
            </Card>

            <Card className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.activeOrders}</div>
              <div className="text-sm text-gray-600">सक्रिय ऑर्डर</div>
            </Card>

            <Card className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.rating}</div>
              <div className="text-sm text-gray-600">रेटिंग</div>
            </Card>

            <Card className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">₹{stats.earnings.toLocaleString()}</div>
              <div className="text-sm text-gray-600">कमाई</div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Leaf className="w-5 h-5 text-sage-600" />
                त्वरित कार्य
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">अवलोकन</TabsTrigger>
              <TabsTrigger value="batches">मेरी फसलें</TabsTrigger>
              <TabsTrigger value="orders">ऑर्डर</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">हाल की गतिविधि</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">नया ऑर्डर मिला</p>
                          <p className="text-xs text-gray-600">राम सब्जी मंडी - 20 किलो टमाटर</p>
                        </div>
                        <span className="text-xs text-gray-600">2 घंटे पहले</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">फसल स्थिति अपडेट</p>
                          <p className="text-xs text-gray-600">आलू - कम स्टॉक</p>
                        </div>
                        <span className="text-xs text-gray-600">5 घंटे पहले</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">नई रेटिंग मिली</p>
                          <p className="text-xs text-gray-600">5 सितारे सिटी मार्केट से</p>
                        </div>
                        <span className="text-xs text-gray-600">1 दिन पहले</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips for Farmers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">किसान सुझाव</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>टिप:</strong> अपनी फसलों की तस्वीरें लें - बेहतर दाम मिलेगा
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>सुझाव:</strong> नियमित रूप से कीमत अपडेट करते रहें
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>याद रखें:</strong> ग्राहकों से अच्छा व्यवहार करें
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="batches" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">मेरी फसलें</h3>
                <Button 
                  onClick={() => setShowBatchForm(true)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  नई फसल जोड़ें
                </Button>
              </div>

              <div className="grid gap-4">
                {recentBatches.map((batch) => (
                  <Card key={batch.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 font-semibold text-gray-900 text-lg">{batch.crop}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div>मात्रा: {batch.quantity}</div>
                            <div>कीमत: {batch.price}</div>
                            <div>गुणवत्ता: {batch.quality}</div>
                            <div>स्थान: {batch.location}</div>
                          </div>
                          <div className="text-xs text-gray-500">जोड़ा गया: {batch.date}</div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(batch.status)} flex items-center gap-1`}>
                            {getStatusIcon(batch.status)}
                            {batch.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            संपादित करें
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">हाल के ऑर्डर</h3>
              
              <div className="grid gap-4">
                {recentOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="mb-2 font-semibold text-gray-900 text-lg">{order.buyer}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <div>फसल: {order.crop}</div>
                            <div>मात्रा: {order.quantity}</div>
                            <div>राशि: {order.amount}</div>
                            <div>दिनांक: {order.date}</div>
                          </div>
                          <div className="text-xs text-gray-500">फोन: {order.phone}</div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            कॉल करें
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
