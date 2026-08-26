import React from 'react';
import { 
  Code2, 
  GitFork, 
  Languages, 
  Users, 
  Flame, 
  ExternalLink, 
  ArrowRight,
  Heart,
  Award,
  Sparkles
} from 'lucide-react';
import { EXTRACURRICULARS } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface ExtracurricularProps {
  theme: ThemeMode;
}

export const Extracurricular: React.FC<ExtracurricularProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const getItemIconData = (iconType: string) => {
    switch (iconType) {
      case 'code':
        return {
          icon: <Code2 className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />,
          container: isDark ? 'bg-amber-950/50 border-amber-800/60' : 'bg-amber-50 border-amber-200 shadow-sm',
        };
      case 'git':
        return {
          icon: <GitFork className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />,
          container: isDark ? 'bg-blue-950/50 border-blue-800/60' : 'bg-blue-50 border-blue-200 shadow-sm',
        };
      case 'languages':
        return {
          icon: <Languages className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />,
          container: isDark ? 'bg-emerald-950/50 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200 shadow-sm',
        };
      case 'users':
        return {
          icon: <Users className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-violet-950/50 border-violet-800/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'heart':
        return {
          icon: <Heart className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />,
          container: isDark ? 'bg-rose-950/50 border-rose-800/60' : 'bg-rose-50 border-rose-200 shadow-sm',
        };
      case 'award':
        return {
          icon: <Award className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />,
          container: isDark ? 'bg-amber-950/50 border-amber-800/60' : 'bg-amber-50 border-amber-200 shadow-sm',
        };
      default:
        return {
          icon: <Sparkles className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />,
          container: isDark ? 'bg-cyan-950/50 border-cyan-800/60' : 'bg-cyan-50 border-cyan-200 shadow-sm',
        };
    }
  };

  return (
    <section 
      id="extracurricular" 
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-blue-500"></span>
            <span>06 // BEYOND THE RESUME</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Leadership, Coding Streaks & Global Learning
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Consistent problem solving, open-source engagement, NSS camp hospitality leadership, and continuous language proficiency.
          </p>
        </div>

        {/* 4-Item Balanced 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {EXTRACURRICULARS.map((item) => (
            <div
              key={item.id}
              id={`extracurricular-card-${item.id}`}
              className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isDark 
                  ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-slate-700/90 shadow-sm' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-md shadow-slate-200/50'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const itemIcon = getItemIconData(item.icon);
                      return (
                        <div className={`p-2.5 rounded-xl border transition-all ${itemIcon.container}`}>
                          {itemIcon.icon}
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className={`font-bold text-base sm:text-lg leading-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full border font-semibold shrink-0 ${
                    isDark 
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    {item.metric}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {item.description}
                </p>

                {/* Tag Chips */}
                <div className={`flex flex-wrap gap-1.5 pt-3 border-t ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer item link */}
              {item.link && (
                <div className={`mt-6 pt-3.5 border-t flex items-center justify-between text-xs font-mono ${
                  isDark ? 'border-slate-800 text-blue-400' : 'border-slate-100 text-blue-600'
                }`}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:underline font-medium"
                  >
                    <span>View Activity & Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
