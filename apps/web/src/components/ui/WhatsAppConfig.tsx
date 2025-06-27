// WhatsApp Widget Configuration
export const WhatsAppConfig = {
  // Contact Information
  phoneNumber: '447407655203',
  displayNumber: '07407 655 203',
  
  // Default Messages
  defaultMessage: "Hello GQ Cars! I'm interested in your security taxi services.",
  emergencyMessage: "🚨 EMERGENCY: I need immediate transport assistance",
  quoteMessage: "Hello GQ Cars! I need a quote for security transport services.",
  bookingMessage: "Hello GQ Cars! I'd like to book a security transport service.",
  
  // Widget Settings
  widget: {
    autoOpen: true,
    autoOpenDelay: 3000,
    showNotification: true,
    notificationCount: 1,
    position: 'bottom-right' as const,
    theme: 'green' as const,
    showLiveActivity: true,
    showTypingIndicator: true,
    typingDelay: 1500,
  },
  
  // Service Options
  services: [
    {
      id: 'standard',
      name: 'GQ Standard',
      description: 'Professional security transport',
      price: 'From £6.50/mile',
      features: ['SIA Licensed Driver', 'GPS Tracking', '24/7 Support'],
      color: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      id: 'premium',
      name: 'GQ Premium',
      description: 'Enhanced security & comfort',
      price: 'From £8.50/mile',
      features: ['Close Protection', 'Premium Vehicle', 'Priority Booking'],
      color: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      id: 'executive',
      name: 'GQ Executive',
      description: 'VIP security transport',
      price: 'From £10.50/mile',
      features: ['Executive Protection', 'Luxury Vehicle', 'Dedicated Driver'],
      color: 'from-yellow-500 to-orange-500',
      popular: false
    },
    {
      id: 'xl',
      name: 'GQ XL Group',
      description: 'Group security transport',
      price: 'From £7.20/mile',
      features: ['Group Protection', 'Spacious Vehicle', 'Team Coordination'],
      color: 'from-green-500 to-green-600',
      popular: false
    }
  ],
  
  // Popular Destinations
  destinations: [
    {
      name: 'Heathrow Airport',
      time: '35-50 min',
      price: '£45-65',
      icon: '✈️',
      popular: true
    },
    {
      name: 'Gatwick Airport',
      time: '45-60 min',
      price: '£55-75',
      icon: '✈️',
      popular: false
    },
    {
      name: 'City of London',
      time: '20-35 min',
      price: '£25-40',
      icon: '🏢',
      popular: true
    },
    {
      name: 'Canary Wharf',
      time: '25-40 min',
      price: '£30-45',
      icon: '🏦',
      popular: false
    }
  ],
  
  // Quick Actions
  quickActions: [
    {
      id: 'book-now',
      text: '🚗 Book a Ride',
      action: 'book',
      color: 'bg-green-500',
      priority: 1
    },
    {
      id: 'get-quote',
      text: '💷 Get Quote',
      action: 'quote',
      color: 'bg-blue-500',
      priority: 2
    },
    {
      id: 'services',
      text: '🛡️ Our Services',
      action: 'services',
      color: 'bg-purple-500',
      priority: 3
    },
    {
      id: 'emergency',
      text: '🚨 Emergency',
      action: 'emergency',
      color: 'bg-red-500',
      priority: 4
    }
  ],
  
  // Smart Suggestions
  smartSuggestions: [
    {
      id: 'time-sensitive',
      text: 'I need transport within the next hour',
      icon: '⚡',
      color: 'bg-yellow-500'
    },
    {
      id: 'airport-rush',
      text: 'I have a flight to catch',
      icon: '✈️',
      color: 'bg-blue-500'
    },
    {
      id: 'business-meeting',
      text: 'I have an important business meeting',
      icon: '💼',
      color: 'bg-purple-500'
    },
    {
      id: 'group-transport',
      text: 'I need transport for a group',
      icon: '👥',
      color: 'bg-green-500'
    }
  ],
  
  // Live Activity Messages
  liveActivities: [
    {
      id: 'booking-1',
      type: 'booking',
      text: 'Just booked GQ Premium to Heathrow',
      location: 'Westminster',
      time: '2 min ago',
      rating: 5
    },
    {
      id: 'review-1',
      type: 'review',
      text: 'Left a 5-star review',
      location: 'Mayfair',
      time: '5 min ago',
      rating: 5
    },
    {
      id: 'inquiry-1',
      type: 'inquiry',
      text: 'Asked about Executive service',
      location: 'The City',
      time: '8 min ago'
    },
    {
      id: 'booking-2',
      type: 'booking',
      text: 'Booked XL Group for corporate event',
      location: 'Canary Wharf',
      time: '12 min ago',
      rating: 5
    }
  ],
  
  // Emergency Services
  emergencyServices: [
    {
      id: 'emergency-call',
      text: '📞 Emergency Call',
      action: 'call-now',
      color: 'bg-red-500',
      priority: 1
    },
    {
      id: 'emergency-whatsapp',
      text: '🆘 Emergency WhatsApp',
      action: 'whatsapp-direct',
      color: 'bg-orange-500',
      priority: 2
    },
    {
      id: 'hospital',
      text: '🏥 Hospital Transfer',
      action: 'whatsapp-direct',
      color: 'bg-blue-500',
      priority: 3
    }
  ],
  
  // Theme Colors
  themes: {
    green: {
      primary: 'from-green-500 to-green-600',
      secondary: 'from-green-400 to-green-500',
      accent: 'bg-green-100',
      text: 'text-green-600'
    },
    blue: {
      primary: 'from-blue-500 to-blue-600',
      secondary: 'from-blue-400 to-blue-500',
      accent: 'bg-blue-100',
      text: 'text-blue-600'
    },
    purple: {
      primary: 'from-purple-500 to-purple-600',
      secondary: 'from-purple-400 to-purple-500',
      accent: 'bg-purple-100',
      text: 'text-purple-600'
    }
  },
  
  // Animation Settings
  animations: {
    entrance: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    },
    hover: {
      scale: 1.1,
      duration: 0.2
    },
    tap: {
      scale: 0.95,
      duration: 0.1
    }
  },
  
  // Response Times
  responseTimes: {
    typing: 1500,
    message: 2000,
    activity: 10000
  }
}

export default WhatsAppConfig 