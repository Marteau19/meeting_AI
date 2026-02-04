import { motion } from 'framer-motion';
import { Mail, Clock, AlertTriangle, X, MessageSquare, Eye, EyeOff } from 'lucide-react';

const emails = [
  { from: 'Sarah K.', subject: 'Re: Re: Re: Meeting Time?', time: '2 min ago', preview: "Tuesday doesn't work for me either. What about Thursday?" },
  { from: 'James R.', subject: 'Re: Re: Re: Re: Meeting Time?', time: '18 min ago', preview: "I'm OOO Thursday. Can we try next week?" },
  { from: 'You', subject: 'Re: Re: Re: Re: Re: Meeting Time?', time: '45 min ago', preview: "How about Monday at 2pm? I'll also check with David..." },
  { from: 'David L.', subject: 'Re: Availability Check', time: '1 hr ago', preview: "Sorry, I have a conflicting call. Let me check my calendar..." },
];

const hiddenBlockers = [
  { person: 'Sarah K.', reason: 'Private calendar — shows "Busy"', icon: EyeOff },
  { person: 'James R.', reason: 'OOO not visible to organizer', icon: EyeOff },
  { person: 'External VP', reason: 'No org-level calendar access', icon: X },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function FrictionSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">The Friction</h2>
          </div>
          <p className="text-lg text-slate-400">
            Every urgent meeting triggers the same painful cycle
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email chain mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700/50 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Inbox</span>
                <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">47 unread</span>
              </div>
              <motion.div
                className="divide-y divide-slate-800/50"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {emails.map((email, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="px-4 py-3 hover:bg-slate-800/30 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{email.from}</span>
                      <span className="ml-auto text-[10px] text-slate-500">{email.time}</span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium mb-0.5">{email.subject}</div>
                    <div className="text-xs text-slate-500 truncate">{email.preview}</div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="px-4 py-3 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-red-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>12 emails exchanged over 3 days — still no meeting booked</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hidden unavailability */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Time wasted counter */}
            <div className="bg-slate-900/80 backdrop-blur border border-red-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Clock className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Time Wasted</h3>
                  <p className="text-xs text-slate-400">Per scheduling attempt</p>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <motion.span
                  className="text-5xl font-bold text-red-400"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                >
                  3.2
                </motion.span>
                <span className="text-lg text-slate-400 mb-1">hrs avg.</span>
              </div>
              <div className="mt-3 w-full bg-slate-800 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">78% of admin time spent on scheduling logistics</p>
            </div>

            {/* Hidden blockers */}
            <div className="bg-slate-900/80 backdrop-blur border border-amber-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Hidden Unavailability</h3>
              </div>
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {hiddenBlockers.map((blocker, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-3 py-2"
                  >
                    <blocker.icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-white">{blocker.person}</span>
                      <p className="text-[10px] text-slate-400">{blocker.reason}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
