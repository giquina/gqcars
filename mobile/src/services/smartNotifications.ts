import * as Notifications from 'expo-notifications';
import { Booking, BookingStatus, NotificationType, Driver } from '../types';
import notificationService from './notifications';

interface NotificationConfig {
  title: string;
  body: string;
  action?: {
    type: 'VIEW_BOOKING' | 'TRACK_DRIVER' | 'CONTACT_DRIVER' | 'RATE_SERVICE';
    bookingId?: string;
    driverId?: string;
  };
  priority: 'default' | 'high' | 'max';
  category: 'booking_update' | 'driver_update' | 'payment' | 'promotional';
  sound?: boolean;
  vibration?: number[];
  icon?: string;
  color?: string;
}

export class SmartNotificationService {
  static getContextualMessage(booking: Booking): NotificationConfig {
    const timeUntilPickup = this.getTimeUntilPickup(booking.pickupDateTime);
    const isToday = this.isToday(booking.pickupDateTime);
    
    switch (booking.status) {
      case BookingStatus.CONFIRMED:
        return {
          title: this.getConfirmationTitle(booking.serviceType),
          body: this.getConfirmationBody(booking, timeUntilPickup),
          action: { type: 'VIEW_BOOKING', bookingId: booking.id },
          priority: 'high',
          category: 'booking_update',
          sound: true,
          icon: 'car',
          color: '#10b981'
        };

      case BookingStatus.ASSIGNED:
        return {
          title: `${booking.driver?.firstName} is your driver`,
          body: this.getDriverAssignedBody(booking),
          action: { type: 'TRACK_DRIVER', bookingId: booking.id },
          priority: 'max',
          category: 'driver_update',
          sound: true,
          vibration: [0, 250, 250, 250],
          icon: 'person',
          color: '#3b82f6'
        };

      case BookingStatus.EN_ROUTE:
        return {
          title: `${booking.driver?.firstName} is on the way`,
          body: this.getEnRouteBody(booking),
          action: { type: 'TRACK_DRIVER', bookingId: booking.id },
          priority: 'max',
          category: 'driver_update',
          sound: true,
          icon: 'navigation',
          color: '#f59e0b'
        };

      case BookingStatus.ARRIVED:
        return {
          title: 'Your driver has arrived! 🚗',
          body: this.getArrivedBody(booking),
          action: { type: 'CONTACT_DRIVER', driverId: booking.driver?.id },
          priority: 'max',
          category: 'driver_update',
          sound: true,
          vibration: [0, 500, 200, 500],
          icon: 'location',
          color: '#10b981'
        };

      case BookingStatus.COMPLETED:
        return {
          title: 'Journey completed! ✨',
          body: this.getCompletedBody(booking),
          action: { type: 'RATE_SERVICE', bookingId: booking.id },
          priority: 'high',
          category: 'booking_update',
          sound: true,
          icon: 'star',
          color: '#8b5cf6'
        };

      case BookingStatus.CANCELLED:
        return {
          title: 'Booking cancelled',
          body: this.getCancelledBody(booking),
          action: { type: 'VIEW_BOOKING', bookingId: booking.id },
          priority: 'high',
          category: 'booking_update',
          sound: true,
          icon: 'alert-circle',
          color: '#ef4444'
        };

      default:
        return this.getDefaultNotification(booking);
    }
  }

  static async sendSmartNotification(booking: Booking): Promise<void> {
    const config = this.getContextualMessage(booking);
    
    await notificationService.scheduleLocalNotification(
      config.title,
      config.body,
      {
        bookingId: booking.id,
        type: this.mapToNotificationType(booking.status),
        action: config.action,
        category: config.category,
        priority: config.priority
      }
    );

    // Track notification for analytics
    this.trackNotificationSent(booking, config);
  }

  static async sendReminderNotifications(booking: Booking): Promise<void> {
    const pickupTime = new Date(booking.pickupDateTime);
    const now = new Date();

    // 24 hours before
    const reminder24h = new Date(pickupTime.getTime() - 24 * 60 * 60 * 1000);
    if (reminder24h > now) {
      await this.scheduleReminder(booking, reminder24h, '24 hours');
    }

    // 2 hours before
    const reminder2h = new Date(pickupTime.getTime() - 2 * 60 * 60 * 1000);
    if (reminder2h > now) {
      await this.scheduleReminder(booking, reminder2h, '2 hours');
    }

    // 30 minutes before
    const reminder30m = new Date(pickupTime.getTime() - 30 * 60 * 1000);
    if (reminder30m > now) {
      await this.scheduleReminder(booking, reminder30m, '30 minutes');
    }
  }

  private static async scheduleReminder(
    booking: Booking, 
    scheduledTime: Date, 
    timeframe: string
  ): Promise<void> {
    const title = `Upcoming booking reminder`;
    const body = `Your ${this.getServiceDisplayName(booking.serviceType)} is in ${timeframe}`;

    await notificationService.scheduleLocalNotification(
      title,
      body,
      {
        bookingId: booking.id,
        type: NotificationType.BOOKING_CONFIRMED,
        reminder: true,
        timeframe
      },
      scheduledTime
    );
  }

  static async sendETAUpdate(bookingId: string, newETA: string): Promise<void> {
    const title = 'Updated arrival time';
    const body = `Your driver will now arrive in ${newETA}`;

    await notificationService.scheduleLocalNotification(
      title,
      body,
      {
        bookingId,
        type: NotificationType.DRIVER_ASSIGNED,
        etaUpdate: true
      }
    );
  }

  // Helper methods for generating contextual messages
  private static getConfirmationTitle(serviceType: string): string {
    const titles = {
      'private_hire': 'Booking Confirmed 🚗',
      'corporate': 'Business Travel Confirmed 💼',
      'wedding': 'Wedding Transport Confirmed 💒',
      'vip': 'VIP Service Confirmed ⭐',
      'close_protection': 'Security Service Confirmed 🛡️'
    };
    return titles[serviceType as keyof typeof titles] || 'Booking Confirmed';
  }

  private static getConfirmationBody(booking: Booking, timeUntilPickup: string): string {
    const serviceDisplay = this.getServiceDisplayName(booking.serviceType);
    const time = this.formatTime(booking.pickupDateTime);
    
    if (this.isToday(booking.pickupDateTime)) {
      return `Your ${serviceDisplay} is confirmed for today at ${time}. We'll notify you when your driver is assigned.`;
    } else {
      return `Your ${serviceDisplay} is confirmed for ${this.formatDate(booking.pickupDateTime)} at ${time}.`;
    }
  }

  private static getDriverAssignedBody(booking: Booking): string {
    const vehicleInfo = booking.vehicle 
      ? `${booking.vehicle.make} ${booking.vehicle.model}` 
      : 'vehicle';
    
    const eta = booking.estimatedArrival || 'shortly';
    
    return `${vehicleInfo} • Arriving in ${eta} • Tap to track`;
  }

  private static getEnRouteBody(booking: Booking): string {
    const eta = booking.estimatedArrival || 'a few minutes';
    return `ETA: ${eta} • ${booking.pickupLocation.address}`;
  }

  private static getArrivedBody(booking: Booking): string {
    const vehicleInfo = booking.vehicle?.licensePlate 
      ? `License: ${booking.vehicle.licensePlate}` 
      : '';
    
    return `Your driver is waiting at ${booking.pickupLocation.address}. ${vehicleInfo}`;
  }

  private static getCompletedBody(booking: Booking): string {
    const driverName = booking.driver?.firstName || 'your driver';
    return `Thank you for choosing our service! How was your experience with ${driverName}?`;
  }

  private static getCancelledBody(booking: Booking): string {
    return `Your booking for ${this.formatTime(booking.pickupDateTime)} has been cancelled. Tap for details.`;
  }

  private static getDefaultNotification(booking: Booking): NotificationConfig {
    return {
      title: 'Booking Update',
      body: `Your booking status has been updated`,
      action: { type: 'VIEW_BOOKING', bookingId: booking.id },
      priority: 'default',
      category: 'booking_update',
      sound: true
    };
  }

  // Utility methods
  private static getTimeUntilPickup(pickupDateTime: string): string {
    const pickup = new Date(pickupDateTime);
    const now = new Date();
    const diffMs = pickup.getTime() - now.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.round(diffMs / (1000 * 60));
      return `${diffMinutes} minutes`;
    } else if (diffHours < 24) {
      return `${diffHours} hours`;
    } else {
      const diffDays = Math.round(diffHours / 24);
      return `${diffDays} days`;
    }
  }

  private static isToday(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private static formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  private static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }

  private static getServiceDisplayName(serviceType: string): string {
    const names = {
      'private_hire': 'private hire',
      'corporate': 'corporate transport',
      'wedding': 'wedding service',
      'vip': 'VIP service',
      'close_protection': 'security service'
    };
    return names[serviceType as keyof typeof names] || 'service';
  }

  private static mapToNotificationType(status: BookingStatus): NotificationType {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return NotificationType.BOOKING_CONFIRMED;
      case BookingStatus.ASSIGNED:
      case BookingStatus.EN_ROUTE:
        return NotificationType.DRIVER_ASSIGNED;
      case BookingStatus.ARRIVED:
        return NotificationType.DRIVER_ARRIVED;
      case BookingStatus.CANCELLED:
        return NotificationType.BOOKING_CANCELLED;
      default:
        return NotificationType.BOOKING_CONFIRMED;
    }
  }

  private static trackNotificationSent(booking: Booking, config: NotificationConfig): void {
    // Analytics tracking would go here
    console.log(`Notification sent: ${config.title} for booking ${booking.id}`);
  }
}

export default SmartNotificationService;