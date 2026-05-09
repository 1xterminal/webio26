'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, User } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';

const StarDust = dynamic(() => import('@/components/effects/StarDust').then(mod => mod.default), { ssr: false });

export function TalkshowPage() {
  const isMobile = useIsMobile();
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects (only active on desktop to save mobile performance)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const ySpeaker = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -50]);
  const yPills = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -30]);

  const [imageError, setImageError] = useState(false);

  const backgroundGradients = useMemo(() => {
    const layers = [
      'radial-gradient(circle at 10% 20%, rgba(29,188,211,0.2) 0%, transparent 40%)',
      'radial-gradient(circle at 90% 80%, rgba(168,86,238,0.2) 0%, transparent 40%)',
      'radial-gradient(circle at 50% 50%, rgba(255,107,0,0.1) 0%, transparent 60%)',
    ];

    if (!isMobile) {
      layers.push(
        'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29,188,211,0.15) 0%, transparent 50%)',
        'radial-gradient(ellipse 80% 50% at 50% 120%, rgba(168,86,238,0.15) 0%, transparent 50%)'
      );
    }
    return layers.join(',');
  }, [isMobile]);

  return (
    <main className="bg-black min-h-[100svh] text-white overflow-x-hidden font-sans selection:bg-neon-purple/30 flex flex-col">
      <Navbar />
      <StarDust />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.6] md:opacity-[0.8]" style={{ background: backgroundGradients }} />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      {/* Hero Section dynamically fitting 100svh */}
      <section ref={containerRef} className="relative min-h-[100svh] w-full flex items-center justify-center z-10 pt-24 pb-10">
        
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center justify-center">
          
          {/* Left Content: Title & CTA */}
          <div className="lg:col-span-6 relative z-30 flex flex-col items-start w-full order-2 lg:order-1 justify-center mt-6 lg:mt-0">
            
            <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-raela font-black leading-[1.1] uppercase mb-3 md:mb-4 tracking-tighter w-full whitespace-nowrap">
              Ideas that Matter: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange drop-shadow-sm">Impactful Solution</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-sm md:text-xl text-white/60 max-w-sm md:max-w-lg font-light mb-6 md:mb-8 leading-relaxed line-clamp-2 md:line-clamp-none">
              Ubah cara pandangmu terhadap teknologi. Saatnya dengar langsung dari mereka yang membangun solusinya
            </motion.p>

            {/* Elegant Vertical Info Group */}
            <motion.div 
              style={{ y: isMobile ? 0 : yPills, willChange: 'transform' }}
              className="mb-8 flex flex-col gap-3 md:gap-5 relative z-20 w-full max-w-[280px] md:max-w-sm"
            >
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex items-center gap-3 md:gap-4 group bg-black/40 lg:bg-transparent p-2 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-md lg:backdrop-blur-none border border-white/10 lg:border-transparent shadow-lg lg:shadow-none">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-neon-blue/10 group-hover:border-neon-blue/50 transition-all duration-300 shadow-[0_0_15px_rgba(29,188,211,0)] group-hover:shadow-[0_0_15px_rgba(29,188,211,0.2)] shrink-0">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
                </div>
                <div>
                  <h4 className="text-white/50 text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase mb-0.5 md:mb-1">Tanggal</h4>
                  <p className="font-medium text-white/90 text-sm md:text-base">Jumat, 5 Juni 2026</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="flex items-center gap-3 md:gap-4 group bg-black/40 lg:bg-transparent p-2 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-md lg:backdrop-blur-none border border-white/10 lg:border-transparent shadow-lg lg:shadow-none">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-neon-purple/10 group-hover:border-neon-purple/50 transition-all duration-300 shadow-[0_0_15px_rgba(168,86,238,0)] group-hover:shadow-[0_0_15px_rgba(168,86,238,0.2)] shrink-0">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-neon-purple" />
                </div>
                <div>
                  <h4 className="text-white/50 text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase mb-0.5 md:mb-1">Waktu</h4>
                  <p className="font-medium text-white/90 text-sm md:text-base">08.30 - 09.40 WIB</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="flex items-center gap-3 md:gap-4 group bg-black/40 lg:bg-transparent p-2 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-md lg:backdrop-blur-none border border-white/10 lg:border-transparent shadow-lg lg:shadow-none">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-neon-orange/10 group-hover:border-neon-orange/50 transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0)] group-hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-neon-orange" />
                </div>
                <div>
                  <h4 className="text-white/50 text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase mb-0.5 md:mb-1">Lokasi</h4>
                  <p className="font-medium text-white/90 text-sm md:text-base line-clamp-1">Auditorium Gedung M Lt. 8</p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="w-full sm:w-auto z-40">
              <a 
                href="https://bit.ly/IOFest26Talkshow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 md:gap-4 px-6 py-4 md:px-10 md:py-5 bg-white text-black font-raela font-bold uppercase tracking-widest overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full sm:w-max"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base">
                  Daftar Sekarang <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-rotate-45 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </motion.div>

          </div>

          {/* Right Content: Speaker Image (Absolute on mobile, relative on desktop) */}
          <div className="absolute lg:relative bottom-0 right-[-15%] md:right-0 lg:right-0 w-[75vw] sm:w-[60vw] lg:w-full h-[65dvh] lg:h-full lg:col-span-6 flex flex-col items-center justify-end lg:justify-center z-10 lg:z-20 pointer-events-none lg:pointer-events-auto">
            
            {/* Dynamic Background Elements for the Photo */}
            <div style={{ animation: 'spin 30s linear infinite' }} className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] border border-white/10 rounded-full border-dashed bottom-[10%] lg:bottom-auto opacity-50 lg:opacity-100" />
            <div style={{ animation: 'spin 40s linear infinite reverse' }} className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] border-2 border-neon-purple/20 rounded-full bottom-[15%] lg:bottom-auto opacity-50 lg:opacity-100" />
            
            {/* Solid Glow behind speaker */}
            <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-tr from-neon-blue/20 via-neon-purple/20 to-transparent rounded-full blur-[40px] md:blur-[60px] bottom-[10%] lg:bottom-auto" />

            {/* The Cutout Speaker Image */}
            <motion.div 
              style={{ y: ySpeaker, willChange: 'transform' }} 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.2 }}
              className="relative w-full h-[85%] md:h-[90%] lg:h-[80%] flex items-end justify-center"
            >
              {!imageError ? (
                <div className="relative w-full h-full drop-shadow-[0_0_20px_rgba(168,86,238,0.3)] lg:hover:drop-shadow-[0_0_50px_rgba(29,188,211,0.6)] transition-[filter] duration-700">
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
                      priority
                      onError={() => setImageError(true)}
                    />
                  </div>
                </div>
              ) : (
                // Fallback
                <div className="w-[80%] h-[80%] max-w-[300px] rounded-[30px] lg:rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden mb-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/20 to-transparent pointer-events-none" />
                  <User className="w-16 h-16 lg:w-24 lg:h-24 text-white/20 mb-4" />
                  <p className="text-white/40 font-mono text-[10px] lg:text-sm tracking-widest text-center px-6">Error loading /assets/talkshow/ibnusina.png</p>
                </div>
              )}
            </motion.div>

            {/* Floating Name Badge - Organic overlap */}
            <motion.div 
              initial={{ opacity: 0, x: 30, y: 30 }} 
              animate={{ opacity: 1, x: 0, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
              className="absolute bottom-[20%] right-4 lg:bottom-12 lg:right-0 z-30 group"
            >
              <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden pointer-events-auto">
                {/* Badge inner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-neon-purple/30 rounded-full blur-[30px] lg:blur-[40px] -mr-12 -mt-12 group-hover:bg-neon-blue/40 transition-colors duration-500" />
                
                <div className="relative z-10">
                  <h3 className="text-xl md:text-3xl lg:text-5xl font-raela font-bold text-white mb-1 lg:mb-2 leading-none">Ibnu Sina<br/>Wardy</h3>
                  <div className="flex items-center gap-1.5 lg:gap-2 mt-2 lg:mt-3">
                    <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-neon-orange animate-pulse" />
                    <p className="text-neon-orange font-mono text-[9px] md:text-xs lg:text-sm tracking-widest uppercase font-bold">Founder of GITS.id</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Since we forced 100dvh for the hero, footer will just sit below it natively */}
      <Footer />
    </main>
  );
}
