import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight,
  LayoutDashboard, AlertTriangle, MessageSquare,
  Cpu, Mail, BarChart3
} from 'lucide-react';

import HeroSlide from './components/slides/HeroSlide';
import FrictionSlide from './components/slides/FrictionSlide';
import PromptSlide from './components/slides/PromptSlide';
import LogicSlide from './components/slides/LogicSlide';
import EscalationSlide from './components/slides/EscalationSlide';
import ImpactSlide from './components/slides/ImpactSlide';

const slides = [
  { id: 0, label: 'Hero', icon: LayoutDashboard, component: HeroSlide },
  { id: 1, label: 'Friction', icon: AlertTriangle, component: FrictionSlide },
  { id: 2, label: 'Prompt', icon: MessageSquare, component: PromptSlide },
  { id: 3, label: 'Logic', icon: Cpu, component: LogicSlide },
  { id: 4, label: 'Escalation', icon: Mail, component: EscalationSlide },
  { id: 5, label: 'Impact', icon: BarChart3, component: ImpactSlide },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 600 : -600, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -600 : 600, opacity: 0 }),
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((i) => {
    setDirection(i > currentSlide ? 1 : -1);
    setCurrentSlide(i);
  }, [currentSlide]);

  const goNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(s => s - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const Current = slides[currentSlide].component;

  return (
    <div className="h-full w-full bg-[#0b0f19] flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-2.5 border-b border-gray-800/40 shrink-0">
        <span className="text-sm font-bold text-white tracking-tight">
          QUINN
        </span>
        <span className="text-[11px] text-gray-600">
          {currentSlide + 1} / {slides.length}
        </span>
      </header>

      {/* Slide area */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            className="absolute inset-0 overflow-y-auto"
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom nav */}
      <nav className="shrink-0 border-t border-gray-800/40 bg-[#0b0f19]">
        <div className="flex items-center justify-between px-4 py-2 max-w-4xl mx-auto">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800/50 transition disabled:opacity-15 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-0.5">
            {slides.map((s) => {
              const Icon = s.icon;
              const isActive = s.id === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(s.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                      : 'text-gray-600 hover:text-gray-400 hover:bg-gray-800/40 border border-transparent'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={goNext}
            disabled={currentSlide === slides.length - 1}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800/50 transition disabled:opacity-15 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-gray-800/50">
          <motion.div
            className="h-full bg-teal-500"
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </nav>
    </div>
  );
}
