import { createContext, useContext, useState, useEffect } from 'react';
import { translationAPI } from '@/services/translationApi';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Comprehensive Indian language translations
const translations = {
  // en: {
  //   // Navigation
  //   features: "Features",
  //   contact: "Contact Us", 
  //   login: "Login",
  //   signup: "Sign Up",
  //   dashboard: "Dashboard",
  //   logout: "Logout",
  //   welcome: "Welcome",
    
  //   // Landing Page
  //   heroTitle: "SMART AGRICULTURE",
  //   heroSubtitle: "Welcome to the Future of Farming",
  //   getStarted: "Get Started Today",
  //   whyChoose: "Why Choose HerbiProof?",
  //   whyChooseDesc: "Empowering farmers with smart technology to connect directly with buyers, manage crops efficiently, and grow agricultural businesses.",
  //   batchManagement: "Batch Management",
  //   batchManagementDesc: "Easily track and manage your crop batches from planting to harvest. Monitor progress and maintain detailed records.",
  //   ratingSystem: "Rating System", 
  //   ratingSystemDesc: "Build your reputation with our transparent rating system. Quality produce leads to better ratings and more orders.",
  //   sustainableGrowth: "Sustainable Growth",
  //   sustainableGrowthDesc: "Promote sustainable farming practices with our eco-friendly guidelines and certification programs.",
  //   readyToTransform: "Ready to Transform Your Farming Business?",
  //   readyToTransformDesc: "Join thousands of farmers who are already using HerbiProof to increase their profits and streamline their operations.",
  //   startJourney: "Start Your Journey",
    
  //   // Auth
  //   loginTitle: "Welcome Back",
  //   loginSubtitle: "Sign in to your account",
  //   signupTitle: "Create Account", 
  //   signupSubtitle: "Join our farming community",
  //   email: "Email",
  //   password: "Password",
  //   name: "Full Name",
  //   phone: "Phone Number",
  //   selectRole: "Select Your Role",
  //   farmer: "Farmer",
  //   distributor: "Distributor",
  //   retailer: "Retailer",
  //   farmerDesc: "Grow and sell agricultural products",
  //   distributorDesc: "Distribute products to retailers",
  //   retailerDesc: "Sell products to consumers",
  //   signIn: "Sign In",
  //   createAccount: "Create Account",
  //   dontHaveAccount: "Don't have an account?",
  //   alreadyHaveAccount: "Already have an account?",
  //   backToHome: "Back to Home"
  // },
  // hi: {
  //   features: "विशेषताएं",
  //   contact: "संपर्क करें", 
  //   login: "लॉगिन",
  //   signup: "साइन अप",
  //   dashboard: "डैशबोर्ड",
  //   logout: "लॉगआउट",
  //   welcome: "स्वागत",
  //   heroTitle: "स्मार्ट कृषि",
  //   heroSubtitle: "कृषि के भविष्य में आपका स्वागत है",
  //   getStarted: "आज ही शुरू करें",
  //   whyChoose: "हर्बीप्रूफ क्यों चुनें?",
  //   whyChooseDesc: "किसानों को स्मार्ट तकनीक के साथ सशक्त बनाना ताकि वे सीधे खरीदारों से जुड़ सकें।",
  //   batchManagement: "बैच प्रबंधन",
  //   batchManagementDesc: "रोपण से कटाई तक अपने फसल बैचों को आसानी से ट्रैक करें।",
  //   ratingSystem: "रेटिंग सिस्टम", 
  //   ratingSystemDesc: "हमारी पारदर्शी रेटिंग प्रणाली के साथ अपनी प्रतिष्ठा बनाएं।",
  //   sustainableGrowth: "टिकाऊ विकास",
  //   sustainableGrowthDesc: "पर्यावरण-अनुकूल दिशानिर्देशों के साथ टिकाऊ कृषि प्रथाओं को बढ़ावा दें।",
  //   readyToTransform: "अपने कृषि व्यवसाय को बदलने के लिए तैयार हैं?",
  //   readyToTransformDesc: "हजारों किसानों के साथ जुड़ें जो पहले से ही हर्बीप्रूफ का उपयोग कर रहे हैं।",
  //   startJourney: "अपनी यात्रा शुरू करें",
  //   loginTitle: "वापस आपका स्वागत है",
  //   loginSubtitle: "अपने खाते में साइन इन करें",
  //   signupTitle: "खाता बनाएं", 
  //   signupSubtitle: "हमारे कृषि समुदाय में शामिल हों",
  //   email: "ईमेल",
  //   password: "पासवर्ड",
  //   name: "पूरा नाम",
  //   phone: "फोन नंबर",
  //   selectRole: "अपनी भूमिका चुनें",
  //   farmer: "किसान",
  //   distributor: "वितरक",
  //   retailer: "खुदरा विक्रेता",
  //   farmerDesc: "कृषि उत्पाद उगाएं और बेचें",
  //   distributorDesc: "खुदरा विक्रेताओं को उत्पाद वितरित करें",
  //   retailerDesc: "उपभोक्ताओं को उत्पाद बेचें",
  //   signIn: "साइन इन",
  //   createAccount: "खाता बनाएं",
  //   dontHaveAccount: "खाता नहीं है?",
  //   alreadyHaveAccount: "पहले से खाता है?",
  //   backToHome: "मुख्य पृष्ठ पर वापस जाएं"
  // }
  en: {
    // Navigation
    features: "Features",
    contact: "Contact Us", 
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    logout: "Logout",
    welcome: "Welcome",
    back: "Back",
    profile: "Profile",
    edit: "Edit",
    call: "Call",
    
    // Dashboard common
    farmerDashboard: "Farmer Dashboard",
    distributorDashboard: "Distributor Dashboard", 
    retailerDashboard: "Retailer Dashboard",
    manageFarm: "Manage your farm and crops",
    manageDistribution: "Manage distribution network",
    manageStore: "Manage your store inventory",
    editProfile: "Edit Profile",
    
    // Farmer specific
    totalCrops: "Total Crops",
    activeOrders: "Active Orders",
    rating: "Rating",
    earnings: "Earnings",
    quickActions: "Quick Actions",
    addNewCrop: "Add New Crop",
    viewAllOrders: "View All Orders",
    harvestTime: "Harvest Schedule",
    createProfile: "Create Profile",
    overview: "Overview",
    myCrops: "My Crops",
    orders: "Orders",
    recentActivity: "Recent Activity",
    farmerTips: "Farmer Tips",
    recentOrders: "Recent Orders",
    quantity: "Quantity",
    price: "Price",
    quality: "Quality",
    location: "Location",
    addedOn: "Added On",
    crop: "Crop",
    amount: "Amount",
    date: "Date",
    phone: "Phone",
    
    // Distributor specific
    totalInventory: "Total Inventory",
    activeDeliveries: "Active Deliveries",
    retailersServed: "Retailers Served",
    thisMonthRevenue: "This Month Revenue",
    myStock: "My Stock",
    logistics: "Logistics",
    network: "Network",
    addNewStock: "Add New Stock",
    retailerNetwork: "Retailer Network",
    retailerNetworkDesc: "Manage your retailer connections and partnerships",
    
    // Retailer specific
    totalProducts: "Total Products",
    totalCustomers: "Total Customers",
    thisMonthSales: "This Month Sales",
    myProducts: "My Products",
    customers: "Customers",
    sales: "Sales",
    addNewProduct: "Add New Product",
    myCustomers: "My Customers",
    salesOverview: "Sales Overview",
    customerInfo: "Customer insights and analytics coming soon",
    
    // Landing Page
    heroTitle: "SMART AGRICULTURE",
    heroSubtitle: "Welcome to the Future of Farming",
    getStarted: "Get Started Today",
    whyChoose: "Why Choose HerbiProof?",
    whyChooseDesc: "Empowering farmers with smart technology to connect directly with buyers, manage crops efficiently, and grow agricultural businesses.",
    batchManagement: "Batch Management",
    batchManagementDesc: "Easily track and manage your crop batches from planting to harvest. Monitor progress and maintain detailed records.",
    ratingSystem: "Rating System", 
    ratingSystemDesc: "Build your reputation with our transparent rating system. Quality produce leads to better ratings and more orders.",
    sustainableGrowth: "Sustainable Growth",
    sustainableGrowthDesc: "Promote sustainable farming practices with our eco-friendly guidelines and certification programs.",
    readyToTransform: "Ready to Transform Your Farming Business?",
    readyToTransformDesc: "Join thousands of farmers who are already using HerbiProof to increase their profits and streamline their operations.",
    startJourney: "Start Your Journey",
    
    // Auth
    loginTitle: "Welcome Back",
    loginSubtitle: "Sign in to your account",
    signupTitle: "Create Account", 
    signupSubtitle: "Join our farming community",
    email: "Email",
    password: "Password",
    name: "Full Name",
    phone: "Phone Number",
    selectRole: "Select Your Role",
    farmer: "Farmer",
    distributor: "Distributor",
    retailer: "Retailer",
    farmerDesc: "Grow and sell agricultural products",
    distributorDesc: "Distribute products to retailers",
    retailerDesc: "Sell products to consumers",
    signIn: "Sign In",
    createAccount: "Create Account",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    backToHome: "Back to Home"
  },
  hi: {
    // Navigation
    features: "विशेषताएं",
    contact: "संपर्क करें", 
    login: "लॉगिन",
    signup: "साइन अप",
    dashboard: "डैशबोर्ड",
    logout: "लॉगआउट",
    welcome: "स्वागत",
    back: "वापस जाएं",
    profile: "प्रोफाइल",
    edit: "संपादित करें",
    call: "कॉल करें",
    
    // Dashboard common
    farmerDashboard: "किसान डैशबोर्ड",
    distributorDashboard: "वितरक डैशबोर्ड",
    retailerDashboard: "खुदरा विक्रेता डैशबोर्ड",
    manageFarm: "अपने खेत और फसलों का प्रबंधन करें",
    manageDistribution: "वितरण नेटवर्क का प्रबंधन करें",
    manageStore: "अपने स्टोर की इन्वेंटरी का प्रबंधन करें",
    editProfile: "प्रोफाइल संपादित करें",
    
    // Farmer specific
    totalCrops: "कुल फसलें",
    activeOrders: "सक्रिय ऑर्डर",
    rating: "रेटिंग",
    earnings: "कमाई",
    quickActions: "त्वरित कार्य",
    addNewCrop: "नई फसल जोड़ें",
    viewAllOrders: "सभी ऑर्डर देखें",
    harvestTime: "कटाई का समय",
    createProfile: "प्रोफाइल बनाएं",
    overview: "अवलोकन",
    myCrops: "मेरी फसलें",
    orders: "ऑर्डर",
    recentActivity: "हाल की गतिविधि",
    farmerTips: "किसान सुझाव",
    recentOrders: "हाल के ऑर्डर",
    quantity: "मात्रा",
    price: "कीमत",
    quality: "गुणवत्ता",
    location: "स्थान",
    addedOn: "जोड़ा गया",
    crop: "फसल",
    amount: "राशि",
    date: "दिनांक",
    phone: "फोन",
    
    // Distributor specific
    totalInventory: "कुल इन्वेंटरी",
    activeDeliveries: "सक्रिय डिलीवरी",
    retailersServed: "सेवा किए गए खुदरा विक्रेता",
    thisMonthRevenue: "इस महीने की आय",
    myStock: "मेरा स्टॉक",
    logistics: "रसद",
    network: "नेटवर्क",
    addNewStock: "नया स्टॉक जोड़ें",
    retailerNetwork: "खुदरा विक्रेता नेटवर्क",
    retailerNetworkDesc: "अपने खुदरा विक्रेता कनेक्शन और साझेदारी का प्रबंधन करें",
    
    // Retailer specific
    totalProducts: "कुल उत्पाद",
    totalCustomers: "कुल ग्राहक",
    thisMonthSales: "इस महीने की बिक्री",
    myProducts: "मेरे उत्पाद",
    customers: "ग्राहक",
    sales: "बिक्री",
    addNewProduct: "नया उत्पाद जोड़ें",
    myCustomers: "मेरे ग्राहक",
    salesOverview: "बिक्री अवलोकन",
    customerInfo: "ग्राहक अंतर्दृष्टि और एनालिटिक्स जल्द आ रहे हैं",
    
    // Existing translations
    heroTitle: "स्मार्ट कृषि",
    heroSubtitle: "कृषि के भविष्य में आपका स्वागत है",
    getStarted: "आज ही शुरू करें",
    whyChoose: "हर्बीप्रूफ क्यों चुनें?",
    whyChooseDesc: "किसानों को स्मार्ट तकनीक के साथ सशक्त बनाना ताकि वे सीधे खरीदारों से जुड़ सकें।",
    batchManagement: "बैच प्रबंधन",
    batchManagementDesc: "रोपण से कटाई तक अपने फसल बैचों को आसानी से ट्रैक करें।",
    ratingSystem: "रेटिंग सिस्टम", 
    ratingSystemDesc: "हमारी पारदर्शी रेटिंग प्रणाली के साथ अपनी प्रतिष्ठा बनाएं।",
    sustainableGrowth: "टिकाऊ विकास",
    sustainableGrowthDesc: "पर्यावरण-अनुकूल दिशानिर्देशों के साथ टिकाऊ कृषि प्रथाओं को बढ़ावा दें।",
    readyToTransform: "अपने कृषि व्यवसाय को बदलने के लिए तैयार हैं?",
    readyToTransformDesc: "हजारों किसानों के साथ जुड़ें जो पहले से ही हर्बीप्रूफ का उपयोग कर रहे हैं।",
    startJourney: "अपनी यात्रा शुरू करें",
    loginTitle: "वापस आपका स्वागत है",
    loginSubtitle: "अपने खाते में साइन इन करें",
    signupTitle: "खाता बनाएं", 
    signupSubtitle: "हमारे कृषि समुदाय में शामिल हों",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "पूरा नाम",
    phone: "फोन नंबर",
    selectRole: "अपनी भूमिका चुनें",
    farmer: "किसान",
    distributor: "वितरक",
    retailer: "खुदरा विक्रेता",
    farmerDesc: "कृषि उत्पाद उगाएं और बेचें",
    distributorDesc: "खुदरा विक्रेताओं को उत्पाद वितरित करें",
    retailerDesc: "उपभोक्ताओं को उत्पाद बेचें",
    signIn: "साइन इन",
    createAccount: "खाता बनाएं",
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से खाता है?",
    backToHome: "मुख्य पृष्ठ पर वापस जाएं"
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [apiTranslations, setApiTranslations] = useState({});

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('herbiproof_language');
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      
      // Load cached API translations if available
      if (savedLanguage !== 'en') {
        const cached = localStorage.getItem(`herbiproof_api_translations_${savedLanguage}`);
        if (cached) {
          try {
            setApiTranslations(JSON.parse(cached));
          } catch (error) {
            console.warn('Failed to parse cached translations:', error);
          }
        }
      }
    }
  }, []);

  // Change language and optionally load API translations
  const changeLanguage = async (languageCode) => {
    if (!availableLanguages.some(lang => lang.code === languageCode)) {
      console.warn(`Language ${languageCode} is not supported`);
      return;
    }

    setCurrentLanguage(languageCode);
    localStorage.setItem('herbiproof_language', languageCode);

    // If switching to English, clear API translations
    if (languageCode === 'en') {
      setApiTranslations({});
      return;
    }

    // If no hardcoded translations exist, try API
    if (!translations[languageCode]) {
      setIsLoading(true);
      try {
        const keys = Object.keys(translations.en);
        const newTranslations = await translationAPI.translateKeys(keys, languageCode, translations.en);
        setApiTranslations(newTranslations);
        localStorage.setItem(`herbiproof_api_translations_${languageCode}`, JSON.stringify(newTranslations));
      } catch (error) {
        console.error('Failed to load API translations:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Get translation for current language
  const t = (key) => {
    // First check hardcoded translations
    const hardcodedTranslation = translations[currentLanguage]?.[key];
    if (hardcodedTranslation) {
      return hardcodedTranslation;
    }
    
    // Then check API translations
    const apiTranslation = apiTranslations[key];
    if (apiTranslation) {
      return apiTranslation;
    }
    
    // Fallback to English or key itself
    return translations.en[key] || key;
  };

  // Available languages - Indian regional languages only  
  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇮🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' }
  ];

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};