'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  animateOnLoad?: boolean;
}

const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  fallback = <div className="w-full h-32 bg-gray-200 animate-pulse rounded-lg" />,
  rootMargin = '50px',
  threshold = 0.1,
  className = '',
  animateOnLoad = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect observer after first load
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, hasLoaded]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? (
        animateOnLoad ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {children}
          </motion.div>
        ) : (
          children
        )
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyLoadWrapper;