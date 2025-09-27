import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Settings, 
  Search,
  QrCode,
  Heart,
  Shield,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  Home,
  Package,
  BarChart3,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useConsumerStore } from '../../../stores/consumerStore';

const DashboardLayout = ({ 
  children, 
  activeTab = 'dashboard',
  onTabChange,
  variant = 'consumer', // 'consumer', 'farmer', 'admin'
  showSidebar = true,
  className = ''
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const { 
    user, 
    notifications, 
    getUnreadNotificationCount,
    markNotificationRead 
  } = useConsumerStore();

  const unreadCount = getUnreadNotificationCount();

  // Navigation items based on variant
  const navigationItems = {
    consumer: [
      { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview and quick actions' },
      { id: 'browse', label: 'Browse Products', icon: Search, description: 'Discover fresh produce' },
      { id: 'traced', label: 'My Traced Items', icon: Shield, description: 'Verified products' },
      { id: 'saved', label: 'Saved Products', icon: Heart, description: 'Bookmarked items' },
      { id: 'analytics', label: 'My Impact', icon: BarChart3, description: 'Sustainability metrics' },
    ],
    farmer: [
      { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Farm overview' },
      { id: 'products', label: 'My Products', icon: Package, description: 'Manage inventory' },
      { id: 'orders', label: 'Orders', icon: TrendingUp, description: 'Customer orders' },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Sales metrics' },
    ],
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'System overview' },
      { id: 'verification', label: 'Verification', icon: Shield, description: 'Verify farms' },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Platform metrics' },
      { id: 'support', label: 'Support', icon: HelpCircle, description: 'User support' },
    ]
  };

  const currentNavItems = navigationItems[variant] || navigationItems.consumer;

  const quickActions = {
    consumer: [
      { id: 'scan', label: 'Scan QR', icon: QrCode, color: 'sage-500' },
      { id: 'browse', label: 'Browse', icon: Search, color: 'blue-500' },
      { id: 'contact', label: 'Contact', icon: MessageSquare, color: 'green-500' },
    ],
    farmer: [
      { id: 'add-product', label: 'Add Product', icon: Package, color: 'sage-500' },
      { id: 'orders', label: 'Orders', icon: TrendingUp, color: 'blue-500' },
    ],
    admin: [
      { id: 'verify', label: 'Verify', icon: Shield, color: 'sage-500' },
      { id: 'support', label: 'Support', icon: HelpCircle, color: 'blue-500' },
    ]
  };

  const currentQuickActions = quickActions[variant] || quickActions.consumer;

  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
    // Handle notification action
  };

  const renderMobileHeader = () => (
    <div className="md:hidden bg-white border-b border-sage-100 px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 text-gray-600 hover:text-sage-600 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-sage-600">HerbiProof</span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-gray-600 hover:text-sage-600 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Profile */}
        <button className="p-2 text-gray-600 hover:text-sage-600 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderSidebar = () => (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: showSidebar ? (sidebarOpen ? 0 : 0) : -320,
        }}
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-sage-100 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${!showSidebar ? 'hidden' : ''}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-sage-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">HerbiProof</h1>
                  <p className="text-sm text-sage-600 capitalize">{variant} Portal</p>
                </div>
              </div>
              
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-sage-100">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user?.avatar || '/placeholder-avatar.jpg'}
                alt={user?.name || 'User'}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user?.name || 'Guest User'}</p>
                <p className="text-sm text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              {currentQuickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => onTabChange?.(action.id)}
                  className={`p-3 rounded-lg text-center hover:bg-sage-50 transition-colors group`}
                >
                  <action.icon className={`w-5 h-5 text-${action.color} mx-auto mb-1 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {currentNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange?.(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-200
                  ${activeTab === item.id
                    ? 'bg-sage-100 text-sage-700 shadow-sm'
                    : 'text-gray-600 hover:bg-sage-50 hover:text-sage-600'
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs opacity-75 truncate">{item.description}</p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeTab === item.id ? 'rotate-90' : ''
                }`} />
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-sage-100 space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-sage-600 hover:bg-sage-50 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );

  const renderDesktopHeader = () => (
    <div className="hidden md:flex bg-white border-b border-sage-100 px-6 py-4 items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">
          {currentNavItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
        </h2>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">
          {currentNavItems.find(item => item.id === activeTab)?.description}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 w-64"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-gray-600 hover:text-sage-600 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-sage-100 z-50">
              <div className="p-4 border-b border-sage-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-600">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className="w-full p-4 text-left hover:bg-sage-50 transition-colors border-b border-sage-50 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-sage-500'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{notification.title}</p>
                          <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <button className="flex items-center space-x-2 p-2 hover:bg-sage-50 rounded-lg transition-colors">
          <img
            src={user?.avatar || '/placeholder-avatar.jpg'}
            alt={user?.name || 'User'}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-900">{user?.name || 'Guest'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-sage-50 flex ${className}`}>
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        {renderMobileHeader()}

        {/* Desktop Header */}
        {renderDesktopHeader()}

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Click outside to close notifications */}
      {notificationsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setNotificationsOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
