import ServicePage from "@/app/components/ui/ServicePage";
import { Zap } from "lucide-react";

const lifestyleFeatures = [
  {
    title: "Exclusive Nightlife & Private Clubs",
    description: "Secure, discreet transport to London's most exclusive private members' clubs, Michelin-starred restaurants, and elite nightlife venues. Our drivers understand VIP entrance protocols and maintain relationships with premier venue security teams."
  },
  {
    title: "High-Profile Social Events",
    description: "Professional transport for galas, fundraisers, art openings, and prestigious social events. Our team manages red carpet arrivals, media coordination, and maintains appropriate security presence for high-visibility social occasions."
  },
  {
    title: "Personal Shopping & Concierge",
    description: "Secure transport for luxury shopping experiences, personal appointments, and concierge services. Coordinate visits to Bond Street boutiques, Savile Row tailors, and exclusive personal service appointments with complete discretion."
  },
  {
    title: "Flexible 'As-Directed' Service",
    description: "On-demand transport that adapts to spontaneous social schedules and lifestyle changes. Your security driver remains available for immediate deployment, route changes, and extended coverage for dynamic social calendars."
  },
  {
    title: "Privacy & Media Management",
    description: "Expert privacy protection and unwanted attention management during social outings. Our CPOs understand London's social scene dynamics and provide sophisticated crowd management and privacy protection strategies."
  },
  {
    title: "Cultural & Entertainment Events",
    description: "Specialized transport for theater premieres, gallery openings, sporting events, and cultural occasions. Coordinate timing with event schedules, manage VIP access, and provide seamless arrival and departure coordination."
  }
];

const lifestyleTestimonials = [
  {
    name: "Lady Victoria Pemberton",
    role: "Socialite & Philanthropist",
    content: "GQ Security understands the London social scene perfectly. They've transported me to countless charity galas and private events with complete discretion and professionalism. Their drivers are like invisible guardians who ensure I can enjoy my social life safely.",
    rating: 5
  },
  {
    name: "Alexander Blackstone",
    role: "Art Collector & Gallery Owner",
    content: "From gallery openings to private viewings and auction houses, their team has become indispensable to my art world activities. They understand the need for discretion when acquiring pieces and managing high-value transactions.",
    rating: 5
  },
  {
    name: "The Honorable Emma Fitzgerald",
    role: "Private Client",
    content: "Whether it's a last-minute dinner at Sketch or a weekend in the Cotswolds, they adapt to my spontaneous lifestyle perfectly. Having security that doesn't interfere with my social life but keeps me safe is invaluable in today's world.",
    rating: 5
  }
];

const lifestyleCaseStudies = [
  {
    title: "Royal Charity Gala Security",
    challenge: "High-profile charity patron required secure transport to annual royal charity gala with significant media attention, celebrity attendees, and potential security risks. Event coordination needed to balance social obligations with personal safety requirements.",
    solution: "Provided discreet close protection, coordinated with royal security teams, established media-free arrival protocols, managed red carpet timing, and maintained security presence throughout event while preserving social experience.",
    result: "Successful gala attendance with zero security incidents despite intense media presence. Client able to fulfill all social and charitable obligations safely. Event raised record £2.3M for charity with client playing key role in success."
  },
  {
    title: "London Season Social Calendar",
    challenge: "International socialite required comprehensive security coordination for entire London Season including Ascot, Wimbledon, Opera openings, and numerous private parties. Complex social calendar with multiple daily events and high-profile guest interactions.",
    solution: "Created dedicated lifestyle security team, coordinated with venue security at all major events, established relationships with social scene security personnel, and provided flexible coverage adapting to dynamic social schedule.",
    result: "Flawless 4-month London Season with attendance at 67 major social events without security incidents. Client able to maintain full social calendar and high-profile friendships while ensuring personal safety throughout."
  }
];

const lifestylePricing = [
  {
    title: "Social Events Package",
    description: "Evening and social occasion transport",
    startingPrice: "£200/evening",
    features: [
      "Luxury vehicle and driver",
      "Evening availability",
      "Club and restaurant protocols",
      "Discrete security presence",
      "Flexible timing",
      "Media awareness training"
    ]
  },
  {
    title: "Lifestyle Concierge",
    description: "Daily lifestyle and shopping coordination",
    startingPrice: "£350/day",
    features: [
      "All-day availability",
      "Shopping and appointment coordination",
      "Personal security driver",
      "Privacy protection",
      "Flexible scheduling",
      "Emergency response ready"
    ]
  },
  {
    title: "VIP Social Protection",
    description: "Comprehensive social calendar security",
    startingPrice: "£600/day",
    features: [
      "Close protection officer",
      "Event security coordination",
      "Media management",
      "High-profile venue protocols",
      "24/7 availability",
      "International social coordination"
    ]
  }
];

const lifestyleFaqs = [
  {
    question: "Can you provide security without affecting my social life?",
    answer: "Absolutely. Our lifestyle security team specializes in discreet protection that enhances rather than restricts your social activities. We understand London's social scene and provide security that blends seamlessly into sophisticated social environments."
  },
  {
    question: "Do you understand exclusive venue protocols and etiquette?",
    answer: "Yes, our drivers and security personnel are trained in high-end venue protocols, private club etiquette, and social scene requirements. We maintain relationships with security teams at exclusive venues and understand VIP service expectations."
  },
  {
    question: "How do you handle paparazzi and unwanted media attention?",
    answer: "Our team has extensive experience in media management and privacy protection. We coordinate discreet arrivals and departures, manage crowd control, and have established relationships with venue security to minimize unwanted attention while maintaining your social visibility when desired."
  },
  {
    question: "Can you adapt to last-minute social plans and changes?",
    answer: "Yes, our 'as-directed' service is designed for dynamic social schedules. We maintain flexible availability and can adapt to spontaneous dinner plans, extended evening events, or sudden schedule changes while maintaining consistent security coverage."
  },
  {
    question: "Do you coordinate with personal assistants and lifestyle managers?",
    answer: "Certainly. We work closely with personal assistants, lifestyle managers, and social coordinators to integrate seamlessly with your existing support team. This ensures smooth coordination and reduces complexity in your daily lifestyle management."
  },
  {
    question: "Can you provide security for shopping and personal appointments?",
    answer: "Yes, we provide discreet security for luxury shopping experiences, personal appointments, and concierge services. Our team understands the requirements of high-end retail environments and can coordinate with personal shoppers and service providers."
  }
];

const seoKeywords = [
  "lifestyle security London",
  "social event protection",
  "luxury lifestyle transport",
  "private club security",
  "VIP social protection",
  "celebrity lifestyle security",
  "high society protection",
  "luxury shopping security",
  "social calendar security",
  "exclusive event transport"
];

export default function LifestylePage() {
  return (
    <ServicePage
      title="Lifestyle & Social Event Security"
      description="Discreet security transport for luxury lifestyle, social events, and exclusive venues. Professional protection that adapts to your dynamic social calendar while maintaining privacy and enabling you to enjoy London's finest experiences safely."
      heroImage="/images/services/lifestyle-hero.jpg"
      Icon={Zap}
      category="Lifestyle"
      features={lifestyleFeatures}
      testimonials={lifestyleTestimonials}
      caseStudies={lifestyleCaseStudies}
      pricing={lifestylePricing}
      faqs={lifestyleFaqs}
      seoKeywords={seoKeywords}
    />
  );
} 