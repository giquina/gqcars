"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Star, MessageSquare, Briefcase, CheckCircle, X, RadioTower } from 'lucide-react'
import Link from 'next/link'
import { SERVICES_CONFIG } from '@/lib/services-config'

const names = [
  // English
  'James', 'Emma', 'Liam', 'Olivia', 
  // Arabic / Muslim
  'Mohammed', 'Fatima', 'Ahmed', 'Aisha',
  // Brazilian / Portuguese
  'Lucas', 'Júlia', 'Pedro', 'Sofia',
  // Jewish
  'David', 'Sarah', 'Noah', 'Leah',
  // Chinese
  'Wei', 'Li', 'Jing', 'Wang',
  // French
  'Louis', 'Camille', 'Jules', 'Chloé'
];
const locations = ['Heathrow', 'Westminster', 'Mayfair', 'The City', 'Canary Wharf', 'Soho', 'Knightsbridge'];
const activityVerbs = ['booked', 'inquired about'];

const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  if (seconds < 10) return "just now";
  return Math.floor(seconds) + "s ago";
};

const generateRandomActivity = (isInitial: boolean = false, existingNames: string[] = []) => {
  let name = getRandomItem(names);
  // Ensure the name is unique among the currently displayed activities
  while (existingNames.includes(name)) {
    name = getRandomItem(names);
  }

  const service = getRandomItem(SERVICES_CONFIG);
  const location = getRandomItem(locations);
  const isReview = Math.random() > 0.65; // a bit more reviews
  
  const timestamp = isInitial
    ? new Date(Date.now() - Math.random() * 8 * 60000) // 0-8 minutes ago
    : new Date();

  const activityBase = {
    id: Date.now() + Math.random(),
    name,
    location,
    href: `/services/${service.id}`,
    timestamp
  };

  if (isReview) {
    const rating = (Math.random() * (5.0 - 4.2) + 4.2);
    return {
      ...activityBase,
      type: 'review' as const,
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      text: `left a ${rating.toFixed(1)}-star review for ${service.name}`,
      rating,
    };
  }
  
  const verb = getRandomItem(activityVerbs);
  const type = verb === 'booked' ? 'booking' as const : 'inquiry' as const;

  return {
    ...activityBase,
    type,
    icon: type === 'booking' ? <Briefcase className="w-5 h-5 text-blue-400" /> : <MessageSquare className="w-5 h-5 text-green-400" />,
    text: `${verb} ${service.name}`,
  };
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const starArray = [];
  for (let i = 0; i < fullStars; i++) {
    starArray.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />);
  }
  if (halfStar) {
    starArray.push(<Star key="half" className="w-4 h-4 text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
  }
  return <div className="flex items-center">{starArray}</div>;
};

type Activity = ReturnType<typeof generateRandomActivity>;

const UserAvatar = ({ name }: { name: string }) => {
    const initial = name.charAt(0).toUpperCase();
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500'];
    const color = colors[name.charCodeAt(0) % colors.length];

    return (
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 border-2 border-white/30`}>
            {initial}
        </div>
    )
}

const LiveActivityDashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const [, setForceUpdate] = useState(0);

  const scheduleNextActivity = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    
    const randomInterval = Math.random() * (60000 - 20000) + 20000; // 20 to 60 seconds
    
    timeoutIdRef.current = setTimeout(() => {
      setActivities(prev => {
        const existingNames = prev.map(a => a.name);
        const newActivity = generateRandomActivity(false, existingNames);
        const updatedActivities = [newActivity, ...prev].slice(0, 3); // Max 3 items
        return updatedActivities;
      });
      scheduleNextActivity();
    }, randomInterval);
  };

  useEffect(() => {
    // Pre-populate with unique activities
    const initialActivities: Activity[] = [];
    const usedNames: string[] = [];
    for (let i = 0; i < 3; i++) {
        const newActivity = generateRandomActivity(true, usedNames);
        usedNames.push(newActivity.name);
        initialActivities.push(newActivity);
    }
    setActivities(initialActivities);
    
    scheduleNextActivity();
    
    // Force re-render every 30 seconds to update timestamps
    const updateInterval = setInterval(() => {
      setForceUpdate(prev => prev + 1);
    }, 30000);

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      clearInterval(updateInterval);
    };
  }, []);
  
  const getBorderColor = (type: Activity['type']) => {
    switch(type) {
      case 'booking': return 'hover:shadow-blue-500/50';
      case 'inquiry': return 'hover:shadow-green-500/50';
      case 'review': return 'hover:shadow-yellow-500/50';
      default: return 'hover:shadow-gray-500/50';
    }
  }

  const getGlowEffect = (type: Activity['type']) => {
    switch(type) {
      case 'booking': return 'shadow-[0_0_35px_-5px_theme(colors.blue.900/0.7)]';
      case 'inquiry': return 'shadow-[0_0_35px_-5px_theme(colors.green.900/0.7)]';
      case 'review': return 'shadow-[0_0_35px_-5px_theme(colors.yellow.800/0.7)]';
      default: return 'shadow-[0_0_35px_-5px_theme(colors.gray.800/0.7)]';
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <motion.button
          onClick={() => setIsMinimized(false)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-14 h-14 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
          <RadioTower className="w-7 h-7" />
        </motion.button>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed bottom-4 left-4 z-50 w-full max-w-sm"
    >
      <div className="bg-gradient-to-tr from-black/70 via-gray-900/60 to-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-white/10 bg-black/30">
            <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                <h3 className="font-bold text-white text-sm">Live Activity</h3>
            </div>
            <button
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Minimize feed"
            >
                <X size={18} />
            </button>
          </div>

        {/* Activity List */}
        <div className="max-h-[50vh] overflow-y-auto p-3 custom-scrollbar">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <Link key={activity.id} href={activity.href} passHref>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.5 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="mb-3 cursor-pointer group"
                >
                  <div className={`relative overflow-hidden bg-gradient-to-tr from-gray-900/80 via-black/70 to-gray-900/80 backdrop-blur-lg border border-white/10 rounded-xl p-3 shadow-xl text-white transition-all duration-300 group-hover:shadow-2xl ${getBorderColor(activity.type)}`}>
                      <div className={`absolute -inset-24 -z-10 blur-3xl transition-opacity duration-500 ${getGlowEffect(activity.type)} ${index === 0 ? 'opacity-25' : 'opacity-0 group-hover:opacity-10'}`}></div>
                      <div className="flex items-start space-x-4">
                          <UserAvatar name={activity.name} />
                          <div className="flex-1 overflow-hidden">
                              <motion.p 
                                key={activity.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="font-semibold text-sm leading-tight text-gray-100"
                              >
                                <span className="font-bold text-white">{activity.name}</span> {activity.text}
                              </motion.p>
                              <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1.5" />
                                  <span className="truncate">{activity.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1.5" />
                                  <span>{timeSince(activity.timestamp)}</span>
            </div>
          </div>
                              {activity.type === 'review' && activity.rating && (
                                <div className="mt-2 flex items-center space-x-2">
                                  {renderStars(activity.rating)}
                                  <span className="text-yellow-400 font-bold text-sm">{activity.rating.toFixed(1)}</span>
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-green-400 text-xs font-semibold">Verified</span>
                                </div>
                              )}
                          </div>
            </div>
          </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveActivityDashboard;