'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import { Countdown } from '@/components/sections/Countdown';
import dynamic from 'next/dynamic';
const FestiveBackground = dynamic(() => import('@/components/effects/FestiveBackground'), { ssr: false });

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">


      <FestiveBackground />
      
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ isolation: 'isolate' }}>
        {/* Gradients now handled by FestiveBackground global component */}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-32 pb-20">
        {/* Glassmorphism Wrapper around Hero */}
        <div
          className="rounded-[24px] p-8 md:p-12 lg:p-16 overflow-hidden relative backdrop-blur-none md:backdrop-blur-2xl max-md:bg-white/5 transform-gpu"
          style={{
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 2px 2px 0 rgba(255, 255, 255, 0.4)',
          }}
        >
          {/* Crispy gradient border overlay */}
          <div className="absolute inset-0 rounded-[24px] pointer-events-none max-md:hidden" style={{
            padding: '1.5px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}></div>
          <div className="absolute inset-0 rounded-[24px] pointer-events-none md:hidden border border-white/10"></div>
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
                Technology into Action, Ideas into Impact.
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
