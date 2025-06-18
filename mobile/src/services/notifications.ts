import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PushNotification, NotificationType } from '../types';
import apiService from './api';

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {
  private static instance: NotificationService;
  private notificationListeners: Array<(notification: PushNotification) => void> = [];
  private isInitialized = false;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Request permissions
      await this.requestPermissions();
      
      // Register for push notifications
      const token = await this.registerForPushNotifications();
      if (token) {
        await this.registerTokenWithBackend(token);
      }

      // Set up notification listeners
      this.setupNotificationListeners();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  private async requestPermissions(): Promise<boolean> {
    if (!Device.isDevice) {
      console.warn('Must use physical device for Push Notifications');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Push notification permissions not granted');
      return false;
    }

    return true;
  }

  private async registerForPushNotifications(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
      });

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('booking-updates', {
          name: 'Booking Updates',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });

        await Notifications.setNotificationChannelAsync('driver-updates', {
          name: 'Driver Updates',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      // Store token locally
      await AsyncStorage.setItem('push_token', token.data);
      
      return token.data;
    } catch (error) {
      console.error('Failed to get push token:', error);
      return null;
    }
  }

  private async registerTokenWithBackend(token: string): Promise<void> {
    try {
      await apiService.registerPushToken(token);
    } catch (error) {
      console.error('Failed to register push token with backend:', error);
    }
  }

  private setupNotificationListeners(): void {
    // Handle notification received while app is foregrounded
    Notifications.addNotificationReceivedListener((notification) => {
      const pushNotification = this.mapNotificationToPushNotification(notification);
      this.notifyListeners(pushNotification);
    });

    // Handle notification response (when user taps notification)
    Notifications.addNotificationResponseReceivedListener((response) => {
      const pushNotification = this.mapNotificationToPushNotification(response.notification);
      this.handleNotificationResponse(pushNotification);
    });
  }

  private mapNotificationToPushNotification(notification: Notifications.Notification): PushNotification {
    return {
      id: notification.request.identifier,
      title: notification.request.content.title || '',
      body: notification.request.content.body || '',
      data: notification.request.content.data,
      type: (notification.request.content.data?.type as NotificationType) || NotificationType.BOOKING_CONFIRMED,
    };
  }

  private handleNotificationResponse(notification: PushNotification): void {
    // Handle navigation based on notification type
    switch (notification.type) {
      case NotificationType.BOOKING_CONFIRMED:
      case NotificationType.DRIVER_ASSIGNED:
      case NotificationType.DRIVER_ARRIVED:
        // Navigate to booking details
        if (notification.data?.bookingId) {
          // Navigation will be handled by the app navigator
          this.notifyListeners({
            ...notification,
            data: { ...notification.data, action: 'navigate_to_booking' }
          });
        }
        break;
      case NotificationType.BOOKING_CANCELLED:
        // Show cancellation details
        this.notifyListeners({
          ...notification,
          data: { ...notification.data, action: 'show_cancellation' }
        });
        break;
      case NotificationType.PAYMENT_PROCESSED:
        // Navigate to payment confirmation
        this.notifyListeners({
          ...notification,
          data: { ...notification.data, action: 'show_payment_confirmation' }
        });
        break;
    }
  }

  // Public methods
  async scheduleLocalNotification(
    title: string,
    body: string,
    data?: Record<string, any>,
    scheduledTime?: Date
  ): Promise<string> {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: scheduledTime ? { date: scheduledTime } : null,
    });

    return identifier;
  }

  async cancelNotification(identifier: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async getBadgeCount(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
  }

  async setBadgeCount(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  }

  async clearBadge(): Promise<void> {
    await Notifications.setBadgeCountAsync(0);
  }

  async getNotificationPermissions(): Promise<Notifications.NotificationPermissionsStatus> {
    return await Notifications.getPermissionsAsync();
  }

  async updateNotificationPreferences(preferences: Record<string, boolean>): Promise<void> {
    try {
      await apiService.updateNotificationPreferences(preferences);
      await AsyncStorage.setItem('notification_preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      throw error;
    }
  }

  async getNotificationPreferences(): Promise<Record<string, boolean>> {
    try {
      const preferencesString = await AsyncStorage.getItem('notification_preferences');
      return preferencesString ? JSON.parse(preferencesString) : {
        bookingConfirmed: true,
        driverAssigned: true,
        driverArrived: true,
        bookingCancelled: true,
        paymentProcessed: true,
        promotions: false,
      };
    } catch (error) {
      console.error('Failed to get notification preferences:', error);
      return {
        bookingConfirmed: true,
        driverAssigned: true,
        driverArrived: true,
        bookingCancelled: true,
        paymentProcessed: true,
        promotions: false,
      };
    }
  }

  // Event listeners
  onNotificationReceived(callback: (notification: PushNotification) => void): () => void {
    this.notificationListeners.push(callback);
    
    return () => {
      const index = this.notificationListeners.indexOf(callback);
      if (index > -1) {
        this.notificationListeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(notification: PushNotification): void {
    this.notificationListeners.forEach(callback => callback(notification));
  }

  // Booking-specific notification helpers
  async notifyBookingConfirmed(bookingId: string): Promise<void> {
    await this.scheduleLocalNotification(
      'Booking Confirmed',
      'Your booking has been confirmed. We\'ll notify you when a driver is assigned.',
      { type: NotificationType.BOOKING_CONFIRMED, bookingId }
    );
  }

  async notifyDriverAssigned(bookingId: string, driverName: string): Promise<void> {
    await this.scheduleLocalNotification(
      'Driver Assigned',
      `${driverName} will be your driver. They\'re on their way to pick you up.`,
      { type: NotificationType.DRIVER_ASSIGNED, bookingId }
    );
  }

  async notifyDriverArrived(bookingId: string): Promise<void> {
    await this.scheduleLocalNotification(
      'Driver Arrived',
      'Your driver has arrived at the pickup location.',
      { type: NotificationType.DRIVER_ARRIVED, bookingId }
    );
  }

  async notifyBookingCancelled(bookingId: string, reason?: string): Promise<void> {
    await this.scheduleLocalNotification(
      'Booking Cancelled',
      reason || 'Your booking has been cancelled.',
      { type: NotificationType.BOOKING_CANCELLED, bookingId }
    );
  }

  async refreshPushToken(): Promise<void> {
    try {
      const token = await this.registerForPushNotifications();
      if (token) {
        await this.registerTokenWithBackend(token);
      }
    } catch (error) {
      console.error('Failed to refresh push token:', error);
    }
  }
}

export const notificationService = NotificationService.getInstance();
export default notificationService;