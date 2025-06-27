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

export default function CloseProtectionPage() {
  return (
    <ServicePage
      title="Close Protection Services"
      description="Personalized security solutions delivered by elite, SIA-licensed Close Protection Officers for high-net-worth individuals, executives, and families."
      heroImage="/images/services/protection-hero.jpg"
      Icon={Shield}
      category="Protection"
      features={protectionFeatures}
      serviceKey="close-protection"
    />
  );
}