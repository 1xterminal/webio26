'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { Map, MapMarker, MarkerContent, MarkerTooltip, MarkerPopup, MapControls } from '@/components/ui/map';

export function Contact() {
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:iobemftiuntar@gmail.com?subject=${encodeURIComponent(
            `[Partnership] ${type || 'Kerjasama'} — ${company}`
        )}&body=${encodeURIComponent(`Perusahaan/Organisasi: ${company}\nEmail: ${email}\nJenis Kerjasama: ${type}\n\n${message}`)}`;
        window.location.href = mailtoLink;
    };

    return (
        <section id="contact" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-neon-orange text-xs font-mono uppercase tracking-[0.2em] mb-4">
                        <Handshake className="w-4 h-4" /> Sponsorship & Partnership
                    </div>
                    <h2 className="font-raela font-bold text-3xl md:text-5xl text-white mb-4 uppercase tracking-widest">
                        PARTNER <span className="text-neon-orange">WITH US</span>
                    </h2>
                    <p className="text-white/60 font-sans max-w-xl mx-auto">
                        Sponsor dan mitra menjangkau ribuan pelajar dari seluruh wilayah Indonesia. Kami mengundang kolaborasi Anda dalam menyukseskan I/O Festival 2026.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="font-raela font-bold text-2xl text-white">Why Partner?</h3>
                            <div className="space-y-4">
                                {[
                                    { metric: '1,000+', label: 'Peserta dari seluruh Indonesia' },
                                    { metric: '50+', label: 'Kampus & sekolah terjangkau' },
                                    { metric: '3', label: 'Cabang kompetisi teknologi' },
                                ].map((stat) => (
                                    <div key={stat.label} className="flex items-center gap-4 p-4 border border-white/5 bg-white/2">
                                        <span className="text-2xl font-raela font-black text-neon-orange w-20 shrink-0">{stat.metric}</span>
                                        <span className="text-white/60 text-sm">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 shrink-0">
                                    <Mail className="w-5 h-5 text-neon-blue" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold font-raela">Email</h4>
                                    <p className="text-white/60 text-sm">iobemftiuntar@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 shrink-0">
                                    <MapPin className="w-5 h-5 text-neon-purple" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold font-raela">Location</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        Universitas Tarumanagara<br />
                                        Jl. Letjen S. Parman No.1, Jakarta Barat
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-48 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-neon-blue/20 pointer-events-none z-10" />
                            <Map center={[106.7888, -6.1678]} zoom={16} pitch={45}>
                                <MapControls position="bottom-right" showZoom />
                                <MapMarker longitude={106.7888} latitude={-6.1678}>
                                    <MarkerContent className="group z-10">
                                        <div className="size-8 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,139,83,0.8)] relative group shrink-0 cursor-pointer flex items-center justify-center bg-neon-orange text-black transition-transform group-hover:scale-110">
                                            <span className="animate-ping absolute inset-0 -m-1 rounded-full bg-neon-orange opacity-40"></span>
                                            <MapPin className="h-5 w-5 stroke-[2.5px] relative z-10" />
                                        </div>
                                    </MarkerContent>
                                    <MarkerTooltip className="bg-black/90 border border-white/10 text-white text-xs px-2 py-1 pointer-events-none rounded shadow-md z-50">
                                        Universitas Tarumanagara
                                    </MarkerTooltip>
                                    <MarkerPopup className="bg-black border border-neon-orange/20 backdrop-blur-md p-4 w-64 rounded-xl shadow-[0_0_20px_rgba(255,139,83,0.15)] text-left z-50">
                                        <div className="space-y-2">
                                            <p className="font-raela font-bold text-white text-lg leading-tight uppercase tracking-wide">Universitas Tarumanagara</p>
                                            <p className="text-xs text-white/60 font-sans leading-relaxed">
                                                Kampus 1, Jl. Letjen S. Parman No.1, Jakarta Barat
                                            </p>
                                        </div>
                                    </MarkerPopup>
                                </MapMarker>
                            </Map>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-raela font-bold text-white/80 uppercase tracking-wider">Perusahaan / Organisasi</label>
                                <input
                                    id="company"
                                    type="text"
                                    required
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon-orange transition-colors"
                                    placeholder="PT Contoh Indonesia"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-raela font-bold text-white/80 uppercase tracking-wider">Email Kontak</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon-orange transition-colors"
                                    placeholder="partnership@company.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="type" className="text-sm font-raela font-bold text-white/80 uppercase tracking-wider">Jenis Kerjasama</label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon-orange transition-colors appearance-none"
                                >
                                    <option value="" className="bg-black">Pilih jenis kerjasama</option>
                                    <option value="Sponsor Utama" className="bg-black">Sponsor Utama</option>
                                    <option value="Sponsor Pendukung" className="bg-black">Sponsor Pendukung</option>
                                    <option value="Media Partner" className="bg-black">Media Partner</option>
                                    <option value="Community Partner" className="bg-black">Community Partner</option>
                                    <option value="Lainnya" className="bg-black">Lainnya</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-raela font-bold text-white/80 uppercase tracking-wider">Pesan</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon-orange transition-colors resize-none"
                                    placeholder="Ceritakan tentang kerjasama yang Anda minati..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-neon-orange text-white font-raela font-bold text-lg px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 group"
                            >
                                KIRIM PENAWARAN SPONSORSHIP
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
