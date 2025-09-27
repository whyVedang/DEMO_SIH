import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Package, Calendar, Upload, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BatchForm = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Batch Added Successfully!",
        description: "Your crop batch is now available for buyers.",
      });
      setIsLoading(false);
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add New Batch</h1>
              <p className="text-muted-foreground">Create a new crop batch listing</p>
            </div>
          </div>

          <Card className="bg-gradient-card border-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Package className="h-5 w-5 text-primary" />
                Crop Batch Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Basic Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cropName">Crop Name</Label>
                      <Input 
                        id="cropName" 
                        placeholder="e.g., Organic Tomatoes" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="variety">Variety</Label>
                      <Input 
                        id="variety" 
                        placeholder="e.g., Cherry, Beefsteak" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your crop quality, farming methods, etc." 
                      rows={3}
                      required 
                    />
                  </div>
                </div>

                {/* Quantity & Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Quantity & Pricing
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalQuantity">Total Quantity</Label>
                      <Input 
                        id="totalQuantity" 
                        type="number" 
                        placeholder="500" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="tons">Tons</SelectItem>
                          <SelectItem value="quintals">Quintals</SelectItem>
                          <SelectItem value="pieces">Pieces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricePerUnit">Price per Unit (₹)</Label>
                      <Input 
                        id="pricePerUnit" 
                        type="number" 
                        placeholder="60" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minOrderQuantity">Minimum Order Quantity</Label>
                      <Input 
                        id="minOrderQuantity" 
                        type="number" 
                        placeholder="10" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="packageType">Package Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loose">Loose</SelectItem>
                          <SelectItem value="boxes">Boxes</SelectItem>
                          <SelectItem value="bags">Bags</SelectItem>
                          <SelectItem value="crates">Crates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Availability & Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Availability & Location
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="harvestDate">Harvest Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="harvestDate" 
                          type="date" 
                          className="pl-10"
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availableUntil">Available Until</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="availableUntil" 
                          type="date" 
                          className="pl-10"
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea 
                        id="location" 
                        placeholder="Farm address or pickup location with landmarks" 
                        className="pl-10"
                        rows={2}
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmingMethod">Farming Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farming method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="conventional">Conventional</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="hydroponic">Hydroponic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                    Crop Images
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Primary Image</p>
                        <p className="text-xs text-muted-foreground">Main crop photo</p>
                        <Input type="file" accept="image/*" className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-smooth">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Additional Images</p>
                        <p className="text-xs text-muted-foreground">Multiple photos allowed</p>
                        <Input type="file" accept="image/*" multiple className="mt-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-border">
                  <Button 
                    type="submit" 
                    className="bg-gradient-primary hover:opacity-90 transition-smooth min-w-[150px]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Batch..." : "Create Batch"}
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