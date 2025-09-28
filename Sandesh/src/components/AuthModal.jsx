import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sprout, Mail, Lock, User, Phone, Leaf, Truck, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const AuthModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('farmer');
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
      onClose();
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
    
    // Simulate API call
    setTimeout(() => {
      signup(userData);
      toast({
        title: "Account Created!",
        description: `Welcome to HerbiProof as a ${selectedRole}!`,
      });
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-md border-sage-200">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-sage-100">
              <Sprout className="w-8 h-8 text-sage-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Welcome to HerbiProof
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-gray-200 focus:border-sage-500 focus:ring-sage-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 border-gray-200 focus:border-sage-500 focus:ring-sage-500"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                  <Input
                    id="signup-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Select Your Role</Label>
                <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-sage-300 transition-colors">
                    <RadioGroupItem value="farmer" id="farmer" />
                    <Label htmlFor="farmer" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="font-medium">Farmer</div>
                        <div className="text-sm text-gray-500">Grow and sell agricultural products</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-sage-300 transition-colors">
                    <RadioGroupItem value="distributor" id="distributor" />
                    <Label htmlFor="distributor" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-medium">Distributor</div>
                        <div className="text-sm text-gray-500">Distribute products to retailers</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-sage-300 transition-colors">
                    <RadioGroupItem value="retailer" id="retailer" />
                    <Label htmlFor="retailer" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Store className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-medium">Retailer</div>
                        <div className="text-sm text-gray-500">Sell products to consumers</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};