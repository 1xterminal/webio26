'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { useDownloadInteraction } from '@/hooks/useDownloadInteraction';
import { PremiumCardGlow, SmallDocCard } from './CompetitionShared';

import { CompetitionData } from '@/lib/competitions';

interface Rulebook {
    title: string;
    desc: string;
    url: string;
}

interface CompetitionDocsProps {
    data: CompetitionData;
    regStatus: string;
}

export const CompetitionDocs = React.memo(({ data, regStatus }: CompetitionDocsProps) => {
    const { status: mainRulebookStatus, handleDownload: handleMainRulebookDownload } = useDownloadInteraction();
    const rulebookList: Rulebook[] = data.rulebooks || [{ title: 'Rulebook', desc: 'Official Rulebook of I/O Festival 2026', url: '#' }];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16 block"
            id="documents"
        >
            <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-6 font-black">Kelengkapan Lomba</h2>

            <div className="flex flex-col gap-4">
                {/* Unified Rulebook Card */}
                <div
                    className="relative flex flex-col gap-8 p-8 md:p-10 rounded-3xl bg-black/80 md:bg-black/60 md:backdrop-blur-xl transition-all duration-500 overflow-hidden w-full z-10 group mt-4 transform-gpu"
                    style={{
                        boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-3xl" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center gap-8">
                        <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg border border-white/5 ${mainRulebookStatus === 'idle' ? 'group-hover:scale-110' : ''}`} style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                {mainRulebookStatus === 'success' ? (
                                    <CheckCircle2 className="w-10 h-10 text-emerald-400" style={{ filter: 'drop-shadow(0 0 12px #34d399)' }} />
                                ) : mainRulebookStatus === 'loading' ? (
                                    <Loader2 className="w-10 h-10 text-white/50 animate-spin" />
                                ) : (
                                    <BookOpen className="w-10 h-10 text-white" style={{ filter: `drop-shadow(0 0 12px ${data.accentHex})` }} />
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-white font-bold text-2xl md:text-3xl font-raela group-hover:text-white transition-colors">
                                        {rulebookList.length > 1 ? 'Rulebook Kompetisi' : rulebookList[0].title}
                                    </span>
                                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-red-500/10 text-red-400 font-raela shrink-0">PDF</span>
                                </div>
                                <div className="flex justify-center mt-1 mb-2">
                                    <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/50 uppercase font-raela shrink-0 animate-pulse">Updated!</span>
                                </div>
                                <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto group-hover:text-white/80 transition-colors">
                                    {rulebookList.length > 1 ? 'Official Rulebook of I/O Festival 2026' : rulebookList[0].desc}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            {rulebookList.map((rb, idx) => {
                                const label = rulebookList.length > 1 
                                    ? (rb.title.includes('SMA') || rb.title.includes('Siswa') ? 'SMA/SMK' : 'Mahasiswa/Umum')
                                    : 'Open Rulebook';
                                
                                return (
                                    <a
                                        key={idx}
                                        href={rb.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => handleMainRulebookDownload(e)}
                                        className={`w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-white px-8 py-4 rounded-full transition-all duration-300 relative z-20 whitespace-nowrap border ${
                                            mainRulebookStatus === 'success' 
                                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                                                : mainRulebookStatus === 'loading'
                                                ? 'bg-white/5 text-white/50 cursor-wait border-transparent'
                                                : 'bg-white/10 hover:bg-white/20 border-white/5 hover:border-white/20'
                                        }`}
                                    >
                                        {mainRulebookStatus === 'idle' && (
                                            <>
                                                {label}
                                                <ExternalLink className="w-4 h-4 transition-transform" />
                                            </>
                                        )}
                                        {mainRulebookStatus === 'loading' && <span className="animate-pulse">Loading...</span>}
                                        {mainRulebookStatus === 'success' && 'Berhasil!'}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 3 Smaller Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Pernyataan Orisinalitas', desc: 'Statement of Originality', href: '/downloads/LEMBAR PERNYATAAN ORISINALITAS KARYA.docx', type: 'DOCX', comingSoon: false },
                        { title: 'Logo I/O Festival 2026', desc: 'Official Logo of I/O Festival 2026', href: '/downloads/logo-iofest-2026.png', type: 'PNG', comingSoon: false },
                        { title: 'Twibbon', desc: 'Official Twibbon of I/O Festival 2026', href: 'https://drive.google.com/drive/folders/1o997MjNSa_Zp2IdsGoPplnTNJsWiB3ee?usp=sharing', type: 'PNG', comingSoon: false },
                    ].map((doc, idx) => {
                        const badgeColor = doc.type === 'DOCX' ? 'bg-blue-500/10 text-blue-400'
                                            : doc.type === 'PNG' ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'bg-white/5 text-white/30';

                        return (
                            <SmallDocCard key={idx} doc={doc} regStatus={regStatus} accentHex={data.accentHex} badgeColor={badgeColor} />
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
});
CompetitionDocs.displayName = 'CompetitionDocs';
