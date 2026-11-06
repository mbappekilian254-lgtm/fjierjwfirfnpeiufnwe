import React, { useState, useEffect } from 'react';
import { Language, Theme, Project, UserProfile } from './types';
import { defaultProfile } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { WorkProcessSection } from './components/WorkProcessSection';
import { ValuesSection } from './components/ValuesSection';
import { FutureGoalsSection } from './components/FutureGoalsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CustomizeModal } from './components/CustomizeModal';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'en' || saved === 'uz') ? saved : 'uz';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'dark';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-cyan-500/20 selection:text-cyan-900';
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'uz' ? 'en' : 'uz'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    localStorage.setItem('portfolio_profile', JSON.stringify(updated));
  };

  const handleUpdateAvatar = (newUrl: string) => {
    const updated = { ...profile, avatarUrl: newUrl };
    setProfile(updated);
    localStorage.setItem('portfolio_profile', JSON.stringify(updated));
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Background Circuit Grid Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 ${
          isDark ? 'bg-grid-pattern opacity-60' : 'bg-grid-pattern-light opacity-80'
        }`}
      />

      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        profile={profile}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          lang={lang}
          isDark={isDark}
          profile={profile}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AboutSection lang={lang} isDark={isDark} />
        <SkillsSection lang={lang} isDark={isDark} />
        <ProjectsSection
          lang={lang}
          isDark={isDark}
          onSelectProject={(p) => setSelectedProject(p)}
        />
        <JourneySection lang={lang} isDark={isDark} />
        <WorkProcessSection lang={lang} isDark={isDark} />
        <ValuesSection lang={lang} isDark={isDark} />
        <FutureGoalsSection lang={lang} isDark={isDark} />
        <ContactSection
          lang={lang}
          isDark={isDark}
          profile={profile}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} isDark={isDark} profile={profile} />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
        isDark={isDark}
      />

      {/* Profile Customize Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        lang={lang}
        isDark={isDark}
      />
    </div>
  );
}
