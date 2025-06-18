export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph: {
    title: string
    description: string
    type: 'website' | 'article' | 'service'
    url?: string
    images: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
  }
  twitter: {
    card: 'summary' | 'summary_large_image'
    title: string
    description: string
    images?: string[]
  }
  structuredData?: object
}

export const defaultSEO: SEOConfig = {
  title: 'GQ Security Services - Professional Close Protection & Private Hire',
  description: 'SIA licensed security professionals providing discreet protection and premium transport services in the UK. Elite close protection, private hire, corporate security.',
  keywords: ['close protection', 'security services', 'private hire', 'bodyguard', 'SIA licensed', 'UK security'],
  openGraph: {
    title: 'GQ Security Services - Professional Close Protection & Private Hire',
    description: 'SIA licensed security professionals providing discreet protection and premium transport services in the UK.',
    type: 'website',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'GQ Security Services - Professional Security Solutions'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GQ Security Services - Professional Close Protection & Private Hire',
    description: 'SIA licensed security professionals providing discreet protection and premium transport services in the UK.',
    images: ['/images/twitter-image.jpg']
  }
}

export const servicesSEO = {
  'close-protection': {
    title: 'Close Protection Services - Elite Personal Security | GQ Security',
    description: 'Professional SIA licensed close protection officers providing discreet personal security and threat management services across the UK.',
    keywords: ['close protection', 'personal security', 'bodyguard services', 'executive protection', 'SIA licensed'],
    openGraph: {
      title: 'Close Protection Services - Elite Personal Security | GQ Security',
      description: 'Professional SIA licensed close protection officers providing discreet personal security and threat management services.',
      type: 'service' as const,
      images: [{
        url: '/images/close-protection-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Close Protection Services - Professional Security'
      }]
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Close Protection Services - Elite Personal Security',
      description: 'Professional SIA licensed close protection officers providing discreet personal security and threat management.',
      images: ['/images/close-protection-twitter.jpg']
    }
  },
  'private-hire': {
    title: 'Private Hire & Chauffeur Services - Luxury Transport | GQ Security',
    description: 'Premium chauffeur services with trained security drivers and luxury vehicles. Professional private hire with security expertise.',
    keywords: ['private hire', 'chauffeur services', 'luxury transport', 'security drivers', 'executive transport'],
    openGraph: {
      title: 'Private Hire & Chauffeur Services - Luxury Transport | GQ Security',
      description: 'Premium chauffeur services with trained security drivers and luxury vehicles.',
      type: 'service' as const,
      images: [{
        url: '/images/private-hire-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Private Hire Services - Luxury Transport'
      }]
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Private Hire & Chauffeur Services - Luxury Transport',
      description: 'Premium chauffeur services with trained security drivers and luxury vehicles.',
      images: ['/images/private-hire-twitter.jpg']
    }
  },
  'corporate': {
    title: 'Corporate Security Services - Business Protection | GQ Security',
    description: 'Comprehensive corporate security solutions and executive protection services for businesses across the UK.',
    keywords: ['corporate security', 'business protection', 'executive security', 'commercial security', 'workplace security'],
    openGraph: {
      title: 'Corporate Security Services - Business Protection | GQ Security',
      description: 'Comprehensive corporate security solutions and executive protection services for businesses.',
      type: 'service' as const,
      images: [{
        url: '/images/corporate-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Corporate Security Services - Business Protection'
      }]
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Corporate Security Services - Business Protection',
      description: 'Comprehensive corporate security solutions and executive protection services.',
      images: ['/images/corporate-twitter.jpg']
    }
  },
  'vip': {
    title: 'VIP Protection Services - High-Profile Security | GQ Security',
    description: 'Bespoke VIP security and transport solutions for high-profile clients. Discreet, professional protection services.',
    keywords: ['VIP protection', 'celebrity security', 'high profile security', 'luxury security', 'elite protection'],
    openGraph: {
      title: 'VIP Protection Services - High-Profile Security | GQ Security',
      description: 'Bespoke VIP security and transport solutions for high-profile clients.',
      type: 'service' as const,
      images: [{
        url: '/images/vip-og.jpg',
        width: 1200,
        height: 630,
        alt: 'VIP Protection Services - High-Profile Security'
      }]
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'VIP Protection Services - High-Profile Security',
      description: 'Bespoke VIP security and transport solutions for high-profile clients.',
      images: ['/images/vip-twitter.jpg']
    }
  },
  'weddings': {
    title: 'Wedding Security Services - Special Day Protection | GQ Security',
    description: 'Discreet wedding security and luxury transport for your special day. Professional protection services for weddings.',
    keywords: ['wedding security', 'wedding protection', 'bridal security', 'event security', 'wedding transport'],
    openGraph: {
      title: 'Wedding Security Services - Special Day Protection | GQ Security',
      description: 'Discreet wedding security and luxury transport for your special day.',
      type: 'service' as const,
      images: [{
        url: '/images/wedding-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Security Services - Special Day Protection'
      }]
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Wedding Security Services - Special Day Protection',
      description: 'Discreet wedding security and luxury transport for your special day.',
      images: ['/images/wedding-twitter.jpg']
    }
  }
}

// Structured Data Templates
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "SecurityService",
  "name": "GQ Security Services",
  "description": "Professional security services including close protection, private hire, and corporate security solutions.",
  "url": "https://gqsecurity.co.uk",
  "logo": "https://gqsecurity.co.uk/images/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
    "addressRegion": "England"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-20-1234-5678",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "areaServed": "United Kingdom",
  "serviceType": [
    "Close Protection",
    "Private Hire",
    "Corporate Security",
    "VIP Protection",
    "Wedding Security"
  ],
  "hasCredential": "SIA Licensed"
}

export const serviceStructuredData = (serviceName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "SecurityService",
    "name": "GQ Security Services",
    "url": "https://gqsecurity.co.uk"
  },
  "areaServed": "United Kingdom",
  "hasCredential": "SIA Licensed",
  ...(price && { "offers": {
    "@type": "Offer",
    "priceCurrency": "GBP",
    "price": price,
    "availability": "https://schema.org/InStock"
  }})
})

export const reviewStructuredData = (reviews: any[]) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GQ Security Services",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": reviews.length.toString()
  },
  "review": reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString()
    },
    "reviewBody": review.text
  }))
})