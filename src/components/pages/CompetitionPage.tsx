'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users, Wallet, Trophy, ExternalLink, Landmark, Recycle, GraduationCap } from 'lucide-react';
import type { CompetitionData } from '@/lib/competitions';
import { StarDust } from '@/components/effects/StarDust';
import Image from 'next/image';
import { Countdown } from '@/components/sections/Countdown';
import { useState, useEffect } from 'react';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';

export function CompetitionPage({ data }: { data: CompetitionData }) {
    const Icon = data.icon;
    const [currentPhase, setCurrentPhase] = useState(0);
    const regStatus = useRegistrationStatus();

    // Auto-calculate relevant live timeline segment utilizing client-side hydration bypassing server mismatch
    useEffect(() => {
        const calculateInitialPhase = () => {
            const now = new Date();
            const stages = [
                new Date('2026-04-06T00:00:00'), // Regular
                new Date('2026-04-30T00:00:00'), // Close Registration
                new Date('2026-05-01T00:00:00'), // Preliminary
                new Date('2026-05-13T00:00:00'), // Finalist Announce
                new Date('2026-06-04T00:00:00'), // Final & Awarding
            ];
            let phase = 0;
            for (let i = 0; i < stages.length; i++) {
                if (now >= stages[i]) phase = i + 1;
                else break;
            }
            if (phase >= 6) phase = 5;
            setCurrentPhase(phase);
        };
        
        const frame = requestAnimationFrame(calculateInitialPhase);
        return () => cancelAnimationFrame(frame);
    }, []);

    const timelineStages = [
        { date: '15 Mar - 5 Apr', label: 'Early Bird' },
        { date: '6 - 30 Apr', label: 'Regular' },
        { date: '30 Apr', label: 'Close Registration' },
        { date: '1 - 10 May', label: 'Preliminary' },
        { date: '13 May', label: 'Finalist' },
        { date: '4 - 5 Jun', label: 'Final & Awarding' },
    ];

    return (
        <>
            <StarDust />

            {/* Floating 3D Background Elements - Migrated to Pure CSS for Zero-JS Teleport Bug Fix */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes native-float-1 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(5deg); }
                }
                @keyframes native-float-2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(40px) rotate(-10deg); }
                }
                @keyframes native-flare {
                    0%, 100% { opacity: 0.15; }
                    50% { opacity: 0.3; }
                }
            `}} />
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute -top-20 -right-20 w-100 h-100 opacity-40 max-md:blur-none blur-[2px] max-md:hidden transform-gpu"
                    style={{ animation: 'native-float-1 10s ease-in-out infinite', willChange: 'transform' }}
                >
                    <Image src="/assets/element/ELEMEN 3.png" alt="" width={400} height={400} className="object-contain" />
                </div>
                <div
                    className="absolute top-1/2 -left-32 w-87.5 h-87.5 opacity-30 max-md:blur-none blur-xs transform-gpu"
                    style={{ animation: 'native-float-2 15s ease-in-out infinite 2s', willChange: 'transform' }}
                >
                    <Image src="/assets/element/ELEMEN 2.png" alt="" width={350} height={350} className="object-contain" />
                </div>
                <div
                    className="absolute bottom-[-10%] right-[10%] w-125 h-125 transform-gpu"
                    style={{ animation: 'native-flare 8s ease-in-out infinite', willChange: 'opacity' }}
                >
                    <Image src="/assets/element/ELEMEN FLARE 1.png" alt="" width={500} height={500} className="object-contain" />
                </div>
            </div>

            <div className="pt-28 pb-20 px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Premium Performant Back Button */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                        <Link
                            href="/#tracks"
                            className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/20 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 mb-12 w-fit overflow-hidden"
                            style={{ boxShadow: '0 8px 32px -10px rgba(0,0,0,0.5)' }}
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 ease-out relative z-10" />
                            <span className="relative z-10 font-raela">Back to Tracks</span>

                            {/* Glowing Theme Accent - Animated entirely via Opacity to bypass Layout Recalculation on Mobile CPU */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, transparent, ${data.accentHex || '#fff'}, transparent)` }}
                            />
                        </Link>
                    </motion.div>

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 shrink-0">
                                <Icon className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                            </div>
                            <div>
                                <h1 className="font-raela font-black text-4xl md:text-5xl text-white">{data.title}</h1>
                            </div>
                        </div>
                        <p className="text-white/40 text-lg font-mono italic">{data.tagline}</p>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <p className="text-white/70 text-lg leading-relaxed">{data.description}</p>
                    </motion.div>

                    {/* Prominent High-Contrast Countdown Tracker */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.11 }}
                        className="mb-12 w-full font-raela"
                    >
                        <Countdown accentColor={data.accentHex} />
                    </motion.div>

                    {/* Info Grid (Summary) - NEW REDESIGN */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="flex flex-col gap-6 mb-12"
                    >
                        {/* Top Tier: Pendaftaran (Full Width) */}
                        <div
                            className="group relative p-6 md:p-8 rounded-3xl backdrop-blur-md md:backdrop-blur-xl transition-all duration-500 overflow-hidden z-10 w-full border border-white/5"
                            style={{
                                background: 'rgba(20, 20, 20, 0.6)',
                                boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                            }}
                        >
                            <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-700 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 group-hover:opacity-30 blur-[80px] transition-opacity duration-700 -translate-y-1/2 translate-x-1/2" style={{ background: data.accentHex }} />
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ border: `1px solid ${data.accentHex}40`, boxShadow: `inset 0 0 20px ${data.accentHex}10` }} />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-xl border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <Wallet className="w-8 h-8 text-white" style={{ filter: `drop-shadow(0 0 12px ${data.accentHex})` }} />
                                    </div>
                                    <h3 className="text-white/80 text-sm font-raela uppercase tracking-[0.1em] mb-0.5 font-black">Biaya Pendaftaran</h3>
                                    <p className="text-white/50 text-xs font-raela uppercase tracking-wider font-bold">Per Tim</p>
                                </div>

                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                                    {(Array.isArray(data.details.fee) ? data.details.fee : []).map((tier, idx) => (
                                        <div
                                            key={idx}
                                            className="group/tier flex flex-col rounded-3xl relative overflow-hidden border transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.03]"
                                            style={{ borderColor: `${data.accentHex}15` }}
                                        >
                                            {/* Tier Header */}
                                            <div className="px-6 py-5 border-b border-white/5 flex justify-center items-center bg-white/[0.02]">
                                                <span className="text-white font-raela font-black uppercase tracking-[0.15em] text-lg lg:text-xl">{tier.type}</span>
                                            </div>

                                            <div className="p-6 flex flex-col items-center text-center relative">
                                                {/* Early Bird - HERO SECTION */}
                                                <div className="mb-4 w-full">
                                                    <span className="block text-xs text-white/50 uppercase tracking-[0.2em] mb-2 font-raela font-black">Early Bird</span>
                                                    <div className="relative inline-block group/price">
                                                        <span className="block font-raela font-black text-3xl lg:text-4xl tracking-tight text-white mb-1 transition-all duration-500 group-hover/tier:scale-110" style={{ color: data.accentHex }}>
                                                            {tier.early}
                                                        </span>
                                                        <div className="absolute inset-0 blur-2xl opacity-10 group-hover/tier:opacity-30 scale-150 transition-opacity pointer-events-none" style={{ backgroundColor: data.accentHex }} />
                                                    </div>
                                                </div>

                                                {/* Separator / OR */}
                                                <div className="flex items-center gap-3 w-full opacity-10 mb-4">
                                                    <div className="h-[1px] flex-1 bg-white" />
                                                    <span className="text-[8px] font-raela text-white uppercase tracking-widest">Regular Price</span>
                                                    <div className="h-[1px] flex-1 bg-white" />
                                                </div>

                                                {/* Regular - SECONDARY SECTION */}
                                                <div className="opacity-30 group-hover/tier:opacity-50 transition-all duration-500 transform group-hover/tier:translate-y-[-2px]">
                                                    <span className="block text-[8px] text-white/50 uppercase tracking-widest mb-1 font-raela">Regular</span>
                                                    <span className="block font-bold text-lg text-white/80 line-through decoration-white/30 whitespace-nowrap">
                                                        {tier.regular}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Corner Visual Accent */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none -translate-y-1/2 translate-x-1/2 rounded-full" />
                                            
                                            {/* Hover Glow Sweep */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/tier:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Anggota Tim Card */}
                            <div
                                className="group relative p-6 rounded-2xl backdrop-blur-md transition-all duration-500 overflow-hidden hover:-translate-y-1 border border-white/5 flex items-center gap-6"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                                }}
                            >
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-700 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 group-hover:opacity-30 blur-[40px] transition-opacity duration-700 -translate-y-1/2 translate-x-1/2" style={{ background: data.accentHex }} />
                                
                                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 border border-white/5 bg-white/[0.03] relative z-10">
                                    <Users className="w-7 h-7 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-white/80 text-sm font-raela uppercase tracking-[0.1em] mb-1.5 font-black">Anggota Tim</h3>
                                    <p className="text-white font-bold text-sm md:text-base leading-snug tracking-wide">Maksimal 3 Orang</p>
                                </div>
                            </div>

                            {/* Hadiah Card */}
                            <div
                                className="group relative p-6 rounded-2xl backdrop-blur-md transition-all duration-500 overflow-hidden hover:-translate-y-1 border border-white/5 flex items-center gap-6"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                                }}
                            >
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-700 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 group-hover:opacity-30 blur-[40px] transition-opacity duration-700 -translate-y-1/2 translate-x-1/2" style={{ background: data.accentHex }} />

                                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 border border-white/5 bg-white/[0.03] relative z-10">
                                    <Trophy className="w-7 h-7 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-white/80 text-sm font-raela uppercase tracking-[0.1em] mb-1.5 font-black">Hadiah</h3>
                                    <p className="text-white font-bold text-sm md:text-base leading-snug tracking-wide">{data.details.prizes}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sub-Tema / Topics Section - BENTANG ACCORDION DESIGN */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mb-16 mt-20"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-sm font-raela font-bold tracking-[0.2em] text-white uppercase">
                                Sub-Tema Pilihan
                            </h2>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        {/* Premium Static Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

                            {/* Topic 1 */}
                            <div
                                className="group relative p-8 rounded-2xl backdrop-blur-md md:backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full h-full"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                {/* Matched Gradient Underlayers */}
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 group-hover:opacity-30 blur-[60px] transition-opacity duration-500 -translate-y-1/2 translate-x-1/4 pointer-events-none" style={{ background: data.accentHex }} />
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 15px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                                {/* Large Decorative Watermark Icon */}
                                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 ease-out pointer-events-none z-0">
                                    <Landmark className="w-64 h-64" style={{ color: data.accentHex }} />
                                </div>

                                {/* Content Layer */}
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon Badge */}
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-xl relative z-10 mb-10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <Landmark className="w-8 h-8 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white tracking-tight mb-4 group-hover:text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, #fff, ${data.accentHex})` }}>
                                            Good Governance & Civic Tech
                                        </h3>

                                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                                            Inovasi digital untuk memperbaiki kualitas pelayanan publik dan transparansi. Fokus pada teknologi yang memudahkan warga menyampaikan aspirasi atau mengakses layanan administrasi lebih cepat dan terukur.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Topic 2 */}
                            <div
                                className="group relative p-8 rounded-2xl backdrop-blur-md md:backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full h-full"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 group-hover:opacity-30 blur-[60px] transition-opacity duration-500 -translate-y-1/2 translate-x-1/4 pointer-events-none" style={{ background: data.accentHex }} />
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 15px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 ease-out pointer-events-none z-0">
                                    <Recycle className="w-64 h-64" style={{ color: data.accentHex }} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-xl relative z-10 mb-10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <Recycle className="w-8 h-8 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white tracking-tight mb-4 group-hover:text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, #fff, ${data.accentHex})` }}>
                                            Circular Economy & Resources
                                        </h3>

                                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                                            Solusi inovatif pengelola sumber daya dan limbah yang bernilai guna. Merancang sistem yang mengubah pola konsumsi masyarakat menjadi lebih hemat energi dan ramah lingkungan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Topic 3 */}
                            <div
                                className="group relative p-8 rounded-2xl backdrop-blur-md md:backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full h-full"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 group-hover:opacity-30 blur-[60px] transition-opacity duration-500 -translate-y-1/2 translate-x-1/4 pointer-events-none" style={{ background: data.accentHex }} />
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 15px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 ease-out pointer-events-none z-0">
                                    <GraduationCap className="w-64 h-64" style={{ color: data.accentHex }} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-xl relative z-10 mb-10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                        <GraduationCap className="w-8 h-8 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex}80)` }} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white tracking-tight mb-4 group-hover:text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, #fff, ${data.accentHex})` }}>
                                            Human Capital & Future Skills
                                        </h3>

                                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                                            Pengembangan potensi pendidikan keterampilan masa depan bagi semua kalangan. Memastikan kemajuan teknologi bisa dinikmati siapa saja dengan aksesibilitas dan inklusi yang kuat.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* Dynamic Auto-Highlighting Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-16 mt-8"
                    >
                        <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-8 font-black">Timeline</h2>

                        {/* Scrollable Container on Mobile for clean overflow without shrinking */}
                        <div className="relative w-full overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollBehavior: 'smooth' }}>
                            <div className="min-w-[700px] md:min-w-full relative py-4">
                                {/* Base Track Line */}
                                <div className="absolute top-[27px] left-[56px] right-[56px] h-[2px] bg-white/5 rounded-full z-0" />

                                {/* Dynamic Progress Tracking Line (Hardware Accelerated Width transform) */}
                                <div
                                    className="absolute top-[27px] left-[56px] h-[2px] rounded-full transition-all duration-[1500ms] ease-out origin-left z-0"
                                    style={{
                                        width: `calc((100% - 112px) * ${currentPhase / (timelineStages.length - 1)})`,
                                        backgroundColor: data.accentHex,
                                        boxShadow: `0 0 15px ${data.accentHex}80`
                                    }}
                                />

                                <div className="flex justify-between relative z-10 w-full">
                                    {timelineStages.map((item, i) => {
                                        const isPassed = i < currentPhase;
                                        const isActive = i === currentPhase;

                                        return (
                                            <div key={i} className="flex flex-col items-center w-28 shrink-0 relative group">
                                                {/* Visual Node */}
                                                <div className="relative flex items-center justify-center w-6 h-6 mb-4">
                                                    {/* Pure CSS Ping Effect for Active Phase without JS Loop Starvation */}
                                                    {isActive && (
                                                        <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-screen" style={{ backgroundColor: data.accentHex }} />
                                                    )}
                                                    {/* Target Node Circle */}
                                                    <div
                                                        className={`w-3 h-3 rounded-full transition-all duration-700 z-10 border-[2px] ${isActive ? 'scale-[1.8]' : isPassed ? 'scale-100' : 'scale-[0.8] opacity-30 shadow-none'
                                                            }`}
                                                        style={{
                                                            borderColor: (isPassed || isActive) ? data.accentHex : '#fff',
                                                            backgroundColor: isPassed ? data.accentHex : isActive ? '#000' : 'transparent',
                                                            boxShadow: isActive ? `0 0 20px ${data.accentHex}, inset 0 0 8px ${data.accentHex}` : 'none'
                                                        }}
                                                    />
                                                </div>

                                                {/* Rendered Text Values */}
                                                <span className={`font-raela text-xs font-black transition-colors duration-500 whitespace-nowrap ${isActive ? 'text-white' : isPassed ? 'text-white/80' : 'text-white/30'}`}>
                                                    {item.date}
                                                </span>
                                                <span className={`text-[10px] mt-1 transition-colors duration-500 text-center uppercase tracking-wider font-bold ${isActive ? 'text-white/90 font-bold' : isPassed ? 'text-white/50' : 'text-white/20'}`}>
                                                    {item.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Downloads Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16 block"
                    >
                        <h2 className="text-xs font-raela uppercase tracking-[0.1em] text-white/30 mb-6 font-black">Kelengkapan Lomba</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Rulebook Card */}
                            <a
                                href={data.rulebookUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex flex-col items-start gap-4 p-5 rounded-2xl backdrop-blur-md md:backdrop-blur-xl transition-transform duration-500 overflow-hidden hover:-translate-y-2 group w-full z-10"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 group-hover:opacity-50 blur-[30px] transition-opacity duration-500 -translate-y-1/4 translate-x-1/4" style={{ background: data.accentHex }} />
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 10px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                    <ExternalLink className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                </div>

                                <div className="relative z-10 flex-1 w-full">
                                    <span className="text-white font-bold block text-base mb-1 group-hover:text-white transition-colors font-raela">Rulebook</span>
                                    <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors block mb-4">Panduan lengkap</span>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 w-fit px-3 py-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                                        Buka Tautan <ArrowRight className="w-3 h-3 group-hover:-rotate-45 transition-transform" />
                                    </div>
                                </div>
                            </a>

                            {/* Pernyataan Orisinalitas Card */}
                            <a
                                href="/assets/documents/Surat_Pernyataan_Orisinalitas.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex flex-col items-start gap-4 p-5 rounded-2xl backdrop-blur-md md:backdrop-blur-xl transition-transform duration-500 overflow-hidden hover:-translate-y-2 group w-full z-10"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 group-hover:opacity-50 blur-[30px] transition-opacity duration-500 -translate-y-1/4 translate-x-1/4" style={{ background: data.accentHex }} />
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 10px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                    <ExternalLink className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                </div>

                                <div className="relative z-10 flex-1 w-full">
                                    <span className="text-white font-bold block text-base mb-1 group-hover:text-white transition-colors font-raela">Orisinalitas</span>
                                    <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors block mb-4">Format surat resmi</span>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 w-fit px-3 py-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                                        Buka Tautan <ArrowRight className="w-3 h-3 group-hover:-rotate-45 transition-transform" />
                                    </div>
                                </div>
                            </a>

                            {/* Twibbon Card */}
                            <a
                                href="/assets/documents/Twibbon.zip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex flex-col items-start gap-4 p-5 rounded-2xl backdrop-blur-md md:backdrop-blur-xl transition-transform duration-500 overflow-hidden hover:-translate-y-2 group w-full z-10"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 group-hover:opacity-50 blur-[30px] transition-opacity duration-500 -translate-y-1/4 translate-x-1/4" style={{ background: data.accentHex }} />
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 10px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                    <ExternalLink className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                </div>

                                <div className="relative z-10 flex-1 w-full">
                                    <span className="text-white font-bold block text-base mb-1 group-hover:text-white transition-colors font-raela">Twibbon</span>
                                    <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors block mb-4">Aset sosial media</span>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 w-fit px-3 py-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                                        Buka Tautan <ArrowRight className="w-3 h-3 group-hover:-rotate-45 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center border-t border-white/10 pt-12"
                    >
                        <h3 className="font-raela font-bold text-2xl text-white mb-4">Siap Berkompetisi?</h3>
                        <p className="text-white/50 mb-8">Daftarkan tim Anda hari ini. Tunjukkan kemampuan Anda pada tingkat nasional.</p>
                        {regStatus === 'open' ? (
                            <Link
                                href="/kelengkapan"
                                className="inline-flex items-center gap-3 bg-white text-black font-bold text-lg px-10 py-4 hover:bg-white/90 transition-colors uppercase tracking-widest"
                            >
                                DAFTAR <ArrowRight className="w-5 h-5" />
                            </Link>
                        ) : (
                            <span
                                className={`inline-flex items-center gap-3 font-bold text-lg px-10 py-4 uppercase tracking-widest cursor-not-allowed ${regStatus === 'upcoming'
                                        ? 'bg-white/20 text-white/50'
                                        : 'bg-white/10 text-white/30'
                                    }`}
                            >
                                {regStatus === 'upcoming' ? 'SEGERA DIBUKA' : 'PENDAFTARAN DITUTUP'}
                            </span>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
