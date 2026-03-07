'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { UIUXIcon } from '@/components/ui/icons/UIUXIcon';
import { WebDevIcon } from '@/components/ui/icons/WebDevIcon';
import { BusinessCaseIcon } from '@/components/ui/icons/BusinessCaseIcon';

const tracks = [
    {
        icon: UIUXIcon,
        title: 'UI/UX Design',
        description: 'Rancang antarmuka dan pengalaman pengguna yang terukur. Desain tersebut harus berguna bagi masyarakat luas.',
        color: 'from-neon-purple to-purple-600',
        accentHex: '#A856EE',
        href: '/kompetisi/ui-ux',
        tags: ['SMA/SMK', 'Mahasiswa'],
    },
    {
        icon: WebDevIcon,
        title: 'Web Development',
        description: 'Bangun sebuah layanan website fungsional. Layanan tersebut harus berhasil mengatasi kendala di dunia nyata.',
        color: 'from-neon-blue to-blue-600',
        accentHex: '#1DBCD3',
        href: '/kompetisi/web-dev',
        tags: ['SMA/SMK', 'Mahasiswa'],
    },
    {
        icon: BusinessCaseIcon,
        title: 'Business Case',
        description: 'Susun rencana bisnis berbasis teknologi ringkas. Rencana bisnis tersebut wajib mendatangkan pemasukan finansial yang terukur.',
        color: 'from-neon-orange to-orange-600',
        accentHex: '#FF8B53',
        href: '/kompetisi/business-case',
        tags: ['Mahasiswa'],
    }
];

export function Tracks() {
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
                        Pilih satu cabang kompetisi yang sesuai dengan minat Anda. Lima tim terbaik pada setiap cabang akan berebut kejuaraan di laga Grand Final.
                    </p>
                    <p className="text-white/30 text-sm">
                        Terbuka untuk Mahasiswa, Siswa, dan Umum.
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
                        >
                            <Link
                                href={track.href}
                                className="group relative block p-8 md:p-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform overflow-hidden rounded-[24px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-2"
                                style={{
                                    background: 'rgba(20, 20, 20, 0.4)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                }}
                            >
                                {/* Layer 1: Immersive Ambient Glow Background */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity] translate-z-0 pointer-events-none rounded-[24px]"
                                    style={{ background: `radial-gradient(circle at 100% 0%, ${track.accentHex} 0%, transparent 80%)` }}
                                />

                                {/* Layer 2: Intense Top-Right Flare */}
                                <div
                                    className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 group-hover:opacity-60 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity] translate-z-0 mix-blend-screen max-md:blur-[40px] md:blur-[80px] pointer-events-none"
                                    style={{ background: track.accentHex }}
                                />

                                {/* Layer 3: Glowing Gradient Border Mask */}
                                <div
                                    className="absolute inset-0 rounded-[24px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity] translate-z-0"
                                    style={{
                                        padding: '1px',
                                        background: `linear-gradient(135deg, ${track.accentHex}90 0%, rgba(255,255,255,0.05) 100%)`,
                                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                        WebkitMaskComposite: 'xor',
                                        maskComposite: 'exclude',
                                    }}
                                />
                                
                                {/* Layer 4: Inner Glow & Shadow Enhancement */}
                                <div
                                    className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity] translate-z-0 pointer-events-none"
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
                                            className="px-3 py-1 rounded-full text-[10px] font-raela font-bold uppercase tracking-[0.1em] border backdrop-blur-sm"
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

                                {/* Content */}
                                <h3 className="font-raela font-bold text-2xl lg:text-3xl text-white mb-3 leading-tight">{track.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">
                                    {track.description}
                                </p>

                                {/* High-Contrast CTA Button */}
                                <div className="mt-auto pt-6">
                                    <div className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wide text-white overflow-hidden group/btn shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:shadow-[0_0_30px_${track.accentHex}40] transform-gpu will-change-transform`}>
                                        {/* Button Background Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-90 group-hover/btn:opacity-100 transition-opacity duration-[400ms] ease-out will-change-[opacity] translate-z-0`} />
                                        
                                        {/* Button Inner Shine */}
                                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] will-change-[opacity] translate-z-0" />
                                        
                                        <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                                            Daftar Sekarang
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform" />
                                        </span>
                                    </div>
                                </div>


                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
