import { motion } from 'framer-motion';
import {
  AlertTriangle, Search, CalendarX, Mail, RotateCcw,
  CheckCircle, ArrowDown, ArrowRight, Sparkles, Star
} from 'lucide-react';

const loopSteps = [
  {
    id: 1,
    icon: Search,
    label: 'Search for Available Slots',
    detail: 'Query all participants\' calendars',
  },
  {
    id: 2,
    icon: CalendarX,
    label: 'No Common Slot Found',
    detail: 'All windows are blocked',
  },
  {
    id: 3,
    icon: AlertTriangle,
    label: 'Identify the Blocker',
    detail: 'Determine who is blocking the meeting',
  },
  {
    id: 4,
    icon: Mail,
    label: 'Draft & Send Escalation Email',
    detail: 'Automated "Urgent Request" with suggested slots',
  },
  {
    id: 5,
    icon: RotateCcw,
    label: 'Monitor & Re-check',
    detail: 'Wait for response, then re-scan calendars',
  },
  {
    id: 6,
    icon: CheckCircle,
    label: 'Slot Unlocked — Book It',
    detail: 'Auto-send invites once a window opens',
  },
];

export default function EscalationSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Unique Selling Point</span>
            <Star className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Automatic <span className="text-amber-400">Escalation</span>
          </h2>
          <p className="text-lg text-slate-400">SyncFlow doesn't give up. It escalates intelligently.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Escalation loop */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loopSteps.map((step, i) => {
              const StepIcon = step.icon;
              const isSuccess = step.id === 6;
              const isEscalate = step.id === 4;

              return (
                <div key={step.id} className="flex flex-col items-start">
                  <motion.div
                    className={`flex items-center gap-4 w-full rounded-xl px-4 py-3 border ${
                      isSuccess
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : isEscalate
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-slate-800/50 border-slate-700/30'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSuccess ? 'bg-emerald-500/20' : isEscalate ? 'bg-amber-500/20' : 'bg-slate-700/50'
                    }`}>
                      <StepIcon className={`w-4 h-4 ${
                        isSuccess ? 'text-emerald-400' : isEscalate ? 'text-amber-400' : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <span className={`text-sm font-semibold ${
                        isSuccess ? 'text-emerald-400' : isEscalate ? 'text-amber-400' : 'text-white'
                      }`}>{step.label}</span>
                      <p className="text-xs text-slate-400">{step.detail}</p>
                    </div>
                    <span className="ml-auto text-xs text-slate-600 font-mono">{step.id}/6</span>
                  </motion.div>
                  {i < loopSteps.length - 1 && (
                    <div className="flex items-center pl-8 py-0.5">
                      <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                  )}
                </div>
              );
            })}
            {/* Loop back indicator */}
            <motion.div
              className="flex items-center gap-2 pl-4 pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] text-slate-500 italic">
                Loop repeats automatically until the meeting is booked
              </span>
            </motion.div>
          </motion.div>

          {/* Escalation email mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              Escalation Email Preview
            </div>

            {/* Email mockup — distinct from presentation UI */}
            <div className="bg-white rounded-xl shadow-2xl shadow-black/30 overflow-hidden border border-slate-200">
              {/* Outlook-style toolbar */}
              <div className="bg-[#0078d4] px-4 py-2 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <span className="text-xs text-white/80 font-medium">Outlook — New Message</span>
              </div>
              {/* Email fields */}
              <div className="border-b border-slate-200 px-4 py-2 space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 w-10">From:</span>
                  <span className="text-slate-700">SyncFlow AI &lt;syncflow@company.com&gt;</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 w-10">To:</span>
                  <span className="text-slate-700">Sarah K. &lt;sarah.k@company.com&gt;</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 w-10">Subject:</span>
                  <span className="text-slate-800 font-semibold">
                    <span className="text-red-600">[URGENT]</span> Meeting Request — Project Atlas Review
                  </span>
                </div>
              </div>
              {/* Email body */}
              <div className="px-4 py-4 text-slate-700 text-xs space-y-3 email-mockup max-h-64 overflow-y-auto">
                <p className="font-medium text-slate-900">Hi Sarah,</p>
                <p>
                  An urgent meeting for <strong>Project Atlas</strong> has been requested, but
                  your calendar is the current blocker. Could you free up one of these suggested windows?
                </p>

                {/* Suggested slots */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                  <p className="text-[10px] text-blue-600 font-semibold uppercase">Suggested Slots</p>
                  {['Tue, Jan 14 — 2:00 PM – 3:00 PM', 'Wed, Jan 15 — 10:00 AM – 11:00 AM', 'Wed, Jan 15 — 4:00 PM – 5:00 PM'].map((slot, i) => (
                    <div key={i} className="flex items-center gap-2 text-blue-700 text-xs">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {slot}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center py-2">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0078d4] text-white rounded-lg font-semibold text-xs cursor-default shadow">
                    <Sparkles className="w-3.5 h-3.5" />
                    Reorganize My Schedule
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center">
                  By clicking the button, SyncFlow will suggest calendar rearrangements to free up a slot for this meeting.
                </p>

                <div className="border-t border-slate-200 pt-3 mt-3">
                  <p className="text-[10px] text-slate-400">
                    This is an automated message from SyncFlow AI. Priority Level: <span className="text-red-500 font-medium">High</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Key differentiator callout */}
            <motion.div
              className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/20 rounded-xl p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Why this matters</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Traditional schedulers stop at "no availability found." SyncFlow actively
                    negotiates on your behalf — turning a dead-end into a resolved meeting.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
