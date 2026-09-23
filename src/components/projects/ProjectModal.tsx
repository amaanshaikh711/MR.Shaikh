import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 animate-in zoom-in-95 ${
          isDark
            ? 'bg-[#09090f] border-white/15 text-white shadow-black/90'
            : 'bg-white border-zinc-200 text-zinc-900 shadow-2xl shadow-zinc-400/30'
        }`}
      >
        {/* Header with Close */}
        <div
          className={`flex items-start justify-between gap-4 border-b pb-6 ${
            isDark ? 'border-white/10' : 'border-zinc-200'
          }`}
        >
          <div>
            <div
              className={`flex items-center gap-3 font-mono text-xs font-semibold ${
                isDark ? 'text-purple-400' : 'text-indigo-600'
              }`}
            >
              <span>{project.year}</span>
              <span className="opacity-40">·</span>
              <span>{project.category}</span>
            </div>
            <h3
              className={`mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {project.name}
            </h3>
            <p className={`mt-1 text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
              isDark
                ? 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                : 'border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            }`}
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Media Preview - Zero Crop Full View */}
        <div
          className={`relative mt-6 w-full aspect-[16/9] overflow-hidden rounded-2xl border p-2 flex items-center justify-center ${
            isDark ? 'bg-black/90 border-white/10' : 'bg-zinc-100 border-zinc-200'
          }`}
        >
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-contain object-center rounded-xl"
          />
        </div>

        {/* Narrative & Architecture Section */}
        <div className="mt-8 space-y-6">
          <div>
            <h4
              className={`font-mono text-xs uppercase tracking-wider ${
                isDark ? 'text-zinc-400' : 'text-zinc-500'
              }`}
            >
              System Architecture & Engineering Narrative
            </h4>
            <p
              className={`mt-2 text-base leading-relaxed ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {project.longDesc || project.desc}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4
                className={`font-mono text-xs uppercase tracking-wider ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Key Implementation Deliverables
              </h4>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2.5 text-sm ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 mt-0.5 ${
                        isDark ? 'text-purple-400' : 'text-indigo-600'
                      }`}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack Tags */}
          <div>
            <h4
              className={`font-mono text-xs uppercase tracking-wider ${
                isDark ? 'text-zinc-400' : 'text-zinc-500'
              }`}
            >
              Technologies & Frameworks
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className={`rounded-lg border px-3 py-1 font-mono text-xs ${
                    isDark
                      ? 'border-white/10 bg-white/5 text-zinc-300'
                      : 'border-zinc-200 bg-zinc-100 text-zinc-800'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div
            className={`flex flex-wrap items-center gap-4 pt-4 border-t ${
              isDark ? 'border-white/10' : 'border-zinc-200'
            }`}
          >
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                isDark
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-zinc-950 text-white hover:bg-zinc-800'
              }`}
            >
              <span>Explore Codebase</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition ${
                  isDark
                    ? 'border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white'
                    : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'
                }`}
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
