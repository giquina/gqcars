import ServicePage from "@/app/components/ui/ServicePage";
import { Car } from "lucide-react";

const privateHireFeatures = [
  {
    title: "Luxury Fleet Selection",
    description: "Choose from our premium fleet including Mercedes S-Class, BMW 7 Series, Bentley, Rolls-Royce, and Range Rover vehicles. All vehicles maintained to showroom condition with leather interiors, climate control, and premium sound systems."
  },
  {
    title: "Professional Security Drivers",
    description: "SIA-licensed chauffeurs trained in defensive driving, threat awareness, and client service excellence. Our drivers undergo continuous training in security protocols, customer service, and luxury vehicle operation."
  },
  {
    title: "Flexible Hourly & Daily Rates",
    description: "Customizable hire periods from hourly rates to weekly packages. Whether you need transport for a few hours, full day, or extended period, our pricing adapts to your specific requirements with transparent, competitive rates."
  },
  {
    title: "As-Directed Service",
    description: "Complete flexibility for your schedule with 'wait and return' service. Your driver remains available for multiple stops, route changes, and extended waiting periods to accommodate your dynamic business and personal schedule."
  },
  {
    title: "Business & Personal Use",
    description: "Suitable for business meetings, personal appointments, shopping trips, restaurant visits, and social events. Our service adapts to both professional and personal requirements with appropriate etiquette and discretion."
  },
  {
    title: "Advanced Booking & Last-Minute Requests",
    description: "Book in advance for guaranteed availability or contact us for last-minute requirements. Our operations team maintains vehicle availability for urgent requests with 24/7 booking and dispatch capabilities."
  }
];

const privateHireTestimonials = [
  {
    name: "Jonathan Pierce",
    role: "Management Consultant",
    content: "I use GQ Security's private hire service monthly for client meetings across London. The reliability and professionalism are outstanding, and the flexible hourly rates make it perfect for my varied schedule. Highly recommended for business use.",
    rating: 5
  },
  {
    name: "Mrs. Elizabeth Harrington",
    role: "Private Client",
    content: "Whether it's shopping in Knightsbridge or dinner in Mayfair, their private hire service is absolutely perfect. The drivers are courteous and knowledgeable, and the vehicles are immaculate. It's become my preferred way to travel around London.",
    rating: 5
  },
  {
    name: "Thomas Bradley",
    role: "Property Developer",
    content: "For site visits and investor meetings, I need reliable, professional transport that reflects well on my business. GQ Security's private hire service consistently delivers exactly what I need with excellent drivers and luxury vehicles.",
    rating: 5
  }
];

const privateHireCaseStudies = [
  {
    title: "Business Roadshow Coordination",
    challenge: "Investment firm required flexible private hire for week-long London roadshow visiting 12 different investor offices. Complex schedule with multiple executives, changing meeting times, and need for professional image throughout.",
    solution: "Provided dedicated private hire vehicles for each executive with experienced drivers, coordinated with executive assistants for schedule changes, maintained vehicles on standby for extended periods, and delivered seamless professional service throughout the week.",
    result: "Successful roadshow completion with all 12 investor meetings attended punctually despite multiple schedule changes. Executives able to focus on presentations while transport logistics handled seamlessly. Firm secured £15M investment round."
  },
  {
    title: "Luxury Shopping & Personal Service",
    challenge: "International visitor required private hire for extensive London shopping trip including Bond Street, Harrods, and bespoke tailoring appointments. Needed secure transport for valuable purchases and flexible scheduling for extended shopping sessions.",
    solution: "Assigned dedicated private hire vehicle with secure storage, experienced driver familiar with luxury shopping district protocols, coordinated with personal shoppers and store security, and provided wait-and-return service throughout multi-day shopping experience.",
    result: "Successful £50,000 shopping trip with all purchases transported securely. Client praised the service and driver knowledge of London's luxury retail landscape. Extended booking for annual London shopping visits."
  }
];

const privateHirePricing = [
  {
    title: "Hourly Private Hire",
    description: "Flexible hourly rates for short trips and appointments",
    startingPrice: "£60/hour",
    features: [
      "Mercedes E-Class or equivalent",
      "Professional chauffeur",
      "3-hour minimum booking",
      "Waiting time included",
      "Central London coverage",
      "Same-day booking available"
    ]
  },
  {
    title: "Half-Day Service",
    description: "4-6 hour private hire for extended use",
    startingPrice: "£300/half-day",
    features: [
      "Mercedes S-Class or BMW 7 Series",
      "As-directed service",
      "Multiple stop coordination",
      "Waiting time unlimited",
      "Greater London coverage",
      "Advanced booking discount"
    ]
  },
  {
    title: "Full-Day Premium",
    description: "8-12 hour luxury private hire service",
    startingPrice: "£550/day",
    features: [
      "Luxury vehicle selection",
      "Dedicated professional driver",
      "Complete schedule flexibility",
      "Refreshments included",
      "National coverage available",
      "Weekly rates available"
    ]
  }
];

const privateHireFaqs = [
  {
    question: "What's the minimum booking time for private hire?",
    answer: "Our minimum booking is 3 hours for hourly rates. However, we also offer half-day (4-6 hours) and full-day (8-12 hours) packages that provide better value for extended use. For trips under 3 hours, we recommend our point-to-point transfer service."
  },
  {
    question: "Can I make multiple stops and change my itinerary?",
    answer: "Absolutely. Our 'as-directed' service is designed for flexibility. You can make multiple stops, change destinations, and modify your schedule. Your driver will wait at each location and adapt to your changing requirements throughout the booking period."
  },
  {
    question: "Do you provide private hire outside London?",
    answer: "Yes, we provide national coverage for private hire services. For destinations outside Greater London, we apply distance charges, but our drivers are experienced with routes throughout the UK and can accommodate multi-day trips and extended travel requirements."
  },
  {
    question: "What vehicles are available for private hire?",
    answer: "Our fleet includes Mercedes E-Class and S-Class, BMW 5 and 7 Series, Range Rover, and luxury vehicles up to Bentley and Rolls-Royce for special occasions. Vehicle selection depends on your preferences, group size, and specific requirements."
  },
  {
    question: "How far in advance should I book private hire?",
    answer: "We recommend booking 24-48 hours in advance to guarantee vehicle and driver availability. However, we often accommodate same-day bookings and maintain standby capacity for urgent requirements. Call our 24/7 operations line for immediate availability."
  },
  {
    question: "Are drivers trained for business and personal service?",
    answer: "Yes, all our drivers are trained in both business and personal service protocols. They understand business etiquette for corporate clients and provide appropriate personal service for leisure, shopping, and social occasions. Confidentiality and professionalism are always maintained."
  }
];

const seoKeywords = [
  "private hire London",
  "luxury car hire",
  "chauffeur service London",
  "hourly car hire",
  "executive car hire",
  "private driver London",
  "luxury vehicle hire",
  "business car hire",
  "personal chauffeur",
  "premium car service"
];

export default function PrivateHirePage() {
  return (
    <ServicePage
      title="Private Hire & Chauffeur Services"
      description="Flexible luxury private hire with professional chauffeurs and premium vehicle fleet. Hourly, daily, and extended hire options for business and personal use with complete scheduling flexibility and professional service excellence."
      heroImage="/images/services/private-hire-hero.jpg"
      Icon={Car}
      category="Private Hire"
      features={privateHireFeatures}
      testimonials={privateHireTestimonials}
      caseStudies={privateHireCaseStudies}
      pricing={privateHirePricing}
      faqs={privateHireFaqs}
      seoKeywords={seoKeywords}
    />
  );
}