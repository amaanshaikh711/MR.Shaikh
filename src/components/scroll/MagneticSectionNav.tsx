import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnet, ChevronDown, ChevronUp } from 'lucide-react';
import { useMagnetic, SECTIONS } from './MagneticScrollManager';

export const MagneticSectionNav: React.FC = () => {
  const {
    activeSectionId,
    activeSectionIndex,
    magneticSnapEnabled,
    toggleMagneticSnap,
    scrollToSection,
    scrollToNext,
    scrollToPrev,
  } = useMagnetic();

  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <>
      {/* Floating Vertical Section Rail (Desktop only: lg+) */}
      <aside
        aria-label="Section Navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-auto"
      >
        <div className="flex flex-col items-center gap-2.5 rounded-full border border-white/[0.08] bg-black/60 p-2 backdrop-blur-xl shadow-2xl shadow-black/80">
          {SECTIONS.map((sec, idx) => {
            const isActive = sec.id === activeSectionId;
            const isHovered = sec.id === hoveredId;

            return (
              <div
                key={sec.id}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredId(sec.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Tooltip on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.92 }}
                      animate={{ opacity: 1, x: -14, scale: 1 }}
                      exit={{ opacity: 0, x: 4, scale: 0.94 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-full top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-zinc-950/90 px-3 py-1.5 font-mono text-xs shadow-xl pointer-events-none z-50 flex items-center gap-2"
                    >
                      <span className="text-purple-400 font-bold">{sec.number}</span>
                      <span className="text-zinc-200">{sec.label}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dot Trigger */}
                <button
                  onClick={() => scrollToSection(sec.id)}
                  className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform active:scale-75"
                  aria-label={`Scroll to ${sec.label}`}
                >
                  {/* Subtle hover ring */}
                  <span
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-400 scale-125 shadow-[0_0_12px_rgba(168,85,247,0.8)]'
                        : 'bg-zinc-600 group-hover:bg-zinc-300 group-hover:scale-110'
                    }`}
                  />

                  {/* Active Spring Halo */}
                  {isActive && (
                    <motion.span
                      layoutId="magnetic-halo"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-full border border-purple-400/50"
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Tactile Magnetic HUD Capsule (Bottom-Right, subtle) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-3.5 py-1.5 text-[11px] font-mono backdrop-blur-xl shadow-xl shadow-black/60">
        <button
          onClick={toggleMagneticSnap}
          className={`flex items-center gap-1.5 transition-colors ${
            magneticSnapEnabled
              ? 'text-purple-400 hover:text-purple-300'
              : 'text-zinc-500 hover:text-zinc-400'
          }`}
          title="Toggle proximity magnetic snapping (or press 'M')"
        >
          <Magnet
            className={`h-3 w-3 transition-transform ${
              magneticSnapEnabled ? 'rotate-12 text-purple-400' : 'opacity-40'
            }`}
          />
          <span className="font-semibold tracking-wider">
            MAGNETIC {magneticSnapEnabled ? 'ON' : 'OFF'}
          </span>
        </button>

        <span className="text-zinc-700">·</span>

        <span className="text-zinc-400 font-semibold">
          {SECTIONS[activeSectionIndex]?.number} / {SECTIONS.length.toString().padStart(2, '0')}
        </span>

        <div className="flex items-center gap-0.5 ml-1 border-l border-white/10 pl-2">
          <button
            onClick={scrollToPrev}
            className="p-0.5 text-zinc-400 hover:text-white transition disabled:opacity-30"
            disabled={activeSectionIndex === 0}
            title="Previous section (K)"
            aria-label="Previous section"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={scrollToNext}
            className="p-0.5 text-zinc-400 hover:text-white transition disabled:opacity-30"
            disabled={activeSectionIndex === SECTIONS.length - 1}
            title="Next section (J)"
            aria-label="Next section"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MagneticSectionNav;
