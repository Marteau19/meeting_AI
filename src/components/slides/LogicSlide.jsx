import { motion } from 'framer-motion';
import {
  MessageSquare, Search, Users, Globe, CalendarCheck,
  ArrowDown, ArrowRight, Database, Shield, AlertTriangle, CheckCircle
} from 'lucide-react';

const flowSteps = [
  {
    id: 'input',
    label: 'Natural Language Prompt',
    detail: '"Schedule urgent meeting with XYZ in 48h"',
    icon: MessageSquare,
    color: 'emerald',
  },
  {
    id: 'parse',
    label: 'Intent & Entity Extraction',
    detail: 'Participants, urgency, time window',
    icon: Search,
    color: 'blue',
  },
  {
    id: 'internal',
    label: 'Internal Calendar Check',
    detail: 'Outlook Graph API — Free/Busy lookup',
    icon: Users,
    color: 'violet',
  },
  {
    id: 'external',
    label: 'External Availability',
    detail: 'Cross-org calendar federation',
    icon: Globe,
    color: 'cyan',
  },
  {
    id: 'decision',
    label: 'Slot Matching Engine',
    detail: 'Find overlapping free windows',
    icon: Database,
    color: 'amber',
    isBranch: true,
  },
];

const colorMap = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', iconBg: 'bg-blue-500/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', iconBg: 'bg-violet-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', iconBg: 'bg-cyan-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', iconBg: 'bg-amber-500/20' },
};

export default function LogicSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            The <span className="text-emerald-400">"Brain"</span>
          </h2>
          <p className="text-lg text-slate-400">How SyncFlow orchestrates scheduling in seconds</p>
        </motion.div>

        {/* Flow diagram */}
        <div className="flex flex-col items-center gap-2">
          {flowSteps.map((step, i) => {
            const colors = colorMap[step.color];
            const StepIcon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center w-full">
                <motion.div
                  className={`${colors.bg} ${colors.border} border rounded-xl px-6 py-4 w-full max-w-lg flex items-center gap-4`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                >
                  <div className={`${colors.iconBg} p-2.5 rounded-lg shrink-0`}>
                    <StepIcon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold ${colors.text}`}>{step.label}</h3>
                    <p className="text-xs text-slate-400">{step.detail}</p>
                  </div>
                  {step.id === 'internal' && (
                    <div className="ml-auto flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-[10px] text-violet-400">OAuth 2.0</span>
                    </div>
                  )}
                </motion.div>

                {/* Connector arrow */}
                {i < flowSteps.length - 1 && (
                  <motion.div
                    className="py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </motion.div>
                )}

                {/* Branch at decision */}
                {step.isBranch && (
                  <motion.div
                    className="flex items-start gap-6 mt-2 w-full max-w-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {/* Success branch */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-2">
                        <ArrowDown className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] text-emerald-400 font-medium">SLOT FOUND</span>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 w-full text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <CalendarCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm font-semibold text-emerald-400">Auto-Book</span>
                        </div>
                        <p className="text-[11px] text-slate-400">Send calendar invites to all participants</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex flex-col items-center pt-4">
                      <span className="text-[10px] text-slate-600 font-medium">OR</span>
                    </div>

                    {/* Escalation branch */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-2">
                        <ArrowDown className="w-3 h-3 text-amber-500" />
                        <span className="text-[10px] text-amber-400 font-medium">NO SLOT</span>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 w-full text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span className="text-sm font-semibold text-amber-400">Escalate</span>
                        </div>
                        <p className="text-[11px] text-slate-400">Draft urgent request to the blocker</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* API badge */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-700/30 rounded-full px-5 py-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400">Microsoft Graph API</span>
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs text-slate-400">OAuth 2.0 Secured</span>
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs text-slate-400">Real-time Processing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
