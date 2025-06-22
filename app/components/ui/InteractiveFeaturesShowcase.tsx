import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Mic, MapPin } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <MessageCircle className="w-8 h-8 text-blue-400" />,
    title: 'Instant Support',
    description: '24/7 chat with our AI-powered assistant or human support team.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
    title: 'Smart Quotes',
    description: 'Get transparent, upfront pricing in seconds with our intelligent quoting system.',
  },
  {
    icon: <Mic className="w-8 h-8 text-purple-400" />,
    title: 'Voice Booking',
    description: 'Book your ride hands-free using simple voice commands.',
  },
  {
    icon: <MapPin className="w-8 h-8 text-green-400" />,
    title: 'Location Services',
    description: 'Real-time tracking, smart routing, and location-based alerts.',
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  return (
    <motion.div
      className="bg-gray-800/50 rounded-2xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/80 border border-gray-700 hover:border-yellow-500/50"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        ...cardVariants,
        onscreen: {
          ...cardVariants.onscreen,
          transition: {
            ...cardVariants.onscreen.transition,
            delay: index * 0.2,
          },
        },
      }}
    >
      <motion.div
        className="mb-4"
        whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.5 } }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400 text-sm">{feature.description}</p>
    </motion.div>
  );
};

export default function InteractiveFeaturesShowcase() {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Experience the <span className="text-yellow-500">GQ Difference</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our intelligent platform is designed to make your journey safer, smoother, and more efficient from start to finish.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
} 