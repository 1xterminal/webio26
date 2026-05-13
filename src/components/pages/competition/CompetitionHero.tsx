'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Countdown } from '@/components/sections/Countdown';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';
import { PremiumCardGlow } from './CompetitionShared';
import { REGISTRATION_URL } from '@/lib/registration';
import { sendGAEvent } from '@next/third-parties/google';

import { CompetitionData } from '@/lib/competitions';

interface CompetitionHeroProps {
    data: CompetitionData;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    isMounted: boolean;
    isPastRevealDate: boolean;
}

export const CompetitionHero = React.memo(({ data, Icon, isMounted, isPastRevealDate }: CompetitionHeroProps) => {
    return (
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

                        <div
                            className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0"
                            style={{ background: `linear-gradient(90deg, transparent, ${data.accentHex || '#fff'}, transparent)` }}
                        />
                    </Link>
                </motion.div>

                {/* Hero Section */}
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
                                        {data.tags.map((tag: string, idx: number) => (
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

                {/* Official Collaborator Banner */}
                {data.slug === 'business-case' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="mb-10 w-full"
                    >
                        <div className="relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden border bg-black/80 md:bg-black/40 md:backdrop-blur-md group flex flex-col md:flex-row items-center justify-between gap-8 opacity-95 hover:opacity-100 transition-all duration-700 transform-gpu z-10 hover:bg-black/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                             style={{ 
                                 borderColor: `${data.accentHex}40`,
                             }}
                        >
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
                                            src="/assets/sponsors/DIAMOND/OFFICIAL CASE COLLABORATOR/bca.png" 
                                            alt="BCA" 
                                            width={140} 
                                            height={70} 
                                            className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 origin-center drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                            priority={true}
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

                {/* Countdown Tracker */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.11 }}
                    className="mb-12 w-full font-raela"
                >
                    <Countdown accentColor={data.accentHex} />
                </motion.div>
            </div>
        </div>
    );
});
CompetitionHero.displayName = 'CompetitionHero';
