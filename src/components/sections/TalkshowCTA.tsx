'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function TalkshowCTA() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const ySpeaker = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px] top-1/2 left-0 -translate-y-1/2" />
        <div className="absolute w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] top-1/2 right-0 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center justify-center">
        
        {/* Left Content: Title & CTA */}
        <div className="lg:col-span-6 relative z-30 flex flex-col items-start w-full order-2 lg:order-1">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neon-blue/40 bg-neon-blue/10 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(29,188,211,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue shadow-[0_0_8px_rgba(29,188,211,0.8)]"></span>
            </span>
            <span className="text-neon-blue font-raela font-black text-[11px] md:text-xs tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(29,188,211,0.5)]">
              I/O FESTIVAL TALKSHOW
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-raela font-black leading-[1.1] uppercase mb-4 tracking-tighter w-full whitespace-nowrap"
          >
            Ideas that Matter: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange drop-shadow-sm">Impactful Solution</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-xl text-white/60 max-w-sm md:max-w-lg font-light mb-8 leading-relaxed"
          >
            Ubah cara pandangmu terhadap teknologi. Saatnya dengar langsung dari mereka yang membangun solusinya
          </motion.p>

          {/* Elegant Vertical Info Group */}
          <div className="mb-10 flex flex-col gap-4 relative z-20 w-full max-w-sm">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }} className="flex items-center gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-neon-blue/10 group-hover:border-neon-blue/50 transition-all duration-300 shrink-0">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
              </div>
              <div>
                <h4 className="text-white/50 text-[10px] font-mono tracking-[0.2em] uppercase mb-0.5">Tanggal</h4>
                <p className="font-medium text-white/90 text-sm md:text-base">Jumat, 5 Juni 2026</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }} className="flex items-center gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-neon-purple/10 group-hover:border-neon-purple/50 transition-all duration-300 shrink-0">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-neon-purple" />
              </div>
              <div>
                <h4 className="text-white/50 text-[10px] font-mono tracking-[0.2em] uppercase mb-0.5">Waktu</h4>
                <p className="font-medium text-white/90 text-sm md:text-base">08.30 - 09.40 WIB</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }} className="flex items-center gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-neon-orange/10 group-hover:border-neon-orange/50 transition-all duration-300 shrink-0">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-neon-orange" />
              </div>
              <div>
                <h4 className="text-white/50 text-[10px] font-mono tracking-[0.2em] uppercase mb-0.5">Lokasi</h4>
                <p className="font-medium text-white/90 text-sm md:text-base">Auditorium Gedung M Lt. 8</p>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
            <Link 
              href="/talkshow" 
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-raela font-bold uppercase tracking-widest overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] w-max"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base">
                Lihat Detail <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-all duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>

        </div>

        {/* Right Content: Speaker Image */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center order-1 lg:order-2 w-full h-[400px] md:h-[500px] lg:h-[600px] mt-10 lg:mt-0">
          
          {/* Dynamic Background Elements */}
          <div style={{ animation: 'spin 30s linear infinite' }} className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] border border-white/10 rounded-full border-dashed opacity-50" />
          <div style={{ animation: 'spin 40s linear infinite reverse' }} className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] border-2 border-neon-purple/20 rounded-full opacity-50" />
          
          {/* Solid Glow */}
          <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-to-tr from-neon-blue/20 via-neon-purple/20 to-transparent rounded-full blur-[60px]" />

          {/* Speaker Image */}
          <motion.div 
            style={{ y: isMobile ? 0 : ySpeaker, willChange: 'transform' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative w-full h-full flex items-end justify-center"
          >
            <div className="relative w-full h-[90%] md:h-[95%] drop-shadow-[0_0_20px_rgba(168,86,238,0.3)] lg:hover:drop-shadow-[0_0_50px_rgba(29,188,211,0.6)] transition-[filter] duration-700">
              <div 
                className="relative w-full h-full"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              >
                <Image 
                  src="/assets/talkshow/ibnusina.png" 
                  alt="Ibnu Sina Wardy"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Badge */}
          <motion.div 
            style={{ y: isMobile ? 0 : yBadge, willChange: 'transform' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-4 right-0 lg:bottom-12 lg:-right-4 z-30 group"
          >
            <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-neon-purple/30 rounded-full blur-[30px] lg:blur-[40px] -mr-12 -mt-12 group-hover:bg-neon-blue/40 transition-colors duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-raela font-bold text-white mb-1 leading-none">Ibnu Sina<br/>Wardy</h3>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neon-orange animate-pulse" />
                  <p className="text-neon-orange font-mono text-[9px] md:text-xs tracking-widest uppercase font-bold">Founder of GITS.id</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
