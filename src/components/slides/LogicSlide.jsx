import { motion } from 'framer-motion';
import {
  MessageSquare, Search, Users, Globe, Cpu,
  ArrowDown, CalendarCheck, AlertTriangle, Shield
} from 'lucide-react';

const steps = [
  { id: 'input', label: 'Natural Language Prompt', detail: '"Schedule urgent meeting with XYZ in 48h"', icon: MessageSquare, color: 'teal' },
  { id: 'parse', label: 'Intent & Entity Extraction', detail: 'Participants, urgency level, time window', icon: Search, color: 'blue' },
  { id: 'internal', label: 'Internal Calendar Check', detail: 'Outlook Graph API — Free/Busy lookup', icon: Users, color: 'violet', badge: 'OAuth 2.0' },
  { id: 'external', label: 'External Availability', detail: 'Cross-org calendar federation', icon: Globe, color: 'cyan' },
  { id: 'engine', label: 'Slot Matching Engine', detail: 'Find overlapping free windows', icon: Cpu, color: 'amber', isBranch: true },
];

const colors = {
  teal:   { border: 'border-teal-500/30',   bg: 'bg-teal-500/8',   text: 'text-teal-400',   dot: 'bg-teal-400' },
  blue:   { border: 'border-blue-500/30',   bg: 'bg-blue-500/8',   text: 'text-blue-400',   dot: 'bg-blue-400' },
  violet: { border: 'border-violet-500/30', bg: 'bg-violet-500/8', text: 'text-violet-400', dot: 'bg-violet-400' },
  cyan:   { border: 'border-cyan-500/30',   bg: 'bg-cyan-500/8',   text: 'text-cyan-400',   dot: 'bg-cyan-400' },
  amber:  { border: 'border-amber-500/30',  bg: 'bg-amber-500/8',  text: 'text-amber-400',  dot: 'bg-amber-400' },
};

export default function LogicSlide() {
  return (
    <div className="flex items-center justify-center h-full px-8">
      <div className="max-w-3xl w-full">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            The <span className="text-teal-400">Brain</span>
          </h2>
          <p className="text-lg text-gray-500">How QUINN orchestrates scheduling in seconds</p>
        </motion.div>

        <div className="flex flex-col items-center gap-1.5">
          {steps.map((step, i) => {
            const c = colors[step.color];
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center w-full">
                <motion.div
                  className={`${c.bg} ${c.border} border rounded-xl px-5 py-3.5 w-full max-w-md flex items-center gap-4`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${c.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-[13px] font-semibold ${c.text}`}>{step.label}</h3>
                    <p className="text-[11px] text-gray-500">{step.detail}</p>
                  </div>
                  {step.badge && (
                    <div className="flex items-center gap-1 shrink-0">
                      <Shield className="w-3 h-3 text-violet-400" />
                      <span className="text-[9px] text-violet-400">{step.badge}</span>
                    </div>
                  )}
                </motion.div>

                {i < steps.length - 1 && (
                  <motion.div
                    className="py-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-gray-600" />
                  </motion.div>
                )}

                {/* Branch */}
                {step.isBranch && (
                  <motion.div
                    className="flex gap-4 mt-2 w-full max-w-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex-1 rounded-xl bg-teal-500/8 border border-teal-500/30 p-3 text-center">
                      <CalendarCheck className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                      <span className="text-[12px] font-semibold text-teal-400">Auto-Book</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">Slot found — send invites</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[10px] text-gray-600">or</span>
                    </div>
                    <div className="flex-1 rounded-xl bg-amber-500/8 border border-amber-500/30 p-3 text-center">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <span className="text-[12px] font-semibold text-amber-400">Escalate</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">No slot — contact blocker</p>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer badges */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {['Microsoft Graph API', 'OAuth 2.0', 'Real-time'].map((label, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
              <span className="text-[10px] text-gray-500">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
