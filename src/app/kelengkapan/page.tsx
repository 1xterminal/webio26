'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, Image as ImageIcon, Shield, Download, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StarDust } from '@/components/effects/StarDust';
import { motion } from 'framer-motion';

const links = [
    {
        icon: FileText,
        title: 'Form Pendaftaran — Mahasiswa',
        description: 'Daftar sebagai tim kategori Mahasiswa / Umum',
        href: '#',
        color: 'text-neon-blue',
        borderColor: 'border-neon-blue/20 hover:border-neon-blue/40',
    },
    {
        icon: FileText,
        title: 'Form Pendaftaran — Siswa',
        description: 'Daftar sebagai tim kategori Siswa SMA/SMK',
        href: '#',
        color: 'text-neon-orange',
        borderColor: 'border-neon-orange/20 hover:border-neon-orange/40',
    },
    {
        icon: FileText,
        title: 'RuleBook I/O Fest 2026',
        description: 'Panduan lengkap dan aturan kompetisi',
        href: '#',
        color: 'text-neon-purple',
        borderColor: 'border-neon-purple/20 hover:border-neon-purple/40',
    },
    {
        icon: Shield,
        title: 'Surat Originalitas',
        description: 'Template surat pernyataan keaslian karya',
        href: '#',
        color: 'text-white/70',
        borderColor: 'border-white/10 hover:border-white/20',
    },
    {
        icon: Download,
        title: 'Logo I/O Fest 2026',
        description: 'Download logo resmi untuk keperluan tim',
        href: '#',
        color: 'text-white/70',
        borderColor: 'border-white/10 hover:border-white/20',
    },
    {
        icon: ImageIcon,
        title: 'Twibbon',
        description: 'Frame foto resmi I/O Festival 2026',
        href: '#',
        color: 'text-white/70',
        borderColor: 'border-white/10 hover:border-white/20',
    },
];

const contacts = [
    { platform: 'Line', handle: '@iofestival', href: '#' },
    { platform: 'WhatsApp', handle: 'Contact Person', href: '#' },
];

export default function KelengkapanPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full relative">
            <StarDust />

            {/* Floating 3D Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 -left-20 w-80 h-80 opacity-30 blur-[2px]"
                >
                    <Image
                        src="/assets/element/ELEMEN 5.png"
                        alt=""
                        width={320}
                        height={320}
                        className="object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -40, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute top-[40%] -right-32 w-96 h-96 opacity-30 blur-[3px]"
                >
                    <Image
                        src="/assets/element/ELEMEN 6.png"
                        alt=""
                        width={384}
                        height={384}
                        className="object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-20 left-[15%] w-120 h-120 mix-blend-screen"
                >
                    <Image
                        src="/assets/element/ELEMEN FLARE 2.png"
                        alt=""
                        width={480}
                        height={480}
                        className="object-contain"
                    />
                </motion.div>
            </div>

            <Navbar />
            <section className="pt-32 pb-20 px-4 relative z-10">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Image
                            src="/assets/logo/logo-io.webp"
                            alt="I/O Festival Logo"
                            width={200}
                            height={60}
                            className="h-16 w-auto object-contain mx-auto mb-6"
                        />
                        <h1 className="font-raela font-black text-3xl md:text-4xl text-white mb-3">
                            Kelengkapan Peserta
                        </h1>
                        <p className="text-white/50 text-sm">
                            Semua yang kamu butuhkan untuk mengikuti I/O Festival 2026
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        {links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                target="_blank"
                                className={`flex items-center gap-4 p-5 rounded-lg border ${link.borderColor} backdrop-blur-xl bg-white/[0.02] hover:bg-white/6 shadow-[0_0_15px_rgba(255,255,255,0.01)] hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] transition-all duration-300 group`}
                            >
                                <link.icon className={`w-5 h-5 ${link.color} shrink-0 group-hover:scale-110 transition-transform duration-300`} />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-raela font-bold text-white text-sm">{link.title}</h3>
                                    <p className="text-white/40 text-xs mt-0.5">{link.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all shrink-0" />
                            </Link>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                        <p className="text-xs tracking-[0.15em] uppercase text-white/25 font-mono mb-4 text-center">
                            Contact Person
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {contacts.map((cp, i) => (
                                <Link
                                    key={i}
                                    href={cp.href}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-md bg-white/[0.02] hover:bg-white/6 shadow-[0_0_15px_rgba(255,255,255,0.01)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 text-sm group"
                                >
                                    <MessageCircle className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
                                    <span className="text-white/80 group-hover:text-white transition-colors">{cp.platform}</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-white/50 text-xs">{cp.handle}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Back */}
                    <div className="mt-10 text-center">
                        <Link href="/" className="text-white/30 hover:text-white/50 text-xs font-mono transition-colors">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
