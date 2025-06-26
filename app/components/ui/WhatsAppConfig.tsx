export interface WhatsAppService {
  id: string
  name: string
  description: string
  price: string
  popular?: boolean
}

export interface WhatsAppTheme {
  primary: string
  secondary: string
  accent: string
  text: string
}

export interface WhatsAppDestination {
  id: string
  name: string
  icon: string
  estimatedTime: string
  estimatedPrice: string
}

const WhatsAppConfig = {
  // Contact Information
  phoneNumber: '447407655203',
  businessName: 'GQ Cars',
  
  // Message Templates
  defaultMessage: "Hello GQ Cars! I'm interested in your security taxi services.",
  emergencyMessage: "🚨 EMERGENCY: I need immediate transport assistance",
  quoteMessage: "Hello GQ Cars! I need a quote for security transport services.",
  
  // Themes
  themes: {
    green: {
      primary: 'from-green-500 to-green-600',
      secondary: 'from-green-400 to-green-500',
      accent: 'bg-green-100',
      text: 'text-green-600'
    } as WhatsAppTheme,
    blue: {
      primary: 'from-blue-500 to-blue-600',
      secondary: 'from-blue-400 to-blue-500',
      accent: 'bg-blue-100',
      text: 'text-blue-600'
    } as WhatsAppTheme,
    purple: {
      primary: 'from-purple-500 to-purple-600',
      secondary: 'from-purple-400 to-purple-500',
      accent: 'bg-purple-100',
      text: 'text-purple-600'
    } as WhatsAppTheme
  },
  
  // Services
  services: [
    {
      id: 'premium',
      name: 'GQ Premium',
      description: 'Enhanced security & comfort',
      price: 'From £8.50/mile',
      popular: true
    },
    {
      id: 'executive',
      name: 'GQ Executive',
      description: 'Luxury with close protection',
      price: 'From £12.00/mile',
      popular: false
    },
    {
      id: 'standard',
      name: 'GQ Standard',
      description: 'Professional security transport',
      price: 'From £6.50/mile',
      popular: false
    },
    {
      id: 'xl',
      name: 'GQ XL',
      description: 'Group security transport',
      price: 'From £10.00/mile',
      popular: false
    }
  ] as WhatsAppService[],
  
  // Popular Destinations
  destinations: [
    {
      id: 'heathrow',
      name: 'Heathrow Airport',
      icon: '✈️',
      estimatedTime: '35-50 min',
      estimatedPrice: '£45-65'
    },
    {
      id: 'gatwick',
      name: 'Gatwick Airport',
      icon: '✈️',
      estimatedTime: '45-60 min',
      estimatedPrice: '£55-75'
    },
    {
      id: 'city',
      name: 'City of London',
      icon: '🏢',
      estimatedTime: '20-35 min',
      estimatedPrice: '£25-40'
    },
    {
      id: 'canary',
      name: 'Canary Wharf',
      icon: '🏦',
      estimatedTime: '25-40 min',
      estimatedPrice: '£30-45'
    }
  ] as WhatsAppDestination[],
  
  // Animation Settings
  animations: {
    autoOpenDelay: 5000,
    typingDelay: 1500,
    messageDelay: 800,
    pulseInterval: 3000
  },
  
  // Live Activity Messages
  liveActivities: [
    "🚗 John just booked executive transport to Heathrow",
    "⭐ Sarah left a 5-star review for our premium service",
    "📞 Michael is requesting a quote for City transport",
    "🛡️ Emma booked close protection for business meeting",
    "✈️ David confirmed airport pickup service"
  ],
  
  // Quick Reply Options
  quickReplies: [
    { id: 'quote', text: '💷 Get Quote', message: 'I need a quote for transport' },
    { id: 'book', text: '🚗 Book Now', message: 'I want to book a taxi now' },
    { id: 'emergency', text: '🚨 Emergency', message: '🚨 I need emergency transport' },
    { id: 'services', text: '🛡️ Our Services', message: 'Tell me about your services' }
  ]
}

export default WhatsAppConfig