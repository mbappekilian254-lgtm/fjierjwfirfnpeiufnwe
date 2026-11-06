import React, { useState } from 'react';
import { Wifi, Radio, Zap, RefreshCw, Sun, Moon, CheckCircle2 } from 'lucide-react';

interface Esp32LedSimulatorProps {
  lang: 'uz' | 'en';
}

export const Esp32LedSimulator: React.FC<Esp32LedSimulatorProps> = ({ lang }) => {
  const [color, setColor] = useState({ r: 56, g: 189, b: 248 }); // #38bdf8
  const [brightness, setBrightness] = useState(85);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [requestLog, setRequestLog] = useState<string[]>([
    'GET /api/status -> 200 OK [WiFi Connected: 192.168.1.145]',
    'POST /api/led { r: 56, g: 189, b: 248, pwr: 1 } -> 200 OK',
  ]);

  const presetColors = [
    { name: 'Electric Cyan', r: 56, g: 189, b: 248, hex: '#38bdf8' },
    { name: 'Neon Purple', r: 168, g: 85, b: 247, hex: '#a855f7' },
    { name: 'Emerald Green', r: 34, g: 197, b: 94, hex: '#22c55e' },
    { name: 'Amber Warm', r: 245, g: 158, b: 11, hex: '#f59e0b' },
    { name: 'Crimson Red', r: 239, g: 68, b: 68, hex: '#ef4444' },
    { name: 'Pure White', r: 255, g: 255, b: 255, hex: '#ffffff' },
  ];

  const handleColorSelect = (r: number, g: number, b: number) => {
    setColor({ r, g, b });
    if (!isPowerOn) setIsPowerOn(true);
    const newEntry = `POST /api/led { r: ${r}, g: ${g}, b: ${b}, pwm: ${Math.round((brightness / 100) * 255)} } -> 200 OK (8ms)`;
    setRequestLog((prev) => [newEntry, ...prev.slice(0, 4)]);
  };

  const effectiveR = isPowerOn ? Math.round((color.r * brightness) / 100) : 0;
  const effectiveG = isPowerOn ? Math.round((color.g * brightness) / 100) : 0;
  const effectiveB = isPowerOn ? Math.round((color.b * brightness) / 100) : 0;

  const rgbString = `rgb(${effectiveR}, ${effectiveG}, ${effectiveB})`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider">
            ESP32 WEB SERVER SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" /> 192.168.1.145
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Port 80
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {/* Hardware Visual */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 blur-3xl opacity-30 transition-all duration-300 pointer-events-none"
            style={{ backgroundColor: rgbString }}
          />

          {/* LED Lamp Indicator */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full border-4 border-slate-700 transition-all duration-300 flex items-center justify-center shadow-2xl"
              style={{
                backgroundColor: isPowerOn ? rgbString : '#1e293b',
                boxShadow: isPowerOn ? `0 0 45px ${rgbString}, inset 0 0 20px rgba(255,255,255,0.4)` : 'none',
              }}
            >
              <Zap className={`w-8 h-8 ${isPowerOn ? 'text-white opacity-80' : 'text-slate-600'}`} />
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                {lang === 'uz' ? 'LED Holati' : 'LED Output'}:
              </span>
              <span className="ml-2 font-mono font-bold text-sm text-cyan-300">
                {isPowerOn ? `RGB(${effectiveR}, ${effectiveG}, ${effectiveB})` : (lang === 'uz' ? 'O‘chiq' : 'OFF')}
              </span>
            </div>

            {/* Simulated ESP32 GPIO Pins */}
            <div className="grid grid-cols-3 gap-2 mt-5 w-full max-w-xs font-mono text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <div className="text-red-400 font-semibold">GPIO 26 (R)</div>
                <div className="text-slate-300">{effectiveR} / 255</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <div className="text-emerald-400 font-semibold">GPIO 27 (G)</div>
                <div className="text-slate-300">{effectiveG} / 255</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <div className="text-blue-400 font-semibold">GPIO 14 (B)</div>
                <div className="text-slate-300">{effectiveB} / 255</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {lang === 'uz' ? 'Rang tanlash' : 'Preset Colors'}
              </label>
              <button
                type="button"
                onClick={() => setIsPowerOn(!isPowerOn)}
                className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all ${
                  isPowerOn
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                }`}
              >
                {isPowerOn ? (lang === 'uz' ? 'O‘chirish' : 'Turn OFF') : (lang === 'uz' ? 'Yoqish' : 'Turn ON')}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {presetColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleColorSelect(c.r, c.g, c.b)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all text-xs"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="truncate text-slate-200">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1 text-slate-400">
              <span>{lang === 'uz' ? 'Yorqinlik (PWM)' : 'Brightness (PWM)'}</span>
              <span className="text-cyan-400 font-bold">{brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Telemetry Log */}
          <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[10px] text-slate-400">
            <div className="text-slate-500 mb-1 flex items-center gap-1 font-semibold">
              <Radio className="w-3 h-3 text-cyan-400" />
              {lang === 'uz' ? 'Simulyatsiya HTTP Loglari:' : 'Simulated HTTP REST Log:'}
            </div>
            <div className="space-y-0.5">
              {requestLog.map((log, idx) => (
                <div key={idx} className="truncate text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
