'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';
import { sendGAEvent } from '@next/third-parties/google';

const events = [
    {
        date: "15 Mar - 5 Apr 2026",
        title: "Pendaftaran Gelombang Pertama",
        description: "Periode pendaftaran awal dengan harga early bird bagi seluruh peserta.",
        startDate: new Date('2026-03-15T00:00:00+07:00'),
    },
    {
        date: "6 Apr - 30 Apr 2026",
        title: "Pendaftaran Gelombang Kedua",
        description: "Periode pendaftaran reguler untuk seluruh kompetisi IT.",
        startDate: new Date('2026-04-06T00:00:00+07:00'),
    },
    {
        date: "9 Apr 2026",
        title: "Case Release",
        description: "Perilisan studi kasus untuk kompetisi Business Case.",
        startDate: new Date('2026-04-09T00:00:00+07:00'),
        isCaseRelease: true,
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
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 group transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                                >
                                    {/* Content Side */}
                                    <div className={`flex-1 pl-14 md:pl-0 w-full ${index % 2 === 0 ? 'md:text-right text-left' : 'text-left'} transition-opacity duration-500 ${isPassed ? 'opacity-60' : isActive ? 'opacity-100' : 'opacity-80'}`}>
                                        <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                            <h3 className={`font-raela text-xs tracking-[0.15em] uppercase font-black transition-colors duration-500 ${isActive ? 'text-neon-orange drop-shadow-[0_0_10px_rgba(255,139,83,0.6)]' : isPassed ? 'text-white/50' : 'text-neon-blue/90'}`}>{event.date}</h3>
                                            {isActive && (
                                                <span className="px-2 py-0.5 rounded text-[9px] bg-neon-orange/20 border border-neon-orange/50 text-neon-orange animate-pulse font-bold tracking-wider">SEDANG BERLANGSUNG</span>
                                            )}
                                        </div>
                                        <h3 className={`text-2xl font-bold font-raela transition-colors duration-500 mb-3 ${isActive ? 'text-white' : 'text-white/90'}`}>{event.title}</h3>
                                        <p className={`text-white/70 text-sm font-light leading-relaxed max-w-md ml-0 ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0 md:mr-auto'}`}>{event.description}</p>
                                        
                                        {event.isCaseRelease && (
                                            <div className={`mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                                <div className={`flex flex-col gap-0.5 sm:gap-1 ${index % 2 === 0 ? 'md:items-end md:text-right' : 'items-start text-left'}`}>
                                                    <span className="text-[9px] font-raela font-black uppercase tracking-[0.3em] text-[#FF8B53]">Official Case Collaborator</span>
                                                    <span className="text-white/80 text-[10px] sm:text-xs font-medium font-raela">
                                                        {isMounted && isPastRevealDate ? 'PT Bank Central Asia Tbk' : 'Secret Collaborator'}
                                                    </span>
                                                    {isMounted && !isPastRevealDate && <CaseRevealCountdown accentColor="#FF8B53" size="md" className="mt-1 sm:mt-2" />}
                                                </div>
                                                <div className="relative w-16 h-8 md:w-20 md:h-10 shrink-0">
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
                                                                    location: 'timeline_section',
                                                                });
                                                            }}
                                                            className="absolute inset-0 z-20 cursor-pointer"
                                                        >
                                                            <Image
                                                                src="/assets/sponsors/Logo BCA_Putih.png"
                                                                alt="BCA"
                                                                fill
                                                                className="object-contain opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                                            />
                                                        </a>
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-80">
                                                            <div className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shadow-[0_0_10px_rgba(255,139,83,0.3)]">
                                                                <span className="text-lg font-bold text-white/90 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">?</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
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
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
