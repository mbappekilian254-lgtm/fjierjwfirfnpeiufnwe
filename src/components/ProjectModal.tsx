import React, { useState, useEffect } from 'react';
import { Project, Language } from '../types';
import { siteTranslations } from '../data/portfolioData';
import { X, ExternalLink, Cpu, CheckCircle2, AlertCircle, Wrench, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Esp32LedSimulator } from './demos/Esp32LedSimulator';
import { Esp32PianoSimulator } from './demos/Esp32PianoSimulator';
import { SensorLabSimulator } from './demos/SensorLabSimulator';
import { SchoolSolutionsDemo } from './demos/SchoolSolutionsDemo';
import { DigitalMenuDemo } from './demos/DigitalMenuDemo';
import { LibraryDemo } from './demos/LibraryDemo';
import { DeploymentDemo } from './demos/DeploymentDemo';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: Language;
  isDark: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang, isDark }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'system' | 'components' | 'demo' | 'future'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const t = siteTranslations[lang].modal;

  const statusColorClass =
    project.status.type === 'concept'
      ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
      : project.status.type === 'prototype'
      ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
      : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl transition-all overflow-hidden z-10 ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-cyan-950/40'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/40'
        }`}
      >
        {/* Modal Top Bar */}
        <div className={`p-5 sm:p-6 pb-4 border-b ${isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  PROJECT {project.number}
                </span>
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${statusColorClass}`}>
                  {project.status[lang]}
                </span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  {project.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {project.subtitle[lang]}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono transition-colors"
                >
                  <span>{t.openExternal}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {t.tabs.overview}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('system')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'system'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {t.tabs.system}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'components'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {t.tabs.components}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t.tabs.demo}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('future')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'future'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {t.tabs.future}
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  {t.problemHeader}
                </h4>
                <div className={`p-4 rounded-xl border leading-relaxed text-sm ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  {project.problemGoal[lang]}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  {lang === 'uz' ? 'Qisqa xulosa va konsepsiya' : 'Summary & Concept'}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.shortDesc[lang]}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  {lang === 'uz' ? 'Foydalaniladigan Texnologiyalar' : 'Technologies Used'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-mono px-3 py-1 rounded-md border ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-cyan-300' : 'bg-slate-100 border-slate-300 text-cyan-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  {t.howItWorksHeader}
                </h4>
                <div className={`p-4 rounded-xl border leading-relaxed text-sm ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  {project.howItWorks[lang]}
                </div>
              </div>

              {project.sensorOrModules && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    {lang === 'uz' ? 'Sensorlar va modullarning o‘zaro aloqasi' : 'Sensory & Module Interactivity'}
                  </h4>
                  <div className={`p-4 rounded-xl border text-sm ${isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    {project.sensorOrModules[lang]}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                {t.componentsHeader}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.componentsList.map((comp, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center gap-3 text-xs font-mono ${
                      isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'uz' ? 'Jonli interaktiv simulyatsiya' : 'Live Interactive Sandbox'}</span>
              </div>

              {/* Render dynamic interactive demo according to project type */}
              {project.demoType === 'esp32-led' && <Esp32LedSimulator lang={lang} />}
              {project.demoType === 'piano' && <Esp32PianoSimulator lang={lang} />}
              {project.demoType === 'sensors' && <SensorLabSimulator lang={lang} />}
              {project.demoType === 'school' && <SchoolSolutionsDemo lang={lang} />}
              {project.demoType === 'qr-menu' && <DigitalMenuDemo lang={lang} />}
              {project.demoType === 'library' && <LibraryDemo lang={lang} />}
              {project.demoType === 'deployment' && <DeploymentDemo lang={lang} />}
              {project.demoType === 'news' && <SchoolSolutionsDemo lang={lang} />}
              {project.demoType === 'standard' && <DeploymentDemo lang={lang} />}
            </div>
          )}

          {activeTab === 'future' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4" />
                  {t.futureHeader}
                </h4>
                <div className={`p-4 rounded-xl border leading-relaxed text-sm ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  {project.futurePlans[lang]}
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-start gap-3 ${isDark ? 'bg-cyan-950/20 border-cyan-800/40 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-900'}`}>
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="text-xs font-mono leading-relaxed">
                  {t.disclaimerNote}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-slate-50'}`}>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{t.statusLabel} <strong className="text-cyan-300">{project.status[lang]}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-mono"
              >
                <span>{t.openExternal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 font-mono text-xs transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
