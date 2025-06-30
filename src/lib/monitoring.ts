// Error tracking and monitoring utilities

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  userId?: string;
}

class ErrorTracker {
  private errors: ErrorInfo[] = [];
  private maxErrors = 100;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalErrorHandlers();
    }
  }

  private setupGlobalErrorHandlers() {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    });

    // Handle Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    });
  }

  logError(error: Partial<ErrorInfo>) {
    const errorInfo: ErrorInfo = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      componentStack: error.componentStack,
      timestamp: error.timestamp || Date.now(),
      url: error.url || (typeof window !== 'undefined' ? window.location.href : 'unknown'),
      userAgent: error.userAgent || (typeof window !== 'undefined' ? navigator.userAgent : 'unknown'),
      userId: error.userId,
    };

    this.errors.push(errorInfo);

    // Keep only the last maxErrors errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorInfo);
    }

    // Send to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorInfo);
    }
  }

  private async sendToMonitoringService(error: ErrorInfo) {
    try {
      // This would integrate with services like Sentry, LogRocket, etc.
      // For now, we'll store it locally and could send to our own API
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      });
    } catch (err) {
      console.error('Failed to send error to monitoring service:', err);
    }
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }
}

// Performance monitoring
class PerformanceMonitor {
  private metrics: Record<string, number> = {};

  startTiming(label: string) {
    this.metrics[`${label}_start`] = performance.now();
  }

  endTiming(label: string): number {
    const startTime = this.metrics[`${label}_start`];
    if (startTime) {
      const duration = performance.now() - startTime;
      this.metrics[label] = duration;
      return duration;
    }
    return 0;
  }

  getMetrics(): Record<string, number> {
    return { ...this.metrics };
  }

  logPageLoad() {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        timeToInteractive: navigation.loadEventEnd - navigation.fetchStart,
      };

      // Get paint metrics
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime;
        }
      });

      console.log('Page Performance Metrics:', metrics);
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'page_load_performance', {
          event_category: 'Performance',
          dom_content_loaded: metrics.domContentLoaded,
          time_to_interactive: metrics.timeToInteractive,
        });
      }
    }
  }
}

// Create global instances
export const errorTracker = new ErrorTracker();
export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export const logError = (error: Error, additionalInfo?: Partial<ErrorInfo>) => {
  errorTracker.logError({
    message: error.message,
    stack: error.stack,
    ...additionalInfo,
  });
};

export const logUserAction = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

// Custom hook for monitoring
export const useMonitoring = () => {
  const logError = (error: Error, context?: string) => {
    errorTracker.logError({
      message: error.message,
      stack: error.stack,
      componentStack: context,
    });
  };

  const logUserAction = (action: string, category: string, label?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  };

  const startTiming = (label: string) => performanceMonitor.startTiming(label);
  const endTiming = (label: string) => performanceMonitor.endTiming(label);

  return {
    logError,
    logUserAction,
    startTiming,
    endTiming,
  };
};