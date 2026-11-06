import React from 'react';
import { Language } from '../types';
import { workProcessData, siteTranslations } from '../data/portfolioData';
import { Wrench, CheckCircle2, ArrowRight, Target, FileCode, Play, Bug } from 'lucide-react';

interface WorkProcessSectionProps {
  lang: Language;
  isDark: boolean;
}

export const WorkProcessSection: React.FC<WorkProcessSectionProps> = ({ lang, isDark }) => {
  const t = siteTranslations[lang].process;

  const stepIcons = [Target, FileCode, Play, Bug];

  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.sectionSubtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workProcessData.map((step, idx) => {
            const IconComp = stepIcons[idx] || Wrench;
            return (
              <div
                key={step.step}
                className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 relative flex flex-col justify-between ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-cyan-400/80">
                      {step.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 mb-2">
                    {step.title[lang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.desc[lang]}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  {step.details[lang]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
