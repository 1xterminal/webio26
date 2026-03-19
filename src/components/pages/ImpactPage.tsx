'use client';

import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import { Target, Search, BarChart3, Database, CheckSquare, Layers, LineChart, TriangleAlert } from 'lucide-react';
import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';

// Top-Level Unified Premium Gradient Glow
const PremiumCardGlow = ({ accentHex, roundedClass = 'rounded-2xl' }: { accentHex: string, roundedClass?: string }) => {
    return (
        <>
            {/* Layer 1: Immersive Ambient Glow Background */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 pointer-events-none ${roundedClass}`}
                style={{ background: `radial-gradient(circle at 100% 0%, ${accentHex} 0%, transparent 80%)` }}
            />

            {/* Layer 2: Intense Top-Right Flare */}
            <div
                className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 group-hover:opacity-60 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 mix-blend-screen max-md:blur-[40px] md:blur-[80px] pointer-events-none"
                style={{ background: accentHex }}
            />

            {/* Layer 3: Glowing Gradient Border Mask */}
            <div
                className={`absolute inset-0 ${roundedClass} pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0`}
                style={{
                    padding: '1px',
                    background: `linear-gradient(135deg, ${accentHex}90 0%, rgba(255,255,255,0.05) 100%)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />

            {/* Layer 4: Inner Glow & Shadow Enhancement */}
            <div
                className={`absolute inset-0 ${roundedClass} opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 pointer-events-none`}
                style={{ boxShadow: `inset 0 0 40px ${accentHex}15, 0 10px 40px 0 ${accentHex}25` }}
            />
        </>
    );
};

// Use dynamic import for heavy background effects if applicable, similar to SponsorshipPage
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });

const corePillars = [
  {
    title: 'Kejelasan Masalah & Solusi',
    description: 'Menilai seberapa dalam pemahaman terhadap akar permasalahan dan seberapa tepat solusi yang ditawarkan untuk menjawabnya.',
    icon: Search,
    delay: 0.1,
    color: 'from-blue-400 to-cyan-300',
    shadow: 'rgba(34, 211, 238, 0.2)',
    accentHex: '#22d3ee'
  },
  {
    title: 'Logika Estimasi',
    description: 'Juri akan menilai logika metode perhitungan dan estimasi dampak yang dihasilkan oleh gagasan solusi.',
    icon: BarChart3,
    delay: 0.2,
    color: 'from-purple-400 to-fuchsia-300',
    shadow: 'rgba(168, 86, 238, 0.2)',
    accentHex: '#d946ef'
  },
  {
    title: 'Validitas Data & Riset',
    description: 'Setiap klaim dampak harus didukung oleh validitas data pendukung dan riset yang kredibel dan faktual.',
    icon: Database,
    delay: 0.3,
    color: 'from-amber-400 to-orange-300',
    shadow: 'rgba(251, 191, 36, 0.2)',
    accentHex: '#f59e0b'
  }
];

const evaluationFocus = [
  {
    title: 'Terukur',
    description: 'Dampak harus dapat diukur dengan metrik yang jelas dan objektif.',
    icon: LineChart
  },
  {
    title: 'Realistis',
    description: 'Estimasi dampak harus masuk akal, berdasarkan batasan yang ada, dan tidak overclaim.',
    icon: Target
  },
  {
    title: 'Aplikatif',
    description: 'Gagasan harus dapat diimplementasikan secara nyata dalam skenario dunia nyata.',
    icon: Layers
  }
];

export function ImpactPage() {
  const lenis = useLenis();
  const isMobile = useIsMobile();

  // Reusing the highly optimized static background generator pattern
  const backgroundGradients = useMemo(() => {
    const layers = [
      'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(29,188,211,0.35) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(168,86,238,0.30) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 0% 100%, rgba(255,107,0,0.25) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 100% 100%, rgba(29,188,211,0.25) 0%, transparent 80%)',
    ];

    if (!isMobile) {
      layers.push(
        'radial-gradient(ellipse 50% 50% at 50% -10%, rgba(168,86,238,0.25) 0%, transparent 75%)',
        'radial-gradient(ellipse 50% 50% at 50% 110%, rgba(255,107,0,0.20) 0%, transparent 75%)',
        'radial-gradient(circle at 10% 20%, rgba(29,188,211,0.40) 0%, transparent 25%)',
        'radial-gradient(circle at 90% 10%, rgba(168,86,238,0.35) 0%, transparent 30%)',
        'radial-gradient(ellipse 35% 35% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)'
      );
    }
    return layers.join(',');
  }, [isMobile]);

  return (
    <main className="bg-black min-h-screen text-white overflow-hidden selection:bg-neon-blue/30 selection:text-white">
      <Navbar />
      <StarDust />

      {/* Optimized Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.55] md:opacity-[0.85]" style={{ background: backgroundGradients }} />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none hidden md:block" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-4 min-h-[70vh] flex flex-col items-center justify-center text-center z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="will-change-transform"
          >
            <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-black/50 md:bg-white/5 text-neon-blue font-mono text-xs tracking-widest mb-6 uppercase md:backdrop-blur-sm">
              Assessment Criteria
            </span>
            <h1 className="text-5xl md:text-8xl font-raela font-black tracking-tight mb-6 leading-[1.1] uppercase">
              <span className="text-white">What is</span> <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 pb-2 md:pb-4 inline-block">
                Impact Projection?
              </span>
            </h1>

            
            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => lenis?.scrollTo('#details')} 
                className="group relative px-8 py-4 bg-black/80 md:bg-white/5 border border-white/10 rounded-full text-white font-raela font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-white/10 active:scale-95 cursor-pointer md:backdrop-blur-md"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Pelajari Lebih Lanjut
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote — directly below hero */}
      <section className="relative px-4 pb-20 md:pb-32 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="will-change-transform"
          >
            <p className="text-sm md:text-base text-white/40 italic font-light tracking-wide mb-3">
              Intinya, kamu harus memaparkan secara konkret:
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-raela font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
              &quot;Dampak sebesar apa yang bisa kamu berikan melalui solusi yang kamu gagas?&quot;
            </h2>
          </motion.div>
        </div>
      </section>

      <section id="details" className="py-20 md:py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: '0px 0px -100px 0px' }} 
            transition={{ duration: 0.7 }} 
            className="text-center mb-16 md:mb-24 will-change-transform"
          >
            <h2 className="font-raela font-bold text-3xl md:text-5xl mb-6 uppercase tracking-wide">
              Mendefinisikan <span className="text-neon-blue">Impact</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Impact Projection merupakan kejelasan masalah yang diangkat dan ketepatan solusi dalam menjawab akar permasalahan.
            </p>
            <div className="mt-6 inline-flex items-start md:items-center gap-3 px-6 py-4 rounded-2xl bg-[#FF8B53]/10 border border-[#FF8B53]/30 shadow-[0_0_20px_rgba(255,139,83,0.1)]">
              <TriangleAlert className="w-6 h-6 md:w-5 md:h-5 text-[#FF8B53] shrink-0 translate-y-[2px] md:translate-y-0" />
              <span className="text-white font-bold tracking-wide text-sm md:text-base">
                Semua karya peserta <span className="text-[#FF8B53] uppercase font-black tracking-widest leading-none">WAJIB</span> memiliki bagian Impact Projection di proposal.
              </span>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full mt-8" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {corePillars.map((pillar) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                transition={{ duration: 0.5, delay: pillar.delay }}
                className="group relative p-8 rounded-3xl bg-[rgba(10,10,10,0.95)] md:bg-[rgba(20,20,20,0.6)] border border-white/5 overflow-hidden will-change-transform transition-colors duration-500 hover:bg-[rgba(30,30,30,0.8)] md:backdrop-blur-xl"
              >
                <PremiumCardGlow accentHex={pillar.accentHex} roundedClass="rounded-3xl" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-2xl font-raela font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${pillar.color}`}>
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Focus Section */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: '0px 0px -100px 0px' }} 
              transition={{ duration: 0.7 }}
              className="will-change-transform"
            >
              <h2 className="text-4xl md:text-6xl font-raela font-black mb-6 uppercase tracking-tight leading-tight">
                Fokus <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-orange">Penilaian</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Juri tidak hanya mencari ide yang cemerlang, tetapi juga gagasan yang menjejak bumi. Penilaian utama akan berpusat pada tiga aspek esensial berikut.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6">
              {evaluationFocus.map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors will-change-transform"
                >
                  <div className="shrink-0 mt-1">
                    <CheckSquare className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-raela text-white mb-2">{item.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
