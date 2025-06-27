import ServicePage from "@/app/components/ui/ServicePage";
import { Shield } from "lucide-react";

const protectionFeatures = [
  {
    title: "Elite SIA-Licensed CPOs",
    description: "Our Close Protection Officers are hand-selected from military, police, and special forces backgrounds. All hold current SIA licenses and undergo continuous training in threat assessment, defensive driving, and emergency response."
  },
  {
    title: "Comprehensive Threat Assessment",
    description: "Advanced risk analysis covering digital footprint, travel patterns, and potential exposure points. We develop tailored security protocols based on your specific threat profile and lifestyle requirements."
  },
  {
    title: "Discreet & Covert Protection",
    description: "Low-profile security that blends seamlessly into any environment. Our CPOs are trained in sophisticated social settings, boardrooms, and public events while maintaining constant vigilance and protection readiness."
  },
  {
    title: "Secure Transportation Fleet",
    description: "Armored vehicles available with ballistic protection, run-flat tires, and defensive driving capabilities. Standard luxury fleet includes Mercedes S-Class, BMW 7 Series, and Range Rover with enhanced security features."
  },
  {
    title: "24/7 Operations Center",
    description: "Round-the-clock monitoring with direct communication to emergency services, medical teams, and backup security units. Real-time tracking and immediate response protocols for any situation."
  },
  {
    title: "International Coordination",
    description: "Global security network enabling seamless protection during international travel. Advance team deployment, local liaison coordination, and country-specific threat briefings available."
  }
];

const protectionTestimonials = [
  {
    name: "Michael Harrison",
    role: "Tech CEO, Fortune 500 Company",
    content: "After receiving credible threats, GQ Security's close protection team gave me complete confidence to continue normal business operations. Their professionalism and discretion are unparalleled.",
    rating: 5
  },
  {
    name: "Lady Catherine Westfield",
    role: "Private Family Office",
    content: "The team protected our family during a high-profile court case. They were invisible when needed but instantly responsive when situations arose. Exceptional service throughout a difficult period.",
    rating: 5
  },
  {
    name: "Ambassador James Mitchell",
    role: "Former Diplomatic Service",
    content: "Having used government protection services for decades, I can confidently say GQ Security's close protection standards rival or exceed any official service. Highly recommended for serious security needs.",
    rating: 5
  }
];

const protectionCaseStudies = [
  {
    title: "High-Profile Divorce Protection",
    challenge: "Prominent businessman facing hostile divorce proceedings with credible threats from spouse's associates. Required comprehensive family protection while maintaining normal business schedule and public appearances.",
    solution: "Deployed 3-person CPO team with advance reconnaissance, secure vehicle rotations, and family home security assessment. Coordinated with legal team and implemented digital security protocols.",
    result: "Successfully protected family through 8-month proceedings with zero security incidents. Client able to maintain business operations and eventual favorable legal outcome. Contract extended for ongoing protection."
  },
  {
    title: "Corporate Kidnap Threat Response",
    challenge: "Multinational executive received credible kidnap threat ahead of Middle East business trip. Required immediate security assessment and protection deployment within 48 hours.",
    solution: "Conducted rapid threat analysis, deployed advance security team to destination, arranged secure accommodations, and provided 24/7 close protection throughout trip with armored transport.",
    result: "Completed critical business negotiations safely with threat neutralized through coordinated international law enforcement action. Client signed £50M deal and retained us for all future high-risk travel."
  }
];

const protectionPricing = [
  {
    title: "Personal Protection",
    description: "Single CPO for daily protection and secure transport",
    startingPrice: "£500/day",
    features: [
      "SIA-licensed Close Protection Officer",
      "Secure vehicle and driver",
      "Threat assessment included",
      "12-hour protection coverage",
      "Emergency response protocols",
      "Discrete close protection"
    ]
  },
  {
    title: "Executive Protection",
    description: "Enhanced protection with team coordination",
    startingPrice: "£1,200/day",
    features: [
      "2-person CPO team",
      "Advance reconnaissance",
      "Armored vehicle options",
      "24/7 operations support",
      "Digital security assessment",
      "International coordination"
    ]
  },
  {
    title: "Family & Estate Protection",
    description: "Comprehensive family security solutions",
    startingPrice: "£2,500/day",
    features: [
      "Multi-person protection team",
      "Residential security integration",
      "Children's school run security",
      "Event and travel protection",
      "Staff vetting and training",
      "Crisis management planning"
    ]
  }
];

const protectionFaqs = [
  {
    question: "What qualifications do your Close Protection Officers have?",
    answer: "All our CPOs are SIA licensed and come from elite backgrounds including military special forces, police protection units, or government security services. They undergo continuous training in threat assessment, defensive tactics, emergency medical response, and advanced driving techniques."
  },
  {
    question: "How quickly can you deploy close protection services?",
    answer: "For emergency situations, we can deploy protection within 2-4 hours in London, 6-12 hours nationally. For planned assignments, we prefer 48-72 hours for proper threat assessment and briefing, but can accommodate shorter timelines when necessary."
  },
  {
    question: "Do you provide international close protection?",
    answer: "Yes, we operate globally through our network of vetted international partners. We provide advance team deployment, local threat briefings, secure transport arrangements, and maintain communication with UK operations center throughout international assignments."
  },
  {
    question: "What is included in a threat assessment?",
    answer: "Our comprehensive assessment covers digital footprint analysis, travel pattern evaluation, residential security review, potential adversary identification, and vulnerability analysis. We provide detailed risk ratings and mitigation strategies tailored to your specific circumstances."
  },
  {
    question: "Can close protection be provided discreetly?",
    answer: "Absolutely. Our CPOs are trained to operate covertly in business, social, and family environments. They dress appropriately for each situation and maintain protection readiness while appearing as assistants, colleagues, or companions as the situation requires."
  },
  {
    question: "Do you coordinate with police and security services?",
    answer: "Yes, we maintain excellent relationships with Metropolitan Police, Counter Terrorism teams, and government security services. We can coordinate protection with official services and provide intelligence sharing when appropriate and legally permitted."
  }
];

const seoKeywords = [
  "close protection London",
  "personal bodyguard service",
  "executive protection UK",
  "VIP security services",
  "SIA licensed bodyguard",
  "family protection services",
  "corporate security protection",
  "celebrity bodyguard London",
  "threat assessment UK",
  "private security officer"
];

export default function CloseProtectionPage() {
  return (
    <ServicePage
      title="Close Protection Services"
      description="Elite close protection services delivered by SIA-licensed security professionals. Discreet personal protection, threat assessment, and secure transport for high-net-worth individuals, executives, and families requiring professional security."
      heroImage="/images/services/protection-hero.jpg"
      Icon={Shield}
      category="Protection"
      features={protectionFeatures}
      testimonials={protectionTestimonials}
      caseStudies={protectionCaseStudies}
      pricing={protectionPricing}
      faqs={protectionFaqs}
      seoKeywords={seoKeywords}
    />
  );
}