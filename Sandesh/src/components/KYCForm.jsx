import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { FileText, MapPin, User, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const KYCForm = ({ onComplete, userRole = 'farmer' }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "KYC Completed Successfully!",
        description: "Your account is now verified and ready to use.",
      });
      setIsLoading(false);
      onComplete();
    }, 3000);
  };

  return (
    <div className="min-h-screen py-8 bg-muted/20">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <Card className="mb-8 bg-gradient-card border-border shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Complete Your KYC Verification
              </CardTitle>
              <p className="mt-2 text-muted-foreground">
                Step {step} of {totalSteps} - Let's verify your {userRole} identity
              </p>
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
          </Card>

          {/* Step Content */}
          <Card className="bg-gradient-card border-border shadow-medium">
            <CardContent className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                    <p className="text-muted-foreground">Tell us about yourself</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" required />
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Textarea id="address" placeholder="Enter your full address" rows={3} required />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-success/10">
                      <MapPin className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {userRole === 'farmer' ? 'Farm Information' : 
                       userRole === 'distributor' ? 'Business Information' : 
                       'Store Information'}
                    </h3>
                    <p className="text-muted-foreground">
                      {userRole === 'farmer' ? 'Details about your farming operation' :
                       userRole === 'distributor' ? 'Details about your distribution business' :
                       'Details about your retail store'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName">
                      {userRole === 'farmer' ? 'Farm Name' : 
                       userRole === 'distributor' ? 'Business Name' : 
                       'Store Name'}
                    </Label>
                    <Input 
                      id="businessName" 
                      placeholder={
                        userRole === 'farmer' ? 'Green Valley Farms' :
                        userRole === 'distributor' ? 'ABC Distribution Co.' :
                        'City Mart Store'
                      } 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">
                      {userRole === 'farmer' ? 'Farm Location' : 
                       userRole === 'distributor' ? 'Business Address' : 
                       'Store Address'}
                    </Label>
                    <Textarea 
                      id="businessAddress" 
                      placeholder={
                        userRole === 'farmer' ? 'Farm address with landmarks' :
                        userRole === 'distributor' ? 'Business address with landmarks' :
                        'Store address with landmarks'
                      } 
                      rows={3} 
                      required 
                    />
                  </div>

                  {userRole === 'farmer' && (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="farmSize">Farm Size (acres)</Label>
                          <Input id="farmSize" type="number" placeholder="25" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="farmType">Farm Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select farm type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="organic">Organic</SelectItem>
                              <SelectItem value="conventional">Conventional</SelectItem>
                              <SelectItem value="mixed">Mixed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crops">Primary Crops</Label>
                        <Textarea id="crops" placeholder="List your main crops (e.g., Rice, Wheat, Tomatoes)" rows={3} required />
                      </div>
                    </>
                  )}

                  {userRole === 'distributor' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wholesale">Wholesale Distribution</SelectItem>
                            <SelectItem value="retail">Retail Distribution</SelectItem>
                            <SelectItem value="both">Both Wholesale & Retail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="products">Products Handled</Label>
                        <Textarea id="products" placeholder="List products you distribute (e.g., Fresh Vegetables, Grains, Spices)" rows={3} required />
                      </div>
                    </>
                  )}

                  {userRole === 'retailer' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="storeType">Store Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select store type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grocery">Grocery Store</SelectItem>
                            <SelectItem value="supermarket">Supermarket</SelectItem>
                            <SelectItem value="convenience">Convenience Store</SelectItem>
                            <SelectItem value="specialty">Specialty Food Store</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="products">Products Sold</Label>
                        <Textarea id="products" placeholder="List products you sell (e.g., Fresh Produce, Packaged Foods, Beverages)" rows={3} required />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select>
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
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-warning/10">
                      <FileText className="w-8 h-8 text-warning" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Document Verification</h3>
                    <p className="text-muted-foreground">Upload required documents for verification</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed rounded-lg border-border hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">Government ID (Aadhar/PAN)</p>
                        <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                        <Input type="file" accept=".pdf,.jpg,.png" className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-dashed rounded-lg border-border hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">Land Ownership Certificate</p>
                        <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                        <Input type="file" accept=".pdf,.jpg,.png" className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-dashed rounded-lg border-border hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">Bank Account Details</p>
                        <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                        <Input type="file" accept=".pdf,.jpg,.png" className="mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-primary hover:opacity-90 transition-smooth"
                  disabled={isLoading}
                >
                  {step === totalSteps ? (isLoading ? "Verifying..." : "Complete KYC") : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};