import ServicePage from "@/app/components/ui/ServicePage";
import { Globe } from "lucide-react";

const diplomaticFeatures = [
  {
    title: "Embassy & Consulate Security",
    description: "Specialized security transport for diplomatic personnel, embassy staff, and visiting dignitaries. Our team understands diplomatic protocols, immunity considerations, and international security requirements for seamless diplomatic operations."
  },
  {
    title: "International Protocol Expertise",
    description: "Comprehensive understanding of diplomatic etiquette, ceremonial requirements, and international protocol standards. Our drivers are trained in diplomatic procedures, cultural sensitivities, and formal protocol requirements for official functions."
  },
  {
    title: "High-Security Clearance Team",
    description: "Security-cleared personnel with diplomatic security experience from government and military backgrounds. All team members undergo enhanced vetting and maintain clearances appropriate for diplomatic protection assignments."
  },
  {
    title: "Armored Vehicle Fleet",
    description: "Specialized armored vehicles meeting diplomatic security standards, including ballistic protection, secure communications, and emergency response capabilities. Fleet includes sedans, SUVs, and diplomatic transport vehicles."
  },
  {
    title: "Multi-Agency Coordination",
    description: "Seamless coordination with diplomatic security services, Metropolitan Police Diplomatic Protection Group, and international security agencies. Established relationships with embassy security teams and government protection units."
  },
  {
    title: "Crisis & Emergency Response",
    description: "Specialized crisis management for diplomatic emergencies, evacuation procedures, and security incidents. 24/7 operations center with direct links to embassy security, Foreign Office, and emergency services."
  }
];

const diplomaticTestimonials = [
  {
    name: "Ambassador Maria Rodriguez",
    role: "European Union Diplomatic Service",
    content: "GQ Security's understanding of diplomatic requirements is exceptional. Their team seamlessly integrates with our embassy security protocols while providing the highest level of professional transport services for our visiting dignitaries.",
    rating: 5
  },
  {
    name: "Colonel James Mitchell",
    role: "Former Military Attaché",
    content: "Having worked with diplomatic security worldwide, I can attest that GQ Security's standards rival the best government protection services. Their team's professionalism and security expertise are truly world-class.",
    rating: 5
  },
  {
    name: "Dr. Sarah Chen",
    role: "International Trade Representative",
    content: "During sensitive trade negotiations, security and discretion were paramount. GQ Security provided flawless transport coordination while maintaining the confidentiality essential for successful diplomatic outcomes.",
    rating: 5
  }
];

const diplomaticCaseStudies = [
  {
    title: "G7 Summit Security Coordination",
    challenge: "Major international summit required secure transport for 15 foreign ministers and their delegations across London. Complex scheduling with multiple venues, high threat environment, and zero tolerance for delays or security incidents during critical negotiations.",
    solution: "Deployed 25-vehicle armored convoy with diplomatic security drivers, coordinated with Metropolitan Police and government security services, established secure routes with backup protocols, and maintained 24/7 operations center coordination.",
    result: "Successful summit completion with 147 secure transports executed flawlessly. Zero security incidents or scheduling delays. Received commendation from Foreign Office for exceptional diplomatic security coordination."
  },
  {
    title: "Embassy Evacuation Coordination",
    challenge: "Political crisis required immediate evacuation of embassy personnel and families from high-risk location. Time-critical operation requiring secure transport to safe locations while maintaining diplomatic protocols and personnel safety.",
    solution: "Activated emergency response protocols, coordinated with embassy security team and government agencies, deployed armored transport convoy, and established secure evacuation routes with medical and emergency support backup.",
    result: "Successfully evacuated 47 diplomatic personnel and family members within 6 hours. Zero casualties or security incidents during operation. Embassy security team praised coordination and professionalism throughout crisis."
  }
];

const diplomaticPricing = [
  {
    title: "Embassy Staff Transport",
    description: "Daily diplomatic transport services",
    startingPrice: "£400/day",
    features: [
      "Security-cleared drivers",
      "Diplomatic protocol training",
      "Standard luxury vehicles",
      "Embassy coordination",
      "Secure communications",
      "Emergency response protocols"
    ]
  },
  {
    title: "Visiting Dignitary Service",
    description: "Enhanced security for visiting officials",
    startingPrice: "£800/day",
    features: [
      "Armored vehicle options",
      "Close protection coordination",
      "Multi-agency liaison",
      "Advance reconnaissance",
      "Ceremonial transport",
      "24/7 operations support"
    ]
  },
  {
    title: "Summit & Conference Security",
    description: "Large-scale diplomatic event coordination",
    startingPrice: "£2,000/day",
    features: [
      "Multi-vehicle convoy management",
      "Diplomatic security integration",
      "Government liaison coordination",
      "Crisis management protocols",
      "International security coordination",
      "Specialized threat assessment"
    ]
  }
];

const diplomaticFaqs = [
  {
    question: "Do your personnel have appropriate security clearances?",
    answer: "Yes, our diplomatic protection team members hold appropriate security clearances and undergo enhanced vetting procedures. Many come from diplomatic security, military, or government protection backgrounds with existing clearances and diplomatic security experience."
  },
  {
    question: "How do you coordinate with embassy security teams?",
    answer: "We work directly with embassy security officers and maintain established relationships with diplomatic protection units. Our coordination includes advance planning, security briefings, route coordination, and real-time communication during transport operations."
  },
  {
    question: "Can you provide armored vehicles for high-threat situations?",
    answer: "Absolutely. Our diplomatic fleet includes armored vehicles meeting international security standards with ballistic protection, run-flat tires, secure communications, and emergency response capabilities. All armored vehicles are regularly inspected and certified."
  },
  {
    question: "Do you understand international diplomatic protocol?",
    answer: "Yes, our team is extensively trained in diplomatic protocol, international etiquette, and ceremonial requirements. We understand diplomatic immunity considerations, cultural sensitivities, and formal procedures required for official diplomatic functions."
  },
  {
    question: "How do you handle emergency evacuation situations?",
    answer: "We maintain comprehensive emergency response protocols developed in coordination with embassy security teams and government agencies. Our crisis management includes evacuation procedures, secure transport coordination, and direct liaison with emergency services and diplomatic authorities."
  },
  {
    question: "Can you coordinate with government protection services?",
    answer: "Yes, we have established relationships with Metropolitan Police Diplomatic Protection Group, government security services, and international protection agencies. We regularly coordinate joint protection operations and maintain secure communication channels with relevant authorities."
  }
];

const seoKeywords = [
  "diplomatic security London",
  "embassy transport service",
  "diplomatic protection UK",
  "government security transport",
  "diplomatic car service",
  "embassy security London",
  "diplomatic protocol transport",
  "international security services",
  "diplomatic convoy security",
  "embassy staff transport"
];

export default function DiplomaticPage() {
  return (
    <ServicePage
      title="Diplomatic Security Services"
      description="Specialized security transport for diplomatic personnel, embassy staff, and international dignitaries. Expert diplomatic protocol knowledge with security-cleared personnel and armored vehicle capabilities for government and diplomatic protection requirements."
      heroImage="/images/services/diplomatic-hero.jpg"
      Icon={Globe}
      category="Diplomatic"
      features={diplomaticFeatures}
      testimonials={diplomaticTestimonials}
      caseStudies={diplomaticCaseStudies}
      pricing={diplomaticPricing}
      faqs={diplomaticFaqs}
      seoKeywords={seoKeywords}
    />
  );
} 