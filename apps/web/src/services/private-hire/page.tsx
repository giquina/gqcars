import ServicePage from "@/components/ui/ServicePage";
import { Car } from "lucide-react";

const privateHireFeatures = [
  {
    title: "Pre-Booked & Punctual",
    description: "Schedule your journeys in advance and rest assured your SIA-licensed driver will arrive on time, every time."
  },
  {
    title: "Discreet & Professional",
    description: "Our drivers provide a low-profile, professional service, ensuring your privacy and comfort on every trip."
  },
  {
    title: "Flexible Hourly & Daily Rates",
    description: "Book a driver for a few hours, a full day, or longer. Perfect for multi-stop itineraries, shopping trips, or business meetings."
  },
  {
    title: "A-to-B & As-Directed Journeys",
    description: "Whether you need a simple transfer or a driver at your disposal, our private hire service is flexible to your needs."
  }
];

export default function PrivateHirePage() {
  return (
    <ServicePage
      title="Secure Private Hire"
      description="Reliable, pre-booked car services with professional, SIA-licensed security drivers for any occasion."
      heroImage="/images/services/private-hire-hero.jpg"
      Icon={Car}
      category="Private Hire"
      features={privateHireFeatures}
    />
  );
}