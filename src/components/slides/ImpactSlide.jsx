import { motion } from 'framer-motion';
import { Zap, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

const metrics = [
  { icon: Zap, label: 'Faster Decisions', value: '10x', detail: 'Meetings booked in minutes, not days', color: 'teal' },
  { icon: TrendingDown, label: 'Reduced Admin Load', value: '85%', detail: 'Less time on scheduling logistics', color: 'blue' },
  { icon: AlertTriangle, label: 'Prioritized Urgency', value: '100%', detail: 'Urgent meetings always get escalated', color: 'amber' },
];

const benefits = [
  'No more email ping-pong for scheduling',
  'Cross-organizational calendar intelligence',
  'Automatic escalation for urgent blockers',
  'Seamless Microsoft Outlook integration',
];

export default function ImpactSlide() {
  return (
    <div className="flex items-center justify-center h-full px-8">
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            The <span className="text-teal-400">Impact</span>
          </h2>
          <p className="text-lg text-gray-500">Measurable outcomes from day one</p>
        </motion.div>

        {/* Metric cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            const colorMap = {
              teal: { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/25' },
              blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
              amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25' },
            };
            const c = colorMap[m.color];

            return (
              <motion.div
                key={m.label}
                className={`rounded-xl ${c.bg} border ${c.border} p-6 text-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
              >
                <Icon className={`w-5 h-5 ${c.text} mx-auto mb-3`} />
                <motion.div
                  className={`text-4xl font-extrabold ${c.text} mb-1`}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, type: 'spring' }}
                >
                  {m.value}
                </motion.div>
                <h3 className="text-[13px] font-semibold text-gray-300 mb-1">{m.label}</h3>
                <p className="text-[11px] text-gray-500">{m.detail}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Before/After + Benefits */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before/After */}
          <motion.div
            className="rounded-xl bg-[#111827] border border-gray-700/50 p-5"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Before vs. After</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] text-gray-400 mb-1.5">Time to book a meeting</p>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-red-400">Before</span><span className="text-red-400">3.2 hrs</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <motion.div className="bg-red-500/70 h-1.5 rounded-full" initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ delay: 1, duration: 0.7 }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-teal-400">After</span><span className="text-teal-400">4 min</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <motion.div className="bg-teal-500/70 h-1.5 rounded-full" initial={{ width: 0 }} animate={{ width: '8%' }} transition={{ delay: 1.2, duration: 0.7 }} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 mb-1.5">Emails per scheduling task</p>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-red-400">Before</span><span className="text-red-400">12+ emails</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <motion.div className="bg-red-500/70 h-1.5 rounded-full" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ delay: 1.4, duration: 0.7 }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-teal-400">After</span><span className="text-teal-400">0-1 email</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <motion.div className="bg-teal-500/70 h-1.5 rounded-full" initial={{ width: 0 }} animate={{ width: '5%' }} transition={{ delay: 1.6, duration: 0.7 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="rounded-xl bg-[#111827] border border-gray-700/50 p-5"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Key Benefits</h3>
            <div className="space-y-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="text-[12px] text-gray-300">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Closing */}
        <motion.p
          className="text-center text-xl text-gray-400 font-light mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Stop scheduling. Start <span className="text-teal-400 font-semibold">QUINNing</span>.
        </motion.p>
      </div>
    </div>
  );
}
