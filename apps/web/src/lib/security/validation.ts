import { z } from 'zod';

// Security-focused validation schemas for GQ Cars
export const securitySchemas = {
  // Booking form validation with comprehensive security checks
  bookingForm: z.object({
    // Location validation - restrict to reasonable UK addresses
    pickupLocation: z.string()
      .min(5, 'Pickup location must be at least 5 characters')
      .max(200, 'Pickup location too long')
      .regex(/^[a-zA-Z0-9\s,.\-'()]+$/, 'Invalid characters in pickup location')
      .refine(val => !val.includes('<script'), 'Invalid pickup location'),
    
    dropoffLocation: z.string()
      .min(5, 'Dropoff location must be at least 5 characters')
      .max(200, 'Dropoff location too long')
      .regex(/^[a-zA-Z0-9\s,.\-'()]+$/, 'Invalid characters in dropoff location')
      .refine(val => !val.includes('<script'), 'Invalid dropoff location'),
    
    // Service type validation - only allow defined services
    serviceType: z.enum([
      'airport-transfer',
      'close-protection', 
      'corporate-transport',
      'diplomatic-services',
      'family-office',
      'lifestyle-management',
      'private-hire',
      'professional-support',
      'shopping-assistance',
      'taxi-services',
      'vip-transport',
      'wedding-transport'
    ], {
      errorMap: () => ({ message: 'Invalid service type selected' })
    }),
    
    // Date and time validation
    bookingDate: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .refine(val => {
        const date = new Date(val);
        const today = new Date();
        return date >= today;
      }, 'Booking date must be in the future'),
    
    bookingTime: z.string()
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    
    // Client information validation
    clientName: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name too long')
      .regex(/^[a-zA-Z\s'\-\.]+$/, 'Name can only contain letters, spaces, apostrophes, hyphens, and periods')
      .refine(val => !val.includes('<'), 'Invalid characters in name'),
    
    clientEmail: z.string()
      .email('Invalid email format')
      .max(254, 'Email address too long')
      .refine(val => !val.includes('<script'), 'Invalid email format'),
    
    clientPhone: z.string()
      .regex(/^(\+44\s?|0)((7\d{9})|(1\d{9})|(2\d{9})|(3\d{9}))$/, 'Invalid UK phone number format')
      .transform(val => val.replace(/\s/g, '')), // Remove spaces
    
    // Security and special requirements
    securityLevel: z.enum(['standard', 'enhanced', 'executive', 'diplomatic'], {
      errorMap: () => ({ message: 'Invalid security level' })
    }).optional(),
    
    specialRequirements: z.string()
      .max(1000, 'Special requirements too long')
      .optional()
      .transform(val => val ? sanitizeInput(val) : val),
    
    // Additional security fields
    numberOfPassengers: z.number()
      .int('Number of passengers must be a whole number')
      .min(1, 'At least 1 passenger required')
      .max(8, 'Maximum 8 passengers allowed'),
    
    vehicleType: z.enum(['sedan', 'suv', 'luxury', 'armored'], {
      errorMap: () => ({ message: 'Invalid vehicle type' })
    }).optional(),
    
    // Payment information (basic validation)
    estimatedPrice: z.number()
      .positive('Price must be positive')
      .max(10000, 'Price seems unusually high')
      .optional()
  }),

  // Contact form validation
  contactForm: z.object({
    name: z.string()
      .min(2, 'Name is required')
      .max(100, 'Name too long')
      .regex(/^[a-zA-Z\s'\-\.]+$/, 'Invalid characters in name')
      .refine(val => !val.includes('<'), 'Invalid name'),
    
    email: z.string()
      .email('Invalid email format')
      .max(254, 'Email too long')
      .refine(val => !val.includes('<script'), 'Invalid email'),
    
    phone: z.string()
      .regex(/^(\+44\s?|0)((7\d{9})|(1\d{9})|(2\d{9})|(3\d{9}))$/, 'Invalid UK phone number')
      .optional()
      .or(z.literal('')),
    
    subject: z.string()
      .min(5, 'Subject is required')
      .max(200, 'Subject too long')
      .refine(val => !val.includes('<script'), 'Invalid subject'),
    
    message: z.string()
      .min(10, 'Message must be at least 10 characters')
      .max(2000, 'Message too long')
      .transform(val => sanitizeInput(val)),
    
    // Honeypot field - should be empty
    website: z.string().max(0, 'Bot detected').optional(),
    
    // GDPR consent
    privacyConsent: z.boolean()
      .refine(val => val === true, 'Privacy consent is required'),
    
    marketingConsent: z.boolean().optional()
  }),

  // Security assessment validation
  securityAssessment: z.object({
    // Risk level assessment
    riskLevel: z.enum(['low', 'medium', 'high', 'critical'], {
      errorMap: () => ({ message: 'Invalid risk level' })
    }),
    
    // Threat assessment categories
    threatFactors: z.array(z.enum([
      'public-profile',
      'high-value-target', 
      'previous-incidents',
      'controversial-business',
      'international-travel',
      'political-exposure',
      'media-attention',
      'family-concerns'
    ])).max(8, 'Too many threat factors selected'),
    
    // Protection requirements
    protectionLevel: z.enum([
      'standard',
      'enhanced', 
      'executive',
      'diplomatic',
      'celebrity',
      'government'
    ], {
      errorMap: () => ({ message: 'Invalid protection level' })
    }),
    
    // Location assessment
    operationalArea: z.enum([
      'london-central',
      'london-greater',
      'uk-nationwide', 
      'international',
      'high-risk-area'
    ]),
    
    // Timeline requirements
    responseTime: z.enum([
      'immediate',
      'within-hour',
      'within-day',
      'planned'
    ]),
    
    // Additional context
    additionalNotes: z.string()
      .max(500, 'Notes too long')
      .optional()
      .transform(val => val ? sanitizeInput(val) : val),
    
    // Assessment metadata
    assessmentDate: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    
    assessmentValid: z.boolean().default(true)
  }),

  // Quote request validation
  quoteRequest: z.object({
    serviceType: z.string()
      .min(1, 'Service type required')
      .max(50, 'Service type too long'),
    
    pickupPostcode: z.string()
      .regex(/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i, 'Invalid UK postcode')
      .transform(val => val.toUpperCase().replace(/\s/g, '')),
    
    dropoffPostcode: z.string()
      .regex(/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i, 'Invalid UK postcode')
      .transform(val => val.toUpperCase().replace(/\s/g, '')),
    
    distance: z.number()
      .positive('Distance must be positive')
      .max(1000, 'Distance too large'),
    
    duration: z.number()
      .positive('Duration must be positive')
      .max(24, 'Duration too long'),
    
    passengers: z.number()
      .int('Passenger count must be whole number')
      .min(1, 'At least 1 passenger')
      .max(8, 'Maximum 8 passengers')
  })
};

// Rate limiting configuration
export const rateLimits = {
  bookingForm: { requests: 3, windowMinutes: 15 },
  contactForm: { requests: 2, windowMinutes: 10 },
  securityAssessment: { requests: 1, windowMinutes: 30 },
  quoteRequest: { requests: 10, windowMinutes: 5 },
  apiCalls: { requests: 100, windowMinutes: 60 }
};

// IP address validation
export const validateIPAddress = (ip: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

// Sanitize user input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

// Validate file uploads
export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = [
    'image/jpeg',
    'image/png', 
    'image/webp',
    'application/pdf',
    'text/plain'
  ];
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  const minSize = 1024; // 1KB minimum

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB` 
    };
  }

  if (file.size < minSize) {
    return { 
      valid: false, 
      error: 'File too small. Minimum size: 1KB' 
    };
  }

  // Check filename
  const filename = file.name;
  const allowedExtensions = /\.(jpg|jpeg|png|webp|pdf|txt)$/i;
  if (!allowedExtensions.test(filename)) {
    return { 
      valid: false, 
      error: 'Invalid file extension' 
    };
  }

  // Check for suspicious filenames
  const suspiciousPatterns = [
    /\.(exe|bat|cmd|scr|pif|jar|class|sh|php|asp|jsp)$/i,
    /\.\./,
    /[<>:"|?*]/,
    /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(filename))) {
    return { 
      valid: false, 
      error: 'Suspicious filename detected' 
    };
  }

  return { valid: true };
};

// Validate UK postcode format
export const validateUKPostcode = (postcode: string): boolean => {
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
  return ukPostcodeRegex.test(postcode);
};

// Validate UK phone number
export const validateUKPhone = (phone: string): boolean => {
  const ukPhoneRegex = /^(\+44\s?|0)((7\d{9})|(1\d{9})|(2\d{9})|(3\d{9}))$/;
  return ukPhoneRegex.test(phone.replace(/\s/g, ''));
};

// Check for suspicious content patterns
export const detectSuspiciousContent = (text: string): { suspicious: boolean; reasons: string[] } => {
  const suspiciousPatterns = [
    { pattern: /<script/i, reason: 'Script tag detected' },
    { pattern: /javascript:/i, reason: 'JavaScript protocol detected' },
    { pattern: /on\w+\s*=/i, reason: 'Event handler detected' },
    { pattern: /eval\s*\(/i, reason: 'Eval function detected' },
    { pattern: /document\.cookie/i, reason: 'Cookie access detected' },
    { pattern: /window\.location/i, reason: 'Location manipulation detected' },
    { pattern: /base64/i, reason: 'Base64 encoding detected' },
    { pattern: /union.*select/i, reason: 'SQL injection pattern detected' },
    { pattern: /drop\s+table/i, reason: 'SQL drop command detected' },
    { pattern: /\.\.\//i, reason: 'Directory traversal detected' }
  ];

  const reasons: string[] = [];
  
  for (const { pattern, reason } of suspiciousPatterns) {
    if (pattern.test(text)) {
      reasons.push(reason);
    }
  }

  return {
    suspicious: reasons.length > 0,
    reasons
  };
};

// Validate business hours
export const validateBusinessHours = (date: Date): boolean => {
  const hour = date.getHours();
  const day = date.getDay();
  
  // Business hours: 6 AM - 11 PM, 7 days a week (24/7 for security)
  return hour >= 6 && hour <= 23;
};

// Generate secure random token
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};