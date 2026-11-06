import React, { useState } from 'react';
import { Flame, Gauge, Navigation, RotateCw, AlertTriangle, ShieldCheck, Terminal } from 'lucide-react';

interface SensorLabSimulatorProps {
  lang: 'uz' | 'en';
}

export const SensorLabSimulator: React.FC<SensorLabSimulatorProps> = ({ lang }) => {
  const [temp, setTemp] = useState(26);
  const [humidity, setHumidity] = useState(54);
  const [distance, setDistance] = useState(45);
  const [flameDetected, setFlameDetected] = useState(false);
  const [motorSpeed, setMotorSpeed] = useState(60);
  const [servoAngle, setServoAngle] = useState(90);

  const isObstacleClose = distance < 15;
  const isFireAlert = flameDetected || temp > 45;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider">
            ESP32 HARDWARE & SENSOR LAB SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          {isFireAlert ? (
            <span className="flex items-center gap-1 text-red-400 bg-red-950/50 border border-red-500/50 px-2 py-0.5 rounded-full animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              {lang === 'uz' ? 'XAVF: Olov / Yuqori Harorat!' : 'CRITICAL: Flame / Temp Alert!'}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === 'uz' ? 'Tizim barqaror' : 'Systems Nominal'}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* Left Column: Environmental Sensors */}
        <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>DHT11 & HC-SR04 Telemetry</span>
            <span className="text-slate-500 text-[10px]">I2C / GPIO</span>
          </h4>

          {/* Temperature & Humidity */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">{lang === 'uz' ? 'DHT11 Harorat:' : 'DHT11 Temperature:'}</span>
                <span className={temp > 40 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {temp}°C
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">{lang === 'uz' ? 'DHT11 Namlik:' : 'DHT11 Humidity:'}</span>
                <span className="text-sky-400 font-bold">{humidity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>
          </div>

          {/* Ultrasonic Distance */}
          <div className="pt-2 border-t border-slate-900">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">{lang === 'uz' ? 'HC-SR04 Masofa:' : 'HC-SR04 Ultrasonic Distance:'}</span>
              <span className={isObstacleClose ? 'text-amber-400 font-bold animate-pulse' : 'text-slate-300 font-bold'}>
                {distance} cm {isObstacleClose && `(${lang === 'uz' ? 'To‘siq yaqin!' : 'Obstacle!'})`}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Flame Sensor Interactive Toggle */}
          <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-slate-200">
                {lang === 'uz' ? 'Olov Sensori (IR Diode)' : 'Flame Sensor (IR Diode)'}
              </div>
              <div className="text-[10px] text-slate-500">GPIO 34 Digital Input</div>
            </div>
            <button
              type="button"
              onClick={() => setFlameDetected(!flameDetected)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                flameDetected
                  ? 'bg-red-500 text-white shadow-[0_0_15px_#ef4444]'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{flameDetected ? (lang === 'uz' ? 'Olov bor!' : 'FLAME ON') : (lang === 'uz' ? 'Olovni sinash' : 'Simulate Flame')}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Actuators (Motor & Servo & Water Pump) */}
        <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between mb-3">
              <span>L298N Motor Driver & Servo SG90</span>
              <span className="text-slate-500 text-[10px]">PWM Outputs</span>
            </h4>

            {/* DC Motor Speed with visual spin */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">{lang === 'uz' ? 'DC Motor Tezligi (PWM):' : 'DC Motor Speed (PWM):'}</span>
                  <span className="text-cyan-400 font-bold">{motorSpeed}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={motorSpeed}
                  onChange={(e) => setMotorSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* SG90 Servo Angle */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">{lang === 'uz' ? 'SG90 Servo Burchagi:' : 'SG90 Servo Angle:'}</span>
                  <span className="text-indigo-400 font-bold">{servoAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={servoAngle}
                  onChange={(e) => setServoAngle(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>
            </div>
          </div>

          {/* Actuator Visual Representations */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-900">
            {/* Spinning Fan Visual */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center">
              <RotateCw
                className={`w-7 h-7 text-cyan-400 ${
                  motorSpeed > 0 ? 'animate-spin' : 'opacity-40'
                }`}
                style={{
                  animationDuration: motorSpeed > 0 ? `${Math.max(0.15, (100 - motorSpeed) / 40)}s` : undefined,
                }}
              />
              <span className="text-[11px] font-mono mt-1 text-slate-300">
                {motorSpeed > 0 ? (lang === 'uz' ? 'Motor Aylanmoqda' : 'Motor Running') : (lang === 'uz' ? 'To‘xtagan' : 'Stopped')}
              </span>
            </div>

            {/* Water Pump & Extinguisher status */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center">
              <div
                className={`w-4 h-4 rounded-full mb-1 transition-all ${
                  isFireAlert
                    ? 'bg-red-500 shadow-[0_0_14px_#ef4444] animate-ping'
                    : 'bg-slate-700'
                }`}
              />
              <span className="text-[11px] font-mono text-slate-300">
                {lang === 'uz' ? '5V Suv Nasosi:' : '5V Water Pump:'}
              </span>
              <span className={`text-[10px] font-mono font-bold ${isFireAlert ? 'text-red-400' : 'text-slate-500'}`}>
                {isFireAlert ? (lang === 'uz' ? 'PURKASH FAOL!' : 'SPRAY ACTIVE!') : (lang === 'uz' ? 'Kutish rejimi' : 'Standby')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Serial Output Line */}
      <div className="mt-4 p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center justify-between">
        <span className="text-emerald-400">
          [Serial 115200bps] Temp={temp}C | Hum={humidity}% | Dist={distance}cm | Flame={flameDetected ? 'YES' : 'NO'} | PWM={motorSpeed}%
        </span>
        <span className="text-slate-600 hidden sm:inline">ESP32-FreeRTOS</span>
      </div>
    </div>
  );
};
