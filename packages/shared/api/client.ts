import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Platform detection (works for both web and React Native)
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
const isWeb = typeof window !== 'undefined';

// API configuration
const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://gqcars.vercel.app/api'
    : isWeb 
      ? 'http://localhost:3000/api'
      : 'http://10.0.2.2:3000/api', // Android emulator localhost
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Platform': isReactNative ? 'mobile' : 'web',
    'X-App-Version': '1.0.0',
    'X-User-Agent': isReactNative ? 'GQCars-Mobile/1.0' : 'GQCars-Web/1.0'
  }
};

// Create axios instance
export const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor for authentication
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get auth token (platform-specific)
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add request timestamp and ID for tracking
      config.headers['X-Request-Time'] = new Date().toISOString();
      config.headers['X-Request-ID'] = generateRequestId();
      
      // Add device info for mobile
      if (isReactNative) {
        const deviceInfo = await getDeviceInfo();
        config.headers['X-Device-Info'] = JSON.stringify(deviceInfo);
      }
      
      return config;
    } catch (error) {
      console.error('API Request interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Success: ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log API errors
    console.error(`❌ API Error: ${error.response?.status} - ${error.config?.url}`, error.response?.data);
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        await refreshAuthToken();
        const newToken = await getAuthToken();
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Redirect to login
        await handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }
    
    // Handle rate limiting (429)
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 60;
      console.warn(`Rate limited. Retry after ${retryAfter} seconds`);
      
      // In mobile, show user-friendly message
      if (isReactNative) {
        // This would trigger a toast/alert in React Native
        showRateLimitMessage(retryAfter);
      }
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - check internet connection');
      if (isReactNative) {
        showNetworkErrorMessage();
      }
    }
    
    return Promise.reject(error);
  }
);

// Platform-specific auth token retrieval
async function getAuthToken(): Promise<string | null> {
  if (isWeb) {
    // Web: Use localStorage
    return localStorage.getItem('auth_token');
  } else if (isReactNative) {
    // Mobile: Use AsyncStorage
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    return AsyncStorage.default.getItem('auth_token');
  }
  return null;
}

// Platform-specific auth token storage
async function storeAuthToken(token: string): Promise<void> {
  if (isWeb) {
    localStorage.setItem('auth_token', token);
  } else if (isReactNative) {
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    await AsyncStorage.default.setItem('auth_token', token);
  }
}

// Platform-specific refresh token retrieval
async function getRefreshToken(): Promise<string | null> {
  if (isWeb) {
    return localStorage.getItem('refresh_token');
  } else if (isReactNative) {
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    return AsyncStorage.default.getItem('refresh_token');
  }
  return null;
}

// Platform-specific token refresh
async function refreshAuthToken(): Promise<void> {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/auth/refresh`, { refreshToken });
      await storeAuthToken(response.data.accessToken);
      
      if (response.data.refreshToken) {
        if (isWeb) {
          localStorage.setItem('refresh_token', response.data.refreshToken);
        } else if (isReactNative) {
          const AsyncStorage = await import('@react-native-async-storage/async-storage');
          await AsyncStorage.default.setItem('refresh_token', response.data.refreshToken);
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}

// Platform-specific auth failure handling
async function handleAuthFailure(): Promise<void> {
  // Clear stored tokens
  if (isWeb) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    // Redirect to login page
    window.location.href = '/auth/login';
  } else if (isReactNative) {
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    await AsyncStorage.default.multiRemove(['auth_token', 'refresh_token']);
    
    // Navigate to login screen (requires navigation context)
    // This would need to be implemented with React Navigation
    console.log('Navigate to login screen');
  }
}

// Generate unique request ID
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get device info for mobile requests
async function getDeviceInfo(): Promise<any> {
  if (!isReactNative) return {};
  
  try {
    // This would require expo-device or react-native-device-info
    return {
      platform: 'mobile',
      os: 'unknown', // Would be filled by device info library
      version: '1.0.0'
    };
  } catch (error) {
    return { platform: 'mobile' };
  }
}

// Show rate limit message (mobile-specific)
function showRateLimitMessage(retryAfter: number): void {
  // This would be implemented with a toast or alert library
  console.warn(`Too many requests. Please wait ${retryAfter} seconds before trying again.`);
}

// Show network error message (mobile-specific)
function showNetworkErrorMessage(): void {
  // This would be implemented with a toast or alert library
  console.error('Network error. Please check your internet connection and try again.');
}

// API endpoints configuration
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  
  // User management
  user: {
    profile: '/user/profile',
    preferences: '/user/preferences',
    avatar: '/user/avatar',
    emergencyContacts: '/user/emergency-contacts'
  },
  
  // Bookings
  bookings: {
    list: '/bookings',
    create: '/bookings',
    get: (id: string) => `/bookings/${id}`,
    update: (id: string) => `/bookings/${id}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    tracking: (id: string) => `/bookings/${id}/tracking`
  },
  
  // Quotes
  quotes: {
    calculate: '/quotes/calculate',
    save: '/quotes/save',
    list: '/quotes'
  },
  
  // Security Assessment
  security: {
    assessment: '/security/assessment',
    recommendations: '/security/recommendations'
  },
  
  // Maps and Location
  maps: {
    autocomplete: '/maps/autocomplete',
    directions: '/maps/directions',
    geocode: '/maps/geocode'
  },
  
  // Payments
  payments: {
    methods: '/payments/methods',
    process: '/payments/process',
    history: '/payments/history'
  },
  
  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    preferences: '/notifications/preferences'
  },
  
  // Admin (if applicable)
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    bookings: '/admin/bookings',
    analytics: '/admin/analytics'
  }
};

// Helper functions for common API operations
export const apiHelpers = {
  // GET request with error handling
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },
  
  // POST request with error handling
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  
  // PUT request with error handling
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },
  
  // DELETE request with error handling
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
  
  // File upload helper
  uploadFile: async (url: string, file: File | any, onProgress?: (progress: number) => void): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
  }
};

export default apiClient;