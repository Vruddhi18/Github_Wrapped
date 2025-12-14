'use client';
import { motion } from 'framer-motion';

interface Props {
  data: any;
  className?: string;
}

export default function PersonalityScreen({ data, className }: Props) {
  const archetypes = [
    { name: "Night Owl 🦉", desc: "42% commits after midnight", color: "from-purple-500/20 to-pink-500/20" },
    { name: "Weekend Warrior ⚔️", desc: "67% weekend commits", color: "from-orange-500/20 to-red-500/20" },
    { name: "Marathon Coder 🏃", desc: `${data.activeDays}/365 days`, color: "from-emerald-500/20 to-teal-500/20" },
  ];

  return (
    <section className={`glass-card p-12 ${className}`}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-black mb-16 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Your Developer Type
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {archetypes.map((archetype, i) => (
            <motion.div
              key={archetype.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl text-center hover:scale-105 transition-all ${archetype.color}`}
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <div className={`w-24 h-24 bg-gradient-to-r ${archetype.color.replace('/20', '')} rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl`}>
                <span className="text-3xl">{archetype.name.split(' ')[1]}</span>
              </div>
              <h3 className="text-2xl font-black mb-4">{archetype.name}</h3>
              <p className="opacity-90">{archetype.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
