import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
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
      
      <Text style={styles.plantSource} numberOfLines={1}>🌿 {item.plantSource}</Text>
      
      <Text style={styles.useText} numberOfLines={2}>
        {item.traditionalUse}
      </Text>

      <View style={styles.footerRow}>
        <Text style={[
          styles.lipinskiTag, 
          item.lipinskiPass ? styles.passTag : styles.failTag
        ]}>
          {item.lipinskiPass ? 'Lipinski: Pass ✅' : 'Lipinski: Alert ⚠️'}
        </Text>
        <Text style={styles.mwText}>MW: {item.molecularWeight}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Explore Compounds</Text>
        <Text style={styles.headerSubtitle}>
          Showing {compoundsData.length} indexed traditional medicinal compounds
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
    backgroundColor: '#f4f7f6', 
    paddingHorizontal: 16, 
    paddingTop: 10 
  },
  headerContainer: { 
    marginBottom: 14 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1b4332' 
  },
  headerSubtitle: { 
    fontSize: 13, 
    color: '#52796f', 
    marginTop: 2 
  },
  listContainer: { 
    paddingBottom: 20 
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 14, 
    marginBottom: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
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
    fontWeight: 'bold', 
    color: '#2d6a4f' 
  },
  categoryBadge: { 
    backgroundColor: '#e2f0d9', 
    color: '#385723', 
    fontSize: 10, 
    fontWeight: 'bold', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    overflow: 'hidden' 
  },
  plantSource: { 
    fontSize: 13, 
    color: '#52796f', 
    fontWeight: '600', 
    marginBottom: 8 
  },
  useText: { 
    fontSize: 13, 
    color: '#495057', 
    marginBottom: 12, 
    lineHeight: 18 
  },
  footerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0', 
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
    color: '#6c757d', 
    fontWeight: '500' 
  }
});