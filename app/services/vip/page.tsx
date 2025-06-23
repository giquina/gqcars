import { Star, Shield, Car, Globe, Users, Clock, CheckCircle, Building2 } from 'lucide-react'
import ServiceHero from '@/app/components/ui/ServiceHero'
import Animate from '@/app/components/ui/Animate'
import ServicePage from "@/app/components/ui/ServicePage";
import { Crown } from "lucide-react";

export default function VIPServicesPage() {
  return (
    <ServicePage
      title="VIP & Event Transport"
      description="Secure, reliable, and discreet transportation for VIPs, celebrities, and high-profile events across London."
      heroImage="/images/services/vip-hero.jpg"
      Icon={Crown}
      category="VIP Events"
      features={vipFeatures}
    />
  );
}

const vipServices = [
  {
    title: "Personal Protection",
    description: "Dedicated close protection officers for individual security.",
    icon: Shield
  },
  {
    title: "Secure Transport",
    description: "Armored vehicles and trained security drivers.",
    icon: Car
  },
  {
    title: "International Security",
    description: "Global security coordination and travel protection.",
    icon: Globe
  },
  {
    title: "Event Security",
    description: "Comprehensive security for private and public events.",
    icon: Users
  },
  {
    title: "Residential Security",
    description: "24/7 property protection and access control.",
    icon: Building2
  },
  {
    title: "Rapid Response",
    description: "Rapid response and crisis management.",
    icon: Clock
  }
]

const clientTypes = [
  {
    title: "Executives",
    description: "Corporate leaders and business executives",
    icon: Building2
  },
  {
    title: "Celebrities",
    description: "Entertainment and sports personalities",
    icon: Star
  },
  {
    title: "Diplomats",
    description: "Government officials and diplomats",
    icon: Globe
  },
  {
    title: "Private Clients",
    description: "High-net-worth individuals and families",
    icon: Shield
  }
]

const features = [
  {
    title: "Personal Security",
    items: [
      "24/7 close protection coverage",
      "Advance security planning",
      "Route and venue assessment",
      "Threat analysis and mitigation",
      "Privacy protection measures",
      "Secure extraction protocols"
    ]
  },
  {
    title: "Travel Security",
    items: [
      "International security coordination",
      "Secure airport transfers",
      "Hotel security assessment",
      "Local security liaison",
      "Secure meeting arrangements",
      "Travel risk management"
    ]
  },
  {
    title: "Event Protection",
    items: [
      "Venue security assessment",
      "Access control systems",
      "VIP guest management",
      "Media management",
      "Rapid response teams",
      "Multi-agency coordination"
    ]
  },
  {
    title: "Technical Security",
    items: [
      "Counter-surveillance measures",
      "Communications security",
      "Cyber threat protection",
      "Asset tracking systems",
      "Security equipment deployment",
      "24/7 monitoring capabilities"
    ]
  }
]

const destinations = [
  {
    region: "Europe",
    locations: [
      "London & UK Cities",
      "Paris & French Riviera",
      "Monaco & Mediterranean",
      "Swiss Financial Centers",
      "Major EU Capitals"
    ]
  },
  {
    region: "Middle East",
    locations: [
      "Dubai & UAE",
      "Saudi Arabia",
      "Qatar & Bahrain",
      "Kuwait & Oman",
      "Regional Business Hubs"
    ]
  },
  {
    region: "Americas",
    locations: [
      "New York & East Coast",
      "Los Angeles & West Coast",
      "Miami & Florida",
      "Toronto & Vancouver",
      "Major Business Centers"
    ]
  }
]

const vehicles = [
  {
    model: "Mercedes-Maybach S680",
    category: "Ultra-Luxury Sedan",
    features: [
      "Armored protection available",
      "Extended wheelbase",
      "Premium interior",
      "Advanced security features",
      "Executive seating"
    ]
  },
  {
    model: "Range Rover SV",
    category: "Luxury SUV",
    features: [
      "Armored capability",
      "All-terrain performance",
      "Privacy configuration",
      "Enhanced security",
      "Command seating position"
    ]
  },
  {
    model: "BMW 7 Series Protection",
    category: "Armored Sedan",
    features: [
      "Ballistic protection",
      "Run-flat tires",
      "Secure communications",
      "Emergency systems",
      "Executive configuration"
    ]
  }
]

const vipFeatures = [
  {
    title: "Red Carpet & Gala Events",
    description: "Ensure a seamless and secure experience for your high-profile guests at premieres, awards nights, and charity galas."
  },
  {
    title: "Sporting & Music Events",
    description: "Navigate crowded venues with ease. We provide secure transport to major sporting events, concerts, and festivals."
  },
  {
    title: "Multi-Vehicle Coordination",
    description: "Our logistics team can manage complex itineraries involving multiple vehicles, guests, and destinations for large-scale events."
  },
  {
    title: "Artist & Performer Transport",
    description: "Secure and timely transport for artists, performers, and their entourage, ensuring they arrive at their engagements relaxed and ready."
  }
];