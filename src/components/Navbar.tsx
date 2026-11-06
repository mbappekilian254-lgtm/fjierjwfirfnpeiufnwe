import React, { useState, useEffect } from 'react';
import { Language, Theme, UserProfile } from '../types';
import { siteTranslations } from '../data/portfolioData';
import { Sun, Moon, Globe, Settings, Menu, X, Terminal, Sparkles } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenCustomize: () => void;
  profile: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onOpenCustomize,
  profile,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const t = siteTranslations[lang].nav;

  const navLinks = [
    { id: 'home', label: t.home, href: '#home' },
    { id: 'about', label: t.about, href: '#about' },
    { id: 'skills', label: t.skills, href: '#skills' },
    { id: 'projects', label: t.projects, href: '#projects' },
    { id: 'journey', label: t.journey, href: '#journey' },
    { id: 'process', label: t.process, href: '#process' },
    { id: 'contact', label: t.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scrollspy
      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'process', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/30'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-md'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 font-mono">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  {profile.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-cyan-400 tracking-wider hidden sm:block">
                TECH • EMBEDDED • WEB
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/40 dark:bg-slate-900/60 p-1 rounded-full border border-slate-800/50 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Controls: Theme + Language + Customize + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={onToggleLang}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500/50'
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-cyan-500'
              }`}
              title={lang === 'uz' ? 'Ingliz tiliga o‘tish' : 'Switch to Uzbek'}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>

            {/* Theme Switcher */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-amber-300 hover:text-amber-200 hover:border-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300'
              }`}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile Customizer */}
            <button
              type="button"
              onClick={onOpenCustomize}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950'
              }`}
              title={t.customize}
            >
              <Settings className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.customize}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden mt-3 p-4 rounded-2xl border shadow-xl transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : isDark
                      ? 'hover:bg-slate-800 text-slate-300'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onOpenCustomize();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-400"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{t.customize}</span>
                </button>
                <span className="text-[10px] font-mono text-slate-500">v2.4 Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
