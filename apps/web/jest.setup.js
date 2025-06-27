import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
    })),
  },
}))

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
  trackPageView: jest.fn(),
  trackBookingStarted: jest.fn(),
  trackBookingCompleted: jest.fn(),
  trackAssessmentStarted: jest.fn(),
  trackAssessmentCompleted: jest.fn(),
  trackContactFormSubmitted: jest.fn(),
  trackPhoneCallClicked: jest.fn(),
  trackWhatsAppClicked: jest.fn(),
  trackError: jest.fn(),
}))

// Mock global window methods
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock Google Analytics
global.gtag = jest.fn()

// Test utilities
export const mockUser = {
  id: '123',
  email: 'test@example.com',
  name: 'Test User',
  phone: '+44 7700 900000',
}

export const mockBooking = {
  id: '1',
  user_id: '123',
  service_type: 'Standard',
  pickup_location: 'London Heathrow Airport',
  dropoff_location: 'Central London',
  pickup_date: '2024-01-01',
  pickup_time: '10:00',
  passenger_count: 2,
  contact_phone: '+44 7700 900000',
  contact_email: 'test@example.com',
  special_requirements: '',
  estimated_price: 45.00,
  status: 'pending',
  created_at: '2024-01-01T09:00:00Z',
}

export const mockAssessment = {
  id: '1',
  user_id: '123',
  threat_level: 'Moderate',
  risk_score: 6,
  answers: {
    public_figure: 'sometimes',
    travel_frequency: 'weekly',
    security_incidents: 'none',
    sensitive_locations: 'sometimes',
    security_awareness: 'high',
  },
  recommendations: [
    'Consider using unmarked vehicles',
    'Vary your routes and timing',
    'Maintain situational awareness',
  ],
  created_at: '2024-01-01T09:00:00Z',
}