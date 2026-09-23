import React, { useState, useEffect } from 'react';
import { Moon, Sun, Search, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import CommandPalette from '../ui/CommandPalette';
import MobileSheet from '../ui/MobileSheet';
import Tooltip from '../ui/Tooltip';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [activeSection, setActiveSection] = useState<
    'about' | 'projects' | 'experience' | 'achievements' | 'reach'
  >('about');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global helper for opening command palette
  useEffect(() => {
    (window as any).__openCommandPalette = () => setIsCommandOpen(true);
    return () => {
      delete (window as any).__openCommandPalette;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      const reachEl = document.getElementById('contact');
      const achEl = document.getElementById('achievements');
      const expEl = document.getElementById('experience');
      const workEl = document.getElementById('work');
      const aboutEl = document.getElementById('about');

      if (reachEl && scrollPos >= reachEl.offsetTop - 120) {
        setActiveSection('reach');
      } else if (achEl && scrollPos >= achEl.offsetTop - 120) {
        setActiveSection('achievements');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop - 120) {
        setActiveSection('about');
      } else if (expEl && scrollPos >= expEl.offsetTop - 120) {
        setActiveSection('experience');
      } else if (workEl && scrollPos >= workEl.offsetTop - 120) {
        setActiveSection('projects');
      } else {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#work' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'achievements', label: 'Achievements', href: '#achievements' },
    { id: 'reach', label: 'Reach', href: '#contact' },
  ] as const;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(href, { offset: -20, duration: 1.2 });
      } else {
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[94vw]">
        <nav
          aria-label="Floating Navigation"
          className={`flex items-center gap-2.5 sm:gap-4 md:gap-5 rounded-full border px-3 sm:px-5 py-2 sm:py-2.5 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
            isDark
              ? 'border-white/15 bg-[#0e0e14]/90 text-white shadow-black/80 hover:border-white/25'
              : 'border-zinc-300/80 bg-[#fdfdfc]/90 text-zinc-900 shadow-zinc-300/30 hover:border-zinc-400'
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="p-0.5 rounded-full flex items-center justify-center transition-all group"
            aria-label="Scroll to top / home"
          >
            <img src="/as-logo.png" alt="AS" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border border-purple-500/30 transition-transform group-hover:scale-110 shadow-sm" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs lg:text-sm transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? isDark
                        ? 'font-bold text-white'
                        : 'font-bold text-zinc-950'
                      : isDark
                      ? 'font-medium text-zinc-400 hover:text-zinc-200'
                      : 'font-medium text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Quick Command Palette Button */}
          <Tooltip content="Quick Search (⌘K)">
            <button
              onClick={() => setIsCommandOpen(true)}
              className={`p-1.5 rounded-full flex items-center justify-center transition-colors ${
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60'
              }`}
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </Tooltip>

          {/* Vertical Divider */}
          <span
            className={`h-4 w-[1px] mx-0.5 ${isDark ? 'bg-white/15' : 'bg-zinc-300'}`}
            aria-hidden="true"
          />

          {/* Theme Mode Toggle (Sun/Moon) */}
          <Tooltip content={isDark ? 'Switch to Light Editorial' : 'Switch to Dark Cinematic'}>
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full flex items-center justify-center transition-all group ${
                isDark
                  ? 'text-zinc-300 hover:text-amber-300 hover:bg-white/10'
                  : 'text-zinc-700 hover:text-indigo-600 hover:bg-zinc-200/60'
              }`}
              aria-label="Toggle theme mode"
            >
              {isDark ? (
                <Moon className="h-4 w-4 transition-transform group-hover:rotate-12" />
              ) : (
                <Sun className="h-4 w-4 text-amber-500 transition-transform group-hover:rotate-45" />
              )}
            </button>
          </Tooltip>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden p-1.5 rounded-full transition-colors ${
              isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
            }`}
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Mobile Drawer Navigation */}
      <MobileSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
