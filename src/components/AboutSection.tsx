import React from 'react';
import { Language } from '../types';
import { siteTranslations } from '../data/portfolioData';
import { BookOpen, Hammer, HeartHandshake, CheckCircle2, Lightbulb, Compass, Zap } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
  isDark: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, isDark }) => {
  const t = siteTranslations[lang].about;

  const cards = [
    {
      title: t.card1Title,
      desc: t.card1Desc,
      icon: BookOpen,
      accent: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
    },
    {
      title: t.card2Title,
      desc: t.card2Desc,
      icon: Hammer,
      accent: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
    },
    {
      title: t.card3Title,
      desc: t.card3Desc,
      icon: Lightbulb,
      accent: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.sectionSubtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base leading-relaxed text-slate-300">
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <p className="mb-4">{t.p1}</p>
              <p className="mb-4">{t.p2}</p>
              <p className="mb-4">{t.p3}</p>
              <p className="font-medium text-slate-100">{t.p4}</p>
            </div>

            {/* Quick Core Focus Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-cyan-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> Frontend (HTML, CSS, JS)
              </span>
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-emerald-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> ESP32 & Arduino
              </span>
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-indigo-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" /> Google AI Studio Prototyping
              </span>
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-amber-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> O‘zbekistonda yashayman
              </span>
            </div>
          </div>

          {/* Right: 3 Visual Highlight Cards */}
          <div className="lg:col-span-5 space-y-4">
            {cards.map((c, idx) => {
              const IconComp = c.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border shrink-0 ${c.accent}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-100 mb-1">
                        {c.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
