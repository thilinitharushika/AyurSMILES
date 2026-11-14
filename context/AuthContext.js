import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    try {
      const activeUser = await AsyncStorage.getItem('ayursmiles_active_user');
      if (activeUser) {
        setUser(JSON.parse(activeUser));
      }
    } catch (error) {
      console.log('Error loading user session:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name, email, password, role = 'Researcher') => {
    try {
      const existingUsersRaw = await AsyncStorage.getItem('ayursmiles_users');
      const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const emailExists = existingUsers.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (emailExists) {
        return { success: false, message: 'An account with this email already exists.' };
      }

      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      };

      const updatedUsers = [...existingUsers, newUser];
      await AsyncStorage.setItem('ayursmiles_users', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('ayursmiles_active_user', JSON.stringify(newUser));
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to create account.' };
    }
  };

  const signIn = async (email, password) => {
    try {
      const existingUsersRaw = await AsyncStorage.getItem('ayursmiles_users');
      const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const matchedUser = existingUsers.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!matchedUser) {
        return { success: false, message: 'Invalid email or password.' };
      }

      await AsyncStorage.setItem('ayursmiles_active_user', JSON.stringify(matchedUser));
      setUser(matchedUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Error signing in.' };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('ayursmiles_active_user');
      setUser(null);
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);