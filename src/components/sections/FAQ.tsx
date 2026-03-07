'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Siapa pihak yang dapat mendaftar?",
        answer: "I/O Festival 2026 menyambut pelajar SMA sederajat, mahasiswa aktif, dan masyarakat umum. Semua pihak berhak bergabung."
    },
    {
        question: "Apa saja kategori kompetisi yang tersedia?",
        answer: "Terdapat lima kategori perlombaan. Kategori tersebut meliputi Business Case Tingkat Umum, UI/UX Design Tingkat Umum, Web Development Tingkat Umum, UI/UX Design Tingkat Siswa, dan Web Development Tingkat Siswa."
    },
    {
        question: "Bagaimana tahapan kompetisi ini?",
        answer: "Kompetisi berlangsung dalam dua tahap. Babak Penyisihan berlangsung secara daring. Babak Grand Final berlangsung secara luring di kampus UNTAR. Pada babak penyisihan, peserta mengirim proposal dan tautan karya. Lima tim terbaik pada setiap cabang berhak melaju ke Grand Final."
    },
    {
        question: "Apa fungsi dari Impact Projection?",
        answer: "Impact Projection mengevaluasi seberapa besar kegunaan suatu karya bagi masyarakat. Elemen ini menjadi penentu utama kemenangan peserta."
    },
    {
        question: "Berapa batas jumlah anggota tim?",
        answer: "Satu tim berisi tiga hingga lima orang. Satu orang bertindak sebagai ketua tim. Seluruh anggota tim wajib menempuh pendidikan pada institusi yang sama."
    },
    {
        question: "Apakah peserta berhak mendaftar pada dua cabang kompetisi?",
        answer: "Peserta berhak mendaftar pada beberapa cabang kompetisi. Peserta harus menggunakan susunan tim yang berbeda. Satu orang hanya dapat bergabung dalam satu tim per cabang kompetisi."
    },
    {
        question: "Apa hadiah bagi para pemenang?",
        answer: "Para pemenang menerima uang tunai, piala, dan sertifikat resmi. Pemenang juga berkesempatan melaksanakan program magang di perusahaan mitra I/O FESTIVAL 2026."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-16 md:py-32 relative overflow-hidden bg-black">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="font-raela font-bold text-3xl md:text-5xl text-center mb-12 md:mb-16 text-white">
                    PERTANYAAN <span className="text-neon-blue">UMUM</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                            >
                                <span className="font-raela font-bold text-[17px] text-white tracking-wide">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-white/70 stroke-[1.5]" />
                                ) : (
                                    <Plus className="w-5 h-5 text-white/70 stroke-[1.5]" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-white/70 text-[15px] leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
