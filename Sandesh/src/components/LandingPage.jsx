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
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Simple Background */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sage-900/70 via-sage-800/60 to-sage-700/70" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center sm:px-6 lg:px-8">
          {/* Simple Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-medium text-white border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
            <Leaf className="w-4 h-4" />
            <span>{t('heroSubtitle')}</span>
          </div>
          
          {/* Clean Title */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              {t('heroTitle')}
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed md:text-2xl text-sage-100">
              {t('heroDescription')}
            </p>
          </div>
          
          {/* Simple CTA */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              className="flex items-center gap-2 px-8 py-4 font-semibold transition-colors duration-300 bg-white rounded-lg shadow-lg text-sage-900 hover:bg-sage-50"
              onClick={handleGetStarted}
            >
              {t('getStarted')}
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              className="px-8 py-4 font-medium text-white transition-colors duration-300 border-2 rounded-lg border-white/30 hover:bg-white/10"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Realistic Design */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {t('whyChoose')}
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              {t('whyChooseDesc')}
            </p>
          </div>

          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            {/* Batch Management */}
            <div className="p-8 transition-shadow duration-300 bg-white border border-gray-100 rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-sage-100">
                <Package className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {t('batchManagement')}
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                {t('batchManagementDesc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-sage-500" />
                  {t('trackCropProgress')}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-sage-500" />
                  {t('qualityMonitoring')}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-sage-500" />
                  {t('harvestPlanning')}
                </li>
              </ul>
            </div>

            {/* Rating System */}
            <div className="p-8 transition-shadow duration-300 bg-white border border-gray-100 rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-lg">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {t('ratingSystem')}
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                {t('ratingSystemDesc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  {t('transparentReviews')}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  {t('buildReputation')}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  {t('trustSystem')}
                </li>
              </ul>
            </div>

            {/* Sustainable Growth */}
            <div className="p-8 transition-shadow duration-300 bg-white border border-gray-100 rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-lg">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {t('sustainableGrowth')}
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                {t('sustainableGrowthDesc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {t('ecoFriendlyPractices')}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {t('certificationPrograms')}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {t('environmentFocus')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">{t('trustedByFarmers')}</h2>
            <p className="text-lg text-gray-600">{t('joinThousandsFarmers')}</p>
          </div>
          <div className="grid max-w-4xl grid-cols-2 gap-8 mx-auto md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-sage-600">10K+</div>
              <div className="text-gray-600">{t('activeFarmers')}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-sage-600">50K+</div>
              <div className="text-gray-600">{t('cropsListed')}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-sage-600">₹2M+</div>
              <div className="text-gray-600">{t('revenueGenerated')}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-sage-600">4.8★</div>
              <div className="text-gray-600">{t('averageRating')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section id="about" className="py-24 text-white bg-sage-600">
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              {t('readyToTransform')}
            </h2>
            
            <p className="max-w-3xl mx-auto mb-12 text-xl text-sage-100">
              {t('readyToTransformDesc')}
            </p>
            
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <button 
                className="flex items-center gap-2 px-8 py-4 font-semibold transition-colors duration-300 bg-white rounded-lg text-sage-600 hover:bg-sage-50"
                onClick={handleGetStarted}
              >
                {t('startJourney')}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                className="px-8 py-4 font-semibold text-white transition-colors duration-300 border-2 rounded-lg border-white/30 hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                {t('alreadyMember')}
              </button>
            </div>
            
            <div className="grid max-w-2xl grid-cols-3 gap-8 mx-auto mt-16">
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-sage-200">{t('userRating')}</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-sage-200" />
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-sage-200">{t('farmers')}</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-sage-200" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-sage-200">{t('secure')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};