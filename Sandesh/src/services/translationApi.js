// Translation API service using MyMemory (free translation API)
class TranslationAPI {
  constructor() {
    this.baseURL = 'https://api.mymemory.translated.net/get';
    this.cache = new Map();
    this.maxCacheSize = 1000;
    
    // Language mapping to ISO codes - Indian regional languages only
    this.languageMap = {
      'en': 'en-US',
      'hi': 'hi-IN',     // Hindi
      'bn': 'bn-BD',     // Bengali  
      'te': 'te-IN',     // Telugu
      'ta': 'ta-IN',     // Tamil
      'mr': 'mr-IN',     // Marathi
      'gu': 'gu-IN',     // Gujarati
      'kn': 'kn-IN',     // Kannada
      'ml': 'ml-IN',     // Malayalam
      'pa': 'pa-IN',     // Punjabi
      'or': 'or-IN',     // Odia
      'as': 'as-IN',     // Assamese
      'ur': 'ur-PK',     // Urdu
      'ne': 'ne-NP',     // Nepali
      'si': 'si-LK'      // Sinhala
    };

    // Fallback translations for offline mode
    this.fallbackTranslations = {
      hi: {
        heroTitle: "स्मार्ट कृषि",
        heroSubtitle: "कृषि के भविष्य में आपका स्वागत है",
        getStarted: "आज ही शुरू करें",
        whyChoose: "हर्बीप्रूफ क्यों चुनें?",
        whyChooseDesc: "किसानों को स्मार्ट तकनीक के साथ सशक्त बनाना",
        batchManagement: "बैच प्रबंधन",
        batchManagementDesc: "रोपण से कटाई तक अपने फसल बैचों को आसानी से ट्रैक करें",
        ratingSystem: "रेटिंग सिस्टम",
        ratingSystemDesc: "हमारी पारदर्शी रेटिंग प्रणाली के साथ अपनी प्रतिष्ठा बनाएं",
        sustainableGrowth: "टिकाऊ विकास",
        sustainableGrowthDesc: "पर्यावरण-अनुकूल दिशानिर्देशों के साथ टिकाऊ कृषि प्रथाओं को बढ़ावा दें",
        readyToTransform: "अपने कृषि व्यवसाय को बदलने के लिए तैयार हैं?",
        readyToTransformDesc: "हजारों किसानों के साथ जुड़ें जो पहले से ही हर्बीप्रूफ का उपयोग कर रहे हैं",
        startJourney: "अपनी यात्रा शुरू करें",
        features: "विशेषताएं",
        contact: "संपर्क करें",
        login: "लॉगिन",
        signup: "साइन अप",
        dashboard: "डैशबोर्ड",
        logout: "लॉगआउट",
        welcome: "स्वागत",
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
      },
      bn: {
        heroTitle: "স্মার্ট কৃষি",
        heroSubtitle: "কৃষির ভবিষ্যতে স্বাগতম",
        getStarted: "আজই শুরু করুন",
        whyChoose: "কেন হার্বিপ্রুফ বেছে নেবেন?",
        whyChooseDesc: "স্মার্ট প্রযুক্তির সাথে কৃষকদের ক্ষমতায়ন",
        batchManagement: "ব্যাচ ব্যবস্থাপনা",
        ratingSystem: "রেটিং সিস্টেম",
        sustainableGrowth: "টেকসই বৃদ্ধি",
        features: "বৈশিষ্ট্য",
        contact: "যোগাযোগ",
        login: "লগইন",
        signup: "সাইন আপ",
        farmer: "কৃষক",
        distributor: "বিতরণকারী",
        retailer: "খুচরা বিক্রেতা",
        loginTitle: "ফিরে আসুন",
        signupTitle: "অ্যাকাউন্ট তৈরি করুন",
        email: "ইমেইল",
        password: "পাসওয়ার্ড",
        name: "পূর্ণ নাম",
        phone: "ফোন নম্বর",
        selectRole: "আপনার ভূমিকা নির্বাচন করুন",
        backToHome: "হোমে ফিরে যান"
      },
      te: {
        heroTitle: "స్మార్ట్ వ్యవసాయం",
        heroSubtitle: "వ్యవసాయ భవిష్యత్తుకు స్వాగతం",
        getStarted: "ఈరోజే ప్రారంభించండి",
        whyChoose: "హెర్బిప్రూఫ్‌ను ఎందుకు ఎంచుకోవాలి?",
        features: "లక్షణాలు",
        login: "లాగిన్",
        signup: "సైన్ అప్",
        farmer: "రైతు",
        distributor: "పంపిణీదారు",
        retailer: "రిటైలర్"
      },
      ta: {
        heroTitle: "ஸ்மார்ட் விவசாயம்",
        heroSubtitle: "வேளாண்மையின் எதிர்காலத்திற்கு வரவேற்கிறோம்",
        getStarted: "இன்றே தொடங்குங்கள்",
        whyChoose: "ஏன் ஹெர்பிப்ரூஃப் தேர்ந்தெடுக்க வேண்டும்?",
        features: "அம்சங்கள்",
        login: "உள்நுழைவு",
        signup: "பதிவு செய்யுங்கள்",
        farmer: "விவசாயி",
        distributor: "விநியோகஸ்தர்",
        retailer: "சில்லறை விற்பனையாளர்"
      },
      mr: {
        heroTitle: "स्मार्ट शेती",
        heroSubtitle: "शेतीच्या भविष्यात आपले स्वागत",
        getStarted: "आजच सुरू करा",
        whyChoose: "हर्बीप्रूफ का निवडावे?",
        features: "वैशिष्ट्ये",
        login: "लॉगिन",
        signup: "साइन अप",
        farmer: "शेतकरी",
        distributor: "वितरक",
        retailer: "किरकोळ विक्रेता"
      },
      gu: {
        heroTitle: "સ્માર્ટ ખેતી",
        heroSubtitle: "ખેતીના ભવિષ્યમાં આપનું સ્વાગત",
        getStarted: "આજે જ શરૂ કરો",
        whyChoose: "હર્બીપ્રૂફ કેમ પસંદ કરવું?",
        features: "વિશેષતાઓ",
        login: "લોગિન",
        signup: "સાઇન અપ",
        farmer: "ખેડૂત",
        distributor: "વિતરક",
        retailer: "રિટેલર"
      },
      kn: {
        heroTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
        heroSubtitle: "ಕೃಷಿಯ ಭವಿಷ್ಯಕ್ಕೆ ಸ್ವಾಗತ",
        getStarted: "ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ",
        whyChoose: "ಹೆರ್ಬಿಪ್ರೂಫ್ ಏಕೆ ಆರಿಸಬೇಕು?",
        features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
        login: "ಲಾಗಿನ್",
        signup: "ಸೈನ್ ಅಪ್",
        farmer: "ರೈತ",
        distributor: "ವಿತರಕ",
        retailer: "ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿ"
      },
      ml: {
        heroTitle: "സ്മാർട്ട് കൃഷി",
        heroSubtitle: "കാർഷിക ഭാവിയിലേക്ക് സ്വാഗതം",
        getStarted: "ഇന്ന് തുടങ്ങുക",
        whyChoose: "എന്തുകൊണ്ട് ഹെർബിപ്രൂഫ് തിരഞ്ഞെടുക്കണം?",
        features: "സവിശേഷതകൾ",
        login: "ലോഗിൻ",
        signup: "സൈൻ അപ്പ്",
        farmer: "കർഷകൻ",
        distributor: "വിതരണക്കാരൻ",
        retailer: "റീട്ടെയിലർ"
      },
      pa: {
        heroTitle: "ਸਮਾਰਟ ਖੇਤੀ",
        heroSubtitle: "ਖੇਤੀਬਾੜੀ ਦੇ ਭਵਿੱਖ ਵਿੱਚ ਸਵਾਗਤ",
        getStarted: "ਅੱਜ ਹੀ ਸ਼ੁਰੂ ਕਰੋ",
        whyChoose: "ਹਰਬੀਪ੍ਰੂਫ ਕਿਉਂ ਚੁਣੋ?",
        features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
        login: "ਲਾਗਇਨ",
        signup: "ਸਾਇਨ ਅੱਪ",
        farmer: "ਕਿਸਾਨ",
        distributor: "ਵਿਤਰਕ",
        retailer: "ਪ੍ਰਚੂਨ ਵਿਕਰੇਤਾ"
      },
      or: {
        heroTitle: "ସ୍ମାର୍ଟ କୃଷି",
        heroSubtitle: "କୃଷିର ଭବିଷ୍ୟତରେ ସ୍ୱାଗତ",
        getStarted: "ଆଜି ହିଁ ଆରମ୍ଭ କରନ୍ତୁ",
        whyChoose: "ହେର୍ବିପ୍ରୁଫ୍ କାହିଁକି ବାଛିବେ?",
        features: "ବିଶେଷତା",
        login: "ଲଗଇନ୍",
        signup: "ସାଇନ୍ ଅପ୍",
        farmer: "କୃଷକ",
        distributor: "ବିତରକ",
        retailer: "ଖୁଚୁରା ବିକ୍ରେତା"
      },
      as: {
        heroTitle: "স্মাৰ্ট কৃষি",
        heroSubtitle: "কৃষিৰ ভৱিষ্যতলৈ স্বাগতম",
        getStarted: "আজিয়েই আৰম্ভ কৰক",
        whyChoose: "হাৰ্বিপ্ৰুফ কিয় বাছিব?",
        features: "বৈশিষ্ট্য",
        login: "লগইন",
        signup: "ছাইন আপ",
        farmer: "কৃষক",
        distributor: "বিতৰক",
        retailer: "খুচুৰা বিক্ৰেতা"
      }
    };
  }

  // Get cache key
  getCacheKey(text, targetLang) {
    return `${text.slice(0, 50)}__${targetLang}`;
  }

  // Clean cache if it gets too large
  cleanCache() {
    if (this.cache.size > this.maxCacheSize) {
      const entries = Array.from(this.cache.entries());
      const half = Math.floor(entries.length / 2);
      this.cache.clear();
      entries.slice(half).forEach(([key, value]) => {
        this.cache.set(key, value);
      });
    }
  }

  // Translate text using MyMemory API
  async translateText(text, targetLang, sourceLang = 'en') {
    if (targetLang === sourceLang || !text.trim()) return text;
    
    const cacheKey = this.getCacheKey(text, targetLang);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const sourceISO = this.languageMap[sourceLang] || sourceLang;
      const targetISO = this.languageMap[targetLang] || targetLang;
      
      const url = `${this.baseURL}?q=${encodeURIComponent(text)}&langpair=${sourceISO}|${targetISO}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        const translatedText = data.responseData.translatedText;
        
        // Cache the translation
        this.cache.set(cacheKey, translatedText);
        this.cleanCache();
        
        return translatedText;
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.warn('Translation failed, using fallback:', error);
      return this.getFallbackTranslation(text, targetLang) || text;
    }
  }

  // Get fallback translation
  getFallbackTranslation(key, targetLang) {
    return this.fallbackTranslations[targetLang]?.[key];
  }

  // Translate multiple keys at once
  async translateKeys(keys, targetLang, translations = {}) {
    if (targetLang === 'en') {
      return keys.reduce((acc, key) => {
        acc[key] = translations[key] || key;
        return acc;
      }, {});
    }

    const results = {};
    
    // Process in batches to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < keys.length; i += batchSize) {
      const batch = keys.slice(i, i + batchSize);
      
      const promises = batch.map(async (key) => {
        const englishText = translations[key] || key;
        try {
          const translated = await this.translateText(englishText, targetLang);
          return { key, translated };
        } catch (error) {
          return { 
            key, 
            translated: this.getFallbackTranslation(key, targetLang) || englishText 
          };
        }
      });

      const batchResults = await Promise.allSettled(promises);
      
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          results[result.value.key] = result.value.translated;
        }
      });

      // Add delay between batches to respect rate limits
      if (i + batchSize < keys.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Check if language is supported
  isLanguageSupported(langCode) {
    return this.languageMap.hasOwnProperty(langCode);
  }
}

export const translationAPI = new TranslationAPI();
