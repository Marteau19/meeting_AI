import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ChevronLeft, ChevronRight,
  LayoutDashboard, AlertTriangle, MessageSquare,
  Brain, Mail, BarChart3
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
  { id: 3, label: 'Logic', icon: Brain, component: LogicSlide },
  { id: 4, label: 'Escalation', icon: Mail, component: EscalationSlide },
  { id: 5, label: 'Impact', icon: BarChart3, component: ImpactSlide },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -800 : 800,
    opacity: 0,
  }),
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const goNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const CurrentComponent = slides[currentSlide].component;

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800/50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm font-semibold text-white">
            Sync<span className="text-emerald-400">Flow</span>
            <span className="text-slate-500 ml-1.5 font-light">AI</span>
          </span>
        </div>
        <div className="text-xs text-slate-500">
          {currentSlide + 1} / {slides.length}
        </div>
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
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 overflow-y-auto"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <nav className="shrink-0 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2 max-w-5xl mx-auto">
          {/* Prev button */}
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Slide tabs */}
          <div className="flex items-center gap-1">
            {slides.map((slide) => {
              const SlideIcon = slide.icon;
              const isActive = slide.id === currentSlide;

              return (
                <button
                  key={slide.id}
                  onClick={() => goTo(slide.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <SlideIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{slide.label}</span>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={goNext}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-slate-800">
          <motion.div
            className="h-full bg-emerald-500"
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </nav>
    </div>
  );
}
