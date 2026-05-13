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
    boxLabel?: string;
}

interface SponsorTier {
    tierName: string;
    logos: SponsorLogo[];
}

const sponsorTiers: SponsorTier[] = [
    {
        tierName: 'Diamond',
        logos: [
            {
                name: 'V3 Production',
                width: 280,
                height: 140,
                src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/v3 production.png',
                boxLabel: 'Festival Partner'
            },
            { 
                name: 'Secret', 
                width: 280, 
                height: 140, 
                href: 'https://www.instagram.com/lifeatbca/',
                src: '/assets/sponsors/DIAMOND/OFFICIAL CASE COLLABORATOR/bca.png',
                boxLabel: 'Case Collaborator'
            },
            {
                name: 'Archipelago',
                width: 280,
                height: 140,
                src: '/assets/sponsors/DIAMOND/OFFICIAL APPAREL/archipelago.png',
                boxLabel: 'Official Apparel'
            }
        ]
    },
    {
        tierName: 'Platinum',
        logos: [
            { 
                name: 'Seindonesia', 
                width: 280, 
                height: 140, 
                src: '/assets/sponsors/PLATINUM/seindonesia.png'
            },
            { 
                name: 'Digisnap', 
                width: 280, 
                height: 140, 
                src: '/assets/sponsors/PLATINUM/digisnap.png',
                href: 'https://linktr.ee/digisnap.id'
            },
        ]
    },
    {
        tierName: 'Gold',
        logos: [
            {
                name: 'Rumah Nenek',
                width: 240,
                height: 120,
                src: '/assets/sponsors/GOLD/rumah nenek.png'
            }
        ]
    },
    {
        tierName: 'Silver',
        logos: [
            { 
                name: 'Alleyway Muse', 
                width: 160, 
                height: 80, 
                src: '/assets/sponsors/SILVER/alleyway.png',
                href: 'https://www.instagram.com/alleyway.muse/'
            },
            { 
                name: 'JND Dimsum', 
                width: 160, 
                height: 80, 
                src: '/assets/sponsors/SILVER/jnd.png',
                href: 'https://www.instagram.com/jnd_dimsum/'
            },
            { 
                name: 'Anamcara', 
                width: 200, 
                height: 120, 
                src: '/assets/sponsors/SILVER/anamcara.png',
                href: 'https://wa.me/6282297771594'
            },
            { 
                name: 'Cendol Duren', 
                width: 160, 
                height: 80, 
                src: '/assets/sponsors/SILVER/cendol duren.png'
            },
            { 
                name: 'Djadul Cake', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/SILVER/djadoel cake.png'
            },
            { 
                name: 'Nailboo', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/SILVER/nailboo.png'
            },
            { 
                name: 'Suki Bento', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/SILVER/suki suki bento.png'
            },
            { 
                name: 'Unomi', 
                width: 180, 
                height: 100, 
                src: '/assets/sponsors/SILVER/unomi.png'
            },
            {
                name: 'Dooble G',
                width: 160,
                height: 80,
                src: '/assets/sponsors/SILVER/dooble g.png'
            },
            {
                name: 'Es Teh Makassar',
                width: 160,
                height: 80,
                src: '/assets/sponsors/SILVER/es teh makassar.png'
            },
            {
                name: 'Hoky Food',
                width: 160,
                height: 80,
                src: '/assets/sponsors/SILVER/hoky food.png'
            },
            {
                name: 'Jacks Hotdog',
                width: 160,
                height: 80,
                src: '/assets/sponsors/SILVER/jacks hotdog.png'
            },
            {
                name: 'Khong Thai Tea',
                width: 160,
                height: 80,
                src: '/assets/sponsors/SILVER/khong thai tea.png'
            }
        ]
    }
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
                className="flex items-center gap-6 px-2 w-fit select-none cursor-grab active:cursor-grabbing"
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
    const isSecretCollab = tierName === 'Diamond' && logo.name === 'Secret';
    const shouldReveal = isSecretCollab && isMounted && isPastRevealDate;

    const getResponsiveMultiplier = () => {
        // Desktop Multipliers
        if (!isMobile) {
            if (tierName === 'Diamond') return 1.0; // Visually constrained by w-[75%] wrapper
            if (tierName === 'Platinum') return 0.75; // 280 * 0.75 = 210px (smaller than Diamond's ~240px)
            if (tierName === 'Gold') return 0.8; // 240 * 0.8 = 192px
            return 0.85; // Silver
        }

        // Mobile Multipliers (Aggressively scaled down because Diamond is forced into 3 columns)
        if (tierName === 'Diamond') return 1.0; // Constrained by w-[75%] inside 1/3 grid width (logo ends up ~85px)
        if (tierName === 'Platinum') return 0.26; // 280 * 0.26 = 72px
        if (tierName === 'Gold') return 0.27; // 240 * 0.27 = 64px
        if (compact) return 0.45; // Silver marquee base is ~120px. 120 * 0.45 = 54px
        return 0.3; // Default fallback
    };
    
    const multiplier = getResponsiveMultiplier();
    const baseWidth = compact ? (logo.width * 0.75) : logo.width;
    const targetWidth = Math.round(baseWidth * multiplier);
    const targetHeight = Math.round(logo.height * (targetWidth / logo.width));

    const content = (
        <div
            className={`relative group flex items-center justify-center transition-[opacity,transform] duration-500 transform-gpu mx-auto ${compact ? 'flex-shrink-0' : ''} ${isMobile ? 'px-2 py-0.5' : 'p-2'}`}
            style={{ 
                maxWidth: isMobile ? 'min(100%, ' + targetWidth + 'px)' : targetWidth, 
                width: isMobile ? (tierName === 'Case Collaborator' ? '90%' : targetWidth + 'px') : targetWidth,
                aspectRatio: `${logo.width} / ${logo.height}`
            }}
        >
            {/* Premium background glow on hover */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl scale-125"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
            />
            
            <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSecretCollab && !shouldReveal ? 'opacity-80 group-hover:opacity-100 group-hover:scale-110' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'}`}>
                {isSecretCollab && !shouldReveal ? (
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,139,83,0.3)]">
                        <span className="text-3xl md:text-5xl font-bold text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">?</span>
                    </div>
                ) : logo.src || shouldReveal ? (
                    <Image
                        src={shouldReveal ? "/assets/sponsors/DIAMOND/OFFICIAL CASE COLLABORATOR/bca.png" : (logo.src || "")}
                        alt={shouldReveal ? "BCA" : logo.name}
                        width={(shouldReveal ? Math.round(300 * multiplier) : targetWidth) * 3}
                        height={(shouldReveal ? Math.round(150 * multiplier) : targetHeight) * 3}
                        quality={80}
                        className="object-contain w-full h-full"
                        priority={tierIndex === 0}
                    />
                ) : (
                    <span className="text-white/20 text-[10px] md:text-xs font-raela font-bold uppercase tracking-widest">{logo.name}</span>
                )}
            </div>
        </div>
    );

    const isDiamond = tierName === 'Diamond';

    if (isDiamond) {
        const glowColor = 'bg-neon-blue/30';
        const glowHover = 'group-hover/card:bg-neon-blue/50';
        const borderColor = 'border-neon-blue/40';
        const tagBg = 'bg-neon-blue/10';
        const textColor = 'text-neon-blue drop-shadow-[0_0_8px_rgba(29,188,211,0.5)]';

        const diamondContent = (
            <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className={`relative flex items-center justify-center p-2 md:p-8 bg-[#0a0a0a] border ${borderColor} rounded-xl md:rounded-[2rem] overflow-hidden group/card ${isMobile ? 'w-full min-h-[140px]' : 'w-[320px] min-h-[340px]'}`}
            >
                {/* Glowing Orb Backgrounds (Replaced blur with radial gradients) */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-48 md:h-48 rounded-full -mr-12 -mt-12 md:-mr-24 md:-mt-24 transition-opacity duration-500 opacity-30 group-hover/card:opacity-60" style={{ background: 'radial-gradient(circle, rgba(29,188,211,1) 0%, transparent 70%)' }} />
                <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 rounded-full -ml-12 -mb-12 md:-ml-24 md:-mb-24 transition-opacity duration-500 opacity-30 group-hover/card:opacity-60" style={{ background: 'radial-gradient(circle, rgba(157,78,221,1) 0%, transparent 70%)' }} />

                {/* Centered Technical Badge */}
                <div className="absolute top-2 md:top-8 left-0 w-full flex justify-center z-10">
                    <div className="relative flex items-center justify-center border-y border-neon-blue/40 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent px-3 py-1 md:px-8 md:py-2">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-1 h-1 md:w-2 md:h-2 border-t border-l border-neon-blue shadow-[0_0_5px_rgba(29,188,211,0.5)]" />
                        <div className="absolute top-0 right-0 w-1 h-1 md:w-2 md:h-2 border-t border-r border-neon-blue shadow-[0_0_5px_rgba(29,188,211,0.5)]" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 md:w-2 md:h-2 border-b border-l border-neon-blue shadow-[0_0_5px_rgba(29,188,211,0.5)]" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 md:w-2 md:h-2 border-b border-r border-neon-blue shadow-[0_0_5px_rgba(29,188,211,0.5)]" />
                        
                        {/* Inner Content */}
                        <div className="flex items-center gap-1.5 md:gap-3 opacity-90">
                            {/* Left Dot */}
                            <span className="relative flex h-1 w-1 md:h-1.5 md:w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full bg-neon-blue opacity-75"></span>
                                <span className="relative inline-flex h-full w-full bg-neon-blue shadow-[0_0_8px_rgba(29,188,211,1)]"></span>
                            </span>
                            
                            <span className="text-[5px] sm:text-[6px] md:text-[11px] font-raela font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                                {logo.boxLabel}
                            </span>

                            {/* Right Dot */}
                            <span className="relative flex h-1 w-1 md:h-1.5 md:w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full bg-neon-blue opacity-75"></span>
                                <span className="relative inline-flex h-full w-full bg-neon-blue shadow-[0_0_8px_rgba(29,188,211,1)]"></span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Logo Area */}
                <div className="flex items-center justify-center w-[75%] relative z-20 mt-3 md:mt-8 transition-transform duration-500 group-hover/card:scale-110">
                    {content}
                </div>
            </motion.div>
        );

        if (logo.href && (shouldReveal || !isSecretCollab)) {
            return (
                <a 
                    key={logo.name} 
                    href={logo.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cursor-pointer block"
                    onClick={() => {
                        sendGAEvent('event', 'click_sponsor_logo', {
                            sponsor_name: logo.name === 'Secret' ? 'BCA' : logo.name,
                            destination: logo.href,
                        });
                    }}
                >
                    {diamondContent}
                </a>
            );
        }

        return <div key={logo.name} className="block">{diamondContent}</div>;
    }

    // Default wrapping for Platinum, Gold, Silver
    const wrappedContent = (
        <div className={`flex flex-col items-center justify-center ${compact ? 'flex-shrink-0' : (isMobile ? 'w-full' : 'w-auto')}`}>
            {logo.boxLabel && (
                <div className="text-center mb-2 md:mb-4">
                    <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                        <span className="text-[8px] md:text-[10px] font-raela font-black uppercase tracking-[0.3em] text-white/70">
                            {logo.boxLabel}
                        </span>
                    </div>
                </div>
            )}
            {content}
            {logo.boxLabel === 'Case Collaborator' && isMounted && !isPastRevealDate && (
                <div className="mt-4 flex justify-center">
                    <CaseRevealCountdown accentColor="#1DBCD3" size="sm" showGlass={true} />
                </div>
            )}
        </div>
    );

    if (logo.href && (shouldReveal || !isSecretCollab)) {
        return (
            <a 
                key={logo.name} 
                href={logo.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-pointer"
                onClick={() => {
                    sendGAEvent('event', 'click_sponsor_logo', {
                        sponsor_name: logo.name === 'Secret' ? 'BCA' : logo.name,
                        destination: logo.href,
                    });
                }}
            >
                {wrappedContent}
            </a>
        );
    }

    return <div key={logo.name} className={compact ? 'flex-shrink-0' : ''}>{wrappedContent}</div>;
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

                <div className="flex flex-col gap-12 md:gap-16">
                    {activeTiers.map((tier, tierIndex) => (
                        <motion.div
                            key={tier.tierName}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                            transition={{ delay: tierIndex * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full"
                        >

                            {isMobile && (tier.tierName === 'Silver' || tier.tierName === 'Bronze') ? (
                                <SponsorMarquee 
                                    logos={tier.logos} 
                                    tierName={tier.tierName} 
                                    isMounted={isMounted} 
                                    isPastRevealDate={isPastRevealDate} 
                                    tierIndex={tierIndex}
                                />
                            ) : (
                                <div className={`relative z-10 flex items-center justify-center ${isMobile ? 'px-2' : 'md:gap-8'}`}>
                                    <div className={`w-full ${
                                        tier.tierName === 'Diamond' 
                                            ? (isMobile ? 'grid grid-cols-3 gap-1.5 sm:gap-2' : 'flex flex-wrap items-center justify-center gap-10 md:gap-24')
                                            : (isMobile ? (tier.logos.length === 1 ? 'flex flex-col items-center justify-center gap-2' : 'grid grid-cols-2 gap-x-2 gap-y-4') : 'flex flex-wrap items-center justify-center gap-6 md:gap-10')
                                    }`}>
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

                            {/* Render Countdown globally for Diamond Tier below the grid */}
                            {tier.tierName === 'Diamond' && isMounted && !isPastRevealDate && (
                                <div className="w-full flex flex-col items-center justify-center mt-8 md:mt-12 px-4 relative z-20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse shadow-[0_0_10px_rgba(255,139,83,0.8)]" />
                                        <span className="text-xs md:text-sm text-neon-orange uppercase tracking-[0.3em] font-mono font-bold drop-shadow-[0_0_8px_rgba(255,139,83,0.5)]">Case Collaborator Reveal</span>
                                    </div>
                                    <CaseRevealCountdown accentColor="#1DBCD3" size="md" showGlass={true} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Subtle background ambient elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-0 opacity-20" aria-hidden="true">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(29,188,211,1) 0%, transparent 70%)' }} />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(157,78,221,1) 0%, transparent 70%)' }} />
            </div>
        </section>
    );
}
