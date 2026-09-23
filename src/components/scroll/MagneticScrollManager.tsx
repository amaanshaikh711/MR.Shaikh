import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

export interface SectionMeta {
  id: string;
  label: string;
  number: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'hero', label: 'Intro & Role', number: '01' },
  { id: 'identity', label: 'Neural Identity', number: '02' },
  { id: 'work', label: 'Featured Builds', number: '03' },
  { id: 'archive', label: 'Archive & Labs', number: '04' },
  { id: 'experience', label: 'Experience', number: '05' },
  { id: 'skills', label: 'Tech Universe', number: '06' },
  { id: 'about', label: 'About & Metrics', number: '07' },
  { id: 'contact', label: 'Transmission', number: '08' },
];

interface MagneticContextType {
  activeSectionId: string;
  activeSectionIndex: number;
  magneticSnapEnabled: boolean;
  toggleMagneticSnap: () => void;
  scrollToSection: (id: string) => void;
  scrollToNext: () => void;
  scrollToPrev: () => void;
}

const MagneticContext = createContext<MagneticContextType>({
  activeSectionId: 'hero',
  activeSectionIndex: 0,
  magneticSnapEnabled: true,
  toggleMagneticSnap: () => {},
  scrollToSection: () => {},
  scrollToNext: () => {},
  scrollToPrev: () => {},
});

export const useMagnetic = () => useContext(MagneticContext);

export const MagneticScrollManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [magneticSnapEnabled, setMagneticSnapEnabled] = useState<boolean>(true);
  const isSnappingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const userIsScrollingRef = useRef<boolean>(false);

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeSectionId)
  );

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    isSnappingRef.current = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSectionId(id);
    setTimeout(() => {
      isSnappingRef.current = false;
    }, 850);
  }, []);

  const scrollToNext = useCallback(() => {
    const nextIdx = Math.min(activeIndex + 1, SECTIONS.length - 1);
    scrollToSection(SECTIONS[nextIdx].id);
  }, [activeIndex, scrollToSection]);

  const scrollToPrev = useCallback(() => {
    const prevIdx = Math.max(activeIndex - 1, 0);
    scrollToSection(SECTIONS[prevIdx].id);
  }, [activeIndex, scrollToSection]);

  // Track active section and trigger gentle proximity snap when scrolling pauses
  useEffect(() => {
    const handleScroll = () => {
      lastScrollTimeRef.current = Date.now();
      userIsScrollingRef.current = true;

      // Find currently visible section closest to viewport top/center
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let currentBest = SECTIONS[0].id;
      let minDistance = Infinity;

      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const top = el.offsetTop;
        const dist = Math.abs(scrollPos - top);
        if (dist < minDistance) {
          minDistance = dist;
          currentBest = sec.id;
        }
      }

      if (currentBest !== activeSectionId) {
        setActiveSectionId(currentBest);
      }

      // Magnetic gentle snapping when user finishes/pauses scroll near an anchor
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      if (magneticSnapEnabled && !isSnappingRef.current) {
        scrollTimeoutRef.current = window.setTimeout(() => {
          userIsScrollingRef.current = false;
          // Check proximity to target section top
          const activeEl = document.getElementById(currentBest);
          if (!activeEl) return;

          const currentY = window.scrollY;
          const targetY = activeEl.offsetTop - 30; // subtle offset under fixed navbar
          const delta = Math.abs(currentY - targetY);

          // If within gentle magnetic pull zone (40px to 160px), snap gently
          if (delta > 35 && delta < 170) {
            isSnappingRef.current = true;
            window.scrollTo({
              top: Math.max(0, targetY),
              behavior: 'smooth',
            });
            setTimeout(() => {
              isSnappingRef.current = false;
            }, 600);
          }
        }, 140);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [magneticSnapEnabled, activeSectionId]);

  // Keyboard navigation shortcuts: J (down), K (up), M (toggle magnetic)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        scrollToNext();
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        scrollToPrev();
      } else if (e.key === 'm' || e.key === 'M') {
        setMagneticSnapEnabled((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToNext, scrollToPrev]);

  return (
    <MagneticContext.Provider
      value={{
        activeSectionId,
        activeSectionIndex: activeIndex,
        magneticSnapEnabled,
        toggleMagneticSnap: () => setMagneticSnapEnabled((prev) => !prev),
        scrollToSection,
        scrollToNext,
        scrollToPrev,
      }}
    >
      {children}
    </MagneticContext.Provider>
  );
};
