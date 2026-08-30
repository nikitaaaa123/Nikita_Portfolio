import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { TiltCard } from './TiltCard';

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
          icon: <Radio className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'brain':
        return {
          icon: <Brain className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'rocket':
        return {
          icon: <Rocket className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'bot':
        return {
          icon: <Bot className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'ticket':
        return {
          icon: <Ticket className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'palette':
        return {
          icon: <Palette className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'eye':
        return {
          icon: <Eye className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'home':
        return {
          icon: <Home className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      default:
        return {
          icon: <Cpu className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
    }
  };

  return (
    <section 
      id="projects" 
      className={`py-16 sm:py-24 border-t transition-colors scroll-mt-16 sm:scroll-mt-20 ${
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
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-violet-500 font-semibold uppercase tracking-wider mb-2">
              <span className="w-6 h-px bg-violet-500"></span>
              <span>05 // FEATURED ENGINEERING PROJECTS</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-violet-50' : 'text-slate-900'
            }`}>
              Intelligent Software & RF Hardware Systems
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-violet-200/70' : 'text-slate-600'
            }`}>
              From SDR anti-drone radar surveillance and Deep RL Lunar Landers to 97.8% accurate CNN diagnostics, empathetic NLP companions, and full-stack systems.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={`flex flex-wrap rounded-xl p-1 border text-xs font-mono gap-1 ${
            isDark ? 'bg-[#18122e] border-violet-900/60' : 'bg-violet-50/70 border-violet-200'
          }`}>
            <button
              id="filter-projects-all"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-violet-500 text-white font-medium shadow-sm'
                  : isDark ? 'text-violet-300/80 hover:text-violet-100' : 'text-slate-600 hover:text-violet-600'
              }`}
            >
              All Systems ({PROJECTS.length})
            </button>
            <button
              id="filter-projects-aiml"
              onClick={() => setFilter('ai-ml')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'ai-ml'
                  ? 'bg-violet-500 text-white font-medium shadow-sm'
                  : isDark ? 'text-violet-300/80 hover:text-violet-100' : 'text-slate-600 hover:text-violet-600'
              }`}
            >
              AI / ML & RL
            </button>
            <button
              id="filter-projects-embedded"
              onClick={() => setFilter('embedded-rf')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'embedded-rf'
                  ? 'bg-violet-500 text-white font-medium shadow-sm'
                  : isDark ? 'text-violet-300/80 hover:text-violet-100' : 'text-slate-600 hover:text-violet-600'
              }`}
            >
              Embedded & RF
            </button>
            <button
              id="filter-projects-software"
              onClick={() => setFilter('software')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'software'
                  ? 'bg-violet-500 text-white font-medium shadow-sm'
                  : isDark ? 'text-violet-300/80 hover:text-violet-100' : 'text-slate-600 hover:text-violet-600'
              }`}
            >
              Full-Stack & Systems
            </button>
          </div>
        </motion.div>

        {/* Project Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="h-full"
              >
                <TiltCard
                  id={`project-card-${project.id}`}
                  maxTilt={8}
                  scaleOnHover={1.02}
                  className={`group h-full rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isDark
                      ? 'bg-[#18122e]/90 border-violet-900/60 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10'
                      : 'bg-white border-violet-100 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/10'
                  }`}
                >
                  {/* Top Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Header Icon + Meta Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      {(() => {
                        const iconData = getDomainIconData(project.domainIcon);
                        return (
                          <div className={`p-2.5 rounded-xl border group-hover:scale-110 transition-transform ${iconData.container}`}>
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
                                ? 'border-violet-900/60 hover:border-violet-500 text-violet-300 hover:text-white' 
                                : 'border-violet-200 hover:border-violet-400 text-slate-500 hover:text-violet-600'
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
                              ? 'border-violet-900/60 hover:border-violet-400 text-violet-300 hover:text-violet-200' 
                              : 'border-violet-200 hover:border-violet-400 text-slate-500 hover:text-violet-600'
                          }`}
                          title="Open Technical Deep Dive"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Category & Title */}
                    <span className="text-[11px] font-mono font-medium text-violet-500 tracking-wide">
                      {project.categoryLabel}
                    </span>

                    <h3 className={`text-xl font-bold tracking-tight mt-1 mb-2 group-hover:text-violet-500 transition-colors ${
                      isDark ? 'text-violet-50' : 'text-slate-900'
                    }`}>
                      {project.title}
                    </h3>

                    {/* Subtitle / Metric badge */}
                    {project.metric && (
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono mb-3 font-semibold border ${
                        isDark 
                          ? 'bg-violet-500/10 text-violet-300 border-violet-500/20' 
                          : 'bg-violet-50 text-violet-700 border-violet-200'
                      }`}>
                        <Zap className="w-3 h-3 text-violet-500" />
                        <span>{project.metric}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isDark ? 'text-violet-100/90' : 'text-slate-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Section: Tech Stack Pills & Action */}
                  <div className={`space-y-4 pt-4 border-t ${
                    isDark ? 'border-violet-900/40' : 'border-violet-100'
                  }`}>
                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                            isDark 
                              ? 'bg-[#20183e] border-violet-900/60 text-violet-200' 
                              : 'bg-violet-50/70 border-violet-200 text-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isDark ? 'bg-violet-950 text-violet-300' : 'bg-violet-100 text-violet-600'
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
                          ? 'bg-[#20183e] hover:bg-violet-950/60 text-violet-200 hover:text-white border-violet-900/60 hover:border-violet-500/50'
                          : 'bg-violet-50/60 hover:bg-violet-100/80 text-violet-900 hover:text-violet-950 border-violet-200 hover:border-violet-300 shadow-sm'
                      }`}
                    >
                      <span>System Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
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
