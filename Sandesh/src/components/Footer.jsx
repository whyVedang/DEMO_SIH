import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">HerbiProof</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
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
            <h3 className="text-lg font-semibold text-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#about" 
                  className="text-primary-foreground/80 hover:text-accent transition-smooth"
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
            <h3 className="text-lg font-semibold text-accent">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-foreground/80">Batch Management</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">KYC Verification</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">Rating System</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Agriculture Street<br />
                  Farm City, FC 12345<br />
                  India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">support@herbiproof.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-accent mb-2">
              Stay Updated with Latest Farm Tech
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Subscribe to our newsletter for farming tips, market updates, and platform news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Button 
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm text-center md:text-left">
              © {currentYear} HerbiProof. All rights reserved. Built with ❤️ for farmers.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a 
                href="#privacy" 
                className="text-primary-foreground/80 hover:text-accent transition-smooth"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-primary-foreground/80 hover:text-accent transition-smooth"
              >
                Terms of Service
              </a>
              <a 
                href="#cookies" 
                className="text-primary-foreground/80 hover:text-accent transition-smooth"
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