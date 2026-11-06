import React, { useState } from 'react';
import { ExternalLink, QrCode, Smartphone, Utensils, Sparkles, Check } from 'lucide-react';

interface DigitalMenuDemoProps {
  lang: 'uz' | 'en';
}

export const DigitalMenuDemo: React.FC<DigitalMenuDemoProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'korean' | 'drinks' | 'desserts'>('korean');
  const externalLink = 'https://king-dong-menu-showcase.lovable.app';

  const menuItems = {
    korean: [
      { nameUz: 'King Dong Tteokbokki', nameEn: 'King Dong Tteokbokki', price: '45,000 UZS', desc: 'Achchiq koreys sousi va pishloqli guruchli kolbasachalar' },
      { nameUz: 'Crispy Kimchi Kimbap', nameEn: 'Crispy Kimchi Kimbap', price: '38,000 UZS', desc: 'Kimchi va sabzavotlar bilan o‘ralgan an’anaviy roll' },
      { nameUz: 'Yangnyeom Fried Chicken', nameEn: 'Yangnyeom Fried Chicken', price: '62,000 UZS', desc: 'Qarsildoq koreyscha tovuq qanotchasi shirin-achchiq glazurda' },
    ],
    drinks: [
      { nameUz: 'Boba Milk Tea', nameEn: 'Classic Boba Milk Tea', price: '28,000 UZS', desc: 'Tapioka donachalari va xushbo‘y sutli choy' },
      { nameUz: 'Yuzu Sparkling Lemonade', nameEn: 'Yuzu Sparkling Lemonade', price: '25,000 UZS', desc: 'Yapon tsitrus mevasi va gazlangan tetiklashtiruvchi ichimlik' },
    ],
    desserts: [
      { nameUz: 'Matcha Bingsu', nameEn: 'Matcha Shaved Ice Bingsu', price: '35,000 UZS', desc: 'Matcha kukuni, quyultirilgan sut va muzli desert' },
    ],
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-mono text-xs font-semibold text-amber-400 tracking-wider flex items-center gap-1.5">
            <QrCode className="w-4 h-4" />
            DIGITAL MENU QR • INTERACTIVE DEMO
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'uz'
              ? 'Telefon orqali bir zumda ochiluvchi raqamli menyu prototipi'
              : 'Touchless contactless digital dining menu showcase'}
          </p>
        </div>

        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold font-mono transition-all shadow-sm"
        >
          <span>{lang === 'uz' ? 'Jonli Saytni Ochish' : 'Open Live Showcase'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5">
        {/* Left: QR Code Display Card */}
        <div className="md:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-200 relative group">
            {/* Styled SVG QR Code */}
            <svg
              className="w-40 h-40"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary */}
              <rect width="120" height="120" fill="white" />
              {/* Top Left Marker */}
              <rect x="10" y="10" width="30" height="30" rx="4" fill="#0f172a" />
              <rect x="16" y="16" width="18" height="18" rx="2" fill="white" />
              <rect x="20" y="20" width="10" height="10" rx="1" fill="#f59e0b" />

              {/* Top Right Marker */}
              <rect x="80" y="10" width="30" height="30" rx="4" fill="#0f172a" />
              <rect x="86" y="16" width="18" height="18" rx="2" fill="white" />
              <rect x="90" y="20" width="10" height="10" rx="1" fill="#f59e0b" />

              {/* Bottom Left Marker */}
              <rect x="10" y="80" width="30" height="30" rx="4" fill="#0f172a" />
              <rect x="16" y="86" width="18" height="18" rx="2" fill="white" />
              <rect x="20" y="90" width="10" height="10" rx="1" fill="#f59e0b" />

              {/* Decorative data pixels */}
              <rect x="46" y="12" width="6" height="6" fill="#0f172a" />
              <rect x="56" y="12" width="6" height="6" fill="#0f172a" />
              <rect x="66" y="12" width="6" height="6" fill="#0f172a" />
              <rect x="46" y="24" width="6" height="6" fill="#0f172a" />
              <rect x="66" y="24" width="6" height="6" fill="#0f172a" />
              <rect x="46" y="36" width="6" height="6" fill="#0f172a" />
              <rect x="56" y="36" width="6" height="6" fill="#0f172a" />

              <rect x="12" y="48" width="6" height="6" fill="#0f172a" />
              <rect x="24" y="48" width="6" height="6" fill="#0f172a" />
              <rect x="36" y="48" width="6" height="6" fill="#0f172a" />
              <rect x="50" y="50" width="18" height="18" rx="4" fill="#f59e0b" />
              <rect x="80" y="48" width="6" height="6" fill="#0f172a" />
              <rect x="96" y="48" width="6" height="6" fill="#0f172a" />

              <rect x="46" y="76" width="6" height="6" fill="#0f172a" />
              <rect x="66" y="76" width="6" height="6" fill="#0f172a" />
              <rect x="46" y="88" width="6" height="6" fill="#0f172a" />
              <rect x="56" y="88" width="6" height="6" fill="#0f172a" />
              <rect x="66" y="88" width="6" height="6" fill="#0f172a" />
              <rect x="80" y="80" width="6" height="6" fill="#0f172a" />
              <rect x="92" y="88" width="6" height="6" fill="#0f172a" />
              <rect x="84" y="98" width="6" height="6" fill="#0f172a" />
              <rect x="100" y="98" width="6" height="6" fill="#0f172a" />
            </svg>
          </div>

          <div className="mt-3">
            <span className="text-xs font-mono font-semibold text-amber-300">
              Table #12 • King Dong Menu
            </span>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">
              {lang === 'uz'
                ? 'Stol ustiga joylashtiriladigan bosma formatdagi QR-kod namunasi'
                : 'Sample table-top printable QR badge preview'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 w-full text-[10px] font-mono text-slate-500">
            {externalLink}
          </div>
        </div>

        {/* Right: Simulated Mobile Menu Viewport */}
        <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-slate-200 font-semibold">
                  {lang === 'uz' ? 'Mobil Ko‘rinish Namunasi' : 'Mobile Viewport Preview'}
                </span>
              </div>
              <div className="flex gap-1">
                {(['korean', 'drinks', 'desserts'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                      activeTab === tab
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab === 'korean' ? (lang === 'uz' ? 'Taomlar' : 'Dishes') : tab === 'drinks' ? (lang === 'uz' ? 'Ichimliklar' : 'Drinks') : (lang === 'uz' ? 'Shirinliklar' : 'Dessert')}
                  </button>
                ))}
              </div>
            </div>

            {/* Dishes list */}
            <div className="mt-3 space-y-2.5">
              {menuItems[activeTab].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <Utensils className="w-3 h-3 text-amber-400" />
                      <span>{lang === 'uz' ? item.nameUz : item.nameEn}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {item.desc}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Responsive Mobile Web UI</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Lovable Showcase
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
