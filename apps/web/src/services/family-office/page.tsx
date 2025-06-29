import ServicePage from "@/components/ui/ServicePage";
import { Users } from "lucide-react";

const familyOfficeFeatures = [
  {
    title: "Dedicated Security Liaison",
    description: "A single point of contact from our senior team to coordinate all your family's security and transport needs, ensuring seamless communication."
  },
  {
    title: "Total Discretion & Confidentiality",
    description: "Our CPOs operate under the strictest NDAs. We provide a covert layer of security that protects your family's privacy and public profile."
  },
  {
    title: "Child-Centric Protection",
    description: "Our family-specialist CPOs are trained in child protection, secure school runs, and maintaining a friendly yet vigilant presence around children."
  },
  {
    title: "Integrated Residential & Travel Security",
    description: "We work with your residential security team to provide a holistic, 24/7 protection strategy that covers home, travel, and daily activities."
  }
];

export default function FamilyOfficePage() {
  return (
    <ServicePage
      title="Family Office Security Services"
      description="Comprehensive, discreet, and reliable security transport solutions for high-net-worth families, coordinated through a single, dedicated point of contact."
      heroImage="/images/services/family-hero.jpg"
      Icon={Users}
      category="Family Office"
      features={familyOfficeFeatures}
    />
  );
}
