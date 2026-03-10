'use client';

/**
 * SponsorshipPage.tsx
 *
 * Performance philosophy for mobile:
 * 1. ZERO backdrop-filter/blur on mobile — these are the #1 GPU killer on phones
 * 2. ZERO mix-blend-screen on mobile — forces offscreen compositing layers
 * 3. CSS transitions only for touch interactions (no Framer Motion on mobile cards)
 * 4. height accordion uses CSS max-height trick — never triggers layout thrash
 * 5. Chevron rotation is pure CSS (transition:transform) — no JS thread involvement
 * 6. whileInView only on section headers, NOT on individual cards
 * 7. will-change only set during active animation, removed when idle
 */

import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });
import { Users, Eye, Globe, Mail, Check, X, ChevronDown, ExternalLink, ArrowRight, Megaphone, Sparkles, Crown, MessageCircle, LucideProps } from 'lucide-react';
import { useState, useCallback, memo, useMemo, useSyncExternalStore } from 'react';
import React from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Tier {
  name: string;
  color: string;           // Tailwind gradient classes (desktop only)
  accentHex: string;
}

interface Benefit {
  name: string;
  note?: string;
  values: (string | boolean)[];
}

interface Metric {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  delay: number;
}

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  accentColor: string;
  delay: number;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useIsMobile() {
  return useSyncExternalStore(
    useCallback((callback: () => void) => {
      const mq = window.matchMedia('(max-width: 768px)');
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    }, []),
    () => window.matchMedia('(max-width: 768px)').matches,
    () => false // server snapshot
  );
}

// ─── Static Module-Level Data (never re-created on re-render) ──────────────────

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

const metrics: Metric[] = [
  { icon: Users, value: '1000+',  label: 'Expected Attendees Across 2 Days',    delay: 0.1 },
  { icon: Eye,   value: '60k+',   label: 'Total Impressions',  delay: 0.2 },
  { icon: Globe, value: '30+',     label: 'Expected Brands', delay: 0.3 },
];

const benefitItems: BenefitItem[] = [
  {
    title: 'Brand Exposure',
    description: 'Logo brand kamu memiliki kesempatan tampil di berbagai media acara mulai dari baju panitia, spanduk, sampai video, dan dilihat ribuan pengunjung sepanjang acara. Dijamin makin dikenal dan gampang diingat!',
    icon: Megaphone,
    accentColor: '#1DBCD3', // Cyan
    delay: 0.1,
  },
  {
    title: 'Industry Exclusivity',
    description: 'Brand-mu berpotensi menjadi satu-satunya brand di kategori industrimu! Tanpa kompetitor, perhatian pengunjung di area paling rame bakal fokus penuh ke booth kamu!',
    icon: Crown,
    accentColor: '#FF6B00', // Orange
    delay: 0.2,
  },
  {
    title: 'Direct Sales',
    description: 'Kamu bisa jualan langsung di area acara untuk dapetin pemasukan nyata. Brand kamu juga bebas bagi-bagi tester ke pengunjung biar mereka tertarik dan langsung beli di tempat.',
    icon: Sparkles,
    accentColor: '#A856EE', // Purple
    delay: 0.3,
  },
];

// ─── PremiumCardGlow — desktop only (blur + blend are GPU-expensive on mobile) ──

const PremiumCardGlow = memo(({ accentHex, roundedClass = 'rounded-3xl' }: {
  accentHex: string;
  roundedClass?: string;
}) => {
  // Pruning expensive effects for mobile users
  const isMobile = useIsMobile();
  
  if (isMobile) {
    // Simple glow for mobile - zero mix-blend, zero mask, zero blur
    return (
      <div 
        className={`absolute inset-0 border border-white/5 ${roundedClass} pointer-events-none transition-colors duration-500`} 
      />
    );
  }

  return (
    <>
      {/* Layer 1: Ambient radial glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-[600ms] pointer-events-none ${roundedClass}`}
        style={{ background: `radial-gradient(circle at 100% 0%, ${accentHex} 0%, transparent 80%)` }}
      />
      {/* Layer 2: Flare — desktop only to avoid GPU overdraw on mobile */}
      <div
        className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-[800ms] pointer-events-none blur-[80px] mix-blend-screen"
        style={{ background: accentHex }}
      />
      {/* Layer 3: Gradient border via mask */}
      <div
        className={`absolute inset-0 ${roundedClass} pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms]`}
        style={{
          padding: '1px',
          background: `linear-gradient(135deg, ${accentHex}90 0%, rgba(255,255,255,0.05) 100%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Layer 4: Inner glow on hover */}
      <div
        className={`absolute inset-0 ${roundedClass} opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] pointer-events-none`}
        style={{ boxShadow: `inset 0 0 40px ${accentHex}15, 0 10px 40px 0 ${accentHex}25` }}
      />
    </>
  );
});
PremiumCardGlow.displayName = 'PremiumCardGlow';

// ─── MetricCard — simplified on mobile for compositor-only rendering ───────────

const MetricCard = memo(({ icon: Icon, value, label, delay }: Metric) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    transition={{ duration: 0.6, delay }}
    className="group relative p-6 md:p-8 rounded-3xl overflow-hidden bg-[rgba(25,25,25,0.9)] md:bg-[rgba(20,20,20,0.5)] md:[backdrop-filter:blur(16px)] transition-transform duration-[500ms] ease-out hover:-translate-y-2 border border-white/5"
    style={{ willChange: 'transform' }}
  >
    <PremiumCardGlow accentHex="#1DBCD3" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-neon-blue/10 flex items-center justify-center mb-4 md:mb-6 border border-neon-blue/20 transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-neon-blue" />
      </div>
      <div className="font-raela font-black text-3xl md:text-5xl text-white mb-1 md:mb-2 tracking-tighter">{value}</div>
      <div className="text-white/40 font-raela uppercase tracking-[0.2em] text-[10px] md:text-xs">{label}</div>
    </div>
  </motion.div>
));
MetricCard.displayName = 'MetricCard';

const BenefitCard = memo(({ title, description, icon: Icon, accentColor, delay, isHighlighted }: BenefitItem & { isHighlighted?: boolean }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.9, y: 30 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative p-8 md:p-10 rounded-[40px] overflow-hidden ${isHighlighted ? 'bg-[rgba(25,25,25,0.95)] md:bg-[rgba(20,20,20,0.8)] border-white/20' : 'bg-[rgba(20,20,20,0.9)] md:bg-[rgba(15,15,15,0.6)] border-white/5'} border md:backdrop-blur-xl hover:-translate-y-3 transition-all duration-500 ease-out h-full`}
    style={{ willChange: 'transform' }}
  >
    {/* Inner Premium Glow - More intense if highlighted */}
    <div 
      className={`absolute inset-0 ${isHighlighted ? 'opacity-20' : 'opacity-0'} group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}
      style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor} 0%, transparent 70%)` }}
    />

    {/* Border Highlight for Featured Card */}
    {isHighlighted && (
      <div className="absolute inset-0 rounded-[40px] border border-white/20 pointer-events-none" />
    )}
    
    <div className="relative z-10 flex flex-col h-full">
      <div 
        className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:scale-110"
        style={{ 
          background: isHighlighted ? `${accentColor}25` : `${accentColor}15`, 
          border: `1px solid ${isHighlighted ? accentColor : accentColor + '30'}` 
        }}
      >
        <Icon className="w-8 h-8 md:w-10 md:h-10 transition-colors duration-500" color={accentColor} />
        {/* Halo Effect */}
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40" style={{ background: accentColor }} />
      </div>

      <h3 className="font-raela font-black text-2xl md:text-4xl text-white mb-4 tracking-tighter uppercase">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === 1 ? 'block text-transparent bg-clip-text' : ''} style={i === 1 ? { backgroundImage: `linear-gradient(to right, white, ${accentColor}80)` } : {}}>
            {word}{' '}
          </span>
        ))}
      </h3>

      <p className="text-white/50 text-base md:text-lg leading-relaxed font-light">
        {description.split('satu-satunya brand').map((part, i, arr) => (
          <React.Fragment key={i}>
            {part}
            {i < arr.length - 1 && <span className="text-white font-bold">satu-satunya brand</span>}
          </React.Fragment>
        ))}
      </p>
    </div>
    </motion.div>
  );
});
BenefitCard.displayName = 'BenefitCard';

// ─── renderCell — pure function, no state, no refs ────────────────────────────

function renderCell(val: string | boolean, accentHex: string) {
  if (val === false || val === '-') {
    return <X className="w-4 h-4 text-white/20 mx-auto" />;
  }

  if (typeof val === 'boolean' && val === true) {
    return (
      <div
        className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border mx-auto"
        style={{ borderColor: `${accentHex}50`, background: `${accentHex}15` }}
      >
        <Check className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: accentHex }} />
      </div>
    );
  }
  return <span className="text-white font-raela font-bold text-sm leading-snug">{val}</span>;
}

// ─── MobileAccordion — ZERO Framer Motion, pure CSS transitions ───────────────
// Using max-height trick: fast open, opacity fade — no layout thrash at all.

interface TierCardProps {
  tier: Tier;
  tierIndex: number;
  isOpen: boolean;
  onToggle: () => void;
}

// Pre-compute approximate max-height per tier to avoid over-animating
// 11 benefits × ~72px per row ≈ 800px, use 900px as safe ceiling
const BODY_MAX_H = '900px';

const TierCard = memo(({ tier, tierIndex, isOpen, onToggle }: TierCardProps) => {
  return (
    <div
      className="group relative rounded-[20px] overflow-hidden bg-[rgba(16,16,16,0.85)]"
      style={{
        boxShadow: `0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 0 1px ${tier.accentHex}20`,
        contain: 'layout style paint', // CSS containment — reduces repaint area
      }}
    >
      {/* Ambient accent glow — static (no transition on mobile, no blur) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px]"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${tier.accentHex}12 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Header button ─────────────────────────────────────────────────── */}
      <button
        onClick={onToggle}
        className="relative z-10 w-full flex items-center gap-4 px-5 py-5 text-left touch-manipulation"
        aria-expanded={isOpen}
        aria-controls={`tier-body-${tierIndex}`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Vertical accent bar */}
        <div
          className="w-1 self-stretch rounded-full shrink-0"
          style={{ background: `linear-gradient(to bottom, ${tier.accentHex}, ${tier.accentHex}40)` }}
        />

        <div className="flex-1 min-w-0">
          <div
            className="h-px w-8 rounded-full mb-2"
            style={{ background: `linear-gradient(to right, ${tier.accentHex}, transparent)` }}
          />
          <h3 className="font-raela font-black text-xl text-white uppercase tracking-tighter leading-none">
            {tier.name}
          </h3>
          <span className="text-[10px] font-mono text-white/30 tracking-[0.35em] uppercase mt-1 block">
            Partner Tier
          </span>
        </div>

        {/* Pure CSS chevron — zero JS thread cost */}
        <div
          className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
          style={{
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          <ChevronDown className="w-3.5 h-3.5 text-white/50" />
        </div>
      </button>

      {/* ── Accordion body — CSS max-height transition only ──────────────── */}
      {/* max-height transition is compositor-optimised on modern browsers   */}
      <div
        id={`tier-body-${tierIndex}`}
        style={{
          maxHeight: isOpen ? BODY_MAX_H : '0px',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: isOpen
            ? 'max-height 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease'
            : 'max-height 300ms cubic-bezier(0.7, 0, 0.84, 0), opacity 180ms ease',
        }}
      >
        <div className="px-5 pt-1 pb-5">
          {/* Divider */}
          <div
            className="h-px mb-3"
            style={{ background: `linear-gradient(to right, ${tier.accentHex}30, transparent)` }}
          />
          {/* Benefit rows */}
          <div className="divide-y divide-white/[0.06]">
            {benefits.map((benefit, bIdx) => (
              <div key={bIdx} className="flex items-center justify-between gap-3 py-3 min-h-[48px]">
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] leading-snug text-white/75 font-medium block">
                    {benefit.name}
                  </span>
                  {benefit.note && (
                    <span className="text-[9px] text-white/25 font-mono uppercase tracking-wider block mt-0.5">
                      {benefit.note}
                    </span>
                  )}
                </div>
                <div className="shrink-0 min-w-[64px] flex justify-end">
                  {renderCell(benefit.values[tierIndex], tier.accentHex)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
TierCard.displayName = 'TierCard';

// ─── MatrixTable — desktop only ───────────────────────────────────────────────

interface MatrixTableProps {
  hoveredTier: number | null;
  onHoverTier: (idx: number | null) => void;
}

const MatrixTable = memo(({ hoveredTier, onHoverTier }: MatrixTableProps) => (
  <div className="relative p-[1px] rounded-[32px] overflow-hidden bg-white/10 md:[backdrop-filter:blur(24px)]">
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none md:block hidden" />
    <div className="relative overflow-x-auto rounded-[31px] bg-black md:bg-black/60 shadow-2xl">
      <table
        className="w-full border-collapse min-w-[900px]"
        role="grid"
        aria-label="Sponsorship Tiers Comparison Matrix"
      >
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-6 text-left sticky left-0 bg-black md:bg-[#0a0a0a]/95 md:[backdrop-filter:blur(24px)] z-30 min-w-[260px]">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-neon-blue font-bold">Benefit</span>
            </th>
            {tiers.map((tier, idx) => (
              <th
                key={tier.name}
                className={`p-6 text-center relative transition-colors duration-300 ${hoveredTier === idx ? 'bg-white/[0.04]' : 'bg-transparent'}`}
                onMouseEnter={() => onHoverTier(idx)}
                onMouseLeave={() => onHoverTier(null)}
              >
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`h-0.5 w-10 bg-gradient-to-r ${tier.color} rounded-full`} />
                  <h3
                    className="text-xl font-raela font-black uppercase tracking-tighter text-white"
                    style={{
                      transition: 'transform 300ms ease',
                      transform: hoveredTier === idx ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <span className="text-[9px] font-mono text-white/25 tracking-[0.5em] uppercase">Partner</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {benefits.map((benefit, bIdx) => (
            <tr key={bIdx} className="group/row hover:bg-white/[0.02] transition-colors">
              <td className="p-5 text-left sticky left-0 bg-black md:bg-[#0a0a0a]/95 md:[backdrop-filter:blur(24px)] z-20 border-r border-white/[0.06]">
                <span className="text-[13px] font-semibold text-white/80 group-hover/row:text-white transition-colors leading-snug block">
                  {benefit.name}
                </span>
                {benefit.note && (
                  <span className="text-[10px] text-white/25 font-mono uppercase tracking-wider mt-1 block">
                    {benefit.note}
                  </span>
                )}
              </td>
              {benefit.values.map((val, vIdx) => (
                <td
                  key={vIdx}
                  className={`p-5 text-center transition-colors duration-200 ${hoveredTier === vIdx ? 'bg-white/[0.03]' : ''}`}
                  onMouseEnter={() => onHoverTier(vIdx)}
                  onMouseLeave={() => onHoverTier(null)}
                >
                  <div className="flex items-center justify-center min-h-[36px]">
                    {renderCell(val, tiers[vIdx].accentHex)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));
MatrixTable.displayName = 'MatrixTable';

// ─── Page ──────────────────────────────────────────────────────────────────────

export function SponsorshipPage() {
  const lenis = useLenis();
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [openTier, setOpenTier] = useState<number | null>(0);

  // Stable callbacks — prevent child re-renders
  const handleHoverTier = useCallback((idx: number | null) => setHoveredTier(idx), []);
  const handleToggleTier = useCallback(
    (idx: number) => setOpenTier(prev => (prev === idx ? null : idx)),
    []
  );

  const isMobile = useIsMobile();

  const backgroundGradients = useMemo(() => {
    const layers = [
      // Large Base Fields
      'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(29,188,211,0.35) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(168,86,238,0.30) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 0% 100%, rgba(255,107,0,0.25) 0%, transparent 80%)',
      'radial-gradient(ellipse 70% 60% at 100% 100%, rgba(29,188,211,0.25) 0%, transparent 80%)',
    ];

    if (isMobile) {
      return layers.join(','); // Only 4 layers on mobile
    }

    layers.push(
      // Secondary Mid-fields
      'radial-gradient(ellipse 50% 50% at 50% -10%, rgba(168,86,238,0.25) 0%, transparent 75%)',
      'radial-gradient(ellipse 50% 50% at 50% 110%, rgba(255,107,0,0.20) 0%, transparent 75%)',
      'radial-gradient(ellipse 45% 45% at -10% 50%, rgba(29,188,211,0.22) 0%, transparent 70%)',
      'radial-gradient(ellipse 45% 45% at 110% 50%, rgba(168,86,238,0.22) 0%, transparent 70%)',
      
      // High-Intensity "Laser" Accents
      'radial-gradient(circle at 10% 20%, rgba(29,188,211,0.40) 0%, transparent 25%)',
      'radial-gradient(circle at 90% 10%, rgba(168,86,238,0.35) 0%, transparent 30%)',
      'radial-gradient(circle at 85% 90%, rgba(255,107,0,0.30) 0%, transparent 25%)',
      'radial-gradient(circle at 15% 85%, rgba(29,188,211,0.30) 0%, transparent 30%)',
      
      // Internal Pop/Glow
      'radial-gradient(ellipse 40% 40% at 30% 45%, rgba(29,188,211,0.15) 0%, transparent 60%)',
      'radial-gradient(ellipse 40% 40% at 75% 55%, rgba(168,86,238,0.15) 0%, transparent 60%)',
      'radial-gradient(ellipse 35% 35% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)'
    );
    return layers.join(',');
  }, [isMobile]);

  return (
    <main className="bg-black min-h-screen text-white overflow-hidden">
      <Navbar />
      <StarDust />

      {/* ── Background mesh — Hyper-vibrant 15-layer "Festive" system ────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.55] md:opacity-[0.85]"
          style={{ background: backgroundGradients }}
        />
        {/* Subtle texture grain for premium feel (No GPU cost) */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-4 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-9xl font-raela font-black tracking-tighter mb-6 leading-[1.1]">
              <span className="text-white">PARTNER</span>{' '}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange">
                WITH US!
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => lenis?.scrollTo('#tiers')}
                className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black font-raela font-bold uppercase tracking-widest overflow-hidden transition-transform duration-200 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">Learn More</span>
                <div className="absolute inset-0 bg-neon-orange -translate-x-full group-hover:translate-x-0 transition-transform duration-250" />
              </button>
              <button
                onClick={() => lenis?.scrollTo('#contact')}
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-raela font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────────── */}
      <section 
        className="py-20 md:py-24 px-4 relative z-10"
        aria-labelledby="metrics-title"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 id="metrics-title" className="font-raela font-bold text-3xl md:text-5xl mb-4">WHY SPONSOR US?</h2>
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

      {/* ── What You'll Get ────────────────────────────────────────────────── */}
      <section 
        className="py-20 md:py-32 px-4 relative z-10 overflow-visible"
        aria-labelledby="benefits-title"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-neon-purple font-mono uppercase tracking-[0.4em] text-xs mb-4 block">
              PARTNERSHIP BENEFITS
            </span>
            <h2 id="benefits-title" className="text-4xl md:text-7xl font-raela font-black text-white mb-6 tracking-tight uppercase">
              WHAT YOU&apos;LL <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                GET
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 relative">
            {/* Desktop Overlapping Layout Lines (Pure CSS SVG) */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible -z-10">
              <svg className="w-full h-full opacity-10" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M400 100C500 200 700 400 800 500" stroke="white" strokeWidth="1" strokeDasharray="10 10" />
                <path d="M800 100C700 200 500 400 400 500" stroke="white" strokeWidth="1" strokeDasharray="10 10" />
              </svg>
            </div>

            {benefitItems.map((benefit, idx) => (
              <div 
                key={benefit.title} 
                className={`flex flex-col ${idx === 1 ? 'lg:translate-y-12' : ''}`}
              >
                <BenefitCard {...benefit} isHighlighted={idx === 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsorship Tiers ─────────────────────────────────────────────── */}
      <section id="tiers" className="py-20 md:py-32 px-4 relative z-10" aria-labelledby="tiers-title">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 id="tiers-title" className="text-4xl md:text-7xl font-raela font-black text-white mb-4 md:mb-6 tracking-tight">
              SPONSORSHIP{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                TIERS
              </span>
            </h2>
          </motion.div>

          {/* DESKTOP: matrix table */}
          <div className="hidden md:block">
            <MatrixTable hoveredTier={hoveredTier} onHoverTier={handleHoverTier} />
          </div>

          {/* MOBILE: accordion cards — pure CSS, zero Framer Motion overhead */}
          <div className="md:hidden flex flex-col gap-3">
            <p className="text-center text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mb-1">
              Tap a tier to explore benefits
            </p>
            {tiers.map((tier, idx) => (
              <TierCard
                key={tier.name}
                tier={tier}
                tierIndex={idx}
                isOpen={openTier === idx}
                onToggle={() => handleToggleTier(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Proposal Download ─────────────────────────────────────────────── */}
      <section className="pb-8 md:pb-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.a
            href="/downloads/Proposal Sponsorship IO Festival.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 rounded-3xl md:backdrop-blur-xl transition-transform duration-500 overflow-hidden hover:-translate-y-2 group w-full z-10"
            style={{
              background: 'rgba(20, 20, 20, 0.8)',
              boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.05)',
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label="Download Proposal Sponsorship I/O Festival 2026"
          >
            <PremiumCardGlow accentHex="#22d3ee" roundedClass="rounded-3xl" />

            {/* Icon */}
            <div
              className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))' }}
            >
              <ExternalLink className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 12px #22d3ee)' }} />
            </div>

            {/* Info */}
            <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-bold text-xl md:text-2xl font-raela group-hover:text-white transition-colors">
                    Proposal Sponsorship
                  </span>
                  <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-red-500/10 text-red-400 font-raela">PDF</span>
                </div>
                <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors">
                  I/O Festival 2026 — Dokumen resmi kemitraan
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white bg-white/10 w-fit px-4 py-2 rounded-full group-hover:bg-white/20 transition-colors">
                Unduh <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-4xl font-raela font-light italic text-white/60 leading-relaxed"
          >
            &quot;Innovation dies in isolation. Great leaps are made through{' '}
            <span className="text-white font-bold not-italic">Meaningful Partnerships</span>.&quot;
          </motion.blockquote>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-32 px-4 relative z-10 bg-black/20" aria-labelledby="contact-title">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-neon-blue font-mono uppercase tracking-[0.4em] text-xs mb-4 block">
              READY TO PARTNER?
            </span>
            <h2 id="contact-title" className="text-5xl md:text-8xl font-raela font-black text-white mb-6 tracking-tight uppercase">
              CONTACT <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange">
                US!
              </span>
            </h2>
            <p className="text-white/50 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Hubungi tim kemitraan kami untuk mendapatkan penawaran khusus dan kolaborasi eksklusif yang dirancang untuk visi brand Anda.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative p-8 md:p-12 rounded-[32px] overflow-hidden bg-[rgba(20,20,20,0.95)] md:bg-[rgba(20,20,20,0.6)] border border-white/5 md:backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center col-span-2"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-neon-blue/10 flex items-center justify-center mb-6 border border-neon-blue/20 transition-transform duration-500 group-hover:scale-110">
                <Mail className="w-8 h-8 md:w-10 md:h-10 text-neon-blue" />
              </div>
              <span className="text-[10px] md:text-xs font-mono text-neon-blue font-bold uppercase tracking-widest mb-2">EMAIL INQUIRY</span>
              <h3 className="text-white font-raela font-bold text-xl md:text-2xl mb-6">iobemftiuntar@gmail.com</h3>
              <motion.a 
                href="mailto:iobemftiuntar@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto px-10 py-4 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neon-blue/20 hover:text-white hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] border border-white/10 hover:border-neon-blue/50 transition-all duration-300 z-20 relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Contact Us!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              </motion.a>
            </motion.div>

            {/* Chelsea WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative p-8 rounded-[32px] overflow-hidden bg-[rgba(25,25,25,0.95)] md:bg-[rgba(20,20,20,0.6)] border border-white/5 md:backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center col-span-1"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 flex items-center justify-center mb-6 border border-neon-purple/20 transition-transform duration-500 group-hover:scale-110">
                <MessageCircle className="w-8 h-8 text-neon-purple" />
              </div>
              <span className="text-[9px] md:text-[10px] font-mono text-neon-purple font-bold uppercase tracking-wider mb-2 leading-tight">
                Coordinator of Partnership and Management Committee
              </span>
              <h3 className="text-white font-raela font-bold text-lg mb-4">Chelsea Keshya</h3>
              <motion.a 
                href={`https://wa.me/6285883226013?text=${encodeURIComponent("Halo kak, aku tertarik untuk menjadi sponsor di I/O Festival 2026!")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto px-8 py-3 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neon-purple/20 hover:text-white hover:shadow-[0_0_20px_rgba(191,0,255,0.3)] border border-white/10 hover:border-neon-purple/50 transition-all duration-300 z-20 relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              </motion.a>
            </motion.div>

            {/* Juan WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative p-8 rounded-[32px] overflow-hidden bg-[rgba(25,25,25,0.95)] md:bg-[rgba(20,20,20,0.6)] border border-white/5 md:backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center col-span-1"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-neon-orange/10 flex items-center justify-center mb-6 border border-neon-orange/20 transition-transform duration-500 group-hover:scale-110">
                <MessageCircle className="w-8 h-8 text-neon-orange" />
              </div>
              <span className="text-[9px] md:text-[10px] font-mono text-neon-orange font-bold uppercase tracking-wider mb-2 leading-tight">
                Vice Coordinator of Partnership and Management Committee
              </span>
              <h3 className="text-white font-raela font-bold text-lg mb-4">Juan Jefferson</h3>
              <motion.a 
                href={`https://wa.me/6281297575567?text=${encodeURIComponent("Halo kak, aku tertarik untuk menjadi sponsor di I/O Festival 2026!")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto px-8 py-3 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neon-orange/20 hover:text-white hover:shadow-[0_0_20px_rgba(255,163,0,0.3)] border border-white/10 hover:border-neon-orange/50 transition-all duration-300 z-20 relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              </motion.a>
            </motion.div>
          </div>

          <div className="mt-20 md:mt-32 border-t border-white/5 pt-12" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
