import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { FileText, MapPin, User, Phone, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const KYCForm = ({ onComplete }) => {
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
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <Card className="mb-8 bg-gradient-card border-border shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Complete Your KYC Verification
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Step {step} of {totalSteps} - Let's verify your farmer identity
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
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                    <p className="text-muted-foreground">Tell us about yourself</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Textarea id="address" placeholder="Enter your full address" rows={3} required />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Farm Information</h3>
                    <p className="text-muted-foreground">Details about your farming operation</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input id="farmName" placeholder="Green Valley Farms" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmAddress">Farm Location</Label>
                    <Textarea id="farmAddress" placeholder="Farm address with landmarks" rows={3} required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-warning" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Document Verification</h3>
                    <p className="text-muted-foreground">Upload required documents for verification</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Government ID (Aadhar/PAN)</p>
                        <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                        <Input type="file" accept=".pdf,.jpg,.png" className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Land Ownership Certificate</p>
                        <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                        <Input type="file" accept=".pdf,.jpg,.png" className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
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