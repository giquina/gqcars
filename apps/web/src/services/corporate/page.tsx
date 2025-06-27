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

export default function CorporatePage() {
  return (
    <ServicePage
      title="Corporate & Executive Transport"
      description="Reliable, secure, and professional transport solutions for businesses, executives, and corporate events across London."
      heroImage="/images/services/corporate-hero.jpg"
      Icon={Briefcase}
      category="Corporate"
      features={corporateFeatures}
      serviceKey="corporate"
    />
  );
}