import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
  Search,
  Code2,
  FolderGit2,
  Briefcase,
  Trophy,
  User,
  Mail,
  Sun,
  Moon,
  ExternalLink,
  FileText,
  X,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { FEATURED_PROJECTS, PERSONAL_INFO } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          (window as any).__openCommandPalette?.();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200 animate-in zoom-in-95 ${
          isDark
            ? 'bg-[#0f0f18] border-white/20 text-zinc-100 shadow-black/90'
            : 'bg-white border-zinc-200 text-zinc-900 shadow-2xl shadow-zinc-400/20'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          value={search}
          onValueChange={setSearch}
          className="flex flex-col h-full w-full"
        >
          {/* Search Header */}
          <div
            className={`flex items-center gap-3 px-4 py-3.5 border-b ${
              isDark ? 'border-white/[0.08]' : 'border-zinc-200'
            }`}
          >
            <Search className={`h-4 w-4 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <Command.Input
              autoFocus
              placeholder="Type a command or search portfolio..."
              className={`w-full bg-transparent text-sm outline-none placeholder:text-zinc-500 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            />
            <button
              onClick={onClose}
              className={`p-1 rounded-md text-zinc-400 hover:text-white transition-colors ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 font-sans text-sm">
            <Command.Empty className="py-8 text-center text-xs text-zinc-500">
              No matching results found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group
              heading="Quick Navigation"
              className={`px-2 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              <Command.Item
                onSelect={() => navigateTo('#hero')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <User className="h-4 w-4 text-purple-400" />
                <span>Home / Overview</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#about')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <User className="h-4 w-4 text-blue-400" />
                <span>About Aman Shaikh</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#work')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <FolderGit2 className="h-4 w-4 text-emerald-400" />
                <span>Featured Projects & Case Studies</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#experience')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <Briefcase className="h-4 w-4 text-amber-400" />
                <span>Experience Timeline</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#achievements')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span>Achievements & Accreditations 🏆</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#contact')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <Mail className="h-4 w-4 text-rose-400" />
                <span>Contact & Inquiries</span>
              </Command.Item>
            </Command.Group>

            {/* Projects Group */}
            <Command.Group
              heading="Projects"
              className={`px-2 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider mt-2 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {FEATURED_PROJECTS.map((proj) => (
                <Command.Item
                  key={proj.id}
                  onSelect={() => {
                    navigateTo('#work');
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs font-medium select-none ${
                    isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{proj.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">{proj.category}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* System Actions */}
            <Command.Group
              heading="Actions"
              className={`px-2 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider mt-2 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              <Command.Item
                onSelect={() => {
                  toggleTheme();
                  onClose();
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
                <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.open(PERSONAL_INFO.resume, '_blank');
                  onClose();
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs font-medium select-none ${
                  isDark ? 'hover:bg-white/10 text-zinc-200' : 'hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-purple-400" />
                  <span>View Resume / GitHub</span>
                </div>
                <ExternalLink className="h-3 w-3 text-zinc-500" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Guide */}
          <div
            className={`px-4 py-2.5 border-t flex items-center justify-between font-mono text-[11px] ${
              isDark ? 'border-white/[0.08] text-zinc-500 bg-black/20' : 'border-zinc-200 text-zinc-600 bg-zinc-50'
            }`}
          >
            <span>Navigation: ↑ ↓ Enter</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200/50 dark:bg-white/10 text-[10px]">ESC</kbd> to close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
};

export default CommandPalette;
