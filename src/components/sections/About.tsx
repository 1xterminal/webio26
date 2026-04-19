'use client';

import { motion } from 'framer-motion';
import { GraduationCap, PartyPopper, Megaphone } from 'lucide-react';

const pillars = [
    {
        icon: GraduationCap,
        title: "Akademik",
        description: "Ajang kompetisi bagi pelajar, mahasiswa, dan masyarakat luas dari seluruh Indonesia. Uji kemampuanmu dalam bidang Web Development, UI/UX Design, atau Business Case, dan jadikan karyamu sebagai bukti nyata inovasi."

    },
    {
        icon: PartyPopper,
        title: "Festival",
        description: "Lebih dari sekadar kompetisi, I/O Festival adalah ajang selebrasi inovasi. Kami menyediakan wadah bagi peserta untuk memamerkan karya, melakukan presentasi secara interaktif, dan berinteraksi langsung dalam suasana yang inklusif. Temukan inspirasi dan peluang kolaborasi baru di sini."
    },
    {
        icon: Megaphone,
        title: "Publikasi",
        description: "Kami percaya inovasi tumbuh melalui kolaborasi. I/O Festival menjadi jembatan yang menghubungkan ide para pelajar dan mahasiswa dengan praktisi industri, akademisi, serta masyarakat luas."
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
                            <span className="block text-neon-blue text-xs md:text-sm uppercase tracking-[0.4em] mb-2 opacity-80">Tentang I/O Festival 2026</span>
                            <span className="block tracking-tight text-balance">Technology Into Action,</span>
                            <span className="block tracking-tight text-balance">Ideas Into Impact.</span>
                        </h2>
                        <p className="text-lg text-white/70 mb-6 leading-relaxed">
                            FTI UNTAR menyelenggarakan kompetisi teknologi tingkat nasional. Peserta dapat memilih tiga cabang kompetisi. Kompetisi inovasi teknologi berskala nasional bagi Siswa, Mahasiswa, hingga Umum. Pilih tantanganmu di bidang Business Case, UI/UX Design, atau Web Dev dan jadilah bagian dari revolusi digital bersama FTI UNTAR!
                        </p>

                        <p className="text-lg text-white/70 mb-6 leading-relaxed">
                            Kami percaya, teknologi yang baik adalah teknologi yang membawa manfaat nyata. Oleh karena itu, tahun ini I/O Festival berfokus pada karya yang memiliki dampak langsung bagi masyarakat.
                        </p>

                        <p className="text-lg text-white/70 leading-relaxed">
                            Melalui kriteria <span className="text-white font-semibold">Impact Projection</span>, kami akan mengevaluasi seberapa relevan dan aplikatif solusimu dalam menjawab tantangan di lapangan. Kami ingin melihat bagaimana karyamu bisa menjadi jawaban atas permasalahan yang ada.
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
                                className="relative p-8 rounded-2xl bg-[rgba(25,25,25,0.9)] md:bg-white/5 md:backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
                            >
                                {/* Static accent for mobile (no blur) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent pointer-events-none md:hidden" />
                                
                                <div className="flex items-start gap-5 relative z-10">
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
