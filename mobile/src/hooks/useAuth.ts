import { useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import authService from '../services/auth';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  enableBiometric: (credentials: LoginCredentials) => Promise<void>;
  loginWithBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
  isBiometricEnabled: () => Promise<boolean>;
  error: string | null;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleError = (error: any) => {
    const message = error.message || 'An unexpected error occurred';
    setError(message);
    console.error('Auth error:', error);
  };

  const clearError = () => {
    setError(null);
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.login(credentials);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.register(credentials);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await authService.forgotPassword(email);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      setError(null);
      await authService.refreshUser();
    } catch (error) {
      handleError(error);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      setError(null);
      await authService.updateProfile(updates);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const enableBiometric = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setError(null);
      await authService.enableBiometricAuth(credentials);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const loginWithBiometric = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.authenticateWithBiometrics();
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disableBiometric = async (): Promise<void> => {
    try {
      setError(null);
      await authService.disableBiometricAuth();
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const isBiometricEnabled = async (): Promise<boolean> => {
    try {
      return await authService.isBiometricEnabled();
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    refreshUser,
    updateProfile,
    enableBiometric,
    loginWithBiometric,
    disableBiometric,
    isBiometricEnabled,
    error,
    clearError,
  };
};