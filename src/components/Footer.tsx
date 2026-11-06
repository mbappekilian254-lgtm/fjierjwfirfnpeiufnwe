import React from 'react';
import { Language, UserProfile } from '../types';
import { siteTranslations } from '../data/portfolioData';
import { Terminal, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  lang: Language;
  isDark: boolean;
  profile: UserProfile;
}

export const Footer: React.FC<FooterProps> = ({ lang, isDark, profile }) => {
  const currentYear = new Date().getFullYear();
  const t = siteTranslations[lang].footer;
  const nav = siteTranslations[lang].nav;

  const quickLinks = [
    { label: nav.home, href: '#home' },
    { label: nav.about, href: '#about' },
    { label: nav.skills, href: '#skills' },
    { label: nav.projects, href: '#projects' },
    { label: nav.journey, href: '#journey' },
    { label: nav.process, href: '#process' },
    { label: nav.contact, href: '#contact' },
  ];

  return (
    <footer
      className={`border-t py-14 transition-colors ${
        isDark ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-10 border-b border-slate-800/60">
          {/* Identity & Motto */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs">
                &lt;/&gt;
              </div>
              <span className="font-mono font-bold text-base text-slate-100">
                {profile.name}
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-400 font-semibold">
              {t.tagline}
            </p>
            <p className="text-xs text-slate-400 max-w-sm">
              {t.subtext}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-6 flex flex-wrap gap-x-5 gap-y-2 md:justify-end text-xs font-mono">
            {quickLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div>
            © {currentYear} {profile.name}. {t.rights}
          </div>
          <div className="text-[11px] text-slate-500 text-center sm:text-right">
            {t.placeholderNotice}
          </div>
        </div>
      </div>
    </footer>
  );
};
