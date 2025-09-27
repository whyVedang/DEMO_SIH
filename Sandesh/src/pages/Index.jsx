import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { KYCForm } from "@/components/KYCForm";
import { FarmerDashboard } from "@/components/FarmerDashboard";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [appState, setAppState] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAppState('kyc');
  };

  const handleKYCComplete = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAppState('landing');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
        onAuthSuccess={handleAuthSuccess}
      />
      
      {appState === 'landing' && (
        <LandingPage />
      )}
      
      {appState === 'kyc' && isAuthenticated && (
        <KYCForm onComplete={handleKYCComplete} />
      )}
      
      {appState === 'dashboard' && isAuthenticated && (
        <FarmerDashboard onLogout={handleLogout} />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;