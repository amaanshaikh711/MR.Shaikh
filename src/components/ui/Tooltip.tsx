import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[position];

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={`absolute ${positionClasses} z-50 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-mono font-medium shadow-xl pointer-events-none transition-all duration-150 animate-in fade-in-0 zoom-in-95 ${
            isDark
              ? 'bg-[#181822] text-zinc-200 border border-white/15 shadow-black/80'
              : 'bg-white text-zinc-800 border border-zinc-200 shadow-zinc-400/20'
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
