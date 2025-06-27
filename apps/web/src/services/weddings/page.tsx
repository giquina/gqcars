import ServicePage from "@/app/components/ui/ServicePage";
import { Heart } from "lucide-react";

const weddingFeatures = [
  {
    title: "Bridal & Groom Transport",
    description: "Luxurious, immaculate vehicles for the bride, groom, and bridal party. Choose from classic Rolls-Royce, modern Mercedes S-Class, or vintage Bentley options, all maintained to showroom condition with professional decoration coordination."
  },
  {
    title: "Guest Transportation Logistics",
    description: "Comprehensive guest transport coordination between venues with our luxury fleet. Experienced drivers manage timing, multiple pickup points, and guest comfort while maintaining the celebration atmosphere throughout the day."
  },
  {
    title: "Discreet Security Presence",
    description: "SIA-licensed drivers provide subtle yet effective security, managing venue access, unwanted intrusions, and emergency situations. Our team ensures your special day proceeds smoothly without any disruptions or safety concerns."
  },
  {
    title: "Custom Decoration & Styling",
    description: "Professional vehicle decoration matching your wedding theme and color scheme. Ribbon coordination, floral arrangements, and custom signage options available. We work with your wedding planner for perfect aesthetic integration."
  },
  {
    title: "Photography & Video Coordination",
    description: "Seamless coordination with your photography and videography teams. Our drivers understand wedding timeline requirements and can position vehicles for optimal shots, coordinate timing for key moments, and ensure transportation doesn't interfere with your special moments."
  },
  {
    title: "Emergency & Contingency Planning",
    description: "Comprehensive backup plans for weather, venue changes, or unexpected situations. Alternative routes, backup vehicles, and emergency coordination ensure your wedding day remains perfect regardless of circumstances."
  }
];

const weddingTestimonials = [
  {
    name: "Emily & James Patterson",
    role: "Wedding Clients, June 2024",
    content: "Our wedding day was absolutely perfect thanks to GQ Security. The Rolls-Royce was stunning, our driver was so professional and kind, and they coordinated everything seamlessly with our wedding planner. Couldn't have asked for better service!",
    rating: 5
  },
  {
    name: "Priya & David Singh",
    role: "Wedding Clients, September 2024",
    content: "With a 200-guest Indian wedding across three venues, logistics could have been a nightmare. GQ Security managed everything flawlessly - guest transport, family coordination, and perfect timing. Our families are still talking about the service!",
    rating: 5
  },
  {
    name: "Sophie Richardson",
    role: "Wedding Planner, Quintessentially Events",
    content: "I've worked with many transport companies, but GQ Security consistently delivers exceptional service. Their attention to detail, reliability, and ability to handle complex wedding logistics makes them my go-to choice for luxury weddings.",
    rating: 5
  }
];

const weddingCaseStudies = [
  {
    title: "Royal Wedding Style Celebration",
    challenge: "High-profile couple planning lavish 300-guest wedding at Windsor Great Park with significant media attention. Required secure, elegant transport for VIP guests, celebrity attendees, and complete privacy from paparazzi throughout the celebration.",
    solution: "Deployed 12-vehicle luxury convoy with security-trained drivers, established discrete access routes, coordinated with venue security, implemented media management protocols, and provided personal protection for key family members.",
    result: "Flawless wedding celebration with zero security incidents or media intrusions. All 300 guests transported safely and elegantly. Wedding featured in Tatler magazine as 'Wedding of the Year' with specific praise for transport coordination."
  },
  {
    title: "International Destination Wedding",
    challenge: "British couple hosting wedding in Tuscany required transport coordination for 150 international guests, including elderly relatives and children. Complex logistics involving multiple airports, hotels, and venue transfers over 3-day celebration.",
    solution: "Partnered with Italian security specialists, provided advance reconnaissance, arranged luxury coach transport, coordinated with hotels and venues, and maintained UK operations support throughout the celebration weekend.",
    result: "Successful 3-day celebration with all guests transported safely and comfortably. Zero delays or logistics issues despite complex international coordination. Couple extended contract for annual anniversary celebrations in Italy."
  }
];

const weddingPricing = [
  {
    title: "Bridal Car Package",
    description: "Luxury transport for bride and immediate family",
    startingPrice: "£450",
    features: [
      "Rolls-Royce or Mercedes S-Class",
      "Professional chauffeur",
      "Wedding decoration included",
      "4-hour service window",
      "Refreshments and styling",
      "Photography coordination"
    ]
  },
  {
    title: "Wedding Party Package",
    description: "Comprehensive transport for wedding party",
    startingPrice: "£1,200",
    features: [
      "Multiple luxury vehicles",
      "Bridal party coordination",
      "Guest transport logistics",
      "Professional team management",
      "8-hour service coverage",
      "Emergency backup vehicles"
    ]
  },
  {
    title: "Luxury Wedding Experience",
    description: "Premium full-service wedding transport",
    startingPrice: "£2,500",
    features: [
      "Fleet of premium vehicles",
      "Dedicated wedding coordinator",
      "Multi-venue logistics",
      "VIP guest transport",
      "Security and privacy protection",
      "Full weekend coverage"
    ]
  }
];

const weddingFaqs = [
  {
    question: "How far in advance should we book wedding transport?",
    answer: "We recommend booking 6-12 months in advance, especially for peak wedding season (May-September) and weekends. This ensures vehicle availability and allows time for decoration coordination with your wedding planner. Last-minute bookings are possible but subject to availability."
  },
  {
    question: "Can you match our wedding theme and colors?",
    answer: "Absolutely! We work closely with your wedding planner to coordinate decorations, ribbons, and styling that perfectly match your theme. We can provide custom signage, floral arrangements, and color-coordinated decorations for a seamless aesthetic integration."
  },
  {
    question: "What happens if weather affects our outdoor ceremony?",
    answer: "We maintain comprehensive contingency plans for weather-related changes. Our vehicles are equipped for all weather conditions, and we coordinate alternative routes and timing adjustments. We also provide umbrella service and weather protection for guest comfort."
  },
  {
    question: "Do you coordinate with our photographer and videographer?",
    answer: "Yes, we work closely with your photography and videography teams. Our drivers understand wedding timeline requirements and can position vehicles for optimal shots, coordinate timing for key moments, and ensure transportation doesn't interfere with your special moments."
  },
  {
    question: "Can you handle transport for international guests?",
    answer: "Certainly! We coordinate airport pickups, hotel transfers, and venue transport for international guests. We can provide multilingual drivers when needed and coordinate with your wedding planner to ensure seamless guest experience from arrival to departure."
  },
  {
    question: "What security measures do you provide for high-profile weddings?",
    answer: "For high-profile celebrations, we provide SIA-licensed security drivers, discrete venue access management, media management protocols, and coordination with venue security. We can also arrange close protection officers and implement comprehensive security planning when required."
  }
];

const seoKeywords = [
  "wedding car hire London",
  "luxury wedding transport",
  "Rolls Royce wedding car",
  "wedding chauffeur service",
  "bridal car hire",
  "wedding day transport",
  "luxury wedding cars London",
  "wedding party transport",
  "elegant wedding cars",
  "professional wedding drivers"
];

export default function WeddingsPage() {
  return (
    <ServicePage
      title="Luxury Wedding Transport"
      description="Elegant, reliable, and secure transportation for your special day. Professional wedding car hire with luxury vehicles, expert coordination, and personalized service to make your wedding day perfect and stress-free."
      heroImage="/images/services/wedding-hero.jpg"
      Icon={Heart}
      category="Weddings"
      features={weddingFeatures}
      testimonials={weddingTestimonials}
      caseStudies={weddingCaseStudies}
      pricing={weddingPricing}
      faqs={weddingFaqs}
      seoKeywords={seoKeywords}
    />
  );
}