'use client';
import { motion } from 'framer-motion';
import { TrendingUp, GitPullRequest, Calendar, BarChart3 } from 'lucide-react';

interface Props {
  data: any;
  className?: string;
}

export default function StatsScreen({ data, className }: Props) {
  return (
    <section className={`glass-card p-12 ${className}`}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-12">
        {/* Profile */}
        <div className="flex items-center gap-8 mb-12">
          <img src={data.avatarUrl} alt={data.name} className="w-28 h-28 rounded-full border-4 border-white/30 shadow-2xl" />
          <div>
            <h2 className="text-5xl font-black mb-2">{data.name}</h2>
            <p className="text-2xl opacity-80">@{data.login}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div className="glass-card p-8 text-center rounded-3xl hover:scale-105" whileHover={{ scale: 1.02 }}>
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <div className="text-4xl font-black">{data.commits.toLocaleString()}</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Commits</div>
          </motion.div>
          <motion.div className="glass-card p-8 text-center rounded-3xl hover:scale-105" whileHover={{ scale: 1.02 }}>
            <GitPullRequest className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
            <div className="text-4xl font-black">{data.prs}</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">PRs</div>
          </motion.div>
          <motion.div className="glass-card p-8 text-center rounded-3xl hover:scale-105" whileHover={{ scale: 1.02 }}>
            <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-400" />
            <div className="text-4xl font-black">{data.activeDays}</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Active Days</div>
          </motion.div>
          <motion.div className="glass-card p-8 text-center rounded-3xl hover:scale-105" whileHover={{ scale: 1.02 }}>
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <div className="text-4xl font-black">Top 8%</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Consistency</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
