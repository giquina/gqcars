import ServicePage from "@/app/components/ui/ServicePage";
import { Briefcase } from "lucide-react";

const corporateFeatures = [
  {
    title: "Executive & CEO Transport",
    description: "Ensure safe and punctual arrivals for your C-suite executives with our SIA-licensed security drivers and premium fleet."
  },
  {
    title: "Corporate Roadshows",
    description: "Manage complex, multi-stop itineraries with a dedicated security driver and vehicle for seamless financial roadshows and investor meetings."
  },
  {
    title: "Team & Group Transport",
    description: "Coordinate secure and comfortable transport for corporate teams attending conferences, off-sites, and events."
  },
  {
    title: "Confidentiality Assured",
    description: "All our drivers are bound by strict non-disclosure agreements to protect your business-sensitive conversations and information."
  }
];

const corporateTestimonials = [
  {
    name: "James Richardson",
    title: "CEO, Richardson Financial Group",
    quote: "GQ Cars has been our exclusive corporate transport provider for 3 years. Their SIA licensed drivers provide the security and professionalism our executives require. Never missed a meeting, never compromised on security.",
    rating: 5
  },
  {
    name: "Catherine Bloomberg",
    title: "Managing Director, Investment Bank",
    quote: "The roadshow coordination was flawless. 15 investor meetings across London in one day, all perfectly timed with secure transport. Our IPO success was partly due to this level of operational excellence.",
    rating: 5
  },
  {
    name: "Michael Chen",
    title: "Chief Technology Officer",
    quote: "When handling sensitive M&A discussions, confidentiality is paramount. GQ Cars' drivers understand this completely - professional, discreet, and bound by comprehensive NDAs. I trust them completely.",
    rating: 5
  }
];

const corporateReviews = [
  {
    platform: "LinkedIn Business Review",
    rating: 5,
    text: "Outstanding corporate transport service. Managing our board of directors' transport for quarterly meetings has never been smoother. Professional drivers, luxury vehicles, and impeccable timing.",
    author: "Corporate Secretary, FTSE 250 Company",
    date: "2 weeks ago"
  },
  {
    platform: "Corporate Procurement Review",
    rating: 5,
    text: "Exceptional value for executive transport. The security training of drivers gives us peace of mind for our senior leadership team. Highly recommend for any corporation requiring premium transport.",
    author: "Head of Procurement",
    date: "1 month ago"
  }
];

const corporateCaseStudies = [
  {
    title: "Multi-City European Roadshow",
    client: "FTSE 100 Technology Company",
    challenge: "Coordinating secure transport for CEO and CFO across 8 European cities in 5 days for pre-IPO investor roadshow, with strict timing requirements and confidentiality needs.",
    solution: "Deployed coordinated security transport teams in London, Paris, Frankfurt, Milan, and Zurich with local partnerships, real-time schedule management, and comprehensive security protocols.",
    result: "All 32 investor meetings completed on schedule. Zero security breaches or confidentiality lapses. IPO oversubscribed by 340% with successful £2.1B raise.",
    metrics: "5 cities, 32 meetings, 100% on-time performance, £2.1B successful IPO"
  },
  {
    title: "Corporate Crisis Management Transport",
    client: "International Bank",
    challenge: "Emergency board meeting coordination during market crisis, requiring immediate secure transport for 12 board members from various London locations to emergency session.",
    solution: "Activated rapid response protocol with 8 security vehicles dispatched within 15 minutes, secure communication channels, and coordinated arrival times to maintain confidentiality.",
    result: "All board members safely transported to emergency session within 45 minutes. Crisis response strategy developed and implemented, protecting bank's market position.",
    metrics: "15-minute response time, 12 executives transported, 45-minute coordination window, crisis averted"
  }
];

export default function CorporatePage() {
  return (
    <ServicePage
      title="Corporate & Executive Transport"
      description="Reliable, secure, and professional transport solutions for businesses, executives, and corporate events across London."
      heroImage="/images/services/corporate-hero.jpg"
      Icon={Briefcase}
      category="Corporate"
      features={corporateFeatures}
      testimonials={corporateTestimonials}
      reviews={corporateReviews}
      caseStudies={corporateCaseStudies}
    />
  );
}