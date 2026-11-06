import React, { useState } from 'react';
import { Terminal, CheckCircle2, Play, AlertCircle, RefreshCw, GitBranch, Layers } from 'lucide-react';

interface DeploymentDemoProps {
  lang: 'uz' | 'en';
}

export const DeploymentDemo: React.FC<DeploymentDemoProps> = ({ lang }) => {
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success'>('idle');
  const [selectedErrorTab, setSelectedErrorTab] = useState<'dependencies' | 'routing' | 'env'>('dependencies');

  const runBuild = () => {
    setBuildStatus('building');
    setTimeout(() => {
      setBuildStatus('success');
    }, 1800);
  };

  const troubleShootingTips = {
    dependencies: {
      titleUz: 'npm dependency va versiyalar ziddiyati',
      titleEn: 'npm dependency conflicts & peerDeps',
      descUz: 'Muammo: Turli paketlar kutubxonalarning har xil versiyalarini talab qilishi (masalan, React 19 vs React 18). Yechim: package.json faylidagi dependency daraxtini tahlil qilish, kerak bo‘lganda moslashtirilgan versiyalarni aniqlash.',
      descEn: 'Issue: Conflicting peer dependencies across libraries. Solution: Audit package.json tree, lock clean semver ranges, and avoid force flags without understanding breaking changes.',
      command: 'npm ls <package-name> && npm audit',
    },
    routing: {
      titleUz: 'SPA Marshrutlash (404 xatosi Vercel/Netlify)',
      titleEn: 'SPA Routing (404 on page reload in Vercel)',
      descUz: 'Muammo: Sahifa yangilanganda /project/id manzili 404 berishi. Yechim: vercel.json yoki rewrites orqali barcha so‘rovlarni /index.html manziliga yo‘naltirish.',
      descEn: 'Issue: Direct deep URL refreshes yielding 404 on static hosts. Solution: Configure rewrites to index.html in vercel.json.',
      command: '{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}',
    },
    env: {
      titleUz: 'Atrof-muhit o‘zgaruvchilari (Environment Variables)',
      titleEn: 'Client Environment Variables (VITE_ prefixes)',
      descUz: 'Muammo: Brauzerda process.env ishlamasligi. Yechim: Vite frameworkida mijoz tomoniga uzatiluvchi o‘zgaruvchilarni VITE_ prefiksi bilan belgilash.',
      descEn: 'Issue: process.env is undefined in browser bundle. Solution: Prefix client-exposed env variables with VITE_ in Vite apps.',
      command: 'VITE_API_URL="https://example.com" -> import.meta.env.VITE_API_URL',
    },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-mono text-xs font-semibold text-indigo-400 tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4" />
            DEPLOYMENT WORKFLOW & BUILD LOG ANALYZER
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'uz'
              ? 'GitHub va Vercel platformalariga joylashtirishdagi amaliy xulosa va loglar'
              : 'Interactive CI/CD build inspection and troubleshooting guide'}
          </p>
        </div>

        <button
          type="button"
          onClick={runBuild}
          disabled={buildStatus === 'building'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono transition-colors disabled:opacity-50"
        >
          {buildStatus === 'building' ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          <span>{buildStatus === 'building' ? (lang === 'uz' ? 'Qurilmoqda...' : 'Building...') : (lang === 'uz' ? 'Buildni Sinash' : 'Simulate Build')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* Left: Terminal Output */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900 text-[10px] text-slate-500 mb-3">
            <span className="flex items-center gap-1 text-indigo-400">
              <GitBranch className="w-3 h-3" /> main @ github.com/user/portfolio
            </span>
            <span>Vite 8.3.0</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="text-slate-500">$ git push origin main</div>
            <div className="text-slate-400">remote: Resolving deltas: 100% (4/4), completed with 4 local objects.</div>
            <div className="text-indigo-400">$ vite build</div>
            <div className="text-slate-400">vite v8.3.0 building for production...</div>
            <div className="text-slate-400">transforming (24) modules...</div>

            {buildStatus === 'building' && (
              <div className="text-amber-400 animate-pulse">
                ⚙ Compiling TypeScript & optimizing chunks...
              </div>
            )}

            {buildStatus === 'success' && (
              <>
                <div className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> ✓ 28 modules transformed.
                </div>
                <div className="text-slate-400">dist/index.html                   0.82 kB │ gzip:  0.45 kB</div>
                <div className="text-slate-400">dist/assets/index-38a1.css       12.40 kB │ gzip:  3.10 kB</div>
                <div className="text-slate-400">dist/assets/index-94c0.js       184.22 kB │ gzip: 58.12 kB</div>
                <div className="text-emerald-400 font-bold mt-1">✓ built in 418ms (Zero Errors)</div>
                <div className="text-indigo-300 text-[10px]">Ready for preview: https://portfolio.vercel.app</div>
              </>
            )}

            {buildStatus === 'idle' && (
              <div className="text-slate-600 italic">
                {lang === 'uz' ? 'Build jarayonini boshlash uchun yuqoridagi tugmani bosing.' : 'Click "Simulate Build" above to test deployment.'}
              </div>
            )}
          </div>
        </div>

        {/* Right: Debugging Wisdom */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h5 className="text-xs font-mono text-slate-300 font-semibold mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              {lang === 'uz' ? 'O‘rganilgan Xatolar va Yechimlar' : 'Practical Debugging Lessons'}
            </h5>

            <div className="flex gap-1.5 mb-3">
              {(['dependencies', 'routing', 'env'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedErrorTab(tab)}
                  className={`text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                    selectedErrorTab === tab
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'dependencies' ? 'npm deps' : tab === 'routing' ? 'SPA 404' : 'Vite env'}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-indigo-300">
                {lang === 'uz' ? troubleShootingTips[selectedErrorTab].titleUz : troubleShootingTips[selectedErrorTab].titleEn}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {lang === 'uz' ? troubleShootingTips[selectedErrorTab].descUz : troubleShootingTips[selectedErrorTab].descEn}
              </p>
              <div className="p-2 rounded bg-slate-900 border border-slate-850 font-mono text-[10px] text-emerald-400 break-all">
                {troubleShootingTips[selectedErrorTab].command}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500">
            {lang === 'uz'
              ? 'Xatolar — muvaffaqiyatsizlik emas, balki chuqur o‘rganishning eng yaxshi manbaidir.'
              : 'Errors are not setbacks, but the most authentic source of engineering mastery.'}
          </div>
        </div>
      </div>
    </div>
  );
};
