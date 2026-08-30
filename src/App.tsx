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
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  // Dark mode by default, state-managed
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('nikita_portfolio_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  
  // Resume modal state
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeType, setResumeType] = useState<'aiml' | 'embedded'>('aiml');

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('nikita_portfolio_theme', next);
      return next;
    });
  };

  const handleOpenResumeModal = (type: 'aiml' | 'embedded') => {
    setResumeType(type);
    setIsResumeModalOpen(true);
  };

  // Ensure website always opens at the very top on load/reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Sync body styling when theme toggles
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-white', 'text-slate-900');
      document.body.classList.add('bg-[#0a0e14]', 'text-slate-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-[#0a0e14]', 'text-slate-100');
      document.body.classList.add('bg-[#fcfdfd]', 'text-slate-900');
    }
  }, [theme]);

  // Modal open class sync for preventing background scroll conflicts
  useEffect(() => {
    if (isResumeModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isResumeModalOpen]);

  // Track active section automatically as user naturally scrolls
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'experience',
      'projects',
      'certifications',
      'extracurricular',
      'contact'
    ];

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const idx = sectionIds.indexOf(id || '');
          if (idx !== -1) {
            setActiveSectionIndex(idx);
          }
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const sectionIds = [
    'home',
    'about',
    'skills',
    'experience',
    'projects',
    'certifications',
    'extracurricular',
    'contact'
  ];

  const handleSelectSection = (index: number) => {
    setActiveSectionIndex(index);
    const targetId = sectionIds[index];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isDark = theme === 'dark';

  // Sections List
  const sections = [
    {
      id: 'home',
      component: (
        <Hero 
          theme={theme} 
          onNavigateToProjects={() => handleSelectSection(4)}
          onOpenResumeModal={handleOpenResumeModal}
        />
      ),
    },
    {
      id: 'about',
      component: <About theme={theme} />,
    },
    {
      id: 'skills',
      component: <Skills theme={theme} />,
    },
    {
      id: 'experience',
      component: <Experience theme={theme} />,
    },
    {
      id: 'projects',
      component: <Projects theme={theme} />,
    },
    {
      id: 'certifications',
      component: <Certifications theme={theme} />,
    },
    {
      id: 'extracurricular',
      component: <Extracurricular theme={theme} />,
    },
    {
      id: 'contact',
      component: <Contact theme={theme} />,
    },
  ];

  return (
    <div 
      className={`min-h-screen w-full font-sans transition-colors duration-300 relative selection:bg-blue-500 selection:text-white ${
        isDark ? 'bg-[#0a0e14] text-slate-100' : 'bg-[#fcfdfd] text-slate-900'
      }`}
    >
      {/* Custom Precision Follower Cursor */}
      <CustomCursor />

      {/* Persistent Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResumeModal={handleOpenResumeModal}
        activeSectionIndex={activeSectionIndex}
        onSelectSection={handleSelectSection}
      />

      {/* Native Standard Scrolling Layout */}
      <main className="w-full flex flex-col">
        {sections.map((section) => (
          <React.Fragment key={section.id}>
            {section.component}
          </React.Fragment>
        ))}
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

