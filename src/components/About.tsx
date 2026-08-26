import React from 'react';
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
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { ProfileImage } from './ProfileImage';

interface AboutProps {
  theme: ThemeMode;
}

export const About: React.FC<AboutProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section 
      id="about" 
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-blue-500"></span>
            <span>01 // BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Bridging Intelligent Models & Physical Silicon
          </h2>
        </div>

        {/* Narrative & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Narrative Card */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all ${
            isDark 
              ? 'bg-[#0e1420]/80 border-slate-800/90 shadow-xl shadow-black/20' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-100'
          }`}>
            <div className="space-y-5">
              {/* Header with Photo and Specialization Badges */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div className="flex items-center gap-4">
                  <ProfileImage size="md" showBadge={false} />
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Nikita Bhansali
                    </h3>
                    <p className="text-xs font-mono text-blue-400">
                      B.Tech ECE · AI/ML & Embedded Systems
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`p-2 rounded-xl border ${
                    isDark ? 'bg-blue-950/50 border-blue-800/60 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                  }`}>
                    <Brain className="w-4 h-4" />
                  </span>
                  <span className={`p-2 rounded-xl border ${
                    isDark ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm'
                  }`}>
                    <Radio className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {PERSONAL_INFO.bio}
              </p>

              {/* Dual specialization value proposition */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 text-sm font-semibold mb-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-700'
                  }`}>
                    <Brain className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span>Software & Intelligence</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    NLP intent triage, Convolutional Neural Networks (97.8% accuracy), Full-stack MERN & Django REST integration.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 text-sm font-semibold mb-1 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    <Radio className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span>Signals & Physical Hardware</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    SDR spectrum monitoring (HackRF/RTL-SDR), ESP32-S3 systems, CST/HFSS antenna design, and IoT automation.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom highlight pill */}
            <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <span className="flex items-center gap-1.5 text-blue-400">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Dual-Specialization Approach
              </span>
              <span className="text-slate-500">
                Competitive Coder · Open Source Contributor
              </span>
            </div>
          </div>

          {/* Education & Academic Card */}
          <div className={`lg:col-span-5 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all ${
            isDark 
              ? 'bg-[#0e1420]/80 border-slate-800/90 shadow-xl shadow-black/20' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-100'
          }`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Formal Education</span>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  CGPA: {PERSONAL_INFO.education.cgpa} / 10.0
                </span>
              </div>

              <div>
                <h3 className={`text-xl font-bold ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {PERSONAL_INFO.education.institution}
                </h3>
                <p className="text-sm font-medium text-blue-400 mt-1">
                  {PERSONAL_INFO.education.degree}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {PERSONAL_INFO.education.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {PERSONAL_INFO.education.location}
                </span>
              </div>

              {/* Core Coursework */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Key ECE & Computational Coursework:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PERSONAL_INFO.education.coursework.map((course, idx) => (
                    <span 
                      key={idx}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        isDark 
                          ? 'bg-slate-900/80 border-slate-800 text-slate-300' 
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Track Record Footer */}
            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <span className="text-slate-400">Class of 2027</span>
              <span className="text-emerald-400 font-semibold">Consistent Honors Track</span>
            </div>
          </div>

        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {PERSONAL_INFO.stats.map((stat, i) => {
            const Content = (
              <>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm font-semibold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  {stat.subtext}
                </div>
              </>
            );

            return stat.link ? (
              <a
                key={i}
                href={stat.link}
                target="_blank"
                rel="noreferrer"
                className={`p-4 sm:p-5 rounded-xl border text-center transition-all group hover:-translate-y-1 hover:shadow-lg ${
                  isDark 
                    ? 'bg-slate-900/40 border-slate-800/80 hover:border-blue-500/60 hover:bg-slate-900/80' 
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
                }`}
                title={`Open ${stat.label} link`}
              >
                {Content}
                <div className="mt-2 text-[10px] font-mono text-blue-400 group-hover:underline flex items-center justify-center gap-1">
                  <span>View Verified Profile →</span>
                </div>
              </a>
            ) : (
              <div 
                key={i}
                className={`p-4 sm:p-5 rounded-xl border text-center transition-all ${
                  isDark 
                    ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {Content}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
