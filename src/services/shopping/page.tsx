import ServicePage from "@/components/ui/ServicePage";
import { ShoppingBag } from "lucide-react";

const shoppingFeatures = [
  {
    title: "Luxury Shopping Destinations",
    description: "Expert navigation to London's premier shopping districts, including Bond Street, Sloane Street, Harrods, and bespoke artisan workshops."
  },
  {
    title: "Secure & Discreet Service",
    description: "Your SIA-licensed driver provides a low-profile security presence, safeguarding you and your purchases discreetly."
  },
  {
    title: "Hands-Free Shopping",
    description: "Enjoy your day without being burdened by bags. Your driver will securely store all purchases in the vehicle for you."
  },
  {
    title: "As-Directed Hourly Service",
    description: "Book a driver for a set number of hours. They will be at your complete disposal for multiple stops and itinerary changes."
  }
];

export default function ShoppingPage() {
  return (
    <ServicePage
      title="Secure Shopping Excursions"
      description="Enjoy a day of luxury retail therapy in London with a professional security driver at your service."
      heroImage="/images/services/shopping-hero.jpg"
      Icon={ShoppingBag}
      category="Shopping"
      features={shoppingFeatures}
    />
  );
} 