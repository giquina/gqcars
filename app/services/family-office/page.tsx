import ServiceTemplate from '../../components/services/ServiceTemplate'
import { Shield } from 'lucide-react'

export default function FamilyOfficePage() {
  const serviceData = {
    icon: <Shield className="w-12 h-12" />,
    image: "/images/family-office.jpg",
    title: "Family Office Security Services",
    subtitle: "Comprehensive protection for ultra-high-net-worth families and their assets",
    description: "Our family office division provides discreet, sophisticated security solutions tailored to the unique needs of wealthy families, ensuring the safety of family members, staff, and valuable assets across multiple locations.",
    
    features: [
      {
        icon: "👨‍👩‍👧‍👦",
        title: "Family Protection Programs",
        description: "Comprehensive security protocols covering all family members, from children to elderly relatives, with age-appropriate protection strategies."
      },
      {
        icon: "🏛️",
        title: "Multi-Residence Security",
        description: "Coordinated security across primary residences, vacation homes, and international properties with seamless protection transitions."
      },
      {
        icon: "🎓",
        title: "Educational Institution Liaison",
        description: "Specialized protection for children at schools and universities, including discrete campus security and transportation coordination."
      },
      {
        icon: "✈️",
        title: "Travel Security Management",
        description: "End-to-end protection for family travel, including advance security assessments, secure transportation, and destination threat analysis."
      },
      {
        icon: "🏆",
        title: "Event & Social Protection",
        description: "Discrete security for social events, charity galas, and family celebrations, maintaining privacy while ensuring safety."
      },
      {
        icon: "💼",
        title: "Executive Family Protection",
        description: "Integrated security for business executives and their families, covering both professional and personal environments."
      }
    ],

    benefits: [
      "24/7 family security operations center",
      "Threat assessment and intelligence monitoring",
      "Secure transportation fleet management",
      "Emergency response and evacuation planning",
      "Staff vetting and household security",
      "Cyber security and digital privacy protection",
      "Coordinated international protection services",
      "Discrete surveillance and counter-surveillance"
    ],

    process: [
      {
        step: "1",
        title: "Family Security Assessment",
        description: "Comprehensive evaluation of all family members, properties, and lifestyle patterns to identify potential security risks and vulnerabilities."
      },
      {
        step: "2", 
        title: "Tailored Protection Plan",
        description: "Development of a customized security strategy addressing each family member's specific needs, schedules, and risk profiles."
      },
      {
        step: "3",
        title: "Implementation & Coordination",
        description: "Deployment of security teams, technology systems, and protocols across all family locations and activities."
      },
      {
        step: "4",
        title: "Ongoing Management",
        description: "Continuous monitoring, regular security reviews, and adaptive protection strategies as family needs evolve."
      }
    ],

    pricing: {
      title: "Family Office Security Investment",
      subtitle: "Bespoke protection packages tailored to your family's unique requirements",
      packages: [
        {
          name: "Essential Family Protection",
          price: "£15,000",
          period: "per month",
          features: [
            "24/7 family operations center",
            "Primary residence security",
            "Secure family transportation",
            "Basic threat monitoring",
            "Emergency response planning",
            "Staff background checks"
          ]
        },
        {
          name: "Comprehensive Family Security",
          price: "£35,000", 
          period: "per month",
          features: [
            "Multi-location protection",
            "International travel security",
            "Advanced threat intelligence",
            "Cyber security monitoring", 
            "Event security planning",
            "Educational liaison services",
            "Evacuation procedures"
          ],
          popular: true
        },
        {
          name: "Ultra-Premium Protection",
          price: "Custom Quote",
          period: "tailored to family",
          features: [
            "Global protection network",
            "Dedicated security teams",
            "Advanced technology integration",
            "Counter-surveillance operations",
            "Crisis management specialists",
            "Government liaison services",
            "Bespoke security solutions"
          ]
        }
      ]
    },

    testimonials: [
      {
        text: "GQ Security transformed our family's safety approach. Their discrete, professional service gives us peace of mind across all our properties and activities.",
        author: "Anonymous Family Office Principal"
      },
      {
        text: "The team's understanding of our complex family dynamics and international lifestyle is exceptional. They've become an integral part of our family's security infrastructure.",
        author: "Ultra-High-Net-Worth Family"
      }
    ],

    cta: {
      title: "Protect Your Family's Legacy",
      description: "Schedule a confidential consultation to discuss your family's unique security requirements.",
      primaryButton: "Request Family Security Consultation",
      secondaryButton: "Download Family Protection Guide"
    }
  }

  return <ServiceTemplate {...serviceData} />
}
