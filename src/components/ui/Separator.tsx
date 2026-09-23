import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const borderColor = isDark ? 'bg-white/[0.08]' : 'bg-zinc-200';

  if (orientation === 'vertical') {
    return <div className={`inline-block w-[1px] h-4 ${borderColor} ${className}`} aria-hidden="true" />;
  }

  return <div className={`w-full h-[1px] ${borderColor} ${className}`} aria-hidden="true" />;
};

export default Separator;
