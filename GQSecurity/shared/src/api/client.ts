import axios from 'axios';
import type { APIResponse, User, Booking, Quote, Contact } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.gqsecurity.co.uk';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<APIResponse<{ token: string; user: User }>> => {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    },
    register: async (userData: Partial<User>): Promise<APIResponse<User>> => {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    },
    verifyEmail: async (token: string): Promise<APIResponse<void>> => {
      const response = await apiClient.post('/auth/verify-email', { token });
      return response.data;
    },
    resetPassword: async (email: string): Promise<APIResponse<void>> => {
      const response = await apiClient.post('/auth/reset-password', { email });
      return response.data;
    },
  },

  bookings: {
    create: async (bookingData: Partial<Booking>): Promise<APIResponse<Booking>> => {
      const response = await apiClient.post('/bookings', bookingData);
      return response.data;
    },
    list: async (params?: { page?: number; limit?: number }): Promise<APIResponse<Booking[]>> => {
      const response = await apiClient.get('/bookings', { params });
      return response.data;
    },
    get: async (id: string): Promise<APIResponse<Booking>> => {
      const response = await apiClient.get(`/bookings/${id}`);
      return response.data;
    },
    update: async (id: string, data: Partial<Booking>): Promise<APIResponse<Booking>> => {
      const response = await apiClient.patch(`/bookings/${id}`, data);
      return response.data;
    },
    cancel: async (id: string): Promise<APIResponse<void>> => {
      const response = await apiClient.post(`/bookings/${id}/cancel`);
      return response.data;
    },
  },

  quotes: {
    generate: async (data: Partial<Quote>): Promise<APIResponse<Quote>> => {
      const response = await apiClient.post('/quotes', data);
      return response.data;
    },
    accept: async (id: string): Promise<APIResponse<Booking>> => {
      const response = await apiClient.post(`/quotes/${id}/accept`);
      return response.data;
    },
  },

  contact: {
    submit: async (data: Partial<Contact>): Promise<APIResponse<Contact>> => {
      const response = await apiClient.post('/contact', data);
      return response.data;
    },
    emergency: async (data: Partial<Contact>): Promise<APIResponse<Contact>> => {
      const response = await apiClient.post('/contact/emergency', data);
      return response.data;
    },
  },

  profile: {
    get: async (): Promise<APIResponse<User>> => {
      const response = await apiClient.get('/profile');
      return response.data;
    },
    update: async (data: Partial<User>): Promise<APIResponse<User>> => {
      const response = await apiClient.patch('/profile', data);
      return response.data;
    },
    uploadDocument: async (file: File): Promise<APIResponse<{ url: string }>> => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/profile/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  },
};

export default api;