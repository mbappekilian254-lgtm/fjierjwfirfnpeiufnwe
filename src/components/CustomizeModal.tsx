import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { siteTranslations, defaultProfile } from '../data/portfolioData';
import { X, Save, RotateCcw, CheckCircle2, User, Mail, Github, Send } from 'lucide-react';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
  lang: Language;
  isDark: boolean;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  lang,
  isDark,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const t = siteTranslations[lang].customize;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setFormData(defaultProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      <div
        className={`relative w-full max-w-lg rounded-2xl border shadow-2xl transition-all overflow-hidden z-10 ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className={`p-5 pb-4 border-b flex items-center justify-between ${isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'}`}>
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              <span>{t.title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Avatar Preview & File Selector */}
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              {lang === 'uz' ? 'Profil Fotosurati' : 'Profile Photo'}
            </label>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/60">
              <img
                src={formData.avatarUrl || '/profile.jpg'}
                alt="Profile Preview"
                className="w-14 h-16 rounded-lg object-cover object-top border border-cyan-500/40 shadow-sm shrink-0"
              />
              <div className="space-y-1 text-xs font-mono">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors">
                  <span>{lang === 'uz' ? 'Rasmni yuklash (Fayl tanlash)' : 'Upload New Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const res = ev.target?.result as string;
                          if (res) setFormData({ ...formData, avatarUrl: res });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                <div className="text-[10px] text-slate-500">
                  {lang === 'uz' ? 'JPG, PNG yoki WEBP format' : 'JPG, PNG, or WEBP supported'}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              {t.nameLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masalan: Sardor / Alex"
                className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 font-mono ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              {t.emailLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="YOUR_EMAIL yoki contact@example.com"
                className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 font-mono ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="checkbox"
                id="showEmail"
                checked={formData.showEmail}
                onChange={(e) => setFormData({ ...formData, showEmail: e.target.checked })}
                className="rounded accent-cyan-400"
              />
              <label htmlFor="showEmail" className="text-[11px] font-mono text-slate-400 cursor-pointer">
                {lang === 'uz' ? 'Aloqa bo‘limida ko‘rsatilsin' : 'Display on contact section'}
              </label>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              {t.githubLabel}
            </label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="YOUR_GITHUB_URL yoki https://github.com/username"
              className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 font-mono ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              {t.telegramLabel}
            </label>
            <input
              type="text"
              value={formData.telegram}
              onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              placeholder="YOUR_TELEGRAM_URL yoki https://t.me/username"
              className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 font-mono ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.savedSuccess}</span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.reset}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono"
              >
                {t.close}
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{t.save}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
