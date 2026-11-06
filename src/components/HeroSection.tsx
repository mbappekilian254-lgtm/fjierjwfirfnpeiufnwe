import React from 'react';
import { Language, UserProfile } from '../types';
import { siteTranslations } from '../data/portfolioData';
import { HeroProfileCard } from './HeroProfileCard';
import { ArrowRight, MessageSquare, Compass, Sparkles, ChevronDown, Code, Cpu } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  isDark: boolean;
  profile: UserProfile;
  onUpdateAvatar?: (url: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  isDark,
  profile,
  onUpdateAvatar,
}) => {
  const t = siteTranslations[lang].hero;

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Narrative & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small Header Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-semibold tracking-wider">{t.badge}</span>
            </div>

            {/* Main Big Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              <span className="block">{lang === 'uz' ? 'G‘OYALARNI' : 'TURNING IDEAS'}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                {lang === 'uz' ? 'TEXNOLOGIYAGA' : 'INTO TECHNOLOGY'}
              </span>{' '}
              <span className="block">{lang === 'uz' ? 'AYLANTIRAMAN.' : 'WITH CODE & HARDWARE.'}</span>
            </h1>

            {/* Short Narrative Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.description}
            </p>

            {/* Philosophical Quote Card */}
            <div
              className={`p-4 rounded-xl border backdrop-blur-sm max-w-2xl mx-auto lg:mx-0 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                  : 'bg-white/70 border-slate-200 text-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <div className="text-xs sm:text-sm font-medium italic">
                  {t.quote}
                </div>
              </div>
            </div>

            {/* Motto Badge Strip: Learn • Build • Innovate */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 font-mono text-xs text-slate-400">
              <span className="px-3 py-1 rounded-md bg-slate-800/70 border border-slate-700/60 font-semibold">
                Learn
              </span>
              <span>•</span>
              <span className="px-3 py-1 rounded-md bg-slate-800/70 border border-slate-700/60 font-semibold">
                Build
              </span>
              <span>•</span>
              <span className="px-3 py-1 rounded-md bg-slate-800/70 border border-slate-700/60 font-semibold text-cyan-300 shadow-sm shadow-cyan-500/20">
                Innovate
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
              >
                <span>{t.viewProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border font-semibold text-sm transition-all ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-slate-700'
                    : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>{t.contactMe}</span>
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>{t.aboutMe}</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Fidelity Vertical Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroProfileCard
              profile={profile}
              lang={lang}
              isDark={isDark}
              onUpdateAvatar={onUpdateAvatar}
            />
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
          <a
            href="#about"
            className="flex flex-col items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <span>{t.scrollDown}</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
