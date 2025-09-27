import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";

export const Navbar = ({ isAuthenticated, onLogout, onAuthSuccess, autoOpenAuth, setAutoOpenAuth }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-open auth modal if autoOpenAuth is true
  useEffect(() => {
    if (autoOpenAuth && !isAuthenticated) {
      setIsAuthModalOpen(true);
      setAutoOpenAuth(false); // Reset the flag
    }
  }, [autoOpenAuth, isAuthenticated, setAutoOpenAuth]);

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
      <nav className="modern-header">
        <div className="header-container">
          <div className="logo-section">
            {/* Logo */}
            <div className="logo-icon">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="logo-text">HerbiProof</div>
              <div className="logo-tagline">Smart Agriculture</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#about" className="nav-link">
              Contact Us
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="header-actions">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, Farmer!</span>
                <Button variant="outline" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-primary"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle"
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
            className="md:hidden py-4 space-y-4 border-t border-gray-200 transition-all duration-200"
          >
            <a href="#about" className="block nav-link">
              About
            </a>
            <a href="#features" className="block nav-link">
              Features
            </a>
            <a href="/#contact" onClick={handleContactClick} className="block nav-link">
              Contact
            </a>
            {isAuthenticated ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <span className="block text-gray-600">Welcome, Farmer!</span>
                <Button variant="outline" onClick={onLogout} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full btn-primary"
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={onAuthSuccess}
      />
    </>
  );
};