import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Upload, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProfileForm = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Profile Updated Successfully!",
        description: "Your farmer profile has been updated.",
      });
      setIsLoading(false);
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen py-6 bg-muted/20">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
              <p className="text-muted-foreground">Update your farmer profile information</p>
            </div>
          </div>

          <Card className="bg-gradient-card border-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="w-5 h-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <div className="space-y-4">
                  <h3 className="pb-2 text-lg font-medium border-b text-foreground border-border">
                    Profile Picture
                  </h3>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Change Picture
                      </Button>
                      <p className="mt-1 text-xs text-muted-foreground">
                        JPG, GIF or PNG. Max size of 2MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="pb-2 text-lg font-medium border-b text-foreground border-border">
                    Personal Information
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        defaultValue="John"
                        placeholder="Enter first name" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        defaultValue="Doe"
                        placeholder="Enter last name" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="john.doe@example.com"
                        className="pl-10"
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                      <Textarea 
                        id="address" 
                        defaultValue="Village Greenfield, Dist. Sunshine, State 123456"
                        className="pl-10"
                        rows={3}
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Farm Information */}
                <div className="space-y-4">
                  <h3 className="pb-2 text-lg font-medium border-b text-foreground border-border">
                    Farm Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input 
                      id="farmName" 
                      defaultValue="Green Valley Farms"
                      placeholder="Enter farm name" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmAddress">Farm Address</Label>
                    <Textarea 
                      id="farmAddress" 
                      defaultValue="Plot No. 123, Green Valley Road, Near River Bridge, Village Greenfield"
                      placeholder="Enter farm address with landmarks" 
                      rows={3}
                      required 
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Farm Size (acres)</Label>
                      <Input 
                        id="farmSize" 
                        type="number" 
                        defaultValue="25"
                        placeholder="Enter farm size" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmType">Farm Type</Label>
                      <Select defaultValue="organic">
                        <SelectTrigger>
                          <SelectValue placeholder="Select farm type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="organic">Organic</SelectItem>
                          <SelectItem value="conventional">Conventional</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                          <SelectItem value="hydroponic">Hydroponic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Primary Crops/Specialization</Label>
                    <Textarea 
                      id="specialization" 
                      defaultValue="Organic vegetables: Tomatoes, Lettuce, Bell Peppers, Cucumbers. Seasonal fruits: Strawberries, Melons."
                      placeholder="List your main crops and specializations" 
                      rows={3}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select defaultValue="10+">
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="pb-2 text-lg font-medium border-b text-foreground border-border">
                    Business Information
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                      <Input 
                        id="gstNumber" 
                        placeholder="Enter GST number if applicable" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Bank Account Number</Label>
                      <Input 
                        id="bankAccount" 
                        placeholder="Enter bank account number" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input 
                        id="ifscCode" 
                        placeholder="Enter IFSC code" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input 
                        id="bankName" 
                        placeholder="Enter bank name" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio/Description</Label>
                    <Textarea 
                      id="bio" 
                      defaultValue="Experienced organic farmer with 15 years of experience. Committed to sustainable farming practices and providing high-quality, fresh produce to our community."
                      placeholder="Write a brief description about yourself and your farming practices" 
                      rows={4}
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end pt-6 space-x-4 border-t border-border">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={onBack}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-gradient-primary hover:opacity-90 transition-smooth min-w-[150px]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};