'use client';

import { motion } from 'framer-motion';
import { GraduationCap, PartyPopper, Megaphone } from 'lucide-react';

const pillars = [
    {
        icon: GraduationCap,
        title: "Akademik",
        description: "Kami mewadahi bakat pelajar dari seluruh Indonesia. Tersedia cabang Web Development, UI/UX Design, dan Business Case."
    },
    {
        icon: PartyPopper,
        title: "Festival",
        description: "Acara ini menghadirkan pameran dan presentasi interaktif. Suasana kolaboratif menjadi poin pembeda."
    },
    {
        icon: Megaphone,
        title: "Publikasi",
        description: "Acara ini memperkenalkan kiprah FTI UNTAR. Kami saling berinteraksi dengan sekolah, tenaga ahli, dan masyarakat."
    }
];

export function About() {
    return (
        <section id="about" className="relative pt-24 md:pt-48 pb-16 md:pb-32 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-raela font-bold text-3xl md:text-5xl lg:text-6xl lg:leading-[1.1] mb-8 text-white flex flex-col gap-2">
                            <span className="block tracking-tight text-balance">Technology Into Action,</span>
                            <span className="block tracking-tight text-balance">Ideas Into Impact.</span>
                        </h2>
                        <p className="text-lg text-white/70 mb-6 leading-relaxed">
                            I/O Festival adalah kompetisi akademik tingkat nasional oleh FTI UNTAR. Kami mencari para perancang pakar. Karya peserta harus membawa manfaat nyata bagi masyarakat luas.
                        </p>
                        <p className="text-lg text-white/70 leading-relaxed">
                            Penilaian kompetisi tahun ini mencakup kriteria <span className="text-white font-semibold">Impact Projection</span>. Hal ini bertujuan mengevaluasi kegunaan karya dalam masyarakat. Peserta wajib bertindak sebagai pemecah masalah.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-start gap-5">
                                    <pillar.icon className="w-10 h-10 text-neon-blue shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <h3 className="font-raela font-bold text-xl text-white mb-2">{pillar.title}</h3>
                                        <p className="text-sm text-white/60">{pillar.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
