'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Wallet, Users, Trophy, TriangleAlert, Info, ArrowRight, Landmark, Recycle, GraduationCap } from 'lucide-react';
import { PremiumCardGlow } from './CompetitionShared';
import { FEATURES } from '@/lib/constants';
import { sendGAEvent } from '@next/third-parties/google';

import { CompetitionData } from '@/lib/competitions';

interface Fee {
    type: string;
    early: string;
    regular: string;
}

interface CompetitionInfoProps {
    data: CompetitionData;
}

export const CompetitionInfo = React.memo(({ data }: CompetitionInfoProps) => {
    return (
        <>
            {/* Info Grid (Summary) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="flex flex-col gap-6 mb-12"
            >
                {/* Top Tier: Pendaftaran (Full Width) */}
                <div
                    className="group relative p-6 md:p-8 rounded-3xl bg-black/80 md:bg-black/60 md:backdrop-blur-xl transition-all duration-500 overflow-hidden z-10 w-full border border-white/5 transform-gpu"
                >
                    <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-3xl" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-xl border border-white/5" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                                <Wallet className="w-8 h-8 text-white" style={{ filter: `drop-shadow(0 0 12px ${data.accentHex})` }} />
                            </div>
                            <h3 className="text-white/80 text-sm font-raela uppercase tracking-[0.1em] mb-0.5 font-black">Biaya Pendaftaran</h3>
                            <p className="text-white/50 text-xs font-raela uppercase tracking-wider font-bold">Per Tim</p>
                        </div>

                        <div className={`flex-1 ${Array.isArray(data.details.fee) && data.details.fee.length === 1 ? 'flex justify-center md:justify-end w-full' : 'grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8'}`}>
                            {(Array.isArray(data.details.fee) ? data.details.fee : []).map((tier: Fee, idx: number) => (
                                <div
                                    key={idx}
                                    className={`group/tier flex flex-col rounded-3xl relative overflow-hidden border transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.03] ${Array.isArray(data.details.fee) && data.details.fee.length === 1 ? 'w-full max-w-sm' : ''}`}
                                    style={{ borderColor: `${data.accentHex}15` }}
                                >
                                    <div className="px-4 py-5 border-b border-white/5 flex justify-center items-center bg-white/[0.02] text-center">
                                        <span className="text-white font-raela font-black uppercase tracking-[0.1em] text-sm md:text-base lg:text-lg whitespace-nowrap">{tier.type}</span>
                                    </div>

                                    <div className="p-6 flex flex-col justify-center items-center text-center relative h-full min-h-[220px]">
                                        {tier.regular.toUpperCase() === 'GRATIS' ? (
                                            <div className="flex flex-col items-center justify-center w-full h-full">
                                                <div className="relative inline-block group/free mt-2">
                                                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-500 blur-2xl opacity-20 group-hover/tier:opacity-40 transition-opacity duration-700 rounded-full animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />
                                                    <div className="relative group-hover/tier:scale-110 transition-transform duration-500">
                                                        <span className="block font-raela font-black text-3xl lg:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-500 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
                                                            GRATIS
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-6 font-raela font-bold group-hover/tier:text-emerald-400/80 transition-colors">Tanpa Biaya Pendaftaran</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center w-full h-full">
                                                <div className="mb-4 w-full">
                                                    <span className="block text-xs text-white/50 uppercase tracking-[0.2em] mb-2 font-raela font-black">Regular Registration</span>
                                                    <div className="relative inline-block group/price">
                                                        <span className="block font-raela font-black text-3xl lg:text-4xl tracking-tight text-white mb-1 transition-all duration-500 group-hover/tier:scale-110" style={{ color: data.accentHex }}>
                                                            {tier.regular}
                                                        </span>
                                                        <div className="absolute inset-0 blur-2xl opacity-10 group-hover/tier:opacity-30 scale-150 transition-opacity pointer-events-none" style={{ backgroundColor: data.accentHex }} />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 w-full opacity-10 mb-4">
                                                    <div className="h-[1px] flex-1 bg-white" />
                                                    <span className="text-[8px] font-raela text-white uppercase tracking-widest">Early Bird Ended</span>
                                                    <div className="h-[1px] flex-1 bg-white" />
                                                </div>
                                                <div className="opacity-30 group-hover/tier:opacity-50 transition-all duration-500 transform group-hover/tier:translate-y-[-2px]">
                                                    <span className="block text-[8px] text-white/50 uppercase tracking-widest mb-1 font-raela">Early Bird</span>
                                                    <span className="block font-bold text-lg text-white/80 line-through decoration-white/30 whitespace-nowrap">
                                                        {tier.early}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none -translate-y-1/2 translate-x-1/2 rounded-full" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/tier:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Anggota Tim Card */}
                    <div
                        className="group relative p-6 rounded-2xl bg-black/80 md:bg-black/60 md:backdrop-blur-md transition-all duration-500 overflow-hidden hover:-translate-y-1 border border-white/5 flex items-center gap-6 transform-gpu"
                        style={{
                            boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                        }}
                    >
                        <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-2xl" />

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
                        className="group relative p-6 rounded-2xl bg-black/80 md:bg-black/60 md:backdrop-blur-md transition-all duration-500 overflow-hidden hover:-translate-y-1 border border-white/5 flex items-center gap-6 transform-gpu"
                        style={{
                            boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
                        }}
                    >
                        <PremiumCardGlow accentHex={data.accentHex} roundedClass="rounded-2xl" />

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

            {/* PPTI BCA Promo Banner */}
            {data.slug !== 'business-case' && FEATURES.SHOW_PPTI_BCA_PROMO && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 w-full"
                >
                    <a
                        href="https://bca.id/beasiswabca-iofest"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            sendGAEvent('event', 'click_ppti_bca', {
                                location: `competition_page_${data.slug}_prize`,
                                destination: 'https://bca.id/beasiswabca-iofest',
                            });
                        }}
                        className="group relative flex flex-col md:flex-row items-center md:items-center text-center md:text-left justify-between gap-6 p-6 md:px-10 md:py-8 rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-1 transform-gpu z-10 cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,50,120,0.4) 0%, rgba(20,20,20,0.7) 60%, rgba(20,20,20,0.6) 100%)',
                            boxShadow: '0 12px 40px -8px rgba(0,91,170,0.3), inset 0 1px 1px rgba(255,255,255,0.08)',
                            border: '1px solid rgba(0,91,170,0.25)',
                        }}
                    >
                        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none transform-gpu" style={{ background: 'radial-gradient(circle, #005baa 0%, transparent 70%)' }} />
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none transform-gpu" style={{ background: 'radial-gradient(circle, #4da3ff 0%, transparent 70%)' }} />
                        <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: 'inset 0 0 20px rgba(0,91,170,0.15), 0 0 20px rgba(0,91,170,0.1)' }} />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
                            <div className="flex flex-col items-center md:items-start gap-3 flex-1">
                                <div className="flex flex-col items-center md:items-start gap-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-raela font-normal text-white/80 leading-tight tracking-tight mb-4">
                                            Dapatkan kesempatan untuk meraih
                                            <span className="block text-3xl md:text-5xl mt-3 font-black text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #4da3ff, #80c4ff)' }}>
                                                Beasiswa PPTI BCA
                                            </span>
                                        </h3>

                                        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0066AE]/20 border border-[#0066AE]/50 shadow-[0_0_15px_rgba(0,102,174,0.3)] ring-1 ring-[#0066AE]/30 group-hover:bg-[#0066AE]/30 group-hover:border-[#0066AE]/70 transition-all duration-500 w-fit mb-4">
                                            <TriangleAlert className="w-3.5 h-3.5 text-[#00bfff] animate-pulse" />
                                            <span className="text-[10px] sm:text-xs font-raela font-black uppercase tracking-[0.1em] text-[#00bfff]">
                                                Khusus SMA/SMK
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-center md:justify-start gap-4 opacity-100 mb-6 group/bca">
                                            <Image src="/assets/sponsors/DIAMOND/OFFICIAL CASE COLLABORATOR/bca.png" alt="BCA" width={72} height={32} className="object-contain relative z-10" />
                                            <div className="h-6 w-[1px] bg-white/20" />
                                            <span className="text-xs md:text-sm font-raela font-black text-[#00bfff] tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(0,191,255,0.4)]">
                                                Official Program
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center md:justify-start gap-1.5 text-white/40 group-hover:text-white/60 transition-colors duration-300">
                                            <Info className="w-3.5 h-3.5 shrink-0" />
                                            <span className="text-[9px] md:text-xs italic font-normal opacity-50">
                                                * Proses seleksi beasiswa tetap menjadi kebijakan internal dari pihak BCA
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center md:items-end gap-5 shrink-0 mt-4 md:mt-0">
                                <div className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-raela font-bold text-xs tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-105 transform-gpu shadow-[0_0_28px_rgba(0,91,170,0.35)] group-hover:shadow-[0_0_40px_rgba(77,163,255,0.5)]"
                                     style={{ background: 'linear-gradient(135deg, #005baa 0%, #4da3ff 100%)' }}
                                >
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Daftar Beasiswa
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </motion.div>
            )}

            {/* Sub-Tema Section */}
            {data.slug !== 'business-case' && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="mb-16 mt-20"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-6">
                        <h2 className="text-sm font-raela font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap text-center">
                            Sub-Tema Pilihan
                        </h2>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent hidden md:block" />
                    </div>

                    <div className="w-full flex justify-center mb-10">
                        <div className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#FF8B53]/10 border border-[#FF8B53]/30 shadow-[0_0_20px_rgba(255,139,83,0.1)] text-center">
                            <TriangleAlert className="w-5 h-5 text-[#FF8B53] shrink-0" />
                            <span className="text-white font-bold tracking-wide text-sm md:text-base">
                                Semua karya peserta <span className="text-[#FF8B53] uppercase font-black tracking-widest leading-none">WAJIB</span> memilih 1 dari 3 topik di bawah ini.
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                        <TopicCard 
                            icon={Landmark} 
                            title="Good Governance & Civic Tech" 
                            desc="Inovasi digital untuk memperbaiki kualitas pelayanan publik dan transparansi. Fokus pada teknologi yang memudahkan warga menyampaikan aspirasi atau mengakses layanan administrasi lebih cepat dan terukur." 
                            accentHex={data.accentHex} 
                        />
                        <TopicCard 
                            icon={Recycle} 
                            title="Circular Economy & Resources" 
                            desc="Solusi inovatif pengelola sumber daya dan limbah yang bernilai guna. Merancang sistem yang mengubah pola konsumsi masyarakat menjadi lebih hemat energi dan ramah lingkungan." 
                            accentHex={data.accentHex} 
                        />
                        <TopicCard 
                            icon={GraduationCap} 
                            title="Human Capital & Future Skills" 
                            desc="Pengembangan potensi pendidikan keterampilan masa depan bagi semua kalangan. Memastikan kemajuan teknologi bisa dinikmati siapa saja dengan aksesibilitas dan inklusi yang kuat." 
                            accentHex={data.accentHex} 
                        />
                    </div>
                </motion.div>
            )}

            {/* Impact Projection CTA */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 w-full"
            >
                <div className="relative group flex flex-col items-center justify-center gap-7 px-8 py-12 md:py-14 rounded-[24px] overflow-hidden text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] bg-[rgba(20,20,20,0.8)] md:bg-[rgba(20,20,20,0.4)] md:[backdrop-filter:blur(16px)] md:[-webkit-backdrop-filter:blur(16px)] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] transform-gpu">
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
                    <div
                        className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/10 opacity-50 md:hidden"
                        style={{ borderColor: '#ff8b5340' }}
                    />
                    <div
                        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,139,83,0.08) 0%, transparent 70%)' }}
                    />

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
        </>
    );
});
CompetitionInfo.displayName = 'CompetitionInfo';

const TopicCard = React.memo(({ icon: Icon, title, desc, accentHex }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, title: string, desc: string, accentHex: string }) => {
    return (
        <div
            className="group relative p-8 rounded-2xl bg-black/80 md:bg-black/60 md:backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full h-full transform-gpu"
            style={{
                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <PremiumCardGlow accentHex={accentHex} roundedClass="rounded-2xl" />
            <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-xl relative z-10 mb-10" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` }}>
                    <Icon className="w-8 h-8 text-white/80" style={{ filter: `drop-shadow(0 0 8px ${accentHex}80)` }} />
                </div>
                <div className="flex-1">
                    <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white tracking-tight mb-4 group-hover:text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, #fff, ${accentHex})` }}>
                        {title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
});
TopicCard.displayName = 'TopicCard';
