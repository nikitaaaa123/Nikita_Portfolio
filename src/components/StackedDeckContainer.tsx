import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Compass
} from 'lucide-react';
import { ThemeMode } from '../types';

export interface SectionCard {
  id: string;
  number: string;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface StackedDeckContainerProps {
  sections: SectionCard[];
  theme: ThemeMode;
  onActiveSectionChange?: (index: number, sectionId: string) => void;
  activeSectionIndex: number;
  setActiveSectionIndex: (index: number) => void;
}

export const StackedDeckContainer: React.FC<StackedDeckContainerProps> = ({
  sections,
  theme,
  onActiveSectionChange,
  activeSectionIndex,
  setActiveSectionIndex,
}) => {
  const isDark = theme === 'dark';
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(false);

  // References for gesture handling & inner card scrolling
  const cardScrollContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const lastWheelTimeRef = useRef(0);
  const wheelDeltaAccumulatorRef = useRef(0);

  // Sync transition ref
  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const goToSection = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    if (targetIndex === activeSectionIndex) return;
    if (isTransitioningRef.current) return;

    setIsTransitioning(true);
    setActiveSectionIndex(targetIndex);
    if (onActiveSectionChange) {
      onActiveSectionChange(targetIndex, sections[targetIndex].id);
    }

    // Snappy transition lock
    const lockDuration = prefersReducedMotion ? 120 : 300;
    setTimeout(() => {
      setIsTransitioning(false);
      // Reset inner scroll of target to top
      const container = cardScrollContainersRef.current[targetIndex];
      if (container) {
        container.scrollTop = 0;
      }
    }, lockDuration);
  }, [activeSectionIndex, sections, onActiveSectionChange, prefersReducedMotion, setActiveSectionIndex]);

  const handleNext = useCallback(() => {
    if (activeSectionIndex < sections.length - 1) {
      goToSection(activeSectionIndex + 1);
    } else {
      goToSection(0);
    }
  }, [activeSectionIndex, sections.length, goToSection]);

  const handlePrev = useCallback(() => {
    if (activeSectionIndex > 0) {
      goToSection(activeSectionIndex - 1);
    }
  }, [activeSectionIndex, goToSection]);

  // Ultra-responsive Wheel and Trackpad Interceptor with Inner Scroll Awareness
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If modal or dropdown is open, don't hijack
      if (document.body.classList.contains('modal-open')) return;

      const currentContainer = cardScrollContainersRef.current[activeSectionIndex];
      const delta = e.deltaY;
      const now = Date.now();

      // Check if current card has internal scrollable overflow
      if (currentContainer) {
        const { scrollTop, scrollHeight, clientHeight } = currentContainer;
        const isScrollable = scrollHeight > clientHeight + 4;

        if (isScrollable) {
          const isAtTop = scrollTop <= 3;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

          // If scrolling down and not at bottom yet, let inner scroll handle it
          if (delta > 0 && !isAtBottom) {
            wheelDeltaAccumulatorRef.current = 0;
            return;
          }
          // If scrolling up and not at top yet, let inner scroll handle it
          if (delta < 0 && !isAtTop) {
            wheelDeltaAccumulatorRef.current = 0;
            return;
          }
        }
      }

      // Fast debounce
      if (now - lastWheelTimeRef.current < 280 || isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      wheelDeltaAccumulatorRef.current += delta;

      if (Math.abs(wheelDeltaAccumulatorRef.current) >= 18 || Math.abs(delta) >= 20) {
        e.preventDefault();
        lastWheelTimeRef.current = now;
        if (wheelDeltaAccumulatorRef.current > 0 || delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        wheelDeltaAccumulatorRef.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSectionIndex, handleNext, handlePrev]);

  // Touch Gesture Interceptor (Swipe Up / Down)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      const currentContainer = cardScrollContainersRef.current[activeSectionIndex];
      if (currentContainer) {
        const { scrollTop, scrollHeight, clientHeight } = currentContainer;
        const isScrollable = scrollHeight > clientHeight + 4;
        if (isScrollable) {
          const isAtTop = scrollTop <= 3;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
          if (deltaY > 0 && !isAtBottom) return;
          if (deltaY < 0 && !isAtTop) return;
        }
      }

      if (Math.abs(deltaY) > 35) {
        if (deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      touchStartYRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSectionIndex, handleNext, handlePrev]);

  // Keyboard Navigation (ArrowUp/Down, PageUp/PageDown, J/K, numbers 1-8)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'j') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'k') {
        e.preventDefault();
        handlePrev();
      } else if (e.key >= '1' && e.key <= String(sections.length)) {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx >= 0 && targetIdx < sections.length) {
          e.preventDefault();
          goToSection(targetIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sections.length, handleNext, handlePrev, goToSection]);

  const currentSection = sections[activeSectionIndex] || sections[0];
  const progressPercent = ((activeSectionIndex + 1) / sections.length) * 100;

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">
      
      {/* Top Global Stacking Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>

      {/* Floating Section Counter Badge (Top Right / Header Level) */}
      <div className="fixed top-5 right-20 sm:right-36 z-40 hidden sm:flex items-center gap-2">
        <div className={`px-3 py-1 rounded-full border text-xs font-mono backdrop-blur-xl shadow-lg transition-all ${
          isDark 
            ? 'bg-[#0a0e14]/85 border-slate-800 text-slate-300' 
            : 'bg-white/90 border-slate-200 text-slate-700'
        }`}>
          <span className="text-blue-500 font-bold">{currentSection.number}</span>
          <span className="text-slate-500 mx-1">/</span>
          <span>0{sections.length}</span>
        </div>
      </div>

      {/* The Stacked Card Deck Viewport - Hardware Accelerated, GPU Optimized */}
      <div className="relative w-full h-full">
        {sections.map((section, idx) => {
          const isBefore = idx < activeSectionIndex;
          const isCurrent = idx === activeSectionIndex;
          const isAfter = idx > activeSectionIndex;

          // Only render visible and adjacent cards in the active render tree for max FPS
          const isNear = Math.abs(idx - activeSectionIndex) <= 1;

          // Pure GPU transforms (translateY + scale + opacity), zero filter/blur for 60/120fps
          const depthOffset = activeSectionIndex - idx;
          const scaleValue = isCurrent ? 1 : isBefore ? Math.max(0.95, 1 - depthOffset * 0.03) : 1;
          const opacityValue = isCurrent ? 1 : isBefore ? Math.max(0.4, 1 - depthOffset * 0.3) : 1;
          const translateYValue = isCurrent ? '0%' : isBefore ? `-${depthOffset * 2}%` : '100%';

          return (
            <motion.div
              key={section.id}
              id={section.id}
              ref={(el) => {
                cardScrollContainersRef.current[idx] = el;
              }}
              aria-hidden={!isCurrent}
              initial={false}
              animate={{
                y: translateYValue,
                scale: scaleValue,
                opacity: opacityValue,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.15 : 0.30,
                ease: [0.25, 1, 0.5, 1], // Smooth snappy cubic-bezier curve
              }}
              style={{
                zIndex: idx * 10,
                transformOrigin: 'center top',
                willChange: 'transform, opacity',
                visibility: isNear || isCurrent ? 'visible' : 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
              className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden ${
                isCurrent ? 'pointer-events-auto' : 'pointer-events-none'
              } ${isDark ? 'bg-[#0a0e14]' : 'bg-[#fcfdfd]'}`}
            >
              {/* Inner Section Content */}
              <div className="min-h-full w-full flex flex-col justify-start">
                {section.component}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Vertical Navigation Dots HUD (Right Side) */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2.5">
        
        {/* Floating Mini-Map Dots with Tooltip */}
        <div className={`p-2 rounded-2xl border backdrop-blur-xl flex flex-col gap-2 shadow-2xl transition-all ${
          isDark 
            ? 'bg-[#0a0e14]/85 border-slate-800/90 shadow-black/50' 
            : 'bg-white/90 border-slate-200/90 shadow-slate-300/40'
        }`}>
          {sections.map((sec, idx) => {
            const isActive = activeSectionIndex === idx;

            return (
              <button
                key={sec.id}
                onClick={() => goToSection(idx)}
                className="group relative flex items-center justify-center p-1.5 rounded-xl transition-all cursor-pointer"
                title={`${sec.number} - ${sec.name}`}
              >
                {/* Active Glowing Dot / Line Indicator */}
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'w-6 h-2 bg-gradient-to-r from-blue-500 to-violet-500 shadow-md shadow-blue-500/50' 
                      : isDark ? 'w-2 h-2 bg-slate-700 hover:bg-slate-400 group-hover:scale-125' : 'w-2 h-2 bg-slate-300 hover:bg-slate-500 group-hover:scale-125'
                  }`}
                />

                {/* Floating Tooltip Tag on Hover */}
                <div className={`absolute right-9 px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 border shadow-lg ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <span className="text-blue-500 font-bold mr-1.5">{sec.number}</span>
                  <span>{sec.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Up / Down Navigation Buttons */}
        <div className={`p-1.5 rounded-xl border backdrop-blur-xl flex flex-col gap-1 shadow-lg ${
          isDark ? 'bg-[#0a0e14]/85 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}>
          <button
            onClick={handlePrev}
            disabled={activeSectionIndex === 0}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              activeSectionIndex === 0 
                ? 'opacity-30 cursor-not-allowed' 
                : isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Previous Section (Key: ↑ or K)"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Next Section (Key: ↓ or J)"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Center Controller */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[94vw] sm:max-w-none">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all ${
            isDark 
              ? 'bg-[#0e1420]/95 border-slate-800/90 shadow-black/60 text-slate-100' 
              : 'bg-white/95 border-slate-200/90 shadow-slate-300/60 text-slate-900'
          }`}
        >
          {/* Active Section Info + Navigator Menu Trigger */}
          <button
            onClick={() => setShowQuickNav(!showQuickNav)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50' 
                : 'bg-slate-100 border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="p-1 rounded-lg bg-blue-500/10 text-blue-500">
              {currentSection.icon}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
                {currentSection.number} // {currentSection.shortName}
              </div>
              <div className="font-semibold truncate max-w-[130px] text-[11px]">
                {currentSection.name}
              </div>
            </div>
            <div className="text-left sm:hidden font-semibold">
              {currentSection.number} {currentSection.shortName}
            </div>
            <Compass className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showQuickNav ? 'rotate-180' : ''}`} />
          </button>

          {/* Gliding Next Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <span>{activeSectionIndex === sections.length - 1 ? 'Top (01)' : `Next (${sections[(activeSectionIndex + 1) % sections.length].number})`}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Quick Jump Grid Drawer */}
      <AnimatePresence>
        {showQuickNav && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md rounded-2xl border p-3.5 backdrop-blur-2xl shadow-2xl ${
              isDark ? 'bg-[#0e1420]/95 border-slate-800 shadow-black/80' : 'bg-white/95 border-slate-200 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/40 px-2">
              <span className="text-[11px] font-mono font-bold text-blue-500 uppercase tracking-wider">
                Stacked Section Navigator
              </span>
              <span className="text-[10px] font-mono text-slate-400">Keys: 1 - 8</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    goToSection(idx);
                    setShowQuickNav(false);
                  }}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-mono text-left transition-all cursor-pointer ${
                    activeSectionIndex === idx
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : isDark 
                        ? 'hover:bg-slate-800/80 text-slate-300' 
                        : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-bold">{sec.number}</span>
                  <span className="truncate">{sec.shortName}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
