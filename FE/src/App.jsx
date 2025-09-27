import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import WorkingConsumerPortal from './pages/WorkingConsumerPortal';
import CleanPortal from './pages/CleanPortal';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            {/* Main e-commerce homepage */}
            <Route path="/" element={<WorkingConsumerPortal />} />
            
            {/* Clean CSS Test Portal */}
            <Route path="/clean" element={<CleanPortal />} />
            
            
            {/* Product detail page */}
            <Route path="/product/:id" element={<ProductDetail />} />
            
            {/* Category pages - placeholder for future implementation */}
            <Route path="/category/:category" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Category Page - Coming Soon</h1></div>} />
            
            {/* Search results - placeholder */}
            <Route path="/search" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Search Results - Coming Soon</h1></div>} />
            
            {/* Products listing - placeholder */}
            <Route path="/products" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">All Products - Coming Soon</h1></div>} />
            
            {/* Trending products - placeholder */}
            <Route path="/trending" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Trending Products - Coming Soon</h1></div>} />
            
            {/* User account pages - placeholder */}
            <Route path="/account" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Account Settings - Coming Soon</h1></div>} />
            <Route path="/orders" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Your Orders - Coming Soon</h1></div>} />
            <Route path="/saved" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Saved Products - Coming Soon</h1></div>} />
            
            {/* Checkout - placeholder */}
            <Route path="/checkout" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Checkout - Coming Soon</h1></div>} />
            
            {/* 404 fallback */}
            <Route path="*" element={<div className="min-h-screen bg-sage-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1></div>} />
          </Routes>
          
          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#87A96B',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </div>
      </Router>
  );
}

export default App;
