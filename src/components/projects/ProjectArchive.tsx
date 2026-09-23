import React, { useState, useRef } from 'react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { ARCHIVE_PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

interface ProjectArchiveProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({ onSelectProject }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [filter, setFilter] = useState<'All' | 'AI / ML' | 'Full-Stack' | 'E-Commerce'>('All');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects =
    filter === 'All'
      ? ARCHIVE_PROJECTS
      : ARCHIVE_PROJECTS.filter((p) => p.category === filter);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className={`relative w-full py-20 border-t transition-colors ${
        isDark ? 'bg-[#060608] border-white/[0.06]' : 'bg-[#f7f7f5] border-zinc-200'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div>
            <div
              className={`flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-semibold ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              <FolderGit2 className={`h-3.5 w-3.5 ${isDark ? 'text-purple-400' : 'text-indigo-600'}`} />
              <span>THE REPOSITORY ARCHIVE</span>
            </div>
            <h2
              className={`mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              More Builds & Experiments
            </h2>
          </div>

          {/* Interactive filter buttons */}
          <div
            className={`flex items-center gap-1.5 p-1 border rounded-xl overflow-x-auto ${
              isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-zinc-100 border-zinc-200'
            }`}
          >
            {(['All', 'AI / ML', 'Full-Stack', 'E-Commerce'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filter === cat
                    ? isDark
                      ? 'bg-white text-black shadow-sm font-semibold'
                      : 'bg-white text-zinc-950 shadow-sm font-semibold border border-zinc-200'
                    : isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Editorial Archive Table with Floating Cursor Preview */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredProject(null)}
          className={`relative mt-8 border-y ${
            isDark ? 'border-white/[0.08]' : 'border-zinc-200'
          }`}
        >
          {/* Floating Hover Image Preview Window */}
          {hoveredProject && (
            <div
              className={`pointer-events-none fixed z-40 hidden md:block w-72 h-44 rounded-xl overflow-hidden border shadow-2xl transition-transform duration-100 ease-out ${
                isDark
                  ? 'border-white/20 shadow-black/90 bg-zinc-950'
                  : 'border-zinc-300 shadow-xl shadow-zinc-400/30 bg-white'
              }`}
              style={{
                left: `${mousePos.x + 30}px`,
                top: `${mousePos.y - 80}px`,
                position: 'absolute',
              }}
            >
              <img
                src={hoveredProject.image}
                alt={hoveredProject.name}
                className="h-full w-full object-cover object-top"
              />
              <div
                className={`absolute inset-0 ${
                  isDark
                    ? 'bg-gradient-to-t from-black/80 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-white/90 via-transparent to-transparent'
                }`}
              />
              <div
                className={`absolute bottom-2 left-3 right-3 text-[11px] font-mono flex justify-between font-medium ${
                  isDark ? 'text-zinc-200' : 'text-zinc-800'
                }`}
              >
                <span>{hoveredProject.name}</span>
                <span>{hoveredProject.year}</span>
              </div>
            </div>
          )}

          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-zinc-200'}`}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project)}
                onClick={() => onSelectProject(project)}
                className={`group flex flex-col md:flex-row md:items-center justify-between py-6 px-4 -mx-4 rounded-xl transition-colors duration-200 cursor-pointer ${
                  isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-zinc-100/70'
                }`}
              >
                {/* Year + Title */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 md:w-5/12">
                  <span
                    className={`font-mono text-xs shrink-0 tabular-nums ${
                      isDark ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    {project.year}
                  </span>
                  <div>
                    <h4
                      className={`font-display text-xl sm:text-2xl font-bold transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-purple-300'
                          : 'text-zinc-900 group-hover:text-indigo-600'
                      }`}
                    >
                      {project.name}
                    </h4>
                    <p
                      className={`mt-1 text-xs line-clamp-1 ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Tech Tags */}
                <div
                  className={`mt-3 md:mt-0 flex flex-wrap items-center gap-2 text-xs font-mono md:w-5/12 ${
                    isDark ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {project.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span className={isDark ? 'text-zinc-400' : 'text-zinc-700'}>
                        {tag}
                      </span>
                      {idx < project.tags.length - 1 && (
                        <span className={isDark ? 'text-zinc-700' : 'text-zinc-300'}>
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Action Arrow */}
                <div className="mt-3 md:mt-0 flex items-center justify-end md:w-2/12">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.02] text-zinc-400 group-hover:border-white/30 group-hover:bg-white group-hover:text-black'
                        : 'border-zinc-300 bg-white text-zinc-600 group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:text-white'
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Source Callout */}
        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border ${
            isDark
              ? 'border-white/[0.08] bg-zinc-950/40 text-white'
              : 'border-zinc-200 bg-white text-zinc-900 shadow-sm'
          }`}
        >
          <div>
            <h4 className="font-display text-base font-bold">Shipping in Public on GitHub</h4>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Check out all source code, ML notebooks, experiments, and commit histories.
            </p>
          </div>
          <a
            href="https://github.com/amaanshaikh711"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold transition ${
              isDark
                ? 'border-white/15 bg-white/5 text-white hover:bg-white hover:text-black'
                : 'border-zinc-300 bg-zinc-100 text-zinc-900 hover:bg-zinc-950 hover:text-white'
            }`}
          >
            <span>@amaanshaikh711</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectArchive;
