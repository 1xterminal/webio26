'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { getCompetition } from '@/lib/competitions';
import { UIUXIcon } from '@/components/ui/icons/UIUXIcon';
import { WebDevIcon } from '@/components/ui/icons/WebDevIcon';
import { BusinessCaseIcon } from '@/components/ui/icons/BusinessCaseIcon';

import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';
import { REGISTRATION_URL } from '@/lib/registration';

// Modular Components
import { CompetitionHero } from './competition/CompetitionHero';
import { CompetitionJudges } from './competition/CompetitionJudges';
import { CompetitionInfo } from './competition/CompetitionInfo';
import { CompetitionTimeline } from './competition/CompetitionTimeline';
import { CompetitionDocs } from './competition/CompetitionDocs';
import { CompetitionContact } from './competition/CompetitionContact';

// Dynamic Effects
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });

export default function CompetitionPage({ slug }: { slug: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const regStatus = useRegistrationStatus();
    
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsMounted(true);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    const data = useMemo(() => getCompetition(slug), [slug]);

    const Icon = useMemo(() => {
        if (!data) return null;
        switch (data.slug) {
            case 'ui-ux': return UIUXIcon;
            case 'web-dev': return WebDevIcon;
            case 'business-case': return BusinessCaseIcon;
            default: return null;
        }
    }, [data]);

    const isPastRevealDate = useMemo(() => {
        return new Date() >= new Date('2026-03-24T10:00:00+07:00');
    }, []);

    const timelineStages = useMemo(() => [
        { date: '15 Mar', label: 'Open Registration' },
        { date: '24 Mar', label: 'Official Case Release' },
        { date: '19 Apr', label: 'Early Bird' },
        { date: '30 Apr', label: 'Closing Registration' },
        { date: '1 Mei', label: 'Preliminary Stage' },
        { date: '13 Mei', label: 'Finalist Announcement' },
        { date: '4 Jun', label: 'Grand Final & Awarding' },
    ], []);

    const [currentPhase, setCurrentPhase] = useState(0);

    useEffect(() => {
        const calculatePhase = () => {
            const now = new Date();
            const dates = [
                new Date('2026-03-15T00:00:00+07:00'),
                new Date('2026-03-24T10:00:00+07:00'),
                new Date('2026-04-19T23:59:59+07:00'),
                new Date('2026-04-30T23:59:59+07:00'),
                new Date('2026-05-01T00:00:00'),
                new Date('2026-05-13T00:00:00'),
                new Date('2026-06-04T00:00:00'),
            ];

            let index = 0;
            for (let i = 0; i < dates.length; i++) {
                if (now >= dates[i]) {
                    index = i;
                }
            }
            setCurrentPhase(index);
        };

        calculatePhase();
        const interval = setInterval(calculatePhase, 1000 * 60 * 60); // Check every hour
        return () => clearInterval(interval);
    }, []);

    const jsonLd = useMemo(() => {
        if (!data) return null;
        return {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'BreadcrumbList',
                    'itemListElement': [
                        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://iofest.com/' },
                        { '@type': 'ListItem', 'position': 2, 'name': 'Competition', 'item': 'https://iofest.com/#tracks' },
                        { '@type': 'ListItem', 'position': 3, 'name': data.title, 'item': `https://iofest.com/kompetisi/${data.slug}` }
                    ]
                },
                {
                    '@type': 'Event',
                    'name': `${data.title} - I/O FESTIVAL 2026`,
                    'description': data.description,
                    'startDate': '2026-03-01T08:00:00+07:00',
                    'endDate': '2026-06-30T18:00:00+07:00',
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
                    'organizer': { '@type': 'Organization', 'name': 'BEM FTI UNTAR', 'url': 'https://bemftiuntar.com' }
                }
            ]
        };
    }, [data]);

    if (!data || !Icon) return null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            
            {/* Ambient Background Layer */}
            <div 
                className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
                style={{ 
                    '--accent-alpha-20': `${data.accentHex}33`,
                    '--accent-alpha-25': `${data.accentHex}40`,
                    '--accent-alpha-30': `${data.accentHex}4d`,
                    '--accent-alpha-40': `${data.accentHex}66`,
                    '--accent-alpha-45': `${data.accentHex}73`,
                } as React.CSSProperties}
            >
                <div className="hidden md:block premium-festive-bg" />
                <div className="md:hidden premium-festive-bg-mobile" />
                <StarDust />
            </div>

            {/* Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
                <div className="absolute -top-20 -right-20 w-100 h-100 opacity-40 max-md:hidden transform-gpu" style={{ animation: 'native-float-1 10s ease-in-out infinite' }}>
                    <Image src="/assets/element/ELEMEN 3.png" alt="" width={400} height={400} className="object-contain" priority />
                </div>
                <div className="absolute top-1/2 -left-32 w-87.5 h-87.5 opacity-30 max-md:hidden transform-gpu" style={{ animation: 'native-float-2 15s ease-in-out infinite 2s' }}>
                    <Image src="/assets/element/ELEMEN 2.png" alt="" width={350} height={350} className="object-contain" priority />
                </div>
                {/* Texture Grain */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none hidden md:block" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>

            <main className="relative z-10">
                <CompetitionHero data={data} Icon={Icon} isMounted={isMounted} isPastRevealDate={isPastRevealDate} />
                
                <div className="max-w-3xl mx-auto px-4">
                    <CompetitionJudges judges={data.judges || []} accentHex={data.accentHex} />
                    <CompetitionInfo data={data} />
                    <CompetitionTimeline timelineStages={timelineStages} currentPhase={currentPhase} accentHex={data.accentHex} />
                    <CompetitionDocs data={data} regStatus={regStatus} />
                    
                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
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
                                <span className={`inline-flex items-center justify-center gap-3 font-bold text-base px-8 py-4 uppercase tracking-widest cursor-not-allowed min-w-[200px] ${regStatus === 'upcoming' ? 'bg-white/20 text-white/50' : 'bg-white/10 text-white/30'}`}>
                                    {regStatus === 'upcoming' ? 'SEGERA DIBUKA' : 'PENDAFTARAN DITUTUP'}
                                </span>
                            )}
                        </div>
                    </motion.div>

                    <CompetitionContact contacts={data.contacts || []} accentHex={data.accentHex} title={data.title} />
                </div>
            </main>
        </>
    );
}
