'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Apa fungsi dari Impact Projection?",
        answer: "Impact Projection mengevaluasi seberapa terukur, realistis, dan aplikatif solusi yang ditawarkan bagi masyarakat. Elemen ini memiliki bobot penilaian tertinggi dan menjadi penentu utama kemenangan peserta."
    },
    {
        question: "Siapa pihak yang dapat mendaftar?",
        answer: "I/O Festival 2026 menyambut pelajar SMA/SMK/sederajat, mahasiswa aktif, dan masyarakat umum."
    },
    {
        question: "Apa saja kategori kompetisi yang tersedia?",
        answer: "Terdapat lima kategori perlombaan, yaitu: Business Case Tingkat Umum/Mahasiswa, UI/UX Design Tingkat Umum/Mahasiswa, Web Development Tingkat Umum/Mahasiswa, UI/UX Design Tingkat Siswa, dan Web Development Tingkat Siswa."
    },
    {
        question: "Bagaimana tahapan kompetisi ini?",
        answer: "Kompetisi berlangsung dalam dua tahap. Babak Penyisihan berlangsung secara daring dengan mengumpulkan proposal dan progres karya. Lima tim terbaik (Top 5) pada setiap cabang berhak melaju ke babak Grand Final yang diselenggarakan secara luring (offline) di kampus Universitas Tarumanagara."
    },
    {
        question: "Berapa batas jumlah anggota tim?",
        answer: "Satu tim terdiri dari minimal 1 orang dan maksimal 3 orang. Seluruh anggota tim wajib menempuh pendidikan pada institusi yang sama."
    },
    {
        question: "Apakah peserta berhak mendaftar pada dua cabang kompetisi yang berbeda?",
        answer: "Tidak. Apabila peserta sudah mendaftar pada satu cabang lomba, peserta tersebut tidak diperbolehkan untuk mendaftarkan diri pada cabang lomba lainnya."
    },
    {
        question: "Apa hadiah bagi para pemenang?",
        answer: "Para pemenang akan mendapatkan uang pembinaan (Total Prize Pool jutaan rupiah) dan E-Sertifikat penghargaan resmi."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <section id="faq" className="py-16 md:py-32 relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="font-raela font-bold text-3xl md:text-5xl text-center mb-12 md:mb-16 text-white">
                    PERTANYAAN <span className="text-neon-blue">UMUM</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 md:backdrop-blur-sm">
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
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
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
