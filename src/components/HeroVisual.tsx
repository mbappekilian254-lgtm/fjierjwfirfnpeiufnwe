import React, { useState } from 'react';
import { Cpu, Wifi, Radio, Zap, Shield, Sparkles, Terminal, Layers } from 'lucide-react';

interface HeroVisualProps {
  lang: 'uz' | 'en';
  isDark: boolean;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ lang, isDark }) => {
  const [activePin, setActivePin] = useState<number | null>(25);
  const [pulseCount, setPulseCount] = useState(148);

  const pins = [
    { num: 25, label: 'GPIO 25', module: lang === 'uz' ? 'Tugma DO (C4)' : 'Note DO Button', color: '#ef4444' },
    { num: 33, label: 'GPIO 33', module: lang === 'uz' ? 'Tugma RE (D4)' : 'Note RE Button', color: '#22c55e' },
    { num: 32, label: 'GPIO 32', module: lang === 'uz' ? 'Tugma MI (E4)' : 'Note MI Button', color: '#3b82f6' },
    { num: 26, label: 'GPIO 26', module: lang === 'uz' ? 'RGB LED (Red PWM)' : 'RGB LED (Red)', color: '#ec4899' },
    { num: 27, label: 'GPIO 27', module: lang === 'uz' ? 'RGB LED (Green PWM)' : 'RGB LED (Green)', color: '#10b981' },
    { num: 14, label: 'GPIO 14', module: lang === 'uz' ? 'RGB LED (Blue PWM)' : 'RGB LED (Blue)', color: '#06b6d4' },
    { num: 4, label: 'GPIO 4', module: lang === 'uz' ? 'HC-SR04 Trig Pin' : 'HC-SR04 Trig', color: '#f59e0b' },
    { num: 34, label: 'GPIO 34', module: lang === 'uz' ? 'Olov Sensori (ADC)' : 'Flame Sensor ADC', color: '#f97316' },
  ];

  const handlePinClick = (pinNum: number) => {
    setActivePin(pinNum);
    setPulseCount((prev) => prev + 1);
  };

  const currentPinData = pins.find((p) => p.num === activePin) || pins[0];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Container */}
      <div
        className={`relative z-10 rounded-2xl border transition-all backdrop-blur-xl p-5 sm:p-6 shadow-2xl ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/40 text-slate-100'
            : 'bg-white/95 border-slate-200 shadow-slate-300/60 text-slate-900'
        }`}
      >
        {/* Header telemetry badge */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <div className="font-mono text-xs font-bold tracking-wider text-cyan-400">
              ESP32 SYSTEM ARCHITECTURE
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Wifi className="w-3.5 h-3.5" /> 2.4GHz
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline">Dual-Core 240MHz</span>
          </div>
        </div>

        {/* Microcontroller Interactive Board Schematic */}
        <div
          className={`mt-5 p-4 rounded-xl border relative overflow-hidden ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}
        >
          {/* Subtle PCB Grid Lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

          {/* Central ESP-WROOM-32 Core */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Antenna Trace Area */}
            <div className="w-28 h-6 bg-amber-900/40 border border-amber-600/50 rounded-t-lg flex items-center justify-center relative overflow-hidden">
              <div className="w-16 h-2 border-b-2 border-amber-400/80" />
              <span className="text-[9px] font-mono text-amber-300 absolute">MIFA ANTENNA</span>
            </div>

            {/* Metal RF Shield */}
            <div className="w-40 sm:w-48 p-3 rounded-b-lg rounded-t-sm bg-gradient-to-b from-slate-700 to-slate-800 border border-slate-600 shadow-lg text-center my-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-200">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>ESP-WROOM-32</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                FCC ID: 2AC7Z-ESPWROOM32
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-mono">
                <span className="px-1.5 py-0.5 rounded bg-slate-900/80 text-cyan-300 border border-cyan-800/40">
                  Xtensa LX6
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-900/80 text-emerald-300 border border-emerald-800/40">
                  520 KB SRAM
                </span>
              </div>
            </div>

            {/* Active Pin Output Display */}
            <div className="w-full mt-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-mono">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: currentPinData.color }}
                />
                <span className="font-bold text-cyan-300">{currentPinData.label}</span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-200 font-semibold">{currentPinData.module}</span>
              </div>
            </div>

            {/* Clickable GPIO Pin Matrix */}
            <div className="w-full mt-3">
              <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                <span>{lang === 'uz' ? 'PINNI TANLANG VA SIGNALLARNI KO‘RING:' : 'SELECT PIN TO TRIGGER SIGNAL:'}</span>
                <span className="text-cyan-400">Pulses: {pulseCount}</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {pins.map((pin) => {
                  const isSel = activePin === pin.num;
                  return (
                    <button
                      key={pin.num}
                      type="button"
                      onClick={() => handlePinClick(pin.num)}
                      className={`text-[11px] font-mono py-1.5 px-1 rounded border transition-all text-center ${
                        isSel
                          ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.4)] scale-102 font-bold'
                          : 'border-slate-800 bg-slate-900/90 hover:bg-slate-850 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="truncate">P{pin.num}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Code Snippet & Firmware Ticker */}
        <div
          className={`mt-4 p-3 rounded-xl border font-mono text-xs ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1.5 border-b border-slate-800 mb-2">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Terminal className="w-3 h-3" /> main.cpp • Arduino IDE / PlatformIO
            </span>
            <span>UTF-8</span>
          </div>

          <div className="space-y-1 text-[11px] font-mono">
            <div>
              <span className="text-purple-400">#include</span>{' '}
              <span className="text-emerald-300">&lt;WiFi.h&gt;</span>
            </div>
            <div>
              <span className="text-blue-400">void</span>{' '}
              <span className="text-amber-300">loop</span>() &#123;
            </div>
            <div className="pl-4 text-slate-400">
              <span className="text-blue-400">int</span> signal ={' '}
              <span className="text-cyan-300">digitalRead</span>({activePin});
            </div>
            <div className="pl-4 text-slate-400">
              <span className="text-purple-400">if</span> (signal == HIGH) &#123;{' '}
              <span className="text-emerald-400">// Handled</span> &#125;
            </div>
            <div>&#125;</div>
          </div>
        </div>

        {/* Core Pillars Ribbon */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/60 text-center font-mono text-[11px]">
          <div className="p-1.5 rounded bg-slate-800/40 text-slate-400">
            <span className="text-cyan-400 font-bold block">Frontend</span>
            React • HTML/CSS
          </div>
          <div className="p-1.5 rounded bg-slate-800/40 text-slate-400">
            <span className="text-emerald-400 font-bold block">Hardware</span>
            ESP32 • Arduino
          </div>
          <div className="p-1.5 rounded bg-slate-800/40 text-slate-400">
            <span className="text-indigo-400 font-bold block">Digital</span>
            AI Studio • APIs
          </div>
        </div>
      </div>
    </div>
  );
};
