'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users, Wallet, Trophy, ExternalLink, Landmark, Recycle, GraduationCap, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { getCompetition } from '@/lib/competitions';
import { UIUXIcon } from '@/components/ui/icons/UIUXIcon';
import { WebDevIcon } from '@/components/ui/icons/WebDevIcon';
import { BusinessCaseIcon } from '@/components/ui/icons/BusinessCaseIcon';
import dynamic from 'next/dynamic';
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });
import Image from 'next/image';
import { Countdown } from '@/components/sections/Countdown';
import { useState, useEffect } from 'react';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';
import { useDownloadInteraction } from '@/hooks/useDownloadInteraction';

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

function SmallDocCard({ doc, regStatus, accentHex, badgeColor }: { doc: any, regStatus: string, accentHex: string, badgeColor: string }) {
    const { status, handleDownload } = useDownloadInteraction();
    const isLocked = doc.comingSoon && regStatus === 'upcoming';

    if (isLocked) {
        return (
            <div
                className="relative flex flex-col items-start gap-4 p-5 rounded-2xl md:backdrop-blur-xl overflow-hidden w-full z-10 opacity-50 cursor-not-allowed"
                style={{
                    background: 'rgba(20, 20, 20, 0.6)',
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${accentHex}, transparent)`, opacity: 0.05 }} />

                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))` }}>
                    <ExternalLink className="w-5 h-5 text-white/30" />
                </div>

                <div className="relative z-10 flex-1 w-full flex flex-col h-full">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white/50 font-bold text-base font-raela">{doc.title}</span>
                    </div>
                    <span className="text-white/30 text-xs block mb-4">{doc.desc}</span>
                    <div className="mt-auto flex items-center justify-between w-full">
                        <span className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded-md bg-white/5 text-white/30 font-raela`}>
                            {doc.type}
                        </span>
                        <span className="text-[9px] font-raela font-black uppercase tracking-widest text-white/50 bg-white/10 px-2 py-1 rounded-md border border-white/5">
                            Wait
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const downloadAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (doc.type !== 'LINK') {
            handleDownload(e, doc.href);
        }
    };

    return (
        <a
            href={doc.href}
            download={doc.type !== 'LINK'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={downloadAction}
            className={`relative flex flex-col items-start gap-4 p-5 rounded-2xl md:backdrop-blur-xl transition-transform duration-500 overflow-hidden group w-full z-10 ${status === 'idle' ? 'hover:-translate-y-2' : ''}`}
            style={{
                background: 'rgba(20, 20, 20, 0.6)',
                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <PremiumCardGlow accentHex={accentHex} roundedClass="rounded-2xl" />

            <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg border border-white/5 ${status === 'idle' ? 'group-hover:scale-110' : ''}`} style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                {status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" style={{ filter: 'drop-shadow(0 0 8px #34d399)' }} />
                ) : status === 'loading' ? (
                    <Loader2 className="w-5 h-5 text-white/50 animate-spin" />
                ) : (
                    <ExternalLink className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />
                )}
            </div>

            <div className="relative z-10 flex-1 w-full flex flex-col h-full">
                <span className="text-white font-bold block text-base mb-1 group-hover:text-white transition-colors font-raela">{doc.title}</span>
                <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors block mb-4">{doc.desc}</span>
                <div className="mt-auto flex items-center justify-between w-full">
                    <span className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded-md ${badgeColor} font-raela`}>
                        {doc.type}
                    </span>
                    <div 
                        className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md transition-colors ${
                            status === 'success'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : status === 'loading'
                                ? 'bg-white/5 text-white/50 cursor-wait'
                                : 'bg-white/10 group-hover:bg-white/20'
                        }`}
                    >
                        {status === 'idle' && <ArrowRight className="w-3 h-3 group-hover:-rotate-45 transition-transform" />}
                        {status === 'loading' && <Loader2 className="w-3 h-3 animate-spin" />}
                        {status === 'success' && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                </div>
            </div>
        </a>
    );
}

export function CompetitionPage({ slug }: { slug: string }) {
    const [currentPhase, setCurrentPhase] = useState(0);
    const regStatus = useRegistrationStatus();
    const data = getCompetition(slug);
    const { status: mainRulebookStatus, handleDownload: handleMainRulebookDownload } = useDownloadInteraction();
    
    // Auto-calculate relevant live timeline segment utilizing client-side hydration bypassing server mismatch
    useEffect(() => {
        if (!data) return;
        const calculateInitialPhase = () => {
            const now = new Date();
            // Matching standard timeline milestones with start times
            const stages = [
                new Date('2026-03-15T00:00:00+07:00'), // Early Bird
                new Date('2026-04-06T00:00:00+07:00'), // Regular
                new Date('2026-04-30T00:00:00+07:00'), // Close Registration
                new Date('2026-05-01T00:00:00+07:00'), // Preliminary
                new Date('2026-05-13T00:00:00+07:00'), // Finalist Announce
                new Date('2026-06-04T00:00:00+07:00'), // Final & Awarding
            ];
            let phase = 0;
            for (let i = 0; i < stages.length; i++) {
                if (now >= stages[i]) {
                    phase = i;
                } else {
                    break;
                }
            }
            setCurrentPhase(phase);
        };

        // Delay execution slightly to bypass strict synchronous state update linter
        const timeoutId = setTimeout(calculateInitialPhase, 0);
        const interval = setInterval(calculateInitialPhase, 1000 * 60 * 60);
        return () => {
            clearTimeout(timeoutId);
            clearInterval(interval);
        };
    }, [data]);

    if (!data) return null;
    
    // Select icon based on slug to avoid serialization issues with functions passed from server data
    const Icon = data.slug === 'ui-ux' ? UIUXIcon : 
                 data.slug === 'web-dev' ? WebDevIcon : 
                 BusinessCaseIcon;

    const timelineStages = [
        { date: '15 Mar - 5 Apr', label: 'Early Bird' },
        { date: '6 - 30 Apr', label: data.slug === 'business-case' ? 'Regular & Case Release' : 'Regular' },
        { date: '30 Apr', label: 'Close Registration' },
        { date: '1 - 10 May', label: 'Preliminary' },
        { date: '13 May', label: 'Finalist' },
        { date: '4 - 5 Jun', label: 'Final & Awarding' },
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'Home',
                        'item': 'https://iofest.com/'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': 'Kompetisi',
                        'item': 'https://iofest.com/kompetisi'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': data.title,
                        'item': `https://iofest.com/kompetisi/${data.slug}`
                    }
                ]
            },
            {
                '@type': 'Event',
                'name': `${data.title} - I/O FESTIVAL 2026`,
                'description': data.description,
                'startDate': '2026-03-01T08:00:00+07:00',
                'endDate': '2026-06-30T18:00:00+07:00',
                'eventAttendanceMode': 'https://schema.org/MixedEventAttendanceMode',
                'eventStatus': 'https://schema.org/EventScheduled',
                'location': {
                    '@type': 'Place',
                    'name': 'Universitas Tarumanagara',
                    'address': {
                        '@type': 'PostalAddress',
                        'streetAddress': 'Jl. Letjen S. Parman No.1',
                        'addressLocality': 'Jakarta Barat',
                        'postalCode': '11440',
                        'addressRegion': 'DKI Jakarta',
                        'addressCountry': 'ID'
                    }
                },
                'image': ['https://iofest.com/og-image.jpg'],
                'organizer': {
                    '@type': 'Organization',
                    'name': 'BEM FTI UNTAR',
                    'url': 'https://bemftiuntar.com'
                },
                'offers': data.details.fee.map(fee => ({
                    '@type': 'Offer',
                    'name': fee.type,
                    'price': fee.regular.replace(/[^0-9]/g, '') || '0',
                    'priceCurrency': 'IDR',
                    'availability': 'https://schema.org/InStock',
                    'validFrom': '2026-03-01T08:00:00+07:00'
                }))
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <StarDust />
            {/* Page background — Hyper-vibrant 15-layer "Festive" system (Pure CSS) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
                <div
                    className="absolute inset-0 opacity-55 md:opacity-[0.85]"
                    style={{
                        background: `
                            /* Large Base Fields */
                            radial-gradient(ellipse 70% 60% at 0% 0%,       ${data.accentHex}40 0%, transparent 80%),
                            radial-gradient(ellipse 70% 60% at 100% 100%,  rgba(168,86,238,0.35) 0%, transparent 80%),
                            radial-gradient(ellipse 70% 60% at 100% 0%,    ${data.accentHex}30 0%, transparent 80%),
                            radial-gradient(ellipse 70% 60% at 0% 100%,    rgba(255,107,0,0.30) 0%, transparent 80%),
                            
                            /* Secondary Mid-fields */
                            radial-gradient(ellipse 50% 50% at 50% -10%,   rgba(29,188,211,0.25) 0%, transparent 75%),
                            radial-gradient(ellipse 50% 50% at 50% 110%,   rgba(168,86,238,0.25) 0%, transparent 75%),
                            radial-gradient(ellipse 45% 45% at -15% 50%,   ${data.accentHex}25 0%, transparent 70%),
                            radial-gradient(ellipse 45% 45% at 115% 50%,   rgba(255,107,0,0.25) 0%, transparent 70%),
                            
                            /* High-Intensity "Laser" Accents */
                            radial-gradient(circle at 12% 25%,             ${data.accentHex}45 0%, transparent 20%),
                            radial-gradient(circle at 88% 15%,             rgba(168,86,238,0.40) 0%, transparent 25%),
                            radial-gradient(circle at 82% 85%,             rgba(255,107,0,0.35) 0%, transparent 20%),
                            radial-gradient(circle at 18% 75%,             rgba(29,188,211,0.35) 0%, transparent 25%),
                            
                            /* Internal Pop/Glow */
                            radial-gradient(ellipse 40% 40% at 35% 40%,    rgba(29,188,211,0.18) 0%, transparent 60%),
                            radial-gradient(ellipse 40% 40% at 65% 60%,    rgba(168,86,238,0.18) 0%, transparent 60%),
                            radial-gradient(ellipse 35% 35% at 50% 50%,    rgba(255,255,255,0.08) 0%, transparent 50%)
                        `
                    }}
                />
                {/* Desktop-only floating PNG elements */}
                <div
                    className="absolute -top-20 -right-20 w-100 h-100 opacity-40 max-md:hidden transform-gpu"
                    style={{ animation: 'native-float-1 10s ease-in-out infinite' }}
                >
                    <Image src="/assets/element/ELEMEN 3.png" alt="" width={400} height={400} className="object-contain" />
                </div>
                <div
                    className="absolute top-1/2 -left-32 w-87.5 h-87.5 opacity-30 max-md:hidden transform-gpu"
                    style={{ animation: 'native-float-2 15s ease-in-out infinite 2s' }}
                >
                    <Image src="/assets/element/ELEMEN 2.png" alt="" width={350} height={350} className="object-contain" />
                </div>
                <div
                    className="absolute bottom-[-10%] right-[10%] w-125 h-125 max-md:hidden transform-gpu"
                    style={{ animation: 'native-flare 8s ease-in-out infinite' }}
                >
                    <Image src="/assets/element/ELEMEN FLARE 1.png" alt="" width={500} height={500} className="object-contain" />
                </div>
                {/* Texture Grain */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>

            <div className="pt-28 pb-20 px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Visible Breadcrumbs for SEO & UX */}
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8 flex items-center gap-2 text-[10px] font-raela font-bold uppercase tracking-[0.2em] text-white/30"
                        aria-label="Breadcrumb navigation"
                    >
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="opacity-20">/</span>
                        <span className="text-white/10">Kompetisi</span>
                        <span className="opacity-20">/</span>
                        <span className="text-white/60 tracking-normal capitalize">{data.slug.replace('-', ' ')}</span>
                    </motion.nav>

                    {/* Premium Performant Back Button */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                        <Link
                            href="/"
                            className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/20 text-xs font-raela font-bold tracking-[0.1em] uppercase transition-colors duration-300 ease-out mb-12 w-fit overflow-hidden transform-gpu"
                            style={{ boxShadow: '0 8px 32px -10px rgba(0,0,0,0.5)' }}
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10" />
                            <span className="relative z-10 font-raela">Back</span>

                            {/* Glowing Theme Accent - Animated entirely via Opacity to bypass Layout Recalculation on Mobile CPU */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0"
                                style={{ background: `linear-gradient(90deg, transparent, ${data.accentHex || '#fff'}, transparent)` }}
                            />
                        </Link>
                    </motion.div>

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 shrink-0">
                                <Icon className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                            </div>
                            <div>
                                <h1 className="font-raela font-black text-4xl md:text-5xl text-white">{data.title}</h1>
                            </div>
                        </div>
                        <p className="text-white/40 text-lg font-mono italic">{data.tagline}</p>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <p className="text-white/70 text-lg leading-relaxed">{data.description}</p>
                    </motion.div>

                    {/* Prominent High-Contrast Countdown Tracker */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.11 }}
                        className="mb-12 w-full font-raela"
                    >
                        <Countdown accentColor={data.accentHex} />
                    </motion.div>

                    {/* Info Grid (Summary) - NEW REDESIGN */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="flex flex-col gap-6 mb-12"
                    >
                        {/* Top Tier: Pendaftaran (Full Width) */}
                        <div
                            className="group relative p-6 md:p-8 rounded-3xl md:backdrop-blur-xl transition-all duration-500 overflow-hidden z-10 w-full border border-white/5"
                            style={{
                                background: 'rgba(20, 20, 20, 0.6)',
                                boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                            }}
                        >
                            <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-3xl" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-xl border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <Wallet className="w-8 h-8 text-white" style={{ filter: `drop-shadow(0 0 12px ${data.accentHex})` }} />
                                    </div>
                                    <h3 className="text-white/80 text-sm font-raela uppercase tracking-[0.1em] mb-0.5 font-black">Biaya Pendaftaran</h3>
                                    <p className="text-white/50 text-xs font-raela uppercase tracking-wider font-bold">Per Tim</p>
                                </div>

                                <div className={`flex-1 ${Array.isArray(data.details.fee) && data.details.fee.length === 1 ? 'flex justify-center md:justify-end w-full' : 'grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8'}`}>
                                    {(Array.isArray(data.details.fee) ? data.details.fee : []).map((tier, idx) => (
                                        <div
                                            key={idx}
                                            className={`group/tier flex flex-col rounded-3xl relative overflow-hidden border transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.03] ${Array.isArray(data.details.fee) && data.details.fee.length === 1 ? 'w-full max-w-sm' : ''}`}
                                            style={{ borderColor: `${data.accentHex}15` }}
                                        >
                                            {/* Tier Header */}
                                            <div className="px-6 py-5 border-b border-white/5 flex justify-center items-center bg-white/[0.02]">
                                                <span className="text-white font-raela font-black uppercase tracking-[0.15em] text-lg lg:text-xl">{tier.type}</span>
                                            </div>

                                            <div className="p-6 flex flex-col items-center text-center relative">
                                                {/* Early Bird - HERO SECTION */}
                                                <div className="mb-4 w-full">
                                                    <span className="block text-xs text-white/50 uppercase tracking-[0.2em] mb-2 font-raela font-black">Early Bird</span>
                                                    <div className="relative inline-block group/price">
                                                        <span className="block font-raela font-black text-3xl lg:text-4xl tracking-tight text-white mb-1 transition-all duration-500 group-hover/tier:scale-110" style={{ color: data.accentHex }}>
                                                            {tier.early}
                                                        </span>
                                                        <div className="absolute inset-0 blur-2xl opacity-10 group-hover/tier:opacity-30 scale-150 transition-opacity pointer-events-none" style={{ backgroundColor: data.accentHex }} />
                                                    </div>
                                                </div>

                                                {/* Separator / OR */}
                                                <div className="flex items-center gap-3 w-full opacity-10 mb-4">
                                                    <div className="h-[1px] flex-1 bg-white" />
                                                    <span className="text-[8px] font-raela text-white uppercase tracking-widest">Regular Price</span>
                                                    <div className="h-[1px] flex-1 bg-white" />
                                                </div>

                                                {/* Regular - SECONDARY SECTION */}
                                                <div className="opacity-30 group-hover/tier:opacity-50 transition-all duration-500 transform group-hover/tier:translate-y-[-2px]">
                                                    <span className="block text-[8px] text-white/50 uppercase tracking-widest mb-1 font-raela">Regular</span>
                                                    <span className="block font-bold text-lg text-white/80 line-through decoration-white/30 whitespace-nowrap">
                                                        {tier.regular}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Corner Visual Accent */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none -translate-y-1/2 translate-x-1/2 rounded-full" />

                                            {/* Hover Glow Sweep */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/tier:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Anggota Tim Card */}
                            <div
                                className="group relative p-6 rounded-2xl md:backdrop-blur-md transition-all duration-500 overflow-hidden hover:-translate-y-1 border border-white/5 flex items-center gap-6"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                                }}
                            >
                                <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-2xl" />

                                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 border border-white/5 bg-white/[0.03] relative z-10">
                                    <Users className="w-7 h-7 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-white/80 text-sm font-raela uppercase tracking-[0.1em] mb-1.5 font-black">Anggota Tim</h3>
                                    <p className="text-white font-bold text-sm md:text-base leading-snug tracking-wide">Maksimal 3 Orang</p>
                                </div>
                            </div>

                            {/* Hadiah Card */}
                            <div
                                className="group relative p-6 rounded-2xl md:backdrop-blur-md transition-all duration-500 overflow-hidden hover:-translate-y-1 border border-white/5 flex items-center gap-6"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                                }}
                            >
                                <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-2xl" />

                                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 border border-white/5 bg-white/[0.03] relative z-10">
                                    <Trophy className="w-7 h-7 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-white/80 text-sm font-raela uppercase tracking-[0.1em] mb-1.5 font-black">Hadiah</h3>
                                    <p className="text-white font-bold text-sm md:text-base leading-snug tracking-wide">{data.details.prizes}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sub-Tema / Topics Section - BENTANG ACCORDION DESIGN */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mb-16 mt-20"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-sm font-raela font-bold tracking-[0.2em] text-white uppercase">
                                Sub-Tema Pilihan
                            </h2>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        {/* Premium Static Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

                            {/* Topic 1 */}
                            <div
                                className="group relative p-8 rounded-2xl md:backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full h-full"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-2xl" />

                                {/* Large Decorative Watermark Icon */}
                                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 ease-out pointer-events-none z-0">
                                    <Landmark className="w-64 h-64" style={{ color: data.accentHex }} />
                                </div>

                                {/* Content Layer */}
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon Badge */}
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-xl relative z-10 mb-10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <Landmark className="w-8 h-8 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white tracking-tight mb-4 group-hover:text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, #fff, ${data.accentHex})` }}>
                                            Good Governance & Civic Tech
                                        </h3>

                                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                                            Inovasi digital untuk memperbaiki kualitas pelayanan publik dan transparansi. Fokus pada teknologi yang memudahkan warga menyampaikan aspirasi atau mengakses layanan administrasi lebih cepat dan terukur.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Topic 2 */}
                            <div
                                className="group relative p-8 rounded-2xl md:backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full h-full"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-2xl" />

                                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 ease-out pointer-events-none z-0">
                                    <Recycle className="w-64 h-64" style={{ color: data.accentHex }} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-xl relative z-10 mb-10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <Recycle className="w-8 h-8 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white tracking-tight mb-4 group-hover:text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, #fff, ${data.accentHex})` }}>
                                            Circular Economy & Resources
                                        </h3>

                                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                                            Solusi inovatif pengelola sumber daya dan limbah yang bernilai guna. Merancang sistem yang mengubah pola konsumsi masyarakat menjadi lebih hemat energi dan ramah lingkungan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Topic 3 */}
                            <div
                                className="group relative p-8 rounded-2xl md:backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full h-full"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-2xl" />

                                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 ease-out pointer-events-none z-0">
                                    <GraduationCap className="w-64 h-64" style={{ color: data.accentHex }} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-xl relative z-10 mb-10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <GraduationCap className="w-8 h-8 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white tracking-tight mb-4 group-hover:text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, #fff, ${data.accentHex})` }}>
                                            Human Capital & Future Skills
                                        </h3>

                                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                                            Pengembangan potensi pendidikan keterampilan masa depan bagi semua kalangan. Memastikan kemajuan teknologi bisa dinikmati siapa saja dengan aksesibilitas dan inklusi yang kuat.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* Dynamic Auto-Highlighting Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-16 mt-8"
                    >
                        <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-8 font-black">Timeline</h2>

                        {/* Scrollable Container on Mobile for clean overflow without shrinking */}
                        <div className="relative w-full overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollBehavior: 'smooth' }}>
                            <div className="min-w-[700px] md:min-w-full relative py-4">
                                {/* Base Track Line */}
                                <div className="absolute top-[27px] left-[56px] right-[56px] h-[2px] bg-white/5 rounded-full z-0" />

                                {/* Dynamic Progress Tracking Line (Hardware Accelerated Width transform) */}
                                <div
                                    className="absolute top-[27px] left-[56px] h-[2px] rounded-full transition-all duration-[1500ms] ease-out origin-left z-0"
                                    style={{
                                        width: `calc((100% - 112px) * ${currentPhase / (timelineStages.length - 1)})`,
                                        backgroundColor: data.accentHex,
                                        boxShadow: `0 0 15px ${data.accentHex}80`
                                    }}
                                />

                                <div className="flex justify-between relative z-10 w-full">
                                    {timelineStages.map((item, i) => {
                                        const isPassed = i < currentPhase;
                                        const isActive = i === currentPhase;

                                        return (
                                            <div key={i} className="flex flex-col items-center w-28 shrink-0 relative group">
                                                {/* Visual Node */}
                                                <div className="relative flex items-center justify-center w-6 h-6 mb-4">
                                                    {/* Pure CSS Ping Effect for Active Phase without JS Loop Starvation */}
                                                    {isActive && (
                                                        <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-screen" style={{ backgroundColor: data.accentHex }} />
                                                    )}
                                                    {/* Target Node Circle */}
                                                    <div
                                                        className={`w-3 h-3 rounded-full transition-all duration-700 z-10 border-[2px] ${isActive ? 'scale-[1.8]' : isPassed ? 'scale-100' : 'scale-[0.8] opacity-30 shadow-none'
                                                            }`}
                                                        style={{
                                                            borderColor: (isPassed || isActive) ? data.accentHex : '#fff',
                                                            backgroundColor: isPassed ? data.accentHex : isActive ? '#000' : 'transparent',
                                                            boxShadow: isActive ? `0 0 20px ${data.accentHex}, inset 0 0 8px ${data.accentHex}` : 'none'
                                                        }}
                                                    />
                                                </div>

                                                {/* Rendered Text Values */}
                                                <span className={`font-raela text-xs font-black transition-colors duration-500 whitespace-nowrap ${isActive ? 'text-white' : isPassed ? 'text-white/80' : 'text-white/30'}`}>
                                                    {item.date}
                                                </span>
                                                <span className={`text-[10px] mt-1 transition-colors duration-500 text-center uppercase tracking-wider font-bold ${isActive ? 'text-white/90 font-bold' : isPassed ? 'text-white/50' : 'text-white/20'}`}>
                                                    {item.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Downloads Section - Redesigned */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16 block"
                    >
                        <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-6 font-black">Kelengkapan Lomba</h2>

                        <div className="flex flex-col gap-4">
                            {/* Big Rulebook Card (Full Width) */}
                            {(() => {
                                const isLocked = regStatus === 'upcoming';
                                const rb = { title: 'Rulebook', desc: 'Panduan lengkap dan aturan kompetisi', href: data.rulebookUrl || '#' };

                                return isLocked ? (
                                    <div
                                        className="relative flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 rounded-3xl md:backdrop-blur-xl overflow-hidden w-full z-10 opacity-50 cursor-not-allowed"
                                        style={{
                                            background: 'rgba(20, 20, 20, 0.6)',
                                            boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)`, opacity: 0.05 }} />

                                        <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))` }}>
                                            <ExternalLink className="w-8 h-8 text-white/30" />
                                        </div>

                                        <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-white/50 font-bold text-xl md:text-2xl font-raela">{rb.title}</span>
                                                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-white/5 text-white/30 font-raela">PDF</span>
                                                </div>
                                                <span className="text-white/30 text-sm">{rb.desc}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-raela font-black uppercase tracking-widest text-white/50 bg-white/10 w-fit px-4 py-2 rounded-full border border-white/5">
                                                Coming Soon
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href={rb.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => handleMainRulebookDownload(e, rb.href)}
                                        className={`relative flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 rounded-3xl md:backdrop-blur-xl transition-transform duration-500 overflow-hidden group w-full z-10 ${mainRulebookStatus === 'idle' ? 'hover:-translate-y-2' : ''}`}
                                        style={{
                                            background: 'rgba(20, 20, 20, 0.6)',
                                            boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-3xl" />

                                        <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg border border-white/5 ${mainRulebookStatus === 'idle' ? 'group-hover:scale-110' : ''}`} style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                            {mainRulebookStatus === 'success' ? (
                                                <CheckCircle2 className="w-8 h-8 text-emerald-400" style={{ filter: 'drop-shadow(0 0 12px #34d399)' }} />
                                            ) : mainRulebookStatus === 'loading' ? (
                                                <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
                                            ) : (
                                                <ExternalLink className="w-8 h-8 text-white" style={{ filter: `drop-shadow(0 0 12px ${data.accentHex})` }} />
                                            )}
                                        </div>

                                        <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-white font-bold text-xl md:text-2xl font-raela group-hover:text-white transition-colors">{rb.title}</span>
                                                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-red-500/10 text-red-400 font-raela">PDF</span>
                                                </div>
                                                <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors">{rb.desc}</span>
                                            </div>
                                            <div 
                                                className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white w-fit px-4 py-2 rounded-full transition-colors ${
                                                    mainRulebookStatus === 'success' 
                                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                                                        : mainRulebookStatus === 'loading'
                                                        ? 'bg-white/5 text-white/50 cursor-wait'
                                                        : 'bg-white/10 group-hover:bg-white/20'
                                                }`}
                                            >
                                                {mainRulebookStatus === 'idle' && (
                                                    <>Buka Tautan <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" /></>
                                                )}
                                                {mainRulebookStatus === 'loading' && <span className="animate-pulse">Loading...</span>}
                                                {mainRulebookStatus === 'success' && 'Berhasil!'}
                                            </div>
                                        </div>
                                    </a>
                                );
                            })()}

                            {/* 3 Smaller Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: 'Orisinalitas', desc: 'Pernyataan keaslian', href: '/downloads/LEMBAR PERNYATAAN ORISINALITAS KARYA.docx', type: 'DOCX', comingSoon: false },
                                    { title: 'Logo I/O Fest', desc: 'Aset resmi tim', href: '/downloads/logo-iofest-2026.png', type: 'PNG', comingSoon: false },
                                    { title: 'Twibbon', desc: 'Frame foto resmi', href: '#', type: 'PNG', comingSoon: true },
                                ].map((doc, idx) => {
                                    const isLocked = doc.comingSoon && regStatus === 'upcoming';

                                    const badgeColor = doc.type === 'DOCX' ? 'bg-blue-500/10 text-blue-400'
                                        : doc.type === 'PNG' ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-white/5 text-white/30';

                                    return (
                                        <SmallDocCard key={idx} doc={doc} regStatus={regStatus} accentHex={data.accentHex} badgeColor={badgeColor} />
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center border-t border-white/10 pt-12"
                    >
                        <h3 className="font-raela font-bold text-2xl text-white mb-4">Siap Berkompetisi?</h3>
                        <p className="text-white/50 mb-8">Daftarkan tim Anda hari ini. Tunjukkan kemampuan Anda pada tingkat nasional.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {regStatus === 'open' ? (
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center gap-3 bg-white text-black font-bold text-base px-8 py-4 hover:bg-white/90 transition-colors uppercase tracking-widest min-w-[200px]"
                                >
                                    DAFTAR <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <span
                                    className={`inline-flex items-center justify-center gap-3 font-bold text-base px-8 py-4 uppercase tracking-widest cursor-not-allowed min-w-[200px] ${regStatus === 'upcoming'
                                        ? 'bg-white/20 text-white/50'
                                        : 'bg-white/10 text-white/30'
                                        }`}
                                >
                                    {regStatus === 'upcoming' ? 'SEGERA DIBUKA' : 'PENDAFTARAN DITUTUP'}
                                </span>
                            )}

                            {/* Kumpulin Karya Button */}
                            <a
                                href={data.submissionUrl || '#'}
                                target={data.submissionUrl === '#' ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center gap-3 font-bold text-base px-8 py-4 uppercase tracking-widest min-w-[200px] border transition-colors ${data.submissionUrl === '#' || regStatus === 'upcoming'
                                    ? 'border-white/10 text-white/30 cursor-not-allowed bg-black/50'
                                    : 'border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-black'
                                    }`}
                            >
                                KUMPULIN KARYA <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Person - Premium Redesign */}
                    {data.contacts && data.contacts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="pt-20 pb-12"
                        >
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-4 bg-white/[0.02] border border-white/10" style={{ boxShadow: `0 0 30px ${data.accentHex}15` }}>
                                    <MessageCircle className="w-6 h-6 text-white/80" style={{ filter: `drop-shadow(0 0 10px ${data.accentHex})` }} />
                                </div>
                                <h2 className="text-3xl font-raela font-bold text-white tracking-tight">Butuh Bantuan?</h2>
                                <p className="text-white/50 text-sm mt-3 max-w-md mx-auto">
                                    Hubungi contact person cabang kompetisi ini untuk pertanyaan lebih lanjut.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                {data.contacts.map((cp, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative p-6 md:p-8 rounded-3xl md:backdrop-blur-xl border border-white/5 flex flex-col transition-transform duration-500 overflow-hidden hover:-translate-y-1"
                                        style={{
                                            background: 'rgba(20,20,20,0.6)',
                                            boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-3xl" />

                                        <div className="relative z-10 flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                                            <div>
                                                <h3 className="font-raela font-black text-xl text-white tracking-wide">{cp.name}</h3>
                                                <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold mt-1">{cp.role || 'Official CP'}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                                                <Users className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex flex-col gap-3 mt-auto">
                                            <a
                                                href={`https://wa.me/${cp.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative w-full px-4 py-3 rounded-2xl bg-white/[0.03] text-white/70 hover:text-white text-xs font-bold tracking-wider transition-all duration-300 border border-white/5 flex items-center justify-center gap-2 group/btn shadow-[0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden hover:shadow-lg"
                                                style={{ '--btn-hover-color': data.accentHex } as React.CSSProperties}
                                            >
                                                <svg className="w-4 h-4 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.154 1.599 5.96L.18 23.4l5.589-1.465a12.015 12.015 0 0 0 6.262 1.761h.005c6.645 0 12.03-5.385 12.03-12.03S18.677 0 12.031 0zm.005 21.688a9.982 9.982 0 0 1-5.093-1.385l-.365-.216-3.785.992.997-3.69-.237-.377a9.988 9.988 0 0 1-1.528-5.32c0-5.508 4.484-9.992 9.992-9.992 2.668 0 5.176 1.04 7.062 2.926A9.954 9.954 0 0 1 21.99 12.03c0 5.508-4.484 9.992-9.992 9.992v.005zm5.483-7.495c-.301-.151-1.78-.88-2.056-.98-.276-.1-.478-.15-.679.15s-.779.98-.955 1.18c-.176.2-.352.226-.653.076-.301-.151-1.272-.469-2.42-1.49-.893-.794-1.497-1.776-1.673-2.077-.176-.301-.019-.464.131-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.679-1.643-.93-2.251-.243-.591-.49-.51-.679-.52-.176-.01-.377-.01-.578-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511s1.08 2.91 1.231 3.111c.15.201 2.122 3.238 5.141 4.538.718.31 1.278.496 1.714.635.72.228 1.376.196 1.892.119.58-.087 1.78-.728 2.03-1.432.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/>
                                                </svg>
                                                <span className="relative z-10 drop-shadow-md text-[13px]">{cp.whatsapp.replace(/^62/, '0')}</span>
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"
                                                    style={{ backgroundColor: data.accentHex }}
                                                />
                                                <div
                                                    className="absolute inset-0 border-2 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                    style={{ borderColor: data.accentHex }}
                                                />
                                            </a>

                                            <a
                                                href={`https://line.me/ti/p/~${cp.line}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative w-full px-4 py-3 rounded-2xl bg-white/[0.03] text-white/70 hover:text-white text-xs font-bold tracking-wider transition-all duration-300 border border-white/5 flex items-center justify-center gap-2 group/btn shadow-[0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden hover:shadow-lg"
                                                style={{ '--btn-hover-color': data.accentHex } as React.CSSProperties}
                                            >
                                                <svg className="w-4 h-4 text-[#00C300] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.12.298.077.765.037 1.083l-.337 2.023c-.1.597-.478 2.373 2.083 1.295s13.433-7.906 13.433-14.601zM7.443 12.871H5.432c-.39 0-.707-.317-.707-.707V7.81c0-.39.317-.707.707-.707.389 0 .707.317.707.707v3.647h1.304c.39 0 .707.317.707.707 0 .39-.317.707-.707.707zm4.686-.707c0 .39-.317.707-.707.707H9.72c-.39 0-.707-.317-.707-.707V7.81c0-.39.317-.707.707-.707.389 0 .707.317.707.707v4.354zm3.626 0c0 .39-.317.707-.707.707h-1.637c-.39 0-.707-.317-.707-.707V7.81c0-.39.317-.707.707-.707.389 0 .707.317.707.707v4.354zm4.493-3.858l-1.621 3.51a.703.703 0 0 1-.639.404.708.708 0 0 1-.413-.131.706.706 0 0 1-.295-.576v-3.207c0-.39.317-.707.707-.707.389 0 .707.317.707.707v1.897l1.32-2.846a.715.715 0 0 1 .42-.376.711.711 0 0 1 .843.197c.189.215.247.513.153.784z"/>
                                                </svg>
                                                <span className="relative z-10 drop-shadow-md text-[13px]">{cp.line}</span>
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"
                                                    style={{ backgroundColor: data.accentHex }}
                                                />
                                                <div
                                                    className="absolute inset-0 border-2 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                    style={{ borderColor: data.accentHex }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
