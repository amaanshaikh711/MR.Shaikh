import React, { useState } from 'react';
import ParticleText from '../react-bits/ParticleText';
import GridScan from '../react-bits/GridScan';
import { Sparkles, RefreshCw, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const IdentityParticleSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const titles = [
    'Software Developer',
    'AI Specialist',
    'Full-Stack Engineer',
    'Systems Architect',
  ];
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNextTitle = () => {
    setCurrentIdx((prev) => (prev + 1) % titles.length);
  };

  return (
    <section
      id="identity"
      className={`relative w-full border-y py-14 overflow-hidden transition-colors ${
        isDark
          ? 'border-white/[0.08] bg-[#09090f]'
          : 'border-zinc-200 bg-[#f4f4f0]'
      }`}
    >
      {/* GridScan — official React Bits WebGL background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#C179FE"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          enableGyro={false}
          scanOnClick={false}
          lightMode={!isDark}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {/* Eyebrow and Interactive Hint */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${
            isDark ? 'border-white/[0.06]' : 'border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                isDark
                  ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-600'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <p
                className={`font-mono text-xs sm:text-sm font-bold tracking-widest uppercase ${
                  isDark ? 'text-purple-400' : 'text-indigo-600'
                }`}
              >
                SOFTWARE DEVELOPER & AI SPECIALIST
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`hidden sm:inline font-mono text-[11px] ${
                isDark ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              HOVER / DRAG TO REPEL PARTICLES
            </span>
            <button
              onClick={handleNextTitle}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-mono transition ${
                isDark
                  ? 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-purple-400/40 hover:bg-white/[0.08] hover:text-white'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-indigo-400 hover:text-zinc-950 shadow-sm'
              }`}
              title="Cycle title role"
            >
              <RefreshCw
                className={`h-3 w-3 ${isDark ? 'text-purple-400' : 'text-indigo-600'}`}
              />
              <span>Shift Persona</span>
            </button>
          </div>
        </div>

        {/* Dedicated Full-Width ParticleText Canvas Container */}
        <div className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] flex items-center justify-center my-4 overflow-hidden rounded-2xl">
          <ParticleText
            key={`${titles[currentIdx]}-${theme}`}
            text={titles[currentIdx]}
            particleSize={2.2}
            density={3.8}
            color={isDark ? '#ffffff' : '#18181b'}
            highlightColor={isDark ? '#8b5cf6' : '#4f46e5'}
            scatter={180}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={42}
            repelRadius={125}
            idleDrift={0.7}
            trigger="hover"
            fontSize="clamp(2.6rem, 7.5vw, 6.5rem)"
            fontWeight={800}
            fontFamily="'Satoshi', sans-serif"
            glow={isDark}
          />
        </div>

        {/* Bottom Technical Spec strip */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t pt-5 font-mono text-xs ${
            isDark ? 'border-white/[0.06] text-zinc-500' : 'border-zinc-200 text-zinc-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 opacity-70" />
            <span>Interactive Particle Text Canvas</span>
            <span>·</span>
            <span>Physics Vector Repulsion & Stagger Gathering</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] opacity-75">
            <span>DENSITY: 4PX</span>
            <span>·</span>
            <span>GLYPH SAMPLE CACHE</span>
            <span>·</span>
            <span>DPR 2.0 ACCELERATED</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentityParticleSection;
