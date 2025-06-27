import ServicePage from "@/app/components/ui/ServicePage";
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

const familyOfficeTestimonials = [
  {
    name: "Lady Victoria Ashworth",
    title: "Family Principal",
    quote: "GQ Cars has protected our family for 4 years with absolute discretion. Their child protection specialists make school runs feel natural while maintaining security. My children barely notice the protection - which is exactly what we wanted.",
    rating: 5
  },
  {
    name: "Robert Sterling III",
    title: "Family Office Principal",
    quote: "The integrated approach with our residential security is seamless. One point of contact coordinates everything - from daily movements to international travel. The confidentiality agreements give us complete peace of mind.",
    rating: 5
  },
  {
    name: "Mrs. Charlotte De Vere",
    title: "Philanthropist",
    quote: "Managing a high-profile family requires sophisticated security that doesn't intrude on our lifestyle. GQ Cars' team understands this balance perfectly. Professional, invisible when needed, protective always.",
    rating: 5
  }
];

const familyOfficeReviews = [
  {
    platform: "Private Client Review",
    rating: 5,
    text: "Exceptional family protection services. The child-focused security training shows in every interaction. Our children feel safe and comfortable while maintaining complete protection during all activities.",
    author: "Family Office Manager",
    date: "2 weeks ago"
  },
  {
    platform: "Ultra-High-Net-Worth Review",
    rating: 5,
    text: "The most professional family security service in London. Integration with existing security systems is flawless and the discretion level is exactly what our family requires.",
    author: "Anonymous Family Principal",
    date: "1 month ago"
  }
];

const familyOfficeCaseStudies = [
  {
    title: "Multi-Generational Family Protection",
    client: "European Banking Dynasty",
    challenge: "Coordinating security for 3-generation family across multiple London residences, including elderly grandparents, busy parents, and school-age children with different security needs.",
    solution: "Deployed specialized CPO teams for each family unit: geriatric care trained for grandparents, executive protection for parents, and child-specialist officers for school-age children with integrated coordination.",
    result: "18 months of seamless family protection with zero security incidents. Children maintained normal social activities while grandparents received age-appropriate dignified protection.",
    metrics: "3 generations protected, 18 months continuous coverage, 0 incidents, 100% family satisfaction"
  },
  {
    title: "International Family Relocation Security",
    client: "Tech Entrepreneur Family",
    challenge: "Secure relocation of family from Silicon Valley to London, including sensitive asset transfer, children's school transition, and maintaining protection during vulnerability period.",
    solution: "Coordinated international security handover with US-based teams, advance security preparation for London residences, school security liaison, and 24/7 protection during transition period.",
    result: "Family safely relocated with zero security compromises. Children integrated into new schools without incident. All assets transferred securely with no privacy breaches.",
    metrics: "2 continents coordinated, 6-week transition period, 4 family members protected, 100% successful relocation"
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
      testimonials={familyOfficeTestimonials}
      reviews={familyOfficeReviews}
      caseStudies={familyOfficeCaseStudies}
    />
  );
}
