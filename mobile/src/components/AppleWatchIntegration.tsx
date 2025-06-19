import React, { useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import { WatchConnectivity } from '@react-native-community/watch-connectivity';
import { Booking, ServiceType } from '../types';
import { AnalyticsService } from '../services/analyticsService';
import { SmartNotificationService } from '../services/smartNotifications';

interface WatchBookingData {
  id: string;
  status: string;
  driverName: string;
  vehicleInfo: string;
  eta: string;
  pickupAddress: string;
  serviceType: ServiceType;
}

interface WatchMessage {
  type: 'booking_update' | 'driver_location' | 'user_action' | 'quick_book';
  data: any;
  timestamp: number;
}

interface AppleWatchIntegrationProps {
  currentBooking?: Booking | null;
  onQuickBooking?: (serviceType: ServiceType) => void;
  onWatchAction?: (action: string, data: any) => void;
}

export class AppleWatchService {
  private static isInitialized = false;
  private static watchSession: any = null;
  private static currentBookingData: WatchBookingData | null = null;

  static async initialize(): Promise<void> {
    if (Platform.OS !== 'ios') {
      console.log('Apple Watch only available on iOS');
      return;
    }

    try {
      this.watchSession = new WatchConnectivity();
      
      // Check if watch is available and paired
      const isSupported = await this.watchSession.isSupported();
      const isPaired = await this.watchSession.isPaired();
      const isWatchAppInstalled = await this.watchSession.isWatchAppInstalled();

      if (!isSupported || !isPaired) {
        console.log('Apple Watch not available or not paired');
        return;
      }

      if (!isWatchAppInstalled) {
        console.log('Watch app not installed');
        // Could prompt user to install watch app
        return;
      }

      // Set up message handlers
      this.setupMessageHandlers();

      // Activate session
      await this.watchSession.activateSession();
      
      this.isInitialized = true;
      
      AnalyticsService.trackEvent('apple_watch_connected', {
        watch_paired: isPaired,
        watch_app_installed: isWatchAppInstalled,
      });

      console.log('Apple Watch connectivity initialized');
    } catch (error) {
      console.error('Failed to initialize Apple Watch connectivity:', error);
      AnalyticsService.trackError(error as Error, 'AppleWatchService.initialize');
    }
  }

  private static setupMessageHandlers(): void {
    if (!this.watchSession) return;

    // Handle messages from watch
    this.watchSession.addListener('message', (message: any) => {
      this.handleWatchMessage(message);
    });

    // Handle application context updates
    this.watchSession.addListener('applicationContext', (context: any) => {
      this.handleApplicationContext(context);
    });

    // Handle file transfers
    this.watchSession.addListener('file', (file: any) => {
      this.handleFileTransfer(file);
    });
  }

  private static handleWatchMessage(message: WatchMessage): void {
    try {
      AnalyticsService.trackEvent('watch_message_received', {
        message_type: message.type,
        timestamp: message.timestamp,
      });

      switch (message.type) {
        case 'user_action':
          this.handleWatchUserAction(message.data);
          break;
        case 'quick_book':
          this.handleQuickBooking(message.data);
          break;
        default:
          console.log('Unknown watch message type:', message.type);
      }
    } catch (error) {
      console.error('Failed to handle watch message:', error);
    }
  }

  private static handleWatchUserAction(data: any): void {
    const { action, bookingId, additionalData } = data;

    switch (action) {
      case 'call_driver':
        // Trigger phone call from main app
        this.sendMessageToApp('call_driver', { bookingId });
        break;
      case 'cancel_booking':
        this.sendMessageToApp('cancel_booking', { bookingId });
        break;
      case 'rate_driver':
        this.sendMessageToApp('rate_driver', { bookingId, rating: additionalData.rating });
        break;
      case 'share_eta':
        this.sendMessageToApp('share_eta', { bookingId });
        break;
      default:
        console.log('Unknown watch action:', action);
    }
  }

  private static handleQuickBooking(data: any): void {
    const { serviceType, pickupLocation } = data;
    
    // Trigger quick booking in main app
    this.sendMessageToApp('quick_book', {
      serviceType,
      pickupLocation: pickupLocation || 'current_location',
      source: 'apple_watch',
    });
  }

  private static handleApplicationContext(context: any): void {
    // Handle context updates from watch
    console.log('Watch context updated:', context);
  }

  private static handleFileTransfer(file: any): void {
    // Handle file transfers from watch (e.g., voice messages)
    console.log('File received from watch:', file);
  }

  private static sendMessageToApp(type: string, data: any): void {
    // This would typically trigger callbacks in the main app
    console.log('Sending message to app:', type, data);
    
    // Could use event emitters or callbacks here
    // For now, we'll use analytics to track the action
    AnalyticsService.trackEvent('watch_action_triggered', {
      action_type: type,
      data: JSON.stringify(data),
    });
  }

  static async sendBookingUpdate(booking: Booking): Promise<void> {
    if (!this.isInitialized || !this.watchSession) return;

    try {
      const watchData: WatchBookingData = {
        id: booking.id,
        status: booking.status,
        driverName: booking.driver ? `${booking.driver.firstName} ${booking.driver.lastName}` : 'Assigned',
        vehicleInfo: booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : 'Vehicle',
        eta: booking.estimatedArrival || 'Calculating...',
        pickupAddress: this.truncateAddress(booking.pickupLocation.address),
        serviceType: booking.serviceType,
      };

      await this.watchSession.sendMessage({
        type: 'booking_update',
        data: watchData,
        timestamp: Date.now(),
      });

      this.currentBookingData = watchData;

      AnalyticsService.trackEvent('watch_booking_update_sent', {
        booking_id: booking.id,
        booking_status: booking.status,
      });
    } catch (error) {
      console.error('Failed to send booking update to watch:', error);
    }
  }

  static async sendDriverLocation(location: any, eta: string): Promise<void> {
    if (!this.isInitialized || !this.watchSession) return;

    try {
      await this.watchSession.sendMessage({
        type: 'driver_location',
        data: {
          latitude: location.latitude,
          longitude: location.longitude,
          eta,
          timestamp: Date.now(),
        },
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Failed to send driver location to watch:', error);
    }
  }

  static async updateApplicationContext(context: any): Promise<void> {
    if (!this.isInitialized || !this.watchSession) return;

    try {
      await this.watchSession.updateApplicationContext(context);
    } catch (error) {
      console.error('Failed to update watch application context:', error);
    }
  }

  static async sendQuickBookingOptions(): Promise<void> {
    if (!this.isInitialized || !this.watchSession) return;

    try {
      const quickBookingOptions = [
        { 
          id: ServiceType.PRIVATE_HIRE, 
          name: 'Private Hire', 
          icon: 'car',
          estimatedTime: '5-10 min' 
        },
        { 
          id: ServiceType.CORPORATE, 
          name: 'Corporate', 
          icon: 'briefcase',
          estimatedTime: '10-15 min' 
        },
        { 
          id: ServiceType.VIP, 
          name: 'VIP Service', 
          icon: 'star',
          estimatedTime: '15-20 min' 
        },
      ];

      await this.watchSession.sendMessage({
        type: 'quick_booking_options',
        data: quickBookingOptions,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Failed to send quick booking options to watch:', error);
    }
  }

  static async sendComplicationData(): Promise<void> {
    if (!this.isInitialized || !this.watchSession) return;

    try {
      let complicationData = {};

      if (this.currentBookingData) {
        complicationData = {
          status: this.currentBookingData.status,
          eta: this.currentBookingData.eta,
          driver: this.currentBookingData.driverName,
          hasActiveBooking: true,
        };
      } else {
        complicationData = {
          hasActiveBooking: false,
          quickBookText: 'Book Now',
        };
      }

      await this.watchSession.updateApplicationContext({
        complication: complicationData,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Failed to update watch complication:', error);
    }
  }

  private static truncateAddress(address: string): string {
    if (address.length <= 30) return address;
    
    // Try to keep the street name and number
    const parts = address.split(',');
    if (parts.length > 0 && parts[0].length <= 30) {
      return parts[0].trim();
    }
    
    return address.substring(0, 27) + '...';
  }

  static async handleWatchCommand(command: string, data: any): Promise<void> {
    switch (command) {
      case 'book_ride':
        await this.handleWatchBookRide(data);
        break;
      case 'track_driver':
        await this.handleWatchTrackDriver(data);
        break;
      case 'contact_driver':
        await this.handleWatchContactDriver(data);
        break;
      default:
        console.log('Unknown watch command:', command);
    }
  }

  private static async handleWatchBookRide(data: any): Promise<void> {
    // Handle ride booking from watch
    AnalyticsService.trackEvent('watch_ride_booked', {
      service_type: data.serviceType,
      pickup_type: data.pickupLocation,
    });
  }

  private static async handleWatchTrackDriver(data: any): Promise<void> {
    // Handle driver tracking request from watch
    AnalyticsService.trackEvent('watch_track_driver', {
      booking_id: data.bookingId,
    });
  }

  private static async handleWatchContactDriver(data: any): Promise<void> {
    // Handle driver contact request from watch
    AnalyticsService.trackEvent('watch_contact_driver', {
      booking_id: data.bookingId,
      contact_type: data.contactType,
    });
  }

  static cleanup(): void {
    if (this.watchSession) {
      try {
        this.watchSession.removeAllListeners();
      } catch (error) {
        console.error('Failed to cleanup watch session:', error);
      }
    }
    this.isInitialized = false;
    this.currentBookingData = null;
  }
}

// React component for Apple Watch integration
export const AppleWatchIntegration: React.FC<AppleWatchIntegrationProps> = ({
  currentBooking,
  onQuickBooking,
  onWatchAction,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    initializeWatch();
    return () => {
      AppleWatchService.cleanup();
    };
  }, []);

  useEffect(() => {
    if (currentBooking) {
      AppleWatchService.sendBookingUpdate(currentBooking);
    }
    AppleWatchService.sendComplicationData();
  }, [currentBooking]);

  const initializeWatch = async () => {
    try {
      await AppleWatchService.initialize();
      setIsConnected(true);
      
      // Send initial data to watch
      await AppleWatchService.sendQuickBookingOptions();
      await AppleWatchService.sendComplicationData();
    } catch (error) {
      console.error('Failed to initialize Apple Watch:', error);
    }
  };

  // This component doesn't render anything visible
  // It just manages the watch connectivity
  return null;
};

export default AppleWatchService;