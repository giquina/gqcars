import ServiceTemplate from '../../components/services/ServiceTemplate'
import { Shield } from 'lucide-react'

export default function FamilyProtectionPage() {
  const serviceData = {
    icon: <Shield className="w-12 h-12" />,
    image: "/images/family-protection.jpg",
    title: "Family Protection Services",
    subtitle: "Dedicated security solutions for families seeking comprehensive protection",
    description: "Our family protection services provide peace of mind for parents and guardians, offering professional security solutions that adapt to your family's lifestyle while maintaining the warmth and accessibility that family life requires.",
    
    features: [
      {
        icon: "👶",
        title: "Child Protection Services",
        description: "Specialized protection for children of all ages, including school runs, playdates, and extracurricular activities with trained child protection officers."
      },
      {
        icon: "🏠",
        title: "Residential Security",
        description: "Comprehensive home security including perimeter protection, access control, and 24/7 monitoring to keep your family safe at home."
      },
      {
        icon: "🚗",
        title: "Family Transportation",
        description: "Secure, reliable transportation for all family members with child-friendly vehicles and trained family chauffeurs."
      },
      {
        icon: "🎯",
        title: "Personal Protection Officers",
        description: "Discrete personal protection for family members during daily activities, shopping trips, and social engagements."
      },
      {
        icon: "🌍",
        title: "Family Travel Security",
        description: "Complete travel protection for family vacations and trips, including destination security briefings and local protection services."
      },
      {
        icon: "📱",
        title: "Digital Safety Education",
        description: "Cyber security awareness training for family members, including children's online safety and digital privacy protection."
      }
    ],

    benefits: [
      "Child-friendly security officers",
      "Flexible protection schedules",
      "Emergency family evacuation plans",
      "School and activity coordination",
      "Household staff security training",
      "Threat assessment and monitoring",
      "Family safety education programs",
      "Discrete surveillance when needed"
    ],

    process: [
      {
        step: "1",
        title: "Family Consultation",
        description: "We meet with your family to understand your specific needs, routines, and security concerns in a comfortable, family-friendly environment."
      },
      {
        step: "2",
        title: "Custom Protection Plan", 
        description: "Development of a tailored security strategy that integrates seamlessly with your family's lifestyle and activities."
      },
      {
        step: "3",
        title: "Team Introduction",
        description: "Careful introduction of our security team to all family members, ensuring comfort and trust, especially with children."
      },
      {
        step: "4",
        title: "Ongoing Family Security",
        description: "Continuous protection services that adapt as your family grows and your security needs evolve."
      }
    ],

    pricing: {
      title: "Family Protection Packages",
      subtitle: "Flexible security solutions designed around your family's needs and budget",
      packages: [
        {
          name: "Essential Family Care",
          price: "£5,000",
          period: "per month",
          features: [
            "Part-time family protection officer",
            "School run security",
            "Basic home security assessment",
            "Emergency response planning",
            "Child safety education",
            "Weekly security check-ins"
          ]
        },
        {
          name: "Complete Family Security",
          price: "£12,000",
          period: "per month", 
          features: [
            "Full-time family protection",
            "24/7 residential security",
            "Secure family transportation",
            "Activity protection services",
            "Digital safety training",
            "Vacation security planning",
            "Household security training"
          ],
          popular: true
        },
        {
          name: "Premium Family Shield",
          price: "£25,000",
          period: "per month",
          features: [
            "Multiple protection officers",
            "Advanced home security systems",
            "International travel protection",
            "Dedicated family security manager",
            "Counter-surveillance services",
            "Crisis management support",
            "Executive family coordination"
          ]
        }
      ]
    },

    testimonials: [
      {
        text: "Our children feel safe and secure, and we have complete peace of mind. The team has become like extended family to us.",
        author: "Sarah M., Mother of Three"
      },
      {
        text: "The protection is so discrete that our daily life continues normally, but we know we're always safe. Perfect for our active family lifestyle.",
        author: "David L., Family Principal"
      }
    ],

    cta: {
      title: "Secure Your Family's Safety Today",
      description: "Every family deserves to feel safe. Let us create a protection plan tailored to your family's unique needs.",
      primaryButton: "Get Family Protection Quote",
      secondaryButton: "Schedule Family Consultation"
    }
  }

  return <ServiceTemplate {...serviceData} />
}
