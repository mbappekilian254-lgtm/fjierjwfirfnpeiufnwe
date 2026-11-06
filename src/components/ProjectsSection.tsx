import React, { useState, useMemo } from 'react';
import { Project, Language, ProjectCategory } from '../types';
import { projectsData, siteTranslations } from '../data/portfolioData';
import { Search, ExternalLink, ArrowRight, Sparkles, Filter, Code, Cpu, Eye } from 'lucide-react';

interface ProjectsSectionProps {
  lang: Language;
  isDark: boolean;
  onSelectProject: (p: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  lang,
  isDark,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const t = siteTranslations[lang].projects;

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category match
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesSubtitle = project.subtitle[lang].toLowerCase().includes(q);
        const matchesDesc = project.shortDesc[lang].toLowerCase().includes(q);
        const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery, lang]);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'web', label: t.filterWeb },
    { id: 'iot', label: t.filterIoT },
    { id: 'ai', label: t.filterAI },
    { id: 'experiments', label: t.filterExp },
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.sectionSubtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
            {categories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm'
              }`}
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-sm font-mono text-slate-400">{t.noProjects}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const statusColorClass =
                project.status.type === 'concept'
                  ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                  : project.status.type === 'prototype'
                  ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

              return (
                <div
                  key={project.id}
                  className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/30'
                      : 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Subtle top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: project.accentColor }}
                  />

                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Top Row: Number + Status */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        #{project.number}
                      </span>
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${statusColorClass}`}>
                        {project.status[lang]}
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {project.subtitle[lang]}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {project.shortDesc[lang]}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/60 mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>{t.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300"
                        title="External link"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
