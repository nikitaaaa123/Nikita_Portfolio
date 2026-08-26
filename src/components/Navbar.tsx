import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  ChevronDown, 
  Download, 
  Eye, 
  Terminal, 
  Radio, 
  Brain,
  ExternalLink
} from 'lucide-react';
import { ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileImage } from './ProfileImage';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenResumeModal: (type: 'aiml' | 'embedded') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  onToggleTheme, 
  onOpenResumeModal 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Beyond', href: '#extracurricular', id: 'extracurricular' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResumeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark 
            ? 'bg-[#0a0e14]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' 
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-200/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Monogram */}
        <a 
          href="#home" 
          id="navbar-brand-logo"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <ProfileImage size="sm" showBadge={true} className="flex-shrink-0" />
          <div className="flex flex-col">
            <span className={`font-semibold tracking-tight text-base sm:text-lg leading-tight transition-colors ${
              isDark ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
            }`}>
              Nikita Bhansali
            </span>
            <span className="font-mono text-[10px] text-emerald-500 tracking-wider flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              AI/ML × RF/Embedded
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Desktop Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                id={`nav-link-${link.id}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? isDark
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-blue-600 bg-blue-50'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Resume Dropdown, Theme Toggle, Mobile Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Resume Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="navbar-resume-btn"
              onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-blue-500/50'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-blue-400 shadow-sm'
              }`}
              aria-expanded={isResumeDropdownOpen}
              aria-label="Resume options"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Resume</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isResumeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isResumeDropdownOpen && (
              <div 
                id="resume-dropdown-menu"
                className={`absolute right-0 mt-2 w-72 rounded-2xl p-2.5 shadow-2xl border transition-all duration-150 z-50 animate-fadeIn ${
                  isDark 
                    ? 'bg-[#0f172a] border-slate-700 text-slate-100 shadow-2xl shadow-black/80' 
                    : 'bg-white border-slate-200 text-slate-900 shadow-2xl shadow-slate-300/80'
                }`}
              >
                <div className="px-2.5 py-1.5 border-b border-slate-700/50 mb-1.5 flex items-center justify-between">
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    Select Specialization
                  </p>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                    2 Versions
                  </span>
                </div>
                
                {/* AI/ML Resume */}
                <button
                  id="resume-option-aiml"
                  onClick={() => {
                    onOpenResumeModal('aiml');
                    setIsResumeDropdownOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all cursor-pointer border group mb-1.5 ${
                    isDark 
                      ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/60 hover:bg-blue-950/40 text-slate-100' 
                      : 'bg-slate-50/90 border-slate-200 hover:border-blue-400 hover:bg-blue-50/80 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                    <Brain className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        AI/ML Resume
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-sm shrink-0">
                        PDF
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Focus on NLP, Deep Learning, Vision & Full-Stack
                    </p>
                  </div>
                </button>

                {/* Embedded/RF Resume */}
                <button
                  id="resume-option-embedded"
                  onClick={() => {
                    onOpenResumeModal('embedded');
                    setIsResumeDropdownOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all cursor-pointer border group ${
                    isDark 
                      ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/60 hover:bg-emerald-950/40 text-slate-100' 
                      : 'bg-slate-50/90 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/80 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                    <Radio className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Embedded & RF Resume
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm shrink-0">
                        PDF
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Focus on SDR, ESP32, Antennas & Signals
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 border ${
              isDark 
                ? 'bg-slate-900/90 text-amber-400 border-slate-700/80 hover:bg-slate-800 hover:border-amber-400/40' 
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border transition-all ${
              isDark 
                ? 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800' 
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
            aria-label="Toggle mobile navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-2 transition-all ${
            isDark 
              ? 'bg-[#0e141f] border-slate-800 text-slate-200' 
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="grid grid-cols-2 gap-1.5 pb-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-blue-500/20 text-blue-400 font-semibold'
                        : 'bg-blue-50 text-blue-600 font-semibold'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Mobile Resumes Quick Actions */}
          <div className="pt-2 border-t border-slate-700/40 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenResumeModal('aiml');
                setIsMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border ${
                isDark ? 'bg-blue-900/20 text-blue-400 border-blue-800/50' : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>AI/ML Resume</span>
            </button>
            <button
              onClick={() => {
                onOpenResumeModal('embedded');
                setIsMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border ${
                isDark ? 'bg-emerald-900/20 text-emerald-400 border-emerald-800/50' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>RF/Embedded Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
