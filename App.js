import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import DetailScreen from './screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: theme.card },
        headerTitleStyle: { color: theme.text },
        tabBarStyle: { 
          backgroundColor: theme.card, 
          borderTopColor: theme.border 
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: '#8d99ae',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t.appTitle.split(' ')[0] }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ tabBarLabel: t.exploreAll }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: t.searchFilter.split(' ')[0] }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: t.favorites }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name="MainTabs" 
                component={MainTabs} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Detail" 
                component={DetailScreen} 
                options={{ title: 'Compound Details' }} 
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}