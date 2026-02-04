import { motion } from 'framer-motion';
import { Mail, Clock, EyeOff, ChevronDown } from 'lucide-react';

const emails = [
  { from: 'Sarah K.', subject: 'Re: Re: Re: Meeting Time?', time: '2 min', preview: "Tuesday doesn't work either. Thursday?" },
  { from: 'James R.', subject: 'Re: Re: Re: Re: Meeting Time?', time: '18 min', preview: "I'm OOO Thursday. Next week?" },
  { from: 'You', subject: 'Re: Re: Re: Re: Re: Meeting Time?', time: '45 min', preview: "Monday at 2pm? Let me also check with David..." },
  { from: 'David L.', subject: 'Re: Availability Check', time: '1 hr', preview: "Sorry, conflicting call. Let me check..." },
];

export default function FrictionSlide() {
  return (
    <div className="flex items-center justify-center h-full px-8">
      <div className="max-w-5xl w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">The Friction</h2>
          <p className="text-lg text-gray-500">Manual scheduling is broken. Here's what it actually looks like.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Outlook inbox mockup — 3 cols */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="rounded-xl bg-[#111827] border border-gray-700/50 overflow-hidden">
              {/* Outlook-style header bar */}
              <div className="bg-[#0f3460] px-4 py-2 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <Mail className="w-3.5 h-3.5 text-white/60" />
                <span className="text-[11px] text-white/70 font-medium">Outlook — Inbox</span>
                <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-medium">47</span>
              </div>

              {/* Email list */}
              <div className="divide-y divide-gray-800/50">
                {emails.map((email, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[9px] text-gray-400 font-medium shrink-0">
                        {email.from[0]}
                      </div>
                      <span className="text-[12px] font-semibold text-gray-300">{email.from}</span>
                      <span className="ml-auto text-[10px] text-gray-600">{email.time}</span>
                    </div>
                    <div className="pl-8">
                      <div className="text-[11px] text-gray-400 font-medium truncate">{email.subject}</div>
                      <div className="text-[10px] text-gray-600 truncate">{email.preview}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-gray-800/50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[10px] text-red-400">12 emails over 3 days — no meeting booked</span>
              </div>
            </div>
          </motion.div>

          {/* Stats — 2 cols */}
          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Time wasted */}
            <div className="rounded-xl bg-[#111827] border border-gray-700/50 p-5">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-[12px] text-gray-400 font-medium">Time wasted per attempt</span>
              </div>
              <motion.div
                className="text-4xl font-bold text-red-400 mb-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                3.2 hrs
              </motion.div>
              <p className="text-[11px] text-gray-600">average scheduling overhead</p>
              <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
                <motion.div
                  className="bg-red-500/80 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </div>
            </div>

            {/* Hidden blockers */}
            <div className="rounded-xl bg-[#111827] border border-gray-700/50 p-5">
              <div className="flex items-center gap-3 mb-4">
                <EyeOff className="w-4 h-4 text-amber-400" />
                <span className="text-[12px] text-gray-400 font-medium">Hidden unavailability</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { person: 'Sarah K.', reason: 'Private — shows "Busy"' },
                  { person: 'James R.', reason: 'OOO not visible to you' },
                  { person: 'External VP', reason: 'No cross-org calendar access' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                    <div>
                      <span className="text-[11px] text-gray-300">{item.person}</span>
                      <span className="text-[10px] text-gray-600 ml-1.5">— {item.reason}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
