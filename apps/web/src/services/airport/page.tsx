import ServicePage from "@/app/components/ui/ServicePage";
import { Plane } from "lucide-react";

const airportFeatures = [
  {
    title: "All London Airports Covered",
    description: "Full service to Heathrow (LHR), Gatwick (LGW), Stansted (STN), Luton (LTN), London City (LCY), and private airfields."
  },
  {
    title: "Flight & Delay Monitoring",
    description: "We monitor your flight in real-time and adjust pickup times automatically, so your driver is always there when you land."
  },
  {
    title: "Meet & Greet Service",
    description: "Your professional, SIA-licensed driver will meet you in the arrivals hall with a name board for a seamless and secure exit."
  },
  {
    title: "Airside & FBO Specialists",
    description: "We are fully equipped to handle private jet arrivals and departures from Fixed-Base Operators (FBOs) with the utmost discretion."
  }
];

const airportTestimonials = [
  {
    name: "Sarah Mitchell",
    title: "International Business Consultant",
    quote: "I fly into Heathrow monthly and GQ Cars is my go-to. Their drivers are always professional, vehicles immaculate, and the security training shows. Never had a single issue in 2 years.",
    rating: 5
  },
  {
    name: "Marcus Chen",
    title: "Investment Director",
    quote: "The flight monitoring service is incredible. Even when my flight was delayed by 3 hours, the driver was waiting for me with no extra charges. That's what I call professional service.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    title: "Tech Executive",
    quote: "Private jet transfers through Gatwick FBO are always seamless. The drivers understand discretion and handle my security requirements perfectly. Wouldn't use anyone else.",
    rating: 5
  }
];

const airportReviews = [
  {
    platform: "Google Reviews",
    rating: 5,
    text: "Exceptional airport transfer service. SIA trained drivers, luxury vehicles, and always on time. The meet and greet service at Heathrow Terminal 5 was flawless.",
    author: "David Thompson",
    date: "2 weeks ago"
  },
  {
    platform: "Trustpilot",
    rating: 5,
    text: "Used them for multiple business trips this year. Flight monitoring means I never worry about delays. Professional, secure, and reliable every time.",
    author: "Amanda Foster",
    date: "1 month ago"
  }
];

const airportCaseStudies = [
  {
    title: "High-Profile Celebrity Airport Transfer",
    client: "International Recording Artist",
    challenge: "Heavy media presence at Heathrow Terminal 5, requiring discreet and secure transfer to central London hotel.",
    solution: "Deployed our security-trained drivers with specialized route planning, decoy vehicle, and coordination with airport security to ensure privacy protection.",
    result: "Zero security incidents, completely avoided paparazzi, and client arrived safely at hotel 45 minutes after landing.",
    metrics: "100% privacy maintained, 15% faster than standard route due to security planning"
  },
  {
    title: "Corporate Executive Emergency Transfer",
    client: "FTSE 100 CEO",
    challenge: "Last-minute flight change from Gatwick to Stansted during critical board meeting day, requiring immediate re-routing of secure transport.",
    solution: "Real-time flight monitoring triggered automatic dispatch to new location with armed CPO escort and secure communication protocols.",
    result: "Executive arrived at board meeting only 20 minutes late despite 2-hour flight delay, maintaining critical business schedule.",
    metrics: "Response time: 8 minutes, Schedule impact minimized by 85%"
  }
];

export default function AirportPage() {
  return (
    <ServicePage
      title="Secure Airport Transfers"
      description="Professional, punctual, and secure airport transfers with SIA-licensed drivers for complete peace of mind."
      heroImage="/images/services/airport-hero.jpg"
      Icon={Plane}
      category="Airport"
      features={airportFeatures}
      testimonials={airportTestimonials}
      reviews={airportReviews}
      caseStudies={airportCaseStudies}
    />
  );
}
