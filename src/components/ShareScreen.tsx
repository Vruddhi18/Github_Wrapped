'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Link, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface Props {
  data: any;
  username: string;
  className?: string;
}

export default function ShareScreen({ data, username, className }: Props) {
  const [exporting, setExporting] = useState(false);

  const exportImage = async () => {
    setExporting(true);
    try {
      const element = document.querySelector('#stats-screen') as HTMLElement;
      const canvas = await html2canvas(element!, {
        backgroundColor: '#0f0f23',
        scale: 2,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `github-wrapped-2025-${username}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch {
      alert('Export failed');
    }
    setExporting(false);
  };

  const shareUrl = `${window.location.origin}${window.location.pathname}?username=${username}`;

  return (
    <section className={`h-screen flex items-center justify-center p-8 snap-start ${className}`}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card max-w-2xl w-full mx-auto p-16 text-center"
      >
        <h2 className="text-5xl font-black mb-12 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Ready to Share?
        </h2>
        <p className="text-2xl opacity-90 mb-16 max-w-lg mx-auto leading-relaxed">
          Show the world your 2025 coding journey!
        </p>
        <div className="space-y-4 max-w-md mx-auto">
          <motion.button
            onClick={exportImage}
            disabled={exporting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 px-12 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all border border-emerald-500/50 flex items-center justify-center gap-3"
          >
            <Download className="w-8 h-8" />
            {exporting ? 'Exporting...' : 'Download Image'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert('Link copied!');
            }}
            className="w-full bg-white/10 backdrop-blur-xl hover:bg-white/20 px-12 py-8 rounded-3xl font-bold text-xl border border-white/30 hover:border-white/50 transition-all flex items-center justify-center gap-3"
          >
            <Link className="w-8 h-8" />
            Copy Share Link
          </motion.button>
        </div>
        <p className="mt-12 text-lg opacity-80 font-mono bg-white/10 px-4 py-2 rounded-xl">
          {window.location.origin}/{username}
        </p>
      </motion.div>
    </section>
  );
}
