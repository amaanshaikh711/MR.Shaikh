import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface MagneticSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /**
   * Focus strength: controls how pronounced the scale/opacity snap is
   * default: 1
   */
  focusStrength?: number;
}

export const MagneticSection: React.FC<MagneticSectionProps> = ({
  id,
  className = '',
  children,
  focusStrength = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress through this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate focal scale: gently scales from 0.94 up to 1.0 at center, then back to 0.96
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      1 - 0.05 * focusStrength,
      1,
      1,
      1,
      1 - 0.04 * focusStrength,
    ]
  );

  // Calculate focal opacity: smoothly dims sections slightly when out of view
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      1 - 0.5 * focusStrength,
      1,
      1,
      1,
      1 - 0.45 * focusStrength,
    ]
  );

  // Gentle vertical magnetic drift
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [24 * focusStrength, 0, 0, -20 * focusStrength]
  );

  // Apply fluid spring physics for that signature weighted Awwwards tactile feeling
  const scale = useSpring(rawScale, { stiffness: 120, damping: 24, mass: 0.8 });
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 24, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 100, damping: 22, mass: 0.8 });

  return (
    <div
      ref={containerRef}
      id={id}
      data-magnetic-section={id || 'section'}
      className={`relative w-full ${className}`}
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MagneticSection;
