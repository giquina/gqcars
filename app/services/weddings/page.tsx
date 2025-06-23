import ServicePage from "@/app/components/ui/ServicePage";
import { Heart } from "lucide-react";

const weddingFeatures = [
  {
    title: "Bridal & Groom Transport",
    description: "Arrive in style and security. We provide immaculate luxury vehicles for the bride, groom, and bridal party, ensuring a grand and safe entrance."
  },
  {
    title: "Guest Transportation & Logistics",
    description: "Coordinate seamless transport for your guests between venues with our fleet of luxury cars and MPVs, all handled by professional drivers."
  },
  {
    title: "Discreet Security Presence",
    description: "Our SIA-licensed drivers provide a subtle yet effective layer of security, managing access, and ensuring the day proceeds without any unwanted interruptions."
  },
  {
    title: "Custom Ribbons & Decoration",
    description: "We can adorn our vehicles with ribbons and decorations to perfectly match your wedding's color scheme and theme."
  }
];

export default function WeddingsPage() {
  return (
    <ServicePage
      title="Secure Wedding Transport"
      description="Elegant, reliable, and secure transportation for your special day, ensuring peace of mind for you and your guests."
      heroImage="/images/services/wedding-hero.jpg"
      Icon={Heart}
      category="Weddings"
      features={weddingFeatures}
    />
  );
}