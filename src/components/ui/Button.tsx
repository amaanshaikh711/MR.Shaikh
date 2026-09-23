import React, { forwardRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
      md: 'text-sm px-4 py-2 rounded-xl gap-2',
      lg: 'text-base px-6 py-3 rounded-2xl gap-2.5',
      icon: 'p-2 rounded-xl aspect-square',
    }[size];

    let variantStyles = '';

    if (variant === 'primary') {
      variantStyles = isDark
        ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10 hover:shadow-white/20'
        : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-md shadow-zinc-900/10 hover:shadow-zinc-900/20';
    } else if (variant === 'secondary') {
      variantStyles = isDark
        ? 'bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-white/10'
        : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200';
    } else if (variant === 'outline') {
      variantStyles = isDark
        ? 'border border-white/20 text-zinc-100 hover:bg-white/5 hover:border-white/40'
        : 'border border-zinc-300 text-zinc-900 hover:bg-zinc-100 hover:border-zinc-400';
    } else if (variant === 'ghost') {
      variantStyles = isDark
        ? 'text-zinc-300 hover:text-white hover:bg-white/5'
        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100';
    } else if (variant === 'glass') {
      variantStyles = isDark
        ? 'bg-[#12121a]/80 backdrop-blur-md border border-white/15 text-white hover:bg-[#181824] hover:border-white/30'
        : 'bg-white/80 backdrop-blur-md border border-zinc-200 text-zinc-900 hover:bg-white hover:border-zinc-300 shadow-sm';
    }

    return (
      <button ref={ref} className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
