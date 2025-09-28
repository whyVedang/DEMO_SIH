import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Leaf, 
  Users, 
  TrendingUp, 
  Shield, 
  Star, 
  Package, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Globe,
  BarChart3,
  Award,
  Smartphone
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-farm.jpg";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Simple Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sage-900/70 via-sage-800/60 to-sage-700/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Simple Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white text-sm font-medium mb-8">
            <Leaf className="h-4 w-4" />
            <span>{t('heroSubtitle')}</span>
          </div>
          
          {/* Clean Title */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-sage-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Revolutionizing agriculture with BlockChain technology and Ecosystem Transparent Approach
            </p>
          </div>
          
          {/* Simple CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              className="bg-white text-sage-900 font-semibold px-8 py-4 rounded-lg hover:bg-sage-50 transition-colors duration-300 flex items-center gap-2 shadow-lg"
              onClick={handleGetStarted}
            >
              {t('getStarted')}
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              className="border-2 border-white/30 text-white font-medium px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-300"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Realistic Design */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('whyChoose')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('whyChooseDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Batch Management */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-sage-100 rounded-lg flex items-center justify-center mb-6">
                <Package className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('batchManagement')}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('batchManagementDesc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-sage-500 mr-2" />
                  Track crop progress
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-sage-500 mr-2" />
                  Quality monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-sage-500 mr-2" />
                  Harvest planning
                </li>
              </ul>
            </div>

            {/* Rating System */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('ratingSystem')}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('ratingSystemDesc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  Transparent reviews
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  Build reputation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  Trust system
                </li>
              </ul>
            </div>

            {/* Sustainable Growth */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('sustainableGrowth')}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('sustainableGrowthDesc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Eco-friendly practices
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Certification programs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Environment focus
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Farmers Across India</h2>
            <p className="text-lg text-gray-600">Join thousands of farmers who are growing their business with us</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-sage-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sage-600 mb-2">50K+</div>
              <div className="text-gray-600">Crops Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sage-600 mb-2">₹2M+</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sage-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section id="about" className="py-24 bg-sage-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('readyToTransform')}
            </h2>
            
            <p className="text-xl mb-12 text-sage-100 max-w-3xl mx-auto">
              {t('readyToTransformDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button 
                className="bg-white text-sage-600 font-semibold px-8 py-4 rounded-lg hover:bg-sage-50 transition-colors duration-300 flex items-center gap-2"
                onClick={handleGetStarted}
              >
                {t('startJourney')}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-300"
                onClick={() => navigate('/login')}
              >
                Already a Member?
              </button>
            </div>
            
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sage-200 text-sm">User Rating</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-sage-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sage-200 text-sm">Farmers</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-sage-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sage-200 text-sm">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};