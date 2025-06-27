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

export default function AirportPage() {
  return (
    <ServicePage
      title="Secure Airport Transfers"
      description="Professional, punctual, and secure airport transfers with SIA-licensed drivers for complete peace of mind."
      heroImage="/images/services/airport-hero.jpg"
      Icon={Plane}
      category="Airport"
      features={airportFeatures}
      serviceKey="airport"
    />
  );
}
