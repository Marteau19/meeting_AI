import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, Users } from 'lucide-react';

export default function HeroSlide() {
  return (
    <div className="flex items-center justify-center h-full px-8">
      <div className="max-w-4xl w-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight text-white">
            QUINN
          </h1>
          <div className="h-1 w-16 bg-teal-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-2xl md:text-3xl text-gray-400 font-light mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Solving the <span className="text-teal-400 font-normal">un-schedulable</span>.
        </motion.p>

        {/* Visual: calendar transformation */}
        <motion.div
          className="flex items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {/* Before: messy calendar */}
          <div className="w-56 md:w-64">
            <div className="border border-gray-700/60 rounded-xl bg-[#111827] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-700/40 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[11px] text-gray-500 font-medium">Outlook Calendar</span>
              </div>
              <div className="p-3 space-y-1.5">
                {['9:00  Team Sync', '9:30  Vendor Call', '10:00 Sprint Review'].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5 text-[11px] text-red-300"
                    animate={{ x: [0, (i % 2 === 0 ? 3 : -3), 0] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.3, ease: 'easeInOut' }}
                  >
                    {item}
                  </motion.div>
                ))}
                <div className="bg-red-500/20 border border-red-500/30 border-dashed rounded-lg px-3 py-2 text-[11px] text-red-400 text-center">
                  <span className="font-medium">???</span>
                  <span className="text-red-400/60 ml-1">No slot for urgent mtg</span>
                </div>
                {['11:00 Client Call', '14:00 1:1 Review'].map((item, i) => (
                  <div key={i} className="bg-gray-700/30 border border-gray-700/30 rounded-lg px-3 py-1.5 text-[11px] text-gray-500">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-gray-600 mt-2">Conflicts & no availability</p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="w-10 h-10 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </motion.div>
            <span className="text-[10px] text-teal-400 font-medium tracking-wide">QUINN</span>
          </div>

          {/* After: clean calendar */}
          <div className="w-56 md:w-64">
            <motion.div
              className="border border-teal-500/30 rounded-xl bg-[#111827] overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <div className="px-4 py-2.5 border-b border-teal-500/20 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px] text-gray-500 font-medium">Outlook Calendar</span>
                <span className="ml-auto text-[9px] text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded">Optimized</span>
              </div>
              <div className="p-3 space-y-1.5">
                {['9:00  Team Sync', '10:00 Sprint Review', '11:00 Client Call'].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-gray-700/20 border border-gray-700/30 rounded-lg px-3 py-1.5 text-[11px] text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    {item}
                  </motion.div>
                ))}
                <motion.div
                  className="bg-teal-500/15 border border-teal-500/30 rounded-lg px-3 py-2 text-[11px] text-teal-300 font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, type: 'spring' }}
                >
                  13:00 Urgent Meeting  <span className="text-teal-400">✓</span>
                </motion.div>
                <motion.div
                  className="bg-gray-700/20 border border-gray-700/30 rounded-lg px-3 py-1.5 text-[11px] text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  14:00 1:1 Review
                </motion.div>
              </div>
            </motion.div>
            <p className="text-[11px] text-gray-600 mt-2">Resolved & booked automatically</p>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm text-gray-600 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Your intelligent Outlook scheduling assistant.
        </motion.p>
      </div>
    </div>
  );
}
