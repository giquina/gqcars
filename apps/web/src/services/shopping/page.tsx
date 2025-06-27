import ServicePage from "@/app/components/ui/ServicePage";
import { ShoppingBag } from "lucide-react";

const shoppingFeatures = [
  {
    title: "Luxury Shopping Districts",
    description: "Expert knowledge of Bond Street, Knightsbridge, King's Road, and Mayfair shopping areas. Our drivers understand VIP entrance protocols, parking arrangements, and timing requirements for luxury boutiques and department stores."
  },
  {
    title: "Personal Shopping Coordination",
    description: "Seamless coordination with personal shoppers, stylists, and boutique managers. We coordinate timing, appointments, and special arrangements to ensure smooth shopping experiences at exclusive retailers and private showrooms."
  },
  {
    title: "Secure Purchase Transport",
    description: "Safe transport and storage of valuable purchases with discrete handling of luxury items, jewelry, and artwork. Our vehicles provide secure storage and our drivers are trained in handling high-value items with appropriate discretion."
  },
  {
    title: "Multi-Store Coordination",
    description: "Efficient routing between multiple stores, boutiques, and appointments. Our drivers optimize routes to minimize travel time while ensuring you have adequate time at each location for browsing and purchasing decisions."
  },
  {
    title: "Wait & Return Service",
    description: "Professional waiting service while you shop, with drivers remaining available for immediate departure. No rushed shopping experience - take the time you need while your driver ensures secure vehicle availability."
  },
  {
    title: "International Shopping Tours",
    description: "Coordinate shopping experiences for international visitors including tax-free shopping assistance, currency coordination, and cultural guidance for navigating London's luxury retail landscape with local expertise."
  }
];

const shoppingTestimonials = [
  {
    name: "Mrs. Caroline Ashworth",
    role: "Fashion Enthusiast & Collector",
    content: "GQ Security's shopping service has transformed my London retail experiences. Their drivers know every boutique manager, understand appointment scheduling, and handle my purchases with the care they deserve. It's like having a luxury shopping concierge.",
    rating: 5
  },
  {
    name: "Yasmin Al-Rashid",
    role: "International Client",
    content: "Visiting London twice yearly for shopping, I rely entirely on their service. They coordinate with my personal shopper, handle tax-free paperwork, and ensure all my purchases reach my hotel safely. Exceptional knowledge and service.",
    rating: 5
  },
  {
    name: "Lord Pemberton",
    role: "Art & Antique Collector",
    content: "For acquiring artwork and antiques across London's galleries and auction houses, their secure transport and discretion are invaluable. They understand the sensitivity of high-value acquisitions and provide appropriate confidential service.",
    rating: 5
  }
];

const shoppingCaseStudies = [
  {
    title: "International Fashion Week Shopping",
    challenge: "Middle Eastern royalty required comprehensive London shopping tour during Fashion Week including private showings at 15 haute couture boutiques, jewelry viewings, and artwork acquisitions. Complex scheduling with VIP appointments and high-value purchases requiring secure transport.",
    solution: "Provided dedicated luxury vehicle with secure storage, coordinated with personal shopping team and boutique managers, arranged private after-hours viewings, and implemented secure transport protocols for purchases totaling over £500,000.",
    result: "Successful week-long shopping experience with all appointments met punctually despite Fashion Week congestion. Secure transport of all purchases to private jet for international departure. Client rebooks annually for London shopping tours."
  },
  {
    title: "Luxury Wedding Shopping Experience",
    challenge: "Bride-to-be required comprehensive wedding shopping including dress fittings at multiple couture houses, jewelry selection, and wedding party coordination. Tight schedule over three days with emotional significance requiring perfect execution and discretion.",
    solution: "Coordinated transport between haute couture ateliers, jewelry houses, and specialty boutiques, provided comfortable waiting areas during fittings, arranged secure storage for delicate items, and coordinated with wedding planner for seamless scheduling.",
    result: "Perfect wedding shopping experience with all items acquired on schedule. Bride praised the stress-free experience and attention to detail. Extended service to wedding day coordination and honeymoon departure transport."
  }
];

const shoppingPricing = [
  {
    title: "Shopping Tour Basic",
    description: "Half-day luxury shopping experience",
    startingPrice: "£250/4 hours",
    features: [
      "Luxury vehicle with secure storage",
      "Professional shopping-experienced driver",
      "Multiple store coordination",
      "Central London coverage",
      "Purchase handling included",
      "Personal shopper coordination"
    ]
  },
  {
    title: "Premium Shopping Day",
    description: "Full-day luxury shopping service",
    startingPrice: "£450/8 hours",
    features: [
      "Mercedes S-Class or Bentley",
      "Expert shopping district knowledge",
      "VIP boutique coordination",
      "Secure high-value transport",
      "Refreshments included",
      "Extended Greater London coverage"
    ]
  },
  {
    title: "Luxury Shopping Experience",
    description: "Multi-day shopping concierge service",
    startingPrice: "£800/day",
    features: [
      "Dedicated luxury vehicle",
      "Personal shopping coordination",
      "Private appointment arrangement",
      "International purchase coordination",
      "Hotel delivery service",
      "Airport/departure transport"
    ]
  }
];

const shoppingFaqs = [
  {
    question: "Do you coordinate with personal shoppers and stylists?",
    answer: "Yes, we work closely with personal shoppers, stylists, and boutique managers to coordinate appointments, timing, and special arrangements. We understand the luxury retail environment and can facilitate smooth coordination with your existing shopping team."
  },
  {
    question: "How do you handle valuable purchases securely?",
    answer: "Our vehicles are equipped with secure storage areas, and our drivers are trained in handling high-value items. We provide discrete purchase transport, can coordinate with store security for valuable items, and ensure safe delivery to your destination."
  },
  {
    question: "Can you arrange private showings and after-hours appointments?",
    answer: "Through our relationships with luxury retailers, we can often arrange private showings and after-hours appointments. While we cannot guarantee these services, our connections in the luxury retail sector often enable special arrangements for valued clients."
  },
  {
    question: "Do you provide shopping services outside central London?",
    answer: "Yes, we cover shopping destinations throughout Greater London and can arrange trips to outlet villages, specialty markets, and exclusive retailers outside the central shopping districts. We're familiar with premium shopping locations across the London area."
  },
  {
    question: "How do you handle international tax-free shopping?",
    answer: "Our drivers are experienced with tax-free shopping procedures and can coordinate with store staff for VAT refund paperwork. We can also arrange for purchases to be delivered directly to airports for international departure, streamlining the tax-free process."
  },
  {
    question: "Can you provide shopping tours for groups?",
    answer: "Absolutely. We can coordinate shopping experiences for groups including luxury MPVs for larger parties, coordinate multiple vehicles for shopping groups, and arrange group shopping tours with synchronized timing and meeting points throughout the day."
  }
];

const seoKeywords = [
  "luxury shopping transport London",
  "personal shopping chauffeur",
  "Bond Street shopping service",
  "Knightsbridge shopping transport",
  "luxury retail chauffeur",
  "shopping tour London",
  "VIP shopping service",
  "boutique shopping transport",
  "luxury shopping experience",
  "designer shopping chauffeur"
];

export default function ShoppingPage() {
  return (
    <ServicePage
      title="Luxury Shopping & Personal Service"
      description="Professional shopping transport service for London's luxury retail districts. Expert coordination with personal shoppers, secure handling of valuable purchases, and seamless multi-store experiences in Bond Street, Knightsbridge, and Mayfair."
      heroImage="/images/services/shopping-hero.jpg"
      Icon={ShoppingBag}
      category="Shopping"
      features={shoppingFeatures}
      testimonials={shoppingTestimonials}
      caseStudies={shoppingCaseStudies}
      pricing={shoppingPricing}
      faqs={shoppingFaqs}
      seoKeywords={seoKeywords}
    />
  );
} 