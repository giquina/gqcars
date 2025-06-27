import { Car, Clock, Phone, MapPin, Star, Shield, CreditCard } from 'lucide-react'
import GQCarsLogo from '@/app/components/ui/GQCarsLogo'
import ServicePage from "@/app/components/ui/ServicePage";

const taxiFeatures = [
  {
    title: "Licensed London Taxi Service",
    description: "Professional taxi service with licensed drivers and luxury vehicles for point-to-point transport across London. More affordable than private hire while maintaining security standards and professional service excellence."
  },
  {
    title: "Rapid Response Booking",
    description: "Quick booking system with average pickup times under 15 minutes in central London. Our dispatch system optimizes driver allocation for efficient service and minimal waiting times throughout Greater London."
  },
  {
    title: "Transparent Fixed Pricing",
    description: "Clear, upfront pricing with no surge charges or hidden fees. Know your fare before you travel with our transparent pricing structure for common routes and destinations across London."
  },
  {
    title: "Security-Trained Drivers",
    description: "All drivers undergo security awareness training and background checks. While more accessible than close protection, our taxi service maintains higher security standards than standard cab services."
  },
  {
    title: "Clean & Comfortable Vehicles",
    description: "Well-maintained vehicle fleet with regular cleaning and maintenance schedules. Comfortable seating, climate control, and professional presentation for a premium taxi experience in London."
  },
  {
    title: "Corporate Account Options",
    description: "Business account services for companies requiring regular taxi transport. Centralized billing, trip reporting, and priority booking for corporate clients with multiple users and regular transport needs."
  }
];

const taxiTestimonials = [
  {
    name: "James Morrison",
    role: "Business Consultant",
    content: "For quick trips around London, their taxi service is perfect. More reliable than Uber, more affordable than private hire, and the drivers are professional. I use them for client meetings when I don't need the full chauffeur service.",
    rating: 5
  },
  {
    name: "Sophie Martin",
    role: "Marketing Director",
    content: "Our company account makes business travel so much easier. The drivers are always punctual, the vehicles are clean, and the billing is straightforward. Great value for professional transport around London.",
    rating: 5
  },
  {
    name: "David Wright",
    role: "Tourist from New York",
    content: "Used their taxi service throughout my London visit. Much better than regular black cabs - cleaner cars, professional drivers, and fair pricing. Felt safe and comfortable as a tourist in an unfamiliar city.",
    rating: 5
  }
];

const taxiCaseStudies = [
  {
    title: "Corporate Event Transportation",
    challenge: "Financial services company required cost-effective transport for 50 employees attending training event across London. Needed reliable service throughout the day with multiple pickup and drop-off points while maintaining professional standards.",
    solution: "Deployed fleet of 15 taxi vehicles with coordinated dispatch, provided dedicated account manager for day-of coordination, established pickup schedule at multiple locations, and maintained communication throughout event.",
    result: "Successful transport of all 50 employees with zero delays or issues. Company saved 40% compared to individual expense reimbursements while maintaining professional service standards. Signed annual corporate account agreement."
  },
  {
    title: "Tourist Group Transportation",
    challenge: "International tour group of 20 visitors needed flexible taxi service for London sightseeing tour with multiple stops at tourist attractions, restaurants, and shopping areas over 3-day period.",
    solution: "Assigned dedicated taxi coordinators familiar with tourist attractions, provided vehicles with tour knowledge drivers, coordinated timing between multiple stops, and offered flexible scheduling for group activities.",
    result: "Successful 3-day London tour with positive feedback on driver knowledge and service quality. Group completed all planned activities with efficient transport coordination. Tour operator added us to their preferred supplier list."
  }
];

const taxiPricing = [
  {
    title: "Standard Taxi Service",
    description: "Point-to-point taxi transport in London",
    startingPrice: "£25",
    features: [
      "Licensed professional driver",
      "Clean, comfortable vehicle",
      "Fixed route pricing",
      "15-minute average pickup",
      "Central London coverage",
      "Card payment accepted"
    ]
  },
  {
    title: "Business Taxi Account",
    description: "Corporate taxi service with account billing",
    startingPrice: "£20/trip",
    features: [
      "Corporate account setup",
      "Priority booking access",
      "Monthly consolidated billing",
      "Trip reporting included",
      "Multiple user access",
      "Greater London coverage"
    ]
  },
  {
    title: "Tourist & Visitor Service",
    description: "Flexible taxi service for visitors to London",
    startingPrice: "£30/trip",
    features: [
      "Tourist-friendly drivers",
      "Attraction knowledge included",
      "Flexible scheduling",
      "Sightseeing coordination",
      "Hotel pickup/drop-off",
      "Multiple language support"
    ]
  }
];

const taxiFaqs = [
  {
    question: "How is your taxi service different from regular black cabs?",
    answer: "Our taxi service provides cleaner vehicles, security-trained drivers, fixed pricing, and professional service standards. While more affordable than our private hire service, we maintain higher standards than standard taxi services with background-checked drivers and well-maintained vehicles."
  },
  {
    question: "What areas do you cover for taxi service?",
    answer: "We provide taxi service throughout Greater London with primary focus on central London zones 1-3. For destinations outside Greater London, we can provide service with advance booking and distance-based pricing."
  },
  {
    question: "How quickly can you provide a taxi?",
    answer: "Average pickup time is 10-15 minutes in central London, depending on time of day and demand. We maintain a fleet of available vehicles throughout London and use an efficient dispatch system to minimize waiting times."
  },
  {
    question: "Do you offer corporate accounts for businesses?",
    answer: "Yes, we provide corporate account services with consolidated monthly billing, trip reporting, priority booking, and multiple user access. This simplifies expense management for businesses requiring regular taxi transport for employees."
  },
  {
    question: "Can I book in advance or only on-demand?",
    answer: "Both options are available. You can book immediate pickup for current transport needs or schedule advance bookings for specific times and dates. Advance booking ensures guaranteed availability during busy periods."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit cards, and corporate account billing. Payment can be made directly to the driver or processed through corporate accounts for business clients with established billing arrangements."
  }
];

const seoKeywords = [
  "taxi service London",
  "professional taxi London",
  "corporate taxi service",
  "licensed taxi drivers",
  "London cab service",
  "business taxi London",
  "reliable taxi service",
  "professional cab London",
  "corporate transport taxi",
  "London taxi booking"
];

export default function TaxiPage() {
  return (
    <ServicePage
      title="Professional Taxi Services"
      description="Reliable, professional taxi service across London with security-trained drivers and transparent pricing. More affordable than private hire while maintaining professional standards for business and personal transport needs."
      heroImage="/images/services/taxi-hero.jpg"
      Icon={Car}
      category="Taxi"
      features={taxiFeatures}
      testimonials={taxiTestimonials}
      caseStudies={taxiCaseStudies}
      pricing={taxiPricing}
      faqs={taxiFaqs}
      seoKeywords={seoKeywords}
    />
  );
}
