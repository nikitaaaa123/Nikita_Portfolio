import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Radio, 
  Activity, 
  Cpu, 
  Layers,
  Scan
} from 'lucide-react';

interface HeroPortraitProps {
  isDark: boolean;
  className?: string;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({ isDark, className = '' }) => {
  const [activeMode, setActiveMode] = useState<'all' | 'ai' | 'rf'>('all');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Mouse Move Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2400);
  };

  // Calculated 3D tilts
  const rotateX = -mousePos.y * 14;
  const rotateY = mousePos.x * 16;
  const glowX = (mousePos.x + 0.5) * 100;
  const glowY = (mousePos.y + 0.5) * 100;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-end w-full max-w-[460px] mx-auto lg:max-w-none select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Mode Switcher Interactive Pill */}
      <div className="mb-4 z-20 flex items-center gap-1.5 p-1 rounded-full border backdrop-blur-md transition-all shadow-sm">
        <div className={`flex items-center gap-1 rounded-full p-0.5 text-[11px] font-mono ${
          isDark ? 'bg-slate-900/90 border border-slate-800' : 'bg-white/90 border border-slate-200 shadow-sm'
        }`}>
          <button
            onClick={() => setActiveMode('all')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'all'
                ? 'bg-blue-600 text-white shadow-sm' 
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Dual Core</span>
          </button>

          <button
            onClick={() => setActiveMode('ai')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'ai'
                ? 'bg-indigo-600 text-white shadow-sm' 
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3 h-3 text-blue-300" />
            <span>AI / ML</span>
          </button>

          <button
            onClick={() => setActiveMode('rf')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'rf'
                ? 'bg-emerald-600 text-white shadow-sm' 
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-3 h-3 text-emerald-300" />
            <span>RF Systems</span>
          </button>
        </div>

        {/* Diagnostic Scan Trigger */}
        <button
          onClick={triggerScan}
          disabled={isScanning}
          title="Run holographic diagnostic scan"
          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
            isScanning
              ? 'bg-blue-500 text-white border-blue-400 animate-pulse'
              : isDark
                ? 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50'
                : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300'
          }`}
        >
          <Scan className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Animated Concentric RF Waves & HUD Rings Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] pointer-events-none -z-10 flex items-center justify-center">
        {/* Outermost Radar Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-0 rounded-full border border-dashed transition-opacity duration-500 ${
            isDark ? 'border-blue-500/15' : 'border-blue-400/20'
          }`}
        />

        {/* Middle Pulse Ring */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute w-72 sm:w-88 h-72 sm:h-88 rounded-full border transition-colors ${
            activeMode === 'rf' 
              ? 'border-emerald-500/30' 
              : activeMode === 'ai' 
                ? 'border-indigo-500/30' 
                : isDark ? 'border-blue-500/20' : 'border-blue-300/30'
          }`}
        />

        {/* Inner Tech Reticle with crosshairs */}
        <div className={`absolute w-56 h-56 rounded-full border ${
          isDark ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500/40" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500/40" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500/40" />
        </div>

        {/* Dynamic Ambient Background Glow following cursor */}
        <div 
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl transition-opacity duration-700 -z-10"
          style={{
            background: activeMode === 'rf'
              ? 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)'
              : activeMode === 'ai'
                ? 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)'
                : isDark
                  ? 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(16,185,129,0.14) 45%, rgba(139,92,246,0.18) 70%, transparent 80%)'
                  : 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(16,185,129,0.12) 50%, transparent 70%)',
            left: `${glowX}%`,
            top: `${glowY}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Main 3D Tilt Wrapper */}
      <motion.div 
        animate={{ 
          rotateX, 
          rotateY,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative w-full flex items-end justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] group">
          
          {/* Holographic Laser Scan Sweep Line */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: '0%', opacity: 0 }}
                animate={{ 
                  top: ['0%', '95%', '0%'],
                  opacity: [0, 1, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                className="absolute left-0 right-0 z-30 pointer-events-none flex flex-col items-center"
              >
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]" />
                <div className="w-full h-8 bg-gradient-to-b from-cyan-400/20 to-transparent pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Portrait Image Container - Renders Nikita's exact photo */}
          <div className="relative overflow-hidden cursor-pointer flex justify-center" onClick={triggerScan}>
            <img
              src="/final_prof_pic.png"
              alt="Nikita Bhansali - AI/ML & Embedded Systems Engineer"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[480px] sm:max-h-[540px] lg:max-h-[580px] object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-all duration-300"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>

          {/* Floating Interactive Engineering Badge 1: Top Left (AI / Neural Model) */}
          <motion.div
            animate={{ 
              y: [0, -6, 0],
              rotateZ: [0, -1, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-12 -left-3 sm:-left-6 z-20 px-3 py-2 rounded-2xl border backdrop-blur-md shadow-lg transition-all ${
              activeMode === 'rf' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
            } ${
              isDark 
                ? 'bg-slate-900/90 border-slate-700/80 text-slate-100 shadow-blue-950/40' 
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold tracking-tight">PyTorch · CNN</span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold bg-blue-500/15 text-blue-400">
                    97.8%
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Edge Inference</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Interactive Engineering Badge 2: Right Middle (RF & SDR) */}
          <motion.div
            animate={{ 
              y: [0, 7, 0],
              rotateZ: [0, 1, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className={`absolute top-1/2 -right-2 sm:-right-6 z-20 px-3 py-2 rounded-2xl border backdrop-blur-md shadow-lg transition-all ${
              activeMode === 'ai' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
            } ${
              isDark 
                ? 'bg-slate-900/90 border-slate-700/80 text-slate-100 shadow-emerald-950/40' 
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold tracking-tight">HackRF & SDR</span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold bg-emerald-500/15 text-emerald-400">
                    2.4GHz
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>RF Spectrum Sync</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Telemetry Badge 3: Bottom Left (Embedded Silicon) */}
          <motion.div
            animate={{ 
              y: [0, -5, 0]
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className={`absolute bottom-6 -left-2 sm:-left-4 z-20 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-md text-xs font-mono flex items-center gap-2 transition-all ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
                : 'bg-white/90 border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px]">ESP32-S3 · FreeRTOS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};
