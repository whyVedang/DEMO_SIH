import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-sage-800 via-sage-900 to-sage-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sage-400 to-sage-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-sage-200 bg-clip-text text-transparent"> {t('logoText')}</span>
                <div className="text-xs text-sage-300 font-medium">{t('logoDesc')}</div>
              </div>
            </div>
            <p className="text-sage-100 leading-relaxed text-sm">
              Empowering farmers with smart technology to connect directly with buyers,
              manage crops efficiently, and grow agricultural businesses.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-200 hover:text-white hover:bg-sage-700/50 p-3 rounded-xl transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-200 hover:text-white hover:bg-sage-700/50 p-3 rounded-xl transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-200 hover:text-white hover:bg-sage-700/50 p-3 rounded-xl transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Button>

            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-sage-200 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  {t('aboutUs')}
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sage-200 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  {t('features')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sage-200 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  {t('contact')}
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="text-sage-200 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  {t('support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">{t('ourServices')}</h3>
            <ul className="space-y-3">
              <li className="text-sage-200 text-sm">{t('batchManagement')}</li>
              <li className="text-sage-200 text-sm">{t('kycVerification')}</li>
              <li className="text-sage-200 text-sm">{t('ratingSystem')}</li>
              <li className="text-sage-200 text-sm">{t('marketAnalytics')}</li>
              <li className="text-sage-200 text-sm">{t('paymentGateway')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">{t('contactInfo')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-sage-700/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-sage-300" />
                </div>
                <div>
                  <span className="text-sage-200 text-sm block whitespace-pre-line">
                    {t('address')}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sage-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-sage-300" />
                </div>
                <span className="text-sage-200 text-sm">+1800 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sage-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-sage-300" />
                </div>
                <span className="text-sage-200 text-sm">support@herbiproof.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sage-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sage-300 text-sm text-center md:text-left">
              © {currentYear} {t('logoText')}. {t('allRightsReserved')}
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a
                href="#privacy"
                className="text-sage-700 hover:text-white transition-colors duration-300"
              >
                {t('privacyPolicy')}
              </a>
              <a
                href="#terms"
                className="text-sage-700 hover:text-white transition-colors duration-300"
              >
                {t('termsOfService')}
              </a>
              <a
                href="#cookies"
                className="text-sage-700 hover:text-white transition-colors duration-300"
              >
                {t('cookiePolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};