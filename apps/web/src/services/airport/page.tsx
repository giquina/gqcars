import ServicePage from "@/app/components/ui/ServicePage";
import { Plane } from "lucide-react";

const airportFeatures = [
  {
    title: "All London Airports Covered",
    description: "Full service to Heathrow (LHR), Gatwick (LGW), Stansted (STN), Luton (LTN), London City (LCY), and private airfields. Our drivers are familiar with every terminal and pickup point."
  },
  {
    title: "Real-Time Flight Monitoring",
    description: "Advanced flight tracking system monitors delays, gate changes, and arrival times in real-time. Your driver is automatically notified and positioned for optimal pickup timing."
  },
  {
    title: "Professional Meet & Greet",
    description: "SIA-licensed drivers meet you in arrivals with name boards, assist with luggage, and escort you securely to your vehicle. Complimentary 60-minute wait time included."
  },
  {
    title: "Private Jet & FBO Specialists",
    description: "Airside access at major FBOs including Signature Flight Support, Harrods Aviation, and WestStar. Discreet service for private aviation clients with complete confidentiality."
  },
  {
    title: "Multi-Stop Coordination",
    description: "Seamlessly coordinate complex itineraries with multiple passengers, pickup points, and destinations. Perfect for business groups and family travel."
  },
  {
    title: "Secure Vehicle Fleet",
    description: "Choose from luxury sedans, executive MPVs, or armored vehicles. All vehicles equipped with privacy glass, secure communications, and advanced safety features."
  }
];

const airportTestimonials = [
  {
    name: "Sarah Johnson",
    role: "Investment Banking MD, Goldman Sachs",
    content: "Absolutely flawless service. The driver was waiting as I exited customs, professional and discreet. Makes business travel so much more efficient.",
    rating: 5
  },
  {
    name: "Lord Richardson",
    role: "Private Client",
    content: "I've used GQ Security for over two years for all my Heathrow transfers. Never once have they failed to deliver exceptional service. Highly recommended.",
    rating: 5
  },
  {
    name: "Dr. Amanda Chen",
    role: "Pharmaceutical Executive",
    content: "The flight monitoring service is incredible. Despite a 3-hour delay, my driver was perfectly timed and I still made my crucial meeting. Outstanding professionalism.",
    rating: 5
  }
];

const airportCaseStudies = [
  {
    title: "Emergency Medical Executive Transport",
    challenge: "C-suite executive needed urgent medical transport from private jet at Luton to specialist hospital in London with family members, requiring immediate secure coordination.",
    solution: "Within 15 minutes, deployed armored Mercedes with paramedic-trained security driver, coordinated with medical team, and arranged police escort to reduce journey time by 40%.",
    result: "Executive received life-saving treatment 45 minutes earlier than standard transport. Family praised our crisis management and compassionate service during difficult time."
  },
  {
    title: "Confidential M&A Deal Transportation",
    challenge: "Major acquisition required transporting key executives from multiple international flights to secret location for deal signing, with absolute confidentiality and zero media attention.",
    solution: "Coordinated 6-vehicle convoy with decoy routes, secured alternative airport exits, and used private meeting rooms for staging. All drivers signed enhanced NDAs.",
    result: "£2.3 billion deal completed successfully with zero security breaches or media leaks. Client retained us for all subsequent high-stakes business transport."
  }
];

const airportPricing = [
  {
    title: "Standard Airport Transfer",
    description: "Professional airport pickup and drop-off service",
    startingPrice: "£95",
    features: [
      "SIA-licensed security driver",
      "Flight monitoring included",
      "60-minute complimentary waiting",
      "Mercedes E-Class or equivalent",
      "Meet & greet service",
      "Luggage assistance"
    ]
  },
  {
    title: "Executive Service",
    description: "Premium airport transfer with enhanced features",
    startingPrice: "£150",
    features: [
      "Mercedes S-Class or BMW 7 Series",
      "Dedicated account manager",
      "Priority vehicle assignment",
      "Refreshments and WiFi",
      "Multiple stop coordination",
      "24/7 concierge support"
    ]
  },
  {
    title: "VIP & Security Service",
    description: "High-security transport for sensitive clients",
    startingPrice: "£300",
    features: [
      "Armored vehicle options available",
      "Close protection officer",
      "Counter-surveillance measures",
      "Secure communications",
      "Emergency response protocols",
      "Advance route planning"
    ]
  }
];

const airportFaqs = [
  {
    question: "How does flight monitoring work?",
    answer: "We use professional aviation tracking systems that monitor your flight in real-time. Our system automatically updates pickup times based on actual arrival data, gate changes, and delays. You'll receive SMS updates, and our driver will be positioned optimally for your arrival."
  },
  {
    question: "What if my flight is significantly delayed?",
    answer: "No problem at all. Our service includes comprehensive delay management with no additional charges for reasonable delays (up to 3 hours). For longer delays, we'll coordinate alternative arrangements and only charge for actual service time."
  },
  {
    question: "Can you handle private jet arrivals?",
    answer: "Absolutely. We're accredited with all major London FBOs and have airside access where permitted. Our drivers are experienced with private aviation protocols and can coordinate directly with your flight crew for seamless transfers."
  },
  {
    question: "Do you provide service to all London airports?",
    answer: "Yes, we cover Heathrow, Gatwick, Stansted, Luton, London City Airport, and private airfields like Biggin Hill, Farnborough, and Northolt. Our drivers know optimal routes and traffic patterns for each location."
  },
  {
    question: "What vehicles are available for airport transfers?",
    answer: "Our fleet includes Mercedes E-Class and S-Class, BMW 5 and 7 Series, Range Rover, and luxury MPVs for larger groups. For enhanced security, we offer armored vehicles and specialized protection packages."
  },
  {
    question: "How do I book emergency or last-minute transfers?",
    answer: "Call our 24/7 emergency line at +44 7700 000 000. We maintain standby vehicles and can typically arrange transport within 30 minutes for central London locations, 60 minutes for airports."
  }
];

const seoKeywords = [
  "airport transfer London",
  "Heathrow transfer",
  "secure airport transport",
  "private jet transfer",
  "executive airport service",
  "Gatwick transfer service",
  "luxury airport pickup",
  "flight monitoring transfer",
  "meet and greet service",
  "airport security transport"
];

export default function AirportPage() {
  return (
    <ServicePage
      title="Secure Airport Transfers"
      description="Professional, punctual, and secure airport transfers with real-time flight monitoring and SIA-licensed drivers. Serving all London airports with luxury vehicle fleet and 24/7 availability."
      heroImage="/images/services/airport-hero.jpg"
      Icon={Plane}
      category="Airport"
      features={airportFeatures}
      testimonials={airportTestimonials}
      caseStudies={airportCaseStudies}
      pricing={airportPricing}
      faqs={airportFaqs}
      seoKeywords={seoKeywords}
    />
  );
}
