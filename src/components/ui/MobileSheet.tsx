import React from 'react';
import { X, ExternalLink, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  activeSection,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const links = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'work', label: 'Projects', href: '#work' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'achievements', label: 'Achievements 🏆', href: '#achievements' },
    { id: 'contact', label: 'Reach', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs p-6 shadow-2xl transition-transform duration-300 animate-in slide-in-from-right flex flex-col justify-between ${
          isDark
            ? 'bg-[#0e0e14] border-l border-white/10 text-white'
            : 'bg-white border-l border-zinc-200 text-zinc-900'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 dark:border-white/10">
            <div>
              <p className="font-display font-bold text-lg">{PERSONAL_INFO.name}</p>
              <p className="font-mono text-xs text-zinc-400">Software Developer</p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10 text-zinc-300' : 'hover:bg-zinc-100 text-zinc-700'
              }`}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 flex flex-col space-y-3">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.href)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-sm font-medium transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-white/10 text-white font-bold'
                        : 'bg-zinc-100 text-zinc-950 font-bold'
                      : isDark
                      ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer with Theme Toggle & Resume */}
        <div className="pt-6 border-t border-white/10 dark:border-white/10 space-y-3">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-mono font-medium transition-colors ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-zinc-300'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            <span>Theme: {isDark ? 'Dark Cinematic' : 'Light Editorial'}</span>
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
          </button>

          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
          >
            <span>View Resume & Repos</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileSheet;
