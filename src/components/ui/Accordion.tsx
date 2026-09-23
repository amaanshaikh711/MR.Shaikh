import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isDark
                ? isOpen
                  ? 'border-white/20 bg-white/[0.04]'
                  : 'border-white/[0.08] bg-white/[0.015] hover:border-white/15'
                : isOpen
                ? 'border-zinc-300 bg-white shadow-sm'
                : 'border-zinc-200 bg-zinc-50/70 hover:border-zinc-300'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left select-none transition-colors"
              aria-expanded={isOpen}
            >
              <div className="min-w-0 pr-4">
                <h4
                  className={`font-display text-base font-bold tracking-tight transition-colors ${
                    isDark ? (isOpen ? 'text-white' : 'text-zinc-200') : isOpen ? 'text-zinc-950' : 'text-zinc-800'
                  }`}
                >
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className={`text-xs mt-0.5 font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {item.subtitle}
                  </p>
                )}
              </div>
              <div
                className={`p-1.5 rounded-full border transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                } ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-zinc-300'
                    : 'border-zinc-200 bg-white text-zinc-600'
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>

            {isOpen && (
              <div
                className={`px-5 pb-5 pt-1 text-sm border-t ${
                  isDark ? 'border-white/[0.06] text-zinc-300' : 'border-zinc-100 text-zinc-700'
                }`}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
