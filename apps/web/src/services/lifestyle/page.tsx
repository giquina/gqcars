import ServicePage from "@/components/ui/ServicePage";
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

export default function LifestylePage() {
  return (
    <ServicePage
      title="Lifestyle & Social Event Transport"
      description="Secure, on-demand transport that keeps pace with your dynamic social life, from private clubs to high-profile events."
      heroImage="/images/services/lifestyle-hero.jpg"
      Icon={Zap}
      category="Lifestyle"
      features={lifestyleFeatures}
    />
  );
} 