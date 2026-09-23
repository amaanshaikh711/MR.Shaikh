import React, { useState } from 'react';
import { ArrowDown, Github, Linkedin, Twitter, MapPin, Sparkles, Copy, Check } from 'lucide-react';
import { Waves } from '../react-bits/Waves';
import { Scene3D } from '../three/Scene3D';
import { Magnetic } from '../react-bits/Magnetic';
import { SplitText } from '../react-bits/SplitText';
import { useTheme } from '../../context/ThemeContext';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen w-full overflow-hidden pt-28 pb-16 flex flex-col justify-between transition-colors ${
        isDark ? 'bg-[#060608]' : 'bg-[#f7f7f5]'
      }`}
    >
      {/* React Bits Waves Hero Background with Active Cursor Physics */}
      <Waves
        lineColor={isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(24, 24, 27, 0.20)'}
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />

      {/* Subtle radial ambient glow behind hero */}
      <div
        className={`pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-opacity duration-500 ${
          isDark ? 'bg-purple-600/10' : 'bg-indigo-400/10'
        }`}
      />
      <div
        className={`pointer-events-none absolute top-1/3 right-10 h-[350px] w-[350px] rounded-full blur-[110px] transition-opacity duration-500 ${
          isDark ? 'bg-cyan-600/10' : 'bg-sky-400/10'
        }`}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10 my-auto">
        {/* Top availability & location metadata */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 border-b pb-6 transition-colors ${
            isDark ? 'border-white/[0.08]' : 'border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span
              className={`font-mono text-xs uppercase tracking-widest ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              AVAILABLE FOR SELECT ROLES & INITIATIVES
            </span>
          </div>

          <div
            className={`flex items-center gap-4 text-xs font-mono ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 opacity-70" />
              <span>Mumbai, India</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Giga Nexus Tech</span>
          </div>
        </div>

        {/* Hero Section Grid: Typography + Interactive 3D Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 md:pt-14">
          <div className="lg:col-span-8">
            <p
              className={`font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2 font-semibold ${
                isDark ? 'text-purple-400' : 'text-indigo-600'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>DIGITAL ARCHITECTURE & APPLIED AI</span>
            </p>

            <h1
              className={`font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight leading-[0.92] select-none ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              <span className="block">
                <SplitText text="AMAN" delay={40} />
              </span>
              <span
                className={`block transition-colors duration-500 ml-10 sm:ml-20 md:ml-32 lg:ml-48 ${
                  isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-950'
                }`}
              >
                <SplitText text="SHAIKH" delay={40} />
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className={`h-[2px] w-8 ${isDark ? 'bg-purple-400' : 'bg-indigo-600'}`} />
              <p
                className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight ${
                  isDark ? 'text-zinc-200' : 'text-zinc-800'
                }`}
              >
                Software Developer & AI Specialist
              </p>
            </div>

            <p
              className={`mt-5 max-w-2xl text-base sm:text-lg leading-relaxed font-sans font-light ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Designing and building intelligent web applications and production ML pipelines. Focused on clean architecture,
              responsive real-estate platforms, and high-retention user interfaces.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic intensity={0.25}>
                <a
                  href="#work"
                  className={`group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all active:scale-95 ${
                    isDark
                      ? 'bg-white text-black hover:bg-zinc-200 shadow-xl shadow-purple-500/10'
                      : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/15'
                  }`}
                >
                  <span>Explore Selected Work</span>
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>

              <Magnetic intensity={0.2}>
                <button
                  onClick={copyEmail}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-sm font-medium transition-all ${
                    isDark
                      ? 'border-white/15 bg-white/[0.04] text-zinc-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white'
                      : 'border-zinc-300 bg-white/80 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-100'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Copied email!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 opacity-70" />
                      <span>skhamaan7@gmail.com</span>
                    </>
                  )}
                </button>
              </Magnetic>

              {/* Social Links */}
              <div className="flex items-center gap-2 ml-auto sm:ml-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                    isDark
                      ? 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:bg-white/[0.08] hover:text-white'
                      : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950 shadow-sm'
                  }`}
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                    isDark
                      ? 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:bg-white/[0.08] hover:text-white'
                      : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950 shadow-sm'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                    isDark
                      ? 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:bg-white/[0.08] hover:text-white'
                      : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950 shadow-sm'
                  }`}
                  aria-label="Twitter Profile"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive 3D Spatial Canvas */}
          <div className="hidden lg:flex lg:col-span-4 h-96 items-center justify-center relative">
            <div className="w-full h-full relative">
              <Scene3D variant="hero" className="w-full h-full" />
              <div
                className={`absolute bottom-2 right-4 font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'border-white/10 bg-black/40 text-zinc-500'
                    : 'border-zinc-200 bg-white/70 text-zinc-500'
                }`}
              >
                INTERACTIVE 3D · R3F
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Proof Stats */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10 mt-12">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t ${
            isDark ? 'border-white/[0.08]' : 'border-zinc-200'
          }`}
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span
                className={`font-mono text-[11px] uppercase tracking-wider ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {stat.label}
              </span>
              <span
                className={`mt-1 font-display text-sm md:text-base font-semibold ${
                  isDark ? 'text-zinc-200' : 'text-zinc-900'
                }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
