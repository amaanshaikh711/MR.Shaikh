/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/navigation/Navbar';
import Hero from './components/hero/Hero';
import IdentityParticleSection from './components/hero/IdentityParticleSection';
import FeaturedProjects from './components/projects/FeaturedProjects';
import ProjectArchive from './components/projects/ProjectArchive';
import ProjectModal from './components/projects/ProjectModal';
import ExperienceTimeline from './components/experience/ExperienceTimeline';
import TechUniverse from './components/skills/TechUniverse';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import MagneticScrollToggle from './components/ui/MagneticScrollToggle';
import { Project } from './types/portfolio';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const SECTION_IDS = ['hero', 'identity', 'work', 'archive', 'experience', 'stack', 'about', 'contact'];

function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [magneticScrollEnabled, setMagneticScrollEnabled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const lenisRef = useRef<Lenis | null>(null);
  const magneticLockRef = useRef(false);
  const magneticTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  useEffect(() => {
    if (!magneticScrollEnabled || !lenisRef.current) return;

    const getSectionTargets = () =>
      SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          id,
          top: rect.top + window.scrollY,
        };
      }).filter((value): value is { id: string; top: number } => Boolean(value));

    const scrollToNearestSection = (direction: 1 | -1) => {
      if (magneticLockRef.current || !lenisRef.current) return;

      const sections = getSectionTargets();
      if (!sections.length) return;

      const currentScroll = window.scrollY;
      const currentIndex = sections.reduce(
        (index, section, sectionIndex) => (section.top <= currentScroll + 24 ? sectionIndex : index),
        0,
      );
      const targetIndex = Math.min(
        sections.length - 1,
        Math.max(0, currentIndex + direction),
      );
      if (targetIndex === currentIndex) return;

      const target = Math.max(0, sections[targetIndex].top);

      magneticLockRef.current = true;
      lenisRef.current.scrollTo(target, {
        duration: 1.15,
        immediate: false,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });

      magneticTimerRef.current = window.setTimeout(() => {
        magneticLockRef.current = false;
        magneticTimerRef.current = null;
      }, 1200);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaY) < 1) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      scrollToNearestSection(event.deltaY > 0 ? 1 : -1);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement)?.tagName)) return;

      const directionMap: Record<string, 1 | -1> = {
        ArrowDown: 1,
        PageDown: 1,
        ArrowUp: -1,
        PageUp: -1,
      };

      const direction = directionMap[event.key];
      if (!direction) return;

      event.preventDefault();
      scrollToNearestSection(direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('keydown', handleKeydown);
      if (magneticTimerRef.current !== null) {
        window.clearTimeout(magneticTimerRef.current);
        magneticTimerRef.current = null;
      }
      magneticLockRef.current = false;
    };
  }, [magneticScrollEnabled]);

  const toggleMagneticScroll = () => {
    if (magneticScrollEnabled && lenisRef.current) {
      magneticLockRef.current = false;
      if (magneticTimerRef.current !== null) {
        window.clearTimeout(magneticTimerRef.current);
        magneticTimerRef.current = null;
      }
      lenisRef.current.stop();
      lenisRef.current.scrollTo(window.scrollY, { immediate: true, force: true });
      lenisRef.current.start();
    }
    setMagneticScrollEnabled((value) => !value);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-[#060608] text-zinc-100 selection:bg-purple-500/25 selection:text-white'
          : 'bg-[#f7f7f5] text-zinc-900 selection:bg-indigo-500/25 selection:text-indigo-950'
      }`}
    >
      {/* Short Awwwards Loading Experience */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Desktop Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Pill Navigation */}
      <Navbar />

      <main className="relative flex flex-col overflow-x-clip">
        {/* Hero Section */}
        <Hero />

        {/* Dedicated Full-Width ParticleText Section */}
        <IdentityParticleSection />

        {/* Selected Work featuring Case Studies with Interactive 3D */}
        <FeaturedProjects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Project Archive with Interactive Cursor-Following Preview */}
        <ProjectArchive onSelectProject={(project) => setSelectedProject(project)} />

        {/* Cinematic Experience Timeline */}
        <ExperienceTimeline />

        {/* Interactive Tech Universe */}
        <TechUniverse />

        {/* About & Education & Accreditations (with #achievements anchor) */}
        <AboutSection />

        {/* Editorial Contact Finale */}
        <ContactSection />
      </main>

      {/* Detailed Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <MagneticScrollToggle
        enabled={magneticScrollEnabled}
        onToggle={toggleMagneticScroll}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
