import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Radio, 
  Brain, 
  Cpu, 
  Eye, 
  Home, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  Zap,
  Maximize2,
  Rocket,
  Ticket,
  Palette,
  Bot
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ThemeMode } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsProps {
  theme: ThemeMode;
}

export const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [filter, setFilter] = useState<'all' | 'ai-ml' | 'embedded-rf' | 'software'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isDark = theme === 'dark';

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const getDomainIconData = (iconType: string) => {
    switch (iconType) {
      case 'radio':
        return {
          icon: <Radio className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />,
          container: isDark ? 'bg-cyan-950/50 border-cyan-800/60' : 'bg-cyan-50 border-cyan-200 shadow-sm',
        };
      case 'brain':
        return {
          icon: <Brain className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-violet-950/50 border-violet-800/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'rocket':
        return {
          icon: <Rocket className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />,
          container: isDark ? 'bg-amber-950/50 border-amber-800/60' : 'bg-amber-50 border-amber-200 shadow-sm',
        };
      case 'bot':
        return {
          icon: <Bot className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />,
          container: isDark ? 'bg-emerald-950/50 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200 shadow-sm',
        };
      case 'ticket':
        return {
          icon: <Ticket className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />,
          container: isDark ? 'bg-blue-950/50 border-blue-800/60' : 'bg-blue-50 border-blue-200 shadow-sm',
        };
      case 'palette':
        return {
          icon: <Palette className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />,
          container: isDark ? 'bg-rose-950/50 border-rose-800/60' : 'bg-rose-50 border-rose-200 shadow-sm',
        };
      case 'eye':
        return {
          icon: <Eye className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />,
          container: isDark ? 'bg-blue-950/50 border-blue-800/60' : 'bg-blue-50 border-blue-200 shadow-sm',
        };
      case 'home':
        return {
          icon: <Home className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />,
          container: isDark ? 'bg-amber-950/50 border-amber-800/60' : 'bg-amber-50 border-amber-200 shadow-sm',
        };
      default:
        return {
          icon: <Cpu className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />,
          container: isDark ? 'bg-emerald-950/50 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200 shadow-sm',
        };
    }
  };

  return (
    <section 
      id="projects" 
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
              <span>04 // FEATURED ENGINEERING PROJECTS</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Intelligent Software & RF Hardware Systems
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              From SDR anti-drone surveillance and Deep RL Lunar Landers to 97.8% accurate CNN diagnostics, empathetic NLP companions, and full-stack systems.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={`flex flex-wrap rounded-xl p-1 border text-xs font-mono gap-1 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              id="filter-projects-all"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Systems ({PROJECTS.length})
            </button>
            <button
              id="filter-projects-aiml"
              onClick={() => setFilter('ai-ml')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'ai-ml'
                  ? 'bg-violet-600 text-white font-medium shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AI / ML & RL
            </button>
            <button
              id="filter-projects-embedded"
              onClick={() => setFilter('embedded-rf')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'embedded-rf'
                  ? 'bg-emerald-600 text-white font-medium shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Embedded & RF
            </button>
            <button
              id="filter-projects-software"
              onClick={() => setFilter('software')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'software'
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full-Stack & Systems
            </button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`group rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden ${
                isDark
                  ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100'
              }`}
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Icon + Meta Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  {(() => {
                    const iconData = getDomainIconData(project.domainIcon);
                    return (
                      <div className={`p-2.5 rounded-xl border group-hover:scale-105 transition-all ${iconData.container}`}>
                        {iconData.icon}
                      </div>
                    );
                  })()}

                  <div className="flex items-center gap-2">
                    {/* GitHub Link Icon (only if repository exists) */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        id={`project-github-${project.id}`}
                        className={`p-2 rounded-lg border transition-colors ${
                          isDark 
                            ? 'border-slate-700/50 hover:border-slate-500 text-slate-400 hover:text-white' 
                            : 'border-slate-200 hover:border-slate-400 text-slate-500 hover:text-slate-900'
                        }`}
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {/* Inspect Modal Trigger */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        isDark 
                          ? 'border-slate-700/50 hover:border-blue-500 text-slate-400 hover:text-blue-400' 
                          : 'border-slate-200 hover:border-blue-400 text-slate-500 hover:text-blue-600'
                      }`}
                      title="Open Technical Deep Dive"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Category & Title */}
                <span className="text-[11px] font-mono font-medium text-blue-500 tracking-wide">
                  {project.categoryLabel}
                </span>

                <h3 className={`text-xl font-bold tracking-tight mt-1 mb-2 group-hover:text-blue-500 transition-colors ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {project.title}
                </h3>

                {/* Subtitle / Metric badge */}
                {project.metric && (
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono mb-3 font-semibold border ${
                    isDark 
                      ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    <Zap className="w-3 h-3 text-blue-500" />
                    <span>{project.metric}</span>
                  </div>
                )}

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {project.description}
                </p>
              </div>

              {/* Bottom Section: Tech Stack Pills & Action */}
              <div className={`space-y-4 pt-4 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-100'
              }`}>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-slate-800/40 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Deep Dive Action Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-mono font-medium flex items-center justify-between border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 hover:bg-blue-950/40 text-slate-300 hover:text-blue-300 border-slate-800 hover:border-blue-700/60'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200 hover:border-blue-300 shadow-sm'
                  }`}
                >
                  <span>System Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
      />
    </section>
  );
};
