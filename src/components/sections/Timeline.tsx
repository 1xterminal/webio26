'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const events = [
    {
        date: "15 Mar - 5 Apr 2026",
        title: "Pendaftaran Gelombang Pertama",
        description: "Periode pendaftaran awal dibuka terbuka bagi seluruh peserta.",
        startDate: new Date('2026-03-15T00:00:00+07:00'),
    },
    {
        date: "6 Apr - 30 Apr 2026",
        title: "Pendaftaran Gelombang Kedua & Pengumpulan Karya",
        description: "Periode pendaftaran reguler dan batas akhir pengiriman hasil karya peserta.",
        startDate: new Date('2026-04-06T00:00:00+07:00'),
    },
    {
        date: "30 Apr - 10 Mei 2026",
        title: "Penilaian Karya Peserta",
        description: "Dewan juri menyeleksi hasil karya seluruh tim.",
        startDate: new Date('2026-04-30T00:00:00+07:00'),
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
        description: "Para finalis menyampaikan presentasi secara luring di Auditorium UNTAR.",
        startDate: new Date('2026-06-04T00:00:00+07:00'),
    },
    {
        date: "5 Juni 2026",
        title: "Acara Utama Hari Kedua",
        description: "Acara meliputi gelar wicara dan pengumuman pemenang kompetisi.",
        startDate: new Date('2026-06-05T00:00:00+07:00'),
    }
];

export function Timeline() {
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
                    <h2 className="font-raela font-bold text-3xl md:text-6xl mb-4 text-white">JADWAL <span className="text-neon-orange">ACARA</span></h2>
                    <p className="text-white/60 font-raela">Tandai kalendermu. Perjalanan dimulai sekarang.</p>
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
                                    className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 group transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                                >
                                    {/* Content Side */}
                                    <div className={`flex-1 pl-14 md:pl-0 w-full ${index % 2 === 0 ? 'md:text-right text-left' : 'text-left'} transition-opacity duration-500 ${isPassed ? 'opacity-40' : 'opacity-100'}`}>
                                        <h3 className={`font-raela text-xs tracking-[0.15em] uppercase mb-3 font-black transition-colors duration-500 ${isActive ? 'text-neon-orange drop-shadow-[0_0_10px_rgba(255,139,83,0.6)]' : isPassed ? 'text-white/40' : 'text-neon-blue/80'}`}>{event.date}</h3>
                                        <h4 className={`text-2xl font-bold font-raela transition-colors duration-500 mb-3 ${isActive ? 'text-white' : 'text-white/80'}`}>{event.title}</h4>
                                        <p className="text-white/60 text-sm font-light leading-relaxed max-w-md ml-0 ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0 md:mr-auto'}">{event.description}</p>
                                    </div>

                                    {/* Center Node (Desktop) */}
                                    <div className="hidden md:flex relative shrink-0 w-10 h-10 items-center justify-center">
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-screen bg-neon-orange" />
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
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-screen bg-neon-orange" />
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
