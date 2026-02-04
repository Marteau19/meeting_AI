import { motion } from 'framer-motion';
import {
  Search, CalendarX, AlertTriangle, Mail, RotateCcw,
  CheckCircle, ArrowDown, Star
} from 'lucide-react';

const loopSteps = [
  { icon: Search, label: 'Search for slots', detail: "Query all participants' calendars" },
  { icon: CalendarX, label: 'No common slot', detail: 'All windows blocked' },
  { icon: AlertTriangle, label: 'Identify blocker', detail: 'Who is preventing the meeting?' },
  { icon: Mail, label: 'Send escalation email', detail: 'Auto-draft with suggested slots', highlight: true },
  { icon: RotateCcw, label: 'Monitor & re-check', detail: 'Wait for response, re-scan' },
  { icon: CheckCircle, label: 'Slot unlocked — book', detail: 'Auto-send calendar invites', success: true },
];

export default function EscalationSlide() {
  return (
    <div className="flex items-center justify-center h-full px-8">
      <div className="max-w-5xl w-full">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest">Unique Selling Point</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Automatic <span className="text-amber-400">Escalation</span>
          </h2>
          <p className="text-lg text-gray-500">QUINN doesn't give up. It escalates intelligently.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Escalation loop steps */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loopSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i}>
                  <motion.div
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 border ${
                      step.success ? 'bg-teal-500/8 border-teal-500/30' :
                      step.highlight ? 'bg-amber-500/8 border-amber-500/30' :
                      'bg-[#111827] border-gray-700/40'
                    }`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      step.success ? 'bg-teal-500/20' : step.highlight ? 'bg-amber-500/20' : 'bg-gray-800'
                    }`}>
                      <Icon className={`w-3.5 h-3.5 ${
                        step.success ? 'text-teal-400' : step.highlight ? 'text-amber-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[12px] font-semibold ${
                        step.success ? 'text-teal-400' : step.highlight ? 'text-amber-400' : 'text-gray-300'
                      }`}>{step.label}</span>
                      <p className="text-[10px] text-gray-500">{step.detail}</p>
                    </div>
                    <span className="text-[10px] text-gray-600 font-mono">{i + 1}/6</span>
                  </motion.div>
                  {i < loopSteps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="w-3 h-3 text-gray-700" />
                    </div>
                  )}
                </div>
              );
            })}

            <motion.div
              className="flex items-center gap-2 pl-3 pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <RotateCcw className="w-3 h-3 text-gray-600" />
              <span className="text-[10px] text-gray-600 italic">Loops automatically until meeting is booked</span>
            </motion.div>
          </motion.div>

          {/* Outlook email mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-3 flex items-center gap-2">
              <Mail className="w-3 h-3" /> Escalation Email Preview
            </p>

            <div className="bg-white rounded-xl overflow-hidden shadow-xl shadow-black/20 border border-gray-300">
              {/* Outlook toolbar */}
              <div className="bg-[#0078d4] px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="text-[11px] text-white/80 font-medium">Outlook — New Message</span>
              </div>

              {/* Email fields */}
              <div className="border-b border-gray-200 px-4 py-2.5 space-y-1 text-[11px]">
                <div className="flex gap-2">
                  <span className="text-gray-400 w-12">From:</span>
                  <span className="text-gray-700">QUINN &lt;quinn@company.com&gt;</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-12">To:</span>
                  <span className="text-gray-700">Sarah K. &lt;sarah.k@company.com&gt;</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-12">Subject:</span>
                  <span className="text-gray-900 font-semibold">
                    <span className="text-red-600">[URGENT]</span> Meeting Request — Project Atlas
                  </span>
                </div>
              </div>

              {/* Email body */}
              <div className="px-4 py-3 text-[12px] text-gray-700 space-y-2.5">
                <p>Hi Sarah,</p>
                <p>
                  An urgent meeting for <strong>Project Atlas</strong> has been requested
                  within the next 48 hours, but your calendar is currently blocking it.
                  Could you free up one of these windows?
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 space-y-1.5">
                  <p className="text-[10px] text-blue-600 font-semibold uppercase">Suggested Slots</p>
                  {['Tue, Jan 14 — 2:00 PM – 3:00 PM', 'Wed, Jan 15 — 10:00 AM – 11:00 AM', 'Wed, Jan 15 — 4:00 PM – 5:00 PM'].map((slot, i) => (
                    <div key={i} className="flex items-center gap-2 text-blue-700 text-[11px]">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {slot}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center py-1">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#0078d4] text-white rounded-lg text-[11px] font-semibold shadow-sm">
                    Reorganize My Schedule
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 text-center">
                  Clicking the button lets QUINN suggest calendar rearrangements to free a slot.
                </p>

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <p className="text-[9px] text-gray-400">
                    Automated message from QUINN. Priority: <span className="text-red-500 font-medium">High</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Callout */}
            <motion.div
              className="mt-4 rounded-xl bg-[#111827] border border-amber-500/20 p-4 flex items-start gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-semibold text-gray-300 mb-0.5">Why this matters</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Traditional schedulers stop at "no availability." QUINN actively
                  negotiates — turning a dead-end into a booked meeting.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
