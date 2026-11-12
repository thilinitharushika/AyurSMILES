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
    chemicalDescriptors: 'Cheminformatics Descriptors',
    molecularWeight: 'Molecular Weight',
    logP: 'LogP (Partition Coeff.)',
    hDonors: 'H-Bond Donors',
    hAcceptors: 'H-Bond Acceptors',
    tpsa: 'TPSA (Polar Surface)',
    smilesStructure: 'SMILES Chemical Structure',
    copySmiles: 'Copy SMILES',
    copiedSuccess: 'SMILES Copied to Clipboard! 🧪',
    botanicalDetails: 'Botanical & Traditional Profile',
    plantSourceLabel: 'Botanical Source',
    traditionalUseLabel: 'Traditional Use & Efficacy',
    categoryLabel: 'Compound Class',
    lipinskiEvaluation: "Lipinski's Rule of Five Evaluation",
    savedBadge: 'Saved',
    bookmarkBadge: 'Bookmark',
    noFavoritesTitle: 'No favorites saved yet',
    noFavoritesSubtext: 'Tap the heart icon on any compound detail page to save it for quick offline reference.',
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
    quickActions: 'ක්‍රියාකාරකම්',
    exploreAll: 'සියල්ල බලන්න',
    browseFullDataset: 'සම්පූර්ණ දත්ත සමුදාය',
    searchFilter: 'සෙවුම සහ පෙරහන',
    findByName: 'නම හෝ මූලාශ්‍රය අනුව',
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
    chemicalDescriptors: 'රසායනික සටහන් සහ පරාමිතීන්',
    molecularWeight: 'අණුක භාරය',
    logP: 'LogP (කොටස් සංගුණකය)',
    hDonors: 'H-බන්ධන දායකයන්',
    hAcceptors: 'H-බන්ධන ප්‍රතිග්‍රාහකයන්',
    tpsa: 'TPSA (ධ්‍රැවීය පෘෂ්ඨික වර්ගඵලය)',
    smilesStructure: 'SMILES රසායනික ව්‍යුහය',
    copySmiles: 'SMILES පිටපත් කරන්න',
    copiedSuccess: 'SMILES පිටපත් කරන ලදී! 🧪',
    botanicalDetails: 'ශාකමය සහ සාම්ප්‍රදායික විස්තරය',
    plantSourceLabel: 'ශාක මූලාශ්‍රය',
    traditionalUseLabel: 'සාම්ප්‍රදායික භාවිතය',
    categoryLabel: 'සංයෝග වර්ගය',
    lipinskiEvaluation: 'ලිපින්ස්කි රීති ඇගයීම',
    savedBadge: 'සුරකින ලදී',
    bookmarkBadge: 'පිටු සලකුණ',
    noFavoritesTitle: 'තවමත් ප්‍රියතම සංයෝග සුරැක නැත',
    noFavoritesSubtext: 'ඕනෑම සංයෝග විස්තර පිටුවක ඇති හදවත (Heart) අයිකනය ඔබා ඉක්මන් ඕෆ්ලයින් පරිශීලනය සඳහා එය සුරකින්න.',
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
    chemicalDescriptors: 'வேதியியல் அளவுருக்கள்',
    molecularWeight: 'மூலக்கூறு எடை',
    logP: 'LogP (பகிர்வு குணகம்)',
    hDonors: 'H-பிணைப்பு வழங்குநர்கள்',
    hAcceptors: 'H-பிணைப்பு ஏற்பிகள்',
    tpsa: 'TPSA (துருவ மேற்பரப்பு பரப்பளவு)',
    smilesStructure: 'SMILES வேதியியல் அமைப்பு',
    copySmiles: 'SMILES நகலெடு',
    copiedSuccess: 'SMILES நகலெடுக்கப்பட்டது! 🧪',
    botanicalDetails: 'தாவரவியல் மற்றும் பாரம்பரிய சுயவிவரம்',
    plantSourceLabel: 'தாவர ஆதாரம்',
    traditionalUseLabel: 'பாரம்பரிய பயன்பாடு',
    categoryLabel: 'கலவை வகை',
    lipinskiEvaluation: 'லிபின்ஸ்கி விதி மதிப்பீடு',
    savedBadge: 'சேமிக்கப்பட்டது',
    bookmarkBadge: 'புக்மார்க்',
    noFavoritesTitle: 'இன்னும் விருப்பமானவை எதுவும் சேமிக்கப்படவில்லை',
    noFavoritesSubtext: 'விரைவான ஆஃப்லைன் குறிப்புக்காக எந்தவொரு கலவை விவரப் பக்கத்திலும் உள்ள இதய ஐகானைத் தட்டவும்.',
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