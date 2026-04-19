'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineStage {
    date: string;
    label: string;
}

interface CompetitionTimelineProps {
    timelineStages: TimelineStage[];
    currentPhase: number;
    accentHex: string;
}

export const CompetitionTimeline = React.memo(({ timelineStages, currentPhase, accentHex }: CompetitionTimelineProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-16 mt-8"
        >
            <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-2 font-black">Timeline</h2>

            <div className="relative w-full overflow-x-auto lg:overflow-x-hidden no-scrollbar pb-6 lg:pb-12 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="min-w-[800px] lg:min-w-0 lg:w-full relative pt-10 pb-4">
                    {/* Base Track Line */}
                    <div 
                        className="absolute top-[51px] h-[2px] bg-white/10 rounded-full z-0" 
                        style={{ 
                            left: `calc(100% / (${timelineStages.length} * 2))`,
                            right: `calc(100% / (${timelineStages.length} * 2))`
                        }}
                    />

                    {/* Dynamic Progress Tracking Line */}
                    <div
                        className="absolute top-[51px] h-[3px] rounded-full transition-all duration-[1500ms] ease-out origin-left z-0"
                        style={{
                            left: `calc(100% / (${timelineStages.length} * 2))`,
                            width: `calc((100% - (100% / ${timelineStages.length})) * ${currentPhase / (timelineStages.length - 1)})`,
                            backgroundColor: accentHex,
                            boxShadow: `0 0 20px ${accentHex}80`
                        }}
                    />

                    <div className="flex justify-between relative z-10 w-full">
                        {timelineStages.map((item, i) => {
                            let isPassed = i < currentPhase;
                            let isActive = i === currentPhase;
                            
                            const now = new Date();
                            const isEarlyBirdStillActive = now >= new Date('2026-03-15T00:00:00+07:00') && now <= new Date('2026-04-19T23:59:59+07:00');

                            if (item.label === 'Early Bird' && isEarlyBirdStillActive) {
                                isActive = true;
                                isPassed = false;
                            }

                            return (
                                <div key={i} className="flex flex-col items-center flex-1 relative group min-w-0">
                                    <div className="relative flex items-center justify-center w-6 h-6 mb-4">
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-screen" style={{ backgroundColor: accentHex }} />
                                        )}
                                        <div
                                            className={`w-3.5 h-3.5 rounded-full transition-all duration-700 z-10 border-[2px] ${isActive ? 'scale-[1.8]' : isPassed ? 'scale-100' : 'scale-[0.8] opacity-50 shadow-none'
                                                }`}
                                            style={{
                                                borderColor: (isPassed || isActive) ? accentHex : 'rgba(255,255,255,0.2)',
                                                backgroundColor: isPassed ? accentHex : isActive ? '#000' : 'transparent',
                                                boxShadow: isActive ? `0 0 20px ${accentHex}, inset 0 0 8px ${accentHex}` : 'none'
                                            }}
                                        />
                                    </div>

                                    <span className={`font-raela text-[9px] xl:text-xs font-black transition-colors duration-500 whitespace-nowrap mb-1 ${isActive ? 'text-white' : isPassed ? 'text-white/80' : 'text-white/30'}`}>
                                        {item.date}
                                    </span>
                                    <div className={`flex items-start justify-center text-center transition-colors duration-500 line-clamp-2 px-1 ${isActive ? 'text-white/90' : isPassed ? 'text-white/50' : 'text-white/20'}`}>
                                        <span className="text-[8px] xl:text-[10px] uppercase tracking-wider font-bold leading-tight">
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
CompetitionTimeline.displayName = 'CompetitionTimeline';
