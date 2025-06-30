import ServicePage from "@/components/ui/ServicePage";
import { Shield } from "lucide-react";

const diplomaticFeatures = [
  {
    title: "Government-Cleared CPOs",
    description: "All drivers are SIA licensed and have undergone extensive background checks to receive government security clearance for handling sensitive assignments."
  },
  {
    title: "Diplomatic Etiquette & Protocol",
    description: "Our team is trained in diplomatic protocols, ensuring seamless and appropriate interactions during official state visits, embassy transport, and high-stakes meetings."
  },
  {
    title: "Armored & Luxury Fleet",
    description: "Choose from our fleet of armored, non-armored, and luxury vehicles (e.g., Mercedes S-Class, BMW 7 Series) to meet specific security and comfort requirements."
  },
  {
    title: "Police & Embassy Liaison",
    description: "We maintain established relationships with law enforcement and embassy security details to ensure fully coordinated and secure movements."
  }
];

export default function DiplomaticPage() {
  return (
    <ServicePage
      title="Diplomatic & Government Transport"
      description="Providing secure, discreet, and reliable transport for government officials, diplomats, and state delegations with the highest level of protocol and professionalism."
      heroImage="/images/services/diplomatic-hero.jpg"
      Icon={Shield}
      category="Diplomatic"
      features={diplomaticFeatures}
    />
  );
} 