import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Cpu, Sparkles } from 'lucide-react';

interface Esp32PianoSimulatorProps {
  lang: 'uz' | 'en';
}

interface NoteItem {
  id: string;
  name: string;
  freq: number;
  gpio?: number;
  color: string;
  keyLabel: string;
}

export const Esp32PianoSimulator: React.FC<Esp32PianoSimulatorProps> = ({ lang }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeLeds, setActiveLeds] = useState<{ red: boolean; green: boolean; blue: boolean }>({
    red: false,
    green: false,
    blue: false,
  });
  const [lastLog, setLastLog] = useState<string>('Ready. Click keys or use keys 1-5');

  const audioCtxRef = useRef<AudioContext | null>(null);

  const notes: NoteItem[] = [
    { id: 'do', name: 'DO (C4)', freq: 261.63, gpio: 25, color: '#ef4444', keyLabel: '1' },
    { id: 're', name: 'RE (D4)', freq: 293.66, gpio: 33, color: '#22c55e', keyLabel: '2' },
    { id: 'mi', name: 'MI (E4)', freq: 329.63, gpio: 32, color: '#3b82f6', keyLabel: '3' },
    { id: 'fa', name: 'FA (F4)', freq: 349.23, color: '#eab308', keyLabel: '4' },
    { id: 'sol', name: 'SOL (G4)', freq: 392.00, color: '#a855f7', keyLabel: '5' },
  ];

  const playTone = (note: NoteItem) => {
    setActiveNote(note.id);

    // Update LED indicators
    setActiveLeds({
      red: note.id === 'do' || note.id === 'fa',
      green: note.id === 're' || note.id === 'sol',
      blue: note.id === 'mi' || note.id === 'sol',
    });

    setLastLog(
      note.gpio
        ? `[GPIO ${note.gpio}] Interrupt triggered -> Generating ${note.name} (${Math.round(note.freq)}Hz)`
        : `[Web Tone] Generating ${note.name} (${Math.round(note.freq)}Hz)`
    );

    if (soundEnabled) {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, audioCtxRef.current.currentTime);

        gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.5);
      } catch {
        // Fallback gracefully
      }
    }

    setTimeout(() => {
      setActiveNote((prev) => (prev === note.id ? null : prev));
      setActiveLeds({ red: false, green: false, blue: false });
    }, 450);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const found = notes.find((n) => n.keyLabel === e.key);
      if (found) {
        playTone(found);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-sky-400" />
          <span className="font-mono text-xs font-semibold text-sky-400 tracking-wider">
            ESP32 SMART PIANO INTERFACE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span>{soundEnabled ? (lang === 'uz' ? 'Ovoz yoqiq' : 'Audio ON') : (lang === 'uz' ? 'Ovoz o‘chiq' : 'Audio Muted')}</span>
          </button>
        </div>
      </div>

      {/* Main Piano Layout */}
      <div className="mt-5 space-y-5">
        {/* Hardware Status Display */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[11px] font-mono text-slate-400 mb-1">
              {lang === 'uz' ? 'Fizik Tugmalar (GPIO)' : 'Physical Buttons (GPIO)'}
            </div>
            <div className="flex items-center justify-center gap-2 font-mono text-xs">
              <span className={`px-2 py-0.5 rounded border ${activeNote === 'do' ? 'bg-red-500/20 text-red-300 border-red-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                P25 (DO)
              </span>
              <span className={`px-2 py-0.5 rounded border ${activeNote === 're' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                P33 (RE)
              </span>
              <span className={`px-2 py-0.5 rounded border ${activeNote === 'mi' ? 'bg-blue-500/20 text-blue-300 border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                P32 (MI)
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[11px] font-mono text-slate-400 mb-1">
              {lang === 'uz' ? 'RGB Indikatorlar' : 'RGB LED Feedback'}
            </div>
            <div className="flex items-center justify-center gap-3">
              <div
                className={`w-4 h-4 rounded-full transition-all duration-200 border border-slate-700 ${
                  activeLeds.red ? 'bg-red-500 shadow-[0_0_12px_#ef4444]' : 'bg-red-950/40 opacity-40'
                }`}
              />
              <div
                className={`w-4 h-4 rounded-full transition-all duration-200 border border-slate-700 ${
                  activeLeds.green ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-emerald-950/40 opacity-40'
                }`}
              />
              <div
                className={`w-4 h-4 rounded-full transition-all duration-200 border border-slate-700 ${
                  activeLeds.blue ? 'bg-blue-500 shadow-[0_0_12px_#3b82f6]' : 'bg-blue-950/40 opacity-40'
                }`}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[11px] font-mono text-slate-400 mb-1">
              {lang === 'uz' ? 'Xotira / Sozlama' : 'Preferences Memory'}
            </div>
            <div className="font-mono text-xs text-cyan-400 flex items-center justify-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>NVS Flash OK</span>
            </div>
          </div>
        </div>

        {/* Interactive Piano Keys */}
        <div>
          <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
            <span>{lang === 'uz' ? 'Notani bosing yoki klaviaturadagi (1-5) tugmalardan foydalaning:' : 'Press keys or use keyboard (1-5):'}</span>
            <span className="text-sky-400">Web Audio Synth</span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {notes.map((note) => {
              const isActive = activeNote === note.id;
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => playTone(note)}
                  className={`relative flex flex-col items-center justify-between p-4 rounded-xl border transition-all duration-150 select-none ${
                    isActive
                      ? 'scale-95 shadow-xl border-sky-400 bg-sky-950/60 text-white'
                      : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 25px ${note.color}60` : undefined,
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: note.color }} />
                  <div className="my-3 text-center">
                    <div className="text-base sm:text-lg font-bold font-mono tracking-tight">
                      {note.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {Math.round(note.freq)} Hz
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    <span>Key {note.keyLabel}</span>
                  </div>
                  {note.gpio && (
                    <span className="absolute -top-2 left-2 text-[9px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.2 rounded-full">
                      P{note.gpio}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Telemetry output */}
        <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate text-slate-300">{lastLog}</span>
          </div>
          <span className="text-[10px] text-slate-500 shrink-0">Buzzer PWM DAC</span>
        </div>
      </div>
    </div>
  );
};
