import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sprout, Mail, Lock, User, Phone, Leaf, Truck, Store, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [isSignup, setIsSignup] = useState(false);
  const { toast } = useToast();
  const { login, signup } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'farmer' // Default role for login, can be enhanced to fetch from backend
    };
    
    setTimeout(() => {
      login(userData);
      toast({
        title: "Login Successful!",
        description: "Welcome back to HerbiProof",
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      role: selectedRole
    };
    
    setTimeout(() => {
      signup(userData);
      toast({
        title: "Account Created!",
        description: `Welcome to HerbiProof as a ${selectedRole}!`,
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-sage-200 hover:bg-sage-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Sprout className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {isSignup ? 'Join' : 'Welcome to'} <span className="text-sage-600">FarmPortal</span>
            </h1>
            <p className="text-gray-600 text-lg">
              {isSignup ? 'Create your account to get started' : 'Sign in to your account'}
            </p>
          </div>

          {/* Auth Form */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border border-sage-100 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
            {/* Toggle Buttons */}
            <div className="flex mb-8 bg-sage-100 rounded-2xl p-1">
              <button
                onClick={() => setIsSignup(false)}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  !isSignup 
                    ? 'bg-white text-sage-700 shadow-lg transform scale-105' 
                    : 'text-sage-600 hover:text-sage-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsSignup(true)}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isSignup 
                    ? 'bg-white text-sage-700 shadow-lg transform scale-105' 
                    : 'text-sage-600 hover:text-sage-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {!isSignup ? (
              // Login Form
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-sage-400 left-4 top-3.5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-12 h-12 border-sage-200 focus:border-sage-500 focus:ring-sage-500 rounded-xl text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-sage-400 left-4 top-3.5" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-12 h-12 border-sage-200 focus:border-sage-500 focus:ring-sage-500 rounded-xl text-base"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-700 font-semibold">Full Name</Label>
                  <div className="relative">
                    <User className="absolute w-5 h-5 text-sage-400 left-4 top-3.5" />
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-12 h-12 border-sage-200 focus:border-sage-500 focus:ring-sage-500 rounded-xl text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700 font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-sage-400 left-4 top-3.5" />
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-12 h-12 border-sage-200 focus:border-sage-500 focus:ring-sage-500 rounded-xl text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone" className="text-gray-700 font-semibold">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute w-5 h-5 text-sage-400 left-4 top-3.5" />
                    <Input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-12 h-12 border-sage-200 focus:border-sage-500 focus:ring-sage-500 rounded-xl text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700 font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-sage-400 left-4 top-3.5" />
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-12 h-12 border-sage-200 focus:border-sage-500 focus:ring-sage-500 rounded-xl text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-700 font-semibold text-lg">Select Your Role</Label>
                  <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="space-y-4">
                    <div className={`flex items-center space-x-4 p-4 border-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                      selectedRole === 'farmer' 
                        ? 'border-sage-500 bg-sage-50 shadow-lg' 
                        : 'border-gray-200 hover:border-sage-300 hover:bg-sage-50/50'
                    }`}>
                      <RadioGroupItem value="farmer" id="farmer" className="text-sage-600" />
                      <Label htmlFor="farmer" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Leaf className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Farmer</div>
                          <div className="text-sm text-gray-600">Grow and sell agricultural products</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-4 p-4 border-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                      selectedRole === 'distributor' 
                        ? 'border-sage-500 bg-sage-50 shadow-lg' 
                        : 'border-gray-200 hover:border-sage-300 hover:bg-sage-50/50'
                    }`}>
                      <RadioGroupItem value="distributor" id="distributor" className="text-sage-600" />
                      <Label htmlFor="distributor" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Distributor</div>
                          <div className="text-sm text-gray-600">Distribute products to retailers</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-4 p-4 border-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                      selectedRole === 'retailer' 
                        ? 'border-sage-500 bg-sage-50 shadow-lg' 
                        : 'border-gray-200 hover:border-sage-300 hover:bg-sage-50/50'
                    }`}>
                      <RadioGroupItem value="retailer" id="retailer" className="text-sage-600" />
                      <Label htmlFor="retailer" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Store className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Retailer</div>
                          <div className="text-sm text-gray-600">Sell products to consumers</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
