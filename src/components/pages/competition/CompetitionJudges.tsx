'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { PremiumCardGlow } from './CompetitionShared';

interface Judge {
    name: string;
    role: string;
    title: string;
    company: string;
    imagePath?: string;
    objectPosition?: string;
}

interface CompetitionJudgesProps {
    judges: Judge[];
    accentHex: string;
}

export const CompetitionJudges = React.memo(({ judges, accentHex }: CompetitionJudgesProps) => {
    const groupedJudges = useMemo(() => {
        if (!judges) return [];
        const grouped = judges.reduce((acc, judge) => {
            if (!acc[judge.role]) acc[judge.role] = [];
            acc[judge.role].push(judge);
            return acc;
        }, {} as Record<string, Judge[]>);
        return Object.entries(grouped);
    }, [judges]);

    if (!judges || judges.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-16 mt-0"
        >
            <div className="flex flex-col items-center text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-raela font-black text-white tracking-tight uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    Meet Our <span style={{ color: accentHex, textShadow: `0 0 20px ${accentHex}80` }}>Judges</span>
                </h2>
                <div className="h-1 w-16 mt-4 mb-4 rounded-full opacity-50 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)` }} />
                <p className="text-white/50 text-sm max-w-lg mx-auto">
                    Para pakar dan profesional yang akan mengevaluasi serta memberikan feedback berharga bagi karya-karya terbaikmu.
                </p>
            </div>

            <div className="flex flex-col gap-12 w-full">
                {groupedJudges.map(([role, judgesInGroup]) => (
                    <div key={role} className="flex flex-col items-center w-full">
                        {groupedJudges.length > 1 && (
                            <div className="flex items-center justify-center gap-4 mb-8 w-full relative">
                                <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-white/20" />
                                <div className="px-6 py-2.5 rounded-xl border bg-black/80 md:bg-black/40 border-white/10 flex items-center gap-2 shadow-lg md:backdrop-blur-md relative overflow-hidden group/cat transform-gpu">
                                    <div className="absolute inset-0 opacity-20 group-hover/cat:opacity-40 transition-opacity duration-500" style={{ background: `linear-gradient(45deg, transparent, ${accentHex}, transparent)` }} />
                                    <span className="relative z-10 text-white font-raela font-black uppercase tracking-[0.2em] text-xs sm:text-sm whitespace-nowrap" style={{ textShadow: `0 0 10px ${accentHex}80` }}>
                                        Kategori <span style={{ color: accentHex }}>{role.replace('Juri Kategori ', '').replace('Juri', 'Umum')}</span>
                                    </span>
                                </div>
                                <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-white/20" />
                            </div>
                        )}

                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${judgesInGroup.length >= 4 ? 4 : judgesInGroup.length === 3 ? 3 : judgesInGroup.length === 2 ? 2 : 1} gap-6 w-full mx-auto`}>
                            {judgesInGroup.map((judge) => (
                                <JudgeCard key={judge.name} judge={judge} accentHex={accentHex} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
});
CompetitionJudges.displayName = 'CompetitionJudges';

const JudgeCard = React.memo(({ judge, accentHex }: { judge: Judge, accentHex: string }) => {
    return (
        <div
            className="group relative flex flex-col items-center p-8 rounded-3xl bg-black/80 md:bg-black/60 md:backdrop-blur-xl border border-white/5 transition-transform duration-500 overflow-hidden hover:-translate-y-2 w-full text-center transform-gpu"
            style={{
                boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
            }}
        >
            <PremiumCardGlow accentHex={accentHex} roundedClass="rounded-3xl" />
            
            <div className="relative z-10 w-28 h-28 md:w-32 md:h-32 mb-6 rounded-full overflow-hidden border-[3px] border-white/10 group-hover:border-white/40 transition-colors shadow-lg" style={{ boxShadow: `0 0 25px ${accentHex}30` }}>
                {judge.imagePath ? (
                    <Image 
                        src={judge.imagePath} 
                        alt={judge.name} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                        style={{ objectPosition: judge.objectPosition || 'center' }}
                        sizes="(max-width: 768px) 112px, 128px"
                        priority={true} // First few judges are usually above the fold or close to it
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                        <User className="w-12 h-12 text-white/30 group-hover:text-white/50 transition-colors" />
                    </div>
                )}
            </div>
            <div className="relative z-10">
                <h3 className="font-raela font-black text-xl text-white tracking-wide mb-3">{judge.name}</h3>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white/70 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] leading-tight">
                        {judge.title}
                    </p>
                    <div className="text-white/40 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                        {judge.company === 'BCA' ? (
                            <div className="h-12 sm:h-15 mt-2 brightness-110 opacity-90 transition-all group-hover:opacity-100 group-hover:scale-110 duration-500 flex items-center justify-center">
                                <Image 
                                   src="/assets/sponsors/Logo BCA_Putih.png" 
                                   alt="BCA" 
                                   width={72} height={32}
                                   className="object-contain"
                                />
                            </div>
                        ) : (
                            judge.company
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
JudgeCard.displayName = 'JudgeCard';
