import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import compoundsData from '../data/compounds.json';

export default function SearchScreen({ navigation }) {
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
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { compound: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.compoundName}>{item.name}</Text>
        <Text style={styles.categoryBadge}>{item.category}</Text>
      </View>

      <Text style={styles.plantSource} numberOfLines={1}>🌿 {item.plantSource}</Text>

      <View style={styles.footerRow}>
        <Text style={[
          styles.lipinskiTag, 
          item.lipinskiPass ? styles.passTag : styles.failTag
        ]}>
          {item.lipinskiPass ? 'Lipinski: Pass ✅' : 'Lipinski: Alert ⚠️'}
        </Text>
        <Text style={styles.mwText}>MW: {item.molecularWeight}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input Field */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search compound or plant (Sinhala / Tamil)..."
          placeholderTextColor="#8d99ae"
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
              style={[styles.filterPill, selectedCategory === cat && styles.activePill]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.activeFilterText]}>
                {cat}
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
            <Text style={styles.emptyText}>No matching compounds found 🧪</Text>
            <Text style={styles.emptySubtext}>Try searching with a different name or select "All" categories.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', paddingHorizontal: 16, paddingTop: 10 },
  searchContainer: { marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#d8f3dc', fontSize: 15, color: '#1b4332' },
  filterWrapper: { height: 46, marginBottom: 10 },
  pillContainer: { alignItems: 'center', gap: 8 },
  filterPill: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#e9ecef', borderRadius: 20, height: 36, justifyContent: 'center' },
  activePill: { backgroundColor: '#2d6a4f' },
  filterText: { color: '#495057', fontSize: 13, fontWeight: '600' },
  activeFilterText: { color: '#fff' },
  listContainer: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 14, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  compoundName: { fontSize: 18, fontWeight: 'bold', color: '#2d6a4f' },
  categoryBadge: { backgroundColor: '#e2f0d9', color: '#385723', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, overflow: 'hidden' },
  plantSource: { fontSize: 13, color: '#52796f', fontWeight: '600', marginBottom: 10 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 8 },
  lipinskiTag: { fontSize: 11, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, overflow: 'hidden' },
  passTag: { backgroundColor: '#d8f3dc', color: '#1b4332' },
  failTag: { backgroundColor: '#ffccd5', color: '#c9184a' },
  mwText: { fontSize: 12, color: '#6c757d', fontWeight: '500' },
  emptyContainer: { alignItems: 'center', marginTop: 40, paddingHorizontal: 20 },
  emptyText: { fontSize: 16, fontWeight: 'bold', color: '#2d6a4f', marginBottom: 6 },
  emptySubtext: { fontSize: 13, color: '#8d99ae', textAlign: 'center' }
});