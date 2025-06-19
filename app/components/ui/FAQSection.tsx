'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

const faqs = [
  {
    question: "What areas do you cover for security services?",
    answer: "We provide security services across London and the UK. Our close protection officers are available 24/7 and can travel nationwide for VIP clients and special events."
  },
  {
    question: "Are all your drivers SIA licensed?",
    answer: "Yes, all our drivers and security personnel are fully SIA licensed and CPO trained. We maintain the highest standards of professional certification and continuous training."
  },
  {
    question: "How quickly can you provide emergency security?",
    answer: "We offer 24/7 emergency response. Our rapid deployment team can be mobilized within 30-60 minutes for urgent security requirements in London and surrounding areas."
  },
  {
    question: "What types of vehicles do you have available?",
    answer: "Our luxury fleet includes executive saloons, SUVs, and armored vehicles. All vehicles are maintained to the highest standards and equipped with advanced security features."
  },
  {
    question: "Do you provide security for corporate events?",
    answer: "Absolutely. We specialize in corporate event security, including conferences, product launches, and executive meetings. Our team can provide both visible and discrete security presence."
  },
  {
    question: "What's included in your close protection service?",
    answer: "Our close protection includes threat assessment, route planning, advance security, personal escort, residential security, and 24/7 monitoring. Each service is tailored to individual client needs."
  },
  {
    question: "How do I book your services?",
    answer: "You can book through our online form, call us directly at 07407 655 203, or contact us via WhatsApp. We provide immediate quotes and can arrange services at short notice."
  },
  {
    question: "Are your services insured?",
    answer: "Yes, we carry comprehensive insurance coverage including public liability and professional indemnity. All our services are fully insured and we're members of the BSIA."
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about our security services, booking process, and coverage areas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <ChevronDownIcon 
                  className={`w-5 h-5 text-amber-500 transition-transform duration-300 flex-shrink-0 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                openItems.includes(index) 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-300 leading-relaxed border-t border-slate-700 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+447407655203" 
              className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-amber-500/20 transform hover:scale-105 transition-all duration-300"
            >
              Call Us: 07407 655 203
            </a>
            <a 
              href="https://wa.me/447407655203" 
              className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300 border border-slate-700"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
