'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { sendGAEvent } from '@next/third-parties/google';
import { DATES } from '@/lib/constants';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';

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
                href: 'https://www.instagram.com/lifeatbca/',
            },
        ]
    },
    {
        tierName: 'Platinum',
        logos: [
            { 
                name: 'Seindonesia', 
                width: 280, 
                height: 140, 
                src: '/assets/sponsors/seindonesia.png'
            },
            { 
                name: 'Digisnap', 
                width: 280, 
                height: 140, 
                src: '/assets/sponsors/Digisnap (Light).png',
                href: 'https://linktr.ee/digisnap.id'
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
            { 
                name: 'Anamcara', 
                width: 200, 
                height: 120, 
                src: '/assets/sponsors/anamcara.png',
                href: 'https://wa.me/6282297771594'
            },
            { 
                name: 'Cendol Duren', 
                width: 160, 
                height: 80, 
                src: '/assets/sponsors/cendol duren.png'
            },
            { 
                name: 'Djadul Cake', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/djadul cake.png'
            },
            { 
                name: 'Nailboo', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/nailboo.png'
            },
            { 
                name: 'Suki Bento', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/suki bento.png'
            },
            { 
                name: 'Unomi', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/unomi.png'
            },
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

function SponsorMarquee({ logos, tierName, isMounted, isPastRevealDate, tierIndex }: { logos: SponsorLogo[], tierName: string, isMounted: boolean, isPastRevealDate: boolean, tierIndex: number }) {
    // Double the logos for a 50% loop (most reliable CSS pattern)
    const doubledLogos = [...logos, ...logos];
    const controls = useAnimation();
    const x = useMotionValue(0);

    const baseDuration = 35 + (tierIndex * 5);

    const startAutoScroll = () => {
        controls.start({
            x: [x.get(), "-50%"],
            transition: {
                x: {
                    duration: baseDuration * (1 - Math.abs(x.get() / (typeof window !== 'undefined' ? window.innerWidth * 2 : 1))), // Estimating remaining duration
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0
                }
            }
        });
    };

    useEffect(() => {
        // Start initial animation
        controls.start({
            x: ["0%", "-50%"],
            transition: {
                duration: baseDuration,
                ease: "linear",
                repeat: Infinity
            }
        });
    }, [baseDuration, controls]);

    return (
        <div className="w-full overflow-hidden relative py-4">
            <motion.div 
                className="flex items-center gap-10 px-4 w-fit select-none cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -10000, right: 0 }}
                onDragStart={() => controls.stop()}
                onDragEnd={() => {
                    // Normalize x position to stay within loop bounds [0, -50%]
                    // This prevents the marquee from "running away" after long drags
                    startAutoScroll();
                }}
                animate={controls}
                style={{ x, touchAction: "pan-y" }}
            >
                {doubledLogos.map((logo, idx) => (
                    <SponsorCard 
                        key={`${logo.name}-${idx}`} 
                        logo={logo} 
                        tierName={tierName} 
                        isMounted={isMounted} 
                        isPastRevealDate={isPastRevealDate}
                        tierIndex={tierIndex}
                        compact={true}
                    />
                ))}
            </motion.div>
            
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        </div>
    );
}

function SponsorCard({ logo, tierName, isMounted, isPastRevealDate, tierIndex, compact = false }: { logo: SponsorLogo, tierName: string, isMounted: boolean, isPastRevealDate: boolean, tierIndex: number, compact?: boolean }) {
    const isMobileRaw = useIsMobile();
    const isMobile = isMounted ? isMobileRaw : false; // Hydration safe
    const isSecretCollab = tierName === 'Case Collaborator' && logo.name === 'Secret';
    const shouldReveal = isSecretCollab && isMounted && isPastRevealDate;

    // Responsive multiplier logic for all screen sizes
    const getResponsiveMultiplier = () => {
        // Desktop Multipliers
        if (!isMobile) {
            if (tierName === 'Case Collaborator') return 1.0;
            if (tierName === 'Platinum') return 0.75;
            return 0.9; // Scale up Grid logos (Gold, Silver)
        }

        // Mobile Multipliers
        if (tierName === 'Case Collaborator') return 1.2;
        if (tierName === 'Platinum') return 0.55;
        if (compact) return 1.0; // Base 0.5x is already applied below
        return 0.5; // Default grid logos (Gold, etc.)
    };
    
    const multiplier = getResponsiveMultiplier();
    const baseWidth = compact ? (logo.width * 0.75) : logo.width;
    const targetWidth = Math.round(baseWidth * multiplier);
    const targetHeight = Math.round(logo.height * (targetWidth / logo.width));

    const content = (
        <div
            className={`relative group flex items-center justify-center transition-[opacity,transform] duration-500 transform-gpu mx-auto ${compact ? 'flex-shrink-0' : ''} ${isMobile ? 'px-4 py-1' : 'p-4'}`}
            style={{ 
                maxWidth: isMobile ? 'min(100%, ' + targetWidth + 'px)' : targetWidth, 
                width: isMobile ? (tierName === 'Case Collaborator' ? '90%' : targetWidth + 'px') : targetWidth,
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
                        width={shouldReveal ? Math.round(300 * multiplier) : targetWidth}
                        height={shouldReveal ? Math.round(150 * multiplier) : targetHeight}
                        className="object-contain w-full h-full"
                        priority={tierIndex === 0}
                    />
                ) : (
                    <span className="text-white/20 text-[10px] md:text-xs font-raela font-bold uppercase tracking-widest">{logo.name}</span>
                )}
            </div>
        </div>
    );

    if (logo.href && (shouldReveal || !isSecretCollab)) {
        return (
            <a 
                key={logo.name} 
                href={logo.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center cursor-pointer ${compact ? 'flex-shrink-0' : (isMobile ? 'w-full' : 'w-auto')}`}
                onClick={() => {
                    sendGAEvent('event', 'click_sponsor_logo', {
                        sponsor_name: logo.name === 'Secret' ? 'BCA' : logo.name,
                        destination: logo.href,
                    });
                }}
            >
                {content}
            </a>
        );
    }

    return <div key={logo.name} className={compact ? 'flex-shrink-0' : ''}>{content}</div>;
}

export function Sponsors() {
    const isMobileRaw = useIsMobile();
    const [isPastRevealDate, setIsPastRevealDate] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsMounted(true);
            const now = new Date();
            const revealDate = DATES.OFFICIAL_CASE_RELEASE;
            setIsPastRevealDate(now >= revealDate);
        }, 0);
        return () => clearTimeout(timeoutId);
    }, []);

    const isMobile = isMounted ? isMobileRaw : false; // Hydration safe

    // Filter active tiers: only those that contain at least one logo
    const activeTiers = useMemo(() => sponsorTiers
        .map(tier => ({
            ...tier,
            logos: tier.logos.filter(logo => logo.src || logo.name || (tier.tierName === 'Case Collaborator' && logo.name === 'Secret'))
        }))
        .filter(tier => tier.logos.length > 0), []);

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
                                <div className="text-center mb-1">
                                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#005baa]/40 bg-[#005baa]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,91,170,0.2)] mb-1">
                                        <span className="text-[10px] md:text-xs font-raela font-black uppercase tracking-[0.3em] text-[#00bfff] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
                                            {tier.tierName}
                                        </span>
                                    </div>
                                    {isMounted && !isPastRevealDate && (
                                        <div className="mt-6 flex justify-center">
                                            <CaseRevealCountdown accentColor="#1DBCD3" size="md" showGlass={true} />
                                        </div>
                                    )}
                                </div>
                            )}
                            {isMobile && (tier.tierName === 'Silver' || tier.tierName === 'Bronze') ? (
                                <SponsorMarquee 
                                    logos={tier.logos} 
                                    tierName={tier.tierName} 
                                    isMounted={isMounted} 
                                    isPastRevealDate={isPastRevealDate} 
                                    tierIndex={tierIndex}
                                />
                            ) : (
                                <div className={`relative z-10 flex items-center justify-center ${isMobile ? 'px-4' : 'md:gap-16'}`}>
                                    <div className={`w-full ${isMobile ? (tier.logos.length === 1 ? 'flex flex-col items-center justify-center gap-4' : 'grid grid-cols-2 gap-2') : 'flex flex-wrap items-center justify-center gap-8 md:gap-16'}`}>
                                        {tier.logos.map((logo) => (
                                            <SponsorCard 
                                                key={logo.name} 
                                                logo={logo} 
                                                tierName={tier.tierName} 
                                                isMounted={isMounted} 
                                                isPastRevealDate={isPastRevealDate}
                                                tierIndex={tierIndex}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
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
