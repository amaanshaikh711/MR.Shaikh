import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import Accordion from '../ui/Accordion';
import ScrollReveal from '../ui/ScrollReveal';

export const ExperienceTimeline: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const section = document.getElementById('experience');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight * 0.55);
      const nextProgress = Math.min(1, Math.max(0, (window.innerHeight * 0.3 - rect.top) / travel));
      setProgress((current) => (Math.abs(current - nextProgress) > 0.002 ? nextProgress : current));
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const accordionItems = EXPERIENCES.map((item) => ({
    id: item.id,
    title: `${item.role} · ${item.company}`,
    subtitle: `${item.period} · ${item.location || 'Mumbai, India'}${item.isCurrent ? ' (Active Role)' : ''}`,
    content: (
      <div className="pt-2 space-y-4">
        {item.summary && (
          <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {item.summary}
          </p>
        )}
        <ul className="space-y-2">
          {item.points.map((pt, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2
                className={`h-4 w-4 shrink-0 mt-0.5 ${
                  isDark ? 'text-purple-400' : 'text-indigo-600'
                }`}
              />
              <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{pt}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2 flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border ${
                isDark
                  ? 'border-white/10 bg-white/5 text-zinc-300'
                  : 'border-zinc-200 bg-zinc-100 text-zinc-800'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <ScrollReveal
      id="experience"
      className={`relative w-full py-24 border-t transition-colors ${
        isDark ? 'bg-[#060608] border-white/[0.06]' : 'bg-[#f7f7f5] border-zinc-200'
      }`}
      x={32}
      duration={0.75}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div
            className={`flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-semibold ${
              isDark ? 'text-purple-400' : 'text-indigo-600'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>CAREER PATH & ENGAGEMENTS</span>
          </div>
          <h2
            className={`mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            Work Experience
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Professional track record spanning full-stack development, applied machine learning pipelines,
            client real-estate platforms, and production Python engineering.
          </p>
        </div>

        {/* Timeline Flow */}
        <div
          className={`relative pl-6 sm:pl-8 border-l space-y-12 ${
            isDark ? 'border-white/15' : 'border-zinc-300'
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -left-px top-0 w-px origin-top transition-[height] duration-150 ease-out ${
              isDark ? 'bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.7)]' : 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.35)]'
            }`}
            style={{ height: `${progress * 100}%` }}
          />
          {EXPERIENCES.map((item, index) => (
            <ScrollReveal key={item.id} className="relative group" x={index % 2 === 0 ? 28 : -28} duration={0.7} delay={index * 0.07}>
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                  item.isCurrent
                    ? isDark
                      ? 'border-purple-400 bg-purple-500/30'
                      : 'border-indigo-600 bg-indigo-100'
                    : isDark
                    ? 'border-zinc-600 bg-[#060608]'
                    : 'border-zinc-400 bg-white'
                }`}
              >
                {item.isCurrent && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                      isDark ? 'bg-purple-400' : 'bg-indigo-600'
                    }`}
                  />
                )}
              </div>

              {/* Card Surface */}
              <div
                className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 ${
                  isDark
                    ? 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md shadow-sm'
                }`}
              >
                {/* Role header & status */}
                <div
                  className={`flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b pb-4 ${
                    isDark ? 'border-white/[0.06]' : 'border-zinc-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3
                        className={`font-display text-2xl font-bold tracking-tight ${
                          isDark ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {item.role}
                      </h3>
                      {item.isCurrent && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold border ${
                            isDark
                              ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          }`}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 font-medium text-base ${
                        isDark ? 'text-purple-300/90' : 'text-indigo-600'
                      }`}
                    >
                      {item.company}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-4 text-xs font-mono ${
                      isDark ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 opacity-70" />
                      <span>{item.period}</span>
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 opacity-70" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Bullet Points */}
                <ul className="mt-5 space-y-3">
                  {item.points.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className={`flex items-start gap-3 text-sm leading-relaxed ${
                        isDark ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 mt-1 ${
                          isDark ? 'text-purple-400' : 'text-indigo-600'
                        }`}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Applied Skills Tags */}
                <div
                  className={`mt-6 pt-4 border-t flex flex-wrap items-center gap-2 ${
                    isDark ? 'border-white/[0.06]' : 'border-zinc-100'
                  }`}
                >
                  <span
                    className={`font-mono text-xs ${
                      isDark ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    Technologies Applied:
                  </span>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border ${
                        isDark
                          ? 'border-white/10 bg-white/5 text-zinc-300'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-800'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ExperienceTimeline;
