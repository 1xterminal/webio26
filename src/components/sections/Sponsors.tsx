'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SponsorLogo {
    name: string;
    width: number;
    height: number;
    src?: string;
    href?: string;
}

interface SponsorTier {
    tierName: string;
    logos: SponsorLogo[];
}

const sponsorTiers: SponsorTier[] = [
    {
        tierName: 'Case Collaborator',
        logos: [
            { 
                name: 'Secret', 
                width: 420, 
                height: 210, 
            },
        ]
    },
    {
        tierName: 'Gold',
        logos: [
            { name: 'Festival Partner', width: 240, height: 120 },
            { name: 'Case Collaborator', width: 240, height: 120 },
        ]
    },
    {
        tierName: 'Silver',
        logos: [
            { 
                name: 'Alleyway Muse', 
                width: 160, 
                height: 80, 
                src: '/assets/sponsors/Horizontal Logo (White).png',
                href: 'https://www.instagram.com/alleyway.muse/'
            },
            { 
                name: 'JND Dimsum', 
                width: 160, 
                height: 80, 
                src: '/assets/sponsors/logo jnd.png',
                href: 'https://www.instagram.com/jnd_dimsum/'
            },
            { name: 'Sponsor 3', width: 140, height: 70 },
        ]
    },
    {
        tierName: 'Bronze',
        logos: [
            { name: 'Sponsor 4', width: 110, height: 56 },
            { name: 'Sponsor 5', width: 110, height: 56 },
            { name: 'Sponsor 6', width: 110, height: 56 },
            { name: 'Sponsor 7', width: 110, height: 56 },
        ]
    },
];

import { useState, useEffect } from 'react';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';

export function Sponsors() {
    const [isPastRevealDate, setIsPastRevealDate] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsMounted(true);
            const now = new Date();
            const revealDate = new Date('2026-03-24T10:00:00+07:00');
            setIsPastRevealDate(now >= revealDate);
        }, 0);
        return () => clearTimeout(timeoutId);
    }, []);
    // Filter active tiers: only those that contain at least one logo with a src or are secret
    const activeTiers = sponsorTiers
        .map(tier => ({
            ...tier,
            logos: tier.logos.filter(logo => logo.src || (tier.tierName === 'Case Collaborator' && logo.name === 'Secret'))
        }))
        .filter(tier => tier.logos.length > 0);

    return (
        <section className="py-16 md:py-24 relative overflow-hidden" aria-labelledby="sponsors-title">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2 id="sponsors-title" className="font-raela font-black text-4xl md:text-6xl text-white tracking-tight uppercase">
                        SPONSORED <span className="text-white/40">BY</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange mx-auto mt-6 rounded-full opacity-50" />
                </motion.div>

                <div className="flex flex-col gap-16 md:gap-24">
                    {activeTiers.map((tier, tierIndex) => (
                        <motion.div
                            key={tier.tierName}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                            transition={{ delay: tierIndex * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full"
                        >
                            {tier.tierName === 'Case Collaborator' && (
                                <div className="text-center mb-10">
                                    <span className="text-xs md:text-sm font-raela font-bold uppercase tracking-[0.4em] text-neon-blue">
                                        {tier.tierName}
                                    </span>
                                    {isMounted && !isPastRevealDate && (
                                        <div className="mt-6 flex justify-center">
                                            <CaseRevealCountdown accentColor="#1DBCD3" size="md" showGlass={true} />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                                {tier.logos.map((logo, i) => {
                                    const isSecretCollab = tier.tierName === 'Case Collaborator' && logo.name === 'Secret';
                                    const shouldReveal = isSecretCollab && isMounted && isPastRevealDate;
                                    
                                    const content = (
                                        <div
                                            className="relative group flex items-center justify-center p-4 transition-[opacity,transform] duration-500"
                                            style={{ 
                                                maxWidth: logo.width, 
                                                width: '100%',
                                                aspectRatio: `${logo.width} / ${logo.height}`
                                            }}
                                        >
                                            {/* Premium background glow on hover */}
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl blur-3xl scale-125"
                                                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
                                            />
                                            
                                            <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSecretCollab && !shouldReveal ? 'opacity-80 group-hover:opacity-100 group-hover:scale-110' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'}`}>
                                                {isSecretCollab && !shouldReveal ? (
                                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,139,83,0.3)]">
                                                        <span className="text-3xl md:text-5xl font-bold text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">?</span>
                                                    </div>
                                                ) : logo.src || shouldReveal ? (
                                                    <Image
                                                        src={shouldReveal ? "/assets/sponsors/Logo BCA_Putih.png" : (logo.src || "")}
                                                        alt={shouldReveal ? "BCA" : logo.name}
                                                        width={shouldReveal ? 300 : logo.width}
                                                        height={shouldReveal ? 150 : logo.height}
                                                        className="object-contain w-full h-full"
                                                        priority={tierIndex === 0}
                                                    />
                                                ) : (
                                                    <span className="text-white/20 text-xs font-raela font-bold uppercase tracking-widest">{logo.name}</span>
                                                )}
                                            </div>
                                        </div>
                                    );

                                    if (logo.href) {
                                        return (
                                            <a 
                                                key={i} 
                                                href={logo.href} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block cursor-pointer"
                                            >
                                                {content}
                                            </a>
                                        );
                                    }

                                    return <div key={i}>{content}</div>;
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Subtle background ambient elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-0 opacity-20" aria-hidden="true">
                <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue rounded-full max-md:blur-[40px] md:blur-[140px] opacity-20" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple rounded-full max-md:blur-[40px] md:blur-[140px] opacity-20" />
            </div>
        </section>
    );
}
