import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Check, 
  FileText, 
  ChevronDown, 
  Radio, 
  Cpu, 
  Brain, 
  Sparkles,
  Zap,
  Terminal
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { HeroPortrait } from './HeroPortrait';
import { InteractiveConsoleStudio } from './InteractiveConsoleStudio';
import { InteractiveHeroBackground } from './InteractiveHeroBackground';

interface HeroProps {
  theme: ThemeMode;
  onNavigateToProjects?: () => void;
  onOpenResumeModal?: (type: 'aiml' | 'embedded') => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  theme, 
  onNavigateToProjects,
  onOpenResumeModal 
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRoleText, setDisplayedRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showResumeMenu, setShowResumeMenu] = useState(false);

  const roles = [
    'AI/ML & Edge Computing Engineer',
    'Embedded Systems & IoT Specialist',
    'Software Defined Radio (SDR) Architect',
    'Deep Learning & Vision Researcher'
  ];

  const isDark = theme === 'dark';

  // Typing & text-reveal effect for cycling roles
  useEffect(() => {
    const currentWord = roles[currentRoleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedRoleText.length < currentWord.length) {
      timer = setTimeout(() => {
        setDisplayedRoleText(currentWord.substring(0, displayedRoleText.length + 1));
      }, 55);
    } else if (!isDeleting && displayedRoleText.length === currentWord.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayedRoleText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedRoleText(currentWord.substring(0, displayedRoleText.length - 1));
      }, 25);
    } else if (isDeleting && displayedRoleText.length === 0) {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRoleText, isDeleting, currentRoleIndex, roles]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="home" 
      className={`relative min-h-[92vh] pt-20 sm:pt-24 pb-16 flex flex-col justify-center overflow-hidden scroll-mt-16 sm:scroll-mt-20 ${
        isDark ? 'bg-grid-pattern' : 'bg-grid-pattern-light'
      }`}
    >
      {/* Interactive Particle & Mesh Canvas */}
      <InteractiveHeroBackground theme={theme} />

      {/* Ambient background glows */}
      <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-violet-600/10' : 'bg-violet-400/10'
      }`} />
      <div className={`absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-purple-600/10' : 'bg-purple-300/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Bio & CTA Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-5 z-10"
          >
            
            {/* Status & Degree Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all hover:scale-105 ${
                isDark 
                  ? 'bg-[#18142e]/90 border-violet-900/60 text-violet-200 shadow-sm' 
                  : 'bg-white border-violet-200 text-slate-700 shadow-sm shadow-violet-500/5'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-violet-600 dark:text-violet-400 font-semibold">B.Tech ECE · VIT Bhopal</span>
              <span className="text-violet-300 dark:text-violet-800">|</span>
              <span className="text-slate-500 dark:text-violet-300/70 font-medium">CGPA 8.48</span>
            </motion.div>

            {/* Intro and Name */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-1.5"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs text-violet-500 font-semibold uppercase tracking-wider">
                <span className="w-6 h-px bg-violet-500"></span>
                <span>HI, I AM</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  Nikita Bhansali
                </span>
              </h1>
            </motion.div>

            {/* Cycling Role Headline with Typing Effect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-10 sm:h-12 flex items-center"
            >
              <div className="text-lg sm:text-2xl font-bold font-mono">
                <span className="text-violet-400 dark:text-violet-600">&gt; </span>
                <span className={`tracking-tight ${
                  isDark 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700'
                }`}>
                  {displayedRoleText}
                </span>
                <span className="inline-block w-2 h-5 ml-1 bg-violet-500 animate-pulse align-middle" />
              </div>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
                isDark ? 'text-violet-100/80' : 'text-slate-600'
              }`}
            >
              I bridge the seam between deep neural network architectures and low-level physical silicon — engineering intelligent edge models, SDR anti-drone radar defenses, and real-time embedded systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 w-full"
            >
              {/* Primary Call to Action */}
              <a
                href="#projects"
                onClick={(e) => {
                  if (onNavigateToProjects) {
                    e.preventDefault();
                    onNavigateToProjects();
                  }
                }}
                id="hero-see-work-btn"
                className="px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 group cursor-pointer bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 text-white hover:from-violet-600 hover:to-purple-600 shadow-lg shadow-violet-500/25 hover:scale-105 hover:shadow-violet-500/40"
              >
                <span>Explore Featured Systems</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Resume Dropdown Pill */}
              <div className="relative">
                <button
                  onClick={() => setShowResumeMenu(!showResumeMenu)}
                  className={`px-5 py-3.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                    isDark
                      ? 'bg-[#18142e] border-violet-900/70 hover:border-violet-500/60 text-violet-100 shadow-sm hover:scale-105'
                      : 'bg-white border-violet-200 hover:border-violet-400 text-slate-800 shadow-sm hover:scale-105 hover:bg-violet-50/50'
                  }`}
                >
                  <FileText className="w-4 h-4 text-violet-500" />
                  <span>Resume</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showResumeMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showResumeMenu && (
                  <div className={`absolute left-0 mt-2 w-64 rounded-2xl border p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                    isDark 
                      ? 'bg-[#18142e]/95 border-violet-900/70 text-violet-100 backdrop-blur-xl shadow-black/80' 
                      : 'bg-white/95 border-violet-200 text-slate-800 backdrop-blur-xl shadow-violet-500/15'
                  }`}>
                    <div className="px-3 py-1.5 text-[10px] font-mono text-violet-500 uppercase tracking-wider font-semibold">
                      Dual-Track Resumes
                    </div>
                    
                    <a
                      href="/Nikita_Bhansali_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShowResumeMenu(false)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-colors ${
                        isDark ? 'hover:bg-violet-950/40 text-violet-100' : 'hover:bg-violet-50 text-slate-800'
                      }`}
                    >
                      <Brain className="w-4 h-4 text-violet-500" />
                      <div>
                        <div className="font-semibold">AI / ML Focus</div>
                        <div className="text-[10px] text-violet-400 font-mono">Deep Learning & NLP</div>
                      </div>
                    </a>

                    <a
                      href="/Nikita_Bhansali_Resume_Embedded_RF.pdf"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShowResumeMenu(false)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-colors ${
                        isDark ? 'hover:bg-violet-950/40 text-violet-100' : 'hover:bg-violet-50 text-slate-800'
                      }`}
                    >
                      <Radio className="w-4 h-4 text-purple-500" />
                      <div>
                        <div className="font-semibold">Embedded & RF Focus</div>
                        <div className="text-[10px] text-purple-400 font-mono">SDR, Antennas & Silicon</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Contact & Verified Profile Chips */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-3 flex flex-wrap items-center gap-2.5 text-xs font-mono"
            >
              {/* GitHub */}
              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noreferrer"
                id="hero-github-link"
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-[#18142e]/80 border-violet-900/60 hover:border-violet-500/60 text-violet-200' 
                    : 'bg-white border-violet-200 hover:border-violet-400 text-slate-700 shadow-sm'
                }`}
              >
                <Github className="w-3.5 h-3.5 text-violet-500" />
                <span>github.com/nikitaaaa123</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                id="hero-linkedin-link"
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-[#18142e]/80 border-violet-900/60 hover:border-violet-500/60 text-violet-200' 
                    : 'bg-white border-violet-200 hover:border-violet-400 text-slate-700 shadow-sm'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5 text-violet-500" />
                <span>LinkedIn</span>
              </a>

              {/* Email One-Click Copy */}
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.contact.email)}
                id="hero-email-copy"
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer ${
                  isDark 
                    ? 'bg-[#18142e]/80 border-violet-900/60 hover:border-violet-500/60 text-violet-200' 
                    : 'bg-white border-violet-200 hover:border-violet-400 text-slate-700 shadow-sm'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                <span>{PERSONAL_INFO.contact.email}</span>
                {copiedEmail ? (
                  <Check className="w-3 h-3 text-violet-500 ml-1" />
                ) : (
                  <span className="text-[10px] text-violet-400 ml-1 font-mono">Copy</span>
                )}
              </button>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive 3D Parallax Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center items-end"
          >
            <HeroPortrait isDark={isDark} />
          </motion.div>

        </div>

        {/* Live Interactive REPL Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16"
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
              <span className={isDark ? 'text-violet-200 font-semibold' : 'text-slate-800 font-semibold'}>
                Live Interactive Engineering REPL Terminal
              </span>
            </div>
            <span className="text-[11px] font-mono text-violet-500 hidden sm:inline font-medium">
              Type 'help' or click presets to inspect skills, hardware & telemetry
            </span>
          </div>
          <InteractiveConsoleStudio theme={theme} />
        </motion.div>
      </div>
    </section>
  );
};
