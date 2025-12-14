'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  data: any;
  className?: string;
}

export default function SlidesScreen({ data, className }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "PEAK HOUR", stat: "2AM", subtitle: "42% commits", color: "from-purple-400 to-pink-400" },
    { title: "WEEKEND", stat: "67%", subtitle: "Weekend commits", color: "from-orange-400 to-red-400" },
    { title: "MARATHON", stat: `${data.activeDays}`, subtitle: "Active days", color: "from-emerald-400 to-teal-400" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`h-screen flex items-center justify-center p-8 snap-start ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2 
            className={`text-7xl md:text-9xl font-black uppercase tracking-tight mb-12 bg-gradient-to-r ${slides[currentSlide].color} bg-clip-text text-transparent`}
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.div className="text-[10rem] md:text-[14rem] font-black text-white/95 mb-12">
            {slides[currentSlide].stat}
          </motion.div>
          <p className="text-3xl opacity-90">{slides[currentSlide].subtitle}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
