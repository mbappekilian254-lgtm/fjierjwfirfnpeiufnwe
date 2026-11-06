import React, { useState, useRef } from 'react';
import { UserProfile, Language } from '../types';
import { Camera, Sparkles, Wifi, Terminal, Upload, CheckCircle2, User } from 'lucide-react';

interface HeroProfileCardProps {
  profile: UserProfile;
  lang: Language;
  isDark: boolean;
  onUpdateAvatar?: (url: string) => void;
}

export const HeroProfileCard: React.FC<HeroProfileCardProps> = ({
  profile,
  lang,
  isDark,
  onUpdateAvatar,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const avatarSrc = profile.avatarUrl || '/profile.jpg';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result && onUpdateAvatar) {
          onUpdateAvatar(result);
          setImageError(false);
          setUploadNotice(lang === 'uz' ? 'Rasm muvaffaqiyatli yangilandi!' : 'Photo updated successfully!');
          setTimeout(() => setUploadNotice(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] mx-auto group">
      {/* Hidden file input for uploading real portrait photo anytime */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Ambient Outer Technological Glow (Electric Cyan & Neon Violet) */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-purple-600/30 rounded-[34px] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      {/* Main Card Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-[30px] p-[2px] bg-gradient-to-b from-cyan-400/60 via-slate-750 to-indigo-500/60 shadow-2xl shadow-cyan-950/40 transition-all duration-300"
      >
        <div
          className={`relative rounded-[28px] overflow-hidden aspect-[4/5] flex flex-col justify-between ${
            isDark ? 'bg-slate-950' : 'bg-slate-900'
          }`}
        >
          {/* Top Status Overlay Badge (Never covers the face) */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono text-[11px] shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-semibold tracking-wider">
                {lang === 'uz' ? 'YOSH DASTURCHI' : 'TECH CREATOR'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-slate-300 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{profile.location[lang]}</span>
            </div>
          </div>

          {/* Actual Profile Photo Container */}
          <div className="relative w-full h-full overflow-hidden">
            {!imageError ? (
              <img
                src={avatarSrc}
                alt={profile.name}
                className="w-full h-full object-cover object-[center_top] select-none transition-transform duration-700 group-hover:scale-[1.03]"
                onError={() => setImageError(true)}
              />
            ) : (
              /* Fallback Tech Silhouette if photo path not yet loaded */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-center">
                <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/20">
                  <User className="w-12 h-12" />
                </div>
                <div className="text-base font-bold font-mono text-slate-200">
                  {profile.name}
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xs font-mono">
                  {lang === 'uz'
                    ? 'Haqiqiy profil fotosurati'
                    : 'Authentic portrait view'}
                </p>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-colors shadow-md shadow-cyan-500/30"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{lang === 'uz' ? 'Rasmni tanlash' : 'Select Photo'}</span>
                </button>
              </div>
            )}

            {/* Subtle technology gradient vignette at the bottom for readability */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />
          </div>

          {/* Bottom Card Footer Banner */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-mono font-bold text-sm sm:text-base text-slate-100 truncate">
                    {profile.name}
                  </h3>
                  <div className="text-[11px] font-mono text-cyan-400 mt-0.5 truncate flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{lang === 'uz' ? 'Dasturlash • IoT • Robototexnika' : 'Web • IoT • Robotics'}</span>
                  </div>
                </div>

                {/* Change photo button */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="shrink-0 p-2 rounded-xl bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-700/80 transition-all text-xs font-mono flex items-center gap-1 shadow-sm"
                  title={lang === 'uz' ? 'Rasmni almashtirish / yuklash' : 'Change profile photo'}
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Tag Pills */}
              <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  HTML / JS
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                  ESP32
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                  AI Prototyping
                </span>
              </div>
            </div>

            {/* Temporary upload toast notice */}
            {uploadNotice && (
              <div className="mt-2 p-2 rounded-xl bg-emerald-500/90 text-slate-950 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{uploadNotice}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
