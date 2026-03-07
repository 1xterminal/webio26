'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';

export function CTA() {
    const regStatus = useRegistrationStatus();

    return (
        <section className="relative py-24 bg-black overflow-hidden border-t border-white/5">
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <div
                    className="p-8 md:p-16 relative overflow-hidden group rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_2px_0_0_rgba(255,255,255,0.2)]"
                    style={{
                        background: 'rgba(255, 255, 255, 0)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                    }}
                >
                    {/* Gradient Border Mask */}
                    <div
                        className="absolute inset-0 rounded-[32px] pointer-events-none"
                        style={{
                            padding: '1.5px',
                            background: `linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%)`,
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <h2 className="font-raela font-black text-4xl md:text-6xl text-white mb-6 tracking-tighter uppercase relative z-10">
                        Siap Berkompetisi?
                    </h2>

                    <p className="text-white/70 text-lg md:text-xl font-sans mb-10 max-w-2xl mx-auto relative z-10">
                        Daftarkan tim Anda hari ini. Total hadiah mencapai <span className="text-neon-orange font-bold font-raela tracking-wider">Rp 46.000.000</span>. Tunjukkan kemampuan Anda pada tingkat nasional.
                    </p>

                    {regStatus === 'open' ? (
                        <Link
                            href="/kelengkapan"
                            className="inline-flex items-center gap-3 bg-white text-black font-raela font-bold text-lg px-10 py-4 hover:bg-neon-orange hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,139,83,0.3)] hover:shadow-[0_0_30px_rgba(255,139,83,0.6)] relative z-10 uppercase tracking-widest"
                        >
                            DAFTAR SEKARANG
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    ) : (
                        <span
                            className={`inline-flex items-center gap-3 font-raela font-bold text-lg px-10 py-4 relative z-10 uppercase tracking-widest cursor-not-allowed ${regStatus === 'upcoming'
                                    ? 'bg-white/20 text-white/50'
                                    : 'bg-white/10 text-white/30'
                                }`}
                        >
                            {regStatus === 'upcoming' ? 'SEGERA DIBUKA' : 'PENDAFTARAN DITUTUP'}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}
