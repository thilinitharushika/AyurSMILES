import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.badge}>🌿 Offline Chemoinformatics</Text>
        <Text style={styles.title}>AyurSMILES</Text>
        <Text style={styles.subtitle}>Medicinal Compound & Plant Analyzer</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.buttonText}>Explore Compounds 🧪</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.secondaryButtonText}>Search & Filter 🔍</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.secondaryButtonText}>Saved Favorites ⭐</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>100% Offline Local Dataset Ready 📱</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', justifyContent: 'space-between', padding: 20 },
  headerContainer: { alignItems: 'center', marginTop: 40 },
  badge: { backgroundColor: '#e2f0d9', color: '#385723', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, fontSize: 12, fontWeight: 'bold', overflow: 'hidden', marginBottom: 10 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1b4332' },
  subtitle: { fontSize: 14, color: '#52796f', marginTop: 5, textAlign: 'center' },
  cardContainer: { width: '100%', gap: 15 },
  primaryButton: { backgroundColor: '#2d6a4f', padding: 18, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', padding: 18, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#d8f3dc' },
  secondaryButtonText: { color: '#2d6a4f', fontSize: 16, fontWeight: 'bold' },
  footer: { alignItems: 'center', marginBottom: 20 },
  footerText: { color: '#8d99ae', fontSize: 12 }
});