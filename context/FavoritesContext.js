import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('user_favorites');
      if (saved) {
        setFavoriteIds(JSON.parse(saved));
      }
    } catch (error) {
      console.log('Error loading favorites from AsyncStorage:', error);
    }
  };

  const toggleFavorite = async (compoundId) => {
    try {
      let updated;
      if (favoriteIds.includes(compoundId)) {
        updated = favoriteIds.filter((id) => id !== compoundId);
      } else {
        updated = [...favoriteIds, compoundId];
      }
      setFavoriteIds(updated);
      await AsyncStorage.setItem('user_favorites', JSON.stringify(updated));
    } catch (error) {
      console.log('Error saving favorite to AsyncStorage:', error);
    }
  };

  const isFavorite = (compoundId) => favoriteIds.includes(compoundId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);