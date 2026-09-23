import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  delay?: number;
  x?: number;
  y?: number;
  duration?: number;
  amount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  x = 32,
  y = 0,
  duration = 0.7,
  amount = 0.18,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x, y }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
