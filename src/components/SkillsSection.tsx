import React from 'react';
import { Language } from '../types';
import { skillCategoriesData, siteTranslations } from '../data/portfolioData';
import { Code2, Cpu, Sparkles, Compass, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface SkillsSectionProps {
  lang: Language;
  isDark: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang, isDark }) => {
  const t = siteTranslations[lang].skills;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Cpu':
        return Cpu;
      case 'Sparkles':
        return Sparkles;
      default:
        return Compass;
    }
  };

  const getLevelBadge = (level: 'learning' | 'practice' | 'experience', statusObj: { uz: string; en: string }) => {
    if (level === 'learning') {
      return {
        bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        dot: 'bg-cyan-400',
        label: statusObj[lang],
      };
    }
    if (level === 'practice') {
      return {
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        dot: 'bg-emerald-400',
        label: statusObj[lang],
      };
    }
    return {
      bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      dot: 'bg-purple-400',
      label: statusObj[lang],
    };
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.sectionSubtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {t.disclaimer}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300">{t.levelLearning}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">{t.levelPractice}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span className="text-slate-300">{t.levelExperience}</span>
          </div>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategoriesData.map((category) => {
            const IconComp = getIcon(category.icon);
            return (
              <div
                key={category.id}
                className={`p-6 sm:p-7 rounded-2xl border transition-all hover:border-cyan-500/40 ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/80 mb-5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      {category.title[lang]}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {category.description[lang]}
                    </p>
                  </div>
                </div>

                {/* Skills inside Category */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => {
                    const badge = getLevelBadge(skill.status.level, skill.status);
                    return (
                      <div
                        key={sIdx}
                        className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                          isDark
                            ? 'bg-slate-950/70 border-slate-850 hover:bg-slate-950'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="font-medium text-slate-200 truncate">
                          {skill.name}
                        </span>
                        <span
                          className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border shrink-0 flex items-center gap-1.5 ${badge.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          <span>{badge.label}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
