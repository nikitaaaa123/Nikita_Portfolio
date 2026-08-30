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
            ? 'bg-[#20183e] border-violet-900/60 text-violet-200 hover:border-violet-500' 
            : 'bg-violet-50/70 border-violet-200 text-violet-800 hover:border-violet-300 font-medium',
          badge: isDark 
            ? 'text-violet-300 bg-violet-500/10 border-violet-500/30' 
            : 'text-violet-700 bg-violet-50 border-violet-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-[#20183e] border-violet-900/60' 
            : 'bg-violet-50 border-violet-200 shadow-sm',
          iconColor: isDark ? 'text-violet-400' : 'text-violet-600',
        };
      case 'embedded':
        return {
          pill: isDark 
            ? 'bg-[#20183e] border-violet-900/60 text-violet-200 hover:border-violet-500' 
            : 'bg-violet-50/70 border-violet-200 text-violet-800 hover:border-violet-300 font-medium',
          badge: isDark 
            ? 'text-violet-300 bg-violet-500/10 border-violet-500/30' 
            : 'text-violet-700 bg-violet-50 border-violet-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-[#20183e] border-violet-900/60' 
            : 'bg-violet-50 border-violet-200 shadow-sm',
          iconColor: isDark ? 'text-violet-400' : 'text-violet-600',
        };
      case 'rf':
        return {
          pill: isDark 
            ? 'bg-[#20183e] border-violet-900/60 text-violet-200 hover:border-violet-500' 
            : 'bg-violet-50/70 border-violet-200 text-violet-800 hover:border-violet-300 font-medium',
          badge: isDark 
            ? 'text-violet-300 bg-violet-500/10 border-violet-500/30' 
            : 'text-violet-700 bg-violet-50 border-violet-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-[#20183e] border-violet-900/60' 
            : 'bg-violet-50 border-violet-200 shadow-sm',
          iconColor: isDark ? 'text-violet-400' : 'text-violet-600',
        };
      case 'languages':
        return {
          pill: isDark 
            ? 'bg-[#20183e] border-violet-900/60 text-violet-200 hover:border-violet-500' 
            : 'bg-violet-50/70 border-violet-200 text-violet-800 hover:border-violet-300 font-medium',
          badge: isDark 
            ? 'text-violet-300 bg-violet-500/10 border-violet-500/30' 
            : 'text-violet-700 bg-violet-50 border-violet-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-[#20183e] border-violet-900/60' 
            : 'bg-violet-50 border-violet-200 shadow-sm',
          iconColor: isDark ? 'text-violet-400' : 'text-violet-600',
        };
      default:
        return {
          pill: isDark 
            ? 'bg-[#20183e] border-violet-900/60 text-violet-200 hover:border-violet-500' 
            : 'bg-violet-50/70 border-violet-200 text-violet-800 hover:border-violet-300 font-medium',
          badge: isDark 
            ? 'text-violet-300 bg-violet-500/10 border-violet-500/30' 
            : 'text-violet-700 bg-violet-50 border-violet-200 font-semibold',
          iconContainer: isDark 
            ? 'bg-[#20183e] border-violet-900/60' 
            : 'bg-violet-50 border-violet-200 shadow-sm',
          iconColor: isDark ? 'text-violet-400' : 'text-violet-600',
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
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-violet-500 font-semibold uppercase tracking-wider mb-2">
              <span className="w-6 h-px bg-violet-500"></span>
              <span>02 // TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-violet-50' : 'text-slate-900'
            }`}>
              Engineering Skill Set & Stack
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-violet-200/70' : 'text-slate-600'
            }`}>
              Categorized proficiency across machine learning, digital signal processing, hardware prototyping, and systems engineering.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-80 md:w-96 shrink-0">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              searchQuery ? 'text-violet-500' : isDark ? 'text-violet-300/40' : 'text-slate-400'
            }`} />
            <input
              type="text"
              id="skills-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g., PyTorch, SDR, C++)..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                isDark 
                  ? 'bg-[#18122e] border-violet-900/60 focus:border-violet-400 text-violet-100 placeholder-violet-400/40' 
                  : 'bg-violet-50/50 border-violet-200 focus:border-violet-400 text-slate-900 placeholder-slate-400 shadow-inner'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-200 cursor-pointer"
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
                ? 'bg-violet-500 text-white font-semibold shadow-md shadow-violet-500/25 scale-105'
                : isDark 
                  ? 'bg-[#18122e] border border-violet-900/60 text-violet-300 hover:text-violet-100 hover:border-violet-500/50' 
                  : 'bg-violet-50/70 border border-violet-200 text-slate-600 hover:text-violet-600'
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
                      ? 'bg-[#20183e] border-2 border-violet-500 text-white font-semibold shadow-md scale-105' 
                      : 'bg-white border-2 border-violet-500 text-violet-900 font-semibold shadow-md scale-105'
                    : isDark 
                      ? 'bg-[#18122e]/80 border border-violet-900/60 text-violet-300 hover:text-violet-100 hover:border-violet-500/50' 
                      : 'bg-violet-50/50 border border-violet-200 text-slate-600 hover:text-violet-600'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? 'bg-violet-500 text-white' 
                    : isDark ? 'bg-violet-950 text-violet-300' : 'bg-violet-100 text-violet-700'
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
                      ? 'bg-[#18122e]/90 border-violet-900/60 hover:border-violet-500/50 shadow-black/30' 
                      : 'bg-white border-violet-100 hover:border-violet-300 shadow-sm shadow-violet-500/5'
                  }`}
                >
                  <div>
                    {/* Category Header */}
                    <div className={`flex items-center justify-between gap-3 mb-5 pb-3 border-b ${
                      isDark ? 'border-violet-900/40' : 'border-violet-100'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${accent.iconContainer}`}>
                          {renderCategoryIcon(category.iconName, accent.iconColor)}
                        </div>
                        <div>
                          <h3 className={`font-bold text-base ${isDark ? 'text-violet-50' : 'text-slate-900'}`}>
                            {category.name}
                          </h3>
                          <p className={`text-xs font-mono ${isDark ? 'text-violet-300/70' : 'text-slate-500'}`}>
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
                                ? 'ring-2 ring-violet-500 bg-violet-500/20 text-violet-200 font-bold border-violet-400'
                                : accent.pill
                            }`}
                          >
                            <span className="font-medium">{skill.name}</span>
                            
                            {/* Confidence / Proficiency Indicator */}
                            {skill.level && (
                              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                                skill.level === 'Advanced'
                                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                                  : 'bg-violet-500/15 text-violet-400'
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
                  <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                    isDark ? 'border-violet-900/40 text-violet-300/60' : 'border-violet-100 text-slate-400'
                  }`}>
                    <span>Verified Project Usage</span>
                    <Check className="w-3.5 h-3.5 text-violet-500" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <div className={`p-12 rounded-2xl border text-center my-8 ${
            isDark ? 'bg-[#18122e] border-violet-900/60 text-violet-300' : 'bg-violet-50/50 border-violet-200 text-slate-600'
          }`}>
            <p className="text-sm font-mono mb-2">No engineering skills matched "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs font-mono text-violet-500 hover:underline cursor-pointer"
            >
              Reset search filters →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
