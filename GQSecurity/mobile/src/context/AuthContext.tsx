import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { User } from '../../shared/src/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  biometricAvailable: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithBiometric: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  enableBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
    checkAuthState();
  }, []);

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setBiometricAvailable(compatible && enrolled);
  };

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Validate token with backend
        const response = await fetch('https://api.gqcars.com/auth/validate', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          await AsyncStorage.removeItem('authToken');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.gqcars.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const { user: userData, token } = await response.json();
      
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userEmail', email);
      
      // Store credentials securely for biometric login
      await SecureStore.setItemAsync('userCredentials', JSON.stringify({ email, password }));
      
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithBiometric = async () => {
    if (!biometricAvailable) {
      throw new Error('Biometric authentication not available');
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access GQ Cars',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      const credentials = await SecureStore.getItemAsync('userCredentials');
      if (credentials) {
        const { email, password } = JSON.parse(credentials);
        await login(email, password);
      } else {
        throw new Error('No stored credentials found');
      }
    } else {
      throw new Error('Biometric authentication failed');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userEmail');
    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.gqcars.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      // Auto-login after registration
      await login(email, password);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const enableBiometric = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    if (!email) {
      throw new Error('No user logged in');
    }
    
    // This would typically re-authenticate and store credentials
    // For now, we'll assume credentials are already stored
  };

  const disableBiometric = async () => {
    await SecureStore.deleteItemAsync('userCredentials');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    biometricAvailable,
    login,
    loginWithBiometric,
    logout,
    register,
    enableBiometric,
    disableBiometric,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};