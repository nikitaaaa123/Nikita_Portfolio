import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  Cpu, 
  Brain, 
  Radio, 
  Layers, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  BookOpen, 
  Code2,
  Sparkles,
  ExternalLink,
  Zap,
  Target
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { ProfileImage } from './ProfileImage';

interface AboutProps {
  theme: ThemeMode;
}

export const About: React.FC<AboutProps> = ({ theme }) => {
  const [activeFocus, setActiveFocus] = useState<'all' | 'ai' | 'rf'>('all');
  const isDark = theme === 'dark';

  return (
    <section 
      id="about" 
      className={`py-20 sm:py-24 border-t transition-colors scroll-mt-16 sm:scroll-mt-20 ${
        isDark ? 'bg-[#120e24] border-violet-950/80' : 'bg-[#f7f5ff]/60 border-violet-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs text-violet-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-violet-500"></span>
            <span>02 // BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-violet-50' : 'text-slate-900'
          }`}>
            Bridging Intelligent Models & Physical Silicon
          </h2>
        </motion.div>

        {/* Narrative & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Narrative Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
              isDark 
                ? 'bg-[#18122e]/90 border-violet-900/60 hover:border-violet-500/50 shadow-xl shadow-black/40' 
                : 'bg-white border-violet-100 hover:border-violet-300 shadow-sm shadow-violet-500/5'
            }`}
          >
            <div className="space-y-5">
              {/* Header with Photo and Specialization Badges */}
              <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b ${
                isDark ? 'border-violet-900/40' : 'border-violet-100'
              }`}>
                <div className="flex items-center gap-4">
                  <ProfileImage size="md" showBadge={false} />
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-violet-50' : 'text-slate-900'}`}>
                      Nikita Bhansali
                    </h3>
                    <p className="text-xs font-mono text-violet-500">
                      B.Tech ECE · AI/ML & Embedded Systems
                    </p>
                  </div>
                </div>

                {/* Interactive Focus Switcher */}
                <div className={`flex items-center gap-1.5 p-1 rounded-xl border text-xs font-mono ${
                  isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50/70 border-violet-200'
                }`}>
                  <button
                    onClick={() => setActiveFocus('all')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      activeFocus === 'all' 
                        ? 'bg-violet-500 text-white font-semibold shadow-sm shadow-violet-500/30' 
                        : isDark ? 'text-violet-300 hover:text-violet-100' : 'text-slate-600 hover:text-violet-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFocus('ai')}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                      activeFocus === 'ai' 
                        ? 'bg-violet-500 text-white font-semibold shadow-sm shadow-violet-500/30' 
                        : isDark ? 'text-violet-300 hover:text-violet-100' : 'text-slate-600 hover:text-violet-600'
                    }`}
                  >
                    <Brain className="w-3 h-3" />
                    <span>AI</span>
                  </button>
                  <button
                    onClick={() => setActiveFocus('rf')}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                      activeFocus === 'rf' 
                        ? 'bg-violet-500 text-white font-semibold shadow-sm shadow-violet-500/30' 
                        : isDark ? 'text-violet-300 hover:text-violet-100' : 'text-slate-600 hover:text-violet-600'
                    }`}
                  >
                    <Radio className="w-3 h-3" />
                    <span>RF</span>
                  </button>
                </div>
              </div>

              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-violet-100/90' : 'text-slate-700'
              }`}>
                {PERSONAL_INFO.bio}
              </p>

              {/* Dual specialization value proposition with dynamic highlight */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeFocus === 'rf' ? 'opacity-40 scale-98' : 'opacity-100 scale-100'
                } ${
                  isDark ? 'bg-[#20183e]/70 border-violet-900/60 hover:border-violet-500/40' : 'bg-violet-50/50 border-violet-200 hover:border-violet-300'
                }`}>
                  <div className={`flex items-center gap-2 text-sm font-semibold mb-1 ${
                    isDark ? 'text-violet-300' : 'text-violet-700'
                  }`}>
                    <Brain className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                    <span>Software & Intelligence</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-violet-200/70' : 'text-slate-600'}`}>
                    NLP intent triage, Convolutional Neural Networks (97.8% accuracy), Full-stack MERN & Django REST integration.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeFocus === 'ai' ? 'opacity-40 scale-98' : 'opacity-100 scale-100'
                } ${
                  isDark ? 'bg-[#20183e]/70 border-violet-900/60 hover:border-violet-500/40' : 'bg-violet-50/50 border-violet-200 hover:border-violet-300'
                }`}>
                  <div className={`flex items-center gap-2 text-sm font-semibold mb-1 ${
                    isDark ? 'text-violet-300' : 'text-violet-700'
                  }`}>
                    <Radio className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                    <span>Signals & Physical Hardware</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-violet-200/70' : 'text-slate-600'}`}>
                    SDR spectrum monitoring (HackRF/RTL-SDR), ESP32-S3 systems, CST/HFSS antenna design, and IoT automation.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom highlight pill */}
            <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono ${
              isDark ? 'border-violet-900/40 text-violet-300/80' : 'border-violet-100 text-slate-600'
            }`}>
              <span className="flex items-center gap-1.5 text-violet-500">
                <CheckCircle2 className="w-4 h-4 text-violet-500" />
                Dual-Specialization Approach
              </span>
              <span className={isDark ? 'text-violet-300/60' : 'text-slate-500'}>
                Competitive Coder · Open Source Contributor
              </span>
            </div>
          </motion.div>

          {/* Education & Academic Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:col-span-5 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
              isDark 
                ? 'bg-[#18122e]/90 border-violet-900/60 hover:border-violet-500/50 shadow-xl shadow-black/40' 
                : 'bg-white border-violet-100 hover:border-violet-300 shadow-sm shadow-violet-500/5'
            }`}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-500 font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Formal Education</span>
                </div>
                <span className={`font-mono text-xs px-2.5 py-1 rounded-full border font-semibold ${
                  isDark ? 'bg-violet-500/15 text-violet-300 border-violet-500/30' : 'bg-violet-50 text-violet-600 border-violet-200'
                }`}>
                  CGPA: {PERSONAL_INFO.education.cgpa} / 10.0
                </span>
              </div>

              <div>
                <h3 className={`text-xl font-bold ${
                  isDark ? 'text-violet-50' : 'text-slate-900'
                }`}>
                  {PERSONAL_INFO.education.institution}
                </h3>
                <p className="text-sm font-medium text-violet-500 mt-1">
                  {PERSONAL_INFO.education.degree}
                </p>
              </div>

              <div className={`flex flex-wrap items-center gap-4 text-xs font-mono pt-1 ${
                isDark ? 'text-violet-300/70' : 'text-slate-500'
              }`}>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  {PERSONAL_INFO.education.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  {PERSONAL_INFO.education.location}
                </span>
              </div>

              {/* Core Coursework with interactive tags */}
              <div className="space-y-2 pt-2">
                <div className={`flex items-center gap-1.5 text-xs font-mono ${
                  isDark ? 'text-violet-300/80' : 'text-slate-600'
                }`}>
                  <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                  <span>Key ECE & Computational Coursework:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PERSONAL_INFO.education.coursework.map((course, idx) => (
                    <motion.span 
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors cursor-default ${
                        isDark 
                          ? 'bg-[#20183e] border-violet-900/60 text-violet-200 hover:border-violet-400/50 hover:text-violet-100' 
                          : 'bg-violet-50/50 border-violet-200 text-slate-700 hover:border-violet-400 hover:text-violet-700'
                      }`}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Track Record Footer */}
            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isDark ? 'border-violet-900/40 text-violet-300/80' : 'border-violet-100 text-slate-600'
            }`}>
              <span className={isDark ? 'text-violet-300/60' : 'text-slate-400'}>Class of 2027</span>
              <span className="text-violet-500 font-semibold">Consistent Honors Track</span>
            </div>
          </motion.div>

        </div>

        {/* Highlight Stats Row with Staggered Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {PERSONAL_INFO.stats.map((stat, i) => {
            const Content = (
              <>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-400">
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm font-semibold mt-1 ${isDark ? 'text-violet-100' : 'text-slate-800'}`}>
                  {stat.label}
                </div>
                <div className={`text-[11px] mt-0.5 font-mono ${isDark ? 'text-violet-300/70' : 'text-slate-500'}`}>
                  {stat.subtext}
                </div>
              </>
            );

            return stat.link ? (
              <motion.a
                key={i}
                href={stat.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`p-4 sm:p-5 rounded-xl border text-center transition-all group hover:shadow-xl ${
                  isDark 
                    ? 'bg-[#18122e]/80 border-violet-900/60 hover:border-violet-500/60 hover:bg-[#20183e]' 
                    : 'bg-white border-violet-200 hover:border-violet-400 hover:shadow-md'
                }`}
                title={`Open ${stat.label} link`}
              >
                {Content}
                <div className="mt-2 text-[10px] font-mono text-violet-500 group-hover:underline flex items-center justify-center gap-1">
                  <span>View Verified Profile →</span>
                </div>
              </motion.a>
            ) : (
              <motion.div 
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`p-4 sm:p-5 rounded-xl border text-center transition-all ${
                  isDark 
                    ? 'bg-[#18122e]/80 border-violet-900/60 hover:border-violet-700' 
                    : 'bg-white border-violet-200 hover:border-violet-300 shadow-sm'
                }`}
              >
                {Content}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
