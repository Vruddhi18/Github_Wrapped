'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Loader2 } from 'lucide-react';
import StatsScreen from '@/components/StatsScreen';
import SlidesScreen from '@/components/SlidesScreen';
import PersonalityScreen from '@/components/PersonalityScreen';
import ShareScreen from '@/components/ShareScreen';

export default function Home() {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = ['hero', 'input', 'stats', 'slides', 'personality', 'share'];

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const stepHeight = window.innerHeight;
      setStep(Math.floor(scroll / stepHeight));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchGithubData = async (username: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/github?username=${username}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (username.trim()) {
      fetchGithubData(username.trim());
    }
  };

  return (
    <main className="min-h-[600vh] bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-x-hidden snap-y snap-mandatory">
      {/* Progress Dots */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === step ? 'bg-white scale-150' : 'bg-white/30'}`}
            animate={{ scale: i === step ? 1.5 : 1 }}
          />
        ))}
      </div>

      {/* 1. Hero */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 snap-start">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-2xl">
            <Github className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-8 leading-tight">
            GitHub Wrapped
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto">
            Your real 2025 coding journey, Spotify style ✨
          </p>
        </motion.div>
      </section>

      {/* 2. Input */}
      <section className="h-screen flex items-center justify-center px-4 snap-start">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card max-w-2xl w-full mx-auto p-12"
        >
          <h3 className="text-4xl md:text-5xl font-black mb-12 text-center bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Enter GitHub username
          </h3>
          <div className="flex flex-col lg:flex-row gap-6">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="torvalds, octocat, your-username..."
              className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 text-2xl font-semibold text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300 hover:border-white/40"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              disabled={!username || loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed px-16 py-6 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-500/50 flex items-center gap-2 whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Generate'}
            </button>
          </div>
          {error && <p className="mt-6 text-red-400 text-center font-medium text-lg">{error}</p>}
        </motion.div>
      </section>

      {/* Dynamic Content */}
      {data && (
        <>
          <StatsScreen data={data} className="h-screen snap-start" />
          <SlidesScreen data={data} className="h-screen snap-start" />
          <PersonalityScreen data={data} className="h-screen snap-start" />
          <ShareScreen data={data} username={username} className="h-screen snap-start" />
        </>
      )}
    </main>
  );
}
