import React from 'react';
import { motion } from 'motion/react';
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
          icon: <Code2 className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'git':
        return {
          icon: <GitFork className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'languages':
        return {
          icon: <Languages className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'users':
        return {
          icon: <Users className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'heart':
        return {
          icon: <Heart className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'award':
        return {
          icon: <Award className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      default:
        return {
          icon: <Sparkles className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
    }
  };

  return (
    <section 
      id="extracurricular" 
      className={`py-20 sm:py-24 border-t transition-colors scroll-mt-16 sm:scroll-mt-20 ${
        isDark ? 'bg-[#0f0b1c] border-violet-950/80' : 'bg-white border-violet-100'
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
            <span>07 // BEYOND THE RESUME</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-violet-50' : 'text-slate-900'
          }`}>
            Leadership, Coding Streaks & Global Learning
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-violet-200/70' : 'text-slate-600'
          }`}>
            Consistent problem solving, open-source engagement, NSS camp hospitality leadership, and continuous language proficiency.
          </p>
        </motion.div>

        {/* 4-Item Balanced 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {EXTRACURRICULARS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, scale: 1.01 }}
              id={`extracurricular-card-${item.id}`}
              className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
                isDark 
                  ? 'bg-[#18122e]/90 border-violet-900/60 hover:border-violet-500/50 shadow-black/30' 
                  : 'bg-white border-violet-100 hover:border-violet-300 shadow-sm shadow-violet-500/5'
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
                      <h3 className={`font-bold text-base sm:text-lg leading-tight ${isDark ? 'text-violet-50' : 'text-slate-900'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-violet-300/70' : 'text-slate-500'}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full border font-semibold shrink-0 ${
                    isDark 
                      ? 'bg-violet-500/10 text-violet-300 border-violet-500/30' 
                      : 'bg-violet-50 text-violet-700 border-violet-200'
                  }`}>
                    <Flame className="w-3.5 h-3.5 text-violet-500 animate-bounce" />
                    {item.metric}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                  isDark ? 'text-violet-100/90' : 'text-slate-600'
                }`}>
                  {item.description}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`text-xs font-mono px-2 py-0.5 rounded border ${
                        isDark ? 'bg-[#20183e] border-violet-900/60 text-violet-200' : 'bg-violet-50/70 border-violet-200 text-slate-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action link if available */}
              {item.link && (
                <div className={`pt-4 border-t flex items-center justify-between ${
                  isDark ? 'border-violet-900/40' : 'border-violet-100'
                }`}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-all group ${
                      isDark ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'
                    }`}
                  >
                    <span>View Profile & Badges</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
