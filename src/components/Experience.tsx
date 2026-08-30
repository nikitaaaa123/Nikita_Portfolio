import React from 'react';
import { motion } from 'motion/react';
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
  ShieldCheck,
  Zap,
  Layers
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
      className={`py-20 sm:py-24 border-t transition-colors scroll-mt-16 sm:scroll-mt-20 ${
        isDark ? 'bg-[#0b0817] border-violet-950/80' : 'bg-[#f7f5ff]/60 border-violet-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs text-violet-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-violet-500"></span>
            <span>04 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-violet-50' : 'text-slate-900'
          }`}>
            Engineering Internship & Industry SDLC
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-violet-200/70' : 'text-slate-600'
          }`}>
            Applied machine learning, deep neural networks, and production-grade full-stack delivery in enterprise public sector environments.
          </p>
        </motion.div>

        {/* Timeline Container with Animated Entries */}
        <div className="relative border-l-2 border-violet-500/40 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCES.map((exp, idx) => {
            const isAiml = exp.id === 'aiml-intern-mponline';

            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                
                {/* Timeline Marker Dot - Centered on 2px border */}
                <div 
                  className={`absolute -left-[35px] sm:-left-[51px] top-6 w-6 h-6 rounded-full border-2 border-violet-500 flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-125 transition-transform ${
                    isDark ? 'bg-[#0b0817]' : 'bg-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse"></span>
                </div>

                {/* Main Card */}
                <div className={`rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-[#18122e]/90 border-violet-900/60 hover:border-violet-500/50 shadow-black/30' 
                    : 'bg-white border-violet-100 hover:border-violet-300 shadow-sm shadow-violet-500/5'
                }`}>
                  
                  {/* Header Row */}
                  <div className={`flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b ${
                    isDark ? 'border-violet-900/40' : 'border-violet-100'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          isDark ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-600 border border-violet-200'
                        }`}>
                          {isAiml ? <Brain className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                          isDark ? 'text-violet-50' : 'text-slate-900'
                        }`}>
                          {exp.role}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${
                          isDark ? 'bg-violet-500/10 text-violet-300 border-violet-500/30' : 'bg-violet-50 text-violet-700 border-violet-200'
                        }`}>
                          {isAiml ? 'AI / ML Track' : 'Software Engineering Track'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                        <span className="flex items-center gap-1.5 text-violet-500 font-semibold">
                          <Building2 className="w-4 h-4" />
                          {exp.company}
                        </span>
                        <span className={isDark ? 'text-violet-300/40' : 'text-slate-300'}>•</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                          isDark ? 'bg-[#20183e] text-violet-200 border-violet-900/60' : 'bg-violet-50/70 text-slate-700 border-violet-200'
                        }`}>
                          {exp.organizationType}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap lg:flex-col lg:items-end gap-2.5 text-xs font-mono">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                        isDark ? 'bg-[#20183e] border-violet-900/60 text-violet-200' : 'bg-violet-50/70 border-violet-200 text-slate-700'
                      }`}>
                        <Calendar className="w-3.5 h-3.5 text-violet-500" />
                        <span>{exp.period}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${isDark ? 'text-violet-300/60' : 'text-slate-500'}`}>
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className={`text-sm sm:text-base leading-relaxed py-4 ${
                    isDark ? 'text-violet-100/90' : 'text-slate-700'
                  }`}>
                    {exp.summary}
                  </p>

                  {/* Responsibilities & Achievements with Interactive Bullets */}
                  <div className="space-y-3 pt-2">
                    <h4 className={`font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                      isDark ? 'text-violet-300' : 'text-slate-600'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                      Key Deliverables & Architectural Impact:
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.bullets.map((point, pIdx) => (
                        <motion.li 
                          key={pIdx}
                          whileHover={{ x: 3 }}
                          className={`text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-[#20183e] text-violet-100' : 'hover:bg-violet-50/50 text-slate-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"></span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className={`mt-6 pt-4 border-t flex flex-wrap items-center gap-2 ${
                    isDark ? 'border-violet-900/40' : 'border-violet-100'
                  }`}>
                    <span className={`text-xs font-mono mr-2 ${isDark ? 'text-violet-300/70' : 'text-slate-500'}`}>Technologies Used:</span>
                    {exp.technologies.map((tech, tIdx) => (
                      <motion.span
                        key={tIdx}
                        whileHover={{ scale: 1.05 }}
                        className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-default ${
                          isDark 
                            ? 'bg-[#20183e] border-violet-900/60 text-violet-200 hover:border-violet-400/50' 
                            : 'bg-violet-50/60 border-violet-200 text-slate-700 hover:border-violet-400'
                        }`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
