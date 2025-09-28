import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden text-white bg-gradient-to-br from-sage-800 via-sage-900 to-sage-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container relative z-10 px-4 py-16 mx-auto sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-br from-sage-400 to-sage-500 rounded-xl">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-sage-200 bg-clip-text">HerbiProof</span>
                <div className="text-xs font-medium text-sage-300">Smart Agriculture</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-sage-100">
              {t("heroDescription")}
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="p-3 transition-all duration-300 text-sage-200 hover:text-white hover:bg-sage-700/50 rounded-xl"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-3 transition-all duration-300 text-sage-200 hover:text-white hover:bg-sage-700/50 rounded-xl"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-3 transition-all duration-300 text-sage-200 hover:text-white hover:bg-sage-700/50 rounded-xl"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#about" 
                  className="flex items-center transition-colors duration-300 text-sage-200 hover:text-white group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 transition-transform group-hover:translate-x-1" />
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className="flex items-center transition-colors duration-300 text-sage-200 hover:text-white group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 transition-transform group-hover:translate-x-1" />
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="flex items-center transition-colors duration-300 text-sage-200 hover:text-white group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 transition-transform group-hover:translate-x-1" />
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#support" 
                  className="flex items-center transition-colors duration-300 text-sage-200 hover:text-white group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 transition-transform group-hover:translate-x-1" />
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-sm text-sage-200">Batch Management</li>
              <li className="text-sm text-sage-200">KYC Verification</li>
              <li className="text-sm text-sage-200">Rating System</li>
              <li className="text-sm text-sage-200">Market Analytics</li>
              <li className="text-sm text-sage-200">Payment Gateway</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-sage-700/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-sage-300" />
                </div>
                <div>
                  <span className="block text-sm text-sage-200">
                    123 Agriculture Street<br />
                    Bengalurur City, FC 12345<br />
                    India
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-sage-700/50">
                  <Phone className="w-4 h-4 text-sage-300" />
                </div>
                <span className="text-sm text-sage-200">+1800 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-sage-700/50">
                  <Mail className="w-4 h-4 text-sage-300" />
                </div>
                <span className="text-sm text-sage-200">support@herbiproof.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sage-700/50">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm text-center text-sage-300 md:text-left">
              © {currentYear} HerbiProof. All rights reserved. Built with ❤️ for Ecosystem.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-end">
              <a 
                href="#privacy" 
                className="transition-colors duration-300 text-sage-300 hover:text-white"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="transition-colors duration-300 text-sage-300 hover:text-white"
              >
                Terms of Service
              </a>
              <a 
                href="#cookies" 
                className="transition-colors duration-300 text-sage-300 hover:text-white"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};