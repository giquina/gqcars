import ServicePage from "@/app/components/ui/ServicePage";
import { Users } from "lucide-react";

const familyOfficeFeatures = [
  {
    title: "Dedicated Family Security Liaison",
    description: "Single point of contact from our senior management team to coordinate all family security and transport needs. Your dedicated liaison understands your family's unique requirements, preferences, and protocols for seamless, personalized service."
  },
  {
    title: "Total Discretion & Confidentiality",
    description: "All personnel operate under enhanced NDAs and security clearances. Our team provides covert protection that preserves your family's privacy, public profile, and personal space while maintaining constant vigilance and security readiness."
  },
  {
    title: "Child-Specialist Protection",
    description: "Family-trained CPOs specializing in child protection, school transportation, and youth activities. Our team creates friendly, non-intimidating security presence while ensuring complete safety for children's daily routines and special events."
  },
  {
    title: "Integrated Residential Security",
    description: "Seamless coordination with your existing residential security team to provide comprehensive 24/7 protection strategy. We integrate with home security systems, staff protocols, and family routines for holistic security coverage."
  },
  {
    title: "Multi-Generational Coordination",
    description: "Specialized service for complex family structures including elderly relatives, adult children, and extended family members. Coordinated protection and transport services that adapt to different family members' needs and lifestyle requirements."
  },
  {
    title: "Global Family Travel Security",
    description: "International family vacation and business travel coordination with advance reconnaissance, local security partnerships, and comprehensive travel security planning for multi-destination family journeys."
  }
];

const familyTestimonials = [
  {
    name: "The Henderson Family",
    role: "Private Family Office Clients",
    content: "GQ Security has been protecting our family for over four years. Their understanding of our children's needs and ability to provide security without disrupting family life is exceptional. We trust them completely with our most precious assets.",
    rating: 5
  },
  {
    name: "Margaret Thornfield",
    role: "Family Office Director",
    content: "Managing security for a high-net-worth family across multiple residences and international travel requires extraordinary coordination. GQ Security's family liaison service has simplified our operations while enhancing our security posture significantly.",
    rating: 5
  },
  {
    name: "Dr. William Foster",
    role: "Pediatric Surgeon & Family Principal",
    content: "After receiving threats related to a high-profile medical case, we needed family protection that wouldn't traumatize our young children. The team's child-specialist approach has been remarkable - our kids actually enjoy their company.",
    rating: 5
  }
];

const familyCaseStudies = [
  {
    title: "Multi-Residence Family Protection",
    challenge: "Ultra-high-net-worth family with residences in London, New York, and Monaco required coordinated security for family members frequently traveling between properties, including elderly matriarch with special medical needs and three school-age children.",
    solution: "Established resident security teams at each location, coordinated with existing household staff, implemented medical transport protocols, arranged specialized school security, and created seamless handoff procedures between jurisdictions.",
    result: "Four-year protection contract with zero security incidents across all residences. Successfully managed 47 international family trips, including emergency medical transport. Family able to maintain normal lifestyle with enhanced security confidence."
  },
  {
    title: "Celebrity Family Crisis Management",
    challenge: "Entertainment industry family facing intense media scrutiny and credible stalking threats during high-profile divorce proceedings. Required protection for both parents and two teenage children while maintaining privacy and normal school attendance.",
    solution: "Deployed discreet family protection team, coordinated with school security, established secure transportation protocols, implemented media management strategies, and provided crisis counseling support throughout proceedings.",
    result: "Successfully protected family through 14-month legal process with complete media privacy maintained. Children continued normal education without disruption. Post-divorce, retained for ongoing family security services."
  }
];

const familyPricing = [
  {
    title: "Family Protection Basic",
    description: "Essential family security for daily activities",
    startingPrice: "£800/day",
    features: [
      "Dedicated family security liaison",
      "Child-specialist CPO available",
      "Secure family transport",
      "School run security",
      "Emergency response protocols",
      "Residential security coordination"
    ]
  },
  {
    title: "Family Office Premium",
    description: "Comprehensive family security solution",
    startingPrice: "£1,800/day",
    features: [
      "Multi-person protection team",
      "24/7 family security coverage",
      "International travel coordination",
      "Multiple residence security",
      "Staff security training",
      "Crisis management planning"
    ]
  },
  {
    title: "Ultra High Net Worth",
    description: "Complete family security ecosystem",
    startingPrice: "£3,500/day",
    features: [
      "Dedicated security team",
      "Global residence coordination",
      "Executive family travel security",
      "Medical emergency protocols",
      "Family office integration",
      "Multi-generational protection"
    ]
  }
];

const familyFaqs = [
  {
    question: "How do you handle security around children without frightening them?",
    answer: "Our child-specialist CPOs are trained in child psychology and family dynamics. They present as friendly family assistants or companions, engaging naturally with children while maintaining protection readiness. We coordinate with parents to ensure security measures feel supportive rather than restrictive."
  },
  {
    question: "Can you coordinate with our existing household staff and security?",
    answer: "Absolutely. We integrate seamlessly with your existing residential security team, household staff, and family office operations. Our liaison works directly with your family office to coordinate schedules, protocols, and emergency procedures for comprehensive protection coverage."
  },
  {
    question: "Do you provide protection for multiple family residences?",
    answer: "Yes, we coordinate security across multiple properties domestically and internationally. Our network includes vetted partners worldwide, and we can establish resident security teams or coordinate visiting protection as your family travels between properties."
  },
  {
    question: "How do you handle family travel and vacation security?",
    answer: "We provide advance reconnaissance for vacation destinations, coordinate with local security services, arrange secure accommodations, and deploy protection teams that understand family vacation dynamics. Our goal is enabling normal family experiences with invisible security enhancement."
  },
  {
    question: "What protocols do you have for medical emergencies?",
    answer: "We maintain detailed medical profiles for all family members, coordinate with family physicians and specialists, have trained medical responders on our teams, and maintain direct links to emergency medical services. For family members with special medical needs, we provide specialized protocols and equipment."
  },
  {
    question: "How do you maintain privacy for high-profile families?",
    answer: "All team members undergo enhanced background checks and sign comprehensive NDAs. We implement strict information security protocols, use covert surveillance techniques, and coordinate with media management when necessary to maintain family privacy and normal lifestyle."
  }
];

const seoKeywords = [
  "family office security London",
  "family protection services",
  "high net worth family security",
  "private family bodyguard",
  "family transport security",
  "children protection services",
  "wealthy family security",
  "family office coordination",
  "multi residence security",
  "private family safety"
];

export default function FamilyOfficePage() {
  return (
    <ServicePage
      title="Family Office Security Services"
      description="Comprehensive, discreet family protection services coordinated through dedicated liaison. Specialized security for high-net-worth families including children's protection, multi-residence coordination, and integrated family office security solutions."
      heroImage="/images/services/family-hero.jpg"
      Icon={Users}
      category="Family Office"
      features={familyOfficeFeatures}
      testimonials={familyTestimonials}
      caseStudies={familyCaseStudies}
      pricing={familyPricing}
      faqs={familyFaqs}
      seoKeywords={seoKeywords}
    />
  );
}
