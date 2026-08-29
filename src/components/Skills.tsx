import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Cpu, 
  Radio, 
  Code, 
  Wrench, 
  Search, 
  Sparkles, 
  Check,
  Terminal,
  Zap,
  X,
  Layers
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface SkillsProps {
  theme: ThemeMode;
}

export const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isDark = theme === 'dark';

  const getCategoryAccent = (id: string) => {
    switch (id) {
      case 'aiml':
        return {
          pill: isDark 
            ? 'bg-violet-950/40 border-violet-800/60 text-violet-300 hover:border-violet-500' 
            : 'bg-violet-50 border-violet-200 text-violet-700 hover:border-violet-400 font-medium',
          badge: isDark 
            ? 'text-violet-300 bg-violet-500/10 border-violet-500/30' 
            : 'text-violet-700 bg-violet-50 border-violet-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-violet-950/50 border-violet-800/60' 
            : 'bg-violet-50 border-violet-200 shadow-sm',
          iconColor: isDark ? 'text-violet-400' : 'text-violet-600',
        };
      case 'embedded':
        return {
          pill: isDark 
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:border-emerald-500' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400 font-medium',
          badge: isDark 
            ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' 
            : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-emerald-950/50 border-emerald-800/60' 
            : 'bg-emerald-50 border-emerald-200 shadow-sm',
          iconColor: isDark ? 'text-emerald-400' : 'text-emerald-600',
        };
      case 'rf':
        return {
          pill: isDark 
            ? 'bg-cyan-950/40 border-cyan-800/60 text-cyan-300 hover:border-cyan-500' 
            : 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:border-cyan-400 font-medium',
          badge: isDark 
            ? 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30' 
            : 'text-cyan-700 bg-cyan-50 border-cyan-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-cyan-950/50 border-cyan-800/60' 
            : 'bg-cyan-50 border-cyan-200 shadow-sm',
          iconColor: isDark ? 'text-cyan-400' : 'text-cyan-600',
        };
      case 'languages':
        return {
          pill: isDark 
            ? 'bg-blue-950/40 border-blue-800/60 text-blue-300 hover:border-blue-500' 
            : 'bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-400 font-medium',
          badge: isDark 
            ? 'text-blue-300 bg-blue-500/10 border-blue-500/30' 
            : 'text-blue-700 bg-blue-50 border-blue-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-blue-950/50 border-blue-800/60' 
            : 'bg-blue-50 border-blue-200 shadow-sm',
          iconColor: isDark ? 'text-blue-400' : 'text-blue-600',
        };
      default:
        return {
          pill: isDark 
            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600' 
            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400 font-medium',
          badge: isDark 
            ? 'text-amber-300 bg-amber-500/10 border-amber-500/30' 
            : 'text-amber-700 bg-amber-50 border-amber-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-amber-950/50 border-amber-800/60' 
            : 'bg-amber-50 border-amber-200 shadow-sm',
          iconColor: isDark ? 'text-amber-400' : 'text-amber-600',
        };
    }
  };

  const renderCategoryIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className={`w-5 h-5 ${colorClass}`} />;
      case 'Cpu':
        return <Cpu className={`w-5 h-5 ${colorClass}`} />;
      case 'Radio':
        return <Radio className={`w-5 h-5 ${colorClass}`} />;
      case 'Code':
        return <Code className={`w-5 h-5 ${colorClass}`} />;
      case 'Wrench':
        return <Wrench className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Terminal className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  // Filter categories and skills
  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() === '') return true;

    return (
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <section 
      id="skills" 
      className={`py-20 sm:py-24 border-t transition-colors scroll-mt-16 sm:scroll-mt-20 ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
              <span className="w-6 h-px bg-blue-500"></span>
              <span>02 // TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Engineering Skill Set & Stack
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Categorized proficiency across machine learning, digital signal processing, hardware prototyping, and systems engineering.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-80 md:w-96 shrink-0">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              searchQuery ? 'text-blue-500' : 'text-slate-400'
            }`} />
            <input
              type="text"
              id="skills-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g., PyTorch, SDR, C++)..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 focus:border-blue-500 text-slate-100 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 focus:border-blue-500 text-slate-900 placeholder-slate-400 shadow-inner'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20 scale-105'
                : isDark 
                  ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700' 
                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Disciplines ({SKILL_CATEGORIES.length})
          </button>

          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? isDark 
                      ? 'bg-slate-800 border-2 border-blue-500 text-white font-semibold shadow-md scale-105' 
                      : 'bg-white border-2 border-blue-600 text-blue-900 font-semibold shadow-md scale-105'
                    : isDark 
                      ? 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700' 
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? 'bg-blue-500 text-white' 
                    : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Skill Cards Grid with Motion AnimatePresence & Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, idx) => {
              const accent = getCategoryAccent(category.id);

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-slate-700/80 shadow-black/20' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-md shadow-slate-100'
                  }`}
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800/40">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${accent.iconContainer}`}>
                          {renderCategoryIcon(category.iconName, accent.iconColor)}
                        </div>
                        <div>
                          <h3 className={`font-bold text-base ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            {category.name}
                          </h3>
                          <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {category.skills.length} core technologies
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => {
                        const matchesSearch = searchQuery.trim() !== '' && 
                          skill.name.toLowerCase().includes(searchQuery.toLowerCase());

                        return (
                          <motion.div
                            key={sIdx}
                            whileHover={{ scale: 1.04, y: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono border flex items-center gap-2 transition-all cursor-default ${
                              matchesSearch
                                ? 'ring-2 ring-blue-500 bg-blue-500/20 text-blue-300 font-bold border-blue-400'
                                : accent.pill
                            }`}
                          >
                            <span className="font-medium">{skill.name}</span>
                            
                            {/* Confidence / Proficiency Indicator */}
                            {skill.level && (
                              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                                skill.level === 'Advanced'
                                  ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {skill.level}
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Micro Footer Indicator */}
                  <div className="mt-5 pt-3 border-t border-slate-800/30 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Verified Project Usage</span>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <div className={`p-12 rounded-2xl border text-center my-8 ${
            isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <p className="text-sm font-mono mb-2">No engineering skills matched "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs font-mono text-blue-500 hover:underline cursor-pointer"
            >
              Reset search filters →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
