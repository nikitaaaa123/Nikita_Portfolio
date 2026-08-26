/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Extracurricular } from './components/Extracurricular';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  // Dark mode by default, state-managed
  const [theme, setTheme] = useState<ThemeMode>('dark');
  
  // Resume modal state
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeType, setResumeType] = useState<'aiml' | 'embedded'>('aiml');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenResumeModal = (type: 'aiml' | 'embedded') => {
    setResumeType(type);
    setIsResumeModalOpen(true);
  };

  // Sync body styling when theme toggles
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-white', 'text-slate-900');
      document.body.classList.add('bg-[#0a0e14]', 'text-slate-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-[#0a0e14]', 'text-slate-100');
      document.body.classList.add('bg-white', 'text-slate-900');
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <div 
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0a0e14] text-slate-100' : 'bg-[#fcfdfd] text-slate-900'
      }`}
    >
      {/* Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResumeModal={handleOpenResumeModal}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero theme={theme} />

        {/* 2. About Section */}
        <About theme={theme} />

        {/* 3. Skills Section */}
        <Skills theme={theme} />

        {/* 4. Experience Section */}
        <Experience theme={theme} />

        {/* 5. Projects Section */}
        <Projects theme={theme} />

        {/* 6. Certifications Section */}
        <Certifications theme={theme} />

        {/* 7. Extracurricular Section */}
        <Extracurricular theme={theme} />

        {/* 8. Contact Section */}
        <Contact theme={theme} />
      </main>

      {/* Footer */}
      <Footer 
        theme={theme} 
        onOpenResumeModal={handleOpenResumeModal} 
      />

      {/* Interactive Dual-Resume Modal Viewer */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        initialType={resumeType}
        theme={theme}
      />
    </div>
  );
}
