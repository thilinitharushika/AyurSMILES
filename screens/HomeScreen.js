import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import compoundsData from '../data/compounds.json';

export default function HomeScreen({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  // Pick a daily featured compound (e.g., Curcumin or first entry)
  const featuredCompound = compoundsData[0] || {};
  const totalCompounds = compoundsData.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top App Header & Theme Switcher */}
        <View style={styles.topHeader}>
          <View>
            <Text style={[styles.appTitle, { color: theme.text }]}>AyurSMILES 🌿</Text>
            <Text style={[styles.appSubtitle, { color: theme.subText }]}>
              Offline Medicinal Compound Analyzer
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.themeBtn, { backgroundColor: theme.primary }]} 
            onPress={toggleTheme}
            activeOpacity={0.8}
          >
            <Text style={styles.themeBtnText}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats Dashboard Card */}
        <View style={[styles.statsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.statsTitle, { color: theme.primary }]}>Database Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: theme.text }]}>{totalCompounds}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Indexed Plants</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: theme.text }]}>100%</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Offline Ready</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: theme.text }]}>2</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Languages</Text>
            </View>
          </View>
        </View>

        {/* Daily Featured Plant Banner */}
        {featuredCompound.name && (
          <View style={[styles.featuredCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.featuredBadgeRow}>
              <Text style={styles.featuredBadge}>FEATURED COMPOUND</Text>
              <Text style={[styles.categoryBadge, { backgroundColor: theme.badgeBg, color: theme.badgeText }]}>
                {featuredCompound.category}
              </Text>
            </View>

            <Text style={[styles.featuredTitle, { color: theme.text }]}>
              {featuredCompound.name}
            </Text>
            <Text style={[styles.featuredPlant, { color: theme.subText }]}>
              🌿 {featuredCompound.plantSource}
            </Text>

            <Text style={[styles.featuredDesc, { color: theme.text }]} numberOfLines={2}>
              {featuredCompound.description}
            </Text>

            <TouchableOpacity 
              style={[styles.viewDetailsBtn, { backgroundColor: theme.primary }]}
              onPress={() => navigation.navigate('Detail', { compound: featuredCompound })}
            >
              <Text style={styles.viewDetailsBtnText}>Explore Molecule Data →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Navigation Cards */}
        <Text style={[styles.sectionHeader, { color: theme.text }]}>Quick Actions</Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate('Explore')}
          >
            <Text style={styles.actionIcon}>🔬</Text>
            <Text style={[styles.actionTitle, { color: theme.text }]}>Explore All</Text>
            <Text style={[styles.actionDesc, { color: theme.subText }]}>Browse full dataset</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={[styles.actionTitle, { color: theme.text }]}>Search & Filter</Text>
            <Text style={[styles.actionDesc, { color: theme.subText }]}>Find by Sinhala/Tamil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Text style={styles.actionIcon}>⭐</Text>
            <Text style={[styles.actionTitle, { color: theme.text }]}>Favorites</Text>
            <Text style={[styles.actionDesc, { color: theme.subText }]}>Saved bookmarks</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollContent: { 
    padding: 16, 
    paddingBottom: 30 
  },
  topHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  appTitle: { 
    fontSize: 26, 
    fontWeight: 'bold' 
  },
  appSubtitle: { 
    fontSize: 13, 
    marginTop: 2 
  },
  themeBtn: { 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20 
  },
  themeBtnText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 12 
  },
  statsCard: { 
    padding: 16, 
    borderRadius: 14, 
    marginBottom: 16, 
    borderWidth: 1,
    elevation: 2 
  },
  statsTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  statBox: { 
    alignItems: 'center' 
  },
  statNumber: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  statLabel: { 
    fontSize: 11, 
    marginTop: 2 
  },
  statDivider: { 
    width: 1, 
    height: 24, 
    backgroundColor: '#d8f3dc' 
  },
  featuredCard: { 
    padding: 16, 
    borderRadius: 14, 
    marginBottom: 20, 
    borderWidth: 1,
    elevation: 2 
  },
  featuredBadgeRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  featuredBadge: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#e76f51', 
    letterSpacing: 0.5 
  },
  categoryBadge: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 6, 
    overflow: 'hidden' 
  },
  featuredTitle: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  featuredPlant: { 
    fontSize: 13, 
    fontWeight: '600', 
    marginBottom: 8 
  },
  featuredDesc: { 
    fontSize: 13, 
    lineHeight: 18, 
    marginBottom: 14 
  },
  viewDetailsBtn: { 
    paddingVertical: 10, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  viewDetailsBtnText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  quickActionsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 10 
  },
  actionCard: { 
    flex: 1, 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    elevation: 2 
  },
  actionIcon: { 
    fontSize: 24, 
    marginBottom: 6 
  },
  actionTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    marginBottom: 2, 
    textAlign: 'center' 
  },
  actionDesc: { 
    fontSize: 10, 
    textAlign: 'center' 
  }
});