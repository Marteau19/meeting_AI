import { motion } from 'framer-motion';
import {
  Zap, TrendingDown, AlertTriangle, Clock,
  BarChart3, Users, ArrowRight, CheckCircle2
} from 'lucide-react';

const metrics = [
  {
    icon: Zap,
    label: 'Faster Decisions',
    value: '10x',
    detail: 'Meetings booked in minutes, not days',
    color: 'emerald',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20',
  },
  {
    icon: TrendingDown,
    label: 'Reduced Admin Load',
    value: '85%',
    detail: 'Less time spent on scheduling logistics',
    color: 'blue',
    accent: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
  },
  {
    icon: AlertTriangle,
    label: 'Prioritized Urgency',
    value: '100%',
    detail: 'Urgent meetings always get escalated and resolved',
    color: 'amber',
    accent: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
  },
];

const benefits = [
  { text: 'No more email ping-pong for scheduling', icon: CheckCircle2 },
  { text: 'Cross-organizational calendar intelligence', icon: CheckCircle2 },
  { text: 'Automatic escalation for urgent blockers', icon: CheckCircle2 },
  { text: 'Seamless integration with Microsoft Outlook', icon: CheckCircle2 },
  { text: 'AI-powered conflict resolution', icon: CheckCircle2 },
];

export default function ImpactSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            The <span className="text-emerald-400">Impact</span>
          </h2>
          <p className="text-lg text-slate-400">Measurable outcomes from day one</p>
        </motion.div>

        {/* Metric cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {metrics.map((metric, i) => {
            const MetricIcon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                className={`bg-gradient-to-b ${metric.accent} backdrop-blur border ${metric.borderColor} rounded-2xl p-6 text-center`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <div className={`${metric.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <MetricIcon className={`w-6 h-6 ${metric.textColor}`} />
                </div>
                <motion.div
                  className={`text-5xl font-extrabold ${metric.textColor} mb-2`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, type: 'spring' }}
                >
                  {metric.value}
                </motion.div>
                <h3 className="text-base font-semibold text-white mb-1">{metric.label}</h3>
                <p className="text-xs text-slate-400">{metric.detail}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits and CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Benefits list */}
          <motion.div
            className="bg-slate-900/60 backdrop-blur border border-slate-700/30 rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Key Benefits</h3>
            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <benefit.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-300">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Before / After comparison */}
          <motion.div
            className="bg-slate-900/60 backdrop-blur border border-slate-700/30 rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Before vs. After</h3>
            <div className="space-y-4">
              {/* Time to book */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-400">Time to Book a Meeting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-red-400">Before</span>
                      <span className="text-[10px] text-red-400">3.2 hrs</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <motion.div
                        className="bg-red-500/80 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-emerald-400">After</span>
                      <span className="text-[10px] text-emerald-400">4 min</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <motion.div
                        className="bg-emerald-500/80 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '8%' }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Emails sent */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-400">Emails Per Scheduling Task</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-red-400">Before</span>
                      <span className="text-[10px] text-red-400">12+ emails</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <motion.div
                        className="bg-red-500/80 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ delay: 1.6, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-emerald-400">After</span>
                      <span className="text-[10px] text-emerald-400">0–1 email</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <motion.div
                        className="bg-emerald-500/80 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '5%' }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Closing tagline */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-xl text-slate-300 font-light">
            Stop scheduling. Start <span className="text-emerald-400 font-semibold">SyncFlowing</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
