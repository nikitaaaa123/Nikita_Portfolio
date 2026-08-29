/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  User, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Flame, 
  Mail 
} from 'lucide-react';
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
import { StackedDeckContainer, SectionCard } from './components/StackedDeckContainer';
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

  // Modal open class sync for preventing scroll conflicts
  useEffect(() => {
    if (isResumeModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isResumeModalOpen]);

  const isDark = theme === 'dark';

  // Define Stacked Sections Cards
  const sections: SectionCard[] = [
    {
      id: 'home',
      number: '01',
      name: 'Hero & Engineering Console',
      shortName: 'Home',
      icon: <Sparkles className="w-4 h-4" />,
      component: (
        <Hero 
          theme={theme} 
          onNavigateToProjects={() => setActiveSectionIndex(4)}
          onOpenResumeModal={handleOpenResumeModal}
        />
      ),
    },
    {
      id: 'about',
      number: '02',
      name: 'Background & Dual-Domain Focus',
      shortName: 'About',
      icon: <User className="w-4 h-4" />,
      component: (
        <div className="pt-16 sm:pt-20 pb-16">
          <About theme={theme} />
        </div>
      ),
    },
    {
      id: 'skills',
      number: '03',
      name: 'Technical Architecture & Stack',
      shortName: 'Skills',
      icon: <Cpu className="w-4 h-4" />,
      component: (
        <div className="pt-16 sm:pt-20 pb-16">
          <Skills theme={theme} />
        </div>
      ),
    },
    {
      id: 'experience',
      number: '04',
      name: 'Engineering Roles & Timeline',
      shortName: 'Experience',
      icon: <Briefcase className="w-4 h-4" />,
      component: (
        <div className="pt-16 sm:pt-20 pb-16">
          <Experience theme={theme} />
        </div>
      ),
    },
    {
      id: 'projects',
      number: '05',
      name: 'Intelligent Software & RF Systems',
      shortName: 'Projects',
      icon: <FolderGit2 className="w-4 h-4" />,
      component: (
        <div className="pt-16 sm:pt-20 pb-16">
          <Projects theme={theme} />
        </div>
      ),
    },
    {
      id: 'certifications',
      number: '06',
      name: 'Credentials & Verifications',
      shortName: 'Certs',
      icon: <Award className="w-4 h-4" />,
      component: (
        <div className="pt-16 sm:pt-20 pb-16">
          <Certifications theme={theme} />
        </div>
      ),
    },
    {
      id: 'extracurricular',
      number: '07',
      name: 'Leadership, Competitions & Beyond',
      shortName: 'Beyond',
      icon: <Flame className="w-4 h-4" />,
      component: (
        <div className="pt-16 sm:pt-20 pb-16">
          <Extracurricular theme={theme} />
        </div>
      ),
    },
    {
      id: 'contact',
      number: '08',
      name: 'Direct Contact & Inquiries',
      shortName: 'Contact',
      icon: <Mail className="w-4 h-4" />,
      component: (
        <div className="pt-16 sm:pt-20 pb-10 flex flex-col justify-between min-h-screen">
          <Contact theme={theme} />
          <Footer 
            theme={theme} 
            onOpenResumeModal={handleOpenResumeModal} 
          />
        </div>
      ),
    },
  ];

  return (
    <div 
      className={`min-h-screen font-sans transition-colors duration-300 relative selection:bg-blue-500 selection:text-white ${
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
        onSelectSection={(index) => setActiveSectionIndex(index)}
      />

      {/* Stacked Card Deck Sections */}
      <main className="w-full h-screen">
        <StackedDeckContainer
          sections={sections}
          theme={theme}
          activeSectionIndex={activeSectionIndex}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      </main>

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
