import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const translations = {
  en: {
    appTitle: 'AyurSMILES 🌿',
    appSubtitle: 'Offline Medicinal Compound Analyzer',
    databaseOverview: 'Database Overview',
    indexedPlants: 'Indexed Plants',
    offlineReady: 'Offline Ready',
    languages: 'Languages',
    featuredCompound: 'FEATURED COMPOUND',
    exploreMoleculeData: 'Explore Molecule Data →',
    quickActions: 'Quick Actions',
    exploreAll: 'Explore All',
    browseFullDataset: 'Browse full dataset',
    searchFilter: 'Search & Filter',
    findByName: 'Find by name or source',
    favorites: 'Favorites',
    savedBookmarks: 'Saved bookmarks',
    exploreCompounds: 'Explore Compounds',
    showingIndexed: 'Showing indexed traditional medicinal compounds',
    searchPlaceholder: 'Search compound or plant (Sinhala / Tamil)...',
    noResults: 'No matching compounds found 🧪',
    tryDifferentSearch: 'Try searching with a different name or select "All".',
    lipinskiPass: 'Lipinski: Pass ✅',
    lipinskiAlert: 'Lipinski: Alert ⚠️',
    all: 'All',
  },
  si: {
    appTitle: 'ආයුර් SMILES 🌿',
    appSubtitle: 'ඕෆ්ලයින් ඖෂධීය සංයෝග විශ්ලේෂකය',
    databaseOverview: 'දත්ත සමුදාය දළ විශ්ලේෂණය',
    indexedPlants: 'ලැයිස්තුගත ශාක',
    offlineReady: '100% ඕෆ්ලයින්',
    languages: 'භාෂා',
    featuredCompound: 'විශේෂිත ඖෂධීය සංයෝගය',
    exploreMoleculeData: 'අණුක දත්ත පරීක්ෂා කරන්න →',
    quickActions: 'ක්රියාකාරකම්',
    exploreAll: 'සියල්ල බලන්න',
    browseFullDataset: 'සම්පූර්ණ දත්ත සමුදාය',
    searchFilter: 'සෙවුම සහ පෙරහන',
    findByName: 'නම හෝ මූලාශ්රය අනුව',
    favorites: 'ප්‍රියතම සංයෝග',
    savedBookmarks: 'සුරකින ලද ලැයිස්තුව',
    exploreCompounds: 'සංයෝග ගවේෂණය',
    showingIndexed: 'ලැයිස්තුගත සම්ප්‍රදායික ඖෂධීය සංයෝග',
    searchPlaceholder: 'සංයෝගය හෝ ශාකය සොයන්න (සිංහල / தமிழ்)...',
    noResults: 'ගැලපෙන සංයෝග හමු නොවීය 🧪',
    tryDifferentSearch: 'වෙනත් නමකින් සෙවීමට උත්සාහ කරන්න.',
    lipinskiPass: 'ලිපින්ස්කි: සාර්ථකයි ✅',
    lipinskiAlert: 'ලිපින්ස්කි: අවධානය ⚠️',
    all: 'සියල්ල',
  },
  ta: {
    appTitle: 'ஆயுர் SMILES 🌿',
    appSubtitle: 'ஆஃப்லைன் மூலிகை கலவை பகுப்பாய்வி',
    databaseOverview: 'தரவுத்தள மேலோட்டம்',
    indexedPlants: 'வரிசைப்படுத்தப்பட்ட தாவரங்கள்',
    offlineReady: 'ஆஃப்லைன் தயார்',
    languages: 'மொழிகள்',
    featuredCompound: 'சிறப்பு மூலிகை கலவை',
    exploreMoleculeData: 'மூலக்கூறு தரவை ஆராய்க →',
    quickActions: 'விரைவு செயல்கள்',
    exploreAll: 'அனைத்தையும் ஆராய்க',
    browseFullDataset: 'முழு தரவுத்தளம்',
    searchFilter: 'தேடல் & வடிகட்டி',
    findByName: 'பெயர் அல்லது மூலம் மூலம்',
    favorites: 'விருப்பமானவை',
    savedBookmarks: 'சேமிக்கப்பட்டவை',
    exploreCompounds: 'கலவைகளை ஆராய்க',
    showingIndexed: 'வரிசைப்படுத்தப்பட்ட பாரம்பரிய மருத்துவ கலவைகள்',
    searchPlaceholder: 'கலவை அல்லது தாவரத்தை தேடுக...',
    noResults: 'பொருந்தும் கலவைகள் எதுவும் இல்லை 🧪',
    tryDifferentSearch: 'வேறு பெயரில் தேட முயற்சிக்கவும்.',
    lipinskiPass: 'லிபின்ஸ்கி: தேர்ச்சி ✅',
    lipinskiAlert: 'லிபின்ஸ்கி: எச்சரிக்கை ⚠️',
    all: 'அனைத்தும்',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLang = await AsyncStorage.getItem('user_language');
      if (savedLang) setLang(savedLang);
    } catch (error) {
      console.log('Error loading language', error);
    }
  };

  const changeLanguage = async (newLang) => {
    try {
      setLang(newLang);
      await AsyncStorage.setItem('user_language', newLang);
    } catch (error) {
      console.log('Error saving language', error);
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);