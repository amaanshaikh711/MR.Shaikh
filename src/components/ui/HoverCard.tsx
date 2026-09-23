import React, { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface HoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ trigger, content, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-pointer">{trigger}</div>
      {isOpen && (
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 rounded-xl p-3.5 shadow-2xl transition-all duration-200 animate-in fade-in zoom-in-95 pointer-events-auto ${
            isDark
              ? 'bg-[#12121a] border border-white/15 text-zinc-200 shadow-black/80'
              : 'bg-white border border-zinc-200 text-zinc-900 shadow-xl shadow-zinc-300/40'
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default HoverCard;
