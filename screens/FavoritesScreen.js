import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import compoundsData from '../data/compounds.json';

export default function FavoritesScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const savedCompounds = compoundsData.filter((c) => favoriteIds.includes(c.id));

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={() => navigation.navigate('Detail', { compound: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.compoundName, { color: theme.primary }]}>{item.name}</Text>
        <TouchableOpacity 
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="heart" size={20} color="#e63946" />
        </TouchableOpacity>
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t.favorites}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.subText }]}>
          {savedCompounds.length} {t.savedBookmarks || 'Saved bookmarks'}
        </Text>
      </View>

      <FlatList
        data={savedCompounds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={48} color={theme.subText} style={{ marginBottom: 12 }} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>{t.noFavoritesTitle}</Text>
            <Text style={[styles.emptySubtext, { color: theme.subText }]}>
              {t.noFavoritesSubtext}
            </Text>
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
  },
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: 60, 
    paddingHorizontal: 24 
  },
  emptyTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  emptySubtext: { 
    fontSize: 13, 
    textAlign: 'center', 
    lineHeight: 18
  }})