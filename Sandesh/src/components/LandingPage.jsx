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
      <section className="hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sage-600/80 to-sage-500/60" />
        </div>

        <div className="hero-container">
          <div className="hero-badge">
            <Leaf className="h-4 w-4" />
            Welcome to the Future of Farming
          </div>
          <div className="max-w-4xl mx-auto text-center text-white relative z-10">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h1 className="hero-title">
                Empowering Farmers with
                <span className="hero-title-gradient"> Smart Technology</span>
              </h1>
              <p className="hero-description text-white">
                Connect directly with buyers, manage your crops efficiently, and grow your agricultural business with our comprehensive farmer portal.
              </p>
            </div>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={handleGetStarted}>
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-sage-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose FarmPortal?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is designed specifically for farmers, providing all the tools you need to succeed in modern agriculture.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="feature-title">Batch Management</h3>
              <p className="feature-description">
                Easily track and manage your crop batches from planting to harvest. Monitor progress and maintain detailed records.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="feature-title">Rating System</h3>
              <p className="feature-description">
                Build your reputation with our transparent rating system. Quality produce leads to better ratings and more orders.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="feature-title">Sustainable Growth</h3>
              <p className="feature-description">
                Promote sustainable farming practices with our eco-friendly guidelines and certification programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 bg-sage-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers who are already using HerbiProof to increase their profits and streamline their operations.
          </p>
          <div className="flex justify-center">
            <button className="btn-secondary text-sage-600 hover:text-white">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};