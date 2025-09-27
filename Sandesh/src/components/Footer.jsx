import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-sage-200" />
              <span className="text-2xl font-bold">HerbiProof</span>
            </div>
            <p className="text-sage-100 leading-relaxed">
              Empowering farmers with smart technology to connect directly with buyers, 
              manage crops efficiently, and grow agricultural businesses.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10 p-2"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10 p-2"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10 p-2"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10 p-2"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-sage-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#about" 
                  className="text-sage-100 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className="text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#support" 
                  className="text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-sage-200">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sage-100">Batch Management</span>
              </li>
              <li>
                <span className="text-sage-100">KYC Verification</span>
              </li>
              <li>
                <span className="text-sage-100">Rating System</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-sage-200">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-sage-200 mt-0.5 flex-shrink-0" />
                <span className="text-sage-100 text-sm">
                  123 Agriculture Street<br />
                  Farm City, FC 12345<br />
                  India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sage-200 flex-shrink-0" />
                <span className="text-sage-100 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sage-200 flex-shrink-0" />
                <span className="text-sage-100 text-sm">support@herbiproof.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-sage-600">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-sage-200 mb-2">
              Stay Updated with Latest Farm Tech
            </h3>
            <p className="text-sage-100 mb-6">
              Subscribe to our newsletter for farming tips, market updates, and platform news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-sage-600 border border-sage-500 text-white placeholder:text-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
              />
              <button 
                className="btn-secondary text-sage-600 bg-white hover:bg-sage-50 px-6 py-2 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sage-600">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sage-100 text-sm text-center md:text-left">
              © {currentYear} HerbiProof. All rights reserved. Built with ❤️ for farmers.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a 
                href="#privacy" 
                className="text-sage-100 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-sage-100 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#cookies" 
                className="text-sage-100 hover:text-white transition-colors"
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