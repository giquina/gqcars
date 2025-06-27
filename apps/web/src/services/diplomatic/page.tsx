import ServicePage from "@/app/components/ui/ServicePage";
import { Shield } from "lucide-react";

const diplomaticFeatures = [
  {
    title: "Government-Cleared CPOs",
    description: "All drivers are SIA licensed and have undergone extensive background checks to receive government security clearance for handling sensitive assignments."
  },
  {
    title: "Diplomatic Etiquette & Protocol",
    description: "Our team is trained in diplomatic protocols, ensuring seamless and appropriate interactions during official state visits, embassy transport, and high-stakes meetings."
  },
  {
    title: "Armored & Luxury Fleet",
    description: "Choose from our fleet of armored, non-armored, and luxury vehicles (e.g., Mercedes S-Class, BMW 7 Series) to meet specific security and comfort requirements."
  },
  {
    title: "Police & Embassy Liaison",
    description: "We maintain established relationships with law enforcement and embassy security details to ensure fully coordinated and secure movements."
  }
];

const diplomaticTestimonials = [
  {
    name: "Ambassador Sir Charles Wellington",
    title: "Former UK Ambassador",
    quote: "In my 30-year diplomatic career, I've rarely encountered such professionalism and protocol awareness. GQ Cars' understanding of diplomatic security requirements is exceptional and their discretion is absolute.",
    rating: 5
  },
  {
    name: "Dr. Marie Dubois",
    title: "French Consulate Official",
    quote: "The coordination with embassy security and police liaison for our state visit was flawless. Their drivers understand the unique requirements of diplomatic transport and execute them perfectly.",
    rating: 5
  },
  {
    name: "Deputy Minister Hassan Al-Rashid",
    title: "Foreign Ministry Official",
    quote: "Security clearance protocols were handled with complete professionalism. The armored vehicle fleet provides the level of protection required for sensitive diplomatic missions while maintaining appropriate diplomatic courtesy.",
    rating: 5
  }
];

const diplomaticReviews = [
  {
    platform: "Diplomatic Services Review",
    rating: 5,
    text: "Exceptional diplomatic transport services. Full government clearance, protocol training, and seamless coordination with embassy security. The gold standard for diplomatic protection in London.",
    author: "Embassy Security Coordinator",
    date: "3 weeks ago"
  },
  {
    platform: "Government Contractor Assessment",
    rating: 5,
    text: "Meets all government security standards and diplomatic protocol requirements. Highly professional team with excellent relationships with law enforcement and embassy officials.",
    author: "Security Assessment Officer",
    date: "1 month ago"
  }
];

const diplomaticCaseStudies = [
  {
    title: "G7 Summit Diplomatic Transport",
    client: "Multiple Foreign Delegations",
    challenge: "Coordinating secure transport for 45 foreign ministers and diplomatic staff during G7 summit, with complex security protocols and diplomatic immunity considerations.",
    solution: "Deployed specialized diplomatic transport fleet with government-cleared drivers, police escort coordination, and real-time security briefings for all movements across London.",
    result: "All diplomatic movements completed without security incidents. Zero protocol breaches or diplomatic complications. Summit proceedings uninterrupted by transport logistics.",
    metrics: "45 diplomats transported, 127 secure movements, 0 security incidents, 100% protocol compliance"
  },
  {
    title: "Emergency Consular Evacuation",
    client: "European Embassy",
    challenge: "Rapid evacuation of embassy staff and families during security threat escalation, requiring immediate secure transport to RAF base for emergency flight.",
    solution: "Emergency response protocol activated with armored convoy deployment, police coordination, and secure route to military airfield with government liaison throughout.",
    result: "All 23 embassy personnel and family members safely evacuated within 2 hours of threat notification. Zero security compromises during operation.",
    metrics: "23 personnel evacuated, 2-hour response window, 100% successful extraction rate"
  }
];

export default function DiplomaticPage() {
  return (
    <ServicePage
      title="Diplomatic & Government Transport"
      description="Providing secure, discreet, and reliable transport for government officials, diplomats, and state delegations with the highest level of protocol and professionalism."
      heroImage="/images/services/diplomatic-hero.jpg"
      Icon={Shield}
      category="Diplomatic"
      features={diplomaticFeatures}
      testimonials={diplomaticTestimonials}
      reviews={diplomaticReviews}
      caseStudies={diplomaticCaseStudies}
    />
  );
} 