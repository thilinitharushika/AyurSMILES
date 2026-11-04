import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import compoundsData from '../data/compounds.json';

export default function ExploreScreen({ navigation }) {
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
      <Text style={styles.smilesText} numberOfLines={1}>SMILES: {item.smiles}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Local Compound Catalog</Text>
      <Text style={styles.headerSubtitle}>Loaded offline from internal storage</Text>
      
      <FlatList
        data={compoundsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
  categoryBadge: { backgroundColor: '#e9ecef', color: '#495057', fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, overflow: 'hidden', fontWeight: 'bold' },
  plantSource: { fontSize: 14, color: '#495057', marginBottom: 6 },
  smilesText: { fontSize: 12, color: '#6c757d', fontStyle: 'italic' }
});