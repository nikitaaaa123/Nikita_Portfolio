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
        isDark ? 'bg-[#070b10] border-slate-800/80 text-slate-400' : 'bg-slate-100/80 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b ${
          isDark ? 'border-slate-800/60' : 'border-slate-200'
        }`}>
          
          {/* Brand & Monogram */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${
                isDark 
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                NB
              </div>
              <span className={`font-bold text-base ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Nikita Bhansali
              </span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed">
              Electronics & Communication Engineering undergraduate bridging neural networks and radio signals.
            </p>
          </div>

          {/* Quick Resumes & Anchor Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono">
            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-blue-500 transition-colors">Experience</a>
            <button 
              onClick={() => onOpenResumeModal('aiml')}
              className="text-blue-500 hover:underline text-left cursor-pointer"
            >
              AI/ML Resume
            </button>
            <button 
              onClick={() => onOpenResumeModal('embedded')}
              className="text-emerald-500 hover:underline text-left cursor-pointer"
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
                  ? 'border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white' 
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm'
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
                  ? 'border-slate-700/50 hover:bg-slate-800 text-blue-400 hover:text-blue-300' 
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 shadow-sm'
              }`}
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              className={`p-2 rounded-xl border transition-colors ${
                isDark 
                  ? 'border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white' 
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm'
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
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-blue-500' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
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
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <div>
            © 2026 Nikita Bhansali. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>VIT Bhopal • ECE (2023–2027)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
