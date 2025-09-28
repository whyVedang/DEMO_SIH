import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [autoOpenAuth, setAutoOpenAuth] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'true') {
      setAutoOpenAuth(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        autoOpenAuth={autoOpenAuth}
        setAutoOpenAuth={setAutoOpenAuth}
      />
      
      <LandingPage />

      <Footer />
    </div>
  );
};

export default Index;