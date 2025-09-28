import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('herbiproof_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('herbiproof_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    const userWithRole = {
      ...userData,
      role: userData.role || 'farmer', // Default role if not specified
      loginTime: new Date().toISOString()
    };
    
    setUser(userWithRole);
    setIsAuthenticated(true);
    localStorage.setItem('herbiproof_user', JSON.stringify(userWithRole));
    
    // Auto-redirect based on role
    redirectToRoleDashboard(userWithRole.role);
  };

  const signup = (userData) => {
    const userWithRole = {
      ...userData,
      role: userData.role,
      signupTime: new Date().toISOString()
    };
    
    setUser(userWithRole);
    setIsAuthenticated(true);
    localStorage.setItem('herbiproof_user', JSON.stringify(userWithRole));
    
    // Auto-redirect based on role
    redirectToRoleDashboard(userWithRole.role);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('herbiproof_user');
    navigate('/');
  };

  const updateUserRole = (newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('herbiproof_user', JSON.stringify(updatedUser));
      redirectToRoleDashboard(newRole);
    }
  };

  const redirectToRoleDashboard = (role) => {
    switch (role) {
      case 'farmer':
        navigate('/dashboard/farmer');
        break;
      case 'distributor':
        navigate('/dashboard/distributor');
        break;
      case 'retailer':
        navigate('/dashboard/retailer');
        break;
      default:
        navigate('/login');
        break;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
