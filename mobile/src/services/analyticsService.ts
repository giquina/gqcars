import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Booking, User, ServiceType } from '../types';

interface AnalyticsEvent {
  eventName: string;
  properties: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
  platform: string;
  appVersion: string;
  deviceInfo: DeviceInfo;
}

interface DeviceInfo {
  deviceId: string;
  deviceType: string;
  osVersion: string;
  screenDimensions: {
    width: number;
    height: number;
  };
  isEmulator: boolean;
}

interface UserMetrics {
  totalBookings: number;
  totalSpent: number;
  averageBookingValue: number;
  favoriteServiceType: ServiceType;
  averageRating: number;
  lastBookingDate: Date;
  lifetimeValue: number;
  churnRisk: 'low' | 'medium' | 'high';
  preferredBookingTimes: number[];
}

interface AppPerformanceMetrics {
  appLaunchTime: number;
  screenLoadTimes: Record<string, number>;
  apiResponseTimes: Record<string, number[]>;
  crashCount: number;
  errorCount: number;
  memoryUsage: number;
  networkRequests: NetworkMetric[];
}

interface NetworkMetric {
  url: string;
  method: string;
  responseTime: number;
  statusCode: number;
  timestamp: number;
}

interface BookingAnalytics {
  conversionFunnel: {
    viewedServices: number;
    startedBooking: number;
    completedForm: number;
    confirmedBooking: number;
    completedRide: number;
  };
  dropOffPoints: Record<string, number>;
  averageBookingTime: number;
  popularServiceTypes: Record<ServiceType, number>;
  peakBookingHours: number[];
  cancellationReasons: Record<string, number>;
}

export class AnalyticsService {
  private static sessionId: string = '';
  private static userId: string | null = null;
  private static deviceInfo: DeviceInfo | null = null;
  private static eventQueue: AnalyticsEvent[] = [];
  private static isInitialized = false;

  // Event batching configuration
  private static readonly BATCH_SIZE = 20;
  private static readonly FLUSH_INTERVAL = 30000; // 30 seconds
  private static flushTimer: NodeJS.Timeout | null = null;

  static async initialize(userId?: string): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.sessionId = this.generateSessionId();
      this.userId = userId || null;
      this.deviceInfo = await this.getDeviceInfo();

      // Load queued events from storage
      await this.loadQueuedEvents();

      // Start batch flushing
      this.startBatchFlushing();

      // Track app launch
      this.trackEvent('app_launched', {
        launch_time: Date.now(),
        is_first_launch: await this.isFirstLaunch(),
      });

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  static setUserId(userId: string): void {
    this.userId = userId;
    this.trackEvent('user_identified', { user_id: userId });
  }

  static trackEvent(eventName: string, properties: Record<string, any> = {}): void {
    try {
      const event: AnalyticsEvent = {
        eventName,
        properties: {
          ...properties,
          timestamp: Date.now(),
        },
        timestamp: Date.now(),
        userId: this.userId,
        sessionId: this.sessionId,
        platform: Platform.OS,
        appVersion: Application.nativeApplicationVersion || '1.0.0',
        deviceInfo: this.deviceInfo!,
      };

      this.eventQueue.push(event);

      // Flush immediately for critical events
      if (this.isCriticalEvent(eventName)) {
        this.flushEvents();
      } else if (this.eventQueue.length >= this.BATCH_SIZE) {
        this.flushEvents();
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  static trackScreen(screenName: string, properties: Record<string, any> = {}): void {
    this.trackEvent('screen_view', {
      screen_name: screenName,
      ...properties,
    });
  }

  static trackBookingEvent(eventType: string, booking: Partial<Booking>, additionalProps: Record<string, any> = {}): void {
    this.trackEvent(`booking_${eventType}`, {
      booking_id: booking.id,
      service_type: booking.serviceType,
      pickup_location: booking.pickupLocation?.address,
      dropoff_location: booking.dropoffLocation?.address,
      passenger_count: booking.passengerCount,
      estimated_price: booking.estimatedPrice,
      ...additionalProps,
    });
  }

  static trackUserAction(action: string, target: string, properties: Record<string, any> = {}): void {
    this.trackEvent('user_action', {
      action,
      target,
      ...properties,
    });
  }

  static trackError(error: Error, context: string, additionalInfo: Record<string, any> = {}): void {
    this.trackEvent('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context,
      ...additionalInfo,
    });
  }

  static trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.trackEvent('performance_metric', {
      metric,
      value,
      unit,
    });
  }

  static trackAPICall(endpoint: string, method: string, responseTime: number, statusCode: number): void {
    this.trackEvent('api_call', {
      endpoint,
      method,
      response_time: responseTime,
      status_code: statusCode,
      success: statusCode >= 200 && statusCode < 300,
    });
  }

  // Business Intelligence Methods
  static async getUserMetrics(userId: string): Promise<UserMetrics> {
    try {
      // This would typically fetch from your analytics database
      const bookingEvents = await this.getStoredEvents('booking_completed', userId);
      
      const totalBookings = bookingEvents.length;
      const totalSpent = bookingEvents.reduce((sum, event) => 
        sum + (event.properties.final_price || 0), 0
      );
      
      const serviceTypeCounts = bookingEvents.reduce((counts, event) => {
        const serviceType = event.properties.service_type;
        counts[serviceType] = (counts[serviceType] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);
      
      const favoriteServiceType = Object.entries(serviceTypeCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] as ServiceType || ServiceType.PRIVATE_HIRE;

      const bookingTimes = bookingEvents.map(event => 
        new Date(event.timestamp).getHours()
      );
      
      const preferredBookingTimes = this.getTopValues(bookingTimes, 3);

      return {
        totalBookings,
        totalSpent,
        averageBookingValue: totalBookings > 0 ? totalSpent / totalBookings : 0,
        favoriteServiceType,
        averageRating: 4.5, // Would calculate from rating events
        lastBookingDate: bookingEvents.length > 0 
          ? new Date(Math.max(...bookingEvents.map(e => e.timestamp)))
          : new Date(),
        lifetimeValue: totalSpent,
        churnRisk: this.calculateChurnRisk(bookingEvents),
        preferredBookingTimes,
      };
    } catch (error) {
      console.error('Failed to get user metrics:', error);
      throw error;
    }
  }

  static async getAppPerformanceMetrics(): Promise<AppPerformanceMetrics> {
    try {
      const performanceEvents = await this.getStoredEvents('performance_metric');
      const apiEvents = await this.getStoredEvents('api_call');
      const errorEvents = await this.getStoredEvents('error_occurred');

      const screenLoadTimes = performanceEvents
        .filter(e => e.properties.metric === 'screen_load_time')
        .reduce((times, event) => {
          const screen = event.properties.screen_name;
          times[screen] = event.properties.value;
          return times;
        }, {} as Record<string, number>);

      const apiResponseTimes = apiEvents.reduce((times, event) => {
        const endpoint = event.properties.endpoint;
        if (!times[endpoint]) times[endpoint] = [];
        times[endpoint].push(event.properties.response_time);
        return times;
      }, {} as Record<string, number[]>);

      const networkRequests: NetworkMetric[] = apiEvents.map(event => ({
        url: event.properties.endpoint,
        method: event.properties.method,
        responseTime: event.properties.response_time,
        statusCode: event.properties.status_code,
        timestamp: event.timestamp,
      }));

      return {
        appLaunchTime: 0, // Would track launch time
        screenLoadTimes,
        apiResponseTimes,
        crashCount: 0, // Would track crashes
        errorCount: errorEvents.length,
        memoryUsage: 0, // Would track memory usage
        networkRequests,
      };
    } catch (error) {
      console.error('Failed to get app performance metrics:', error);
      throw error;
    }
  }

  static async getBookingAnalytics(): Promise<BookingAnalytics> {
    try {
      const bookingEvents = await this.getStoredEvents('booking_');
      
      const funnelEvents = {
        viewedServices: await this.getEventCount('screen_view', { screen_name: 'Services' }),
        startedBooking: await this.getEventCount('booking_started'),
        completedForm: await this.getEventCount('booking_form_completed'),
        confirmedBooking: await this.getEventCount('booking_confirmed'),
        completedRide: await this.getEventCount('booking_completed'),
      };

      const serviceTypeCounts = bookingEvents
        .filter(e => e.eventName === 'booking_completed')
        .reduce((counts, event) => {
          const serviceType = event.properties.service_type as ServiceType;
          counts[serviceType] = (counts[serviceType] || 0) + 1;
          return counts;
        }, {} as Record<ServiceType, number>);

      const bookingHours = bookingEvents
        .filter(e => e.eventName === 'booking_started')
        .map(e => new Date(e.timestamp).getHours());

      const cancellationEvents = await this.getStoredEvents('booking_cancelled');
      const cancellationReasons = cancellationEvents.reduce((reasons, event) => {
        const reason = event.properties.reason || 'unknown';
        reasons[reason] = (reasons[reason] || 0) + 1;
        return reasons;
      }, {} as Record<string, number>);

      return {
        conversionFunnel: funnelEvents,
        dropOffPoints: {}, // Would analyze where users drop off
        averageBookingTime: 0, // Would calculate booking completion time
        popularServiceTypes: serviceTypeCounts,
        peakBookingHours: this.getTopValues(bookingHours, 5),
        cancellationReasons,
      };
    } catch (error) {
      console.error('Failed to get booking analytics:', error);
      throw error;
    }
  }

  // Advanced Analytics
  static generateUserInsights(userMetrics: UserMetrics): string[] {
    const insights: string[] = [];

    if (userMetrics.totalBookings > 10) {
      insights.push('High-value customer with frequent bookings');
    }

    if (userMetrics.averageBookingValue > 100) {
      insights.push('Premium service preferences detected');
    }

    if (userMetrics.churnRisk === 'high') {
      insights.push('Customer at risk of churning - consider retention offer');
    }

    const daysSinceLastBooking = Math.floor(
      (Date.now() - userMetrics.lastBookingDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastBooking > 30) {
      insights.push('Customer has not booked recently - re-engagement needed');
    }

    return insights;
  }

  // Private methods
  private static async getDeviceInfo(): Promise<DeviceInfo> {
    return {
      deviceId: await this.getDeviceId(),
      deviceType: Device.modelName || 'Unknown',
      osVersion: Platform.Version.toString(),
      screenDimensions: { width: 0, height: 0 }, // Would get actual dimensions
      isEmulator: !Device.isDevice,
    };
  }

  private static async getDeviceId(): Promise<string> {
    try {
      let deviceId = await AsyncStorage.getItem('analytics_device_id');
      if (!deviceId) {
        deviceId = this.generateUUID();
        await AsyncStorage.setItem('analytics_device_id', deviceId);
      }
      return deviceId;
    } catch (error) {
      return this.generateUUID();
    }
  }

  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private static async isFirstLaunch(): Promise<boolean> {
    try {
      const hasLaunched = await AsyncStorage.getItem('has_launched_before');
      if (!hasLaunched) {
        await AsyncStorage.setItem('has_launched_before', 'true');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  private static isCriticalEvent(eventName: string): boolean {
    const criticalEvents = [
      'app_crashed',
      'payment_failed',
      'booking_failed',
      'error_occurred'
    ];
    return criticalEvents.includes(eventName);
  }

  private static startBatchFlushing(): void {
    this.flushTimer = setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.flushEvents();
      }
    }, this.FLUSH_INTERVAL);
  }

  private static async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    try {
      const eventsToFlush = [...this.eventQueue];
      this.eventQueue = [];

      // Store events locally for offline capability
      await this.storeEventsLocally(eventsToFlush);

      // Send to analytics service
      await this.sendEventsToServer(eventsToFlush);
    } catch (error) {
      console.error('Failed to flush events:', error);
      // Re-queue events if sending failed
      this.eventQueue.unshift(...this.eventQueue);
    }
  }

  private static async storeEventsLocally(events: AnalyticsEvent[]): Promise<void> {
    try {
      const existingEvents = await AsyncStorage.getItem('analytics_events');
      const storedEvents = existingEvents ? JSON.parse(existingEvents) : [];
      
      const allEvents = [...storedEvents, ...events];
      
      // Keep only last 1000 events to manage storage
      const recentEvents = allEvents.slice(-1000);
      
      await AsyncStorage.setItem('analytics_events', JSON.stringify(recentEvents));
    } catch (error) {
      console.error('Failed to store events locally:', error);
    }
  }

  private static async loadQueuedEvents(): Promise<void> {
    try {
      const storedEvents = await AsyncStorage.getItem('analytics_events_queue');
      if (storedEvents) {
        const events = JSON.parse(storedEvents);
        this.eventQueue.push(...events);
        await AsyncStorage.removeItem('analytics_events_queue');
      }
    } catch (error) {
      console.error('Failed to load queued events:', error);
    }
  }

  private static async sendEventsToServer(events: AnalyticsEvent[]): Promise<void> {
    // This would send events to your analytics backend
    // For now, we'll just log them
    console.log('Sending analytics events:', events.length);
  }

  private static async getStoredEvents(eventPrefix: string, userId?: string): Promise<AnalyticsEvent[]> {
    try {
      const storedEvents = await AsyncStorage.getItem('analytics_events');
      if (!storedEvents) return [];

      const events: AnalyticsEvent[] = JSON.parse(storedEvents);
      
      return events.filter(event => 
        event.eventName.startsWith(eventPrefix) &&
        (!userId || event.userId === userId)
      );
    } catch (error) {
      console.error('Failed to get stored events:', error);
      return [];
    }
  }

  private static async getEventCount(eventName: string, properties?: Record<string, any>): Promise<number> {
    const events = await this.getStoredEvents(eventName);
    
    if (!properties) return events.length;
    
    return events.filter(event => {
      return Object.entries(properties).every(([key, value]) => 
        event.properties[key] === value
      );
    }).length;
  }

  private static getTopValues<T>(values: T[], limit: number): T[] {
    const counts = values.reduce((acc, value) => {
      acc[value as any] = (acc[value as any] || 0) + 1;
      return acc;
    }, {} as Record<any, number>);

    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([value]) => value as T);
  }

  private static calculateChurnRisk(bookingEvents: AnalyticsEvent[]): 'low' | 'medium' | 'high' {
    if (bookingEvents.length === 0) return 'high';
    
    const lastBooking = Math.max(...bookingEvents.map(e => e.timestamp));
    const daysSinceLastBooking = (Date.now() - lastBooking) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastBooking > 60) return 'high';
    if (daysSinceLastBooking > 30) return 'medium';
    return 'low';
  }

  static cleanup(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    
    // Flush any remaining events
    if (this.eventQueue.length > 0) {
      this.flushEvents();
    }
  }
}

export default AnalyticsService;