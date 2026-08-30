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
  activeSectionIndex?: number;
  onSelectSection?: (index: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  onToggleTheme, 
  onOpenResumeModal,
  activeSectionIndex = 0,
  onSelectSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', index: 0 },
    { name: 'About', href: '#about', id: 'about', index: 1 },
    { name: 'Skills', href: '#skills', id: 'skills', index: 2 },
    { name: 'Experience', href: '#experience', id: 'experience', index: 3 },
    { name: 'Projects', href: '#projects', id: 'projects', index: 4 },
    { name: 'Certifications', href: '#certifications', id: 'certifications', index: 5 },
    { name: 'Beyond', href: '#extracurricular', id: 'extracurricular', index: 6 },
    { name: 'Contact', href: '#contact', id: 'contact', index: 7 },
  ];

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

  const handleLinkClick = (e: React.MouseEvent, index: number) => {
    if (onSelectSection) {
      e.preventDefault();
      onSelectSection(index);
    }
  };

  const isDark = theme === 'dark';

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark 
          ? 'bg-[#0e0c1a]/90 backdrop-blur-md border-b border-violet-950/80 shadow-lg shadow-black/40' 
          : 'bg-white/90 backdrop-blur-md border-b border-violet-100 shadow-sm shadow-violet-500/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Monogram */}
        <button 
          onClick={(e) => handleLinkClick(e, 0)}
          id="navbar-brand-logo"
          className="flex items-center gap-3 group focus:outline-none cursor-pointer text-left"
        >
          <ProfileImage size="sm" showBadge={true} className="flex-shrink-0" />
          <div className="flex flex-col">
            <span className={`font-semibold tracking-tight text-base sm:text-lg leading-tight transition-colors ${
              isDark ? 'text-violet-50 group-hover:text-violet-400' : 'text-slate-900 group-hover:text-violet-600'
            }`}>
              Nikita Bhansali
            </span>
            <span className="font-mono text-[10px] text-violet-500 tracking-wider flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
              AI/ML × RF/Embedded
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Desktop Navigation">
          {navLinks.map((link) => {
            const isActive = activeSectionIndex === link.index;
            return (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(e, link.index)}
                id={`nav-link-${link.id}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'text-violet-400 bg-violet-500/15 font-semibold'
                      : 'text-violet-600 bg-violet-50 font-semibold'
                    : isDark
                    ? 'text-violet-200/70 hover:text-violet-100 hover:bg-violet-950/40'
                    : 'text-slate-600 hover:text-violet-700 hover:bg-violet-50/60'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" />
                )}
              </button>
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                isDark
                  ? 'bg-[#18142e] hover:bg-[#231b42] text-violet-100 border-violet-900/60 hover:border-violet-500/50'
                  : 'bg-white hover:bg-violet-50/60 text-slate-800 border-violet-200 hover:border-violet-400 shadow-sm'
              }`}
              aria-expanded={isResumeDropdownOpen}
              aria-label="Resume options"
            >
              <FileText className="w-3.5 h-3.5 text-violet-500" />
              <span>Resume</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isResumeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isResumeDropdownOpen && (
              <div 
                id="resume-dropdown-menu"
                className={`absolute right-0 mt-2 w-72 rounded-2xl p-2.5 shadow-2xl border transition-all duration-150 z-50 animate-fadeIn ${
                  isDark 
                    ? 'bg-[#18142e] border-violet-900/60 text-violet-50 shadow-2xl shadow-black/80' 
                    : 'bg-white border-violet-100 text-slate-900 shadow-2xl shadow-violet-500/10'
                }`}
              >
                <div className={`px-2.5 py-1.5 border-b mb-1.5 flex items-center justify-between ${
                  isDark ? 'border-violet-900/40' : 'border-violet-100'
                }`}>
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-violet-500">
                    Select Specialization
                  </p>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    isDark ? 'text-violet-400 bg-violet-500/15 border-violet-500/30' : 'text-violet-600 bg-violet-50 border-violet-200'
                  }`}>
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
                      ? 'bg-[#20193d] border-violet-950 hover:border-violet-500/60 hover:bg-violet-950/40 text-violet-50' 
                      : 'bg-violet-50/40 border-violet-100 hover:border-violet-300 hover:bg-violet-50 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className={`p-2 rounded-lg group-hover:scale-105 transition-transform shrink-0 mt-0.5 ${
                    isDark ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-violet-100 text-violet-600 border border-violet-200'
                  }`}>
                    <Brain className="w-4 h-4 text-violet-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        AI/ML Resume
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-violet-500 text-white shadow-sm shrink-0">
                        PDF
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDark ? 'text-violet-200/70' : 'text-slate-600'}`}>
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
                      ? 'bg-[#20193d] border-violet-950 hover:border-purple-500/60 hover:bg-purple-950/40 text-violet-50' 
                      : 'bg-purple-50/40 border-purple-100 hover:border-purple-300 hover:bg-purple-50 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className={`p-2 rounded-lg group-hover:scale-105 transition-transform shrink-0 mt-0.5 ${
                    isDark ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-600 border border-purple-200'
                  }`}>
                    <Radio className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Embedded & RF Resume
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500 text-white shadow-sm shrink-0">
                        PDF
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDark ? 'text-violet-200/70' : 'text-slate-600'}`}>
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
            className={`p-2 rounded-lg transition-all duration-200 border cursor-pointer ${
              isDark 
                ? 'bg-[#18142e] text-violet-300 border-violet-900/60 hover:bg-[#231b42] hover:border-violet-400/40' 
                : 'bg-white text-slate-700 border-violet-200 hover:bg-violet-50 hover:text-violet-600 shadow-sm'
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
            className={`lg:hidden p-2 rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-[#18142e] text-violet-200 border-violet-900 hover:bg-[#231b42]' 
                : 'bg-white text-slate-800 border-violet-200 hover:bg-violet-50'
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
              ? 'bg-[#18142e] border-violet-900/60 text-violet-100' 
              : 'bg-white border-violet-100 text-slate-800 shadow-lg'
          }`}
        >
          <div className="grid grid-cols-2 gap-1.5 pb-2">
            {navLinks.map((link) => {
              const isActive = activeSectionIndex === link.index;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={(e) => {
                    handleLinkClick(e, link.index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-violet-500/20 text-violet-400 font-semibold'
                        : 'bg-violet-50 text-violet-600 font-semibold'
                      : isDark
                      ? 'text-violet-200 hover:bg-violet-950/40'
                      : 'text-slate-600 hover:bg-violet-50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Mobile Resumes Quick Actions */}
          <div className={`pt-2 border-t grid grid-cols-2 gap-2 ${
            isDark ? 'border-violet-900/40' : 'border-violet-100'
          }`}>
            <button
              onClick={() => {
                onOpenResumeModal('aiml');
                setIsMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border cursor-pointer ${
                isDark ? 'bg-violet-950/40 text-violet-300 border-violet-800/50' : 'bg-violet-50 text-violet-700 border-violet-200'
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
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border cursor-pointer ${
                isDark ? 'bg-purple-950/40 text-purple-300 border-purple-800/50' : 'bg-purple-50 text-purple-700 border-purple-200'
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
