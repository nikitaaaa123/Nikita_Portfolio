import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  onClick?: () => void;
  id?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 10,
  scaleOnHover = 1.02,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth rotation springs
  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const handleMouseEnter = () => {
    // Cache the bounding box ONCE when the mouse enters to prevent layout thrashing
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    // Use the cached dimensions for zero-cost math
    const x = (e.clientX - rectRef.current.left) / rectRef.current.width - 0.5;
    const y = (e.clientY - rectRef.current.top) / rectRef.current.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    rectRef.current = null; // Clear cache
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: scaleOnHover }}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        rotateX,
        rotateY,
      }}
      transition={{ duration: 0.2 }}
      className={`interactive-card relative transition-shadow duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />
      {children}
    </motion.div>
  );
};