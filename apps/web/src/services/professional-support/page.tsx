import Link from 'next/link'
import { Clock, Shield, Phone, Car, CheckCircle, ArrowLeft, Star, Zap, Briefcase } from 'lucide-react'
import ServicePage from "@/app/components/ui/ServicePage";

const professionalFeatures = [
  {
    title: "Legal & Court Appearances",
    description: "Secure transport to courts, legal chambers, and law firm meetings with understanding of legal district protocols. Our drivers are experienced with court scheduling, security requirements, and the sensitive nature of legal proceedings."
  },
  {
    title: "Medical & Healthcare Appointments",
    description: "Professional transport to medical appointments, specialist consultations, and healthcare facilities. Discrete service for sensitive medical situations with trained drivers who understand healthcare appointment requirements and patient privacy."
  },
  {
    title: "Financial & Banking Services",
    description: "Secure transport to banks, financial institutions, and wealth management meetings. Our drivers understand City protocols, security requirements for financial meetings, and the confidential nature of financial discussions."
  },
  {
    title: "Professional Consultation Transport",
    description: "Reliable transport to accountants, solicitors, consultants, and professional service providers. We ensure punctual arrival at professional appointments while maintaining appropriate business etiquette and discretion."
  },
  {
    title: "Government & Regulatory Meetings",
    description: "Specialized transport to government offices, regulatory bodies, and official appointments. Our drivers understand government facility protocols, security clearance requirements, and official meeting procedures."
  },
  {
    title: "Confidential Business Support",
    description: "Discrete transport for sensitive business meetings, due diligence sessions, and confidential consultations. All drivers bound by comprehensive NDAs with understanding of business confidentiality requirements."
  }
];

const professionalTestimonials = [
  {
    name: "Sir Marcus Wellington QC",
    role: "Barrister, Temple Chambers",
    content: "For court appearances and client meetings, punctuality and discretion are paramount. GQ Security's professional support service has been reliable for five years, understanding the demands of legal practice and client confidentiality requirements.",
    rating: 5
  },
  {
    name: "Dr. Helena Morrison",
    role: "Consultant Physician",
    content: "Between hospital rounds, private consultations, and medical conferences, their service provides the reliability I need. Their drivers understand medical scheduling demands and provide appropriate discretion for sensitive patient situations.",
    rating: 5
  },
  {
    name: "Richard Blackstone",
    role: "Financial Advisor",
    content: "Managing high-net-worth client meetings across London requires impeccable timing and discretion. Their professional support service ensures I arrive composed and prepared, while maintaining the confidentiality essential to financial advisory work.",
    rating: 5
  }
];

const professionalCaseStudies = [
  {
    title: "High-Profile Legal Case Support",
    challenge: "Prominent QC required secure transport during high-profile court case with significant media attention and security concerns. Multiple daily court appearances, client meetings, and chambers visits requiring absolute punctuality and discretion throughout 6-week trial.",
    solution: "Provided dedicated professional support vehicle with security-trained driver, established alternative routes to avoid media, coordinated with court security, maintained flexible scheduling for trial uncertainties, and ensured confidential transport throughout proceedings.",
    result: "Successful case completion with perfect attendance record despite media pressure and scheduling challenges. QC able to focus entirely on case preparation while transport logistics handled seamlessly. Case resulted in landmark legal victory."
  },
  {
    title: "Medical Specialist Coordination",
    challenge: "Senior consultant required efficient transport between three London hospitals for patient rounds, plus travel to private practice for consultations. Complex scheduling with emergency call requirements and need for immediate availability during critical patient situations.",
    solution: "Assigned dedicated medical support driver familiar with hospital protocols, maintained standby availability for emergency calls, coordinated with medical secretaries for schedule changes, and provided immediate response capability for critical situations.",
    result: "Seamless medical practice coordination over 2-year contract with 100% on-time performance for scheduled appointments. Successfully managed 47 emergency calls with rapid response. Doctor able to maintain full practice schedule across multiple locations."
  }
];

const professionalPricing = [
  {
    title: "Professional Appointments",
    description: "Transport to professional meetings and consultations",
    startingPrice: "£75/trip",
    features: [
      "Executive vehicle",
      "Professional trained driver",
      "Punctuality guarantee",
      "Confidentiality protocols",
      "City and legal district knowledge",
      "Flexible scheduling"
    ]
  },
  {
    title: "Daily Professional Support",
    description: "All-day professional transport service",
    startingPrice: "£400/day",
    features: [
      "Dedicated professional driver",
      "Multiple appointment coordination",
      "Standby availability",
      "Emergency response capability",
      "Professional service protocols",
      "Comprehensive London coverage"
    ]
  },
  {
    title: "Ongoing Professional Partnership",
    description: "Monthly professional transport solution",
    startingPrice: "£1,500/month",
    features: [
      "Priority booking guarantee",
      "Dedicated account management",
      "Flexible monthly hours",
      "Emergency priority access",
      "Professional relationship management",
      "Quarterly service reviews"
    ]
  }
];

const professionalFaqs = [
  {
    question: "Do you understand professional appointment requirements?",
    answer: "Yes, our drivers are trained in professional service protocols including legal, medical, and financial appointment requirements. We understand punctuality demands, confidentiality needs, and appropriate professional etiquette for various industries."
  },
  {
    question: "Can you handle last-minute schedule changes?",
    answer: "Absolutely. Professional schedules often change unexpectedly, and our service is designed for flexibility. We maintain communication with your office staff and can adapt to urgent schedule changes, emergency appointments, and extended meetings."
  },
  {
    question: "How do you ensure confidentiality for sensitive meetings?",
    answer: "All our drivers sign comprehensive NDAs and undergo background checks appropriate for professional services. We maintain strict confidentiality protocols and understand the sensitive nature of legal, medical, and financial professional discussions."
  },
  {
    question: "Do you provide emergency transport for professionals?",
    answer: "Yes, we maintain emergency response capability for professional clients. This includes urgent medical calls, emergency legal situations, and critical business meetings. Our 24/7 operations center can dispatch immediate transport when required."
  },
  {
    question: "Can you coordinate with professional office staff?",
    answer: "Certainly. We work directly with secretaries, practice managers, and office coordinators to manage scheduling, handle appointment changes, and ensure seamless coordination with your professional practice operations."
  },
  {
    question: "Do you understand court and government facility protocols?",
    answer: "Yes, our drivers are experienced with court procedures, government facility security, and official building protocols. We understand timing requirements for court appearances and security procedures for government and regulatory meetings."
  }
];

const seoKeywords = [
  "professional transport London",
  "legal transport service",
  "medical appointment transport",
  "court appearance transport",
  "business consultation transport",
  "professional chauffeur London",
  "legal chambers transport",
  "medical professional transport",
  "government meeting transport",
  "confidential business transport"
];

export default function ProfessionalSupportPage() {
  return (
    <ServicePage
      title="Professional Support Services"
      description="Specialized transport for professional appointments, legal proceedings, medical consultations, and business meetings. Reliable, confidential, and punctual service designed for the demands of professional practice with flexible scheduling and emergency response."
      heroImage="/images/services/professional-hero.jpg"
      Icon={Briefcase}
      category="Professional Support"
      features={professionalFeatures}
      testimonials={professionalTestimonials}
      caseStudies={professionalCaseStudies}
      pricing={professionalPricing}
      faqs={professionalFaqs}
      seoKeywords={seoKeywords}
    />
  );
}