'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User } from 'lucide-react';
import { PremiumCardGlow } from './CompetitionShared';

interface Contact {
    name: string;
    whatsapp: string;
    line: string;
    role?: string[];
}

interface CompetitionContactProps {
    contacts: Contact[];
    accentHex: string;
    title: string;
}

export const CompetitionContact = React.memo(({ contacts, accentHex, title }: CompetitionContactProps) => {
    if (!contacts || contacts.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-20 pb-12"
        >
            <div className="flex flex-col items-center text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-4 bg-white/[0.02] border border-white/10" style={{ boxShadow: `0 0 30px ${accentHex}15` }}>
                    <MessageCircle className="w-6 h-6 text-white/80" style={{ filter: `drop-shadow(0 0 10px ${accentHex})` }} />
                </div>
                <h2 className="text-3xl font-raela font-bold text-white tracking-tight">Butuh Bantuan?</h2>
                <p className="text-white/50 text-sm mt-3 max-w-md mx-auto">
                    Hubungi contact person cabang kompetisi ini untuk pertanyaan lebih lanjut.
                </p>
            </div>

            <div className={`grid grid-cols-1 ${contacts.length === 1 ? 'sm:grid-cols-1 max-w-md' : 'sm:grid-cols-2 max-w-3xl'} gap-6 w-full mx-auto`}>
                {contacts.map((cp, idx) => (
                    <div
                        key={idx}
                        className="group relative p-6 md:p-8 rounded-3xl bg-black/80 md:bg-black/60 md:backdrop-blur-xl border border-white/5 flex flex-col transition-transform duration-500 overflow-hidden hover:-translate-y-1 w-full transform-gpu"
                        style={{
                            boxShadow: '0 8px 32px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
                        }}
                    >
                        <PremiumCardGlow accentHex={accentHex} roundedClass="rounded-3xl" />

                        <div className="relative z-10 flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                            <div>
                                <h3 className="font-raela font-black text-xl text-white tracking-wide">{cp.name}</h3>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {(cp.role || ['Official CP']).map((roleName, rIdx) => (
                                        <span 
                                            key={rIdx}
                                            className="px-2 py-0.5 rounded-full text-[9px] font-bold font-raela uppercase tracking-wider shadow-sm flex items-center shrink-0"
                                            style={{ 
                                                color: accentHex,
                                                backgroundColor: `${accentHex}15`,
                                                border: `1px solid ${accentHex}40`
                                            }}
                                        >
                                            {roleName}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                                <User className="w-5 h-5 text-white" style={{ filter: `drop-shadow(0 0 8px ${accentHex})` }} />
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-3 mt-auto w-full">
                            <a
                                href={`https://wa.me/${cp.whatsapp}?text=${encodeURIComponent(`Halo, kak! aku mau tanya-tanya tentang I/O Festival 2026 di cabang lomba ${title} tingkat ${cp.role ? cp.role.join('/') : 'Umum'}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 group/wa w-full overflow-hidden"
                            >
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover/wa:opacity-10 transition-opacity duration-300"
                                    style={{ backgroundColor: accentHex }}
                                />
                                <div 
                                    className="absolute inset-0 border border-transparent rounded-2xl opacity-0 group-hover/wa:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{ borderColor: accentHex }}
                                />
                                
                                <div 
                                    className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center group-hover/wa:scale-110 shadow-lg transition-transform duration-300 shrink-0"
                                    style={{ backgroundColor: `${accentHex}20`, color: accentHex }}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.154 1.599 5.96L.18 23.4l5.589-1.465a12.015 12.015 0 0 0 6.262 1.761h.005c6.645 0 12.03-5.385 12.03-12.03S18.677 0 12.031 0zm.005 21.688a9.982 9.982 0 0 1-5.093-1.385l-.365-.216-3.785.992.997-3.69-.237-.377a9.988 9.988 0 0 1-1.528-5.32c0-5.508 4.484-9.992 9.992-9.992 2.668 0 5.176 1.04 7.062 2.926A9.954 9.954 0 0 1 21.99 12.03c0 5.508-4.484 9.992-9.992 9.992v.005zm5.483-7.495c-.301-.151-1.78-.88-2.056-.98-.276-.1-.478-.15-.679.15s-.779.98-.955 1.18c-.176.2-.352.226-.653.076-.301-.151-1.272-.469-2.42-1.49-.893-.794-1.497-1.776-1.673-2.077-.176-.301-.019-.464.131-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.679-1.643-.93-2.251-.243-.591-.49-.51-.679-.52-.176-.01-.377-.01-.578-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511s1.08 2.91 1.231 3.111c.15.201 2.122 3.238 5.141 4.538.718.31 1.278.496 1.714.635.72.228 1.376.196 1.892.119.58-.087 1.78-.728 2.03-1.432.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/>
                                    </svg>
                                </div>
                                <div className="relative z-10 flex flex-col flex-1 truncate">
                                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5 font-raela">WhatsApp</span>
                                    <span className="text-sm font-bold text-white/90 group-hover/wa:text-white transition-colors">{cp.whatsapp.replace(/^62/, '0')}</span>
                                </div>
                            </a>

                            <a
                                href={`https://line.me/ti/p/~${cp.line}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 group/line w-full overflow-hidden"
                            >
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover/line:opacity-10 transition-opacity duration-300"
                                    style={{ backgroundColor: accentHex }}
                                />
                                <div 
                                    className="absolute inset-0 border border-transparent rounded-2xl opacity-0 group-hover/line:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{ borderColor: accentHex }}
                                />
                                <div 
                                    className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center group-hover/line:scale-110 shadow-lg transition-transform duration-300 shrink-0"
                                    style={{ backgroundColor: `${accentHex}20`, color: accentHex }}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div className="relative z-10 flex flex-col flex-1 truncate">
                                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5 font-raela">LINE ID</span>
                                    <span className="text-sm font-bold text-white/90 group-hover/line:text-white transition-colors">{cp.line}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
});
CompetitionContact.displayName = 'CompetitionContact';
