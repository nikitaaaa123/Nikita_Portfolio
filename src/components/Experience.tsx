import React from 'react';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  GitBranch,
  ExternalLink,
  Brain,
  Code2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface ExperienceProps {
  theme: ThemeMode;
}

export const Experience: React.FC<ExperienceProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section 
      id="experience" 
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-blue-500"></span>
            <span>03 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Engineering Internship & Industry SDLC
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Applied machine learning, deep neural networks, and production-grade full-stack delivery in enterprise public sector environments.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-blue-500/40 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCES.map((exp, idx) => {
            const isAiml = exp.id === 'aiml-intern-mponline';

            return (
              <div key={exp.id} className="relative group">
                
                {/* Timeline Marker Dot - Mathematically Centered on the 2px border */}
                <div 
                  className={`absolute -left-[35px] sm:-left-[51px] top-6 w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-[#0a0e14]' : 'bg-white'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${isAiml ? 'bg-violet-500' : 'bg-blue-500'} animate-pulse`}></span>
                </div>

                {/* Main Card */}
                <div className={`rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? 'bg-[#0e1420]/90 border-slate-800/90 hover:border-slate-700/90 shadow-black/30' 
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-md shadow-slate-200/50'
                }`}>
                  
                  {/* Header Row */}
                  <div className={`flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b ${
                    isDark ? 'border-slate-800/80' : 'border-slate-200'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          isAiml 
                            ? (isDark ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-600 border border-violet-200')
                            : (isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200')
                        }`}>
                          {isAiml ? <Brain className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                          isDark ? 'text-slate-100' : 'text-slate-900'
                        }`}>
                          {exp.role}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${
                          isAiml
                            ? (isDark ? 'bg-violet-500/10 text-violet-300 border-violet-500/30' : 'bg-violet-50 text-violet-700 border-violet-200')
                            : (isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200')
                        }`}>
                          {isAiml ? 'AI / ML Track' : 'Software Engineering Track'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                        <span className="flex items-center gap-1.5 text-blue-500 font-semibold">
                          <Building2 className="w-4 h-4" />
                          {exp.company}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                          isDark ? 'bg-slate-800/60 text-slate-300 border-slate-700/50' : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {exp.organizationType}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap lg:flex-col lg:items-end gap-2.5 text-xs font-mono">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                        isDark ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className={`text-sm sm:text-base leading-relaxed py-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {exp.summary}
                  </p>

                  {/* Responsibilities & Achievements */}
                  <div className="space-y-3 pt-2">
                    <h4 className={`font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <GitBranch className="w-3.5 h-3.5 text-blue-500" />
                      <span>Key Engineering Deliverables & Scope:</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-2.5">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div 
                          key={bIdx}
                          className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700' 
                              : 'bg-slate-50 border-slate-200/90 hover:border-slate-300'
                          }`}
                        >
                          <div className={`p-1 rounded-md mt-0.5 shrink-0 ${
                            isAiml ? 'bg-violet-500/10 text-violet-500' : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills & Verified Documentation Link */}
                  <div className={`pt-5 mt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDark ? 'border-slate-800/80' : 'border-slate-200'
                  }`}>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs text-slate-400 mr-1">Stack:</span>
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                            isDark 
                              ? 'bg-slate-900 border-slate-700/80 text-blue-300' 
                              : 'bg-blue-50 border-blue-200 text-blue-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* LinkedIn Verification Link */}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono flex items-center justify-center gap-1.5 transition-all shrink-0 ${
                          isDark
                            ? 'bg-blue-950/40 border-blue-800/60 text-blue-300 hover:bg-blue-900/60 hover:text-white'
                            : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-900 shadow-sm'
                        }`}
                        title="View Verified Internship Post on LinkedIn"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                        <span>View Verified Post</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
