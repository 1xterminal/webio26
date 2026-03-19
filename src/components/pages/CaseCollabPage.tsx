'use client';

/**
 * CaseCollabPage.tsx
 * Page for Case Collaborators, following the same premium design as SponsorshipPage
 */

import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });
import { Users, Eye, Globe, ExternalLink, ArrowRight, LucideProps, Loader2, CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';
import { useDownloadInteraction } from '@/hooks/useDownloadInteraction';
import React from 'react';

// Shared Components
import { useIsMobile } from '@/hooks/useIsMobile';
import { PremiumCardGlow } from '@/components/shared/PremiumCardGlow';
import { MetricCard } from '@/components/shared/MetricCard';
import { BenefitCard } from '@/components/shared/BenefitCard';
import { CaseCollabTimeline } from '@/components/sections/CaseCollabTimeline';
import { WhatsAppContactCard } from '@/components/shared/WhatsAppContactCard';
import { EmailContactCard } from '@/components/shared/EmailContactCard';

// ─── Static Module-Level Data ──────────────────────────────────────────────────

const metrics = [
  { icon: Users, value: '1000+',  label: 'Expected Attendees Across 2 Days',    delay: 0.1 },
  { icon: Eye,   value: '60k+',   label: 'Total Impressions',  delay: 0.2 },
  { icon: Globe, value: '30+',     label: 'Expected Brands', delay: 0.3 },
];

const caseCollabBenefits = [
  {
    title: 'Ultimate Exclusivity',
    description: 'Pihak Panitia menjamin bahwa Pihak Sponsor adalah satu-satunya mitra korporat dalam cabang lomba Business Case Competition ini. Tidak ada logo perusahaan lain atau kompetitor yang akan berbagi panggung dengan Pihak Sponsor dalam materi lomba Business Case Competition.',
    icon: dynamic(() => import('lucide-react').then(mod => mod.ShieldCheck)),
    accentColor: '#1DBCD3',
    delay: 0.1,
  },
  {
    title: 'On-Ground Activation',
    description: 'Pihak Sponsor mendapatkan hak istimewa untuk membuka booth eksklusif (3x3 meter) di Selasar Gedung M (area dengan lalu lintas mahasiswa tertinggi). Manfaat ini memberikan akses langsung untuk melakukan pameran produk, direct selling, atau on-site recruitment kepada ratusan pengunjung.',
    icon: dynamic(() => import('lucide-react').then(mod => mod.Store)),
    accentColor: '#A856EE',
    delay: 0.2,
  },
  {
    title: 'Exclusive Talent Pool Access',
    description: 'Pihak Sponsor mendapatkan hak akses penuh terhadap database Curriculum Vitae (CV) seluruh peserta kompetisi. Ini merupakan jalur pintas (shortcut) bagitim HRD Pihak Sponsor untuk melakukan pencarian bibit-bibit talenta terbaik (high achievers) dari berbagai universitas di seluruh Indonesia.',
    icon: dynamic(() => import('lucide-react').then(mod => mod.FileUser)),
    accentColor: '#1DBCD3',
    delay: 0.3,
  },
  {
    title: 'Grand Final Keynote Session',
    description: 'Pihak Sponsor diberikan sesi khusus (speech/presentation) di panggung Grand Final. Sesi ini dapat dimanfaatkan secara bebas untuk Company Profile Branding, promosi produk, atau presentasi karir langsung di hadapan finalis dan audiens.',
    icon: dynamic(() => import('lucide-react').then(mod => mod.Presentation)),
    accentColor: '#A856EE',
    delay: 0.4,
  },
  {
    title: 'Crowdsourcing Innovation',
    description: 'Pihak Sponsor mendapatkan ratusan perspektif segar dan solusi inovatif dari mahasiswa (Gen-Z) terhadap permasalahan bisnis nyata yang dihadapi perusahaan.',
    icon: dynamic(() => import('lucide-react').then(mod => mod.Lightbulb)),
    accentColor: '#1DBCD3',
    delay: 0.5,
  },
  {
    title: 'Employer Branding',
    description: 'Memperkuat citra Pihak Sponsor sebagai perusahaan yang mendukung inovasi dan pengembangan edukasi di mata ribuan mahasiswa dan akademisi.',
    icon: dynamic(() => import('lucide-react').then(mod => mod.Award)),
    accentColor: '#A856EE',
    delay: 0.6,
  },
];

export function CaseCollabPage() {
  const lenis = useLenis();
  const isMobile = useIsMobile();
  const { status: downloadStatus, handleDownload } = useDownloadInteraction();


  const backgroundGradients = useMemo(() => {
    const layers = [
      'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(168,86,238,0.30) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(29,188,211,0.25) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 0% 100%, rgba(29,188,211,0.25) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 100% 100%, rgba(168,86,238,0.25) 0%, transparent 80%)',
    ];

    if (!isMobile) {
      layers.push(
        'radial-gradient(ellipse 50% 50% at 50% -20%, rgba(29,188,211,0.20) 0%, transparent 75%)',
        'radial-gradient(ellipse 50% 50% at 50% 120%, rgba(168,86,238,0.20) 0%, transparent 75%)',
        'radial-gradient(circle at 20% 50%, rgba(168,86,238,0.35) 0%, transparent 40%)',
        'radial-gradient(circle at 80% 50%, rgba(29,188,211,0.30) 0%, transparent 40%)',
        'radial-gradient(ellipse 35% 35% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)'
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
              <span className="text-white">CASE</span> <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">COLLABORATOR</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => lenis?.scrollTo('#benefits')} className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black font-raela font-bold uppercase tracking-widest overflow-hidden transition-transform duration-200 active:scale-95 cursor-pointer">
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">Learn More</span>
                <div className="absolute inset-0 bg-neon-purple -translate-x-full group-hover:translate-x-0 transition-transform duration-250" />
              </button>
              <button onClick={() => lenis?.scrollTo('#contact')} className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-raela font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-200 cursor-pointer">Contact Us</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 0.7 }} className="text-center mb-12 md:mb-16">
            <h2 className="font-raela font-bold text-3xl md:text-5xl mb-4 uppercase">Why Collaborate with us?</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto rounded-full" />
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

      <section id="benefits" className="py-20 md:py-32 px-4 relative z-10 overflow-visible">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16 md:mb-24">
            <span className="text-neon-blue font-mono uppercase tracking-[0.4em] text-xs mb-4 block">COLLABORATION BENEFITS</span>
            <h2 className="text-4xl md:text-7xl font-raela font-black text-white mb-6 tracking-tight uppercase">
              WHAT YOU&apos;LL <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">GET</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 relative">
            {caseCollabBenefits.map((benefit, idx) => (
              <div key={benefit.title} className={`flex flex-col ${!isMobile && (idx === 1 || idx === 4) ? 'lg:translate-y-12' : ''}`}>
                <BenefitCard {...benefit} icon={benefit.icon as React.ComponentType<LucideProps>} isHighlighted={idx === 1 || idx === 3 || idx === 5} />
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="pb-8 md:pb-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.a 
            href="/downloads/Proposal Case Collaborator IO Festival 2026.pdf" 
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
            <PremiumCardGlow accentHex="#A856EE" />
            <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg border border-white/5 ${downloadStatus === 'idle' ? 'group-hover:scale-110' : ''}`} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))' }}>
              {downloadStatus === 'success' ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400" style={{ filter: 'drop-shadow(0 0 12px #34d399)' }} />
              ) : downloadStatus === 'loading' ? (
                <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
              ) : (
                <ExternalLink className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 12px #A856EE)' }} />
              )}
            </div>
            <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-bold text-xl md:text-2xl font-raela">Proposal Case Collaborator</span>
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
            &quot;Innovation thrives when we build together. Transform your business challenges into student opportunities.&quot;
          </motion.blockquote>
        </div>
      </section>

      <CaseCollabTimeline />

      <section id="contact" className="py-20 md:py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16 md:mb-20">
            <span className="text-neon-purple font-mono uppercase tracking-[0.4em] text-xs mb-4 block">READY TO COLLABORATE?</span>
            <h2 className="text-5xl md:text-8xl font-raela font-black text-white mb-6 tracking-tight uppercase">
              CONTACT <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">US!</span>
            </h2>
            <p className="text-white/50 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Hubungi tim kemitraan kami untuk mendiskusikan bagaimana studi kasus Anda dapat diintegrasikan ke dalam kompetisi kami.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 relative">
            <EmailContactCard email="iobemftiuntar@gmail.com" role="EMAIL INQUIRY" delay={0.1} accentColor="neon-purple" accentHex="#A856EE" />
            <WhatsAppContactCard name="Chelsea Keshya" role="Coordinator of Partnership and Management Committee" phoneNumber="6285883226013" message="Halo kak, aku tertarik untuk menjadi case collaborator di I/O Festival 2026!" accentColor="neon-blue" accentHex="#1DBCD3" delay={0.2} />
            <WhatsAppContactCard name="Juan Jefferson" role="Vice Coordinator of Partnership and Management Committee" phoneNumber="6281297575567" message="Halo kak, aku tertarik untuk menjadi case collaborator di I/O Festival 2026!" accentColor="neon-purple" accentHex="#A856EE" delay={0.3} />
          </div>
          <div className="mt-20 md:mt-32 border-t border-white/5 pt-12" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
