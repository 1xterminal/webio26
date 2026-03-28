'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';
import { UIUXIcon } from '@/components/ui/icons/UIUXIcon';
import { WebDevIcon } from '@/components/ui/icons/WebDevIcon';
import { BusinessCaseIcon } from '@/components/ui/icons/BusinessCaseIcon';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';

const tracks = [
    {
        icon: UIUXIcon,
        title: 'UI/UX Design',
        description: 'Bikin tampilan yang tidak hanya enak dipandang, tapi juga punya pengalaman pengguna yang intuitif. Tunjukkan bagaimana desainmu bisa benar-benar mempermudah kehidupan sehari-hari dengan impact yang nyata!',
        color: 'from-neon-purple to-purple-600',
        accentHex: '#A856EE',
        href: '/kompetisi/ui-ux',
        tags: ['SMA/SMK', 'Mahasiswa', 'Umum'],
    },
    {
        icon: BusinessCaseIcon,
        title: 'Business Case',
        description: 'Susun strategi bisnis berbasis teknologi yang efektif dan punya visi ke depan. Kami ingin melihat bagaimana idemu bisa tumbuh sekaligus memberikan manfaat nyata bagi sekitar.',
        color: 'from-neon-orange to-orange-600',
        accentHex: '#FF8B53',
        href: '/kompetisi/business-case',
        tags: ['Mahasiswa', 'Umum'],
    },
    {
        icon: WebDevIcon,
        title: 'Web Development',
        description: 'Tampil menarik saja belum cukup! kami menanti terobosanmu dalam membangun website yang fungsional dan berdampak. Punya ide yang tepat? Saatnya unjuk gigi di sini!',
        color: 'from-neon-blue to-blue-600',
        accentHex: '#1DBCD3',
        href: '/kompetisi/web-dev',
        tags: ['SMA/SMK', 'Mahasiswa', 'Umum'],
    }
];

export function Tracks() {
    const [isPastRevealDate, setIsPastRevealDate] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsMounted(true);
            const now = new Date();
            const revealDate = new Date('2026-03-24T10:00:00+07:00');
            setIsPastRevealDate(now >= revealDate);
        }, 0);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <section id="tracks" className="py-16 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="font-raela font-bold text-3xl md:text-7xl mb-6">
                        <span className="text-white">CABANG</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange">KOMPETISI</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg mb-3">
                        Manakah bidang yang paling sesuai dengan skill-mu? Pilih kategori yang paling cocok, lalu berikan aksi terbaik timmu untuk bisa bersaing di Grand Final. Terbuka untuk pelajar, mahasiswa, dan umum. Mari buktikan inovasimu di sini!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tracks.map((track, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                            transition={{ delay: index * 0.1 }}
                            className={`h-full ${track.title === 'Business Case' ? 'order-first md:order-none' : ''}`}
                        >
                            <Link
                                href={track.href}
                                prefetch={true}
                                className="group relative flex flex-col h-full p-8 md:p-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu overflow-hidden rounded-[24px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-2 bg-[rgba(20,20,20,0.8)] md:bg-[rgba(20,20,20,0.4)] md:[backdrop-filter:blur(16px)] md:[-webkit-backdrop-filter:blur(16px)]"
                            >
                                {/* Layer 1: Immersive Ambient Glow Background */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 pointer-events-none rounded-[24px]"
                                    style={{ background: `radial-gradient(circle at 100% 0%, ${track.accentHex} 0%, transparent 80%)` }}
                                />

                                {/* Layer 2: Intense Top-Right Flare */}
                                <div
                                    className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 group-hover:opacity-60 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 mix-blend-screen blur-[60px] md:blur-[80px] pointer-events-none"
                                    style={{ background: track.accentHex }}
                                />

                                {/* Layer 3: Glowing Gradient Border Mask (Desktop Only) */}
                                <div
                                    className="absolute inset-0 rounded-[24px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 hidden md:block"
                                    style={{
                                        padding: '1px',
                                        background: `linear-gradient(135deg, ${track.accentHex}90 0%, rgba(255,255,255,0.05) 100%)`,
                                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                        WebkitMaskComposite: 'xor',
                                        maskComposite: 'exclude',
                                    }}
                                />
                                {/* Layer 3 Mobile Fallback: Standard Border */}
                                <div 
                                    className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/10 opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] md:hidden"
                                    style={{ borderColor: `${track.accentHex}50` }}
                                />
                                
                                {/* Layer 4: Inner Glow & Shadow Enhancement (Desktop Only) */}
                                <div
                                    className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-z-0 pointer-events-none hidden md:block"
                                    style={{ boxShadow: `inset 0 0 40px ${track.accentHex}15, 0 10px 40px 0 ${track.accentHex}25` }}
                                />

                                {/* Icon */}
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                                    <track.icon className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                                </div>
                                


                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {track.tags.map((tag, idx) => (
                                        <span 
                                            key={idx} 
                                            className="px-3 py-1 rounded-full text-[10px] font-raela font-bold uppercase tracking-[0.1em] border"
                                            style={{ 
                                                color: track.accentHex,
                                                backgroundColor: `${track.accentHex}15`,
                                                borderColor: `${track.accentHex}40`
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Content & Collaborator Row */}
                                <div className="flex justify-between items-start gap-4 mb-3">
                                    <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white leading-tight">
                                        {track.title}
                                    </h3>
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">
                                    {track.description}
                                </p>

                                {/* Bottom Section (Collaborator Block & CTA) */}
                                <div className="mt-auto flex flex-col w-full">
                                    
                                    {track.title === 'Business Case' && (
                                        <div className="relative mb-6 rounded-2xl p-5 group/collab transition-all duration-700 hover:-translate-y-1 bg-[rgba(10,10,10,0.8)] border md:backdrop-blur-md"
                                             style={{
                                                borderColor: `${track.accentHex}30`
                                             }}>
                                            
                                            {/* Immersive Ambient Background Glow */}
                                            <div className="absolute inset-0 opacity-20 group-hover/collab:opacity-40 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                                                 style={{ background: `radial-gradient(150% 100% at 50% 100%, ${track.accentHex}40 0%, transparent 80%)` }} />
                                            
                                            {/* Glowing Top Border Highlight */}
                                            <div className="absolute top-0 left-0 right-0 h-[1px] opacity-50 group-hover/collab:opacity-100 transition-opacity duration-700" 
                                                 style={{ background: `linear-gradient(90deg, transparent, ${track.accentHex}, transparent)` }} />
                                            
                                            {/* Multi-layered Inner Shadow */}
                                            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/collab:opacity-100 transition-opacity duration-700"
                                                 style={{ boxShadow: `inset 0 0 20px ${track.accentHex}15, 0 10px 20px -5px rgba(0,0,0,0.5)` }} />

                                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between px-2 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-raela font-black uppercase tracking-[0.3em] transition-colors duration-500" style={{ color: track.accentHex }}>Official Case Collaborator</span>
                                                    <span className="text-white/80 text-xs font-medium font-raela group-hover/collab:text-white transition-colors duration-500">
                                                        {isMounted ? (isPastRevealDate ? 'PT Bank Central Asia Tbk' : 'Stay Tuned!') : 'Secret Collaborator'}
                                                    </span>
                                                    {!isPastRevealDate && <CaseRevealCountdown accentColor={track.accentHex} size="lg" className="mt-2 sm:mt-4" />}
                                                </div>
                                                <div className="relative z-10 w-28 h-12 md:w-32 md:h-14 shrink-0 -mr-7 md:-mr-7">
                                                    {isMounted && isPastRevealDate ? (
                                                        <div
                                                            role="link"
                                                            tabIndex={0}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                sendGAEvent('event', 'click_sponsor_logo', {
                                                                    sponsor_name: 'BCA',
                                                                    destination: 'https://www.instagram.com/lifeatbca/',
                                                                    location: 'tracks_section',
                                                                });
                                                                window.open('https://www.instagram.com/lifeatbca/', '_blank', 'noopener,noreferrer');
                                                            }}
                                                            className="absolute inset-0 z-20 cursor-pointer"
                                                        >
                                                            <Image
                                                                src="/assets/sponsors/Logo BCA_Putih.png"
                                                                alt="BCA"
                                                                fill
                                                                className="object-contain opacity-90 group-hover/collab:opacity-100 group-hover/collab:scale-110 transition-all duration-700 origin-right drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover/collab:opacity-100 group-hover/collab:scale-110 transition-all duration-700 origin-right">
                                                            <div className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,139,83,0.3)]">
                                                                <span className="text-xl font-bold text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">?</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* High-Contrast CTA Button */}
                                    <div>
                                        <div className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wide text-white overflow-hidden group/btn shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:shadow-[0_0_30px_${track.accentHex}40] transform-gpu`}>
                                            {/* Button Background Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-90 group-hover/btn:opacity-100 transition-opacity duration-[400ms] ease-out translate-z-0`} />
                                            
                                            {/* Button Inner Shine */}
                                            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] translate-z-0" />
                                            
                                            <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                                                Daftar Sekarang
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu" />
                                            </span>
                                        </div>
                                    </div>
                                </div>


                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* PPTI BCA Scholarship Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6"
                >
                    <a
                        href="https://ppti.bca.co.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            sendGAEvent('event', 'click_ppti_bca', {
                                location: 'tracks_section_homepage',
                                destination: 'https://ppti.bca.co.id/',
                            });
                        }}
                        className="group relative flex flex-col items-center text-center gap-5 p-8 sm:p-10 rounded-[24px] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 transform-gpu cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,50,120,0.35) 0%, rgba(20,20,20,0.7) 60%, rgba(20,20,20,0.6) 100%)',
                            boxShadow: '0 12px 40px -8px rgba(0,91,170,0.25), inset 0 1px 1px rgba(255,255,255,0.08)',
                            border: '1px solid rgba(0,91,170,0.2)',
                        }}
                    >
                        {/* Glow effects */}
                        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-15 group-hover:opacity-35 transition-opacity duration-700 blur-[60px] pointer-events-none" style={{ background: '#005baa' }} />
                        <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full opacity-10 group-hover:opacity-25 transition-opacity duration-700 blur-[50px] pointer-events-none" style={{ background: '#4da3ff' }} />

                        {/* Glowing border */}
                        <div className="absolute inset-0 rounded-[24px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: 'inset 0 0 16px rgba(0,91,170,0.1), 0 0 16px rgba(0,91,170,0.08)' }} />

                        {/* SMA/SMK emphasis badge */}
                        <div className="relative z-10 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#4da3ff]/15 border border-[#4da3ff]/30 shadow-[0_0_16px_rgba(77,163,255,0.12)]">
                            <div className="w-7 h-7 rounded-md bg-white/[0.08] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                <Image
                                    src="/assets/sponsors/Logo BCA_Putih.png"
                                    alt="BCA"
                                    width={18}
                                    height={9}
                                    className="object-contain opacity-90"
                                />
                            </div>
                            <span className="text-xs sm:text-sm font-raela font-black uppercase tracking-[0.15em] text-[#4da3ff]">
                                Khusus Peserta SMA/SMK
                            </span>
                        </div>

                        {/* Headline */}
                        <h3 className="relative z-10 text-xl sm:text-2xl font-raela font-black text-white leading-tight tracking-tight">
                            Dapatkan Beasiswa Penuh{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #4da3ff, #80c4ff)' }}>
                                + Karier di BCA
                            </span>
                        </h3>

                        {/* Value badges */}
                        <div className="relative z-10 flex flex-wrap justify-center gap-2">
                            {['Beasiswa Penuh', '30 Bulan', 'Langsung Berkarier'].map((badge, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide bg-white/[0.06] text-white/70 border border-white/10 group-hover:bg-white/10 group-hover:text-white transition-all duration-300"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-raela font-bold text-xs tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-105 transform-gpu shadow-[0_0_24px_rgba(0,91,170,0.3)] group-hover:shadow-[0_0_36px_rgba(77,163,255,0.45)]"
                             style={{ background: 'linear-gradient(135deg, #005baa 0%, #4da3ff 100%)' }}
                        >
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-2">
                                Pelajari Beasiswa
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 transform-gpu" />
                            </span>
                        </div>
                    </a>
                </motion.div>

                {/* ── Impact Projection CTA ─────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
                    transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 max-w-3xl mx-auto w-full"
                >
                    <div className="relative group flex flex-col items-center justify-center gap-7 px-8 py-12 md:py-14 rounded-[24px] overflow-hidden text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] bg-[rgba(20,20,20,0.8)] md:bg-[rgba(20,20,20,0.4)] md:[backdrop-filter:blur(16px)] md:[-webkit-backdrop-filter:blur(16px)]">

                        {/* Gradient border mask (Desktop Only) */}
                        <div
                            className="absolute inset-0 rounded-[24px] pointer-events-none opacity-50 hidden md:block"
                            style={{
                                padding: '1px',
                                background: 'linear-gradient(135deg, #ff8b5380 0%, #b664fb60 50%, rgba(255,255,255,0.04) 100%)',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                            }}
                        />
                        {/* Mobile Fallback Border */}
                        <div
                            className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/10 opacity-50 md:hidden"
                            style={{ borderColor: '#ff8b5350' }}
                        />

                        {/* Ambient glow — compositor-only opacity transition */}
                        <div
                            className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,139,83,0.07) 0%, transparent 70%)' }}
                        />

                        {/* Text */}
                        <div className="relative z-10">
                            <p className="font-raela font-normal text-lg md:text-xl text-white/70 leading-tight mb-1">
                                Setiap karya lomba harus memiliki
                            </p>
                            <p
                                className="font-raela font-bold text-4xl md:text-6xl text-transparent bg-clip-text leading-tight"
                                style={{ backgroundImage: 'linear-gradient(90deg, #ff8b53, #b664fb)' }}
                            >
                                IMPACT PROJECTION
                            </p>
                        </div>

                        {/* CTA button */}
                        <div className="relative z-10">
                            <Link
                                href="/impact"
                                prefetch
                                className="group/btn relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-raela font-bold text-base tracking-wide text-white overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 transform-gpu shadow-[0_0_28px_rgba(255,139,83,0.25)] hover:shadow-[0_0_40px_rgba(255,139,83,0.4)]"
                            >
                                <span
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(135deg, #ff8b53 0%, #b664fb 100%)' }}
                                />
                                <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Learn More
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300 transform-gpu" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

    );
}
