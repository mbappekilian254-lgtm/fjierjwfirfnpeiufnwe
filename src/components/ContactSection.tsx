import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { siteTranslations } from '../data/portfolioData';
import { Mail, Github, Send, Copy, CheckCircle2, AlertCircle, MessageSquare, ExternalLink, Settings } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
  isDark: boolean;
  profile: UserProfile;
  onOpenCustomize: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  isDark,
  profile,
  onOpenCustomize,
}) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const t = siteTranslations[lang].contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setSubmittedStatus('error');
      return;
    }

    setSubmittedStatus('success');

    // Trigger mailto if recipient configured
    const recipient = profile.email !== 'YOUR_EMAIL' ? profile.email : 'contact@example.com';
    const subject = encodeURIComponent(`Portfolio Message from ${formName}`);
    const body = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.sectionSubtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Profiles */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            {profile.showEmail && (
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase text-slate-400">
                        {t.emailCardTitle}
                      </h4>
                      <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">
                        {profile.email}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(profile.email, 'email')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={t.copyDetails}
                  >
                    {copiedLink === 'email' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* GitHub Card */}
            {profile.showGithub && (
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase text-slate-400">
                        {t.githubCardTitle}
                      </h4>
                      <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">
                        {profile.github}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(profile.github, 'github')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={t.copyDetails}
                  >
                    {copiedLink === 'github' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Telegram Card */}
            {profile.showTelegram && (
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase text-slate-400">
                        {t.telegramCardTitle}
                      </h4>
                      <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">
                        {profile.telegram}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(profile.telegram, 'telegram')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={t.copyDetails}
                  >
                    {copiedLink === 'telegram' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Quick config helper note */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                {lang === 'uz' ? 'Aloqa profillarini o‘zgartirish:' : 'Personalize contact handles:'}
              </span>
              <button
                type="button"
                onClick={onOpenCustomize}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? 'Sozlash' : 'Edit'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h3 className="text-lg font-bold text-slate-100 mb-1">
                {t.formTitle}
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                {t.formDemoNote}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      {t.formName} *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Masalan: Sardor / Alex"
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      {t.formEmail} *
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="nomingiz@mail.com"
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    {t.formMessage} *
                  </label>
                  <textarea
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    rows={4}
                    placeholder={lang === 'uz' ? 'Loyiha haqida taklif, savol yoki hamkorlik g‘oyasi...' : 'Your inquiry, feedback, or collaboration idea...'}
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 resize-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                    required
                  />
                </div>

                {submittedStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{t.formSuccess}</span>
                  </div>
                )}

                {submittedStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{t.formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.formSubmit}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
