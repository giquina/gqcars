import { trackEvent, trackConversion, trackEngagement } from './gtag';

// 🚗 BOOKING EVENTS
export const trackBookingEvents = {
  // Quote request started
  quoteStarted: (serviceType: string, location: string) => {
    trackEvent('quote_started', 'booking', serviceType, undefined, {
      service_type: serviceType,
      pickup_location: location,
      currency: 'GBP',
      booking_flow: 'web',
      timestamp: new Date().toISOString()
    });
  },

  // Quote calculation completed
  quoteCalculated: (serviceType: string, price: number, distance: number) => {
    trackEvent('quote_calculated', 'booking', serviceType, price, {
      service_type: serviceType,
      estimated_price: price,
      distance_miles: distance,
      currency: 'GBP',
      quote_accuracy: 'real_time'
    });
  },

  // Booking form started
  bookingStarted: (serviceType: string) => {
    trackEvent('begin_checkout', 'ecommerce', serviceType, undefined, {
      service_type: serviceType,
      checkout_step: 1,
      booking_method: 'online_form',
      funnel_step: 'booking_form_start'
    });
  },

  // Booking form step completed
  bookingStepCompleted: (step: number, stepName: string, serviceType: string) => {
    trackEvent('checkout_progress', 'ecommerce', stepName, step, {
      checkout_step: step,
      step_name: stepName,
      service_type: serviceType,
      funnel_step: `step_${step}_${stepName}`
    });
  },

  // Booking completed (conversion)
  bookingCompleted: (serviceType: string, price: number, bookingId: string) => {
    // Track as purchase event
    trackEvent('purchase', 'ecommerce', serviceType, price, {
      transaction_id: bookingId,
      service_type: serviceType,
      value: price,
      currency: 'GBP',
      booking_method: 'online_form',
      conversion_type: 'booking_completed'
    });

    // Also track as conversion
    trackConversion('booking_completed', price, 'GBP', {
      booking_id: bookingId,
      service_type: serviceType
    });
  },

  // Booking cancelled
  bookingCancelled: (serviceType: string, step: number, reason?: string) => {
    trackEvent('checkout_abandon', 'ecommerce', serviceType, step, {
      service_type: serviceType,
      abandon_step: step,
      abandon_reason: reason || 'unknown',
      funnel_exit: `step_${step}`
    });
  },

  // Security assessment completed
  assessmentCompleted: (riskLevel: string, score: number, serviceType?: string) => {
    trackEvent('assessment_completed', 'security', riskLevel, score, {
      risk_level: riskLevel,
      security_score: score,
      assessment_type: 'online_questionnaire',
      service_type: serviceType,
      completion_time: new Date().toISOString()
    });
  }
};

// 🎯 USER ENGAGEMENT EVENTS
export const trackEngagementEvents = {
  // Service page interactions
  serviceViewed: (serviceName: string, timeSpent: number) => {
    trackEngagement('service_page_view', timeSpent, {
      service_name: serviceName,
      time_spent_seconds: timeSpent,
      page_type: 'service_detail',
      engagement_depth: timeSpent > 60 ? 'high' : timeSpent > 30 ? 'medium' : 'low'
    });
  },

  // Service page CTA clicked
  serviceCtaClicked: (serviceName: string, ctaType: string) => {
    trackEvent('service_cta_click', 'engagement', serviceName, undefined, {
      service_name: serviceName,
      cta_type: ctaType,
      click_context: 'service_page'
    });
  },

  // AI Chat interactions
  chatStarted: (context?: string) => {
    trackEvent('chat_started', 'ai_interaction', 'claude_widget', undefined, {
      chat_type: 'ai_assistant',
      widget_type: 'claude',
      start_context: context || 'unknown',
      timestamp: new Date().toISOString()
    });
  },

  chatMessageSent: (messageType: string, messageLength: number) => {
    trackEvent('chat_message', 'ai_interaction', messageType, messageLength, {
      message_type: messageType,
      message_length: messageLength,
      chat_session: 'active',
      interaction_depth: 'message_sent'
    });
  },

  chatCompleted: (messageCount: number, duration: number, satisfaction?: number) => {
    trackEvent('chat_completed', 'ai_interaction', 'session_end', duration, {
      message_count: messageCount,
      session_duration: duration,
      satisfaction_score: satisfaction,
      completion_type: 'user_ended'
    });
  },

  // WhatsApp widget clicks
  whatsappClicked: (context: string, serviceType?: string) => {
    trackEvent('whatsapp_clicked', 'communication', context, undefined, {
      communication_method: 'whatsapp',
      click_context: context,
      service_type: serviceType,
      contact_intent: 'customer_service'
    });
  },

  // Phone number clicks
  phoneClicked: (context: string) => {
    trackEvent('phone_clicked', 'communication', context, undefined, {
      communication_method: 'phone',
      click_context: context,
      contact_intent: 'direct_call'
    });
  },

  // Trust badge clicks
  trustBadgeClicked: (badgeType: string, context?: string) => {
    trackEvent('trust_badge_clicked', 'credibility', badgeType, undefined, {
      badge_type: badgeType,
      certification: badgeType,
      click_context: context || 'homepage'
    });
  },

  // Social media clicks
  socialMediaClicked: (platform: string, context: string) => {
    trackEvent('social_media_click', 'engagement', platform, undefined, {
      social_platform: platform,
      click_context: context,
      external_link: true
    });
  }
};

// 📱 MOBILE & PWA EVENTS
export const trackMobileEvents = {
  // Mobile app banner interactions
  appBannerShown: (context: string) => {
    trackEvent('app_banner_shown', 'mobile', 'pwa_promotion', undefined, {
      banner_context: context,
      device_type: 'mobile',
      promotion_type: 'app_install'
    });
  },

  appBannerClicked: (context: string) => {
    trackEvent('app_banner_clicked', 'mobile', 'pwa_download', undefined, {
      banner_context: context,
      device_type: 'mobile',
      install_intent: 'clicked'
    });
  },

  appInstalled: () => {
    trackEvent('app_install', 'mobile', 'pwa_installed', undefined, {
      install_method: 'pwa',
      platform: 'web'
    });
    
    trackConversion('app_install', undefined, undefined, {
      conversion_type: 'app_installed'
    });
  },

  // QR code scans
  qrCodeScanned: (serviceType: string, context: string) => {
    trackEvent('qr_code_scanned', 'mobile', serviceType, undefined, {
      scan_method: 'mobile_camera',
      service_type: serviceType,
      scan_context: context,
      device_capability: 'camera'
    });
  },

  // Mobile-specific interactions
  mobileMenuOpened: () => {
    trackEvent('mobile_menu_opened', 'navigation', 'hamburger_menu', undefined, {
      device_type: 'mobile',
      navigation_method: 'menu'
    });
  },

  swipeGestureUsed: (direction: string, context: string) => {
    trackEvent('swipe_gesture', 'mobile', direction, undefined, {
      swipe_direction: direction,
      gesture_context: context,
      interaction_type: 'touch'
    });
  }
};

// 🔍 PERFORMANCE EVENTS
export const trackPerformanceEvents = {
  // Page load performance
  pageLoadTime: (url: string, loadTime: number, performanceMetrics?: any) => {
    trackEvent('page_load_time', 'performance', url, loadTime, {
      load_time_ms: loadTime,
      page_url: url,
      performance_category: loadTime > 3000 ? 'slow' : loadTime > 1000 ? 'medium' : 'fast',
      ...performanceMetrics
    });
  },

  // Component load errors
  componentError: (componentName: string, errorMessage: string, errorStack?: string) => {
    trackEvent('component_error', 'error', componentName, undefined, {
      component_name: componentName,
      error_message: errorMessage,
      error_type: 'react_component',
      error_stack: errorStack?.substring(0, 500) // Limit stack trace length
    });
  },

  // API call performance
  apiCallPerformance: (endpoint: string, duration: number, status: number) => {
    trackEvent('api_performance', 'performance', endpoint, duration, {
      api_endpoint: endpoint,
      response_time_ms: duration,
      status_code: status,
      performance_category: duration > 5000 ? 'slow' : duration > 2000 ? 'medium' : 'fast'
    });
  },

  // Form submission errors
  formError: (formName: string, fieldName: string, errorType: string) => {
    trackEvent('form_error', 'error', formName, undefined, {
      form_name: formName,
      field_name: fieldName,
      error_type: errorType,
      validation_error: true
    });
  }
};

// 🎯 BUSINESS INTELLIGENCE EVENTS
export const trackBusinessEvents = {
  // Lead generation
  leadGenerated: (source: string, leadType: string, value?: number) => {
    trackEvent('generate_lead', 'business', leadType, value, {
      lead_source: source,
      lead_type: leadType,
      lead_value: value,
      timestamp: new Date().toISOString()
    });

    trackConversion('lead_generated', value, 'GBP', {
      lead_source: source,
      lead_type: leadType
    });
  },

  // Newsletter signup
  newsletterSignup: (source: string) => {
    trackEvent('newsletter_signup', 'marketing', source, undefined, {
      signup_source: source,
      marketing_consent: true
    });
  },

  // File downloads
  fileDownload: (fileName: string, fileType: string, context: string) => {
    trackEvent('file_download', 'content', fileName, undefined, {
      file_name: fileName,
      file_type: fileType,
      download_context: context
    });
  },

  // Video interactions
  videoPlayed: (videoName: string, duration: number) => {
    trackEvent('video_play', 'content', videoName, duration, {
      video_name: videoName,
      video_duration: duration,
      content_type: 'video'
    });
  },

  videoCompleted: (videoName: string, watchDuration: number, totalDuration: number) => {
    trackEvent('video_complete', 'content', videoName, watchDuration, {
      video_name: videoName,
      watch_duration: watchDuration,
      total_duration: totalDuration,
      completion_rate: Math.round((watchDuration / totalDuration) * 100)
    });
  }
};

// 🔐 SECURITY & COMPLIANCE EVENTS
export const trackSecurityEvents = {
  // Security feature usage
  securityFeatureUsed: (featureName: string, context: string) => {
    trackEvent('security_feature', 'security', featureName, undefined, {
      feature_name: featureName,
      usage_context: context,
      security_focus: true
    });
  },

  // Privacy consent
  privacyConsentGiven: (consentType: string, accepted: boolean) => {
    trackEvent('privacy_consent', 'compliance', consentType, accepted ? 1 : 0, {
      consent_type: consentType,
      consent_given: accepted,
      gdpr_compliance: true,
      timestamp: new Date().toISOString()
    });
  },

  // Cookie consent
  cookieConsentGiven: (consentLevel: string) => {
    trackEvent('cookie_consent', 'compliance', consentLevel, undefined, {
      consent_level: consentLevel,
      cookie_policy: true
    });
  }
};