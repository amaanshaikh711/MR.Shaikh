import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MagneticScrollToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const MagneticScrollToggle: React.FC<MagneticScrollToggleProps> = ({
  enabled,
  onToggle,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      aria-label="Toggle magnetic scrolling"
      aria-pressed={enabled}
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border px-3 py-2 shadow-2xl backdrop-blur-xl transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isDark
          ? enabled
            ? 'border-purple-400/30 bg-[#111118]/90 text-white shadow-purple-500/10 focus-visible:ring-purple-300 focus-visible:ring-offset-[#060608]'
            : 'border-white/10 bg-[#0e0e14]/80 text-zinc-200 shadow-black/60 focus-visible:ring-white/50 focus-visible:ring-offset-[#060608]'
          : enabled
            ? 'border-indigo-300 bg-white/90 text-zinc-900 shadow-indigo-200/60 focus-visible:ring-indigo-400 focus-visible:ring-offset-[#f7f7f5]'
            : 'border-zinc-300 bg-white/85 text-zinc-800 shadow-zinc-300/60 focus-visible:ring-zinc-500 focus-visible:ring-offset-[#f7f7f5]'
      }`}
      title={enabled ? 'Disable magnetic scroll' : 'Enable magnetic scroll'}
    >
      <span
        className={`flex h-2.5 w-2.5 rounded-full ${
          enabled
            ? isDark
              ? 'bg-purple-400'
              : 'bg-indigo-600'
            : isDark
              ? 'bg-zinc-500'
              : 'bg-zinc-400'
        }`}
        aria-hidden="true"
      />
      <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.2em]">
        Magnetic
      </span>
      <span className={`text-[10px] font-mono uppercase tracking-[0.16em] ${enabled ? 'opacity-100' : 'opacity-80'}`}>
        {enabled ? 'On' : 'Off'}
      </span>
      <Sparkles className={`h-3.5 w-3.5 ${enabled ? 'opacity-100' : 'opacity-70'}`} aria-hidden="true" />
    </motion.button>
  );
};

export default MagneticScrollToggle;
