import React from 'react';
import { 
  X, 
  Github, 
  Radio, 
  Brain, 
  Cpu, 
  Eye, 
  Home, 
  CheckCircle2, 
  Zap, 
  Activity,
  Rocket,
  Ticket,
  Palette,
  Bot
} from 'lucide-react';
import { Project, ThemeMode } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  theme: ThemeMode;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  theme,
}) => {
  if (!project) return null;

  const isDark = theme === 'dark';

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

  const domainIconData = getDomainIconData(project.domainIcon);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`relative w-full max-w-3xl rounded-2xl border p-6 sm:p-8 shadow-2xl transition-all max-h-[90vh] overflow-y-auto ${
          isDark 
            ? 'bg-[#18122e] border-violet-900/80 text-violet-100' 
            : 'bg-white border-violet-100 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-xl border transition-all cursor-pointer ${
            isDark 
              ? 'border-violet-900/60 hover:bg-[#20183e] text-violet-300 hover:text-white' 
              : 'border-violet-200 hover:bg-violet-50 text-slate-500 hover:text-violet-600'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pr-10">
          <div className={`p-3 rounded-xl border shrink-0 transition-all ${domainIconData.container}`}>
            {domainIconData.icon}
          </div>
          <div>
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
              isDark 
                ? 'bg-violet-500/10 text-violet-300 border-violet-500/30' 
                : 'bg-violet-50 text-violet-700 border-violet-200'
            }`}>
              {project.categoryLabel}
            </span>
            <h3 className={`text-2xl sm:text-3xl font-extrabold mt-2 ${isDark ? 'text-violet-50' : 'text-slate-900'}`}>
              {project.title}
            </h3>
            <p className={`text-sm font-medium mt-1 ${isDark ? 'text-violet-200/70' : 'text-slate-600'}`}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Metric banner if present */}
        {project.metric && (
          <div className={`mt-4 p-3 rounded-xl border flex items-center gap-2 text-xs font-mono ${
            isDark 
              ? 'bg-[#20183e] border-violet-900/60 text-violet-200' 
              : 'bg-violet-50 border-violet-200 text-violet-800'
          }`}>
            <Zap className="w-4 h-4 text-violet-500 shrink-0" />
            <span>Key Benchmark: <strong className={isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{project.metric}</strong></span>
          </div>
        )}

        {/* In-depth Narrative */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-semibold mb-2 ${
              isDark ? 'text-violet-300' : 'text-slate-500'
            }`}>
              System Architecture & Methodology
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-violet-100/90' : 'text-slate-700'}`}>
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Pipeline Block */}
          {project.architecture && (
            <div className={`p-4 rounded-xl border space-y-2.5 font-mono text-xs ${
              isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50/50 border-violet-200'
            }`}>
              <div className={`text-[11px] font-semibold uppercase flex items-center gap-1.5 ${
                isDark ? 'text-violet-300' : 'text-violet-700'
              }`}>
                <Activity className="w-3.5 h-3.5 text-violet-500" />
                <span>Data & Signal Flow Pipeline</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#18122e] border-violet-900/60' : 'bg-white border-violet-200 shadow-sm'
                }`}>
                  <div className="text-[10px] text-violet-500 font-bold mb-1">1. INGESTION</div>
                  <div className={`text-[11px] ${isDark ? 'text-violet-200' : 'text-slate-700'}`}>{project.architecture.inputs}</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#18122e] border-violet-900/60' : 'bg-white border-violet-200 shadow-sm'
                }`}>
                  <div className="text-[10px] text-violet-500 font-bold mb-1">2. PROCESSING</div>
                  <div className={`text-[11px] ${isDark ? 'text-violet-200' : 'text-slate-700'}`}>{project.architecture.processing}</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#18122e] border-violet-900/60' : 'bg-white border-violet-200 shadow-sm'
                }`}>
                  <div className="text-[10px] text-violet-500 font-bold mb-1">3. ACTION / OUTPUT</div>
                  <div className={`text-[11px] ${isDark ? 'text-violet-200' : 'text-slate-700'}`}>{project.architecture.outputs}</div>
                </div>
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          <div className="pt-2">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-semibold mb-2.5 ${
              isDark ? 'text-violet-300' : 'text-slate-500'
            }`}>
              Engineering Achievements & Implementation
            </h4>
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  <span className={isDark ? 'text-violet-100' : 'text-slate-700'}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className={`pt-4 border-t ${isDark ? 'border-violet-900/40' : 'border-violet-100'}`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-semibold mb-2 ${
              isDark ? 'text-violet-300' : 'text-slate-500'
            }`}>
              Hardware, SDKs & Libraries
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                    isDark ? 'bg-[#20183e] border-violet-900/60 text-violet-200' : 'bg-violet-50 border-violet-200 text-violet-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className={`mt-8 pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'border-violet-900/40' : 'border-violet-100'
        }`}>
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all ${
                  isDark 
                    ? 'bg-[#20183e] border-violet-900/60 text-white hover:border-violet-400' 
                    : 'bg-white border-violet-200 text-slate-900 hover:bg-violet-50 shadow-sm'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>View Source Code on GitHub</span>
              </a>
            ) : (
              <span className={`px-3 py-1.5 rounded-xl text-xs font-mono border ${
                isDark ? 'bg-[#20183e] border-violet-900/60 text-violet-300' : 'bg-violet-50 border-violet-200 text-slate-600'
              }`}>
                Hardware & Embedded Lab Prototype
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-violet-500 hover:bg-violet-600 text-white transition-all shadow-md shadow-violet-500/20 cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
