import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  User, 
  AuthTokens, 
  LoginCredentials, 
  RegisterCredentials, 
  Booking, 
  BookingRequest, 
  ApiResponse, 
  PaginatedResponse,
  ContactForm 
} from '../types';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.gqcarssecurity.com';

class ApiService {
  private api: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            await this.logout();
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();
    
    try {
      const token = await this.refreshPromise;
      return token;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    
    await AsyncStorage.multiSet([
      ['access_token', accessToken],
      ['refresh_token', newRefreshToken],
    ]);

    return accessToken;
  }

  // Authentication endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    const response: AxiosResponse<ApiResponse<{ user: User; tokens: AuthTokens }>> = 
      await this.api.post('/auth/login', credentials);
    
    if (response.data.success && response.data.data) {
      await AsyncStorage.multiSet([
        ['access_token', response.data.data.tokens.accessToken],
        ['refresh_token', response.data.data.tokens.refreshToken],
        ['user', JSON.stringify(response.data.data.user)],
      ]);
    }

    return response.data;
  }

  async register(credentials: RegisterCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    const response: AxiosResponse<ApiResponse<{ user: User; tokens: AuthTokens }>> = 
      await this.api.post('/auth/register', credentials);
    
    if (response.data.success && response.data.data) {
      await AsyncStorage.multiSet([
        ['access_token', response.data.data.tokens.accessToken],
        ['refresh_token', response.data.data.tokens.refreshToken],
        ['user', JSON.stringify(response.data.data.user)],
      ]);
    }

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = 
      await this.api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = 
      await this.api.post('/auth/reset-password', { token, password });
    return response.data;
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.get('/users/me');
    return response.data;
  }

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = 
      await this.api.put('/users/me', updates);
    
    if (response.data.success && response.data.data) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
    }

    return response.data;
  }

  async uploadProfileImage(imageUri: string): Promise<ApiResponse<{ imageUrl: string }>> {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);

    const response: AxiosResponse<ApiResponse<{ imageUrl: string }>> = 
      await this.api.post('/users/me/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    return response.data;
  }

  // Booking endpoints
  async createBooking(bookingRequest: BookingRequest): Promise<ApiResponse<Booking>> {
    const response: AxiosResponse<ApiResponse<Booking>> = 
      await this.api.post('/bookings', bookingRequest);
    return response.data;
  }

  async getBookings(page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<Booking>>> {
    const response: AxiosResponse<ApiResponse<PaginatedResponse<Booking>>> = 
      await this.api.get('/bookings', { params: { page, limit } });
    return response.data;
  }

  async getBooking(id: string): Promise<ApiResponse<Booking>> {
    const response: AxiosResponse<ApiResponse<Booking>> = 
      await this.api.get(`/bookings/${id}`);
    return response.data;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<ApiResponse<Booking>> {
    const response: AxiosResponse<ApiResponse<Booking>> = 
      await this.api.put(`/bookings/${id}`, updates);
    return response.data;
  }

  async cancelBooking(id: string, reason?: string): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = 
      await this.api.post(`/bookings/${id}/cancel`, { reason });
    return response.data;
  }

  async getBookingEstimate(bookingRequest: Omit<BookingRequest, 'specialRequirements'>): Promise<ApiResponse<{ estimatedPrice: number; estimatedDuration: number }>> {
    const response: AxiosResponse<ApiResponse<{ estimatedPrice: number; estimatedDuration: number }>> = 
      await this.api.post('/bookings/estimate', bookingRequest);
    return response.data;
  }

  // Location endpoints
  async searchPlaces(query: string): Promise<ApiResponse<Array<{ placeId: string; description: string; address: string }>>> {
    const response: AxiosResponse<ApiResponse<Array<{ placeId: string; description: string; address: string }>>> = 
      await this.api.get('/places/search', { params: { query } });
    return response.data;
  }

  async getPlaceDetails(placeId: string): Promise<ApiResponse<{ address: string; latitude: number; longitude: number }>> {
    const response: AxiosResponse<ApiResponse<{ address: string; latitude: number; longitude: number }>> = 
      await this.api.get(`/places/${placeId}`);
    return response.data;
  }

  // Push notification endpoints
  async registerPushToken(token: string): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = 
      await this.api.post('/notifications/register-token', { token });
    return response.data;
  }

  async updateNotificationPreferences(preferences: Record<string, boolean>): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = 
      await this.api.put('/notifications/preferences', preferences);
    return response.data;
  }

  // Contact endpoints
  async submitContactForm(form: ContactForm): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = 
      await this.api.post('/contact', form);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.api.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;