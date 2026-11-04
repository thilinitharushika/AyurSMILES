import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function DetailScreen({ route }) {
  const { compound } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{compound ? compound.name : 'Compound Details'}</Text>
        <Text style={styles.subtitle}>🌿 {compound ? compound.plantSource : ''}</Text>
        <Text style={styles.text}>Category: {compound?.category}</Text>
        <Text style={styles.text}>SMILES: {compound?.smiles}</Text>
        <Text style={styles.text}>Molecular Weight: {compound?.molecularWeight}</Text>
        <Text style={styles.desc}>{compound?.description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, elevation: 2 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2d6a4f', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#52796f', marginBottom: 15 },
  text: { fontSize: 14, color: '#495057', marginBottom: 8 },
  desc: { fontSize: 14, color: '#6c757d', marginTop: 10, fontStyle: 'italic' }
});