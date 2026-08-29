import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Sparkles, 
  Cpu, 
  Brain, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Flame, 
  Mail
} from 'lucide-react';
import { ThemeMode } from '../types';

interface SectionInfo {
  id: string;
  name: string;
  shortName: string;
  number: string;
  icon: React.ReactNode;
}

const SECTIONS: SectionInfo[] = [
  { id: 'home', name: 'Overview & Persona', shortName: 'Hero', number: '01', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'about', name: 'Philosophy & Dual Core', shortName: 'About', number: '02', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'skills', name: 'Capabilities & Stack', shortName: 'Skills', number: '03', icon: <Brain className="w-3.5 h-3.5" /> },
  { id: 'experience', name: 'Industry & SDLC', shortName: 'Experience', number: '04', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'projects', name: 'Systems & Hardware', shortName: 'Projects', number: '05', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
  { id: 'certifications', name: 'Credentials & Badges', shortName: 'Certifications', number: '06', icon: <Award className="w-3.5 h-3.5" /> },
  { id: 'extracurricular', name: 'Leadership & Streaks', shortName: 'Beyond', number: '07', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'contact', name: 'Direct Dispatch Hub', shortName: 'Contact', number: '08', icon: <Mail className="w-3.5 h-3.5" /> },
];

interface ScrollPresentationHUDProps {
  theme: ThemeMode;
}

export const ScrollPresentationHUD: React.FC<ScrollPresentationHUDProps> = ({ theme }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavigatorMenu, setShowNavigatorMenu] = useState(false);

  const isDark = theme === 'dark';
  const activeIndexRef = useRef(0);

  // Sync ref with state
  useEffect(() => {
    activeIndexRef.current = activeSectionIndex;
  }, [activeSectionIndex]);

  // Track active section and overall scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine which section is currently centered/in view
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentIndex = 0;

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentIndex = i;
          }
        }
      }

      setActiveSectionIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation shortcuts (Down/Up, J/K, numbers 1-8)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSection(Math.min(activeSectionIndex + 1, SECTIONS.length - 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSection(Math.max(activeSectionIndex - 1, 0));
      } else if (e.key >= '1' && e.key <= '8') {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < SECTIONS.length) {
          e.preventDefault();
          scrollToSection(idx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex]);

  const scrollToSection = (index: number) => {
    const target = SECTIONS[index];
    if (target) {
      const el = document.getElementById(target.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSectionIndex(index);
        activeIndexRef.current = index;
      }
    }
  };

  const handleNextSection = () => {
    if (activeSectionIndex < SECTIONS.length - 1) {
      scrollToSection(activeSectionIndex + 1);
    } else {
      scrollToSection(0);
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIndex > 0) {
      scrollToSection(activeSectionIndex - 1);
    }
  };

  const currentSection = SECTIONS[activeSectionIndex] || SECTIONS[0];

  return (
    <>
      {/* Top Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Section Navigation HUD (Right Side Dock on Desktop) */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2.5">
        
        {/* Floating Mini-Map Dots with Tooltip */}
        <div className={`p-2 rounded-2xl border backdrop-blur-xl flex flex-col gap-2 shadow-2xl transition-all ${
          isDark 
            ? 'bg-[#0a0e14]/85 border-slate-800/90 shadow-black/50' 
            : 'bg-white/90 border-slate-200/90 shadow-slate-300/40'
        }`}>
          {SECTIONS.map((sec, idx) => {
            const isActive = activeSectionIndex === idx;

            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(idx)}
                className="group relative flex items-center justify-center p-1.5 rounded-xl transition-all cursor-pointer"
                title={`${sec.number} - ${sec.name}`}
              >
                {/* Active Glowing Dot / Line Indicator */}
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'w-6 h-2 bg-gradient-to-r from-blue-500 to-violet-500 shadow-md shadow-blue-500/50' 
                      : isDark ? 'w-2 h-2 bg-slate-700 hover:bg-slate-400 group-hover:scale-125' : 'w-2 h-2 bg-slate-300 hover:bg-slate-500 group-hover:scale-125'
                  }`}
                />

                {/* Floating Tooltip Tag on Hover */}
                <div className={`absolute right-9 px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 border shadow-lg ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <span className="text-blue-500 font-bold mr-1.5">{sec.number}</span>
                  <span>{sec.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Up / Down Fast Gliders */}
        <div className={`p-1.5 rounded-xl border backdrop-blur-xl flex flex-col gap-1 shadow-lg ${
          isDark ? 'bg-[#0a0e14]/85 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}>
          <button
            onClick={handlePrevSection}
            disabled={activeSectionIndex === 0}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              activeSectionIndex === 0 
                ? 'opacity-30 cursor-not-allowed' 
                : isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Previous Section (Key: ↑ or K)"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextSection}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Next Section (Key: ↓ or J)"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Center Command HUD */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[94vw] sm:max-w-none">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all ${
            isDark 
              ? 'bg-[#0e1420]/95 border-slate-800/90 shadow-black/60 text-slate-100' 
              : 'bg-white/95 border-slate-200/90 shadow-slate-300/60 text-slate-900'
          }`}
        >
          {/* Active Section Badge with Selector */}
          <button
            onClick={() => setShowNavigatorMenu(!showNavigatorMenu)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50' 
                : 'bg-slate-100 border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="p-1 rounded-lg bg-blue-500/10 text-blue-500">
              {currentSection.icon}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
                Section {currentSection.number}
              </div>
              <div className="font-semibold truncate max-w-[130px]">
                {currentSection.shortName}
              </div>
            </div>
            <div className="text-left sm:hidden font-semibold">
              {currentSection.number} {currentSection.shortName}
            </div>
            <Compass className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showNavigatorMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Glide to Next Section Main Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNextSection}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <span>{activeSectionIndex === SECTIONS.length - 1 ? 'Top' : 'Next Section'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Section Quick-Jump Menu (When Compass Clicked) */}
      <AnimatePresence>
        {showNavigatorMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm rounded-2xl border p-3 backdrop-blur-2xl shadow-2xl ${
              isDark ? 'bg-[#0e1420]/95 border-slate-800 shadow-black/80' : 'bg-white/95 border-slate-200 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/40 px-2">
              <span className="text-[11px] font-mono font-bold text-blue-500 uppercase tracking-wider">
                Direct Section Navigator
              </span>
              <span className="text-[10px] font-mono text-slate-400">Keys: 1 - 8</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {SECTIONS.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    scrollToSection(idx);
                    setShowNavigatorMenu(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-mono text-left transition-all cursor-pointer ${
                    activeSectionIndex === idx
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : isDark 
                        ? 'hover:bg-slate-800/80 text-slate-300' 
                        : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="text-[10px] opacity-70">{sec.number}</span>
                  <span className="truncate">{sec.shortName}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
