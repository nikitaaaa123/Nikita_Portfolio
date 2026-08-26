import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Check, 
  FileText,
  ChevronDown,
  Sparkles,
  Radio,
  Cpu,
  Brain
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { HeroPortrait } from './HeroPortrait';

interface HeroProps {
  theme: ThemeMode;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showResumeMenu, setShowResumeMenu] = useState(false);

  const subtitles = [
    'thinking machines.',
    'real-time embedded systems.',
    'edge neural inference.',
    'RF & signal processing.'
  ];
  const isDark = theme === 'dark';

  // Typing effect for the headline punchline
  useEffect(() => {
    const currentWord = subtitles[currentSubtitleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentWord.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      }, 65);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
      }, 30);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentSubtitleIndex, subtitles]);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section 
      id="home" 
      className={`relative min-h-[92vh] pt-24 sm:pt-28 pb-16 flex items-center overflow-hidden ${
        isDark ? 'bg-grid-pattern' : 'bg-grid-pattern-light'
      }`}
    >
      {/* Background ambient lighting */}
      <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-blue-600/10' : 'bg-blue-500/5'
      }`} />
      <div className={`absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-emerald-600/10' : 'bg-emerald-500/5'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Two-Column Responsive Layout (Sample Match) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Bio & CTA Controls */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 z-10">
            
            {/* Status & Degree Pill */}
            <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all ${
              isDark 
                ? 'bg-slate-900/90 border-slate-700/80 text-slate-300 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-500 font-semibold">B.Tech ECE · VIT Bhopal</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500 font-medium">CGPA 8.48</span>
            </div>

            {/* Intro and Name (Formatted matching sample design) */}
            <div className="space-y-1">
              <span className={`text-sm sm:text-base font-sans font-medium tracking-tight ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Hi, I am
              </span>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  Nikita{' '}
                </span>
                <span className={`font-serif italic font-normal tracking-normal ${
                  isDark 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300' 
                    : 'text-emerald-700'
                }`}>
                  Bhansali
                </span>
              </h1>
            </div>

            {/* Bio Narrative */}
            <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              I build the intelligent algorithms and the hardware underneath them — happiest on the seam where AI/ML neural models and low-level embedded silicon agree.
            </p>

            {/* Headline Punchline Box (Tanishk Jain layout style) */}
            <div className="pt-1 pb-1 w-full max-w-xl">
              <div className="relative">
                <p className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  I build interfaces for
                </p>
                <div className="relative inline-block mt-1">
                  <span className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {displayedText}
                  </span>
                  <span className="inline-block w-0.5 h-6 sm:h-7 ml-1 bg-emerald-500 animate-pulse align-middle" />
                  
                  {/* Clean Teal Accent Underline */}
                  <div className="h-1 sm:h-1.5 w-full bg-emerald-500 rounded-full mt-1.5 opacity-90 shadow-sm shadow-emerald-500/30" />
                </div>
              </div>
            </div>

            {/* CTA Buttons (Pills styled like reference) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* See the work pill */}
              <a
                href="#projects"
                id="hero-see-work-btn"
                className="px-6 py-3 rounded-full font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-md transition-all flex items-center gap-2 group hover:-translate-y-0.5"
              >
                <span>See the work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Résumé Dropdown Pill */}
              <div className="relative">
                <button
                  onClick={() => setShowResumeMenu(!showResumeMenu)}
                  id="hero-resume-dropdown-btn"
                  className={`px-5 py-3 rounded-full font-semibold text-sm border transition-all flex items-center gap-2 hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Résumé</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showResumeMenu ? 'rotate-180' : ''}`} />
                </button>

                {showResumeMenu && (
                  <div className={`absolute left-0 mt-2 w-64 rounded-2xl border shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Tailored CVs (PDF)
                    </div>
                    <a
                      href="/Nikita_Bhansali_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium transition-colors ${
                        isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Brain className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="font-semibold">AI / ML & Software</div>
                        <div className="text-[10px] text-slate-400">PyTorch, NLP, CV Focus</div>
                      </div>
                    </a>
                    <a
                      href="/Nikita_Bhansali_Resume_Embedded_RF.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium transition-colors ${
                        isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Radio className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold">Embedded & RF Engineering</div>
                        <div className="text-[10px] text-slate-400">SDR, ESP32, Signals Focus</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Contact & Profile Icons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noreferrer"
                id="hero-social-github"
                className={`p-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-mono ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-600' 
                    : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                }`}
                title="Nikita's GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">github.com/{PERSONAL_INFO.contact.githubUsername}</span>
              </a>

              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                id="hero-social-linkedin"
                className={`p-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-mono ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-blue-400 hover:text-blue-300' 
                    : 'bg-white border-slate-200 text-blue-600 hover:text-blue-700 shadow-sm'
                }`}
                title="Nikita's LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">linkedin.com/in/{PERSONAL_INFO.contact.linkedinUsername}</span>
              </a>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.contact.email, 'email')}
                id="hero-copy-email-btn"
                className={`p-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-mono cursor-pointer ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm'
                }`}
                title="Click to copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-slate-400" />}
                <span className="hidden md:inline">{PERSONAL_INFO.contact.email}</span>
                <span className="text-[10px] text-slate-400 font-sans">{copiedEmail ? 'Copied' : 'Email'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Prominent Cutout Portrait (Sample Match) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full pt-4 lg:pt-0">
            <HeroPortrait isDark={isDark} />
          </div>

        </div>
      </div>
    </section>
  );
};
