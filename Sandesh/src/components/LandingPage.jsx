import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, TrendingUp, Shield, Star, Package, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-farm.jpg";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sage-900/70 via-sage-800/60 to-sage-700/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Clean Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white text-sm font-medium mb-8">
            <Leaf className="h-4 w-4" />
            {t('heroSubtitle')}
          </div>
          
          {/* Sleek Title */}
          <div className="max-w-5xl mx-auto mb-12">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              <span className="block bg-gradient-to-r from-white via-sage-100 to-sage-200 bg-clip-text text-transparent">
                {t('heroTitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-sage-100 max-w-3xl mx-auto leading-relaxed font-light">
              {t('whyChooseDesc')}
            </p>
          </div>
          
          {/* Clean CTA */}
          <div className="flex justify-center items-center">
            <button
              className="group inline-flex items-center gap-3 bg-white text-sage-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
              onClick={handleGetStarted}
            >
              {t('getStarted')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-sage-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Leaf className="h-4 w-4" />
              {t('whyChoose')}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Why Choose <span className="text-sage-600">FarmPortal</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our platform is designed specifically for farmers, providing all the tools you need to succeed in modern agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-sage-100 hover:-translate-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t('batchManagement')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('batchManagementDesc')}
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-sage-100 hover:-translate-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t('ratingSystem')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('ratingSystemDesc')}
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-sage-100 hover:-translate-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t('sustainableGrowth')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('sustainableGrowthDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Crops Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">₹2M+</div>
              <div className="text-gray-600 font-medium">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sage-600 mb-2">4.9★</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white text-sm font-medium mb-8">
              <Leaf className="h-4 w-4" />
              Join the Revolution
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {t('readyToTransform')}
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              {t('readyToTransformDesc')}
            </p>
            <div className="flex justify-center items-center">
              <button 
                className="group inline-flex items-center gap-3 bg-white text-sage-700 font-bold px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                onClick={handleGetStarted}
              >
                {t('startJourney')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};