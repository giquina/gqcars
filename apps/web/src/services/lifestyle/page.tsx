import ServicePage from "@/app/components/ui/ServicePage";
import { Zap } from "lucide-react";

const lifestyleFeatures = [
  {
    title: "Nightlife & Private Clubs",
    description: "Secure and discreet transport to and from London's most exclusive private members' clubs, restaurants, and nightlife venues."
  },
  {
    title: "Social & Charity Events",
    description: "Arrive at galas, fundraisers, and high-profile social events with an appropriate and secure presence."
  },
  {
    title: "Discreet 'As-Directed' Service",
    description: "Your security driver is at your disposal, providing flexible, on-demand transport that adapts to your spontaneous social schedule."
  },
  {
    title: "Privacy as a Priority",
    description: "Our CPOs understand the London social scene and provide a service that respects your privacy and manages unwanted attention."
  }
];

const lifestyleTestimonials = [
  {
    name: "Lady Penelope Harrington",
    title: "Socialite & Art Patron",
    quote: "The discretion at high-society events is impeccable. My CPO blends seamlessly into gallery openings and charity galas while ensuring my safety. I can enjoy London's social scene without worry.",
    rating: 5
  },
  {
    name: "Alexander Montague",
    title: "Film Producer",
    quote: "London's nightlife can be unpredictable for public figures. GQ Cars' lifestyle team knows every venue and ensures I can enjoy private members' clubs without compromising security or privacy.",
    rating: 5
  },
  {
    name: "Sophia Kensington",
    title: "Fashion Designer",
    quote: "As someone constantly in the public eye, the 'as-directed' service is perfect for my spontaneous lifestyle. Whether it's last-minute dinner invitations or fashion week events, they adapt instantly.",
    rating: 5
  }
];

const lifestyleReviews = [
  {
    platform: "Luxury Lifestyle Review",
    rating: 5,
    text: "Perfect for London's social elite. The drivers understand the importance of maintaining privacy while ensuring safety at high-profile social events. Completely reliable for spontaneous lifestyle needs.",
    author: "Society Magazine Editor",
    date: "2 weeks ago"
  },
  {
    platform: "Private Members' Club Review",
    rating: 5,
    text: "Exceptional service for our members. The CPOs are well-versed in club etiquette and venue protocols. They provide security without disrupting the exclusive atmosphere our members expect.",
    author: "Club Concierge Manager",
    date: "3 weeks ago"
  }
];

const lifestyleCaseStudies = [
  {
    title: "London Fashion Week Celebrity Protection",
    client: "International Fashion Icon",
    challenge: "Navigate London Fashion Week events with heavy paparazzi presence while maintaining glamorous public image and attending multiple exclusive after-parties across the city.",
    solution: "Deployed lifestyle specialist CPOs with fashion industry knowledge, coordinated with venue security at all shows, and provided discrete protection during spontaneous social activities.",
    result: "Successfully attended all fashion shows and social events without security incidents. Maintained positive public image while ensuring complete personal safety throughout the week.",
    metrics: "12 fashion events, 8 after-parties, 0 security incidents, 100% positive media coverage"
  },
  {
    title: "Charity Gala Season Security Coordination",
    client: "Philanthropist & Society Figure",
    challenge: "Provide security during London's charity gala season with 15 high-profile events, each requiring different security protocols and social etiquette considerations.",
    solution: "Created comprehensive event security plans for each gala, coordinated with venue security teams, and provided adaptable protection that matched the formal social atmosphere.",
    result: "All 15 charity events attended successfully with substantial donations made. Zero security disruptions to fundraising activities. Positive social presence maintained throughout season.",
    metrics: "15 charity galas, £2.3M raised, 0 security disruptions, 100% successful event attendance"
  }
];

export default function LifestylePage() {
  return (
    <ServicePage
      title="Lifestyle & Social Event Transport"
      description="Secure, on-demand transport that keeps pace with your dynamic social life, from private clubs to high-profile events."
      heroImage="/images/services/lifestyle-hero.jpg"
      Icon={Zap}
      category="Lifestyle"
      features={lifestyleFeatures}
      testimonials={lifestyleTestimonials}
      reviews={lifestyleReviews}
      caseStudies={lifestyleCaseStudies}
    />
  );
} 