import React from 'react';
import { Language } from '../types';
import { valuesData, siteTranslations } from '../data/portfolioData';
import { Sparkles, Repeat, Lightbulb, Flame, Heart } from 'lucide-react';

interface ValuesSectionProps {
  lang: Language;
  isDark: boolean;
}

export const ValuesSection: React.FC<ValuesSectionProps> = ({ lang, isDark }) => {
  const t = siteTranslations[lang].values;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'Repeat':
        return Repeat;
      case 'Lightbulb':
        return Lightbulb;
      case 'Flame':
        return Flame;
      default:
        return Heart;
    }
  };

  return (
    <section id="values" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Heart className="w-3.5 h-3.5" />
            <span>{t.sectionSubtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
        </div>

        {/* 4 Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuesData.map((val) => {
            const IconComp = getIcon(val.icon);
            return (
              <div
                key={val.key}
                className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2">
                  {val.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {val.desc[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
