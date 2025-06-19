import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { Colors } from '../constants/Colors';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  colors: typeof Colors;
  setThemeMode: (mode: ThemeMode) => void;
}

const lightColors = {
  ...Colors,
  background: '#ffffff',
  secondary: '#f8fafc',
  text: {
    primary: '#030712',
    secondary: '#374151',
    muted: '#6b7280',
    inverse: '#ffffff',
  },
  card: '#ffffff',
  border: '#e5e7eb',
  input: '#f9fafb',
};

const darkColors = Colors;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    loadThemePreference();
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme === 'light' ? 'light' : 'dark');
    });

    return () => subscription?.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem('themeMode');
      if (saved) {
        setThemeModeState(saved as ThemeMode);
      }
      
      const currentScheme = Appearance.getColorScheme();
      setSystemTheme(currentScheme === 'light' ? 'light' : 'dark');
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const currentTheme = themeMode === 'auto' ? systemTheme : themeMode;
  const colors = currentTheme === 'light' ? lightColors : darkColors;

  const value = {
    theme: currentTheme,
    themeMode,
    colors,
    setThemeMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};