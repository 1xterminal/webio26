'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect, memo } from 'react';

const events = [
    {
        date: "15 Mar - 19 Apr 2026",
        title: "Early Bird Registration (Diperpanjang!)",
        description: "Merespons antusiasme peserta yang tinggi, penawaran harga Early Bird diperpanjang hingga 19 April. Daftarkan tim kamu sekarang sebelum tarif kembali normal.",
        startDate: new Date('2026-03-15T00:00:00+07:00'),
    },
    {
        date: "20 - 30 Apr 2026",
        title: "Regular Registration",
        description: "Periode pendaftaran reguler. Batas akhir pendaftaran dan pengumpulan karya awal pada 30 April.",
        startDate: new Date('2026-04-20T00:00:00+07:00'),
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
        date: "4 Juni 2026",
        title: "Acara Utama Hari Pertama",
        description: "Presentasi final seluruh kategori lomba secara luring di Auditorium UNTAR.",
        startDate: new Date('2026-06-04T00:00:00+07:00'),
    },
    {
        date: "5 Juni 2026",
        title: "Acara Utama Hari Kedua",
        description: "Seminar, talkshow, guest star, dan pengumuman pemenang kompetisi.",
        startDate: new Date('2026-06-05T00:00:00+07:00'),
    }
];

const TimelineNode = memo(({ event, index, isActive, isPassed }: { event: typeof events[0], index: number, isActive: boolean, isPassed: boolean }) => {
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
                    <div className={`relative p-6 md:p-8 rounded-[2rem] bg-black/60 backdrop-blur-3xl border border-[#A856EE]/40 overflow-hidden group/card hover:-translate-y-2 hover:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${index % 2 === 0 ? 'md:items-end text-left md:text-right md:ml-auto' : 'items-start text-left'} flex flex-col max-w-lg`}
                         style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8), inset 0 0 30px rgba(168,86,238,0.1)' }}>
                         
                        {/* Animated Glow Backdrops */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A856EE] to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#A856EE]/20 via-transparent to-transparent opacity-40 group-hover/card:opacity-70 transition-opacity duration-700 pointer-events-none" />
                        
                        {/* Performant Bloom Light Leak */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A856EE] blur-[80px] rounded-full opacity-0 group-hover/card:opacity-30 transition-opacity duration-1000 pointer-events-none mix-blend-screen -z-10 translate-x-1/4 -translate-y-1/4" />

                        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'} flex-wrap relative z-10 w-full`}>
                            <h3 className="font-raela text-xs tracking-[0.15em] uppercase font-black text-[#A856EE] drop-shadow-[0_0_10px_rgba(168,86,238,0.6)]">
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
                        <div className="mt-4 sm:mt-6 flex flex-col items-end gap-1.5 sm:gap-2 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-[#A856EE]/30 w-full relative z-10 group/subevent hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(168,86,238,0.05)]">
                            
                            {/* Top Line: Date and Event Name */}
                            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 pb-1.5 border-b border-[#A856EE]/10 w-full">
                                <span className="font-raela font-bold text-white text-[13px] sm:text-base tracking-wide">Business Case Release</span>
                                <div className="flex items-center gap-2 border border-[#A856EE]/20 bg-[#A856EE]/10 px-2.5 py-1 rounded-full">
                                    <span className="text-[9px] sm:text-[10px] font-raela font-black uppercase tracking-[0.2em] text-[#A856EE] leading-none">9 Apr 2026</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#A856EE] animate-pulse shadow-[0_0_8px_#A856EE]" />
                                </div>
                            </div>

                            {/* Center Stack: Collaborator -> Logo/Spacer -> Text */}
                            <div className="flex flex-col items-end gap-0 w-full mt-0.5">
                                <span className="text-[#A856EE] font-raela text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] text-right leading-none z-20">
                                    Official Case Collaborator
                                </span>
                                
                                <div className="relative z-10 w-28 h-12 sm:w-36 sm:h-16 flex items-center justify-end opacity-0 pointer-events-none -my-1 sm:-my-1.5" aria-hidden="true" />

                                <span className="text-white/90 font-raela text-[10px] sm:text-[13px] font-medium tracking-wide text-right">
                                    Rilis rancangan studi kasus resmi untuk babak kualifikasi Business Case I/O Festival.
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`w-full ${index % 2 === 0 ? 'md:text-right text-left' : 'text-left'}`}>
                        <div className={`flex items-center gap-3 mb-3 flex-wrap ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <h3 className={`font-raela text-xs tracking-[0.15em] uppercase font-black transition-colors duration-500 ${isActive ? 'text-neon-purple drop-shadow-[0_0_10px_rgba(168,86,238,0.6)]' : isPassed ? 'text-white/50' : 'text-neon-blue/90'}`}>{event.date}</h3>
                            {isActive && (
                                <span className="px-2 py-0.5 rounded text-[9px] bg-neon-purple/20 border border-neon-purple/50 text-neon-purple animate-pulse font-bold tracking-wider">SEDANG BERLANGSUNG</span>
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
                    <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-normal md:mix-blend-screen bg-neon-purple" />
                )}
                <div
                    className="w-4 h-4 rounded-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 border-[2px] transform-gpu"
                    style={{
                        borderColor: (isPassed || isActive) ? '#A856EE' : 'rgba(255,255,255,0.2)',
                        backgroundColor: isPassed ? '#A856EE' : isActive ? '#000' : '#111',
                        boxShadow: isActive ? '0 0 25px #A856EE, inset 0 0 10px #A856EE' : 'none',
                        transform: isActive ? 'scale(1.8)' : 'scale(1)'
                    }}
                />
            </div>

            {/* Mobile Node (Absolute Left) */}
            <div className="md:hidden absolute left-[5px] top-[-2px] w-[32px] h-[32px] flex items-center justify-center">
                {isActive && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-normal md:mix-blend-screen bg-neon-purple" />
                )}
                <div
                    className="w-3.5 h-3.5 rounded-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 border-[2px] transform-gpu"
                    style={{
                        borderColor: (isPassed || isActive) ? '#A856EE' : 'rgba(255,255,255,0.2)',
                        backgroundColor: isPassed ? '#A856EE' : isActive ? '#000' : '#111',
                        boxShadow: isActive ? '0 0 20px #A856EE, inset 0 0 8px #A856EE' : 'none',
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

export function CaseCollabTimeline() {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

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
                    <h2 className="font-raela font-bold text-3xl md:text-6xl mb-4 text-white">JADWAL <span className="text-neon-purple">ACARA</span></h2>
                    <p className="text-white/60 font-raela">Tandai kalendermu. Perjalanan dimulai sekarang.</p>
                </motion.div>

                <div className="relative">
                    {/* Center Line (Hidden on Mobile, Visible on MD) */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-white/5 rounded-full" />

                    {/* Animated Progress Line (MD) */}
                    <div
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-neon-purple transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top z-0 rounded-full"
                        style={{
                            height: isMounted ? `calc(${(currentPhase / (events.length - 1)) * 100}%)` : '0%',
                            boxShadow: '0 0 20px rgba(168,86,238,0.5)'
                        }}
                    />

                    {/* Mobile Left Line */}
                    <div className="md:hidden absolute left-[20px] w-[2px] h-full bg-white/5 rounded-full" />

                    {/* Animated Progress Line (Mobile) */}
                    <div
                        className="md:hidden absolute left-[20px] w-[2px] bg-neon-purple transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top z-0 rounded-full"
                        style={{
                            height: isMounted ? `calc(${(currentPhase / (events.length - 1)) * 100}%)` : '0%',
                            boxShadow: '0 0 15px rgba(168,86,238,0.5)'
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
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
