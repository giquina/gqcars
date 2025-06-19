export const Colors = {
  // GQ Cars Brand Colors
  primary: '#b45309', // GQ Gold
  secondary: '#0f172a', // GQ Blue
  background: '#030712', // GQ Black
  accent: '#475569', // GQ Accent Grey
  
  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: '#e5e7eb',
    muted: '#9ca3af',
    inverse: '#030712',
  },
  
  // UI Colors
  border: '#374151',
  card: '#1f2937',
  input: '#374151',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Status Colors
  online: '#10b981',
  offline: '#6b7280',
  busy: '#f59e0b',
  emergency: '#ef4444',
  
  // Booking Status Colors
  pending: '#f59e0b',
  confirmed: '#10b981',
  inProgress: '#3b82f6',
  completed: '#6b7280',
  cancelled: '#ef4444',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};