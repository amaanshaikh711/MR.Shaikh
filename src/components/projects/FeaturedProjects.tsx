import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Layers, CheckCircle2, Box, Image as ImageIcon } from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';
import Tabs from '../ui/Tabs';
import Scene3D from '../three/Scene3D';
import Badge from '../ui/Badge';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewModes, setViewModes] = useState<Record<string, 'preview' | '3d'>>({});
  const [activeTab, setActiveTab] = useState<Record<string, 'overview' | 'architecture'>>({});

  const categoryTabs = [
    { id: 'all', label: 'All Projects', count: FEATURED_PROJECTS.length },
    { id: 'E-Commerce', label: 'Luxury & E-Comm', count: 1 },
    { id: 'AI / ML', label: 'AI & Machine Learning', count: 2 },
    { id: 'Web3', label: 'FinTech & Web3', count: 1 },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  const toggleViewMode = (projectId: string) => {
    setViewModes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === '3d' ? 'preview' : '3d',
    }));
  };

  const get3DVariant = (id: string): 'lusso' | 'trustlock' | 'aicounts' | 'hatesense' => {
    if (id === 'lussohomes') return 'lusso';
    if (id === 'trustlock-ai') return 'trustlock';
    if (id === 'aicounts') return 'aicounts';
    return 'hatesense';
  };

  return (
    <section
      id="work"
      className={`relative w-full py-24 transition-colors ${
        isDark ? 'bg-[#060608]' : 'bg-[#f7f7f5]'
      }`}
    >
      {/* Section Header */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 mb-12">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 transition-colors ${
            isDark ? 'border-white/[0.08]' : 'border-zinc-200'
          }`}
        >
          <div>
            <div
              className={`flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-semibold ${
                isDark ? 'text-purple-400' : 'text-indigo-600'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>SELECTED CASE STUDIES & ARCHITECTURES</span>
            </div>
            <h2
              className={`mt-2 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Featured Builds
            </h2>
          </div>
          <p
            className={`max-w-md text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Engineered from concept to deployment. Live platforms covering applied machine learning,
            luxury real-estate e-commerce, and decentralized escrow systems.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
          <Tabs
            items={categoryTabs}
            activeId={activeCategory}
            onChange={(id) => setActiveCategory(id)}
          />

          <span
            className={`text-xs font-mono ${
              isDark ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            INTERACTIVE 3D & PRODUCTION PREVIEWS
          </span>
        </div>
      </div>

      {/* Featured Case Studies */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 space-y-24">
        {filteredProjects.map((project, index) => {
          const projectNum = `0${index + 1}`;
          const currentTab = activeTab[project.id] || 'overview';
          const is3D = viewModes[project.id] === '3d';

          return (
            <article
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-t pt-14 transition-colors ${
                isDark ? 'border-white/[0.08]' : 'border-zinc-200'
              }`}
            >
              {/* Media column with browser frame & 3D toggle & zero-crop containment */}
              <div
                className={`lg:col-span-7 ${
                  index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                } group relative rounded-2xl border p-3 sm:p-4 backdrop-blur-md overflow-hidden transition-all duration-300 ${
                  isDark
                    ? 'border-white/[0.1] bg-[#0c0c12]/90 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/5'
                    : 'border-zinc-200 bg-white/95 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-300/40 shadow-sm'
                }`}
              >
                {/* Device Header */}
                <div
                  className={`flex items-center justify-between pb-3 px-1 border-b mb-3 ${
                    isDark ? 'border-white/[0.06]' : 'border-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span
                      className={`ml-2 font-mono text-[11px] ${
                        isDark ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      {project.id}.prod.app
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 3D vs Image Toggle */}
                    <button
                      onClick={() => toggleViewMode(project.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium transition-all ${
                        is3D
                          ? isDark
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-indigo-600 text-white shadow-md'
                          : isDark
                          ? 'bg-white/10 hover:bg-white/15 text-zinc-300'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                      }`}
                      title="Toggle 3D spatial geometry"
                    >
                      {is3D ? (
                        <>
                          <ImageIcon className="h-3 w-3" />
                          <span>Image</span>
                        </>
                      ) : (
                        <>
                          <Box className="h-3 w-3" />
                          <span>3D Model</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectProject(project)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        isDark
                          ? 'bg-white/10 hover:bg-white hover:text-black text-zinc-200'
                          : 'bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800'
                      }`}
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Viewport Canvas - Zero Crop & High Definition */}
                <div
                  className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl border flex items-center justify-center p-2 transition-colors ${
                    isDark
                      ? 'bg-black/80 border-white/[0.05]'
                      : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  {is3D ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Scene3D
                        variant={get3DVariant(project.id)}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-contain object-center rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>

              {/* Storytelling Content Column */}
              <div
                className={`lg:col-span-5 ${
                  index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                } flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs tracking-widest font-semibold ${
                        isDark ? 'text-purple-400' : 'text-indigo-600'
                      }`}
                    >
                      {projectNum} / CASE STUDY
                    </span>
                    <span
                      className={`font-mono text-xs ${
                        isDark ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      {project.year}
                    </span>
                  </div>

                  <h3
                    className={`mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {project.name}
                  </h3>

                  <p
                    className={`mt-2 text-sm font-medium ${
                      isDark ? 'text-purple-300/90' : 'text-indigo-600'
                    }`}
                  >
                    {project.tagline}
                  </p>

                  {/* Clean unboxed metadata (zero-pill discipline) */}
                  <div
                    className={`mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {project.tags.map((tag, tIdx) => (
                      <React.Fragment key={tag}>
                        <span
                          className={isDark ? 'text-zinc-300' : 'text-zinc-800'}
                        >
                          {tag}
                        </span>
                        {tIdx < project.tags.length - 1 && (
                          <span
                            className={isDark ? 'text-zinc-600' : 'text-zinc-300'}
                          >
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Interactive Tab Switcher for Architecture vs Overview */}
                  <div
                    className={`mt-6 flex items-center gap-1 p-1 rounded-lg w-fit border ${
                      isDark
                        ? 'bg-white/[0.03] border-white/[0.06]'
                        : 'bg-zinc-100 border-zinc-200'
                    }`}
                  >
                    <button
                      onClick={() =>
                        setActiveTab((prev) => ({
                          ...prev,
                          [project.id]: 'overview',
                        }))
                      }
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        currentTab === 'overview'
                          ? isDark
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'bg-white text-zinc-900 shadow-sm'
                          : isDark
                          ? 'text-zinc-400 hover:text-white'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() =>
                        setActiveTab((prev) => ({
                          ...prev,
                          [project.id]: 'architecture',
                        }))
                      }
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        currentTab === 'architecture'
                          ? isDark
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'bg-white text-zinc-900 shadow-sm'
                          : isDark
                          ? 'text-zinc-400 hover:text-white'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Key Highlights
                    </button>
                  </div>

                  {currentTab === 'overview' ? (
                    <p
                      className={`mt-4 text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      {project.desc}
                    </p>
                  ) : (
                    <ul
                      className={`mt-4 space-y-2 text-sm ${
                        isDark ? 'text-zinc-400' : 'text-zinc-700'
                      }`}
                    >
                      {(project.highlights || []).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              isDark ? 'text-purple-400' : 'text-indigo-600'
                            }`}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Verified Project Metrics */}
                  {project.metrics && (
                    <div
                      className={`mt-6 grid grid-cols-3 gap-3 border-t pt-4 ${
                        isDark ? 'border-white/[0.06]' : 'border-zinc-200'
                      }`}
                    >
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <p
                            className={`font-mono text-[10px] uppercase ${
                              isDark ? 'text-zinc-500' : 'text-zinc-500'
                            }`}
                          >
                            {m.label}
                          </p>
                          <p
                            className={`font-display text-sm font-semibold mt-0.5 ${
                              isDark ? 'text-zinc-200' : 'text-zinc-900'
                            }`}
                          >
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => onSelectProject(project)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                      isDark
                        ? 'bg-white/10 border border-white/15 text-white hover:bg-white hover:text-black'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm'
                    }`}
                  >
                    <span>Read Architecture</span>
                    <Layers className="h-3.5 w-3.5" />
                  </button>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-mono transition ${
                      isDark
                        ? 'text-zinc-400 hover:text-white'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    <span>View Repository</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProjects;
