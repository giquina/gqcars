import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notification } from '../../shared/src/types';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  permission: boolean;
  requestPermission: () => Promise<boolean>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    checkPermissionStatus();
    loadStoredNotifications();
    
    // Listen for new notifications
    const notificationListener = Notifications.addNotificationReceivedListener(handleNewNotification);
    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const checkPermissionStatus = async () => {
    const settings = await Notifications.getPermissionsAsync();
    setPermission(settings.granted);
  };

  const loadStoredNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem('notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const saveNotifications = async (notifs: Notification[]) => {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(notifs));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus === 'granted') {
      setPermission(true);
      
      // Get push token for backend registration
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push token:', token);
      
      // Register with backend
      // await fetch('https://api.gqcars.com/notifications/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, platform: Platform.OS }),
      // });
      
      return true;
    }
    
    setPermission(false);
    return false;
  };

  const handleNewNotification = (notification: Notifications.Notification) => {
    const newNotif: Notification = {
      id: notification.request.identifier,
      userId: '', // Will be set by backend
      type: 'system',
      title: notification.request.content.title || 'New Notification',
      message: notification.request.content.body || '',
      read: false,
      createdAt: new Date(),
    };
    
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    saveNotifications(updated);
  };

  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    // Handle notification tap/action
    const notificationId = response.notification.request.identifier;
    markAsRead(notificationId);
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(notif => notif.id !== id);
    setNotifications(updated);
    saveNotifications(updated);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    saveNotifications([]);
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const value = {
    notifications,
    unreadCount,
    permission,
    requestPermission,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};