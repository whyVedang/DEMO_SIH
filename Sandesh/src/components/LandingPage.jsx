import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, TrendingUp, Shield, Star, Package } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import { AuthModal } from "./AuthModal";
export const LandingPage = () => {
  const handleGetStarted = () => {
    // navigator('/login');
    return (<AuthModal />);
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Farmers with
              <span className="text-accent"> Smart Technology</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect directly with buyers, manage your crops efficiently, and grow your agricultural business with our comprehensive farmer portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth text-lg px-8"
                onclick={handleGetStarted}>
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose FarmPortal?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed specifically for farmers, providing all the tools you need to succeed in modern agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">Batch Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily track and manage your crop batches from planting to harvest. Monitor progress and maintain detailed records.
                </p>
              </CardContent>
            </Card>



            <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-warning" />
                </div>
                <CardTitle className="text-xl text-foreground">Rating System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build your reputation with our transparent rating system. Quality produce leads to better ratings and more orders.
                </p>
              </CardContent>
            </Card>



            <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-warning" />
                </div>
                <CardTitle className="text-xl text-foreground">Sustainable Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Promote sustainable farming practices with our eco-friendly guidelines and certification programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers who are already using HerbiProof to increase their profits and streamline their operations.
          </p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth text-lg px-8"
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};