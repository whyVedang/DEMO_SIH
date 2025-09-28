import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default Index;