import { useState, useEffect } from 'react';
import { Booking, BookingRequest, PaginatedResponse } from '../types';
import apiService from '../services/api';

interface UseBookingsReturn {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  refreshing: boolean;
  createBooking: (request: BookingRequest) => Promise<Booking>;
  getBooking: (id: string) => Promise<Booking>;
  cancelBooking: (id: string, reason?: string) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  getEstimate: (request: Omit<BookingRequest, 'specialRequirements'>) => Promise<{ estimatedPrice: number; estimatedDuration: number }>;
  clearError: () => void;
}

export const useBookings = (): UseBookingsReturn => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  useEffect(() => {
    loadBookings(1, true);
  }, []);

  const handleError = (error: any) => {
    const message = error.message || 'An unexpected error occurred';
    setError(message);
    console.error('Booking error:', error);
  };

  const clearError = () => {
    setError(null);
  };

  const loadBookings = async (page: number = 1, replace: boolean = false): Promise<void> => {
    try {
      if (replace) {
        setIsLoading(true);
      }
      setError(null);

      const response = await apiService.getBookings(page, limit);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to load bookings');
      }

      const paginatedResponse: PaginatedResponse<Booking> = response.data;

      if (replace) {
        setBookings(paginatedResponse.data);
      } else {
        setBookings(prev => [...prev, ...paginatedResponse.data]);
      }

      setHasMore(paginatedResponse.hasMore);
      setCurrentPage(page);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const refresh = async (): Promise<void> => {
    setRefreshing(true);
    setCurrentPage(1);
    setHasMore(true);
    await loadBookings(1, true);
  };

  const loadMore = async (): Promise<void> => {
    if (!hasMore || isLoading) return;
    await loadBookings(currentPage + 1, false);
  };

  const createBooking = async (request: BookingRequest): Promise<Booking> => {
    try {
      setError(null);
      const response = await apiService.createBooking(request);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to create booking');
      }

      const newBooking = response.data;
      setBookings(prev => [newBooking, ...prev]);
      
      return newBooking;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const getBooking = async (id: string): Promise<Booking> => {
    try {
      setError(null);
      const response = await apiService.getBooking(id);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to load booking');
      }

      const booking = response.data;
      
      // Update local state if booking exists
      setBookings(prev => prev.map(b => b.id === id ? booking : b));
      
      return booking;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const cancelBooking = async (id: string, reason?: string): Promise<void> => {
    try {
      setError(null);
      const response = await apiService.cancelBooking(id, reason);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to cancel booking');
      }

      // Update local state to reflect cancellation
      setBookings(prev => prev.map(booking => 
        booking.id === id 
          ? { ...booking, status: 'cancelled' as any }
          : booking
      ));
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const getEstimate = async (
    request: Omit<BookingRequest, 'specialRequirements'>
  ): Promise<{ estimatedPrice: number; estimatedDuration: number }> => {
    try {
      setError(null);
      const response = await apiService.getBookingEstimate(request);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to get estimate');
      }

      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  return {
    bookings,
    isLoading,
    error,
    hasMore,
    refreshing,
    createBooking,
    getBooking,
    cancelBooking,
    loadMore,
    refresh,
    getEstimate,
    clearError,
  };
};