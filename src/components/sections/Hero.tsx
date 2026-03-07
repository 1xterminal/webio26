'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Countdown } from '@/components/sections/Countdown';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">

      {/* Light leaks & 3D Elements - Migrated to Pure CSS for Zero-JS Render Teleport Bug Fix */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes hero-glow-1 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.35; }
            50% { transform: translate(30px, -20px); opacity: 0.5; }
        }
        @keyframes hero-glow-2 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.15; }
            50% { transform: translate(-25px, 20px); opacity: 0.25; }
        }
        @keyframes hero-glow-3 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.2; }
            50% { transform: translate(15px, -15px); opacity: 0.35; }
        }
      `}} />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ isolation: 'isolate' }}>
        <div
          className="absolute -top-50 -right-37.5 w-125 h-125 rounded-full transform-gpu max-md:hidden blur-[150px] pointer-events-none"
          style={{ background: '#a64dff', animation: 'hero-glow-1 10s ease-in-out infinite', willChange: 'transform, opacity' }}
        />
        <div
          className="absolute bottom-[5%] -left-25 w-112.5 h-112.5 rounded-full transform-gpu blur-[40px] md:blur-[150px] pointer-events-none"
          style={{ background: '#ff8c42', animation: 'hero-glow-2 12s ease-in-out infinite', willChange: 'transform, opacity' }}
        />
        <div
          className="absolute top-[30%] -right-12.5 w-87.5 h-87.5 rounded-full transform-gpu max-md:hidden blur-[150px] pointer-events-none"
          style={{ background: '#55D5E7', animation: 'hero-glow-3 14s ease-in-out infinite', willChange: 'transform, opacity' }}
        />

        {/* Static 3D Elements */}
        {/* Top left cluster */}
        <Image src="/assets/element/ELEMEN%202.png" alt="" width={400} height={400} className="absolute top-[2%] left-[2%] w-[25vw] md:w-64 lg:w-80 opacity-40 md:opacity-60 object-contain rotate-12" priority />
        <Image src="/assets/element/ELEMEN%209.png" alt="" width={400} height={400} className="max-md:hidden absolute top-[35%] left-[5%] w-[15vw] md:w-32 lg:w-40 opacity-20 md:opacity-40 object-contain -rotate-12" priority />

        {/* Top right cluster */}
        <Image src="/assets/element/ELEMEN%205.png" alt="" width={400} height={400} className="absolute top-[5%] right-[2%] w-[20vw] md:w-48 lg:w-72 opacity-40 md:opacity-60 object-contain -rotate-6" priority />
        <Image src="/assets/element/ELEMEN%206.png" alt="" width={400} height={400} className="max-md:hidden absolute top-[38%] right-[4%] w-[12vw] md:w-40 opacity-30 md:opacity-50 object-contain rotate-12" priority />

        {/* Bottom left cluster */}
        <Image src="/assets/element/ELEMEN%207.png" alt="" width={400} height={400} className="absolute bottom-[2%] left-[3%] w-[20vw] md:w-56 lg:w-64 opacity-30 md:opacity-50 object-contain rotate-30" priority />
        <Image src="/assets/element/ELEMEN%2010.png" alt="" width={400} height={400} className="max-md:hidden absolute bottom-[28%] left-[12%] w-[10vw] md:w-32 opacity-20 md:opacity-40 object-contain -rotate-12" priority />

        {/* Bottom right cluster */}
        <Image src="/assets/element/ELEMEN%20%208.png" alt="" width={400} height={400} className="absolute bottom-[5%] right-[2%] w-[30vw] md:w-72 lg:w-80 opacity-40 md:opacity-60 object-contain -rotate-12" priority />
        <Image src="/assets/element/ELEMEN%2010.png" alt="" width={400} height={400} className="max-md:hidden absolute bottom-[40%] right-[10%] w-[12vw] md:w-40 opacity-20 md:opacity-40 object-contain rotate-45" priority />

        {/* Center/Midground cluster (Deep behind glass) */}
        <Image src="/assets/element/ELEMEN%203.png" alt="" width={400} height={400} className="max-md:hidden absolute top-[18%] left-[40%] w-64 opacity-40 object-contain -z-10 -rotate-6" priority />
        <Image src="/assets/element/ELEMEN%202.png" alt="" width={400} height={400} className="max-md:hidden absolute bottom-[18%] right-[40%] w-48 opacity-30 object-contain -z-10 rotate-12" priority />
        <Image src="/assets/element/ELEMEN%209.png" alt="" width={400} height={400} className="max-md:hidden absolute top-[45%] left-[25%] w-56 opacity-35 object-contain -z-10 rotate-45" priority />
        <Image src="/assets/element/ELEMEN%206.png" alt="" width={400} height={400} className="max-md:hidden absolute top-[50%] right-[25%] w-60 opacity-30 object-contain -z-10 -rotate-12" priority />

        {/* Stars scattered */}
        <Image src="/assets/element/ELEMEN%20STARS.png" alt="" width={400} height={400} className="max-md:hidden absolute top-[15%] left-[25%] w-[8vw] md:w-20 opacity-20 md:opacity-30 object-contain" priority />
        <Image src="/assets/element/ELEMEN%20STARS.png" alt="" width={400} height={400} className="max-md:hidden absolute bottom-[20%] right-[32%] w-[12vw] md:w-28 opacity-20 md:opacity-30 object-contain" priority />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-32 pb-20">
        {/* Glassmorphism Wrapper around Hero */}
        <div
          className="rounded-[24px] p-8 md:p-12 lg:p-16 overflow-hidden relative backdrop-blur-md md:backdrop-blur-2xl transform-gpu"
          style={{
            background: 'rgba(255, 255, 255, 0)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 2px 2px 0 rgba(255, 255, 255, 0.4)',
          }}
        >
          {/* Crispy gradient border overlay */}
          <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{
            padding: '1.5px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left - Title & CTA */}
            <div className="lg:col-span-7 space-y-6">

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-raela font-black text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tighter leading-[0.85]"
              >
                <span className="block text-white">I/O</span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #a64dff 0%, #ffffff 25%, #ff8c42 50%, #55D5E7 75%, #ffffff 100%)'
                  }}
                >
                  FESTIVAL
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md"
              >
                FTI UNTAR menyelenggarakan kompetisi teknologi tingkat nasional. Peserta dapat memilih tiga cabang kompetisi.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4 pt-2"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group px-8 py-4 bg-white text-black font-bold text-lg tracking-wide hover:bg-white/90 transition-colors inline-block"
                >
                  <span className="flex items-center gap-3">
                    Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Right - Countdown */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <Countdown />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-20"
      >
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
