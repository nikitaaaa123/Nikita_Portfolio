import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Check, 
  Copy, 
  Brain, 
  Cpu, 
  Radio, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface HeroProps {
  theme: ThemeMode;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const subtitles = PERSONAL_INFO.subtitles;
  const isDark = theme === 'dark';

  // Typing effect
  useEffect(() => {
    const currentWord = subtitles[currentSubtitleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentWord.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
      }, 35);
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
      className={`relative min-h-[88vh] pt-28 sm:pt-32 pb-20 flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-grid-pattern' : 'bg-grid-pattern-light'
      }`}
    >
      {/* Ambient background decorative glows */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-blue-600/10' : 'bg-blue-500/5'
      }`} />
      <div className={`absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-violet-600/10' : 'bg-violet-500/5'
      }`} />
      <div className={`absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-emerald-600/10' : 'bg-emerald-500/5'
      }`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center space-y-7">
          
          {/* Status & Engineering Domain Pill */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono transition-all ${
            isDark 
              ? 'bg-slate-900/90 border-slate-700/80 text-slate-300 shadow-sm' 
              : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 font-semibold">B.Tech ECE @ VIT Bhopal</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 font-medium">CGPA 8.48</span>
          </div>

          {/* Name & Dynamic Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className={`block ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Nikita Bhansali
              </span>
            </h1>

            {/* Animated Rotating Subtitle */}
            <div className="h-12 sm:h-14 flex items-center justify-center">
              <p className={`text-2xl sm:text-3xl lg:text-4xl font-semibold font-mono tracking-tight text-transparent bg-clip-text ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400' 
                  : 'bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600'
              }`}>
                <span>{displayedText}</span>
                <span className="inline-block w-0.5 h-6 sm:h-8 ml-1 bg-blue-500 animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className={`text-lg sm:text-xl font-normal leading-relaxed max-w-2xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {PERSONAL_INFO.tagline}
          </p>

          {/* Core Technical Pillars Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 font-mono text-xs">
            <span className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
              isDark 
                ? 'bg-blue-950/40 border-blue-800/60 text-blue-300' 
                : 'bg-blue-50/80 border-blue-200 text-blue-700'
            }`}>
              <Brain className="w-3.5 h-3.5 text-blue-500" />
              <span>Neural Networks (CNN & NLP)</span>
            </span>

            <span className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
              isDark 
                ? 'bg-violet-950/40 border-violet-800/60 text-violet-300' 
                : 'bg-violet-50/80 border-violet-200 text-violet-700'
            }`}>
              <Radio className="w-3.5 h-3.5 text-violet-500" />
              <span>SDR & RF Signal Processing</span>
            </span>

            <span className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
              isDark 
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' 
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-700'
            }`}>
              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              <span>ESP32 & Embedded Systems</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 w-full sm:w-auto">
            <a
              href="#projects"
              id="hero-cta-projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              id="hero-cta-contact"
              className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 ${
                isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-blue-500/50 hover:text-white'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400 shadow-sm'
              }`}
            >
              <span>Get in Touch</span>
              <Mail className="w-4 h-4 text-blue-500" />
            </a>
          </div>

          {/* Social & Contact Direct Links */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {/* GitHub */}
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noreferrer"
              id="hero-social-github"
              className={`p-2.5 px-3.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
              }`}
              title="Nikita's GitHub Profile"
            >
              <Github className="w-4 h-4" />
              <span>github.com/{PERSONAL_INFO.contact.githubUsername}</span>
            </a>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              id="hero-social-linkedin"
              className={`p-2.5 px-3.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-blue-400 hover:text-blue-300 hover:border-blue-700 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:bg-slate-50 shadow-sm'
              }`}
              title="Nikita's LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
              <span>linkedin.com/in/{PERSONAL_INFO.contact.linkedinUsername}</span>
            </a>

            {/* Quick Email Copy */}
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.contact.email, 'email')}
              id="hero-copy-email-btn"
              className={`p-2.5 px-3 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
              }`}
              title="Click to copy email address"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-slate-400" />}
              <span className="hidden sm:inline">{PERSONAL_INFO.contact.email}</span>
              <span className="text-[10px] text-slate-400 font-sans">{copiedEmail ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Quick Phone Copy */}
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.contact.phone, 'phone')}
              id="hero-copy-phone-btn"
              className={`p-2.5 px-3 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
              }`}
              title="Click to copy phone number"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Phone className="w-4 h-4 text-slate-400" />}
              <span className="hidden sm:inline">{PERSONAL_INFO.contact.formattedPhone}</span>
              <span className="text-[10px] text-slate-400 font-sans">{copiedPhone ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
