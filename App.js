import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import SearchScreen from './screens/SearchScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: '#2d6a4f' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Explore" component={ExploreScreen} options={{ title: 'Catalog Explorer' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search & Filter' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Compound Details' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Saved Favorites' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}