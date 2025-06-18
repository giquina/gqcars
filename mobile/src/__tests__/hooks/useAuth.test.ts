import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/auth';

// Mock the auth service
jest.mock('../../services/auth');

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should handle login success', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      createdAt: '2023-01-01',
      isVerified: true,
    };

    (authService.login as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle login error', async () => {
    const error = new Error('Invalid credentials');
    (authService.login as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.login({
          email: 'test@example.com',
          password: 'wrong-password',
        });
      } catch (e) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Invalid credentials');
    expect(result.current.isLoading).toBe(false);
  });

  it('should clear error', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should handle logout', async () => {
    (authService.logout as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(authService.logout).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle biometric login', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      createdAt: '2023-01-01',
      isVerified: true,
    };

    (authService.authenticateWithBiometrics as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.loginWithBiometric();
    });

    expect(authService.authenticateWithBiometrics).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});