'use client';

import { useState, useEffect } from 'react';

import { DATES } from '@/lib/constants';

type Phase = 'before_open' | 'wave1' | 'wave2' | 'closed';

function getPhase(now: Date): Phase {
    if (now < DATES.REGISTRATION_OPEN) return 'before_open';
    if (now <= DATES.EARLY_BIRD_END) return 'wave1';
    if (now <= DATES.REGISTRATION_CLOSE) return 'wave2';
    return 'closed';
}

function getTargetDate(phase: Phase): Date {
    switch (phase) {
        case 'before_open': return DATES.REGISTRATION_OPEN;
        case 'wave1': return DATES.EARLY_BIRD_END;
        case 'wave2': return DATES.REGISTRATION_CLOSE;
        case 'closed': return DATES.REGISTRATION_CLOSE;
    }
}

function getLabel(phase: Phase): string {
    switch (phase) {
        case 'before_open': return 'Pendaftaran dibuka dalam';
        case 'wave1': return 'Early Bird ditutup dalam';
        case 'wave2': return 'Pendaftaran ditutup dalam';
        case 'closed': return 'Pendaftaran telah ditutup';
    }
}

function getSubLabel(phase: Phase): string | null {
    switch (phase) {
        case 'before_open': return '15 Maret 2026';
        case 'wave1': return 'Gelombang 1 · Early Bird Price';
        case 'wave2': return 'Gelombang 2 · Normal Price';
        case 'closed': return null;
    }
}

const calculateTimeLeft = (target: Date, now: Date) => {
    const difference = +target - +now;
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

export function Countdown({ accentColor }: { accentColor?: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsMounted(true);
            setNow(new Date());
        });

        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        
        return () => {
            cancelAnimationFrame(frame);
            clearInterval(timer);
        };
    }, []);

    // Use a fixed reference date during SSR and initial hydration to prevent mismatch
    const effectiveNow = isMounted ? now : new Date("2026-03-01T00:00:00+07:00");

    const phase = getPhase(effectiveNow);
    const timeLeft = calculateTimeLeft(getTargetDate(phase), effectiveNow);

    const labels: Record<string, string> = {
        days: 'Hari',
        hours: 'Jam',
        minutes: 'Menit',
        seconds: 'Detik'
    };

    const subLabel = getSubLabel(phase);
    
    const glow1 = accentColor ? `${accentColor}33` : "rgba(168,85,247,0.2)"; // 20%
    const glow2 = accentColor ? `${accentColor}4D` : "rgba(249,115,22,0.3)"; // 30%

    return (
        <div 
            className="group relative rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 overflow-hidden bg-white/[0.06] md:bg-white/[0.03] md:backdrop-blur-xl border border-white/10"
            style={{
                boxShadow: `0 0 40px -10px ${glow1}`
            }}
        >
            {/* Ambient Background Glow */}
            <div 
                className={`absolute inset-0 opacity-30 pointer-events-none ${!accentColor && 'bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-orange/20'}`} 
                style={accentColor ? { 
                    background: `linear-gradient(to bottom right, ${glow1}, transparent, ${glow2})`
                } : {}}
            />
            <div 
                className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[30px] opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2 ${!accentColor && 'bg-neon-orange/20'} max-md:hidden`} 
                style={accentColor ? { backgroundColor: glow2 } : {}}
            />
            
            {/* Shimmer Sweep — GPU-only: transform+opacity only, no paint */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 text-center md:text-left mb-10">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 mb-3">
                    <p className="text-sm md:text-base tracking-[0.2em] font-black uppercase text-white relative inline-flex items-center gap-3 font-raela">
                        <span 
                            className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${!accentColor && 'bg-neon-orange shadow-[0_0_10px_rgba(249,115,22,1)]'}`} 
                            style={accentColor ? { backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` } : {}}
                        />
                        {getLabel(phase)}
                    </p>
                    {phase === 'wave1' && (
                        <div className="relative flex items-center gap-1.5 px-3 py-1 mt-1 md:mt-0 rounded bg-[#FF8B53]/5 border border-[#FF8B53]/20 shrink-0 overflow-hidden transform-gpu">
                            {/* Performant light leak bloom */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#FF8B53] opacity-30 blur-xl pointer-events-none mix-blend-screen" />
                            
                            {/* Animated performant breathing glow without layout shifts */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8B53]/30 to-transparent opacity-0 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none" />

                            <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-neon-orange ring-2 ring-neon-orange/40" />
                            <span className="relative z-10 text-[10.5px] md:text-[11.5px] text-white font-bold uppercase tracking-widest pl-0.5 text-shadow-[0_0_10px_rgba(255,139,83,0.8)]">EXTENDED</span>
                        </div>
                    )}
                </div>
                {subLabel && (
                    <p className="text-xs md:text-sm text-white/50 font-raela tracking-[0.15em] pl-0 text-center md:text-left md:pl-[1.25rem] font-bold">
                        {subLabel}
                    </p>
                )}
            </div>

            {phase !== 'closed' ? (
                <div className="relative z-10 w-full mt-8">
                    {/* Unified Outer Glow */}
                    <div 
                        className="absolute -inset-0.5 rounded-[1.5rem] md:rounded-[2rem] opacity-30 group-hover:opacity-100 transition duration-700 blur-md pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${glow1}, ${glow2})` }}
                    />
                    
                    <div 
                        className="relative grid grid-cols-4 gap-2 sm:gap-4 items-center bg-black/80 md:backdrop-blur-2xl rounded-2xl md:rounded-[1.75rem] py-6 sm:py-8 lg:py-10 px-2 sm:px-4 md:px-8 border border-white/10 w-full"
                        style={{ 
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255,255,255,0.03)',
                        }}
                    >
                        {/* Top physical light reflection */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70 blur-[1px]" />

                        {Object.entries(timeLeft).map(([interval, value], index) => (
                            <div key={interval} className="flex flex-col items-center justify-center relative w-full">
                                <span 
                                    className="font-raela font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tighter leading-none inline-block text-center w-[1.5em] drop-shadow-lg"
                                >
                                    {value.toString().padStart(2, '0')}
                                </span>
                                <span 
                                    className={`text-[8px] md:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] mt-2 sm:mt-4 lg:mt-5 font-raela font-black text-center ${!accentColor && 'text-neon-orange/80'}`}
                                    style={accentColor ? { color: accentColor, opacity: 0.9 } : {}}
                                >
                                    {labels[interval]}
                                </span>

                                {/* Subtle vertical dividers between numbers */}
                                {index < 3 && (
                                    <div className="absolute right-[-0.25rem] sm:right-[-0.5rem] top-1/2 -translate-y-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="relative z-10 text-white/70 text-xl md:text-2xl font-raela font-black text-center py-8">
                    Sampai jumpa tahun depan!
                </p>
            )}
        </div>
    );
}
