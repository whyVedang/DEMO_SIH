import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X, LayoutDashboard } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = ({ autoOpenAuth, setAutoOpenAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
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
              {t('features')}
            </a>
            <a href="#about" className="nav-link">
              {t('contact')}
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="header-actions">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/dashboard/${user?.role}`)}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t('dashboard')}
                </Button>
                <span className="text-gray-600">{t('welcome')}, {user?.name || 'User'}!</span>
                <Button variant="outline" onClick={logout}>
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-primary"
              >
                {t('login')}
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
              {t('contact')}
            </a>
            <a href="#features" className="block nav-link">
              {t('features')}
            </a>
            <a href="/#contact" onClick={handleContactClick} className="block nav-link">
              {t('contact')}
            </a>
            <div className="pt-4 border-t border-gray-200">
              <LanguageSwitcher />
            </div>
            {isAuthenticated ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate(`/dashboard/${user?.role}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t('dashboard')}
                </Button>
                <span className="block text-gray-600">{t('welcome')}, {user?.name || 'User'}!</span>
                <Button variant="outline" onClick={logout} className="w-full">
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full btn-primary"
                >
                  {t('login')}
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};