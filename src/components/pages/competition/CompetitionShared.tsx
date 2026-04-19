import React from 'react';
import Image from 'next/image';
import { FileCheck, ImageIcon, ExternalLink, Download, Loader2, CheckCircle2 } from 'lucide-react';
import { useDownloadInteraction } from '@/hooks/useDownloadInteraction';

// Top-Level Unified Premium Gradient Glow
export const PremiumCardGlow = ({ accentHex, roundedClass = 'rounded-2xl' }: { accentHex: string, roundedClass?: string }) => {
    return (
        <>
            {/* Layer 1: Immersive Ambient Glow Background */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu translate-z-0 pointer-events-none will-change-[transform,opacity] ${roundedClass}`}
                style={{ background: `radial-gradient(circle at 100% 0%, ${accentHex} 0%, transparent 80%)` }}
            />

            {/* Layer 2: Intense Top-Right Flare */}
            <div
                className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 group-hover:opacity-60 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu translate-z-0 mix-blend-screen max-md:blur-[40px] md:blur-[80px] pointer-events-none will-change-[transform,opacity]"
                style={{ background: accentHex }}
            />

            {/* Layer 3: Glowing Gradient Border Mask (Desktop Only) */}
            <div
                className={`absolute inset-0 ${roundedClass} pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu translate-z-0 hidden md:block will-change-[transform,opacity]`}
                style={{
                    padding: '1px',
                    background: `linear-gradient(135deg, ${accentHex}90 0%, rgba(255,255,255,0.05) 100%)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />
            
            {/* Layer 3 Mobile Fallback: Standard Border */}
            <div 
                className={`absolute inset-0 ${roundedClass} pointer-events-none border opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] md:hidden transform-gpu translate-z-0 will-change-[transform,opacity]`}
                style={{ borderColor: `${accentHex}60` }}
            />

            {/* Layer 4: Inner Glow & Shadow Enhancement (Desktop Only) */}
            <div
                className={`absolute inset-0 ${roundedClass} opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu translate-z-0 pointer-events-none hidden md:block will-change-[transform,opacity]`}
                style={{ boxShadow: `inset 0 0 40px ${accentHex}15, 0 10px 40px 0 ${accentHex}25` }}
            />
        </>
    );
};
PremiumCardGlow.displayName = 'PremiumCardGlow';

export function SmallDocCard({ doc, regStatus, accentHex, badgeColor }: { doc: { title: string, desc: string, href: string, type: string, comingSoon: boolean }, regStatus: string, accentHex: string, badgeColor: string }) {
    const { status, handleDownload } = useDownloadInteraction();
    const isLocked = doc.comingSoon && regStatus === 'upcoming';

    if (isLocked) {
        return (
            <div
                className="relative flex flex-col items-start gap-4 p-5 rounded-2xl md:backdrop-blur-xl overflow-hidden w-full z-10 opacity-50 cursor-not-allowed"
                style={{
                    background: 'rgba(20, 20, 20, 0.6)',
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${accentHex}, transparent)`, opacity: 0.05 }} />

                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))` }}>
                    {doc.title.includes('Orisinalitas') && <FileCheck className="w-5 h-5 text-white/30" />}
                    {doc.title.includes('Twibbon') && <ImageIcon className="w-5 h-5 text-white/30" />}
                    {doc.title.includes('Logo') && (
                        <Image 
                            src="/assets/logo/logo io transparant.png" 
                            alt="Logo I/O Fest" 
                            width={24} 
                            height={24} 
                            className="object-contain opacity-30 px-1"
                        />
                    )}
                    {!doc.title.includes('Orisinalitas') && !doc.title.includes('Twibbon') && !doc.title.includes('Logo') && (
                        <ExternalLink className="w-5 h-5 text-white/30" />
                    )}
                </div>

                <div className="relative z-10 flex-1 w-full flex flex-col h-full">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white/50 font-bold text-base font-raela">{doc.title}</span>
                        {doc.title.toLowerCase().includes('rulebook') && (
                            <span className="ml-1 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/50 opacity-50">Updated!</span>
                        )}
                    </div>
                    <span className="text-white/30 text-xs block mb-4">{doc.desc}</span>
                    <div className="mt-auto flex items-center justify-between w-full">
                        <span className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded-md bg-white/5 text-white/30 font-raela`}>
                            {doc.type}
                        </span>
                        <span className="text-[9px] font-raela font-black uppercase tracking-widest text-white/50 bg-white/10 px-2 py-1 rounded-md border border-white/5">
                            Wait
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const downloadAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (doc.type !== 'LINK') {
            handleDownload(e);
        }
    };

    return (
        <a
            href={doc.href}
            download={doc.type !== 'LINK'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={downloadAction}
            className={`relative flex flex-col items-start gap-4 p-5 rounded-2xl bg-black/80 md:bg-black/60 md:backdrop-blur-xl transition-transform duration-500 overflow-hidden group w-full z-10 transform-gpu ${status === 'idle' ? 'hover:-translate-y-2' : ''}`}
            style={{
                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <PremiumCardGlow accentHex={accentHex} roundedClass="rounded-2xl" />

            <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg border border-white/5 ${status === 'idle' ? 'group-hover:scale-110' : ''}`} style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                {status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" style={{ filter: 'drop-shadow(0 0 8px #34d399)' }} />
                ) : status === 'loading' ? (
                    <Loader2 className="w-5 h-5 text-white/50 animate-spin" />
                ) : (
                    <>
                        {doc.title.includes('Orisinalitas') && <FileCheck className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />}
                        {doc.title.includes('Twibbon') && <ImageIcon className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />}
                        {doc.title.includes('Logo') && (
                            <Image 
                                src="/assets/logo/logo io transparant.png" 
                                alt="Logo I/O Fest" 
                                width={24} 
                                height={24} 
                                className="object-contain"
                                style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }}
                            />
                        )}
                        {!doc.title.includes('Orisinalitas') && !doc.title.includes('Twibbon') && !doc.title.includes('Logo') && (
                            <ExternalLink className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />
                        )}
                    </>
                )}
            </div>

            <div className="relative z-10 flex-1 w-full flex flex-col h-full">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white font-bold block text-base group-hover:text-white transition-colors font-raela">{doc.title}</span>
                    {doc.title.toLowerCase().includes('rulebook') && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse">Updated!</span>
                    )}
                </div>
                <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors block mb-4">{doc.desc}</span>
                <div className="mt-auto flex items-center justify-between w-full">
                    <span className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded-md ${badgeColor} font-raela`}>
                        {doc.type}
                    </span>
                    <div 
                        className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md transition-colors ${
                            status === 'success'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : status === 'loading'
                                ? 'bg-white/5 text-white/50 cursor-wait'
                                : 'bg-white/10 group-hover:bg-white/20'
                        }`}
                    >
                        {status === 'idle' && (
                            <>
                                {doc.title.includes('Orisinalitas') || doc.title.includes('Logo') ? (
                                    <Download className="w-3" />
                                ) : doc.title.includes('Twibbon') ? (
                                    <svg className="w-3.5 h-3.5 translate-y-[0.5px]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.857 14.786l-3.257 5.643H4.429L1.171 14.786H22.857z" />
                                        <path d="M7.714 3.5l6.586 11.4h6.557L14.271 3.5H7.714z" />
                                        <path d="M1.143 14.786L7.729 3.5h6.557L7.7 14.786H1.143z" />
                                    </svg>
                                ) : (
                                    <ExternalLink className="w-3" />
                                )}
                            </>
                        )}
                        {status === 'loading' && <Loader2 className="w-3 h-3 animate-spin" />}
                        {status === 'success' && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                </div>
            </div>
        </a>
    );
}
SmallDocCard.displayName = 'SmallDocCard';
