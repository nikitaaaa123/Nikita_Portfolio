import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Clock, 
  ExternalLink,
  MessageCircle,
  Sparkles,
  Send
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface ContactProps {
  theme: ThemeMode;
}

export const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAltEmail, setCopiedAltEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const isDark = theme === 'dark';

  const copyToClipboard = (text: string, type: 'email' | 'altEmail' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'altEmail') {
      setCopiedAltEmail(true);
      setTimeout(() => setCopiedAltEmail(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const getGmailWebUrl = () => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.contact.email)}&cc=${encodeURIComponent(PERSONAL_INFO.contact.alternateEmail)}&su=${encodeURIComponent('Engineering Portfolio Inquiry & Opportunity')}`;
  };

  const getWhatsAppUrl = () => {
    return `https://wa.me/919302689808?text=${encodeURIComponent('Hi Nikita, I reviewed your engineering portfolio and would like to connect.')}`;
  };

  return (
    <section 
      id="contact" 
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark ? 'bg-[#0a0e14] border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-6 h-px bg-blue-500"></span>
            <span>07 // GET IN TOUCH</span>
            <span className="w-6 h-px bg-blue-500"></span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Let's build something.
          </h2>
          <p className={`text-sm sm:text-base mt-3 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Looking for an engineer with hands-on experience in Deep Learning, Computer Vision, SDR Signal Processing, and Embedded IoT systems? Connect with me directly through any of the channels below.
          </p>
        </div>

        {/* Status & Availability Card */}
        <div className={`rounded-2xl border p-6 mb-8 transition-all ${
          isDark 
            ? 'bg-[#0e1420]/90 border-slate-800/90 shadow-xl shadow-black/20' 
            : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
              <div>
                <div className="font-mono text-xs font-semibold text-emerald-500 uppercase tracking-wider">
                  Current Availability Status
                </div>
                <div className={`text-sm sm:text-base font-semibold mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Actively Open for AI/ML & Embedded Systems Opportunities
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                IST (UTC+5:30)
              </span>
              <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                India • Open to Remote / Relocation
              </span>
            </div>
          </div>
        </div>

        {/* Direct Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Primary Email */}
          <div className={`rounded-2xl border p-5 flex items-center justify-between transition-all hover:shadow-lg ${
            isDark 
              ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-blue-500/50' 
              : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
          }`}>
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-blue-950/50 border-blue-800/60 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
              }`}>
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-blue-500 font-semibold uppercase tracking-wide">University Email</div>
                <a 
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className={`text-xs sm:text-sm font-mono font-medium hover:text-blue-500 transition-colors truncate block ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {PERSONAL_INFO.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <a
                href={getGmailWebUrl()}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border transition-all text-xs ${
                  isDark 
                    ? 'border-slate-700/50 hover:bg-slate-800 text-blue-400 hover:text-white' 
                    : 'border-slate-200 hover:bg-blue-50 text-blue-600'
                }`}
                title="Compose in Gmail Web"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.contact.email, 'email')}
                className={`p-2 rounded-lg border transition-all text-xs font-mono cursor-pointer ${
                  isDark 
                    ? 'border-slate-700/50 hover:bg-slate-800 text-slate-400 hover:text-white' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Copy university email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Alternate Personal Email */}
          <div className={`rounded-2xl border p-5 flex items-center justify-between transition-all hover:shadow-lg ${
            isDark 
              ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-violet-500/50' 
              : 'bg-white border-slate-200 hover:border-violet-400 shadow-sm'
          }`}>
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-violet-950/50 border-violet-800/60 text-violet-400' : 'bg-violet-50 border-violet-200 text-violet-600 shadow-sm'
              }`}>
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-violet-500 font-semibold uppercase tracking-wide">Personal Email</div>
                <a 
                  href={`mailto:${PERSONAL_INFO.contact.alternateEmail}`}
                  className={`text-xs sm:text-sm font-mono font-medium hover:text-violet-500 transition-colors truncate block ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {PERSONAL_INFO.contact.alternateEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <a
                href={`mailto:${PERSONAL_INFO.contact.alternateEmail}`}
                className={`p-2 rounded-lg border transition-all text-xs ${
                  isDark 
                    ? 'border-slate-700/50 hover:bg-slate-800 text-violet-400 hover:text-white' 
                    : 'border-slate-200 hover:bg-violet-50 text-violet-600'
                }`}
                title="Send direct email"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.contact.alternateEmail, 'altEmail')}
                className={`p-2 rounded-lg border transition-all text-xs font-mono cursor-pointer ${
                  isDark 
                    ? 'border-slate-700/50 hover:bg-slate-800 text-slate-400 hover:text-white' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Copy personal email"
              >
                {copiedAltEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div className={`rounded-2xl border p-5 flex items-center justify-between transition-all hover:shadow-lg ${
            isDark 
              ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-emerald-500/50' 
              : 'bg-white border-slate-200 hover:border-emerald-400 shadow-sm'
          }`}>
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm'
              }`}>
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-emerald-500 font-semibold uppercase tracking-wide">Phone / WhatsApp</div>
                <a 
                  href={`tel:${PERSONAL_INFO.contact.phone}`}
                  className={`text-xs sm:text-sm font-mono font-medium hover:text-emerald-500 transition-colors block ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {PERSONAL_INFO.contact.formattedPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border transition-all text-xs ${
                  isDark 
                    ? 'border-slate-700/50 hover:bg-slate-800 text-emerald-400 hover:text-white' 
                    : 'border-slate-200 hover:bg-emerald-50 text-emerald-600'
                }`}
                title="Message on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.contact.phone, 'phone')}
                className={`p-2 rounded-lg border transition-all text-xs font-mono cursor-pointer ${
                  isDark 
                    ? 'border-slate-700/50 hover:bg-slate-800 text-slate-400 hover:text-white' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* LinkedIn Profile */}
          <div className={`rounded-2xl border p-5 flex items-center justify-between transition-all hover:shadow-lg ${
            isDark 
              ? 'bg-[#0e1420]/80 border-slate-800/90 hover:border-blue-500/50' 
              : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
          }`}>
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-blue-950/50 border-blue-800/60 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
              }`}>
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-blue-500 font-semibold uppercase tracking-wide">Professional Network</div>
                <a 
                  href={PERSONAL_INFO.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs sm:text-sm font-mono font-medium hover:text-blue-500 transition-colors truncate block ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  linkedin.com/in/{PERSONAL_INFO.contact.linkedinUsername}
                </a>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-lg border transition-all text-xs shrink-0 ml-2 ${
                isDark 
                  ? 'border-slate-700/50 hover:bg-slate-800 text-blue-400 hover:text-white' 
                  : 'border-slate-200 hover:bg-blue-50 text-blue-600'
              }`}
              title="Open LinkedIn"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Quick Action Hub Bar */}
        <div className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Explore GitHub Repositories
              </div>
              <div className="text-xs font-mono text-slate-400">
                github.com/{PERSONAL_INFO.contact.githubUsername}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noreferrer"
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-all flex items-center gap-1.5 ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <span>View GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={getGmailWebUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Nikita Directly</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
