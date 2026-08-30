import React from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface FooterProps {
  theme: ThemeMode;
  onOpenResumeModal: (type: 'aiml' | 'embedded') => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onOpenResumeModal }) => {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className={`border-t transition-colors ${
        isDark ? 'bg-[#0a0714] border-violet-950/80 text-violet-300/70' : 'bg-violet-50/60 border-violet-100 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b ${
          isDark ? 'border-violet-900/40' : 'border-violet-200'
        }`}>
          
          {/* Brand & Monogram */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${
                isDark 
                  ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' 
                  : 'bg-violet-50 border-violet-200 text-violet-700'
              }`}>
                NB
              </div>
              <span className={`font-bold text-base ${isDark ? 'text-violet-50' : 'text-slate-900'}`}>
                Nikita Bhansali
              </span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed">
              Electronics & Communication Engineering undergraduate bridging neural networks and radio signals.
            </p>
          </div>

          {/* Quick Resumes & Anchor Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono">
            <a href="#about" className="hover:text-violet-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-violet-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-violet-500 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-violet-500 transition-colors">Experience</a>
            <button 
              onClick={() => onOpenResumeModal('aiml')}
              className="text-violet-500 hover:underline text-left cursor-pointer"
            >
              AI/ML Resume
            </button>
            <button 
              onClick={() => onOpenResumeModal('embedded')}
              className="text-violet-400 hover:underline text-left cursor-pointer"
            >
              RF/Embedded Resume
            </button>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="md:col-span-3 flex items-center md:justify-end gap-3">
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-xl border transition-colors ${
                isDark 
                  ? 'border-violet-900/60 hover:bg-[#20183e] text-violet-200 hover:text-white' 
                  : 'border-violet-200 bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-600 shadow-sm'
              }`}
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-xl border transition-colors ${
                isDark 
                  ? 'border-violet-900/60 hover:bg-[#20183e] text-violet-400 hover:text-violet-300' 
                  : 'border-violet-200 bg-white hover:bg-violet-50 text-violet-600 hover:text-violet-700 shadow-sm'
              }`}
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              className={`p-2 rounded-xl border transition-colors ${
                isDark 
                  ? 'border-violet-900/60 hover:bg-[#20183e] text-violet-200 hover:text-white' 
                  : 'border-violet-200 bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-600 shadow-sm'
              }`}
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              id="back-to-top-btn"
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer ${
                isDark 
                  ? 'bg-[#18122e] border-violet-900/70 text-violet-200 hover:text-white hover:border-violet-500' 
                  : 'bg-white border-violet-200 text-slate-700 hover:text-violet-600 shadow-sm'
              }`}
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono ${
          isDark ? 'text-violet-300/60' : 'text-slate-500'
        }`}>
          <div>
            © 2026 Nikita Bhansali. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
            <span>VIT Bhopal • ECE (2023–2027)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
