import React from 'react';
import { motion } from 'motion/react';

interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  id,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      id={id}
      initial={{ 
        opacity: 0, 
        y: 60, 
        scale: 0.95,
        rotateX: 4
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: 0
      }}
      viewport={{ 
        once: true, 
        margin: "-90px" 
      }}
      transition={{ 
        duration: 0.75, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ perspective: 1200 }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};
