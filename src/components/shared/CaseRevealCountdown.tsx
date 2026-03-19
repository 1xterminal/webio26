'use client';

import { useState, useEffect } from 'react';

const REVEAL_DATE = new Date('2026-03-24T10:00:00+07:00');

interface CaseRevealCountdownProps {
    accentColor?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showGlass?: boolean;
    hideLabel?: boolean;
}

export function CaseRevealCountdown({ 
    accentColor, 
    className = "", 
    size = 'sm',
    showGlass = false,
    hideLabel = false
}: CaseRevealCountdownProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Use a microtask to avoid synchronous setState inside useEffect
        Promise.resolve().then(() => setIsMounted(true));
        
        const updateCountdown = () => {
            const now = new Date();
            const difference = +REVEAL_DATE - +now;

            if (difference > 0) {
                setTimeLeft(prev => {
                    const nextDays = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const nextHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const nextMinutes = Math.floor((difference / 1000 / 60) % 60);
                    const nextSeconds = Math.floor((difference / 1000) % 60);

                    // Bail out of state update if values are identical (prevents re-renders)
                    if (prev.seconds === nextSeconds && prev.minutes === nextMinutes && prev.hours === nextHours && prev.days === nextDays) {
                        return prev;
                    }

                    return {
                        days: nextDays,
                        hours: nextHours,
                        minutes: nextMinutes,
                        seconds: nextSeconds
                    };
                });
            }
        };

        // Run immediately
        updateCountdown();
        
        // Update at 1Hz instead of 60Hz
        const timerId = setInterval(updateCountdown, 1000);
        return () => clearInterval(timerId);
    }, []);

    if (!isMounted || +new Date() >= +REVEAL_DATE) return null;

    const units = [
        { label: 'd', value: timeLeft.days },
        { label: 'h', value: timeLeft.hours },
        { label: 'm', value: timeLeft.minutes },
        { label: 's', value: timeLeft.seconds },
    ];

    const sizeStyles = {
        sm: {
            container: "gap-1.5",
            label: "text-[7px] sm:text-[8px]",
            value: "text-[9px] sm:text-[10px]",
            unit: "text-[7px] sm:text-[8px]",
            separator: "text-[8px] sm:text-[9px]",
            dot: "h-1 sm:h-1.5 w-1 sm:w-1.5"
        },
        md: {
            container: "gap-2 sm:gap-2.5",
            label: "text-[8px] sm:text-[10px]",
            value: "text-sm sm:text-base",
            unit: "text-[8px] sm:text-[10px]",
            separator: "text-xs sm:text-sm",
            dot: "h-1.5 sm:h-2 w-1.5 sm:w-2"
        },
        lg: {
            container: "gap-3 sm:gap-4",
            label: "text-[10px] sm:text-xs",
            value: "text-xl sm:text-2xl md:text-3xl",
            unit: "text-[10px] sm:text-xs md:text-sm",
            separator: "text-lg sm:text-xl",
            dot: "h-2 sm:h-3 w-2 sm:w-3"
        }
    }[size];

    return (
        <div className={`flex flex-col ${size === 'lg' ? 'items-start' : 'items-center'} ${className}`}>
            {!hideLabel && (
                <span className={`${sizeStyles.label} font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 sm:text-white/40 mb-1 sm:animate-pulse`}>
                    Official Reveal In
                </span>
            )}
            <div className={`flex items-center ${sizeStyles.container} font-raela ${showGlass ? 'bg-white/5 md:backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl' : ''}`}>
                <div className="flex items-center gap-2 md:gap-3">
                    {units.map((unit, index) => (
                        <div key={unit.label} className="flex items-baseline group">
                            <div className="relative">
                                <span 
                                    className={`${sizeStyles.value} font-black text-white tabular-nums tracking-tighter transition-all duration-300 group-hover:scale-110 block`}
                                    style={accentColor ? { color: accentColor, textShadow: `0 0 20px ${accentColor}40` } : {}}
                                >
                                    {unit.value.toString().padStart(2, '0')}
                                </span>
                            </div>
                            <span className={`${sizeStyles.unit} font-bold text-white/30 ml-1 uppercase`}>{unit.label}</span>
                            {index < units.length - 1 && (
                                <span className={`${sizeStyles.separator} font-light text-white/10 ml-2 md:ml-3 shrink-0`}>/</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
