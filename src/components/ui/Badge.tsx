import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'subtle' | 'accent';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  let variantStyles = '';

  if (variant === 'default') {
    variantStyles = isDark
      ? 'border border-white/10 bg-white/[0.04] text-zinc-300'
      : 'border border-zinc-200 bg-zinc-100/80 text-zinc-800';
  } else if (variant === 'outline') {
    variantStyles = isDark
      ? 'border border-white/15 text-zinc-400'
      : 'border border-zinc-300 text-zinc-600';
  } else if (variant === 'subtle') {
    variantStyles = isDark
      ? 'bg-white/[0.03] text-zinc-400'
      : 'bg-zinc-100 text-zinc-600';
  } else if (variant === 'accent') {
    variantStyles = isDark
      ? 'border border-purple-500/30 bg-purple-500/10 text-purple-300'
      : 'border border-indigo-200 bg-indigo-50 text-indigo-700';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[11px] font-medium tracking-tight transition-colors ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
