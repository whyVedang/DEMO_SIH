import { useState } from "react";
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
} from "lucide-react";
import { BatchForm } from "./BatchForm";
import { ProfileForm } from "./ProfileForm";

export const FarmerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  // Mock data
  const stats = {
    totalBatches: 12,
    activeOrders: 5,
    rating: 4.8,
    earnings: 45000
  };

  const recentBatches = [
    { id: 1, crop: "Organic Tomatoes", quantity: "500 kg", status: "Available", price: "₹60/kg", date: "2024-09-20" },
    { id: 2, crop: "Fresh Lettuce", quantity: "200 kg", status: "Sold Out", price: "₹40/kg", date: "2024-09-18" },
    { id: 3, crop: "Sweet Corn", quantity: "300 kg", status: "Low Stock", price: "₹35/kg", date: "2024-09-15" },
  ];

  const recentOrders = [
    { id: 1, buyer: "Fresh Mart", crop: "Organic Tomatoes", quantity: "100 kg", amount: "₹6,000", status: "Confirmed" },
    { id: 2, buyer: "Green Grocers", crop: "Fresh Lettuce", quantity: "50 kg", amount: "₹2,000", status: "Pending" },
    { id: 3, buyer: "City Supermarket", crop: "Sweet Corn", quantity: "150 kg", amount: "₹5,250", status: "Delivered" },
  ];

  if (showBatchForm) {
    return <BatchForm onBack={() => setShowBatchForm(false)} />;
  }

  if (showProfileForm) {
    return <ProfileForm onBack={() => setShowProfileForm(false)} />;
  }

  return (
    <div className="min-h-screen py-6 bg-sage-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
            <p className="text-gray-600">Welcome back, manage your farm operations</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button 
              onClick={() => setShowProfileForm(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </Button>
            <Button 
              onClick={onLogout}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="feature-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Batches</CardTitle>
              <Package className="w-4 h-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalBatches}</div>
              <p className="text-xs text-sage-600">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Orders</CardTitle>
              <ShoppingCart className="w-4 h-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.activeOrders}</div>
              <p className="text-xs text-sage-600">+3 new this week</p>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
              <Star className="w-4 h-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.rating}</div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-sage-500 text-sage-500" />
                  ))}
                </div>
                <span className="ml-2 text-xs text-gray-600">(24 reviews)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month Earnings</CardTitle>
              <TrendingUp className="w-4 h-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₹{stats.earnings.toLocaleString()}</div>
              <p className="text-xs text-sage-600">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="batches">My Batches</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Quick Actions */}
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Leaf className="w-5 h-5 text-sage-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button 
                    onClick={() => setShowBatchForm(true)}
                    className="justify-start w-full btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Batch
                  </button>
                  <Button variant="outline" className="justify-start w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Orders
                  </Button>
                  <Button variant="outline" className="justify-start w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Harvest
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="text-gray-900">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-sage-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New order received</p>
                        <p className="text-xs text-gray-600">Fresh Mart - 100kg Tomatoes</p>
                      </div>
                      <span className="text-xs text-gray-600">2h ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Batch status updated</p>
                        <p className="text-xs text-muted-foreground">Sweet Corn - Low Stock</p>
                      </div>
                      <span className="text-xs text-muted-foreground">5h ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">New rating received</p>
                        <p className="text-xs text-muted-foreground">5 stars from City Supermarket</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="batches" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">My Crop Batches</h3>
              <Button 
                onClick={() => setShowBatchForm(true)}
                className="bg-gradient-primary hover:opacity-90 transition-smooth"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Batch
              </Button>
            </div>

            <div className="grid gap-4">
              {recentBatches.map((batch) => (
                <Card key={batch.id} className="bg-gradient-card border-border shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="mb-2 font-semibold text-foreground">{batch.crop}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Quantity: {batch.quantity}</span>
                          <span>Price: {batch.price}</span>
                          <span>Added: {batch.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={batch.status === 'Available' ? 'default' : 
                                  batch.status === 'Sold Out' ? 'destructive' : 'secondary'}
                        >
                          {batch.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Recent Orders</h3>
            
            <div className="grid gap-4">
              {recentOrders.map((order) => (
                <Card key={order.id} className="bg-gradient-card border-border shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="mb-2 font-semibold text-foreground">{order.buyer}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{order.crop}</span>
                          <span>{order.quantity}</span>
                          <span className="font-medium text-foreground">{order.amount}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={order.status === 'Confirmed' ? 'default' : 
                                order.status === 'Delivered' ? 'default' : 'secondary'}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Rating Summary */}
              <Card className="bg-gradient-card border-border shadow-medium">
                <CardHeader>
                  <CardTitle className="text-foreground">Rating Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-foreground">{stats.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">Based on 24 reviews</p>
                  </div>
                  
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-3">
                        <span className="w-8 text-sm text-muted-foreground">{stars}★</span>
                        <div className="flex-1 h-2 rounded-full bg-muted">
                          <div 
                            className="h-2 rounded-full bg-warning" 
                            style={{ width: stars === 5 ? '70%' : stars === 4 ? '25%' : '5%' }}
                          />
                        </div>
                        <span className="w-8 text-sm text-muted-foreground">
                          {stars === 5 ? '17' : stars === 4 ? '6' : '1'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card className="bg-gradient-card border-border shadow-medium">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">Fresh Mart</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Excellent quality tomatoes, very fresh and delivered on time!"
                      </p>
                    </div>
                    
                    <div className="pb-4 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">Green Grocers</span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                          ))}
                          <Star className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Good quality produce, will order again."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};