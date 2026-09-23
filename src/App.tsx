/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { Project } from './types/portfolio';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

      <main className="relative flex flex-col">
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
