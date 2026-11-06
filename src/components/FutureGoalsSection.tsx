import React from 'react';
import { Language } from '../types';
import { siteTranslations } from '../data/portfolioData';
import { Compass, Sparkles, Orbit, Rocket, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FutureGoalsSectionProps {
  lang: Language;
  isDark: boolean;
}

export const FutureGoalsSection: React.FC<FutureGoalsSectionProps> = ({ lang, isDark }) => {
  const t = siteTranslations[lang].goals;

  return (
    <section id="goals" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`p-8 sm:p-12 lg:p-16 rounded-3xl border relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800'
              : 'bg-gradient-to-b from-slate-50 to-white border-slate-200 shadow-lg'
          }`}
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
                <Rocket className="w-3.5 h-3.5" />
                <span>{t.sectionSubtitle}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {t.sectionTitle}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>{t.text1}</p>
                <p>{t.text2}</p>
                <p className="font-semibold text-slate-100">{t.text3}</p>
              </div>

              {/* Motto Ribbon */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 font-mono text-xs sm:text-sm font-bold text-cyan-300 shadow-sm">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{t.mottoBadge}</span>
                </div>
              </div>
            </div>

            {/* Right: Futuristic Tech Constellation Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Outer Orbit */}
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 animate-spin" style={{ animationDuration: '30s' }} />
                {/* Middle Orbit */}
                <div className="absolute inset-6 rounded-full border border-slate-700/60" />
                {/* Inner Core */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-2xl shadow-cyan-500/30 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-center p-2">
                    <Orbit className="w-8 h-8 text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-cyan-300 mt-1">INNOVATION</span>
                  </div>
                </div>

                {/* Orbiting Satellite Pills */}
                <div className="absolute -top-3 px-2.5 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-md">
                  Web Engineering
                </div>
                <div className="absolute -bottom-3 px-2.5 py-1 rounded-full bg-slate-900 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-md">
                  IoT & Robotics
                </div>
                <div className="absolute -left-4 px-2.5 py-1 rounded-full bg-slate-900 border border-purple-500/40 text-[10px] font-mono text-purple-300 shadow-md">
                  AI Tooling
                </div>
                <div className="absolute -right-4 px-2.5 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-[10px] font-mono text-amber-300 shadow-md">
                  Open Source
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
