import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Medal, 
  ShieldCheck,
  Users,
  Layers,
  Star
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
          icon: <Trophy className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'hackathon':
        return {
          icon: <Medal className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      case 'leadership':
        return {
          icon: <Users className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
      default:
        return {
          icon: <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />,
          container: isDark ? 'bg-[#20183e] border-violet-900/60' : 'bg-violet-50 border-violet-200 shadow-sm',
        };
    }
  };

  return (
    <section 
      id="certifications" 
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
            <span>06 // HONORS & CREDENTIALS</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-violet-50' : 'text-slate-900'
          }`}>
            Certifications & Verified Credentials
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
            isDark ? 'text-violet-200/70' : 'text-slate-600'
          }`}>
            Recognized industry credentials in Machine Learning, Signal Processing, AI Agentforce, and competitive international healthcare innovation hackathons.
          </p>
        </motion.div>

        {/* Certifications Badge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              id={`cert-card-${cert.id}`}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                isDark 
                  ? 'bg-[#18122e]/90 border-violet-900/60 hover:border-violet-500/50 shadow-sm' 
                  : 'bg-white border-violet-100 hover:border-violet-300 shadow-md shadow-violet-500/5'
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
                        ? 'bg-[#20183e] text-violet-200 border-violet-900/60' 
                        : 'bg-violet-50 text-violet-700 border-violet-200 font-medium'
                    }`}>
                      {cert.year}
                    </span>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-1.5 rounded-lg border transition-all hover:scale-110 ${
                        isDark 
                          ? 'text-violet-300 hover:text-white border-violet-900/60 hover:border-violet-500' 
                          : 'text-slate-500 hover:text-violet-600 border-violet-200 hover:border-violet-400'
                      }`}
                      title="Open Certificate"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Title & Issuer */}
                <h3 className={`font-bold text-lg leading-snug mb-1 ${isDark ? 'text-violet-50' : 'text-slate-900'}`}>
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-violet-500 font-medium mb-3">
                  {cert.issuer}
                </p>

                {/* Credential note if multiple certificates exist */}
                {cert.credentialNote && (
                  <div className={`mb-3 p-2.5 rounded-lg border text-xs flex items-start gap-1.5 font-mono ${
                    isDark 
                      ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' 
                      : 'bg-violet-50 border-violet-200 text-violet-800'
                  }`}>
                    <Layers className="w-3.5 h-3.5 mt-0.5 shrink-0 text-violet-500" />
                    <span>{cert.credentialNote}</span>
                  </div>
                )}
              </div>

              {/* Skills covered */}
              <div className={`pt-3 border-t flex flex-wrap gap-1.5 ${
                isDark ? 'border-violet-900/40' : 'border-violet-100'
              }`}>
                {cert.skillsGained.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                      isDark 
                        ? 'bg-[#20183e] border-violet-900/60 text-violet-200' 
                        : 'bg-violet-50/60 border-violet-200 text-slate-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
