'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';

export function CTA() {
    const regStatus = useRegistrationStatus();

    return (
        <section className="relative py-16 md:py-24 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 relative z-10 flex justify-center">
                <div className="w-full max-w-5xl">
                        <Link
                            href="#"
                            className="group relative flex flex-col items-center text-center p-8 md:p-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu overflow-hidden rounded-[24px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-2 bg-[rgba(20,20,20,0.8)] md:bg-[rgba(20,20,20,0.4)] md:[backdrop-filter:blur(16px)] md:[-webkit-backdrop-filter:blur(16px)]"
                        >
                            {/* Layer 1: Immersive Ambient Glow Background */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 pointer-events-none rounded-[24px]"
                                style={{ background: `radial-gradient(circle at 100% 0%, #FF8B53 0%, transparent 80%)` }}
                            />

                            {/* Layer 2: Intense Top-Right Flare */}
                            <div
                                className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 group-hover:opacity-60 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 mix-blend-screen blur-[60px] md:blur-[80px] pointer-events-none"
                                style={{ background: '#FF8B53' }}
                            />

                            {/* Layer 3: Glowing Gradient Border Mask */}
                            <div
                                className="absolute inset-0 rounded-[24px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0"
                                style={{
                                    padding: '1px',
                                    background: `linear-gradient(135deg, #FF8B5390 0%, rgba(255,255,255,0.05) 100%)`,
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                }}
                            />
                            
                            {/* Layer 4: Inner Glow & Shadow Enhancement */}
                            <div
                                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 pointer-events-none"
                                style={{ boxShadow: `inset 0 0 40px #FF8B5315, 0 10px 40px 0 #FF8B5325` }}
                            />

                            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                <ArrowRight className="w-16 h-16 md:w-20 md:h-20 text-neon-orange drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                            </div>


                            <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white mb-3 leading-tight uppercase">Siap Berkompetisi?</h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-6">
                                Daftar sekarang dan raih hadiah dengan total <span className="text-white font-bold">Rp 45.000.000+</span>
                            </p>

                            <div className="mt-auto pt-6">
                                {regStatus === 'open' ? (
                                    <div className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wide text-white overflow-hidden group/btn shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:shadow-[0_0_30px_#FF8B5340] transform-gpu`}>
                                        <div className={`absolute inset-0 bg-gradient-to-r from-neon-orange to-orange-600 opacity-90 group-hover/btn:opacity-100 transition-opacity duration-[400ms] ease-out translate-z-0`} />
                                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] translate-z-0" />
                                        <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                                            Daftar Sekarang <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                ) : (
                                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/30 font-bold text-sm uppercase">
                                        {regStatus === 'upcoming' ? 'Segera Dibuka' : 'Ditutup'}
                                    </div>
                                )}
                            </div>
                        </Link>
                </div>
            </div>
        </section>
    );
}
