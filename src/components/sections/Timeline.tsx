'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';
import { sendGAEvent } from '@next/third-parties/google';

const events = [
    {
        date: "15 Mar - 19 Apr 2026",
        title: "Early Bird Registration",
        description: "Periode pendaftaran awal dengan harga early bird bagi seluruh peserta",
        startDate: new Date('2026-03-15T00:00:00+07:00'),
    },
    {
        date: "20 Apr - 30 Apr 2026",
        title: "Regular Registration",
        description: "Periode pendaftaran reguler untuk seluruh kompetisi IT.",
        startDate: new Date('2026-04-20T00:00:00+07:00'),
    },

    {
        date: "30 Apr 2026",
        title: "Batas Akhir Pendaftaran & Pengumpulan Karya",
        description: "Penutupan registrasi untuk seluruh cabang lomba sekaligus batas waktu pengumpulan karya awal.",
        startDate: new Date('2026-04-30T00:00:00+07:00'),
    },
    {
        date: "1 - 10 Mei 2026",
        title: "Penilaian Tahap Pertama",
        description: "Dewan juri menyeleksi semifinalis dari seluruh hasil karya yang masuk.",
        startDate: new Date('2026-05-01T00:00:00+07:00'),
    },
    {
        date: "13 Mei 2026",
        title: "Pengumuman Finalis",
        description: "Panitia mengumumkan lima tim terbaik dari setiap kategori perlombaan.",
        startDate: new Date('2026-05-13T00:00:00+07:00'),
    },
    {
        date: "15 Mei 2026",
        title: "Pertemuan Teknis Finalis",
        description: "Panitia memberikan pengarahan teknis secara daring kepada para finalis.",
        startDate: new Date('2026-05-15T00:00:00+07:00'),
    },
    {
        date: "4 - 5 Juni 2026",
        title: "Grand Final and Awarding",
        description: "Presentasi final seluruh kategori lomba disusul dengan seminar, talkshow, guest star, dan pengumuman pemenang.",
        startDate: new Date('2026-06-04T00:00:00+07:00'),
    }
];

const TimelineNode = memo(({ event, index, isActive, isPassed, isMounted, isPastRevealDate }: { event: typeof events[0], index: number, isActive: boolean, isPassed: boolean, isMounted: boolean, isPastRevealDate: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 group transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
        >
            {/* Content Side */}
            <div className={`flex-1 pl-14 md:pl-0 w-full transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isPassed ? 'opacity-90' : 'opacity-100'}`}>
                {index === 0 ? (
                    <div className={`relative p-6 md:p-8 rounded-[2rem] bg-black/60 backdrop-blur-3xl border border-[#FF8B53]/40 overflow-hidden group/card hover:-translate-y-2 hover:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${index % 2 === 0 ? 'md:items-end text-left md:text-right md:ml-auto' : 'items-start text-left'} flex flex-col max-w-lg`}
                         style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8), inset 0 0 30px rgba(255,139,83,0.1)' }}>
                         
                        {/* Animated Glow Backdrops */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF8B53] to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF8B53]/20 via-transparent to-transparent opacity-40 group-hover/card:opacity-70 transition-opacity duration-700 pointer-events-none" />
                        
                        {/* Performant Bloom Light Leak */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8B53] blur-[80px] rounded-full opacity-0 group-hover/card:opacity-30 transition-opacity duration-1000 pointer-events-none mix-blend-screen -z-10 translate-x-1/4 -translate-y-1/4" />

                        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'} flex-wrap relative z-10 w-full`}>
                            <h3 className="font-raela text-xs tracking-[0.15em] uppercase font-black text-[#FF8B53] drop-shadow-[0_0_10px_rgba(255,139,83,0.6)]">
                                {event.date}
                            </h3>
                            {isActive && (
                                <span className="px-2 py-0.5 rounded text-[9px] bg-white/20 border border-white/30 text-white animate-pulse font-bold tracking-wider">SEDANG BERLANGSUNG</span>
                            )}
                        </div>
                        
                        <h3 className={`text-2xl md:text-3xl font-black font-raela mb-3 tracking-wide text-white drop-shadow-lg relative z-10 w-full`}>
                            {event.title}
                        </h3>
                        
                        <p className={`text-white/90 text-sm md:text-base font-light leading-relaxed mb-2 relative z-10 w-full drop-shadow-md`}>
                            {event.description}
                        </p>

                        {/* Embedded Case Release Sub-Event */}
                        <div className="mt-4 sm:mt-6 flex flex-col items-start md:items-end gap-1.5 sm:gap-2 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-[#FF8B53]/30 w-full relative z-10 group/subevent hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(255,139,83,0.05)]">
                            
                            {/* Top Line: Date and Event Name */}
                            <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 sm:gap-3 pb-1.5 border-b border-[#FF8B53]/10 w-full">
                                <div className="order-1 md:order-2 flex items-center gap-2 border border-[#FF8B53]/20 bg-[#FF8B53]/10 px-2.5 py-1 rounded-full">
                                    <span className="text-[9px] sm:text-[10px] font-raela font-black uppercase tracking-[0.2em] text-[#FF8B53] leading-none">9 Apr 2026</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF8B53] animate-pulse shadow-[0_0_8px_#FF8B53]" />
                                </div>
                                <span className="order-2 md:order-1 font-raela font-bold text-white text-[13px] sm:text-base tracking-wide">Business Case Release</span>
                            </div>

                            {/* Center Stack: Collaborator -> Logo -> Text */}
                            <div className="flex flex-col items-start md:items-end gap-0 w-full mt-0.5">
                                <span className="text-[#FF8B53] font-raela text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] text-left md:text-right leading-none z-20">
                                    {isMounted && isPastRevealDate ? 'Official Case Collaborator' : 'Secret Collaborator'}
                                </span>
                                
                                <div className="relative z-10 w-28 h-12 sm:w-36 sm:h-16 flex items-center justify-start md:justify-end -my-1 sm:-my-1.5 transition-all">
                                    {isMounted && isPastRevealDate ? (
                                        <a
                                            href="https://www.instagram.com/lifeatbca/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                sendGAEvent('event', 'click_sponsor_logo', {
                                                    sponsor_name: 'BCA',
                                                    destination: 'https://www.instagram.com/lifeatbca/',
                                                    location: 'timeline_section_inline',
                                                });
                                            }}
                                            className="relative block w-full h-full z-20 cursor-pointer transition-transform duration-500 hover:scale-[1.05]"
                                        >
                                            <Image
                                                src="/assets/sponsors/Logo BCA_Putih.png"
                                                alt="BCA"
                                                fill
                                                className="object-contain opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover/subevent:opacity-100 transition-opacity object-left md:object-right"
                                            />
                                        </a>
                                    ) : (
                                        <div className="w-full h-full rounded-xl bg-white/5 border border-[#FF8B53]/20 flex items-center justify-center text-[#FF8B53]/50 font-bold text-lg drop-shadow-[0_0_5px_rgba(255,139,83,0.2)]">
                                            ?
                                        </div>
                                    )}
                                </div>

                                {isMounted && isPastRevealDate && (
                                    <span className="text-white/90 font-raela text-[10px] sm:text-[13px] font-medium tracking-wide text-left md:text-right">
                                        PT Bank Central Asia Tbk
                                    </span>
                                )}
                                {isMounted && !isPastRevealDate && <CaseRevealCountdown accentColor="#FF8B53" size="sm" className="mt-1" />}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`w-full ${index % 2 === 0 ? 'md:text-right text-left' : 'text-left'}`}>
                        <div className={`flex items-center gap-3 mb-3 flex-wrap ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <h3 className={`font-raela text-xs tracking-[0.15em] uppercase font-black transition-colors duration-500 ${isActive ? 'text-neon-orange drop-shadow-[0_0_10px_rgba(255,139,83,0.6)]' : isPassed ? 'text-white/50' : 'text-neon-blue/90'}`}>{event.date}</h3>
                            {isActive && (
                                <span className="px-2 py-0.5 rounded text-[9px] bg-neon-orange/20 border border-neon-orange/50 text-neon-orange animate-pulse font-bold tracking-wider">SEDANG BERLANGSUNG</span>
                            )}
                        </div>
                        <h3 className={`text-2xl font-bold font-raela transition-colors duration-500 mb-3 ${isActive ? 'text-white' : 'text-white/90'}`}>{event.title}</h3>
                        <p className={`text-white/70 text-sm font-light leading-relaxed max-w-md ml-0 ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0 md:mr-auto'}`}>{event.description}</p>
                

                    </div>
                )}
            </div>

            {/* Center Node (Desktop) */}
            <div className="hidden md:flex relative shrink-0 w-10 h-10 items-center justify-center">
                {isActive && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-normal md:mix-blend-screen bg-neon-orange" />
                )}
                <div
                    className="w-4 h-4 rounded-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 border-[2px] transform-gpu"
                    style={{
                        borderColor: (isPassed || isActive) ? '#FF8B53' : 'rgba(255,255,255,0.2)',
                        backgroundColor: isPassed ? '#FF8B53' : isActive ? '#000' : '#111',
                        boxShadow: isActive ? '0 0 25px #FF8B53, inset 0 0 10px #FF8B53' : 'none',
                        transform: isActive ? 'scale(1.8)' : 'scale(1)'
                    }}
                />
            </div>

            {/* Mobile Node (Absolute Left) */}
            <div className="md:hidden absolute left-[5px] top-[-2px] w-[32px] h-[32px] flex items-center justify-center">
                {isActive && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-normal md:mix-blend-screen bg-neon-orange" />
                )}
                <div
                    className="w-3.5 h-3.5 rounded-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 border-[2px] transform-gpu"
                    style={{
                        borderColor: (isPassed || isActive) ? '#FF8B53' : 'rgba(255,255,255,0.2)',
                        backgroundColor: isPassed ? '#FF8B53' : isActive ? '#000' : '#111',
                        boxShadow: isActive ? '0 0 20px #FF8B53, inset 0 0 8px #FF8B53' : 'none',
                        transform: isActive ? 'scale(1.7)' : 'scale(1)'
                    }}
                />
            </div>

            {/* Empty Side for Balance */}
            <div className="hidden md:block flex-1" />
        </motion.div>
    );
});
TimelineNode.displayName = 'TimelineNode';

export function Timeline() {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isPastRevealDate, setIsPastRevealDate] = useState(false);

    useEffect(() => {
        const calculateInitialPhase = () => {
            const now = new Date();
            let phase = 0;
            // Iterate forwards: latest phase whose start date is past becomes the current phase
            for (let i = 0; i < events.length; i++) {
                if (now >= events[i].startDate) {
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

        // Recalculate periodically just in case the tab is kept open for a long time
        const interval = setInterval(calculateInitialPhase, 1000 * 60 * 60);
        return () => {
            clearTimeout(timeoutId);
            clearInterval(interval);
        };
    }, []);

    return (
        <section id="timeline" className="py-16 md:py-32 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="font-raela font-bold text-3xl md:text-6xl mb-4 text-white">TIMELINE <span className="text-neon-orange">LOMBA</span></h2>
                </motion.div>

                <div className="relative">
                    {/* Center Line (Hidden on Mobile, Visible on MD) */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-white/5 rounded-full" />

                    {/* Animated Progress Line (MD) */}
                    <div
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-neon-orange transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top z-0 rounded-full"
                        style={{
                            height: isMounted ? `calc(${(currentPhase / (events.length - 1)) * 100}%)` : '0%',
                            boxShadow: '0 0 20px rgba(255,139,83,0.5)'
                        }}
                    />

                    {/* Mobile Left Line */}
                    <div className="md:hidden absolute left-[20px] w-[2px] h-full bg-white/5 rounded-full" />

                    {/* Animated Progress Line (Mobile) */}
                    <div
                        className="md:hidden absolute left-[20px] w-[2px] bg-neon-orange transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top z-0 rounded-full"
                        style={{
                            height: isMounted ? `calc(${(currentPhase / (events.length - 1)) * 100}%)` : '0%',
                            boxShadow: '0 0 15px rgba(255,139,83,0.5)'
                        }}
                    />

                    <div className="space-y-16 md:space-y-24 relative z-10 flex flex-col">
                        {events.map((event, index) => {
                            const isActive = isMounted && index === currentPhase;
                            const isPassed = isMounted && index < currentPhase;

                            return (
                                <TimelineNode
                                    key={index}
                                    event={event}
                                    index={index}
                                    isActive={isActive}
                                    isPassed={isPassed}
                                    isMounted={isMounted}
                                    isPastRevealDate={isPastRevealDate}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
