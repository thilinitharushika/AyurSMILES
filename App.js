import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Contexts
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          elevation: 8,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subText,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Compendium') {
            iconName = focused ? 'flask' : 'flask-outline';
          } else if (route.name === 'FavoritesTab') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Compendium" 
        component={HomeScreen} 
        options={{ title: t.compendiumTab || 'Compendium' }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesScreen} 
        options={{ title: t.favoritesTab || 'Favorites' }}
      />
    </Tab.Navigator>
  );
}

function MainAppStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={({ route }) => ({ 
          title: route.params?.compound?.name || 'Compound Details' 
        })} 
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Prevents render flicker while AsyncStorage session loads
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {user ? <MainAppStack /> : <AuthScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <FavoritesProvider>
              <RootNavigator />
            </FavoritesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}