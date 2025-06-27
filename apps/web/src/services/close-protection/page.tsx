import ServicePage from "@/app/components/ui/ServicePage";
import { Shield } from "lucide-react";

const protectionFeatures = [
  {
    title: "SIA-Licensed CPOs",
    description: "Our team consists of fully licensed Close Protection Officers, vetted and trained to the highest UK standards for your personal security."
  },
  {
    title: "Threat & Risk Assessment",
    description: "We conduct comprehensive assessments to identify potential risks and develop proactive security strategies tailored to your profile and itinerary."
  },
  {
    title: "Discreet & Covert Protection",
    description: "Our CPOs are experts in blending into any environment, providing a low-profile yet highly effective security presence that never compromises your privacy."
  },
  {
    title: "Secure & Advanced Fleet",
    description: "Travel in our fleet of high-end, secure vehicles, equipped with advanced safety features and driven by expert security drivers."
  }
];

const protectionTestimonials = [
  {
    name: "Lord William Hartwell",
    title: "Former Minister",
    quote: "Having used protection services across three continents, I can confidently say GQ Cars' CPOs are among the finest. Professional, discreet, and exceptionally skilled. They've kept my family safe for over 3 years.",
    rating: 5
  },
  {
    name: "Isabella Rothschild",
    title: "Art Collector & Philanthropist",
    quote: "The level of discretion and professionalism is unmatched. My CPO blends seamlessly into high-society events while maintaining constant vigilance. I feel completely secure at all times.",
    rating: 5
  },
  {
    name: "Dr. Ahmed Al-Mansouri",
    title: "International Businessman",
    quote: "The threat assessment was incredibly thorough and the security plan was perfectly executed. My business dealings require the highest level of protection, and GQ Cars delivers without compromise.",
    rating: 5
  }
];

const protectionReviews = [
  {
    platform: "Verified Client Review",
    rating: 5,
    text: "Outstanding close protection service. The team conducted a comprehensive risk assessment and provided 24/7 security that was both visible when needed and completely discreet when required.",
    author: "Anonymous Executive",
    date: "3 weeks ago"
  },
  {
    platform: "Professional Referral",
    rating: 5,
    text: "As a security consultant, I've worked with many CPO teams. GQ Cars' professionalism, training standards, and operational excellence are consistently top-tier. Highly recommended.",
    author: "Security Industry Professional",
    date: "1 month ago"
  }
];

const protectionCaseStudies = [
  {
    title: "Royal Wedding Security Operation",
    client: "High-Net-Worth Family",
    challenge: "Coordinating close protection for 150+ VIP wedding guests at historic venue, including foreign dignitaries and celebrities, with significant media attention.",
    solution: "Deployed 12 SIA-licensed CPOs with coordinated security perimeter, advance reconnaissance, guest screening protocols, and seamless coordination with local police and venue security.",
    result: "Zero security incidents throughout 3-day event. All VIPs safely transported to/from venue. Media intrusion completely prevented while maintaining elegant wedding atmosphere.",
    metrics: "12 CPOs deployed, 150+ VIPs protected, 0 security incidents, 3-day operation success rate: 100%"
  },
  {
    title: "International Business Executive Protection",
    client: "Fortune 500 CEO",
    challenge: "6-month protection detail for CEO facing credible threats during hostile takeover negotiations across London, Frankfurt, and Zurich.",
    solution: "24/7 CPO detail with armored vehicle fleet, advance security at all meeting locations, secure accommodation arrangements, and coordination with international security teams.",
    result: "CEO completed all critical negotiations safely. Threat level reduced to minimal through proactive security measures. Business deal successfully concluded.",
    metrics: "180 days continuous protection, 47 secure transports, 3 countries covered, threat mitigation: 95%"
  }
];

export default function CloseProtectionPage() {
  return (
    <ServicePage
      title="Close Protection Services"
      description="Personalized security solutions delivered by elite, SIA-licensed Close Protection Officers for high-net-worth individuals, executives, and families."
      heroImage="/images/services/protection-hero.jpg"
      Icon={Shield}
      category="Protection"
      features={protectionFeatures}
      testimonials={protectionTestimonials}
      reviews={protectionReviews}
      caseStudies={protectionCaseStudies}
    />
  );
}