import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X, LayoutDashboard, LogIn, UserPlus } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
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
                  className="flex items-center gap-2 hover:bg-sage-50 hover:border-sage-300"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t('dashboard')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard/test')}
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 text-blue-600"
                >
                  Test
                </Button>
                <span className="text-gray-600 hidden md:block">{t('welcome')}, {user?.name || 'User'}!</span>
                <Button variant="outline" onClick={logout} className="hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 hover:bg-sage-50 hover:border-sage-300"
                >
                  <LogIn className="w-4 h-4" />
                  {t('login')}
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {t('signup')}
                </Button>
              </div>
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
                <span className="block text-gray-600 text-center py-2">{t('welcome')}, {user?.name || 'User'}!</span>
                <Button variant="outline" onClick={logout} className="w-full hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  {t('login')}
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white shadow-lg flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {t('signup')}
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>

    </>
  );
};