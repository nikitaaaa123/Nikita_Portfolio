import React from 'react';
import { 
  Award, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Medal, 
  ShieldCheck,
  Users,
  Layers
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface CertificationsProps {
  theme: ThemeMode;
}

export const Certifications: React.FC<CertificationsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const getBadgeIconData = (type: string) => {
    switch (type) {
      case 'champion':
        return {
          icon: <Trophy className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />,
          container: isDark ? 'bg-amber-950/50 border-amber-800/60' : 'bg-amber-50 border-amber-200 shadow-sm',
        };
      case 'hackathon':
        return {
          icon: <Medal className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-violet-950/50 border-violet-800/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'leadership':
        return {
          icon: <Users className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />,
          container: isDark ? 'bg-emerald-950/50 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200 shadow-sm',
        };
      default:
        return {
          icon: <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />,
          container: isDark ? 'bg-blue-950/50 border-blue-800/60' : 'bg-blue-50 border-blue-200 shadow-sm',
        };
    }
  };

  return (
    <section 
      id="certifications" 
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-blue-500"></span>
            <span>05 // HONORS & CREDENTIALS</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Certifications & Verified Credentials
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Recognized industry credentials in Machine Learning, Signal Processing, AI Agentforce, and competitive international healthcare innovation hackathons.
          </p>
        </div>

        {/* Certifications Badge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isDark 
                  ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-blue-500/50 shadow-sm' 
                  : 'bg-white border-slate-200 hover:border-blue-400 shadow-md shadow-slate-200/50'
              }`}
            >
              <div>
                {/* Header Badge Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  {(() => {
                    const badge = getBadgeIconData(cert.badgeType);
                    return (
                      <div className={`p-2.5 rounded-xl border transition-all ${badge.container}`}>
                        {badge.icon}
                      </div>
                    );
                  })()}
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${
                      isDark 
                        ? 'bg-slate-800/60 text-slate-300 border-slate-700/50' 
                        : 'bg-slate-100 text-slate-700 border-slate-200 font-medium'
                    }`}>
                      {cert.year}
                    </span>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isDark 
                          ? 'text-slate-400 hover:text-white border-slate-700/40 hover:border-slate-500' 
                          : 'text-slate-500 hover:text-slate-900 border-slate-200 hover:border-slate-400'
                      }`}
                      title="Open Certificate"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Title & Issuer */}
                <h3 className={`font-bold text-lg leading-snug mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-blue-500 font-medium mb-3">
                  {cert.issuer}
                </p>

                {/* Credential note if multiple certificates exist */}
                {cert.credentialNote && (
                  <div className={`mb-3 p-2.5 rounded-lg border text-xs flex items-start gap-1.5 font-mono ${
                    isDark 
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' 
                      : 'bg-blue-50 border-blue-200 text-blue-800'
                  }`}>
                    <Layers className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                    <span>{cert.credentialNote}</span>
                  </div>
                )}

                {/* Domain Category */}
                <div className={`text-[11px] font-mono mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Domain: <strong className={isDark ? 'text-slate-300' : 'text-slate-800'}>{cert.category}</strong>
                </div>

                {/* Acquired Skills */}
                <div className={`space-y-1.5 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Core Focus:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsGained.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isDark 
                            ? 'bg-slate-900 border-slate-800 text-slate-300' 
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Link */}
              <div className={`mt-6 pt-3.5 border-t flex items-center justify-between text-[11px] font-mono ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Credential
                </span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>View Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
