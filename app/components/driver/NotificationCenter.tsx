'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  FileText, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  DollarSign,
  User,
  Trash2,
  MarkAsRead
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCenterProps {
  driverId: string;
}

interface Notification {
  id: string;
  type: 'document' | 'shift' | 'payment' | 'system' | 'alert' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
  actionUrl?: string;
}

export default function NotificationCenter({ driverId }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsData: Notification[] = [
          {
            id: '1',
            type: 'document',
            title: 'DBS Certificate Expiring Soon',
            message: 'Your Enhanced DBS Certificate expires in 30 days. Please upload a renewed certificate.',
            timestamp: '2024-01-14T10:30:00Z',
            read: false,
            priority: 'high',
            actionRequired: true,
            actionUrl: '/driver/documents'
          },
          {
            id: '2',
            type: 'shift',
            title: 'New Shift Assignment',
            message: 'You have been assigned a VIP transfer for tomorrow at 14:00. Location: Heathrow Terminal 5.',
            timestamp: '2024-01-14T09:15:00Z',
            read: false,
            priority: 'medium'
          },
          {
            id: '3',
            type: 'payment',
            title: 'Weekly Payout Processed',
            message: 'Your weekly earnings of £485.50 have been transferred to your account.',
            timestamp: '2024-01-12T16:00:00Z',
            read: true,
            priority: 'low'
          },
          {
            id: '4',
            type: 'alert',
            title: 'Safety Training Required',
            message: 'Annual safety refresher training is due. Complete by January 20th to maintain active status.',
            timestamp: '2024-01-11T14:20:00Z',
            read: false,
            priority: 'high',
            actionRequired: true
          },
          {
            id: '5',
            type: 'system',
            title: 'App Update Available',
            message: 'Driver app version 2.4.1 is available with new performance tracking features.',
            timestamp: '2024-01-10T08:00:00Z',
            read: true,
            priority: 'low'
          },
          {
            id: '6',
            type: 'info',
            title: 'Customer Feedback Received',
            message: '"Excellent service and very professional driver!" - 5-star rating from John Smith.',
            timestamp: '2024-01-09T19:45:00Z',
            read: true,
            priority: 'low'
          }
        ];
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [driverId]);

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'important':
        return notification.priority === 'high' || notification.actionRequired;
      default:
        return true;
    }
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = `w-4 h-4 ${
      priority === 'high' ? 'text-red-400' : 
      priority === 'medium' ? 'text-yellow-400' : 
      'text-blue-400'
    }`;

    switch (type) {
      case 'document': return <FileText className={iconClass} />;
      case 'shift': return <Calendar className={iconClass} />;
      case 'payment': return <DollarSign className={iconClass} />;
      case 'alert': return <AlertTriangle className={iconClass} />;
      case 'system': return <Info className={iconClass} />;
      default: return <Bell className={iconClass} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      default: return 'border-l-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-gray-800 rounded">
          <div className="text-lg font-bold text-white">{notifications.length}</div>
          <div className="text-xs text-gray-400">Total</div>
        </div>
        <div className="text-center p-2 bg-gray-800 rounded">
          <div className="text-lg font-bold text-yellow-500">{unreadCount}</div>
          <div className="text-xs text-gray-400">Unread</div>
        </div>
        <div className="text-center p-2 bg-gray-800 rounded">
          <div className="text-lg font-bold text-red-500">{urgentCount}</div>
          <div className="text-xs text-gray-400">Urgent</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-xs rounded ${
            filter === 'all' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 text-xs rounded ${
            filter === 'unread' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter('important')}
          className={`px-3 py-1 text-xs rounded ${
            filter === 'important' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'
          }`}
        >
          Important
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 bg-gray-800 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.read ? 'bg-opacity-80' : 'bg-opacity-40'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-1">
                  {getNotificationIcon(notification.type, notification.priority)}
                </div>
                <div className="flex-1">
                  <div className={`font-medium text-sm ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                    {notification.title}
                    {!notification.read && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">{notification.message}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-gray-500 text-xs">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </div>
                    {notification.actionRequired && (
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-1 ml-2">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 text-gray-400 hover:text-white"
                    title="Mark as read"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-1 text-gray-400 hover:text-red-400"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {notification.actionUrl && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-xs font-medium">
                  Take Action
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No notifications found</p>
        </div>
      )}
    </div>
  );
}