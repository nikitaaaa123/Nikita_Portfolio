import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  Copy, 
  Linkedin, 
  ExternalLink,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface ContactProps {
  theme: ThemeMode;
}

export const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const isDark = theme === 'dark';

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.contact.email)}&su=${encodeURIComponent('Engineering Inquiry / Role Opportunity')}&body=${encodeURIComponent('Hi Nikita,\n\nI reviewed your portfolio and would like to connect regarding...')}`;

  return (
    <section 
      id="contact" 
      className={`py-16 sm:py-24 border-t transition-colors relative overflow-hidden scroll-mt-16 sm:scroll-mt-20 ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
      }`}
    >
      {/* Background ambient lighting */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'
      }`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Staggered Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-blue-500"></span>
            <span>08 // GET IN TOUCH</span>
            <span className="w-6 h-px bg-blue-500"></span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Let's Build Something Intelligent.
          </h2>
          <p className={`text-sm sm:text-base mt-3 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Looking for an engineer with hands-on experience in Deep Learning, Computer Vision, SDR Signal Processing, and Embedded IoT systems? Feel free to reach out directly.
          </p>
        </motion.div>

        {/* 3 Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          
          {/* Card 1: Email */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
              isDark 
                ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5' 
                : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-blue-950/50 border-blue-800/60 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.contact.email, 'email')}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    copiedEmail 
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 scale-105' 
                      : isDark ? 'hover:bg-slate-800 text-slate-400 border-slate-800' : 'hover:bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="text-xs font-mono text-blue-500 font-semibold uppercase tracking-wide mb-1">
                Direct Email
              </div>
              <a 
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className={`text-sm font-mono font-medium hover:text-blue-500 transition-colors break-all block ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {PERSONAL_INFO.contact.email}
              </a>
            </div>

            <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
              isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-100 text-slate-400'
            }`}>
              <span>Inbox Monitored Daily</span>
              {copiedEmail && <span className="text-emerald-400 font-semibold">Copied!</span>}
            </div>
          </motion.div>

          {/* Card 2: Phone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
              isDark 
                ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5' 
                : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm'
                }`}>
                  <Phone className="w-5 h-5" />
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.contact.phone, 'phone')}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    copiedPhone 
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 scale-105' 
                      : isDark ? 'hover:bg-slate-800 text-slate-400 border-slate-800' : 'hover:bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="text-xs font-mono text-emerald-500 font-semibold uppercase tracking-wide mb-1">
                Direct Phone / Call
              </div>
              <a 
                href={`tel:${PERSONAL_INFO.contact.phone.replace(/\s+/g, '')}`}
                className={`text-sm font-mono font-medium hover:text-emerald-500 transition-colors block ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {PERSONAL_INFO.contact.phone}
              </a>
            </div>

            <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
              isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-100 text-slate-400'
            }`}>
              <span>IST Timezone (UTC+5:30)</span>
              {copiedPhone && <span className="text-emerald-400 font-semibold">Copied!</span>}
            </div>
          </motion.div>

          {/* Card 3: Location / Open Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
              isDark 
                ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/5' 
                : 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-lg hover:shadow-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-violet-950/50 border-violet-800/60 text-violet-400' : 'bg-violet-50 border-violet-200 text-violet-600 shadow-sm'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              
              <div className="text-xs font-mono text-violet-500 font-semibold uppercase tracking-wide mb-1">
                Location & Availability
              </div>
              <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                India
              </div>
            </div>

            <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
              isDark ? 'border-slate-800/60 text-emerald-400' : 'border-slate-100 text-emerald-600 font-medium'
            }`}>
              <span>Open to Roles Worldwide</span>
              <span>Remote / Relocation</span>
            </div>
          </motion.div>

        </div>

        {/* Big Action Banner with Quick Email & LinkedIn Dispatch */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
            isDark 
              ? 'bg-gradient-to-br from-[#0e1420] to-[#131b2c] border-slate-800/90 shadow-2xl shadow-black/30' 
              : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-xl shadow-slate-200/50'
          }`}
        >
          <div className="text-center md:text-left space-y-1.5 max-w-lg">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-mono text-xs font-semibold border border-blue-500/20">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Direct Inquiries Welcome</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Ready to start a conversation?
            </h3>
            <p className={`text-xs sm:text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Send a quick message via Gmail or connect directly on LinkedIn.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Open Gmail */}
            <a
              href={gmailWebUrl}
              target="_blank"
              rel="noreferrer"
              id="contact-open-gmail-btn"
              className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Open in Gmail</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Connect on LinkedIn */}
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              id="contact-open-linkedin-btn"
              className={`px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm border flex items-center gap-2 transition-all hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-700 hover:border-blue-500/50 text-blue-300 shadow-sm' 
                  : 'bg-white border-slate-300 hover:border-blue-400 text-blue-700 shadow-sm'
              }`}
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
