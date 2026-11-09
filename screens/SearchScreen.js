import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import compoundsData from '../data/compounds.json';

export default function SearchScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamically extract unique categories from dataset
  const categories = ['All', ...new Set(compoundsData.map((item) => item.category))];

  // Live filter logic for text query & category filter
  const filteredCompounds = compoundsData.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plantSource.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={() => navigation.navigate('Detail', { compound: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.compoundName, { color: theme.primary }]}>{item.name}</Text>
        <Text style={[styles.categoryBadge, { backgroundColor: theme.badgeBg, color: theme.badgeText }]}>
          {item.category}
        </Text>
      </View>

      <Text style={[styles.plantSource, { color: theme.subText }]} numberOfLines={1}>🌿 {item.plantSource}</Text>

      <View style={[styles.footerRow, { borderTopColor: theme.border }]}>
        <Text style={[
          styles.lipinskiTag, 
          item.lipinskiPass ? styles.passTag : styles.failTag
        ]}>
          {item.lipinskiPass ? t.lipinskiPass : t.lipinskiAlert}
        </Text>
        <Text style={[styles.mwText, { color: theme.subText }]}>MW: {item.molecularWeight}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Input Field */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input, 
            { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }
          ]}
          placeholder={t.searchPlaceholder}
          placeholderTextColor={theme.subText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Horizontal Category Filters */}
      <View style={styles.filterWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(cat) => cat}
          renderItem={({ item: cat }) => (
            <TouchableOpacity
              style={[
                styles.filterPill, 
                { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 },
                selectedCategory === cat && { backgroundColor: theme.primary, borderColor: theme.primary }
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.filterText, 
                { color: theme.text },
                selectedCategory === cat && styles.activeFilterText
              ]}>
                {cat === 'All' ? t.all : cat}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.pillContainer}
        />
      </View>

      {/* Search Results */}
      <FlatList
        data={filteredCompounds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.primary }]}>{t.noResults}</Text>
            <Text style={[styles.emptySubtext, { color: theme.subText }]}>{t.tryDifferentSearch}</Text>
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
    paddingTop: 10 
  },
  searchContainer: { 
    marginBottom: 10 
  },
  input: { 
    padding: 14, 
    borderRadius: 12, 
    borderWidth: 1, 
    fontSize: 15 
  },
  filterWrapper: { 
    height: 46, 
    marginBottom: 10 
  },
  pillContainer: { 
    alignItems: 'center', 
    gap: 8 
  },
  filterPill: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    height: 36, 
    justifyContent: 'center' 
  },
  filterText: { 
    fontSize: 13, 
    fontWeight: '600' 
  },
  activeFilterText: { 
    color: '#fff' 
  },
  listContainer: { 
    paddingBottom: 20 
  },
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
    alignItems: 'center', 
    marginBottom: 6 
  },
  compoundName: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  categoryBadge: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    overflow: 'hidden' 
  },
  plantSource: { 
    fontSize: 13, 
    fontWeight: '600', 
    marginBottom: 10 
  },
  footerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    paddingTop: 8 
  },
  lipinskiTag: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 6, 
    overflow: 'hidden' 
  },
  passTag: { 
    backgroundColor: '#d8f3dc', 
    color: '#1b4332' 
  },
  failTag: { 
    backgroundColor: '#ffccd5', 
    color: '#c9184a' 
  },
  mwText: { 
    fontSize: 12, 
    fontWeight: '500' 
  },
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: 40, 
    paddingHorizontal: 20 
  },
  emptyText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 6 
  },
  emptySubtext: { 
    fontSize: 13, 
    textAlign: 'center' 
  }
});