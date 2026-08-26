import React, { useState } from 'react';
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
  Zap
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
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
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
              id="skill-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. PyTorch, SDR)..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm font-sans border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/60 shadow-sm ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-700/90 text-slate-100 placeholder-slate-400 focus:border-blue-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-xs transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className={`flex flex-wrap gap-2 pb-8 border-b mb-8 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
          <button
            id="skill-tab-all"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-semibold'
                : isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Categories ({SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>

          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`skill-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-semibold'
                    : isDark
                    ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const accent = getCategoryAccent(category.id);
            const matchingSkills = category.skills.filter((skill) =>
              searchQuery.trim() === ''
                ? true
                : skill.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
              <div
                key={category.id}
                id={`skill-category-card-${category.id}`}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                  isDark 
                    ? 'bg-[#0e1420]/70 border-slate-800/90 hover:border-slate-700/90 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Category Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border transition-colors ${accent.iconContainer}`}>
                        {renderCategoryIcon(category.iconName, accent.iconColor)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-base ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          {category.name}
                        </h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${accent.badge}`}>
                          {matchingSkills.length} Technologies
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 min-h-[32px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {category.description}
                  </p>

                  {/* Skills Pill Row */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {matchingSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        id={`skill-tag-${category.id}-${sIdx}`}
                        className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all duration-150 cursor-default ${accent.pill}`}
                      >
                        {skill.highlight && (
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 -translate-y-0.5 ${
                            isDark ? 'bg-blue-400' : 'bg-blue-600'
                          }`}></span>
                        )}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Micro Tag */}
                <div className={`mt-6 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                  isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <span>Specialized Module</span>
                  <span className="text-blue-500 font-medium">Verified Hands-on</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Feedback */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              No matching skills found for "{searchQuery}". Try searching for Python, SDR, ESP32, or TensorFlow.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
