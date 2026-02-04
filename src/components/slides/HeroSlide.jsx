import { motion } from 'framer-motion';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

const calendarEvents = [
  { id: 1, label: 'Team Sync', time: '9:00', color: 'bg-red-500/60', col: 1, row: 1, messy: { x: -12, y: 8, rotate: -5 }, clean: { x: 0, y: 0, rotate: 0 } },
  { id: 2, label: 'Client Call', time: '10:30', color: 'bg-amber-500/60', col: 2, row: 1, messy: { x: 20, y: -10, rotate: 7 }, clean: { x: 0, y: 0, rotate: 0 } },
  { id: 3, label: '1:1 Review', time: '11:00', color: 'bg-orange-500/60', col: 1, row: 2, messy: { x: 15, y: 15, rotate: -8 }, clean: { x: 0, y: 0, rotate: 0 } },
  { id: 4, label: 'Sprint Plan', time: '13:00', color: 'bg-purple-500/60', col: 3, row: 1, messy: { x: -18, y: 5, rotate: 4 }, clean: { x: 0, y: 0, rotate: 0 } },
  { id: 5, label: 'Design Rev', time: '14:00', color: 'bg-pink-500/60', col: 2, row: 2, messy: { x: 10, y: -12, rotate: -6 }, clean: { x: 0, y: 0, rotate: 0 } },
  { id: 6, label: 'Exec Brief', time: '15:30', color: 'bg-blue-500/60', col: 3, row: 2, messy: { x: -8, y: 18, rotate: 9 }, clean: { x: 0, y: 0, rotate: 0 } },
  { id: 7, label: 'Urgent Mtg', time: '??:??', color: 'bg-red-600/80', col: 2, row: 3, messy: { x: 25, y: -20, rotate: 12 }, clean: { x: 0, y: 0, rotate: 0 } },
  { id: 8, label: 'Vendor Call', time: '16:00', color: 'bg-cyan-500/60', col: 1, row: 3, messy: { x: -15, y: 10, rotate: -10 }, clean: { x: 0, y: 0, rotate: 0 } },
];

export default function HeroSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-5xl w-full">
        {/* Title block */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="text-white">Sync</span>
              <span className="text-emerald-400">Flow</span>
              <span className="text-slate-400 ml-3 text-5xl md:text-6xl font-light">AI</span>
            </h1>
          </div>
          <motion.p
            className="text-2xl md:text-3xl text-slate-300 font-light mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Solving the <span className="text-emerald-400 font-medium italic">un-schedulable</span>.
          </motion.p>
        </motion.div>

        {/* Calendar transformation visual */}
        <motion.div
          className="flex items-center gap-6 md:gap-10 w-full justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Messy calendar */}
          <div className="relative">
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-4 w-64 md:w-72">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50">
                <Calendar className="w-4 h-4 text-red-400" />
                <span className="text-xs text-slate-400 font-medium">Before</span>
                <span className="ml-auto text-xs text-red-400 font-medium">Chaotic</span>
              </div>
              <div className="grid grid-cols-3 gap-2 min-h-[140px]">
                {calendarEvents.map((evt, i) => (
                  <motion.div
                    key={evt.id}
                    className={`${evt.color} rounded-lg px-2 py-1.5 text-[10px] font-medium border border-white/10 backdrop-blur`}
                    initial={evt.messy}
                    animate={evt.messy}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'mirror',
                      duration: 2 + i * 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="truncate">{evt.label}</div>
                    <div className="text-white/60">{evt.time}</div>
                  </motion.div>
                ))}
              </div>
              {/* Conflict indicators */}
              <div className="mt-2 flex gap-1">
                <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">3 conflicts</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">2 overlaps</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <ArrowRight className="w-6 h-6 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-medium">AI</span>
          </motion.div>

          {/* Clean calendar */}
          <div className="relative">
            <motion.div
              className="bg-slate-900/80 backdrop-blur border border-emerald-500/30 rounded-2xl p-4 w-64 md:w-72 pulse-glow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/20">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 font-medium">After</span>
                <span className="ml-auto text-xs text-emerald-400 font-medium">Optimized</span>
              </div>
              <div className="grid grid-cols-3 gap-2 min-h-[140px]">
                {calendarEvents.map((evt, i) => (
                  <motion.div
                    key={evt.id}
                    className={`${evt.id === 7 ? 'bg-emerald-500/60 ring-1 ring-emerald-400/50' : evt.color} rounded-lg px-2 py-1.5 text-[10px] font-medium border border-white/10`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                  >
                    <div className="truncate">{evt.label}</div>
                    <div className="text-white/60">{evt.id === 7 ? '14:30' : evt.time}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 flex gap-1">
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">0 conflicts</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">All resolved</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm text-slate-500 text-center max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          The intelligent Outlook scheduling assistant that finds time when there is none.
        </motion.p>
      </div>
    </div>
  );
}
