import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity,
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import compoundsData from '../data/compounds.json';

export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme, isDarkMode, isDark } = useTheme();
  const { t = {}, language, lang, currentLanguage, setLanguage, changeLanguage } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user, signOut } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Safe fallback for language state and setter
  const activeLang = language || lang || currentLanguage || 'en';
  const darkModeActive = isDarkMode ?? isDark ?? false;

  // Extract unique categories dynamically from dataset
  const categories = ['All', ...new Set(compoundsData.map((c) => c.category))];

  // Filter compounds based on search query & selected category
  const filteredCompounds = compoundsData.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plantSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.traditionalUse && item.traditionalUse.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const cycleLanguage = () => {
    const switchFn = setLanguage || changeLanguage;
    if (!switchFn) return;

    if (activeLang === 'en') switchFn('si');
    else if (activeLang === 'si') switchFn('ta');
    else switchFn('en');
  };

  const renderItem = ({ item }) => {
    const fav = isFavorite(item.id);
    return (
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={() => navigation.navigate('Detail', { compound: item })}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleArea}>
            <Text style={[styles.categoryTag, { backgroundColor: theme.badgeBg || '#e0f2fe', color: theme.badgeText || '#0369a1' }]}>
              {item.category}
            </Text>
            <Text style={[styles.compoundName, { color: theme.primary }]}>{item.name}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => toggleFavorite(item.id)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={fav ? 'heart' : 'heart-outline'} 
              size={22} 
              color={fav ? '#e63946' : theme.subText} 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.plantSource, { color: theme.subText }]} numberOfLines={1}>
          🌿 {item.plantSource}
        </Text>
        
        <Text style={[styles.useText, { color: theme.text }]} numberOfLines={2}>
          {item.traditionalUse}
        </Text>

        <View style={[styles.footerRow, { borderTopColor: theme.border }]}>
          <Text style={[
            styles.lipinskiTag, 
            item.lipinskiPass ? styles.passTag : styles.failTag
          ]}>
            {item.lipinskiPass ? (t.lipinskiPass || 'Lipinski Pass') : (t.lipinskiAlert || 'Lipinski Alert')}
          </Text>
          <Text style={[styles.mwText, { color: theme.subText }]}>MW: {item.molecularWeight} g/mol</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Top User Bar & Quick Toggles */}
      <View style={styles.topBar}>
        <View>
          <Text style={[styles.welcomeSub, { color: theme.subText }]}>Welcome back,</Text>
          <Text style={[styles.welcomeUser, { color: theme.text }]}>{user?.name || 'Researcher'} 👋</Text>
        </View>
        
        <View style={styles.quickActions}>
          {/* Language Switcher Badge */}
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={cycleLanguage}
            activeOpacity={0.7}
          >
            <Text style={[styles.iconButtonText, { color: theme.text }]}>
              {String(activeLang).toUpperCase()}
            </Text>
          </TouchableOpacity>

          {/* Theme Switcher Toggle */}
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons name={darkModeActive ? 'sunny-outline' : 'moon-outline'} size={18} color={theme.text} />
          </TouchableOpacity>

          {/* Sign Out Button */}
          <TouchableOpacity 
            style={[styles.signoutButton, { borderColor: theme.border }]}
            onPress={signOut}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="log-out-outline" size={18} color="#e63946" />
          </TouchableOpacity>
        </View>
      </View>

      {/* App Header Title */}
      <View style={styles.headerTitleContainer}>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>AyurSMILES</Text>
        <Text style={[styles.headerSubtitle, { color: theme.subText }]}>
          Ethnobotanical & Cheminformatics Compendium
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="search" size={18} color={theme.subText} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={t.searchPlaceholder || 'Search compounds, plants, or uses...'}
          placeholderTextColor={theme.subText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={theme.subText} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Horizontal Filter Pills */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryPill,
                  { 
                    backgroundColor: isActive ? theme.primary : theme.card, 
                    borderColor: isActive ? theme.primary : theme.border 
                  }
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.categoryPillText, 
                  { color: isActive ? '#ffffff' : theme.text }
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Compounds List */}
      <FlatList
        data={filteredCompounds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="flask-outline" size={50} color={theme.subText} style={{ marginBottom: 10 }} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No compounds found</Text>
            <Text style={[styles.emptySub, { color: theme.subText }]}>
              Try searching for a different plant, chemical class, or keyword.
            </Text>
          </View>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  welcomeSub: { fontSize: 11, fontWeight: '500' },
  welcomeUser: { fontSize: 15, fontWeight: 'bold' },
  quickActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: { 
    width: 36, 
    height: 36, 
    borderRadius: 10, 
    borderWidth: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  iconButtonText: { fontSize: 11, fontWeight: 'bold' },
  signoutButton: { 
    width: 36, 
    height: 36, 
    borderRadius: 10, 
    borderWidth: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#ffe5ec'
  },
  headerTitleContainer: { marginBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 12, marginTop: 2 },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 46, 
    borderWidth: 1, 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    marginBottom: 12 
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14 },
  categoriesWrapper: { marginBottom: 12, height: 40 },
  categoryScroll: { alignItems: 'center', gap: 8 },
  categoryPill: { 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20, 
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryPillText: { fontSize: 12, fontWeight: '600' },
  listContainer: { paddingBottom: 24 },
  card: { 
    padding: 16, 
    borderRadius: 14, 
    marginBottom: 12, 
    borderWidth: 1, 
    elevation: 2 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: 6 
  },
  titleArea: { flex: 1, marginRight: 8 },
  categoryTag: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 6, 
    alignSelf: 'flex-start', 
    overflow: 'hidden', 
    marginBottom: 4 
  },
  compoundName: { fontSize: 18, fontWeight: 'bold' },
  plantSource: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  useText: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
  footerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    paddingTop: 10 
  },
  lipinskiTag: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 6, 
    overflow: 'hidden' 
  },
  passTag: { backgroundColor: '#d8f3dc', color: '#1b4332' },
  failTag: { backgroundColor: '#ffccd5', color: '#c9184a' },
  mwText: { fontSize: 12, fontWeight: '500' },
  emptyContainer: { alignItems: 'center', marginTop: 60, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  emptySub: { fontSize: 13, textAlign: 'center', lineHeight: 18 }
});