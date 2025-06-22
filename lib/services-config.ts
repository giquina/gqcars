import { 
  Plane, Shield, Car, Building2, Star, Users, Heart, 
  Crown, Briefcase, Home, Phone, MapPin, Clock, 
  Globe, CheckCircle, CreditCard, Calendar
} from 'lucide-react'

export interface ServiceConfig {
  id: string
  name: string
  icon: any
  emoji: string
  description: string
  shortDescription: string
  pricing: {
    from: number
    currency: string
    unit: string
  }
  features: string[]
  followUpQuestions: FollowUpQuestion[]
  subServices?: SubService[]
  quickFacts: string[]
  bookingTypes: BookingType[]
}

export interface SubService {
  id: string
  name: string
  description: string
  pricing: {
    from: number
    currency: string
    unit: string
  }
  features: string[]
}

export interface FollowUpQuestion {
  id: string
  question: string
  options: FollowUpOption[]
}

export interface FollowUpOption {
  id: string
  text: string
  response: string
  action?: 'book' | 'quote' | 'call' | 'info' | 'contact'
  additionalQuestions?: FollowUpQuestion[]
}

export interface BookingType {
  id: string
  name: string
  description: string
  icon: any
}

export const SERVICES_CONFIG: ServiceConfig[] = [
  {
    id: 'airport',
    name: 'Airport Transfers',
    icon: Plane,
    emoji: '✈️',
    description: 'Professional airport transfer service covering all major London and South East England airports. Reliable, punctual, and comfortable transfers with SIA-licensed drivers.',
    shortDescription: 'Secure airport transfers to all major UK airports',
    pricing: {
      from: 70,
      currency: '£',
      unit: 'per transfer'
    },
    features: [
      'Flight tracking and monitoring',
      'Meet & greet service with name board',
      'Premium vehicles with ample luggage space',
      'SIA-licensed professional drivers',
      'Door-to-door service',
      '24/7 availability'
    ],
    quickFacts: [
      'Heathrow: 45 mins from Central London',
      'Gatwick: 60 mins from Central London', 
      'All major airports covered',
      'Fixed pricing, no surge charges'
    ],
    subServices: [
      {
        id: 'heathrow',
        name: 'Heathrow Airport',
        description: 'All terminals covered with premium service',
        pricing: { from: 90, currency: '£', unit: 'per transfer' },
        features: ['All terminals', '45 min journey', 'Meet & greet included']
      },
      {
        id: 'gatwick',
        name: 'Gatwick Airport', 
        description: 'North & South terminals with flight tracking',
        pricing: { from: 110, currency: '£', unit: 'per transfer' },
        features: ['Both terminals', '60 min journey', 'Flight monitoring']
      },
      {
        id: 'stansted',
        name: 'Stansted Airport',
        description: 'Main terminal with luggage assistance',
        pricing: { from: 100, currency: '£', unit: 'per transfer' },
        features: ['Main terminal', '60 min journey', 'Luggage help']
      },
      {
        id: 'luton',
        name: 'Luton Airport',
        description: 'Fast service with premium vehicles',
        pricing: { from: 80, currency: '£', unit: 'per transfer' },
        features: ['Main terminal', '45 min journey', 'Premium cars']
      }
    ],
    followUpQuestions: [
      {
        id: 'airport-selection',
        question: 'Which airport do you need transport to/from?',
        options: [
          {
            id: 'heathrow',
            text: '🛫 Heathrow (from £90)',
            response: 'Perfect! Heathrow transfers start from £90. We cover all terminals with meet & greet service. Flight tracking included so we adjust for delays!',
            action: 'quote',
            additionalQuestions: [
              {
                id: 'heathrow-details',
                question: 'Tell me more about your Heathrow journey:',
                options: [
                  { id: 'heathrow-pickup', text: '📍 I need pickup location', response: 'Great! We serve all areas from Central London to Hertfordshire. What\'s your pickup postcode?', action: 'contact' },
                  { id: 'heathrow-terminal', text: '🏢 Which terminal?', response: 'We cover all Heathrow terminals (T1-T5). Our drivers know the best routes and will meet you at arrivals with a name board.', action: 'book' },
                  { id: 'heathrow-timing', text: '⏰ Flight times', response: 'Perfect! We track your flight automatically. Just give us your flight number and we\'ll adjust pickup time for any delays.', action: 'contact' }
                ]
              }
            ]
          },
          {
            id: 'gatwick',
            text: '🛫 Gatwick (from £110)',
            response: 'Excellent choice! Gatwick transfers from £110. We cover both North and South terminals with flight tracking and meet & greet.',
            action: 'quote'
          },
          {
            id: 'stansted',
            text: '🛫 Stansted (from £100)',
            response: 'Great! Stansted transfers from £100. Direct service with luggage assistance and professional drivers.',
            action: 'quote'
          },
          {
            id: 'other-airport',
            text: '🛫 Other airport',
            response: 'We cover all UK airports including Luton, City, and regional airports. Let me connect you with our team for a quote!',
            action: 'contact'
          }
        ]
      }
    ],
    bookingTypes: [
      { id: 'immediate', name: 'Book Now', description: 'Immediate booking', icon: Car },
      { id: 'scheduled', name: 'Schedule', description: 'Future booking', icon: Calendar },
      { id: 'quote', name: 'Get Quote', description: 'Price estimate', icon: CreditCard }
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate Security',
    icon: Building2,
    emoji: '🏢',
    description: 'Comprehensive security solutions for businesses, executives, and corporate events. From workplace security to executive protection.',
    shortDescription: 'Complete corporate security and executive protection',
    pricing: {
      from: 150,
      currency: '£',
      unit: 'per day'
    },
    features: [
      'Executive protection services',
      'Workplace security personnel',
      'Risk assessment and audits',
      '24/7 security coverage',
      'Event security management',
      'Compliance and reporting'
    ],
    quickFacts: [
      'SIA-licensed security officers',
      'Tailored security packages',
      'Multi-site coverage available',
      'Emergency response protocols'
    ],
    subServices: [
      {
        id: 'executive-protection',
        name: 'Executive Protection',
        description: 'Personal security for corporate executives',
        pricing: { from: 300, currency: '£', unit: 'per day' },
        features: ['Close protection', 'Advance planning', 'Threat assessment']
      },
      {
        id: 'workplace-security',
        name: 'Workplace Security',
        description: 'Office and facility protection',
        pricing: { from: 150, currency: '£', unit: 'per day' },
        features: ['Access control', 'Patrol services', 'Incident response']
      },
      {
        id: 'event-security',
        name: 'Corporate Events',
        description: 'Security for business events and conferences',
        pricing: { from: 200, currency: '£', unit: 'per event' },
        features: ['Venue security', 'VIP protection', 'Crowd management']
      }
    ],
    followUpQuestions: [
      {
        id: 'corporate-type',
        question: 'What type of corporate security do you need?',
        options: [
          {
            id: 'exec-protection',
            text: '👔 Executive Protection',
            response: 'Executive protection is our specialty! We provide close protection for corporate leaders with advance planning and threat assessment. Starting from £300/day.',
            action: 'info',
            additionalQuestions: [
              {
                id: 'exec-details',
                question: 'Tell me about your executive protection needs:',
                options: [
                  { id: 'daily-protection', text: '📅 Daily protection', response: 'Perfect! We can arrange daily close protection with advance route planning and threat assessment.', action: 'contact' },
                  { id: 'travel-security', text: '✈️ Travel security', response: 'We provide comprehensive travel security including transport, accommodation security, and local coordination.', action: 'contact' },
                  { id: 'event-protection', text: '🎪 Event protection', response: 'Event security for executives includes venue assessment, VIP areas, and discrete protection during functions.', action: 'contact' }
                ]
              }
            ]
          },
          {
            id: 'workplace',
            text: '🏢 Workplace Security',
            response: 'Workplace security includes access control, patrol services, and incident response. We customize solutions for your facility needs.',
            action: 'info'
          },
          {
            id: 'risk-assessment',
            text: '📊 Risk Assessment',
            response: 'Our security experts conduct comprehensive risk assessments and provide detailed reports with recommendations.',
            action: 'contact'
          }
        ]
      }
    ],
    bookingTypes: [
      { id: 'consultation', name: 'Free Consultation', description: 'Security assessment', icon: CheckCircle },
      { id: 'quote', name: 'Custom Quote', description: 'Tailored pricing', icon: CreditCard },
      { id: 'emergency', name: 'Emergency', description: 'Immediate response', icon: Phone }
    ]
  },
  {
    id: 'vip',
    name: 'VIP Services',
    icon: Star,
    emoji: '⭐',
    description: 'Bespoke security and transport solutions for high-profile clients including celebrities, executives, and diplomats.',
    shortDescription: 'Elite VIP protection and luxury transport',
    pricing: {
      from: 500,
      currency: '£',
      unit: 'per day'
    },
    features: [
      'Personal close protection',
      'Luxury armored vehicles',
      'International security coordination',
      'Event and venue security',
      '24/7 rapid response',
      'Privacy protection measures'
    ],
    quickFacts: [
      'Luxury vehicle fleet available',
      'International service coordination',
      'Discrete professional protection',
      'Celebrity and executive clients'
    ],
    followUpQuestions: [
      {
        id: 'vip-service-type',
        question: 'What VIP service do you require?',
        options: [
          {
            id: 'personal-protection',
            text: '🛡️ Personal Protection',
            response: 'Our VIP personal protection includes dedicated close protection officers, advance security planning, and 24/7 coverage. Completely discrete and professional.',
            action: 'contact'
          },
          {
            id: 'luxury-transport',
            text: '🚗 Luxury Transport',
            response: 'Our luxury fleet includes Mercedes-Maybach, Range Rover SV, and armored vehicles. All with professional security drivers.',
            action: 'info'
          },
          {
            id: 'event-vip',
            text: '🎭 Event Security',
            response: 'VIP event security includes venue assessment, VIP guest management, media control, and discrete protection during functions.',
            action: 'contact'
          }
        ]
      }
    ],
    bookingTypes: [
      { id: 'consultation', name: 'VIP Consultation', description: 'Bespoke service planning', icon: Star },
      { id: 'emergency', name: '24/7 VIP Line', description: 'Emergency VIP response', icon: Phone }
    ]
  },
  {
    id: 'weddings',
    name: 'Wedding Security',
    icon: Heart,
    emoji: '💒',
    description: 'Professional wedding security ensuring your special day is safe, secure, and memorable.',
    shortDescription: 'Discrete wedding security and transport',
    pricing: {
      from: 200,
      currency: '£',
      unit: 'per day'
    },
    features: [
      'Venue security assessment',
      'Guest list management',
      'Bridal party protection',
      'Luxury transport for couple',
      'Discrete security presence',
      'Emergency response planning'
    ],
    quickFacts: [
      'Discrete professional service',
      'Luxury bridal transport',
      'Venue security coordination',
      'Photography security'
    ],
    followUpQuestions: [
      {
        id: 'wedding-needs',
        question: 'What wedding security services do you need?',
        options: [
          {
            id: 'venue-security',
            text: '🏰 Venue Security',
            response: 'Venue security includes perimeter protection, access control, and guest management. We work discretely to ensure your day flows perfectly.',
            action: 'contact'
          },
          {
            id: 'bridal-transport',
            text: '👰 Bridal Transport',
            response: 'Luxury bridal transport with professional security drivers. Choose from our premium fleet including Rolls Royce and Mercedes-Maybach.',
            action: 'info'
          },
          {
            id: 'vip-guests',
            text: '⭐ VIP Guest Protection',
            response: 'VIP guest protection for high-profile wedding guests including discrete security and secure transport arrangements.',
            action: 'contact'
          }
        ]
      }
    ],
    bookingTypes: [
      { id: 'consultation', name: 'Wedding Consultation', description: 'Free wedding security planning', icon: Heart },
      { id: 'package', name: 'Wedding Package', description: 'Complete wedding security', icon: CheckCircle }
    ]
  },
  {
    id: 'close-protection',
    name: 'Close Protection',
    icon: Shield,
    emoji: '🛡️',
    description: 'Professional close protection services for individuals requiring personal security.',
    shortDescription: 'Professional personal protection services',
    pricing: {
      from: 250,
      currency: '£',
      unit: 'per day'
    },
    features: [
      'SIA-licensed close protection officers',
      'Threat assessment and planning',
      'Secure transport arrangements',
      'Residential security',
      'Travel security coordination',
      '24/7 protection coverage'
    ],
    quickFacts: [
      'Highly trained CP officers',
      'Threat assessment included',
      'Residential and travel security',
      'Discrete professional service'
    ],
    followUpQuestions: [
      {
        id: 'protection-type',
        question: 'What type of close protection do you need?',
        options: [
          {
            id: 'personal-cp',
            text: '👤 Personal Protection',
            response: 'Personal close protection with SIA-licensed officers. Includes threat assessment, route planning, and 24/7 coverage options.',
            action: 'contact'
          },
          {
            id: 'family-protection',
            text: '👨‍👩‍👧‍👦 Family Protection',
            response: 'Family protection services include residential security, school runs, and coordinated protection for all family members.',
            action: 'contact'
          },
          {
            id: 'travel-cp',
            text: '✈️ Travel Protection',
            response: 'Travel close protection includes international coordination, secure transport, and local security arrangements.',
            action: 'contact'
          }
        ]
      }
    ],
    bookingTypes: [
      { id: 'assessment', name: 'Threat Assessment', description: 'Security evaluation', icon: Shield },
      { id: 'immediate', name: 'Immediate Protection', description: 'Emergency CP service', icon: Phone }
    ]
  },
  {
    id: 'family-office',
    name: 'Family Office Security',
    icon: Home,
    emoji: '🏠',
    description: 'Comprehensive security solutions for high-net-worth families and their assets.',
    shortDescription: 'Complete family and estate security',
    pricing: {
      from: 400,
      currency: '£',
      unit: 'per day'
    },
    features: [
      'Residential security management',
      'Family member protection',
      'Asset protection services',
      'Staff vetting and training',
      'Technology integration',
      'Crisis management planning'
    ],
    quickFacts: [
      'Comprehensive family security',
      'Estate and asset protection',
      'Staff security training',
      'Technology integration'
    ],
    followUpQuestions: [
      {
        id: 'family-security-needs',
        question: 'What family office security do you need?',
        options: [
          {
            id: 'residential',
            text: '🏠 Residential Security',
            response: 'Residential security includes property protection, access control, CCTV management, and 24/7 monitoring services.',
            action: 'contact'
          },
          {
            id: 'family-cp',
            text: '👨‍👩‍👧‍👦 Family Protection',
            response: 'Family protection covers all family members with coordinated security, secure transport, and lifestyle protection.',
            action: 'contact'
          },
          {
            id: 'asset-protection',
            text: '💎 Asset Protection',
            response: 'Asset protection includes valuable goods transport, secure storage coordination, and high-value item security.',
            action: 'contact'
          }
        ]
      }
    ],
    bookingTypes: [
      { id: 'consultation', name: 'Family Security Consultation', description: 'Comprehensive security planning', icon: Home },
      { id: 'assessment', name: 'Security Assessment', description: 'Family risk evaluation', icon: Shield }
    ]
  }
]

// Helper function to get service by ID
export const getServiceById = (id: string): ServiceConfig | undefined => {
  return SERVICES_CONFIG.find(service => service.id === id)
}

// Helper function to get all services
export const getAllServices = (): ServiceConfig[] => {
  return SERVICES_CONFIG
}

// Helper function to get service categories
export const getServiceCategories = () => {
  return [
    { id: 'transport', name: 'Transport Services', services: ['airport', 'vip'] },
    { id: 'security', name: 'Security Services', services: ['corporate', 'close-protection', 'family-office'] },
    { id: 'events', name: 'Event Services', services: ['weddings', 'vip'] }
  ]
}