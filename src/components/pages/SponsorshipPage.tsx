'use client';

/**
 * SponsorshipPage.tsx
 * Refactored version using shared components from src/components/shared
 */

import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });
import { Users, Eye, Globe, ExternalLink, ArrowRight, LucideProps, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { useDownloadInteraction } from '@/hooks/useDownloadInteraction';
import React from 'react';

// Shared Components
import { useIsMobile } from '@/hooks/useIsMobile';
import { PremiumCardGlow } from '@/components/shared/PremiumCardGlow';
import { MetricCard } from '@/components/shared/MetricCard';
import { BenefitCard } from '@/components/shared/BenefitCard';
import { ComparisonMatrix, type Tier, type Benefit } from '@/components/shared/ComparisonMatrix';
import { MobileAccordion } from '@/components/shared/MobileAccordion';
import { WhatsAppContactCard } from '@/components/shared/WhatsAppContactCard';
import { EmailContactCard } from '@/components/shared/EmailContactCard';

// ─── Static Module-Level Data ──────────────────────────────────────────────────

const tiers: Tier[] = [
  { name: 'Diamond',  color: 'from-cyan-400 to-blue-300',    accentHex: '#22d3ee' },
  { name: 'Platinum', color: 'from-purple-500 to-purple-300', accentHex: '#A856EE' },
  { name: 'Gold',     color: 'from-amber-400 to-amber-200',  accentHex: '#fbbf24' },
  { name: 'Silver',   color: 'from-slate-400 to-slate-200',  accentHex: '#94a3b8' },
  { name: 'Bronze',   color: 'from-amber-800 to-amber-600',  accentHex: '#b45309' },
];

const benefits: Benefit[] = [
  { name: 'Logo pada Media Promosi (Cetak & Digital)',           values: ['Ukuran XL',             'Ukuran L',    'Ukuran M',    'Ukuran S',    'Ukuran S'] },
  { name: 'Open Booth Di Area Event',                              values: ['3×3m (Adjustable)',     '3×3m',        '2×2m',        '2×2m',        '-']         },
  { name: 'Lokasi Booth',                                          values: ['Zone A (Strategic)',    'Zone B',      'Zone C',      'Zone C',      '-']         },
  { name: 'Izin Direct Selling',          note: '*Hanya Non-Tunai',      values: [true,                    true,          true,          true,          false]       },
  { name: 'Postingan IG Story',                                    values: ['4×',                    '3×',          '2×',          '1×',          false]       },
  { name: 'Izin Sampling Keliling',       note: '*Roaming Tester',       values: ['Yes (All Areas)',       'Yes (Non-A)', false,         false,         false]       },
  { name: 'Pemutaran Company Profile Video', note: '*Durasi 1 Menit',    values: ['4×',                    '2×',          false,         false,         false]       },
  { name: 'Penempatan Logo Khusus',       note: '*"Festival Partner"', values: [true,                    false,         false,         false,         false]      },
  { name: 'Adlibs MC Saat Acara',                                  values: ['4×',                    false,         false,         false,         false]       },
  { name: 'Industry Exclusivity',         note: '*Max 1 Brand/Sektor',   values: [true,                    false,         false,         false,         false]       },
  { name: 'Content Creation',             note: '*Oleh Panitia',         values: [true,                    false,         false,         false,         false]       },
  { name: 'Product Placement di After Movie',                      values: [true,                    false,         false,         false,         false]       },
];

const metrics = [
  { icon: Users, value: '1000+',  label: 'Expected Attendees Across 2 Days',    delay: 0.1 },
  { icon: Eye,   value: '60k+',   label: 'Total Impressions',  delay: 0.2 },
  { icon: Globe, value: '30+',     label: 'Expected Brands', delay: 0.3 },
];

const sponsorshipBenefits = [
  {
    title: 'Brand Exposure',
    description: 'Logo brand kamu memiliki kesempatan tampil di berbagai media acara mulai dari baju panitia, spanduk, sampai video, dan dilihat ribuan pengunjung sepanjang acara. Dijamin makin dikenal dan gampang diingat!',
    icon: dynamic(() => import('lucide-react').then(mod => mod.Megaphone)),
    accentColor: '#1DBCD3',
    delay: 0.1,
  },
  {
    title: 'Industry Exclusivity',
    description: 'Brand-mu berpotensi menjadi satu-satunya brand di kategori industrimu! Tanpa kompetitor, perhatian pengunjung di area paling rame bakal fokus penuh ke booth kamu!',
    icon: dynamic(() => import('lucide-react').then(mod => mod.Crown)),
    accentColor: '#FF6B00',
    delay: 0.2,
  },
  {
    title: 'Direct Sales',
    description: 'Kamu bisa jualan langsung di area acara untuk dapetin pemasukan nyata. Brand kamu juga bebas bagi-bagi tester ke pengunjung biar mereka tertarik dan langsung beli di tempat.',
    icon: dynamic(() => import('lucide-react').then(mod => mod.Sparkles)),
    accentColor: '#A856EE',
    delay: 0.3,
  },
];

export function SponsorshipPage() {
  const lenis = useLenis();
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [openTier, setOpenTier] = useState<number | null>(0);
  const isMobile = useIsMobile();
  const { status: downloadStatus, handleDownload } = useDownloadInteraction();

  const handleHoverTier = useCallback((idx: number | null) => setHoveredTier(idx), []);
  const handleToggleTier = useCallback((idx: number) => setOpenTier(prev => (prev === idx ? null : idx)), []);

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
    <main className="bg-black min-h-screen text-white overflow-hidden">
      <Navbar />
      <StarDust />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.55] md:opacity-[0.85]" style={{ background: backgroundGradients }} />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none hidden md:block" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      <section className="relative pt-40 pb-24 px-4 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="text-5xl md:text-9xl font-raela font-black tracking-tighter mb-6 leading-[1.1]">
              <span className="text-white">PARTNER</span> <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange">WITH US!</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => lenis?.scrollTo('#tiers')} className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black font-raela font-bold uppercase tracking-widest overflow-hidden transition-transform duration-200 active:scale-95 cursor-pointer">
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">Learn More</span>
                <div className="absolute inset-0 bg-neon-orange -translate-x-full group-hover:translate-x-0 transition-transform duration-250" />
              </button>
              <button onClick={() => lenis?.scrollTo('#contact')} className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-raela font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-200 cursor-pointer">Contact Us</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 0.7 }} className="text-center mb-12 md:mb-16">
            <h2 className="font-raela font-bold text-3xl md:text-5xl mb-4 uppercase">Why Sponsor Us?</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-orange mx-auto rounded-full" />
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="w-[calc(50%-1rem)] lg:w-72">
                <MetricCard {...m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 relative z-10 overflow-visible">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16 md:mb-24">
            <span className="text-neon-purple font-mono uppercase tracking-[0.4em] text-xs mb-4 block">PARTNERSHIP BENEFITS</span>
            <h2 className="text-4xl md:text-7xl font-raela font-black text-white mb-6 tracking-tight uppercase">
              WHAT YOU&apos;LL <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">GET</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 relative">
            {sponsorshipBenefits.map((benefit, idx) => (
              <div key={benefit.title} className={`flex flex-col ${idx === 1 ? 'lg:translate-y-12' : ''}`}>
                <BenefitCard {...benefit} icon={benefit.icon as React.ComponentType<LucideProps>} isHighlighted={idx === 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tiers" className="py-20 md:py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 0.7 }} className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-7xl font-raela font-black text-white mb-4 md:mb-6 tracking-tight">
              SPONSORSHIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">TIERS</span>
            </h2>
          </motion.div>
          <div className="hidden md:block">
            <ComparisonMatrix tiers={tiers} benefits={benefits} hoveredTier={hoveredTier} onHoverTier={handleHoverTier} />
          </div>
          <MobileAccordion tiers={tiers} benefits={benefits} openTier={openTier} onToggle={handleToggleTier} />
        </div>
      </section>

      <section className="pb-8 md:pb-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.a 
            href="/downloads/Proposal Sponsorship IO Festival.pdf" 
            download 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handleDownload}
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: '0px 0px -60px 0px' }} 
            transition={{ duration: 0.5 }} 
            className={`relative flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 rounded-3xl md:backdrop-blur-xl transition-transform duration-500 overflow-hidden group w-full z-10 border border-white/5 bg-[rgba(20,20,20,0.8)] shadow-2xl ${downloadStatus === 'idle' ? 'hover:-translate-y-2' : ''}`}
          >
            <PremiumCardGlow accentHex="#22d3ee" />
            <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg border border-white/5 ${downloadStatus === 'idle' ? 'group-hover:scale-110' : ''}`} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))' }}>
              {downloadStatus === 'success' ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400" style={{ filter: 'drop-shadow(0 0 12px #34d399)' }} />
              ) : downloadStatus === 'loading' ? (
                <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
              ) : (
                <ExternalLink className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 12px #22d3ee)' }} />
              )}
            </div>
            <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-bold text-xl md:text-2xl font-raela">Proposal Sponsorship</span>
                  <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-red-500/10 text-red-400 font-raela">PDF</span>
                </div>
                <span className="text-white/50 text-sm">I/O Festival 2026 — Dokumen resmi kemitraan</span>
              </div>
              <div 
                className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white w-fit px-4 py-2 rounded-full transition-colors ${
                  downloadStatus === 'success' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                    : downloadStatus === 'loading'
                    ? 'bg-white/5 text-white/50 cursor-wait'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}
              >
                {downloadStatus === 'idle' && (
                  <>Unduh <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" /></>
                )}
                {downloadStatus === 'loading' && <span className="animate-pulse">Loading...</span>}
                {downloadStatus === 'success' && 'Berhasil!'}
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      <section className="py-20 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 0.8 }} className="text-xl md:text-4xl font-raela font-light italic text-white/60 leading-relaxed">
            &quot;Innovation dies in isolation. Great leaps are made through <span className="text-white font-bold not-italic">Meaningful Partnerships</span>.&quot;
          </motion.blockquote>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16 md:mb-20">
            <span className="text-neon-blue font-mono uppercase tracking-[0.4em] text-xs mb-4 block">READY TO PARTNER?</span>
            <h2 className="text-5xl md:text-8xl font-raela font-black text-white mb-6 tracking-tight uppercase">
              CONTACT <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange">US!</span>
            </h2>
            <p className="text-white/50 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Hubungi tim kemitraan kami untuk mendapatkan penawaran khusus dan kolaborasi eksklusif yang dirancang untuk visi brand Anda.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 relative">
            <EmailContactCard email="iobemftiuntar@gmail.com" role="EMAIL INQUIRY" delay={0.1} accentColor="neon-blue" accentHex="#1DBCD3" />
            <WhatsAppContactCard name="Chelsea Keshya" role="Coordinator of Partnership" phoneNumber="6285883226013" message="Halo kak, aku tertarik untuk menjadi sponsor di I/O Festival 2026!" accentColor="neon-purple" accentHex="#A856EE" delay={0.2} />
            <WhatsAppContactCard name="Juan Jefferson" role="Vice Coordinator of Partnership" phoneNumber="6281297575567" message="Halo kak, aku tertarik untuk menjadi sponsor di I/O Festival 2026!" accentColor="neon-orange" accentHex="#FF6B00" delay={0.3} />
          </div>
          <div className="mt-20 md:mt-32 border-t border-white/5 pt-12" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
