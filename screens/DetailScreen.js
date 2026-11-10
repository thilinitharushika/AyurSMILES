import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function DetailScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { compound } = route.params || {};

  if (!compound) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>No compound data provided.</Text>
      </SafeAreaView>
    );
  }

  // Handle SMILES Clipboard Copy
  const handleCopySmiles = async () => {
    if (compound.smiles) {
      if (Clipboard.setStringAsync) {
        await Clipboard.setStringAsync(compound.smiles);
      }
      if (Platform.OS === 'web') {
        alert(t.copiedSuccess || 'SMILES Copied!');
      } else {
        Alert.alert('Copied', t.copiedSuccess || 'SMILES Copied to Clipboard!');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Compound Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.badgeRow}>
            <Text style={[styles.categoryBadge, { backgroundColor: theme.badgeBg, color: theme.badgeText }]}>
              {compound.category || 'Phytochemical'}
            </Text>
            <Text style={[
              styles.lipinskiBadge, 
              compound.lipinskiPass ? styles.passBadge : styles.failBadge
            ]}>
              {compound.lipinskiPass ? (t.lipinskiPass || 'Lipinski: Pass ✅') : (t.lipinskiAlert || 'Lipinski: Alert ⚠️')}
            </Text>
          </View>

          <Text style={[styles.title, { color: theme.primary }]}>{compound.name}</Text>
          <Text style={[styles.plantSource, { color: theme.subText }]}>
            🌿 {compound.plantSource}
          </Text>
        </View>

        {/* SMILES Chemical Structure Box */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            🧬 {t.smilesStructure || 'SMILES Chemical Structure'}
          </Text>
          
          <View style={[styles.smilesBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text selectable style={[styles.smilesText, { color: theme.primary }]}>
              {compound.smiles || 'N/A'}
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.copyBtn, { backgroundColor: theme.primary }]}
            onPress={handleCopySmiles}
            activeOpacity={0.8}
          >
            <Text style={styles.copyBtnText}>📋 {t.copySmiles || 'Copy SMILES'}</Text>
          </TouchableOpacity>
        </View>

        {/* Cheminformatics Descriptors Grid */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            📊 {t.chemicalDescriptors || 'Cheminformatics Descriptors'}
          </Text>

          <View style={styles.gridContainer}>
            {/* Molecular Weight */}
            <View style={[styles.gridCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.gridLabel, { color: theme.subText }]}>{t.molecularWeight || 'MW'}</Text>
              <Text style={[styles.gridValue, { color: theme.text }]}>{compound.molecularWeight || 'N/A'}</Text>
              <Text style={[styles.gridUnit, { color: theme.subText }]}>g/mol</Text>
            </View>

            {/* LogP */}
            <View style={[styles.gridCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.gridLabel, { color: theme.subText }]}>{t.logP || 'LogP'}</Text>
              <Text style={[styles.gridValue, { color: theme.text }]}>{compound.logP ?? 'N/A'}</Text>
              <Text style={[styles.gridUnit, { color: theme.subText }]}>lipophilicity</Text>
            </View>

            {/* H-Donors */}
            <View style={[styles.gridCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.gridLabel, { color: theme.subText }]}>{t.hDonors || 'H-Donors'}</Text>
              <Text style={[styles.gridValue, { color: theme.text }]}>{compound.hBondDonors ?? 'N/A'}</Text>
              <Text style={[styles.gridUnit, { color: theme.subText }]}>donors</Text>
            </View>

            {/* H-Acceptors */}
            <View style={[styles.gridCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Text style={[styles.gridLabel, { color: theme.subText }]}>{t.hAcceptors || 'H-Acceptors'}</Text>
              <Text style={[styles.gridValue, { color: theme.text }]}>{compound.hBondAcceptors ?? 'N/A'}</Text>
              <Text style={[styles.gridUnit, { color: theme.subText }]}>acceptors</Text>
            </View>

            {/* TPSA */}
            <View style={[styles.gridCardWide, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View>
                <Text style={[styles.gridLabel, { color: theme.subText }]}>{t.tpsa || 'TPSA (Polar Surface Area)'}</Text>
                <Text style={[styles.gridValue, { color: theme.text }]}>{compound.tpsa ? `${compound.tpsa} Å²` : 'N/A'}</Text>
              </View>
              <Text style={styles.tpsaIcon}>🌐</Text>
            </View>
          </View>
        </View>

        {/* Botanical & Traditional Profile */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            📖 {t.botanicalDetails || 'Botanical & Traditional Profile'}
          </Text>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>{t.plantSourceLabel || 'Botanical Source'}:</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{compound.plantSource}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>{t.categoryLabel || 'Class'}:</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{compound.category}</Text>
          </View>

          <View style={styles.detailDivider} />

          <Text style={[styles.detailLabel, { color: theme.subText, marginBottom: 4 }]}>
            {t.traditionalUseLabel || 'Traditional Use'}:
          </Text>
          <Text style={[styles.descriptionText, { color: theme.text }]}>
            {compound.traditionalUse || compound.description}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  errorText: { fontSize: 16, textAlign: 'center', marginTop: 40 },
  heroCard: { padding: 18, borderRadius: 16, borderWidth: 1, marginBottom: 16, elevation: 2 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryBadge: { fontSize: 11, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  lipinskiBadge: { fontSize: 11, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  passBadge: { backgroundColor: '#d8f3dc', color: '#1b4332' },
  failBadge: { backgroundColor: '#ffccd5', color: '#c9184a' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 4 },
  plantSource: { fontSize: 14, fontWeight: '600' },
  sectionCard: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 16, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  smilesBox: { padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 12 },
  smilesText: { fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', fontSize: 13, lineHeight: 18, fontWeight: '600' },
  copyBtn: { paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  copyBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridCard: { width: '48%', padding: 12, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  gridCardWide: { width: '100%', padding: 14, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  gridLabel: { fontSize: 11, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  gridValue: { fontSize: 18, fontWeight: 'bold' },
  gridUnit: { fontSize: 10, marginTop: 2 },
  tpsaIcon: { fontSize: 24 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { fontSize: 13, fontWeight: '600' },
  detailValue: { fontSize: 13, fontWeight: 'bold' },
  detailDivider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 10 },
  descriptionText: { fontSize: 13, lineHeight: 20 }
});