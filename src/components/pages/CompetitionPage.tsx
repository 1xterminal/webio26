'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users, User, Wallet, Trophy, ExternalLink, Landmark, Recycle, GraduationCap, MessageCircle, Loader2, CheckCircle2, TriangleAlert, BookOpen, FileCheck, Image as ImageIcon, Download, Info } from 'lucide-react';
import { getCompetition } from '@/lib/competitions';
import { UIUXIcon } from '@/components/ui/icons/UIUXIcon';
import { WebDevIcon } from '@/components/ui/icons/WebDevIcon';
import { BusinessCaseIcon } from '@/components/ui/icons/BusinessCaseIcon';
import dynamic from 'next/dynamic';
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { Countdown } from '@/components/sections/Countdown';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';
import { useState, useEffect } from 'react';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';
import { useDownloadInteraction } from '@/hooks/useDownloadInteraction';
import { REGISTRATION_URL } from '@/lib/registration';
import { FEATURES } from '@/lib/constants';

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

            {/* Layer 3: Glowing Gradient Border Mask (Desktop Only) */}
            <div
                className={`absolute inset-0 ${roundedClass} pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 hidden md:block`}
                style={{
                    padding: '1px',
                    background: `linear-gradient(135deg, ${accentHex}90 0%, rgba(255,255,255,0.05) 100%)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />
            
            {/* Layer 3 Mobile Fallback: Standard Border */}
            <div 
                className={`absolute inset-0 ${roundedClass} pointer-events-none border opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] md:hidden`}
                style={{ borderColor: `${accentHex}60` }}
            />

            {/* Layer 4: Inner Glow & Shadow Enhancement (Desktop Only) */}
            <div
                className={`absolute inset-0 ${roundedClass} opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 pointer-events-none hidden md:block`}
                style={{ boxShadow: `inset 0 0 40px ${accentHex}15, 0 10px 40px 0 ${accentHex}25` }}
            />
        </>
    );
};

function SmallDocCard({ doc, regStatus, accentHex, badgeColor }: { doc: { title: string, desc: string, href: string, type: string, comingSoon: boolean }, regStatus: string, accentHex: string, badgeColor: string }) {
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
                    {doc.title.includes('Orisinalitas') && <FileCheck className="w-5 h-5 text-white/30" />}
                    {doc.title.includes('Twibbon') && <ImageIcon className="w-5 h-5 text-white/30" />}
                    {doc.title.includes('Logo') && (
                        <Image 
                            src="/assets/logo/logo io transparant.png" 
                            alt="Logo I/O Fest" 
                            width={24} 
                            height={24} 
                            className="object-contain opacity-30 px-1"
                        />
                    )}
                    {!doc.title.includes('Orisinalitas') && !doc.title.includes('Twibbon') && !doc.title.includes('Logo') && (
                        <ExternalLink className="w-5 h-5 text-white/30" />
                    )}
                </div>

                <div className="relative z-10 flex-1 w-full flex flex-col h-full">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white/50 font-bold text-base font-raela">{doc.title}</span>
                        {doc.title.toLowerCase().includes('rulebook') && (
                            <span className="ml-1 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/50 opacity-50">Updated!</span>
                        )}
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
            handleDownload(e);
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
                    <>
                        {doc.title.includes('Orisinalitas') && <FileCheck className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />}
                        {doc.title.includes('Twibbon') && <ImageIcon className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />}
                        {doc.title.includes('Logo') && (
                            <Image 
                                src="/assets/logo/logo io transparant.png" 
                                alt="Logo I/O Fest" 
                                width={24} 
                                height={24} 
                                className="object-contain"
                                style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }}
                            />
                        )}
                        {!doc.title.includes('Orisinalitas') && !doc.title.includes('Twibbon') && !doc.title.includes('Logo') && (
                            <ExternalLink className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />
                        )}
                    </>
                )}
            </div>

            <div className="relative z-10 flex-1 w-full flex flex-col h-full">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white font-bold block text-base group-hover:text-white transition-colors font-raela">{doc.title}</span>
                    {doc.title.toLowerCase().includes('rulebook') && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse">Updated!</span>
                    )}
                </div>
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
                        {status === 'idle' && (
                            <>
                                {doc.title.includes('Orisinalitas') || doc.title.includes('Logo') ? (
                                    <Download className="w-3" />
                                ) : doc.title.includes('Twibbon') ? (
                                    <svg className="w-3.5 h-3.5 translate-y-[0.5px]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.857 14.786l-3.257 5.643H4.429L1.171 14.786H22.857z" />
                                        <path d="M7.714 3.5l6.586 11.4h6.557L14.271 3.5H7.714z" />
                                        <path d="M1.143 14.786L7.729 3.5h6.557L7.7 14.786H1.143z" />
                                    </svg>
                                ) : (
                                    <ExternalLink className="w-3" />
                                )}
                            </>
                        )}
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
    const [isPastRevealDate, setIsPastRevealDate] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
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
                new Date('2026-03-15T00:00:00+07:00'), // Pendaftaran Gelombang Pertama
                ...(data.slug === 'business-case' ? [new Date('2026-04-09T00:00:00+07:00')] : []), // Case Release
                new Date('2026-04-20T00:00:00+07:00'), // Pendaftaran Gelombang Kedua
                new Date('2026-04-30T00:00:00+07:00'), // Batas Akhir Pendaftaran & Pengumpulan Karya
                new Date('2026-05-01T00:00:00+07:00'), // Penilaian Tahap Pertama
                new Date('2026-05-13T00:00:00+07:00'), // Pengumuman Finalis
                new Date('2026-05-15T00:00:00+07:00'), // Pertemuan Teknis Finalis
                new Date('2026-06-04T00:00:00+07:00'), // Grand Final and Awarding
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
            setIsMounted(true);
            const revealDate = new Date('2026-03-24T10:00:00+07:00');
            setIsPastRevealDate(now >= revealDate);
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
        { date: '15 Mar - 19 Apr', label: 'Early Bird' },
        ...(data.slug === 'business-case' ? [{ date: '9 Apr', label: 'Case Release' }] : []),
        { date: '20 - 30 Apr', label: 'Regular Registration' },
        { date: '30 Apr', label: 'Registration and Submission Deadline' },
        { date: '1 - 10 Mei', label: 'Penilaian Juri' },
        { date: '13 Mei', label: 'Pengumuman Finalis' },
        { date: '15 Mei', label: 'Technical Meeting Finalis' },
        { date: '4 - 5 Jun', label: 'Grand Final and Awarding' },
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
                {/* Desktop Background */}
                <div
                    className="absolute inset-0 opacity-55 md:opacity-[0.85] hidden md:block"
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
                {/* Mobile Background (Simplified to 4 layers) */}
                <div
                    className="absolute inset-0 opacity-60 md:hidden"
                    style={{
                        background: `
                            radial-gradient(ellipse 80% 80% at 0% 0%, ${data.accentHex}40 0%, transparent 70%),
                            radial-gradient(ellipse 80% 80% at 100% 100%, rgba(168,86,238,0.35) 0%, transparent 70%),
                            radial-gradient(circle at 82% 85%, rgba(255,107,0,0.35) 0%, transparent 40%),
                            radial-gradient(ellipse 45% 45% at 50% 50%, ${data.accentHex}20 0%, transparent 60%)
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
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none hidden md:block" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>

            <div className="pt-28 pb-20 px-4 relative z-10">
                <div className="max-w-3xl mx-auto">

                    {/* Premium Performant Back Button */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                        <Link
                            href="/#tracks"
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
                        <div className="flex flex-col gap-6 mb-6">

                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 shrink-0">
                                    <Icon className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="font-raela font-black text-4xl md:text-5xl text-white mb-3">{data.title}</h1>
                                {data.tags && data.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tag, idx) => (
                                            <span 
                                                key={idx} 
                                                className="px-3 py-1 rounded-full text-[10px] font-bold font-raela uppercase tracking-widest shadow-sm"
                                                style={{ 
                                                    color: data.accentHex,
                                                    backgroundColor: `${data.accentHex}15`,
                                                    border: `1px solid ${data.accentHex}40`
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="text-white/40 text-lg font-mono italic">{data.tagline}</p>
                </motion.div>

                    {/* Official Collaborator Banner (Premium Highlight Iteration 2) */}
                    {data.slug === 'business-case' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="mb-10 w-full"
                        >
                            <div className="relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden border md:backdrop-blur-md group flex flex-col md:flex-row items-center justify-between gap-8 opacity-95 hover:opacity-100 transition-all duration-700 transform-gpu z-10 bg-black/40 hover:bg-black/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                                 style={{ 
                                     borderColor: `${data.accentHex}40`,
                                 }}
                            >
                                {/* Animated Glowing Border */}
                                <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: `inset 0 0 20px ${data.accentHex}30, 0 0 20px ${data.accentHex}20` }}></div>
                                <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-[2.5rem]" />
                                
                                <div className="relative z-10 flex flex-col gap-3 max-md:text-center w-full md:w-auto">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                        <span className="text-xs font-raela font-black uppercase tracking-[0.4em] transition-colors duration-500" style={{ color: data.accentHex }}>Official Case Collaborator</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-raela font-black text-white leading-tight drop-shadow-lg max-w-2xl">
                                        {isMounted && isPastRevealDate ? 'Official Case Book of I/O Festival 2026 is Officially Released!' : 'Stay Tuned!'}
                                    </h3>
                                    {isMounted && !isPastRevealDate && <CaseRevealCountdown accentColor={data.accentHex} size="lg" showGlass={true} className="mt-4" />}
                                    <p className="text-sm md:text-base text-white/60 max-w-xl mt-1 leading-relaxed">
                                        {isMounted && isPastRevealDate ? 'Tantangan eksklusif langsung dari PT Bank Central Asia Tbk untuk menguji kemampuan bisnismu di tingkat profesional kini sudah tersedia.' : 'Tantangan eksklusif dari kolaborator rahasia untuk menguji kemampuan bisnismu di tingkat profesional.'}
                                    </p>
                                    {isMounted && isPastRevealDate && (
                                        <div className="mt-2 md:mt-4">
                                            <a
                                                href={REGISTRATION_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-raela font-bold text-sm tracking-wide text-white overflow-hidden group/btn shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-[400ms] hover:scale-105"
                                                style={{ background: `linear-gradient(135deg, ${data.accentHex} 0%, rgba(20,20,20,0) 100%)`, backgroundColor: `${data.accentHex}80` }}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span>Register Now</span>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <motion.div 
                                    className="relative z-10 shrink-0 mt-4 md:mt-0 p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 shadow-[inset_0_1px_20px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)] group-hover:bg-white/6 group-hover:border-white/20 transition-all duration-700 w-40 h-32 md:w-52 md:h-40 flex items-center justify-center overflow-hidden"
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    {isMounted && isPastRevealDate ? (
                                        <a
                                            href="https://www.instagram.com/lifeatbca/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => {
                                                sendGAEvent('event', 'click_sponsor_logo', {
                                                    sponsor_name: 'BCA',
                                                    destination: 'https://www.instagram.com/lifeatbca/',
                                                    location: 'competition_page',
                                                });
                                            }}
                                            className="relative z-20 cursor-pointer"
                                        >
                                            <Image 
                                                src="/assets/sponsors/Logo BCA_Putih.png" 
                                                alt="BCA" 
                                                width={140} 
                                                height={70} 
                                                className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 origin-center drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                            />
                                        </a>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 origin-center">
                                            <div className="w-16 h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,139,83,0.3)]">
                                                <span className="text-3xl font-bold text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">?</span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                                
                                {/* Intense Ambient Background Flare */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full blur-[100px] pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-700 transform-gpu" style={{ backgroundColor: data.accentHex }}></div>
                            </div>
                        </motion.div>
                    )}



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
                                            <div className="px-4 py-5 border-b border-white/5 flex justify-center items-center bg-white/[0.02] text-center">
                                                <span className="text-white font-raela font-black uppercase tracking-[0.1em] text-sm md:text-base lg:text-lg whitespace-nowrap">{tier.type}</span>
                                            </div>

                                            <div className="p-6 flex flex-col justify-center items-center text-center relative h-full min-h-[220px]">
                                                {tier.early.toUpperCase() === 'GRATIS' ? (
                                                    <div className="flex flex-col items-center justify-center w-full h-full">
                                                        <div className="relative inline-block group/free mt-2">
                                                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-500 blur-2xl opacity-20 group-hover/tier:opacity-40 transition-opacity duration-700 rounded-full animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />
                                                            <div className="relative group-hover/tier:scale-110 transition-transform duration-500">
                                                                <span className="block font-raela font-black text-3xl lg:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-500 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
                                                                    GRATIS
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-6 font-raela font-bold group-hover/tier:text-emerald-400/80 transition-colors">Tanpa Biaya Pendaftaran</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center w-full h-full">
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
                                                )}
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

                    {/* PPTI BCA Promo Banner */}
                    {data.slug !== 'business-case' && FEATURES.SHOW_PPTI_BCA_PROMO && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12 w-full"
                    >
                        <a
                            href="https://ppti.bca.co.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                sendGAEvent('event', 'click_ppti_bca', {
                                    location: `competition_page_${data.slug}_prize`,
                                    destination: 'https://ppti.bca.co.id/',
                                });
                            }}
                            className="group relative flex flex-col md:flex-row items-center md:items-center text-center md:text-left justify-between gap-6 p-6 md:px-10 md:py-8 rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-1 transform-gpu z-10 cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0,50,120,0.4) 0%, rgba(20,20,20,0.7) 60%, rgba(20,20,20,0.6) 100%)',
                                boxShadow: '0 12px 40px -8px rgba(0,91,170,0.3), inset 0 1px 1px rgba(255,255,255,0.08)',
                                border: '1px solid rgba(0,91,170,0.25)',
                            }}
                        >
                            {/* Glow effects */}
                            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-[80px] pointer-events-none" style={{ background: '#005baa' }} />
                            <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-700 blur-[60px] pointer-events-none" style={{ background: '#4da3ff' }} />

                            {/* Glowing border */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: 'inset 0 0 20px rgba(0,91,170,0.15), 0 0 20px rgba(0,91,170,0.1)' }} />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
                                {/* Badge and Text Container */}
                                <div className="flex flex-col items-center md:items-start gap-3 flex-1">
                                    <div className="flex flex-col items-center md:items-start gap-4">
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-raela font-normal text-white/80 leading-tight tracking-tight mb-4">
                                                Dapatkan kesempatan untuk meraih
                                                <span className="block text-3xl md:text-5xl mt-3 font-black text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #4da3ff, #80c4ff)' }}>
                                                    Beasiswa PPTI BCA
                                                </span>
                                            </h3>

                                            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0066AE]/20 border border-[#0066AE]/50 shadow-[0_0_15px_rgba(0,102,174,0.3)] ring-1 ring-[#0066AE]/30 group-hover:bg-[#0066AE]/30 group-hover:border-[#0066AE]/70 transition-all duration-500 w-fit mb-4">
                                                <TriangleAlert className="w-3.5 h-3.5 text-[#00bfff] animate-pulse" />
                                                <span className="text-[10px] sm:text-xs font-raela font-black uppercase tracking-[0.1em] text-[#00bfff]">
                                                    Khusus SMA/SMK
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center justify-center md:justify-start gap-4 opacity-100 mb-6 group/bca">
                                                <Image src="/assets/sponsors/Logo BCA_Putih.png" alt="BCA" width={72} height={32} className="object-contain relative z-10" />
                                                <div className="h-6 w-[1px] bg-white/20" />
                                                <span className="text-xs md:text-sm font-raela font-black text-[#00bfff] tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(0,191,255,0.4)]">
                                                    Official Program
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-center md:justify-start gap-1.5 text-white/40 group-hover:text-white/60 transition-colors duration-300">
                                                <Info className="w-3.5 h-3.5 shrink-0" />
                                                <span className="text-[9px] md:text-xs italic font-normal opacity-50">
                                                    * Proses seleksi beasiswa tetap menjadi kebijakan internal dari pihak BCA
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Side: CTA */}
                                <div className="flex flex-col items-center md:items-end gap-5 shrink-0 mt-4 md:mt-0">
                                    {/* Primary CTA */}
                                    <div className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-raela font-bold text-xs tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-105 transform-gpu shadow-[0_0_28px_rgba(0,91,170,0.35)] group-hover:shadow-[0_0_40px_rgba(77,163,255,0.5)]"
                                         style={{ background: 'linear-gradient(135deg, #005baa 0%, #4da3ff 100%)' }}
                                    >
                                        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                        <span className="relative z-10 flex items-center gap-2">
                                            Daftar Beasiswa
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                    )}

                    {/* Sub-Tema / Topics Section - BENTANG ACCORDION DESIGN */}
                    {data.slug !== 'business-case' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mb-16 mt-20"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-6">
                            <h2 className="text-sm font-raela font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap text-center">
                                Sub-Tema Pilihan
                            </h2>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent hidden md:block" />
                        </div>

                        <div className="w-full flex justify-center mb-10">
                            <div className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#FF8B53]/10 border border-[#FF8B53]/30 shadow-[0_0_20px_rgba(255,139,83,0.1)] text-center">
                                <TriangleAlert className="w-5 h-5 text-[#FF8B53] shrink-0" />
                                <span className="text-white font-bold tracking-wide text-sm md:text-base">
                                    Semua karya peserta <span className="text-[#FF8B53] uppercase font-black tracking-widest leading-none">WAJIB</span> memilih 1 dari 3 topik di bawah ini.
                                </span>
                            </div>
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
                    )}

                    {/* ── Impact Projection CTA ─────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-16 w-full"
                    >
                        <div className="relative group flex flex-col items-center justify-center gap-7 px-8 py-12 md:py-14 rounded-[24px] overflow-hidden text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] bg-[rgba(20,20,20,0.8)] md:bg-[rgba(20,20,20,0.4)] md:[backdrop-filter:blur(16px)] md:[-webkit-backdrop-filter:blur(16px)] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] transform-gpu">

                            {/* Gradient border mask (Desktop Only) */}
                            <div
                                className="absolute inset-0 rounded-[24px] pointer-events-none opacity-50 hidden md:block"
                                style={{
                                    padding: '1px',
                                    background: 'linear-gradient(135deg, #ff8b5380 0%, #b664fb60 50%, rgba(255,255,255,0.04) 100%)',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                }}
                            />
                            {/* Mobile Fallback Border */}
                            <div
                                className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/10 opacity-50 md:hidden"
                                style={{ borderColor: '#ff8b5340' }}
                            />

                            {/* Ambient glow — compositor-only opacity transition */}
                            <div
                                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,139,83,0.08) 0%, transparent 70%)' }}
                            />

                            {/* Text */}
                            <div className="relative z-10">
                                <p className="font-raela font-normal text-lg md:text-xl text-white/70 leading-tight mb-1">
                                    Setiap karya lomba harus memiliki
                                </p>
                                <p
                                    className="font-raela font-bold text-4xl md:text-6xl text-transparent bg-clip-text leading-tight"
                                    style={{ backgroundImage: 'linear-gradient(90deg, #ff8b53, #b664fb)' }}
                                >
                                    IMPACT PROJECTION
                                </p>
                            </div>

                            {/* CTA button */}
                            <div className="relative z-10">
                                <Link
                                    href="/impact"
                                    prefetch
                                    className="group/btn relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-raela font-bold text-base tracking-wide text-white overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 transform-gpu shadow-[0_0_28px_rgba(255,139,83,0.25)] hover:shadow-[0_0_40px_rgba(255,139,83,0.4)]"
                                >
                                    <span
                                        className="absolute inset-0"
                                        style={{ background: 'linear-gradient(135deg, #ff8b53 0%, #b664fb 100%)' }}
                                    />
                                    <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Learn More
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300 transform-gpu" />
                                    </span>
                                </Link>
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
                        <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-2 font-black">Timeline</h2>

                        {/* Scrollable Container - Horizontal on all but fits desktop */}
                        <div className="relative w-full overflow-x-auto lg:overflow-x-hidden no-scrollbar pb-6 lg:pb-12 -mx-4 px-4 md:mx-0 md:px-0">
                            <div className="min-w-[800px] lg:min-w-0 lg:w-full relative pt-10 pb-4">
                                {/* Base Track Line */}
                                <div 
                                    className="absolute top-[51px] h-[2px] bg-white/10 rounded-full z-0" 
                                    style={{ 
                                        left: `calc(100% / (${timelineStages.length} * 2))`,
                                        right: `calc(100% / (${timelineStages.length} * 2))`
                                    }}
                                />

                                {/* Dynamic Progress Tracking Line */}
                                <div
                                    className="absolute top-[51px] h-[3px] rounded-full transition-all duration-[1500ms] ease-out origin-left z-0"
                                    style={{
                                        left: `calc(100% / (${timelineStages.length} * 2))`,
                                        width: `calc((100% - (100% / ${timelineStages.length})) * ${currentPhase / (timelineStages.length - 1)})`,
                                        backgroundColor: data.accentHex,
                                        boxShadow: `0 0 20px ${data.accentHex}80`
                                    }}
                                />

                                <div className="flex justify-between relative z-10 w-full">
                                    {timelineStages.map((item, i) => {
                                        let isPassed = i < currentPhase;
                                        let isActive = i === currentPhase;
                                        
                                        const now = new Date();
                                        const isEarlyBirdStillActive = now >= new Date('2026-03-15T00:00:00+07:00') && now <= new Date('2026-04-19T23:59:59+07:00');

                                        // Decoupled logic specifically mapped to resolve Case Release / Early Bird overlap conflict
                                        if (item.label === 'Early Bird' && isEarlyBirdStillActive) {
                                            isActive = true;
                                            isPassed = false;
                                        }

                                        return (
                                            <div key={i} className="flex flex-col items-center flex-1 relative group min-w-0">
                                                {/* Visual Node */}
                                                <div className="relative flex items-center justify-center w-6 h-6 mb-4">
                                                    {isActive && (
                                                        <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-screen" style={{ backgroundColor: data.accentHex }} />
                                                    )}
                                                    <div
                                                        className={`w-3.5 h-3.5 rounded-full transition-all duration-700 z-10 border-[2px] ${isActive ? 'scale-[1.8]' : isPassed ? 'scale-100' : 'scale-[0.8] opacity-50 shadow-none'
                                                            }`}
                                                        style={{
                                                            borderColor: (isPassed || isActive) ? data.accentHex : 'rgba(255,255,255,0.2)',
                                                            backgroundColor: isPassed ? data.accentHex : isActive ? '#000' : 'transparent',
                                                            boxShadow: isActive ? `0 0 20px ${data.accentHex}, inset 0 0 8px ${data.accentHex}` : 'none'
                                                        }}
                                                    />
                                                </div>

                                                {/* Rendered Text Values */}
                                                <span className={`font-raela text-[9px] xl:text-xs font-black transition-colors duration-500 whitespace-nowrap mb-1 ${isActive ? 'text-white' : isPassed ? 'text-white/80' : 'text-white/30'}`}>
                                                    {item.date}
                                                </span>
                                                <div className={`flex items-start justify-center text-center transition-colors duration-500 line-clamp-2 px-1 ${isActive ? 'text-white/90' : isPassed ? 'text-white/50' : 'text-white/20'}`}>
                                                    <span className="text-[8px] xl:text-[10px] uppercase tracking-wider font-bold leading-tight">
                                                        {item.label}
                                                    </span>
                                                </div>
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
                        id="documents"
                    >
                        <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-6 font-black">Kelengkapan Lomba</h2>

                        <div className="flex flex-col gap-4">
                            {/* Unified Rulebook Card */}
                            {(() => {
                                const isLocked = false; // Rulebooks are always available even if registration is upcoming
                                const rulebookList = data.rulebooks || [{ title: 'Rulebook', desc: 'Official Rulebook of I/O Festival 2026', url: '#' }];

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
                                            <BookOpen className="w-8 h-8 text-white/30" />
                                        </div>

                                        <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-white/50 font-bold text-xl md:text-2xl font-raela">{rulebookList[0].title}</span>
                                                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-white/5 text-white/30 font-raela">PDF</span>
                                                    <span className="text-[9px] font-bold tracking-wider px-2 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/50 uppercase opacity-50">Updated!</span>
                                                </div>
                                                <span className="text-white/30 text-sm">{rulebookList[0].desc}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-raela font-black uppercase tracking-widest text-white/50 bg-white/10 w-fit px-4 py-2 rounded-full border border-white/5">
                                                Coming Soon
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="relative flex flex-col gap-8 p-8 md:p-10 rounded-3xl md:backdrop-blur-xl transition-all duration-500 overflow-hidden w-full z-10 group mt-4"
                                        style={{
                                            background: 'rgba(20, 20, 20, 0.6)',
                                            boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-3xl" />
                                        
                                        <div className="relative z-10 flex flex-col items-center text-center gap-8">
                                            {/* Top: Icon + Title + Desc */}
                                            <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
                                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg border border-white/5 ${mainRulebookStatus === 'idle' ? 'group-hover:scale-110' : ''}`} style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                                    {mainRulebookStatus === 'success' ? (
                                                        <CheckCircle2 className="w-10 h-10 text-emerald-400" style={{ filter: 'drop-shadow(0 0 12px #34d399)' }} />
                                                    ) : mainRulebookStatus === 'loading' ? (
                                                        <Loader2 className="w-10 h-10 text-white/50 animate-spin" />
                                                    ) : (
                                                        <BookOpen className="w-10 h-10 text-white" style={{ filter: `drop-shadow(0 0 12px ${data.accentHex})` }} />
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <span className="text-white font-bold text-2xl md:text-3xl font-raela group-hover:text-white transition-colors">
                                                            {rulebookList.length > 1 ? 'Rulebook Kompetisi' : rulebookList[0].title}
                                                        </span>
                                                        <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-red-500/10 text-red-400 font-raela shrink-0">PDF</span>
                                                    </div>
                                                    <div className="flex justify-center mt-1 mb-2">
                                                        <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/50 uppercase font-raela shrink-0 animate-pulse">Updated!</span>
                                                    </div>
                                                    <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto group-hover:text-white/80 transition-colors">
                                                        {rulebookList.length > 1 ? 'Official Rulebook of I/O Festival 2026' : rulebookList[0].desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Bottom: Action Buttons */}
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                                                {rulebookList.map((rb, idx) => {
                                                    const label = rulebookList.length > 1 
                                                        ? (rb.title.includes('SMA') || rb.title.includes('Siswa') ? 'SMA/SMK' : 'Mahasiswa/Umum')
                                                        : 'Open Rulebook';
                                                    
                                                    return (
                                                        <a
                                                            key={idx}
                                                            href={rb.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => handleMainRulebookDownload(e)}
                                                            className={`w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-white px-8 py-4 rounded-full transition-all duration-300 relative z-20 whitespace-nowrap border ${
                                                                mainRulebookStatus === 'success' 
                                                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                                                                    : mainRulebookStatus === 'loading'
                                                                    ? 'bg-white/5 text-white/50 cursor-wait border-transparent'
                                                                    : 'bg-white/10 hover:bg-white/20 border-white/5 hover:border-white/20'
                                                            }`}
                                                        >
                                                            {mainRulebookStatus === 'idle' && (
                                                                <>
                                                                    {label}
                                                                    <ExternalLink className="w-4 h-4 transition-transform" />
                                                                </>
                                                            )}
                                                            {mainRulebookStatus === 'loading' && <span className="animate-pulse">Loading...</span>}
                                                            {mainRulebookStatus === 'success' && 'Berhasil!'}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })()}

                            {/* 3 Smaller Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: 'Pernyataan Orisinalitas', desc: 'Statement of Originality', href: '/downloads/LEMBAR PERNYATAAN ORISINALITAS KARYA.docx', type: 'DOCX', comingSoon: false },
                                    { title: 'Logo I/O Festival 2026', desc: 'Official Logo of I/O Festival 2026', href: '/downloads/logo-iofest-2026.png', type: 'PNG', comingSoon: false },
                                    { title: 'Twibbon', desc: 'Official Twibbon of I/O Festival 2026', href: 'https://drive.google.com/drive/folders/1o997MjNSa_Zp2IdsGoPplnTNJsWiB3ee?usp=sharing', type: 'PNG', comingSoon: false },
                                ].map((doc, idx) => {
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
                        <p className="text-white/50 mb-8">Tunjukkan kemampuan kamu pada kompetisi tingkat nasional ini!</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {regStatus === 'open' ? (
                                <Link
                                    href={REGISTRATION_URL}
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

                            <div className={`grid grid-cols-1 ${data.contacts.length === 1 ? 'sm:grid-cols-1 max-w-md' : 'sm:grid-cols-2 max-w-3xl'} gap-6 w-full mx-auto`}>
                                {data.contacts.map((cp, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative p-6 md:p-8 rounded-3xl md:backdrop-blur-xl border border-white/5 flex flex-col transition-transform duration-500 overflow-hidden hover:-translate-y-1 w-full"
                                        style={{
                                            background: 'rgba(20,20,20,0.6)',
                                            boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-3xl" />

                                        <div className="relative z-10 flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                                            <div>
                                                <h3 className="font-raela font-black text-xl text-white tracking-wide">{cp.name}</h3>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {(cp.role || ['Official CP']).map((roleName, rIdx) => (
                                                        <span 
                                                            key={rIdx}
                                                            className="px-2 py-0.5 rounded-full text-[9px] font-bold font-raela uppercase tracking-wider shadow-sm flex items-center shrink-0"
                                                            style={{ 
                                                                color: data.accentHex,
                                                                backgroundColor: `${data.accentHex}15`,
                                                                border: `1px solid ${data.accentHex}40`
                                                            }}
                                                        >
                                                            {roleName}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                                                <User className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex flex-col gap-3 mt-auto w-full">
                                            <a
                                                href={`https://wa.me/${cp.whatsapp}?text=${encodeURIComponent(`Halo, kak! aku mau tanya-tanya tentang I/O Festival 2026 di cabang lomba ${data.title} tingkat ${cp.role ? cp.role.join('/') : 'Umum'}`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 group/wa w-full overflow-hidden"
                                            >
                                                <div 
                                                    className="absolute inset-0 opacity-0 group-hover/wa:opacity-10 transition-opacity duration-300"
                                                    style={{ backgroundColor: data.accentHex }}
                                                />
                                                <div 
                                                    className="absolute inset-0 border border-transparent rounded-2xl opacity-0 group-hover/wa:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                    style={{ borderColor: data.accentHex }}
                                                />
                                                
                                                <div 
                                                    className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center group-hover/wa:scale-110 shadow-lg transition-transform duration-300 shrink-0"
                                                    style={{ backgroundColor: `${data.accentHex}20`, color: data.accentHex }}
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.154 1.599 5.96L.18 23.4l5.589-1.465a12.015 12.015 0 0 0 6.262 1.761h.005c6.645 0 12.03-5.385 12.03-12.03S18.677 0 12.031 0zm.005 21.688a9.982 9.982 0 0 1-5.093-1.385l-.365-.216-3.785.992.997-3.69-.237-.377a9.988 9.988 0 0 1-1.528-5.32c0-5.508 4.484-9.992 9.992-9.992 2.668 0 5.176 1.04 7.062 2.926A9.954 9.954 0 0 1 21.99 12.03c0 5.508-4.484 9.992-9.992 9.992v.005zm5.483-7.495c-.301-.151-1.78-.88-2.056-.98-.276-.1-.478-.15-.679.15s-.779.98-.955 1.18c-.176.2-.352.226-.653.076-.301-.151-1.272-.469-2.42-1.49-.893-.794-1.497-1.776-1.673-2.077-.176-.301-.019-.464.131-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.679-1.643-.93-2.251-.243-.591-.49-.51-.679-.52-.176-.01-.377-.01-.578-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511s1.08 2.91 1.231 3.111c.15.201 2.122 3.238 5.141 4.538.718.31 1.278.496 1.714.635.72.228 1.376.196 1.892.119.58-.087 1.78-.728 2.03-1.432.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/>
                                                    </svg>
                                                </div>
                                                <div className="relative z-10 flex flex-col flex-1 truncate">
                                                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5 font-raela">WhatsApp</span>
                                                    <span className="text-sm font-bold text-white/90 group-hover/wa:text-white transition-colors">{cp.whatsapp.replace(/^62/, '0')}</span>
                                                </div>
                                            </a>

                                            <a
                                                href={`https://line.me/ti/p/~${cp.line}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 group/line w-full overflow-hidden"
                                            >
                                                <div 
                                                    className="absolute inset-0 opacity-0 group-hover/line:opacity-10 transition-opacity duration-300"
                                                    style={{ backgroundColor: data.accentHex }}
                                                />
                                                <div 
                                                    className="absolute inset-0 border border-transparent rounded-2xl opacity-0 group-hover/line:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                    style={{ borderColor: data.accentHex }}
                                                />
                                                <div 
                                                    className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center group-hover/line:scale-110 shadow-lg transition-transform duration-300 shrink-0"
                                                    style={{ backgroundColor: `${data.accentHex}20`, color: data.accentHex }}
                                                >
                                                    <MessageCircle className="w-5 h-5" />
                                                </div>
                                                <div className="relative z-10 flex flex-col flex-1 truncate">
                                                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5 font-raela">LINE ID</span>
                                                    <span className="text-sm font-bold text-white/90 group-hover/line:text-white transition-colors">{cp.line}</span>
                                                </div>
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
