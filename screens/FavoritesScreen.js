import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  // Refreshes saved favorites list whenever user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorite_compounds');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error('Error loading favorites:', e);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { compound: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.compoundName}>{item.name}</Text>
        <Text style={styles.categoryBadge}>{item.category}</Text>
      </View>
      <Text style={styles.plantSource}>🌿 {item.plantSource}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Bookmarked Compounds</Text>
      <Text style={styles.headerSubtitle}>Saved offline in local device storage</Text>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved favorites yet! ⭐</Text>
            <Text style={styles.emptySubtext}>Open any compound detail view and tap "Save to Favorites".</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', paddingHorizontal: 16, paddingTop: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1b4332' },
  headerSubtitle: { fontSize: 13, color: '#52796f', marginBottom: 15 },
  listContainer: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  compoundName: { fontSize: 18, fontWeight: 'bold', color: '#2d6a4f' },
  categoryBadge: { backgroundColor: '#e2f0d9', color: '#385723', fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, overflow: 'hidden', fontWeight: 'bold' },
  plantSource: { fontSize: 13, color: '#495057' },
  emptyContainer: { alignItems: 'center', marginTop: 50, paddingHorizontal: 20 },
  emptyText: { fontSize: 16, fontWeight: 'bold', color: '#2d6a4f', marginBottom: 6 },
  emptySubtext: { fontSize: 13, color: '#8d99ae', textAlign: 'center' }
});