import { Plane, Shield, Briefcase, Building2, Users, ShoppingBag, Car, UserCheck, Headphones, Crown, Heart, Home } from 'lucide-react'

export interface ServiceTestimonial {
  name: string;
  title: string;
  image: string;
  quote: string;
  rating: number;
  location?: string;
  verified?: boolean;
}

export interface ServiceCaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  icon: any;
  duration?: string;
  team?: string;
}

export interface ServiceTestimonialsData {
  testimonials: ServiceTestimonial[];
  caseStudies: ServiceCaseStudy[];
}

export const serviceTestimonials: Record<string, ServiceTestimonialsData> = {
  airport: {
    testimonials: [
      {
        name: "Charlotte Hamilton",
        title: "International Business Executive",
        image: "👩‍💼",
        quote: "Flying monthly through Heathrow, GQ Cars' airport service is unmatched. Their drivers monitor my flights and are always waiting, even with delays. The SIA training shows in their professionalism.",
        rating: 5,
        location: "Heathrow Airport",
        verified: true
      },
      {
        name: "Robert Sterling",
        title: "Investment Director",
        image: "👨‍💼",
        quote: "From private jet arrivals at Farnborough to commercial flights at Gatwick, GQ Cars handles all our airport transfers seamlessly. Their meet & greet service is exceptional.",
        rating: 5,
        location: "Multiple London Airports",
        verified: true
      },
      {
        name: "Dr. Amanda Foster",
        title: "Medical Consultant",
        image: "👩‍⚕️",
        quote: "As someone who travels internationally for medical conferences, I need reliable airport transport. GQ Cars' real-time flight monitoring and punctuality have never let me down.",
        rating: 5,
        location: "Stansted Airport",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Celebrity Airport Extraction",
        client: "International Film Star",
        challenge: "High-profile arrival at Heathrow with heavy paparazzi presence and security concerns",
        solution: "Coordinated with airport security, deployed 2 SIA-licensed drivers with decoy vehicle strategy",
        result: "Successful departure with zero incidents, client reached hotel safely and discretely",
        icon: Plane,
        duration: "3 hours",
        team: "2 CPO drivers + airport liaison"
      },
      {
        title: "Corporate Crisis Management",
        client: "FTSE 250 Company Board",
        challenge: "Emergency board meeting requiring urgent transport of 6 executives from 3 different airports",
        solution: "Deployed 6 vehicles across Heathrow, Gatwick, and City Airport with real-time coordination",
        result: "All executives arrived on time for critical meeting, maintaining confidentiality throughout",
        icon: Building2,
        duration: "6 hours",
        team: "6 executive drivers + operations manager"
      }
    ]
  },

  "close-protection": {
    testimonials: [
      {
        name: "Alexander Petrov",
        title: "Tech Industry Pioneer",
        image: "👨‍💻",
        quote: "After receiving credible threats, I needed professional close protection. GQ Cars' CPOs are exceptional - highly trained, discrete, and always vigilant. I feel completely secure.",
        rating: 5,
        location: "Tech City, London",
        verified: true
      },
      {
        name: "Victoria Ashworth",
        title: "High Court Judge",
        image: "⚖️",
        quote: "Given the sensitive nature of my cases, I require the highest level of personal protection. GQ Cars' SIA-licensed CPOs understand legal security protocols perfectly.",
        rating: 5,
        location: "Royal Courts of Justice",
        verified: true
      },
      {
        name: "Marcus Chen",
        title: "Investment Fund Manager",
        image: "💼",
        quote: "Managing a £2B fund comes with risks. GQ Cars' close protection officers provide seamless security while maintaining the professional image our clients expect.",
        rating: 5,
        location: "Canary Wharf",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Executive Threat Response",
        client: "Fortune 500 CEO",
        challenge: "Escalating security threats requiring immediate close protection during London business trip",
        solution: "Deployed 3 SIA-licensed CPOs with armored vehicle and 24/7 threat monitoring",
        result: "5-day visit completed successfully with zero incidents, ongoing security contract secured",
        icon: Shield,
        duration: "5 days",
        team: "3 specialized CPOs + threat analyst"
      },
      {
        title: "Whistleblower Protection",
        client: "Government Contractor",
        challenge: "High-risk individual requiring discrete protection during sensitive testimony period",
        solution: "Covert protection team with rotating vehicles and secure safe house coordination",
        result: "6-month protection period completed without incident, testimony delivered safely",
        icon: UserCheck,
        duration: "6 months",
        team: "4 covert CPOs + coordination specialist"
      }
    ]
  },

  corporate: {
    testimonials: [
      {
        name: "Sir Jonathan Whitfield",
        title: "Chairman, Whitfield Holdings",
        image: "🎩",
        quote: "GQ Cars has managed our corporate transport for 5 years. Their understanding of executive security and confidentiality is unparalleled. Every journey is handled with absolute professionalism.",
        rating: 5,
        location: "City of London",
        verified: true
      },
      {
        name: "Rachel Morrison",
        title: "CFO, Morrison Industries",
        image: "👩‍💼",
        quote: "During our IPO roadshow, GQ Cars coordinated complex multi-city transport flawlessly. Their drivers understand the importance of confidential business discussions.",
        rating: 5,
        location: "London Financial District",
        verified: true
      },
      {
        name: "David Blackstone",
        title: "Managing Director, Private Equity",
        image: "💼",
        quote: "For high-stakes investor meetings, we trust only GQ Cars. Their security-trained drivers and luxury fleet project the right image while ensuring our safety.",
        rating: 5,
        location: "Mayfair",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "IPO Roadshow Security",
        client: "Tech Unicorn Corporation",
        challenge: "2-week IPO roadshow requiring secure transport for C-suite executives across 15 investor meetings",
        solution: "Dedicated fleet of 4 executive vehicles with SIA-trained drivers and route planning",
        result: "Successful £1.2B IPO launch with zero security incidents or scheduling delays",
        icon: Briefcase,
        duration: "2 weeks",
        team: "8 executive drivers + logistics coordinator"
      },
      {
        title: "Merger & Acquisition Security",
        client: "International Banking Group",
        challenge: "Confidential M&A negotiations requiring secure transport for executives and legal teams",
        solution: "NDAs for all drivers, encrypted communications, and variable route planning",
        result: "£8B acquisition completed successfully with maintained confidentiality throughout",
        icon: Building2,
        duration: "3 months",
        team: "6 cleared drivers + security manager"
      }
    ]
  },

  diplomatic: {
    testimonials: [
      {
        name: "Ambassador Patricia Reynolds",
        title: "UK Trade Envoy",
        image: "🏛️",
        quote: "For diplomatic missions, security and protocol adherence are paramount. GQ Cars' drivers understand diplomatic immunity, security procedures, and international protocols perfectly.",
        rating: 5,
        location: "Embassy Quarter, London",
        verified: true
      },
      {
        name: "Dr. Hassan Al-Mahmoud",
        title: "Economic Attaché",
        image: "🎖️",
        quote: "During sensitive trade negotiations, we require the highest standards of security and discretion. GQ Cars' government-cleared drivers exceed all expectations.",
        rating: 5,
        location: "Westminster",
        verified: true
      },
      {
        name: "Minister Sarah Chen",
        title: "Deputy Trade Minister",
        image: "👥",
        quote: "For international diplomatic visits, GQ Cars provides security that meets government standards. Their coordination with protection units is seamless and professional.",
        rating: 5,
        location: "Foreign Office",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "G7 Summit Transport",
        client: "International Delegation",
        challenge: "Secure transport for 12 government ministers during high-security G7 summit",
        solution: "Armored vehicle fleet with government-cleared drivers and police escort coordination",
        result: "All diplomatic objectives achieved with perfect security record throughout summit",
        icon: Building2,
        duration: "5 days",
        team: "12 government-cleared drivers + diplomatic liaison"
      },
      {
        title: "Trade Mission Security",
        client: "Asian Economic Partnership",
        challenge: "Multi-country trade delegation requiring protocol-compliant transport across London",
        solution: "Cultural training for drivers, diplomatic protocol adherence, multi-language coordination",
        result: "£2.5B trade agreements signed with enhanced diplomatic relationships",
        icon: Users,
        duration: "1 week",
        team: "8 protocol-trained drivers + cultural liaison"
      }
    ]
  },

  "family-office": {
    testimonials: [
      {
        name: "The Pemberton Family",
        title: "Ultra-High-Net-Worth Family",
        image: "👨‍👩‍👧‍👦",
        quote: "GQ Cars manages all our family transport needs with exceptional care. Their child protection specialists and family-trained drivers provide peace of mind for our busy lifestyle.",
        rating: 5,
        location: "Belgravia",
        verified: true
      },
      {
        name: "Lady Catherine Westfield",
        title: "Family Office Principal",
        image: "👸",
        quote: "From school runs to charity galas, GQ Cars understands the unique requirements of high-net-worth families. Their discretion and reliability are unmatched.",
        rating: 5,
        location: "Kensington",
        verified: true
      },
      {
        name: "James Hartford-Smith",
        title: "Family Wealth Manager",
        image: "💎",
        quote: "Managing a family office requires trusted partners. GQ Cars has been our exclusive transport provider for 3 years, handling everything from daily routines to emergency situations.",
        rating: 5,
        location: "Chelsea",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Multi-Generational Security",
        client: "Three-Generation Business Family",
        challenge: "Coordinated daily transport for grandparents, parents, and children with varying security needs",
        solution: "Dedicated 6-vehicle fleet with age-appropriate security specialists and route coordination",
        result: "2 years of incident-free family transport with 100% on-time performance",
        icon: Users,
        duration: "Ongoing 2 years",
        team: "12 family-specialist drivers + security coordinator"
      },
      {
        title: "International School Programme",
        client: "Global Investment Family",
        challenge: "Secure transport for 4 children to prestigious international schools across London",
        solution: "Child protection specialists, armored family vehicles, and emergency response protocols",
        result: "Perfect attendance record with enhanced family security posture",
        icon: Home,
        duration: "Academic year",
        team: "6 child-specialist drivers + family coordinator"
      }
    ]
  },

  lifestyle: {
    testimonials: [
      {
        name: "Victoria Sterling",
        title: "Social Influencer & Philanthropist",
        image: "💃",
        quote: "For London's exclusive events and private member's clubs, GQ Cars provides the perfect blend of security and sophistication. Their drivers understand the social scene perfectly.",
        rating: 5,
        location: "Mayfair Social Circuit",
        verified: true
      },
      {
        name: "Charles Beaumont",
        title: "Art Collector & Gallery Owner",
        image: "🎨",
        quote: "From gallery openings to auction houses, GQ Cars ensures I arrive safely and stylishly. Their cultural awareness and discretion make them ideal for the art world.",
        rating: 5,
        location: "Fitzrovia Art Quarter",
        verified: true
      },
      {
        name: "Sophia Hartwell",
        title: "Celebrity Stylist",
        image: "✨",
        quote: "Working with A-list clients requires reliable, discrete transport. GQ Cars' understanding of celebrity lifestyle and media management is exceptional.",
        rating: 5,
        location: "West End",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Fashion Week VIP Circuit",
        client: "International Fashion House",
        challenge: "Secure transport for models, designers, and VIP guests during London Fashion Week",
        solution: "24/7 fleet availability with fashion-industry trained drivers and venue coordination",
        result: "Flawless transport for 50+ VIPs across 15 events with zero scheduling conflicts",
        icon: Crown,
        duration: "1 week",
        team: "10 lifestyle-specialist drivers + event coordinator"
      },
      {
        title: "Private Members Club Circuit",
        client: "Tech Billionaire",
        challenge: "Discrete transport to exclusive London clubs while maintaining privacy and security",
        solution: "Unmarked luxury vehicles with hospitality-trained security drivers and club liaison",
        result: "6 months of incident-free social life with enhanced privacy protection",
        icon: Users,
        duration: "6 months",
        team: "4 hospitality CPOs + club liaison specialist"
      }
    ]
  },

  "private-hire": {
    testimonials: [
      {
        name: "Michael Thompson",
        title: "Investment Banking Director",
        image: "👔",
        quote: "For important client meetings and personal journeys, I trust GQ Cars' private hire service. Their flexibility and premium vehicles always make the right impression.",
        rating: 5,
        location: "Canary Wharf",
        verified: true
      },
      {
        name: "Elena Rodriguez",
        title: "Legal Partner",
        image: "⚖️",
        quote: "As a senior partner, I need reliable transport that reflects our firm's standards. GQ Cars' private hire service is consistently excellent with impeccable presentation.",
        rating: 5,
        location: "Legal Quarter",
        verified: true
      },
      {
        name: "James Wilson",
        title: "Real Estate Developer",
        image: "🏗️",
        quote: "For property viewings and investor meetings, GQ Cars provides the professional image and reliability I need. Their knowledge of London is exceptional.",
        rating: 5,
        location: "Prime Central London",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Property Investment Tour",
        client: "International Real Estate Fund",
        challenge: "Coordinated viewing of 20 prime London properties for overseas investors over 3 days",
        solution: "Luxury fleet with property-specialist drivers and real-time scheduling coordination",
        result: "£150M investment secured with all viewings completed on schedule",
        icon: Car,
        duration: "3 days",
        team: "5 property-specialist drivers + logistics coordinator"
      },
      {
        title: "Legal Case Management",
        client: "International Arbitration Team",
        challenge: "Secure transport for legal team during high-profile international arbitration case",
        solution: "Confidentiality protocols, secure communications, and court-liaison coordination",
        result: "Successful case conclusion with maintained client confidentiality throughout",
        icon: Building2,
        duration: "2 months",
        team: "3 legal-specialist drivers + case coordinator"
      }
    ]
  },

  "professional-support": {
    testimonials: [
      {
        name: "Dr. Richard Blackwood",
        title: "Medical Consultant",
        image: "👨‍⚕️",
        quote: "For emergency medical consultations and private patient visits, GQ Cars provides reliable, discrete transport. Their drivers understand the medical sector's urgency requirements.",
        rating: 5,
        location: "Harley Street",
        verified: true
      },
      {
        name: "Professor Jane Mitchell",
        title: "Academic Researcher",
        image: "👩‍🎓",
        quote: "Traveling between universities and research facilities requires dependable transport. GQ Cars' professional support service ensures I arrive fresh and prepared for every engagement.",
        rating: 5,
        location: "University College London",
        verified: true
      },
      {
        name: "Marcus Foster",
        title: "Financial Advisor",
        image: "📊",
        quote: "For client meetings across London, I need transport that reflects professionalism. GQ Cars' support services are perfectly suited to financial sector requirements.",
        rating: 5,
        location: "City Financial District",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Medical Emergency Response",
        client: "Private Healthcare Network",
        challenge: "On-demand transport for medical specialists during London-wide health emergency",
        solution: "24/7 rapid response fleet with medical-priority protocols and hospital liaison",
        result: "Critical medical support delivered with 100% response time targets met",
        icon: Headphones,
        duration: "2 weeks",
        team: "8 medical-priority drivers + healthcare coordinator"
      },
      {
        title: "Professional Conference Circuit",
        client: "Legal Professional Association",
        challenge: "Transport coordination for 200+ delegates across multiple London venues during legal summit",
        solution: "Dedicated shuttle service with professional-grade vehicles and real-time tracking",
        result: "Seamless conference experience with zero transport-related delays",
        icon: Users,
        duration: "3 days",
        team: "15 professional drivers + conference coordinator"
      }
    ]
  },

  shopping: {
    testimonials: [
      {
        name: "Princess Amira Al-Mansouri",
        title: "Royal Family Member",
        image: "👑",
        quote: "For exclusive shopping experiences at Harrods and Bond Street, GQ Cars provides the security and luxury service befitting royal protocol. Their coordination with retailers is exceptional.",
        rating: 5,
        location: "Knightsbridge & Bond Street",
        verified: true
      },
      {
        name: "Mrs. Chen Wei-Lin",
        title: "Art & Luxury Collector",
        image: "💎",
        quote: "GQ Cars manages our family's shopping security across London's luxury district. Their drivers understand high-value purchases and coordinate perfectly with store security teams.",
        rating: 5,
        location: "Mayfair Shopping District",
        verified: true
      },
      {
        name: "Isabella Romano",
        title: "Fashion Industry Executive",
        image: "👗",
        quote: "For fashion buying trips and luxury retail visits, I trust GQ Cars completely. Their knowledge of London's shopping scene and discrete service is unmatched.",
        rating: 5,
        location: "Sloane Street",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Luxury Shopping Security",
        client: "Middle Eastern Royal Delegation",
        challenge: "Secure shopping experience for royal family across Harrods, Selfridges, and Bond Street boutiques",
        solution: "3-vehicle security convoy with retail-trained CPOs and store coordination protocols",
        result: "£5M shopping experience completed safely with enhanced store relationships",
        icon: ShoppingBag,
        duration: "1 week",
        team: "6 retail-specialist CPOs + store liaison coordinator"
      },
      {
        title: "Fashion Week Shopping Circuit",
        client: "International Fashion Buyer",
        challenge: "Time-critical shopping schedule across 25 London boutiques during Fashion Week",
        solution: "Dedicated shopping specialist with luxury vehicle and real-time traffic optimization",
        result: "All appointments met with successful acquisition of complete seasonal collection",
        icon: Crown,
        duration: "4 days",
        team: "2 fashion-specialist drivers + buyer assistant"
      }
    ]
  },

  taxi: {
    testimonials: [
      {
        name: "Sarah Collins",
        title: "Business Consultant",
        image: "👩‍💼",
        quote: "For everyday London travel, GQ Cars' taxi service offers the perfect blend of convenience and security. Their professional drivers and premium vehicles exceed expectations.",
        rating: 5,
        location: "Central London",
        verified: true
      },
      {
        name: "Robert Jenkins",
        title: "Hotel Manager",
        image: "🏨",
        quote: "Our hotel guests consistently praise GQ Cars' taxi service. Reliable, professional, and always on time - exactly what we need for guest satisfaction.",
        rating: 5,
        location: "Covent Garden",
        verified: true
      },
      {
        name: "Maria Santos",
        title: "Conference Organizer",
        image: "📅",
        quote: "Managing delegate transport requires reliable partners. GQ Cars' taxi fleet provides consistent, professional service that keeps our events running smoothly.",
        rating: 5,
        location: "ExCeL London",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Corporate Taxi Fleet Management",
        client: "International Law Firm",
        challenge: "On-demand taxi service for 200+ lawyers requiring immediate, reliable transport across London",
        solution: "Dedicated corporate taxi fleet with priority booking system and account management",
        result: "40% reduction in transport delays with improved lawyer productivity and client satisfaction",
        icon: Car,
        duration: "Annual contract",
        team: "25 dedicated taxi drivers + account manager"
      },
      {
        title: "Event Transport Coordination",
        client: "London Business Summit",
        challenge: "Transport 500+ delegates between hotels, venues, and airports over 3-day event period",
        solution: "Coordinated taxi fleet with real-time tracking and delegate priority management",
        result: "Zero transport-related event delays with 98% delegate satisfaction rating",
        icon: Users,
        duration: "3 days",
        team: "30 event-specialist drivers + transport coordinator"
      }
    ]
  },

  vip: {
    testimonials: [
      {
        name: "Lord Sebastian Ashford",
        title: "House of Lords Member",
        image: "🎩",
        quote: "For state functions and royal events, GQ Cars provides transport worthy of the highest occasions. Their understanding of protocol and security is exemplary.",
        rating: 5,
        location: "Westminster",
        verified: true
      },
      {
        name: "Celebrity Agent Rebecca Stone",
        title: "Talent Management CEO",
        image: "⭐",
        quote: "Managing A-list celebrities requires flawless transport coordination. GQ Cars' VIP service handles media attention and security concerns with perfect professionalism.",
        rating: 5,
        location: "West End Entertainment District",
        verified: true
      },
      {
        name: "Sheikh Mohammed Al-Thani",
        title: "International Business Leader",
        image: "👨‍💼",
        quote: "For VIP events and high-profile engagements, GQ Cars exceeds every expectation. Their security expertise and luxury service create the perfect VIP experience.",
        rating: 5,
        location: "Park Lane",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Royal Gala Transport",
        client: "International Charity Foundation",
        challenge: "Secure transport for 50+ VIP guests including royalty, celebrities, and dignitaries at charity gala",
        solution: "Luxury fleet with royal protocol specialists and red carpet coordination",
        result: "£2M charity funds raised with flawless VIP transport experience throughout event",
        icon: Crown,
        duration: "1 evening",
        team: "12 VIP-specialist drivers + protocol coordinator"
      },
      {
        title: "Film Premiere Security",
        client: "Major Hollywood Studio",
        challenge: "Coordinate secure transport for international cast and crew during London film premiere",
        solution: "Celebrity protection specialists with media management and red carpet logistics",
        result: "Successful premiere with zero security incidents and positive media coverage",
        icon: Shield,
        duration: "2 days",
        team: "8 celebrity CPOs + media coordinator"
      }
    ]
  },

  weddings: {
    testimonials: [
      {
        name: "Lady Charlotte & Lord William Pemberton",
        title: "Wedding Couple",
        image: "💑",
        quote: "Our wedding day was perfection thanks to GQ Cars. From bride transport to guest coordination, their attention to detail and security expertise made everything seamless.",
        rating: 5,
        location: "St. George's Chapel",
        verified: true
      },
      {
        name: "Miranda Rose",
        title: "Wedding Planner",
        image: "💐",
        quote: "For luxury weddings, GQ Cars is our exclusive transport partner. Their coordination skills and beautiful fleet create magical moments while ensuring everyone's safety.",
        rating: 5,
        location: "Luxury Wedding Venues",
        verified: true
      },
      {
        name: "The Thompson Family",
        title: "Wedding Family",
        image: "👨‍👩‍👧‍👦",
        quote: "Planning a destination wedding in London required trusted partners. GQ Cars managed all family transport flawlessly, from airport pickups to ceremony coordination.",
        rating: 5,
        location: "Historic London Venues",
        verified: true
      }
    ],
    caseStudies: [
      {
        title: "Royal-Style Wedding Transport",
        client: "International Business Dynasty",
        challenge: "Coordinate transport for 200+ wedding guests including international VIPs and celebrities",
        solution: "Luxury fleet of 15 vehicles with wedding specialists and security coordination",
        result: "Perfect wedding day with all guests transported safely and on schedule",
        icon: Heart,
        duration: "3 days",
        team: "20 wedding-specialist drivers + event coordinator"
      },
      {
        title: "Destination Wedding Logistics",
        client: "American Tech Executive Wedding",
        challenge: "Full wedding transport coordination for overseas guests unfamiliar with London",
        solution: "Personal driver assignments, London tour integration, and cultural liaison services",
        result: "Memorable wedding experience with enhanced London tourism for all guests",
        icon: Users,
        duration: "1 week",
        team: "12 tourism-specialist drivers + cultural coordinator"
      }
    ]
  }
};