export default function SEOSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "GQ Cars LTD",
    "description": "Premium security taxi service with SIA Licensed Close Protection Officers. Professional drivers, 24/7 availability, advanced booking technology.",
    "url": "https://gqcars.co.uk",
    "telephone": "+44 7407 655 203",
    "email": "info@gqcars.co.uk",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "££",
    "acceptsReservations": true,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "GQ Cars Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Security Taxi Service",
            "description": "SIA Licensed Close Protection Officer driven taxi service"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Transport",
            "description": "Executive transport for business professionals"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Airport Transfer",
            "description": "Professional airport transfer service"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1247"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Exceptional service! The SIA licensed driver was professional and made me feel completely safe during my late-night journey."
      }
    ],
    "sameAs": [
      "https://facebook.com/gqcarsltd",
      "https://twitter.com/gqcarsltd", 
      "https://linkedin.com/company/gqcarsltd"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44 7407 655 203",
      "contactType": "customer service",
      "availableLanguage": "English",
      "areaServed": "London"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "GQ Cars Security Taxi Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "GQ Cars LTD"
    },
    "areaServed": {
      "@type": "City",
      "name": "London"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Business professionals, VIPs, security-conscious individuals"
    },
    "serviceType": "Security Taxi Service",
    "description": "Professional taxi service with SIA Licensed Close Protection Officers providing secure transportation across London."
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes GQ Cars different from regular taxi services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GQ Cars provides SIA Licensed Close Protection Officers as drivers, offering both transportation and security services. All our drivers are professionally trained, DBS checked, and provide a premium, secure travel experience."
        }
      },
      {
        "@type": "Question",
        "name": "Are your drivers really SIA licensed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our drivers hold valid SIA (Security Industry Authority) licenses and are trained Close Protection Officers. This ensures the highest level of professional security and service."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I book a ride?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI-powered booking system allows you to book a secure ride in under 60 seconds. We offer both immediate and scheduled bookings 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Do you operate 24/7?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, GQ Cars operates 24 hours a day, 7 days a week. Our security-trained drivers are available whenever you need safe, professional transportation."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}