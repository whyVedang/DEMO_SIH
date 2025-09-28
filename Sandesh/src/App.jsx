import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import FarmerDashboard from "./pages/dashboard/FarmerDashboard";
import DistributorDashboard from "./pages/dashboard/DistributorDashboard";
import RetailerDashboard from "./pages/dashboard/RetailerDashboard";
import TestDashboard from "./pages/dashboard/TestDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/dashboard/farmer" 
                element={
                  <ProtectedRoute requiredRole="farmer">
                    <FarmerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/distributor" 
                element={
                  <ProtectedRoute requiredRole="distributor">
                    <DistributorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/retailer" 
                element={
                  <ProtectedRoute requiredRole="retailer">
                    <RetailerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/test" 
                element={
                  <ProtectedRoute>
                    <TestDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;