import ServicePage from "@/app/components/ui/ServicePage";
import { Briefcase } from "lucide-react";

const corporateFeatures = [
  {
    title: "Executive & C-Suite Transport",
    description: "Dedicated security-trained drivers for senior executives, CEOs, and board members. Punctual, professional service ensuring safe arrival at critical business meetings, conferences, and corporate events with complete confidentiality."
  },
  {
    title: "Corporate Roadshow Management",
    description: "Complex multi-city itinerary coordination for financial roadshows, investor meetings, and acquisition tours. Dedicated vehicles and drivers familiar with City protocols, financial district access, and time-critical scheduling requirements."
  },
  {
    title: "Team & Group Coordination",
    description: "Seamless transport logistics for corporate teams, board meetings, off-site events, and international delegations. Multi-vehicle coordination with experienced drivers trained in corporate etiquette and confidentiality protocols."
  },
  {
    title: "Confidentiality & NDA Compliance",
    description: "All drivers and support staff bound by comprehensive non-disclosure agreements. Secure vehicles with privacy glass, encrypted communications, and protocols designed to protect sensitive business discussions and confidential information."
  },
  {
    title: "Emergency Response Protocols",
    description: "24/7 crisis management for security incidents, medical emergencies, or business disruptions. Direct coordination with corporate security teams, emergency services, and backup transport solutions to ensure business continuity."
  },
  {
    title: "Global Corporate Network",
    description: "International business travel coordination with security-vetted partner networks. Advance team deployment for overseas meetings, local threat assessments, and seamless protection during international business operations."
  }
];

const corporateTestimonials = [
  {
    name: "David Chen",
    role: "CEO, Private Equity Fund",
    content: "GQ Security has been handling our executive transport for three years. Their discretion during sensitive M&A negotiations is absolute, and their reliability means I never worry about missing critical meetings.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "Board Director, FTSE 100 Company",
    content: "During a particularly challenging period with activist investors, their team provided seamless secure transport while maintaining complete confidentiality. Professional service that adapts to our corporate needs.",
    rating: 5
  },
  {
    name: "Robert Thomson",
    role: "Managing Director, Investment Bank",
    content: "For our London roadshow, they coordinated transport for 15 senior executives across multiple locations. Flawless execution that allowed us to focus entirely on our client presentations. Highly recommended.",
    rating: 5
  }
];

const corporateCaseStudies = [
  {
    title: "Hostile Takeover Protection",
    challenge: "FTSE 250 company facing hostile takeover bid required secure transport for board members receiving threats from activist shareholders. Multiple daily meetings across London financial district with zero tolerance for delays or security incidents.",
    solution: "Deployed dedicated 5-vehicle security convoy with experienced City drivers, established secure routing protocols, coordinated with corporate security, and implemented real-time tracking for all board member movements.",
    result: "Successfully defended against takeover through 4-month campaign with zero security incidents. All 47 critical board meetings completed on schedule. Client retained us for permanent executive protection services."
  },
  {
    title: "International IPO Roadshow",
    challenge: "Tech unicorn required global roadshow coordination for £2.5B IPO across New York, London, Hong Kong, and Singapore. Complex scheduling with multiple senior executives, investor meetings, and media obligations requiring precise timing and security.",
    solution: "Coordinated international security transport with local partners, provided advance reconnaissance in each city, established secure communication protocols, and maintained 24/7 operations support throughout the roadshow.",
    result: "Successful IPO completion with oversubscribed offering. All 89 investor meetings completed on schedule across 4 continents. Company achieved highest valuation in sector and extended contract for ongoing executive transport."
  }
];

const corporatePricing = [
  {
    title: "Executive Daily Service",
    description: "Dedicated corporate transport for senior executives",
    startingPrice: "£350/day",
    features: [
      "SIA-licensed security driver",
      "Mercedes S-Class or BMW 7 Series",
      "Corporate confidentiality protocols",
      "12-hour availability window",
      "Priority scheduling guarantee",
      "Emergency backup vehicle"
    ]
  },
  {
    title: "Corporate Team Service",
    description: "Multi-vehicle coordination for corporate events",
    startingPrice: "£250/vehicle/day",
    features: [
      "Fleet of luxury vehicles",
      "Dedicated team coordinator",
      "Multi-location logistics",
      "Group scheduling management",
      "Corporate account billing",
      "24/7 support hotline"
    ]
  },
  {
    title: "Board & C-Suite Protection",
    description: "Enhanced security for senior leadership",
    startingPrice: "£500/day",
    features: [
      "Close protection qualified drivers",
      "Armored vehicle options",
      "Threat assessment included",
      "Advance route reconnaissance",
      "Crisis response protocols",
      "International coordination"
    ]
  }
];

const corporateFaqs = [
  {
    question: "How do you ensure confidentiality for sensitive business discussions?",
    answer: "All our drivers and staff sign comprehensive NDAs and undergo background checks. Our vehicles feature privacy glass, secure communications, and sound dampening. We maintain strict protocols about client information and business dealings, with regular confidentiality training for all personnel."
  },
  {
    question: "Can you handle complex corporate event logistics?",
    answer: "Yes, we specialize in multi-vehicle corporate coordination. Our team can manage AGMs, board meetings, conferences, and international delegations with precise timing, guest coordination, and seamless logistics management across multiple locations and schedules."
  },
  {
    question: "Do you provide international corporate transport?",
    answer: "Absolutely. We coordinate global corporate travel through our vetted international network. This includes advance team deployment, local threat briefings, secure vehicle arrangements, and 24/7 UK operations support for international business operations."
  },
  {
    question: "What happens if there's a security incident or emergency?",
    answer: "We maintain 24/7 operations center with direct links to emergency services, medical teams, and backup security units. Our drivers are trained in crisis response, and we have established protocols for medical emergencies, security threats, and business disruption scenarios."
  },
  {
    question: "How quickly can you arrange emergency corporate transport?",
    answer: "For existing corporate clients, we maintain priority access to vehicles and can deploy within 30 minutes in central London. For new urgent requirements, we typically arrange transport within 2-4 hours, with 24/7 emergency response capabilities."
  },
  {
    question: "Do you integrate with existing corporate security systems?",
    answer: "Yes, we work closely with corporate security teams, facilities management, and IT departments. We can integrate with existing security protocols, access control systems, and corporate travel policies to provide seamless security transport solutions."
  }
];

const seoKeywords = [
  "corporate transport London",
  "executive car service",
  "business transport security",
  "CEO transport service",
  "corporate chauffeur London",
  "board meeting transport",
  "financial district transport",
  "corporate security driving",
  "executive protection transport",
  "business delegation transport"
];

export default function CorporatePage() {
  return (
    <ServicePage
      title="Corporate & Executive Transport"
      description="Professional corporate transport solutions for executives, board members, and business teams. Secure, reliable, and confidential transport services designed for the demands of modern business with 24/7 availability and crisis management protocols."
      heroImage="/images/services/corporate-hero.jpg"
      Icon={Briefcase}
      category="Corporate"
      features={corporateFeatures}
      testimonials={corporateTestimonials}
      caseStudies={corporateCaseStudies}
      pricing={corporatePricing}
      faqs={corporateFaqs}
      seoKeywords={seoKeywords}
    />
  );
}