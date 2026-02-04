import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Play, Search, CalendarX, AlertCircle, CheckCircle,
  Mail, Loader2, Paperclip, Settings2, Bot
} from 'lucide-react';

const promptText = 'Please schedule an urgent meeting with Sarah K., James R., and VP David in the next 48 hours.';

const demoSteps = [
  { id: 'searching', label: 'Scanning calendars via Outlook Graph API...', icon: Search, duration: 1800 },
  { id: 'internal', label: 'Checking internal availability (Sarah, James)...', icon: Loader2, duration: 1400 },
  { id: 'external', label: 'Checking external availability (VP David)...', icon: Loader2, duration: 1400 },
  { id: 'conflict', label: 'No common slot found in the next 48 hours.', icon: CalendarX, duration: 1800 },
  { id: 'escalating', label: 'Activating escalation protocol...', icon: AlertCircle, duration: 1200 },
  { id: 'drafting', label: 'Drafting urgent request email to blocker...', icon: Mail, duration: 1500 },
  { id: 'success', label: 'Escalation email generated and ready to send.', icon: CheckCircle, duration: 0 },
];

export default function PromptSlide() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [demoActive, setDemoActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showEmail, setShowEmail] = useState(false);
  const demoRunning = useRef(false);

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
    }, 30);
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
    await new Promise(r => setTimeout(r, 400));
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
    <div className="flex items-center justify-center h-full px-8">
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Prompt-to-Action</h2>
          <p className="text-lg text-gray-500">One sentence. That's all it takes.</p>
        </motion.div>

        {/* AI Chat Interface — inspired by the screenshot */}
        <motion.div
          className="rounded-xl bg-[#111827] border border-gray-700/50 overflow-hidden mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-gray-800/60 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div>
              <span className="text-[12px] font-semibold text-gray-300">QUINN</span>
              <span className="text-[10px] text-gray-600 ml-2">Scheduling Assistant</span>
            </div>
          </div>

          {/* Chat area */}
          <div className="p-4 min-h-[60px]">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[9px] text-gray-400 font-medium shrink-0 mt-0.5">
                V
              </div>
              <div className="bg-gray-800/60 rounded-xl rounded-tl-none px-4 py-2.5 max-w-lg">
                <p className="text-[13px] text-gray-200 leading-relaxed">
                  {typedText}
                  {isTyping && <span className="cursor-blink text-teal-400 ml-0.5">|</span>}
                </p>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="px-4 pb-4">
            <div className="border border-gray-700/50 rounded-xl px-4 py-3 flex items-center gap-3 bg-[#0b0f19]">
              <span className="text-[13px] text-gray-600 flex-1">Message QUINN...</span>
              <Paperclip className="w-4 h-4 text-gray-600" />
              <Settings2 className="w-4 h-4 text-gray-600" />
              <button
                className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition"
                disabled={isTyping}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Live Demo button */}
        <motion.div
          className="flex justify-center mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTyping ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {!demoActive ? (
            <button
              onClick={runDemo}
              className="flex items-center gap-2 px-5 py-2 bg-teal-500 hover:bg-teal-400 text-gray-900 font-semibold text-sm rounded-lg transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              Live Demo
            </button>
          ) : (
            <button
              onClick={resetDemo}
              className="flex items-center gap-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
              Reset
            </button>
          )}
        </motion.div>

        {/* Demo steps */}
        <AnimatePresence>
          {demoActive && (
            <motion.div
              className="rounded-xl bg-[#111827] border border-gray-700/50 p-4 space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {demoSteps.map((step, i) => {
                const isActive = i === currentStep;
                const isDone = i < currentStep;
                const isPending = i > currentStep;

                return (
                  <motion.div
                    key={step.id}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-lg text-[12px] ${isActive ? 'bg-gray-800/50' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isPending ? 0.25 : 1 }}
                  >
                    <div className={`shrink-0 ${
                      step.id === 'conflict' && !isPending ? 'text-red-400' :
                      step.id === 'success' && !isPending ? 'text-teal-400' :
                      isDone ? 'text-teal-400' :
                      isActive ? 'text-blue-400' : 'text-gray-600'
                    }`}>
                      {isActive && step.id !== 'conflict' && step.id !== 'success' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : isDone ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <step.icon className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className={
                      step.id === 'conflict' && !isPending ? 'text-red-400' :
                      step.id === 'success' && !isPending ? 'text-teal-400' :
                      isPending ? 'text-gray-600' : 'text-gray-300'
                    }>
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
              className="mt-5 rounded-xl bg-white overflow-hidden shadow-xl shadow-black/30 border border-gray-300"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
            >
              <div className="bg-[#0078d4] px-4 py-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/80" />
                <span className="text-[11px] text-white/90 font-medium">Outlook — New Message (Auto-generated)</span>
              </div>
              <div className="px-4 py-3 border-b border-gray-200 text-[11px] space-y-1">
                <div><span className="text-gray-400 w-10 inline-block">From:</span> <span className="text-gray-700">QUINN &lt;quinn@company.com&gt;</span></div>
                <div><span className="text-gray-400 w-10 inline-block">To:</span> <span className="text-gray-700">Sarah K. &lt;sarah.k@company.com&gt;</span></div>
                <div><span className="text-gray-400 w-10 inline-block">Subject:</span> <span className="text-gray-900 font-semibold"><span className="text-red-600">[URGENT]</span> Meeting Request — Project Atlas</span></div>
              </div>
              <div className="px-4 py-3 text-[12px] text-gray-700 space-y-2">
                <p>Hi Sarah, an urgent meeting for <strong>Project Atlas</strong> is needed within 48h, but your calendar is the current blocker.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 space-y-1.5">
                  <p className="text-[10px] text-blue-600 font-semibold uppercase">Suggested Slots</p>
                  {['Tue, Jan 14 — 2:00 PM', 'Wed, Jan 15 — 10:00 AM', 'Wed, Jan 15 — 4:00 PM'].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-blue-700 text-[11px]">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{s}
                    </div>
                  ))}
                </div>
                <div className="text-center py-1">
                  <span className="inline-block px-4 py-2 bg-[#0078d4] text-white rounded-lg text-[11px] font-semibold">
                    Reorganize My Schedule
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
