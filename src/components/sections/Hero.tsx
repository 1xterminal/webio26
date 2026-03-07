'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import { Countdown } from '@/components/sections/Countdown';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">

      {/* Light leaks & 3D Elements - Pure CSS animations */}
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
        @keyframes hero-fade-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-right {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes hero-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}} />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ isolation: 'isolate' }}>
        <div
          className="absolute -top-50 -right-37.5 w-125 h-125 rounded-full transform-gpu max-md:hidden blur-[150px] pointer-events-none"
          style={{ background: '#a64dff', animation: 'hero-glow-1 10s ease-in-out infinite', willChange: 'transform, opacity' }}
        />
        <div
          className="absolute bottom-[5%] -left-25 w-112.5 h-112.5 rounded-full transform-gpu blur-2xl md:blur-[150px] pointer-events-none"
          style={{ background: '#ff8c42', animation: 'hero-glow-2 12s ease-in-out infinite', willChange: 'transform, opacity' }}
        />
        <div
          className="absolute top-[30%] -right-12.5 w-87.5 h-87.5 rounded-full transform-gpu max-md:hidden blur-[150px] pointer-events-none"
          style={{ background: '#55D5E7', animation: 'hero-glow-3 14s ease-in-out infinite', willChange: 'transform, opacity' }}
        />


        {/* Static 3D Elements */}
        {/* Top left cluster */}
        <Image src="/assets/element/ELEMEN%202.png" alt="" width={320} height={320} sizes="(max-width:768px) 25vw, (max-width:1024px) 256px, 320px" className="absolute top-[2%] left-[2%] w-[25vw] md:w-64 lg:w-80 opacity-40 md:opacity-60 object-contain rotate-12" />
        <Image src="/assets/element/ELEMEN%209.png" alt="" width={160} height={160} sizes="(max-width:1024px) 128px, 160px" className="max-md:hidden absolute top-[35%] left-[5%] w-[15vw] md:w-32 lg:w-40 opacity-20 md:opacity-40 object-contain -rotate-12" loading="lazy" />

        {/* Top right cluster */}
        <Image src="/assets/element/ELEMEN%205.png" alt="" width={288} height={288} sizes="(max-width:768px) 20vw, (max-width:1024px) 192px, 288px" className="absolute top-[5%] right-[2%] w-[20vw] md:w-48 lg:w-72 opacity-40 md:opacity-60 object-contain -rotate-6" />
        <Image src="/assets/element/ELEMEN%206.png" alt="" width={160} height={160} sizes="160px" className="max-md:hidden absolute top-[38%] right-[4%] w-[12vw] md:w-40 opacity-30 md:opacity-50 object-contain rotate-12" loading="lazy" />

        {/* Bottom left cluster */}
        <Image src="/assets/element/ELEMEN%207.png" alt="" width={256} height={256} sizes="(max-width:768px) 20vw, (max-width:1024px) 224px, 256px" className="absolute bottom-[2%] left-[3%] w-[20vw] md:w-56 lg:w-64 opacity-30 md:opacity-50 object-contain rotate-30" loading="lazy" />
        <Image src="/assets/element/ELEMEN%2010.png" alt="" width={128} height={128} sizes="128px" className="max-md:hidden absolute bottom-[28%] left-[12%] w-[10vw] md:w-32 opacity-20 md:opacity-40 object-contain -rotate-12" loading="lazy" />

        {/* Bottom right cluster */}
        <Image src="/assets/element/ELEMEN%20%208.png" alt="" width={320} height={320} sizes="(max-width:768px) 30vw, (max-width:1024px) 288px, 320px" className="absolute bottom-[5%] right-[2%] w-[30vw] md:w-72 lg:w-80 opacity-40 md:opacity-60 object-contain -rotate-12" loading="lazy" />
        <Image src="/assets/element/ELEMEN%2010.png" alt="" width={160} height={160} sizes="160px" className="max-md:hidden absolute bottom-[40%] right-[10%] w-[12vw] md:w-40 opacity-20 md:opacity-40 object-contain rotate-45" loading="lazy" />

        {/* Center/Midground cluster (Deep behind glass) */}
        <Image src="/assets/element/ELEMEN%203.png" alt="" width={256} height={256} sizes="256px" className="max-md:hidden absolute top-[18%] left-[40%] w-64 opacity-40 object-contain -z-10 -rotate-6" loading="lazy" />
        <Image src="/assets/element/ELEMEN%202.png" alt="" width={192} height={192} sizes="192px" className="max-md:hidden absolute bottom-[18%] right-[40%] w-48 opacity-30 object-contain -z-10 rotate-12" loading="lazy" />
        <Image src="/assets/element/ELEMEN%209.png" alt="" width={224} height={224} sizes="224px" className="max-md:hidden absolute top-[45%] left-[25%] w-56 opacity-35 object-contain -z-10 rotate-45" loading="lazy" />
        <Image src="/assets/element/ELEMEN%206.png" alt="" width={240} height={240} sizes="240px" className="max-md:hidden absolute top-[50%] right-[25%] w-60 opacity-30 object-contain -z-10 -rotate-12" loading="lazy" />

        {/* Stars scattered */}
        <Image src="/assets/element/ELEMEN%20STARS.png" alt="" width={80} height={80} sizes="80px" className="max-md:hidden absolute top-[15%] left-[25%] w-[8vw] md:w-20 opacity-20 md:opacity-30 object-contain" loading="lazy" />
        <Image src="/assets/element/ELEMEN%20STARS.png" alt="" width={112} height={112} sizes="112px" className="max-md:hidden absolute bottom-[20%] right-[32%] w-[12vw] md:w-28 opacity-20 md:opacity-30 object-contain" loading="lazy" />
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
              <h1
                className="font-raela font-black text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tighter leading-[0.85]"
                style={{ animation: 'hero-fade-up 0.7s ease-out both' }}
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
              </h1>

              {/* Description */}
              <p
                className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md"
                style={{ animation: 'hero-fade-up 0.6s ease-out 0.15s both' }}
              >
                FTI UNTAR menyelenggarakan kompetisi teknologi tingkat nasional. Peserta dapat memilih tiga cabang kompetisi.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row items-start gap-4 pt-2"
                style={{ animation: 'hero-fade-up 0.6s ease-out 0.3s both' }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label="Learn more about competition tracks"
                  className="group px-8 py-4 bg-white text-black font-bold text-lg tracking-wide hover:bg-white/90 transition-colors inline-block"
                >
                  <span className="flex items-center gap-3">
                    Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right - Countdown */}
            <div
              className="lg:col-span-5 flex justify-center lg:justify-end"
              style={{ animation: 'hero-fade-right 0.7s ease-out 0.3s both' }}
            >
              <Countdown />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-20"
        style={{ animation: 'hero-fade-in 0.8s ease-out 1.2s both' }}
      >
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
