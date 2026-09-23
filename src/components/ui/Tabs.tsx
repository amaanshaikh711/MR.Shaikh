import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeId, onChange, className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-xl transition-colors ${
        isDark
          ? 'bg-white/[0.04] border border-white/[0.08]'
          : 'bg-zinc-200/70 border border-zinc-200'
      } ${className}`}
      role="tablist"
    >
      {items.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 select-none flex items-center gap-2 ${
              isActive
                ? isDark
                  ? 'bg-white/10 text-white shadow-sm border border-white/10'
                  : 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80'
                : isDark
                ? 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.03]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${
                  isActive
                    ? isDark
                      ? 'bg-white/15 text-white'
                      : 'bg-zinc-100 text-zinc-800'
                    : isDark
                    ? 'bg-white/5 text-zinc-400'
                    : 'bg-zinc-300/60 text-zinc-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
