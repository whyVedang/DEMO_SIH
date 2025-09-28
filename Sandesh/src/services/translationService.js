// Translation service using LibreTranslate API
class TranslationService {
  constructor() {
    this.baseURL = 'https://libretranslate.de/translate';
    this.cache = new Map();
    this.fallbackTranslations = {
      en: {
        // Navigation
        features: "Features",
        contact: "Contact Us", 
        login: "Login",
        signup: "Sign Up",
        dashboard: "Dashboard",
        logout: "Logout",
        welcome: "Welcome",
        
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
        signup: "Sign Up",
        createAccount: "Create Account",
        signingIn: "Signing In...",
        creatingAccount: "Creating Account...",
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        backToHome: "Back to Home",
        
        // Dashboard
        farmerDashboard: "Farmer Dashboard",
        distributorDashboard: "Distributor Dashboard",
        retailerDashboard: "Retailer Dashboard",
        manageFarm: "manage your farm operations",
        totalBatches: "Total Batches",
        activeOrders: "Active Orders",
        rating: "Rating",
        earnings: "Earnings"
      }
    };
    
    this.supportedLanguages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
      { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
      { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
      { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
      { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
      { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
      { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
      { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
      { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
      { code: 'ur', name: 'اردو', flag: '🇵🇰' },
      { code: 'ne', name: 'नेपाली', flag: '🇳🇵' }
    ];
  }

  // Get cache key for translation
  getCacheKey(text, targetLang) {
    return `${text}__${targetLang}`;
  }

  // Translate text using LibreTranslate API
  async translateText(text, targetLang = 'en', sourceLang = 'en') {
    if (targetLang === sourceLang) return text;
    
    const cacheKey = this.getCacheKey(text, targetLang);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.translatedText;
      
      // Cache the translation
      this.cache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.warn('Translation failed, using fallback:', error);
      return this.getFallbackTranslation(text, targetLang);
    }
  }

  // Get fallback translation or original text
  getFallbackTranslation(key, targetLang) {
    return this.fallbackTranslations[targetLang]?.[key] || 
           this.fallbackTranslations.en[key] || 
           key;
  }

  // Translate multiple keys at once
  async translateKeys(keys, targetLang = 'en') {
    if (targetLang === 'en') {
      return keys.reduce((acc, key) => {
        acc[key] = this.fallbackTranslations.en[key] || key;
        return acc;
      }, {});
    }

    const translations = {};
    
    // Use Promise.allSettled to handle failures gracefully
    const promises = keys.map(async (key) => {
      const englishText = this.fallbackTranslations.en[key] || key;
      try {
        const translated = await this.translateText(englishText, targetLang);
        return { key, translated };
      } catch (error) {
        return { key, translated: this.getFallbackTranslation(key, targetLang) };
      }
    });

    const results = await Promise.allSettled(promises);
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        translations[result.value.key] = result.value.translated;
      }
    });

    return translations;
  }

  // Get supported languages
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  // Clear translation cache
  clearCache() {
    this.cache.clear();
  }

  // Preload common translations for better UX
  async preloadTranslations(targetLang) {
    const commonKeys = [
      'heroTitle', 'heroSubtitle', 'getStarted', 'whyChoose', 
      'login', 'signup', 'dashboard', 'logout', 'welcome'
    ];
    
    return this.translateKeys(commonKeys, targetLang);
  }
}

export const translationService = new TranslationService();
