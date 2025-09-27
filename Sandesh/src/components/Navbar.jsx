import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";

export const Navbar = ({ isAuthenticated, onLogout, onAuthSuccess }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.assign("/#contact");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">HerbiProof</span>
            </div>

            {/* Spacer to push nav + auth to the right on desktop */}
            <div className="flex-1" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              
              <a
                href="#features"
                className="rounded-md px-2 py-1 text-muted-foreground hover:text-primary transition-colors transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Features
              </a>
              <a
                href="#about"
                className="rounded-md px-2 py-1 text-muted-foreground hover:text-primary transition-colors transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Contact Us
              </a>
              {/* <a
                href="#contact"
                onClick={handleContactClick}
                className="rounded-md px-2 py-1 text-muted-foreground hover:text-primary transition-colors transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Contact
              </a> */}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Welcome, Farmer!</span>
                  <Button variant="outline" onClick={onLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-primary hover:opacity-90 transition-smooth"
                >
                  Login / Sign Up
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-auto md:hidden p-2 rounded-md text-muted-foreground hover:text-primary transition-colors transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div
              id="mobile-nav"
              className="md:hidden py-4 space-y-4 border-t border-border transition-all duration-200"
            >
              <a
                href="#about"
                className="block rounded-md px-2 py-2 text-muted-foreground hover:text-primary transition-colors transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                About
              </a>
              <a
                href="#features"
                className="block rounded-md px-2 py-2 text-muted-foreground hover:text-primary transition-colors transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Features
              </a>
              <a
                href="/#contact"
                onClick={handleContactClick}
                className="block rounded-md px-2 py-2 text-muted-foreground hover:text-primary transition-colors transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Contact
              </a>
              {isAuthenticated ? (
                <div className="space-y-2 pt-4 border-t border-border">
                  <span className="block text-muted-foreground">Welcome, Farmer!</span>
                  <Button variant="outline" onClick={onLogout} className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-border">
                  <Button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-smooth focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Login / Sign Up
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={onAuthSuccess}
      />
    </>
  );
};