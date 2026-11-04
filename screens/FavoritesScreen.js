import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>⭐ Saved Favorites Screen Coming Soon!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, color: '#2d6a4f', fontWeight: 'bold' }
});