import { Star, Shield, Car, Globe, Users, Clock, CheckCircle, Building2 } from 'lucide-react'
import ServiceHero from '@/app/components/ui/ServiceHero'
import Animate from '@/app/components/ui/Animate'
import ServicePage from "@/app/components/ui/ServicePage";
import { Crown } from "lucide-react";

const vipFeatures = [
  {
    title: "Red Carpet & Gala Events",
    description: "Professional coordination for premieres, awards ceremonies, and charity galas with red carpet arrivals, media management, and VIP guest coordination. Our team handles complex event logistics while ensuring safety and style."
  },
  {
    title: "Celebrity & Artist Transport",
    description: "Discreet, secure transport for entertainers, performers, and their entourage. We understand the unique requirements of celebrity travel including privacy protection, schedule flexibility, and media management."
  },
  {
    title: "High-Profile Corporate Events",
    description: "Executive transport for board meetings, shareholder events, and corporate functions requiring enhanced security and privacy. Perfect for C-suite executives and business leaders attending sensitive meetings."
  },
  {
    title: "Multi-Vehicle Event Coordination",
    description: "Complex logistics management for large-scale events involving multiple VIP guests, vehicles, and destinations. Our operations team coordinates seamless transportation for events with dozens of high-profile attendees."
  },
  {
    title: "Sports & Entertainment Venues",
    description: "Secure transport to major sporting events, concerts, and entertainment venues with crowd management expertise. We navigate venue access, VIP entrances, and crowd dynamics for optimal arrival and departure."
  },
  {
    title: "Private Party & Social Events",
    description: "Elegant transport for exclusive private parties, gallery openings, and high-society social events. Our service adapts to the sophisticated atmosphere while maintaining appropriate security presence."
  }
];

const vipTestimonials = [
  {
    name: "Marcus Sterling",
    role: "Entertainment Industry Executive",
    content: "For awards seasons and premieres, GQ Security is our go-to transport partner. They understand the entertainment industry's unique demands and handle everything from talent transport to executive coordination flawlessly.",
    rating: 5
  },
  {
    name: "Lady Victoria Pemberton",
    role: "Charity Gala Patron",
    content: "At major charity events, their team ensures everything runs smoothly while maintaining the elegant atmosphere. From guest coordination to security management, they're simply the best in London for high-profile events.",
    rating: 5
  },
  {
    name: "James Whitmore",
    role: "Premier League Chairman",
    content: "For match days and board meetings, their VIP coordination is exceptional. They understand the unique requirements of sporting events and handle everything from VIP guest transport to executive security with total professionalism.",
    rating: 5
  }
];

const vipCaseStudies = [
  {
    title: "International Film Festival VIP Coordination",
    challenge: "Major film festival required comprehensive VIP transport for 200+ celebrities, executives, and industry professionals over 10-day event. Complex scheduling with premieres, parties, and private meetings requiring flawless coordination and absolute discretion.",
    solution: "Deployed 40-vehicle VIP fleet with celebrity-experienced drivers, established dedicated operations center, coordinated with festival security and venue management, implemented real-time guest tracking, and provided 24/7 logistics support.",
    result: "Flawless festival execution with 500+ VIP transports completed without delays. Zero security incidents despite intense media attention. Festival organizers praised logistics coordination. Retained for subsequent annual festivals."
  },
  {
    title: "Corporate Board Retreat Security",
    challenge: "FTSE 100 company hosting board retreat for 25 directors at countryside estate. Required secure transport from London with complete privacy during sensitive strategic discussions and potential hostile media attention.",
    solution: "Provided luxury convoy with close protection drivers, established secure routes avoiding media, coordinated with estate security, implemented counter-surveillance measures, and maintained communication blackout protocols.",
    result: "Successful retreat completion with all strategic decisions made in complete privacy. Board members praised seamless logistics and security coordination. Company signed annual contract for all future board events."
  }
];

const vipPricing = [
  {
    title: "VIP Event Transport",
    description: "Premium transport for high-profile events",
    startingPrice: "£400/event",
    features: [
      "Luxury vehicle and experienced driver",
      "Event coordination expertise",
      "Red carpet arrival management",
      "Media coordination included",
      "Privacy protection measures",
      "Flexible scheduling"
    ]
  },
  {
    title: "Celebrity & Artist Service",
    description: "Specialized transport for entertainment industry",
    startingPrice: "£600/day",
    features: [
      "Celebrity-experienced drivers",
      "Enhanced privacy protection",
      "Entourage coordination",
      "Venue access management",
      "Schedule flexibility",
      "Security liaison included"
    ]
  },
  {
    title: "Executive VIP Protection",
    description: "Comprehensive VIP security and transport",
    startingPrice: "£1,000/day",
    features: [
      "Close protection coordination",
      "Multi-vehicle logistics",
      "Advanced security planning",
      "Crisis management protocols",
      "International coordination",
      "24/7 operations support"
    ]
  }
];

const vipFaqs = [
  {
    question: "How do you handle media attention and paparazzi?",
    answer: "Our drivers are experienced in media management and celebrity protection. We coordinate with venue security for discrete arrivals/departures, use alternative routes when necessary, and can provide additional security support for high-media-attention events."
  },
  {
    question: "Can you coordinate transport for large VIP guest lists?",
    answer: "Yes, we specialize in complex VIP event logistics. Our operations team can coordinate transport for dozens of VIP guests, manage multiple pickup points and destinations, and provide real-time coordination throughout events with appropriate vehicles for each guest's requirements."
  },
  {
    question: "Do you work with event planners and production companies?",
    answer: "Absolutely. We regularly partner with event planners, production companies, and venue managers. We integrate seamlessly with existing event teams, coordinate with security personnel, and adapt to event requirements and timeline changes."
  },
  {
    question: "What level of discretion and confidentiality do you provide?",
    answer: "All our VIP service personnel sign enhanced NDAs and undergo background checks appropriate for celebrity and executive protection. We maintain strict confidentiality about client identities, destinations, and any sensitive information encountered during service."
  },
  {
    question: "Can you provide security coordination beyond just transport?",
    answer: "Yes, our VIP service can coordinate with close protection teams, venue security, and event security personnel. While we focus on transport, we work as part of comprehensive security solutions for high-profile clients requiring multi-layered protection."
  },
  {
    question: "How do you handle last-minute schedule changes for VIP clients?",
    answer: "VIP schedules often change unexpectedly, and our service is designed for maximum flexibility. We maintain standby vehicles, provide real-time coordination, and can adapt to immediate schedule changes, route modifications, and additional security requirements."
  }
];

const seoKeywords = [
  "VIP transport London",
  "celebrity transport service",
  "high profile event transport",
  "red carpet transport",
  "executive VIP service",
  "entertainment industry transport",
  "VIP event coordination",
  "celebrity car service",
  "luxury VIP transport",
  "premium event transport"
];

export default function VIPServicesPage() {
  return (
    <ServicePage
      title="VIP & Event Transport Services"
      description="Elite VIP transport for celebrities, executives, and high-profile events. Professional coordination for red carpet arrivals, corporate functions, and exclusive social events with enhanced security and complete discretion."
      heroImage="/images/services/vip-hero.jpg"
      Icon={Crown}
      category="VIP Events"
      features={vipFeatures}
      testimonials={vipTestimonials}
      caseStudies={vipCaseStudies}
      pricing={vipPricing}
      faqs={vipFaqs}
      seoKeywords={seoKeywords}
    />
  );
}

const vipServices = [
  {
    title: "Personal Protection",
    description: "Dedicated close protection officers for individual security.",
    icon: Shield
  },
  {
    title: "Secure Transport",
    description: "Armored vehicles and trained security drivers.",
    icon: Car
  },
  {
    title: "International Security",
    description: "Global security coordination and travel protection.",
    icon: Globe
  },
  {
    title: "Event Security",
    description: "Comprehensive security for private and public events.",
    icon: Users
  },
  {
    title: "Residential Security",
    description: "24/7 property protection and access control.",
    icon: Building2
  },
  {
    title: "Rapid Response",
    description: "Rapid response and crisis management.",
    icon: Clock
  }
]

const clientTypes = [
  {
    title: "Executives",
    description: "Corporate leaders and business executives",
    icon: Building2
  },
  {
    title: "Celebrities",
    description: "Entertainment and sports personalities",
    icon: Star
  },
  {
    title: "Diplomats",
    description: "Government officials and diplomats",
    icon: Globe
  },
  {
    title: "Private Clients",
    description: "High-net-worth individuals and families",
    icon: Shield
  }
]

const features = [
  {
    title: "Personal Security",
    items: [
      "24/7 close protection coverage",
      "Advance security planning",
      "Route and venue assessment",
      "Threat analysis and mitigation",
      "Privacy protection measures",
      "Secure extraction protocols"
    ]
  },
  {
    title: "Travel Security",
    items: [
      "International security coordination",
      "Secure airport transfers",
      "Hotel security assessment",
      "Local security liaison",
      "Secure meeting arrangements",
      "Travel risk management"
    ]
  },
  {
    title: "Event Protection",
    items: [
      "Venue security assessment",
      "Access control systems",
      "VIP guest management",
      "Media management",
      "Rapid response teams",
      "Multi-agency coordination"
    ]
  },
  {
    title: "Technical Security",
    items: [
      "Counter-surveillance measures",
      "Communications security",
      "Cyber threat protection",
      "Asset tracking systems",
      "Security equipment deployment",
      "24/7 monitoring capabilities"
    ]
  }
]

const destinations = [
  {
    region: "Europe",
    locations: [
      "London & UK Cities",
      "Paris & French Riviera",
      "Monaco & Mediterranean",
      "Swiss Financial Centers",
      "Major EU Capitals"
    ]
  },
  {
    region: "Middle East",
    locations: [
      "Dubai & UAE",
      "Saudi Arabia",
      "Qatar & Bahrain",
      "Kuwait & Oman",
      "Regional Business Hubs"
    ]
  },
  {
    region: "Americas",
    locations: [
      "New York & East Coast",
      "Los Angeles & West Coast",
      "Miami & Florida",
      "Toronto & Vancouver",
      "Major Business Centers"
    ]
  }
]

const vehicles = [
  {
    model: "Mercedes-Maybach S680",
    category: "Ultra-Luxury Sedan",
    features: [
      "Armored protection available",
      "Extended wheelbase",
      "Premium interior",
      "Advanced security features",
      "Executive seating"
    ]
  },
  {
    model: "Range Rover SV",
    category: "Luxury SUV",
    features: [
      "Armored capability",
      "All-terrain performance",
      "Privacy configuration",
      "Enhanced security",
      "Command seating position"
    ]
  },
  {
    model: "BMW 7 Series Protection",
    category: "Armored Sedan",
    features: [
      "Ballistic protection",
      "Run-flat tires",
      "Secure communications",
      "Emergency systems",
      "Executive configuration"
    ]
  }
]