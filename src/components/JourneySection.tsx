import React from 'react';
import { Language } from '../types';
import { journeyStepsData, siteTranslations } from '../data/portfolioData';
import { Milestone, Sparkles, CheckCircle2 } from 'lucide-react';

interface JourneySectionProps {
  lang: Language;
  isDark: boolean;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ lang, isDark }) => {
  const t = siteTranslations[lang].journey;

  return (
    <section id="journey" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Milestone className="w-3.5 h-3.5" />
            <span>{t.sectionSubtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {lang === 'uz'
              ? 'Vaqtga yoki soxta tajribaga bog‘lanmagan, haqiqiy bilim orttirish bosqichlari.'
              : 'Non-dated authentic learning milestones reflecting progressive skill acquisition.'}
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-sky-400 to-indigo-500 opacity-30" />

          <div className="space-y-8 sm:space-y-12">
            {journeyStepsData.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-6">
                    <div
                      className={`p-5 sm:p-6 rounded-2xl border transition-all hover:border-cyan-500/40 ${
                        isDark
                          ? 'bg-slate-900/90 border-slate-800'
                          : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          STAGE {step.step}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {step.focus}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2">
                        {step.title[lang]}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.desc[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 top-5 sm:top-auto -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
                    <span className="text-xs font-mono font-bold">{step.step}</span>
                  </div>

                  {/* Empty counterpart for balance */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
