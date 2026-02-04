import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Play, Search, CalendarX, AlertCircle, CheckCircle,
  Mail, Loader2, Sparkles
} from 'lucide-react';

const promptText = 'Please schedule an urgent meeting with Sarah K., James R., and VP David in the next 48 hours.';

const demoSteps = [
  { id: 'searching', label: 'Scanning calendars via Outlook Graph API...', icon: Search, duration: 2000 },
  { id: 'checking-internal', label: 'Checking internal availability (Sarah, James)...', icon: Loader2, duration: 1500 },
  { id: 'checking-external', label: 'Checking external availability (VP David)...', icon: Loader2, duration: 1500 },
  { id: 'conflict', label: 'No common slot found in the next 48 hours.', icon: CalendarX, duration: 2000 },
  { id: 'escalating', label: 'Activating Escalation Protocol...', icon: AlertCircle, duration: 1500 },
  { id: 'drafting', label: 'Drafting Urgent Request email to blocker...', icon: Mail, duration: 1800 },
  { id: 'success', label: 'Escalation email generated and ready to send!', icon: CheckCircle, duration: 0 },
];

export default function PromptSlide() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [demoActive, setDemoActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showEmail, setShowEmail] = useState(false);
  const demoRunning = useRef(false);

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < promptText.length) {
        setTypedText(promptText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [isTyping]);

  const runDemo = useCallback(async () => {
    if (demoRunning.current) return;
    demoRunning.current = true;
    setDemoActive(true);
    setShowEmail(false);
    setCurrentStep(-1);

    for (let i = 0; i < demoSteps.length; i++) {
      setCurrentStep(i);
      if (demoSteps[i].duration > 0) {
        await new Promise(r => setTimeout(r, demoSteps[i].duration));
      }
    }

    // Show escalation email after completion
    await new Promise(r => setTimeout(r, 500));
    setShowEmail(true);
    demoRunning.current = false;
  }, []);

  const resetDemo = useCallback(() => {
    demoRunning.current = false;
    setDemoActive(false);
    setCurrentStep(-1);
    setShowEmail(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Prompt-to-Action</h2>
          <p className="text-lg text-slate-400">One sentence. That's all it takes.</p>
        </motion.div>

        {/* Mock input UI */}
        <motion.div
          className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-400">SyncFlow AI Assistant</span>
          </div>
          <div className="bg-slate-800/80 rounded-xl border border-slate-600/30 p-4 flex items-start gap-3">
            <div className="flex-1 min-h-[48px]">
              <p className="text-base text-white leading-relaxed">
                {typedText}
                {isTyping && <span className="cursor-blink text-emerald-400 ml-0.5">|</span>}
              </p>
            </div>
            <button
              className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition shrink-0"
              disabled={isTyping}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Live Demo button */}
          <div className="flex justify-center mt-5">
            {!demoActive ? (
              <motion.button
                onClick={runDemo}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isTyping ? 0 : 1 }}
              >
                <Play className="w-4 h-4" />
                Live Demo
              </motion.button>
            ) : (
              <motion.button
                onClick={resetDemo}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Reset Demo
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Demo progress steps */}
        <AnimatePresence>
          {demoActive && (
            <motion.div
              className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-5 space-y-2"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {demoSteps.map((step, i) => {
                const StepIcon = step.icon;
                const isActive = i === currentStep;
                const isDone = i < currentStep;
                const isPending = i > currentStep;

                return (
                  <motion.div
                    key={step.id}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-slate-800/80' : ''
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isPending ? 0.3 : 1,
                      x: 0,
                    }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <div className={`shrink-0 ${
                      step.id === 'conflict' ? 'text-red-400' :
                      step.id === 'escalating' ? 'text-amber-400' :
                      step.id === 'success' ? 'text-emerald-400' :
                      isDone ? 'text-emerald-400' :
                      isActive ? 'text-blue-400' :
                      'text-slate-500'
                    }`}>
                      {isActive && step.id !== 'conflict' && step.id !== 'success' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isDone ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      step.id === 'conflict' && (isActive || isDone) ? 'text-red-400 font-medium' :
                      step.id === 'success' && (isActive || isDone) ? 'text-emerald-400 font-medium' :
                      isPending ? 'text-slate-600' :
                      'text-slate-300'
                    }`}>
                      {step.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Escalation email preview */}
        <AnimatePresence>
          {showEmail && (
            <motion.div
              className="mt-6 bg-white rounded-2xl shadow-2xl shadow-black/40 overflow-hidden border border-slate-300"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Email header */}
              <div className="bg-[#f3f6fc] px-5 py-3 border-b border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">SF</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">SyncFlow AI <span className="text-xs font-normal text-slate-500">on behalf of you</span></div>
                    <div className="text-xs text-slate-500">To: Sarah K. &lt;sarah.k@company.com&gt;</div>
                  </div>
                  <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-medium">URGENT</span>
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  Action Required: Urgent Meeting — Project Atlas Review
                </div>
              </div>
              {/* Email body */}
              <div className="px-5 py-4 text-slate-700 text-sm space-y-3">
                <p>Hi Sarah,</p>
                <p>
                  I'm reaching out because we need to schedule an <strong>urgent meeting</strong> for Project Atlas
                  within the next 48 hours, but your calendar currently shows no availability.
                </p>
                <p>Could one of these slots work if you were to reorganize your schedule?</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 text-xs font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Tue, Jan 14 — 2:00 PM – 3:00 PM
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 text-xs font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Wed, Jan 15 — 10:00 AM – 11:00 AM
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 text-xs font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Wed, Jan 15 — 4:00 PM – 5:00 PM
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm cursor-default shadow-md">
                    <Sparkles className="w-4 h-4" />
                    Reorganize My Schedule
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  Clicking the button will allow SyncFlow to suggest calendar rearrangements that free up a slot.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
