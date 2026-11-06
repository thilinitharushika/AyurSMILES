import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route, navigation }) {
  const { compound } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (compound) {
      checkFavoriteStatus();
    }
  }, [compound]);

  const checkFavoriteStatus = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorite_compounds');
      if (storedFavorites !== null) {
        const favoritesArray = JSON.parse(storedFavorites);
        const exists = favoritesArray.some((item) => item.id === compound.id);
        setIsFavorite(exists);
      }
    } catch (e) {
      console.error('Error reading favorites:', e);
    }
  };

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorite_compounds');
      let favoritesArray = storedFavorites !== null ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter((item) => item.id !== compound.id);
        setIsFavorite(false);
        Alert.alert('Removed', `${compound.name} removed from favorites.`);
      } else {
        favoritesArray.push(compound);
        setIsFavorite(true);
        Alert.alert('Saved', `${compound.name} added to favorites! ⭐`);
      }

      await AsyncStorage.setItem('@favorite_compounds', JSON.stringify(favoritesArray));
    } catch (e) {
      console.error('Error updating favorites:', e);
    }
  };

  if (!compound) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No compound data found.</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerCard}>
          <View style={styles.badgeRow}>
            <Text style={styles.categoryBadge}>{compound.category}</Text>
            <Text style={[
              styles.lipinskiBadge, 
              compound.lipinskiPass ? styles.passBadge : styles.failBadge
            ]}>
              {compound.lipinskiPass ? 'Lipinski: Pass ✅' : 'Lipinski: Alert ⚠️'}
            </Text>
          </View>
          
          <Text style={styles.title}>{compound.name}</Text>
          <Text style={styles.plantSource}>🌿 {compound.plantSource}</Text>

          {/* Save / Favorite Button */}
          <TouchableOpacity 
            style={[styles.favBtn, isFavorite ? styles.favBtnActive : styles.favBtnInactive]}
            onPress={toggleFavorite}
          >
            <Text style={styles.favBtnText}>
              {isFavorite ? '★ Saved in Favorites' : '☆ Save to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* SMILES Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>SMILES Structure</Text>
          <View style={styles.smilesBox}>
            <Text style={styles.smilesText} selectable>{compound.smiles}</Text>
          </View>
        </View>

        {/* Cheminformatics Data */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Molecular Properties</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Molecular Weight:</Text>
            <Text style={styles.infoValue}>{compound.molecularWeight}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lipinski Rule of 5:</Text>
            <Text style={styles.infoValue}>
              {compound.lipinskiPass ? 'Passed (Drug-like candidate)' : 'Violation (High MW / Structure)'}
            </Text>
          </View>
        </View>

        {/* Traditional & Scientific Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Traditional Medicinal Use</Text>
          <Text style={styles.bodyText}>{compound.traditionalUse}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Description & Bioactivity</Text>
          <Text style={styles.bodyText}>{compound.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  scrollContent: { padding: 16, paddingBottom: 30 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, color: '#8d99ae', marginBottom: 15 },
  backButton: { backgroundColor: '#2d6a4f', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
  headerCard: { backgroundColor: '#fff', padding: 20, borderRadius: 14, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  categoryBadge: { backgroundColor: '#e2f0d9', color: '#385723', fontSize: 11, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  lipinskiBadge: { fontSize: 11, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  passBadge: { backgroundColor: '#d8f3dc', color: '#1b4332' },
  failBadge: { backgroundColor: '#ffccd5', color: '#c9184a' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1b4332', marginBottom: 4 },
  plantSource: { fontSize: 14, color: '#52796f', fontWeight: '500', marginBottom: 15 },
  favBtn: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  favBtnInactive: { backgroundColor: '#2d6a4f' },
  favBtnActive: { backgroundColor: '#d90429' },
  favBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  sectionCard: { backgroundColor: '#fff', padding: 16, borderRadius: 14, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 2 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#2d6a4f', marginBottom: 10 },
  smilesBox: { backgroundColor: '#1b4332', padding: 12, borderRadius: 8 },
  smilesText: { color: '#74c69d', fontFamily: 'monospace', fontSize: 13 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  infoLabel: { fontSize: 13, color: '#6c757d', fontWeight: '600' },
  infoValue: { fontSize: 13, color: '#2b2d42', fontWeight: 'bold' },
  bodyText: { fontSize: 14, color: '#495057', lineHeight: 20 }
});