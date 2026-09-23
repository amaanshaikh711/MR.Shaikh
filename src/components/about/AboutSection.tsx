import React from 'react';
import { Trophy, GraduationCap, Github, ArrowUpRight, Compass } from 'lucide-react';
import { PERSONAL_INFO, ACHIEVEMENTS, EDUCATION } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import avatarImage from '../../assets/images/aman_profile_avatar.jpg';
import ScrollReveal from '../ui/ScrollReveal';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ScrollReveal
      id="about"
      className={`relative w-full py-24 border-t transition-colors ${
        isDark ? 'bg-[#060608] border-white/[0.06]' : 'bg-[#f7f7f5] border-zinc-200'
      }`}
      x={32}
      duration={0.75}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Section Header */}
        <div
          className={`flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-3 font-semibold ${
            isDark ? 'text-purple-400' : 'text-indigo-600'
          }`}
        >
          <Compass className="h-3.5 w-3.5" />
          <span>ORIGIN & PHILOSOPHY</span>
        </div>

        {/* Editorial Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          <div className="lg:col-span-7 space-y-6">
            <h2
              className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Obsessively Shipping at the Edge of Web & AI
            </h2>

            <div
              className={`space-y-4 text-base sm:text-lg leading-relaxed font-sans ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {PERSONAL_INFO.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* GitHub Callout Card */}
            <div
              className={`mt-8 rounded-2xl border p-6 backdrop-blur-sm transition-colors ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.02]'
                  : 'border-zinc-200 bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isDark
                        ? 'bg-white/10 text-white'
                        : 'bg-zinc-100 text-zinc-900 border border-zinc-200'
                    }`}
                  >
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <h4
                      className={`font-display text-base font-bold ${
                        isDark ? 'text-white' : 'text-zinc-900'
                      }`}
                    >
                      @amaanshaikh711
                    </h4>
                    <p
                      className={`text-xs ${
                        isDark ? 'text-zinc-400' : 'text-zinc-500'
                      }`}
                    >
                      Open-source contributions & code repositories
                    </p>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-mono transition ${
                    isDark
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  <span>Explore GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Photo & Quick Highlights */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div
              className={`group relative overflow-hidden rounded-3xl border p-6 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-500 ${
                isDark
                  ? 'border-white/15 bg-gradient-to-b from-[#0e0e18] to-[#08080c] hover:border-purple-500/30'
                  : 'border-zinc-200 bg-gradient-to-b from-white to-[#f4f4f0] shadow-zinc-300/30 hover:border-zinc-300'
              }`}
            >
              {/* Cosmic circular avatar with soft glow */}
              <div
                className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 shadow-[0_0_50px_rgba(99,102,241,0.25)] ${
                  isDark
                    ? 'bg-gradient-to-tr from-purple-500/40 via-blue-500/40 to-cyan-400/40'
                    : 'bg-gradient-to-tr from-indigo-300 via-sky-300 to-purple-300'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-black/40">
                  <img
                    src={avatarImage}
                    alt="Aman Shaikh Profile Avatar"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div
                className={`mt-5 w-full flex items-center justify-between border-t pt-4 px-2 ${
                  isDark ? 'border-white/[0.08]' : 'border-zinc-200'
                }`}
              >
                <div className="text-left">
                  <p
                    className={`font-display font-bold text-lg ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {PERSONAL_INFO.name}
                  </p>
                  <p
                    className={`font-mono text-xs ${
                      isDark ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    {PERSONAL_INFO.location}
                  </p>
                </div>
                <span
                  className={`font-mono text-xs rounded-full border px-3 py-1 ${
                    isDark
                      ? 'text-purple-400 border-purple-500/30 bg-purple-500/10'
                      : 'text-indigo-700 border-indigo-200 bg-indigo-50'
                  }`}
                >
                  DEV · ML · ARCH
                </span>
              </div>
            </div>

            {/* Education Summary */}
            <div
              className={`rounded-2xl border p-6 backdrop-blur-sm transition-colors ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.015]'
                  : 'border-zinc-200 bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <GraduationCap
                  className={`h-4 w-4 ${
                    isDark ? 'text-cyan-400' : 'text-sky-600'
                  }`}
                />
                <h4
                  className={`font-display text-sm font-bold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  Academic Foundation
                </h4>
              </div>
              {EDUCATION.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between">
                    <p
                      className={`font-display font-semibold ${
                        isDark ? 'text-zinc-200' : 'text-zinc-900'
                      }`}
                    >
                      {edu.degree}
                    </p>
                    <span
                      className={`font-mono text-xs ${
                        isDark ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-0.5 ${
                      isDark ? 'text-purple-300/80' : 'text-indigo-600'
                    }`}
                  >
                    {edu.institution} · {edu.location}
                  </p>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated Achievements Section with anchor for Navbar */}
        <div
          id="achievements"
          className={`mt-20 pt-12 border-t scroll-mt-24 transition-colors ${
            isDark ? 'border-white/[0.08]' : 'border-zinc-200'
          }`}
        >
          <div className="mb-8">
            <h3
              className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              <span>Achievements & Accreditations</span>
              <span role="img" aria-label="trophy">🏆</span>
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Recognitions across national hackathons, technical trainings, and competitive engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {ACHIEVEMENTS.map((item, idx) => (
              <div
                key={idx}
                className={`group flex items-center gap-4 rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                  isDark
                    ? 'border-white/[0.08] bg-[#0c0c12] hover:border-white/20 hover:bg-[#12121c] hover:shadow-xl hover:shadow-purple-500/5'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md shadow-sm'
                }`}
              >
                {/* Circular Trophy Badge */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isDark
                      ? 'bg-white/[0.05] border-white/[0.08] text-zinc-300 group-hover:text-amber-400 group-hover:border-amber-500/30 group-hover:bg-amber-500/10'
                      : 'bg-amber-50 border-amber-200 text-amber-700 group-hover:bg-amber-100 group-hover:text-amber-800'
                  }`}
                >
                  <Trophy className="h-5 w-5" />
                </div>

                {/* Achievement Details */}
                <div className="min-w-0">
                  <p
                    className={`font-display text-base font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`text-sm mt-0.5 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    {item.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default AboutSection;
