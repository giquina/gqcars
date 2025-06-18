import { AuthService } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import apiService from '../../services/api';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage');
jest.mock('expo-secure-store');
jest.mock('expo-local-authentication');
jest.mock('../../services/api');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Reset singleton instance
    (AuthService as any).instance = undefined;
    authService = AuthService.getInstance();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        createdAt: '2023-01-01',
        isVerified: true,
      };

      const mockResponse = {
        success: true,
        data: {
          user: mockUser,
          tokens: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
          },
        },
      };

      (apiService.login as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual(mockUser);
      expect(apiService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });

    it('should throw error on login failure', async () => {
      const mockResponse = {
        success: false,
        message: 'Invalid credentials',
      };

      (apiService.login as jest.Mock).mockResolvedValue(mockResponse);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrong-password',
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('biometric authentication', () => {
    it('should get biometric info', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FINGERPRINT,
      ]);

      const info = await authService.getBiometricInfo();

      expect(info).toEqual({
        isSupported: true,
        isEnrolled: true,
        availableTypes: ['fingerprint'],
      });
    });

    it('should enable biometric authentication', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        createdAt: '2023-01-01',
        isVerified: true,
      };

      // Mock successful login
      (apiService.login as jest.Mock).mockResolvedValue({
        success: true,
        data: { user: mockUser, tokens: {} },
      });

      // Mock biometric support
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FINGERPRINT,
      ]);

      // Mock successful biometric authentication
      (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
        success: true,
      });

      const credentials = { email: 'test@example.com', password: 'password' };
      await authService.enableBiometricAuth(credentials);

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('biometric_email', 'test@example.com');
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('biometric_password', 'password');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('biometric_enabled', 'true');
    });

    it('should authenticate with biometrics', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        createdAt: '2023-01-01',
        isVerified: true,
      };

      // Mock biometric enabled
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('true');

      // Mock successful biometric authentication
      (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
        success: true,
      });

      // Mock stored credentials
      (SecureStore.getItemAsync as jest.Mock)
        .mockResolvedValueOnce('test@example.com')
        .mockResolvedValueOnce('password');

      // Mock successful login
      (apiService.login as jest.Mock).mockResolvedValue({
        success: true,
        data: { user: mockUser, tokens: {} },
      });

      const result = await authService.authenticateWithBiometrics();

      expect(result).toEqual(mockUser);
      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalled();
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('biometric_email');
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('biometric_password');
    });
  });

  describe('auth state management', () => {
    it('should notify listeners of auth state changes', () => {
      const listener = jest.fn();
      const unsubscribe = authService.onAuthStateChanged(listener);

      // Should call immediately with current state
      expect(listener).toHaveBeenCalledWith(null);

      // Cleanup
      unsubscribe();
    });

    it('should check if user is authenticated', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should get current user', () => {
      expect(authService.getCurrentUser()).toBeNull();
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      await authService.logout();

      expect(apiService.logout).toHaveBeenCalled();
      expect(authService.getCurrentUser()).toBeNull();
    });
  });
});