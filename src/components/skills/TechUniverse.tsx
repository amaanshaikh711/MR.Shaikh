import React, { useState } from 'react';
import { Cpu, Terminal, Database, Layers, Box, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES, FEATURED_PROJECTS, ARCHIVE_PROJECTS } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import HoverCard from '../ui/HoverCard';

export const TechUniverse: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedTech, setSelectedTech] = useState<string | null>('React.js');

  const allProjects = [...FEATURED_PROJECTS, ...ARCHIVE_PROJECTS];
  const relatedProjects = selectedTech
    ? allProjects.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(selectedTech.toLowerCase().replace('.js', '')))
      )
    : [];

  const categoryIcons = [
    <Terminal className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-indigo-600'}`} key="0" />,
    <Database className={`h-4 w-4 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} key="1" />,
    <Cpu className={`h-4 w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} key="2" />,
    <Box className={`h-4 w-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} key="3" />,
  ];

  return (
    <section
      id="stack"
      className={`relative w-full py-24 border-t transition-colors ${
        isDark ? 'bg-[#060608] border-white/[0.06]' : 'bg-[#f7f7f5] border-zinc-200'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b ${
            isDark ? 'border-white/[0.08]' : 'border-zinc-200'
          }`}
        >
          <div>
            <div
              className={`flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-semibold ${
                isDark ? 'text-purple-400' : 'text-indigo-600'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>TECHNICAL ECOSYSTEM</span>
            </div>
            <h2
              className={`mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Tools & Architecture
            </h2>
          </div>
          <p
            className={`max-w-md text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Curated toolkit applied in production systems. Select any technology below to inspect related
            shipped builds and architectural implementations.
          </p>
        </div>

        {/* 4 Category Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.title}
              className={`rounded-2xl border p-6 backdrop-blur-sm transition-all ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.015] hover:border-white/20'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                    isDark
                      ? 'border-white/10 bg-white/5'
                      : 'border-zinc-200 bg-zinc-100'
                  }`}
                >
                  {categoryIcons[idx % categoryIcons.length]}
                </div>
                <h3
                  className={`font-display text-base font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {cat.title}
                </h3>
              </div>

              <p className={`mt-2 text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {cat.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {cat.items.map((item) => {
                  const isSelected = selectedTech === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setSelectedTech(isSelected ? null : item)}
                      className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-all ${
                        isSelected
                          ? isDark
                            ? 'bg-purple-500/25 border-purple-400 text-white shadow-sm'
                            : 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                          : isDark
                          ? 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white hover:bg-white/[0.07]'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Technology Applied Context */}
        {selectedTech && (
          <div
            className={`mt-10 rounded-2xl border p-6 transition-all duration-300 ${
              isDark
                ? 'border-purple-500/30 bg-purple-950/10'
                : 'border-indigo-200 bg-indigo-50/50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-inherit">
              <div className="flex items-center gap-2">
                <Code2
                  className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-indigo-600'}`}
                />
                <span
                  className={`font-mono text-xs font-semibold ${
                    isDark ? 'text-purple-300' : 'text-indigo-700'
                  }`}
                >
                  Applied in Shipped Builds:
                </span>
                <span
                  className={`font-bold text-sm ${isDark ? 'text-white' : 'text-zinc-950'}`}
                >
                  {selectedTech}
                </span>
              </div>
              <span
                className={`font-mono text-xs ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {relatedProjects.length} implementation(s) found
              </span>
            </div>

            {relatedProjects.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-xl border p-4 transition-colors ${
                      isDark
                        ? 'border-white/10 bg-white/[0.02]'
                        : 'border-zinc-200 bg-white shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-display text-sm font-bold ${
                          isDark ? 'text-white' : 'text-zinc-900'
                        }`}
                      >
                        {p.name}
                      </h4>
                      <span className="font-mono text-[10px] text-zinc-500">
                        {p.year}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-xs line-clamp-2 ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      {p.tagline}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p
                className={`mt-3 text-xs italic ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Used across active internal scripts, microservices, and ongoing client architectures.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechUniverse;
