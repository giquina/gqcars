import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  User, 
  LoginCredentials, 
  RegisterCredentials, 
  BiometricInfo,
  BiometricType 
} from '../types';
import apiService from './api';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private authListeners: Array<(user: User | null) => void> = [];

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        this.currentUser = JSON.parse(userString);
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    }
  }

  // Authentication methods
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiService.login(credentials);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Login failed');
    }

    this.currentUser = response.data.user;
    this.notifyListeners();
    
    return response.data.user;
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await apiService.register(credentials);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Registration failed');
    }

    this.currentUser = response.data.user;
    this.notifyListeners();
    
    return response.data.user;
  }

  async logout(): Promise<void> {
    await apiService.logout();
    await this.clearBiometricCredentials();
    this.currentUser = null;
    this.notifyListeners();
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiService.forgotPassword(email);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  }

  // Biometric authentication
  async getBiometricInfo(): Promise<BiometricInfo> {
    const isSupported = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const availableTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    const mappedTypes: BiometricType[] = availableTypes.map(type => {
      switch (type) {
        case LocalAuthentication.AuthenticationType.FINGERPRINT:
          return BiometricType.FINGERPRINT;
        case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
          return BiometricType.FACE_ID;
        case LocalAuthentication.AuthenticationType.IRIS:
          return BiometricType.IRIS;
        default:
          return BiometricType.FINGERPRINT;
      }
    });

    return {
      isSupported,
      isEnrolled,
      availableTypes: mappedTypes,
    };
  }

  async enableBiometricAuth(credentials: LoginCredentials): Promise<void> {
    const biometricInfo = await this.getBiometricInfo();
    
    if (!biometricInfo.isSupported || !biometricInfo.isEnrolled) {
      throw new Error('Biometric authentication is not available on this device');
    }

    // First verify the credentials
    await this.login(credentials);

    // Then authenticate with biometrics to confirm setup
    const biometricResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Enable biometric authentication',
      subPromptMessage: 'Use your biometric to enable quick login',
      cancelLabel: 'Cancel',
      fallbackLabel: 'Use password',
    });

    if (!biometricResult.success) {
      throw new Error('Biometric authentication failed');
    }

    // Store credentials securely for biometric login
    await SecureStore.setItemAsync('biometric_email', credentials.email);
    await SecureStore.setItemAsync('biometric_password', credentials.password);
    await AsyncStorage.setItem('biometric_enabled', 'true');
  }

  async authenticateWithBiometrics(): Promise<User> {
    const biometricEnabled = await AsyncStorage.getItem('biometric_enabled');
    
    if (!biometricEnabled) {
      throw new Error('Biometric authentication is not enabled');
    }

    const biometricResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with biometrics',
      subPromptMessage: 'Use your biometric to sign in',
      cancelLabel: 'Cancel',
      fallbackLabel: 'Use password',
    });

    if (!biometricResult.success) {
      throw new Error('Biometric authentication failed');
    }

    // Retrieve stored credentials
    const email = await SecureStore.getItemAsync('biometric_email');
    const password = await SecureStore.getItemAsync('biometric_password');

    if (!email || !password) {
      throw new Error('Biometric credentials not found');
    }

    return this.login({ email, password });
  }

  async disableBiometricAuth(): Promise<void> {
    await this.clearBiometricCredentials();
  }

  private async clearBiometricCredentials(): Promise<void> {
    await SecureStore.deleteItemAsync('biometric_email').catch(() => {});
    await SecureStore.deleteItemAsync('biometric_password').catch(() => {});
    await AsyncStorage.removeItem('biometric_enabled').catch(() => {});
  }

  async isBiometricEnabled(): Promise<boolean> {
    const enabled = await AsyncStorage.getItem('biometric_enabled');
    return enabled === 'true';
  }

  // User management
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async refreshUser(): Promise<User | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      const response = await apiService.getCurrentUser();
      
      if (response.success && response.data) {
        this.currentUser = response.data;
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        this.notifyListeners();
        return response.data;
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, user might need to re-authenticate
      await this.logout();
    }

    return null;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiService.updateProfile(updates);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Profile update failed');
    }

    this.currentUser = response.data;
    this.notifyListeners();
    
    return response.data;
  }

  // Auth state listeners
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);
    
    // Call immediately with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      const index = this.authListeners.indexOf(callback);
      if (index > -1) {
        this.authListeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.authListeners.forEach(callback => callback(this.currentUser));
  }

  // Token management
  async hasValidToken(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) return false;

      // Try to make an authenticated request to verify token
      const response = await apiService.getCurrentUser();
      return response.success;
    } catch {
      return false;
    }
  }

  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem('access_token');
  }
}

export const authService = AuthService.getInstance();
export default authService;