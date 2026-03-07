'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Users, Wallet, Trophy, ExternalLink, Landmark, Recycle, GraduationCap } from 'lucide-react';
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
                            <span className="relative z-10">Back to Tracks</span>

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
                        className="mb-12 w-full"
                    >
                        <Countdown accentColor={data.accentHex} />
                    </motion.div>

                    {/* Info Grid (Summary) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        {/* Kategori & Tim Card */}
                        <div
                            className="group relative p-5 md:p-6 rounded-2xl backdrop-blur-md md:backdrop-blur-xl transition-transform duration-500 overflow-hidden hover:-translate-y-2 z-10 w-full"
                            style={{
                                background: 'rgba(20, 20, 20, 0.6)',
                                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 group-hover:opacity-50 blur-[40px] transition-opacity duration-500 -translate-y-1/4 translate-x-1/4" style={{ background: data.accentHex }} />
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 10px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                    <Users className="w-6 h-6 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                </div>
                                <h3 className="text-white/50 text-xs font-mono uppercase tracking-[0.2em] mb-2 group-hover:text-white/80 transition-colors">Kategori & Tim</h3>
                                <p className="text-white font-bold text-base md:text-lg leading-tight">{data.details.categories}</p>
                            </div>
                        </div>

                        {/* Pendaftaran Card */}
                        <div
                            className="group relative p-5 md:p-6 rounded-2xl backdrop-blur-md md:backdrop-blur-xl transition-transform duration-500 overflow-hidden hover:-translate-y-2 z-10 w-full"
                            style={{
                                background: 'rgba(20, 20, 20, 0.6)',
                                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 group-hover:opacity-50 blur-[40px] transition-opacity duration-500 -translate-y-1/4 translate-x-1/4" style={{ background: data.accentHex }} />
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 10px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                    <Wallet className="w-6 h-6 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                </div>
                                <h3 className="text-white/50 text-xs font-mono uppercase tracking-[0.2em] mb-2 group-hover:text-white/80 transition-colors">Pendaftaran</h3>
                                <div className="flex flex-col gap-3 w-full mt-2">
                                    {(Array.isArray(data.details.fee) ? data.details.fee : []).map((tier, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col rounded-xl relative overflow-hidden border transition-colors duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${data.accentHex}0a, transparent)`,
                                                borderColor: `${data.accentHex}20`,
                                            }}
                                        >
                                            {/* Left Accent Bar using competition palette */}
                                            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl" style={{ backgroundColor: data.accentHex }} />

                                            {/* Tier Header */}
                                            <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b" style={{ borderColor: `${data.accentHex}15` }}>
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.accentHex }} />
                                                <span className="text-white/70 text-[10px] font-mono uppercase tracking-widest font-bold">{tier.type}</span>
                                            </div>

                                            {/* Pricing Row */}
                                            <div className="flex flex-row gap-0 divide-x pb-3 pt-2.5 px-4" style={{ borderColor: `${data.accentHex}15` }}>
                                                {/* Early Bird */}
                                                <div className="flex-1 flex flex-col pr-4">
                                                    <span className="text-white/40 text-[9px] uppercase font-mono tracking-wider mb-1.5">Early Bird</span>
                                                    <span className="font-bold text-sm tracking-wide" style={{ color: data.accentHex }}>{tier.early}</span>
                                                </div>

                                                {/* Regular */}
                                                <div className="flex-1 flex flex-col pl-4">
                                                    <span className="text-white/40 text-[9px] uppercase font-mono tracking-wider mb-1.5">Regular</span>
                                                    <span className="text-white/80 font-bold text-sm tracking-wide">{tier.regular}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Penghargaan Card */}
                        <div
                            className="group relative p-5 md:p-6 rounded-2xl backdrop-blur-md md:backdrop-blur-xl transition-transform duration-500 overflow-hidden hover:-translate-y-2 z-10 w-full"
                            style={{
                                background: 'rgba(20, 20, 20, 0.6)',
                                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${data.accentHex}, transparent)` }} />
                            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 group-hover:opacity-50 blur-[40px] transition-opacity duration-500 -translate-y-1/4 translate-x-1/4" style={{ background: data.accentHex }} />
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 10px ${data.accentHex}15`, border: `1px solid ${data.accentHex}80` }} />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                    <Trophy className="w-6 h-6 text-white" style={{ filter: `drop-shadow(0 0 8px ${data.accentHex})` }} />
                                </div>
                                <h3 className="text-white/50 text-xs font-mono uppercase tracking-[0.2em] mb-2 group-hover:text-white/80 transition-colors">Penghargaan</h3>
                                <p className="text-white font-bold text-base md:text-lg leading-tight">{data.details.prizes}</p>
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
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/10 mb-8 group-hover:bg-white/10 transition-colors duration-500 shadow-xl" style={{ boxShadow: `0 8px 32px -5px ${data.accentHex}30` }}>
                                        <Landmark className="w-6 h-6" style={{ color: data.accentHex }} />
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
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/10 mb-8 group-hover:bg-white/10 transition-colors duration-500 shadow-xl" style={{ boxShadow: `0 8px 32px -5px ${data.accentHex}30` }}>
                                        <Recycle className="w-6 h-6" style={{ color: data.accentHex }} />
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
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/10 mb-8 group-hover:bg-white/10 transition-colors duration-500 shadow-xl" style={{ boxShadow: `0 8px 32px -5px ${data.accentHex}30` }}>
                                        <GraduationCap className="w-6 h-6" style={{ color: data.accentHex }} />
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
                        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-8">Timeline</h2>

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
                                                <span className={`font-mono text-xs font-bold transition-colors duration-500 whitespace-nowrap ${isActive ? 'text-white' : isPassed ? 'text-white/80' : 'text-white/30'}`}>
                                                    {item.date}
                                                </span>
                                                <span className={`text-[10px] mt-1 transition-colors duration-500 text-center uppercase tracking-wider ${isActive ? 'text-white/90 font-bold' : isPassed ? 'text-white/50' : 'text-white/20'}`}>
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
                        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-6">Kelengkapan Lomba</h2>
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
                                    <span className="text-white font-bold block text-base mb-1 group-hover:text-white transition-colors">Rulebook</span>
                                    <span className="text-white/50 text-xs font-mono group-hover:text-white/80 transition-colors block mb-4">Panduan lengkap</span>
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
                                    <span className="text-white font-bold block text-base mb-1 group-hover:text-white transition-colors">Orisinalitas</span>
                                    <span className="text-white/50 text-xs font-mono group-hover:text-white/80 transition-colors block mb-4">Format surat resmi</span>
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
                                    <span className="text-white font-bold block text-base mb-1 group-hover:text-white transition-colors">Twibbon</span>
                                    <span className="text-white/50 text-xs font-mono group-hover:text-white/80 transition-colors block mb-4">Aset sosial media</span>
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
