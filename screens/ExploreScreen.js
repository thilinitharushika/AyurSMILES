import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import compoundsData from '../data/compounds.json';

export default function ExploreScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useLanguage();

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
      
      <Text style={[styles.useText, { color: theme.text }]} numberOfLines={2}>
        {item.traditionalUse}
      </Text>

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
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t.exploreCompounds}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.subText }]}>
          {compoundsData.length} {t.showingIndexed}
        </Text>
      </View>

      <FlatList
        data={compoundsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  headerContainer: { 
    marginBottom: 14 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  headerSubtitle: { 
    fontSize: 13, 
    marginTop: 2 
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
    marginBottom: 8 
  },
  useText: { 
    fontSize: 13, 
    marginBottom: 12, 
    lineHeight: 18 
  },
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
  }
});