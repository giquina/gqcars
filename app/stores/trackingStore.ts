import { create } from 'zustand';
import { LocationData, TripData, DriverProfile, VehicleInfo, SafetyAlert, Message } from '../types/tracking';

interface TrackingStore {
  // Current trip data
  currentTrip: TripData | null;
  driverLocation: LocationData | null;
  customerLocation: LocationData | null;
  
  // Driver and vehicle info
  currentDriver: DriverProfile | null;
  currentVehicle: VehicleInfo | null;
  
  // Safety and alerts
  activeAlerts: SafetyAlert[];
  emergencyMode: boolean;
  
  // Communication
  messages: Message[];
  unreadCount: number;
  isConnected: boolean;
  
  // Tracking settings
  trackingEnabled: boolean;
  updateInterval: number;
  
  // Actions
  setCurrentTrip: (trip: TripData | null) => void;
  updateDriverLocation: (location: LocationData) => void;
  updateCustomerLocation: (location: LocationData) => void;
  setDriver: (driver: DriverProfile | null) => void;
  setVehicle: (vehicle: VehicleInfo | null) => void;
  addAlert: (alert: SafetyAlert) => void;
  resolveAlert: (alertId: string) => void;
  addMessage: (message: Message) => void;
  markMessageAsRead: (messageId: string) => void;
  setConnected: (connected: boolean) => void;
  toggleEmergencyMode: () => void;
  enableTracking: () => void;
  disableTracking: () => void;
  clearTrip: () => void;
}

export const useTrackingStore = create<TrackingStore>((set, get) => ({
  // Initial state
  currentTrip: null,
  driverLocation: null,
  customerLocation: null,
  currentDriver: null,
  currentVehicle: null,
  activeAlerts: [],
  emergencyMode: false,
  messages: [],
  unreadCount: 0,
  isConnected: false,
  trackingEnabled: false,
  updateInterval: 10, // seconds

  // Actions
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  
  updateDriverLocation: (location) => {
    set({ driverLocation: location });
    
    // Check for route deviations if trip is active
    const { currentTrip } = get();
    if (currentTrip && currentTrip.status === 'in_transit') {
      // Route deviation logic would go here
    }
  },
  
  updateCustomerLocation: (location) => set({ customerLocation: location }),
  
  setDriver: (driver) => set({ currentDriver: driver }),
  
  setVehicle: (vehicle) => set({ currentVehicle: vehicle }),
  
  addAlert: (alert) => 
    set((state) => ({ 
      activeAlerts: [...state.activeAlerts, alert],
      emergencyMode: alert.severity === 'critical' || alert.type === 'panic'
    })),
  
  resolveAlert: (alertId) =>
    set((state) => ({
      activeAlerts: state.activeAlerts.filter(alert => alert.id !== alertId),
      emergencyMode: state.activeAlerts.some(alert => 
        alert.id !== alertId && (alert.severity === 'critical' || alert.type === 'panic')
      )
    })),
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      unreadCount: message.receiverId === 'customer' && !message.read 
        ? state.unreadCount + 1 
        : state.unreadCount
    })),
  
  markMessageAsRead: (messageId) =>
    set((state) => ({
      messages: state.messages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    })),
  
  setConnected: (connected) => set({ isConnected: connected }),
  
  toggleEmergencyMode: () => set((state) => ({ emergencyMode: !state.emergencyMode })),
  
  enableTracking: () => set({ trackingEnabled: true }),
  
  disableTracking: () => set({ trackingEnabled: false }),
  
  clearTrip: () => set({
    currentTrip: null,
    driverLocation: null,
    currentDriver: null,
    currentVehicle: null,
    activeAlerts: [],
    emergencyMode: false,
    messages: [],
    unreadCount: 0,
    trackingEnabled: false
  })
}));