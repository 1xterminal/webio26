'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function Preloader() {
    const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');

    useEffect(() => {
        // Lock scroll while preloading
        document.body.style.overflow = 'hidden';

        // Timing sequence:
        // 0.0s - 2.5s: Logo holds on screen (Phase: 'loading')
        // 2.5s: Trigger exit animation (Phase: 'exiting')
        // 3.5s: Animation completes, dispatch event (Phase: 'done')

        const exitTimer = setTimeout(() => {
            setPhase('exiting');
        }, 2500); // Increased from 1200ms

        const doneTimer = setTimeout(() => {
            document.body.style.overflow = '';
            // sessionStorage.setItem('io_preloader_done', 'true');
            window.dispatchEvent(new CustomEvent('preloader:done'));
            setPhase('done');
        }, 3500); // Increased from 2200ms

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
            document.body.style.overflow = '';
        };
    }, []);

    if (phase === 'done') return null;

    // The 5 columns for the "curtain cut" effect
    const columns = [0, 1, 2, 3, 4];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* 1. Background Curtain Layers (Staggered exit) */}
            <div className="absolute inset-0 flex">
                {columns.map((col) => (
                    <motion.div
                        key={col}
                        initial={{ y: "0%" }}
                        animate={{ y: phase === 'exiting' ? "-100%" : "0%" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1], // Custom sleek Mubien-style cubic bezier
                            delay: phase === 'exiting' ? col * 0.05 : 0 // Stagger left to right
                        }}
                        className="h-full flex-1 bg-black border-r border-white/5 last:border-r-0"
                    />
                ))}
            </div>

            {/* 2. Central Logo Animation */}
            <AnimatePresence>
                {phase === 'loading' && (
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center mix-blend-difference gap-6"
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1], // Custom snappy ease-out
                        }}
                    >
                        <Image
                            src="/assets/logo/logo io transparant.png"
                            alt="I/O Festival Logo"
                            width={300}
                            height={100}
                            className="w-auto h-20 md:h-28 object-contain"
                            priority
                        />
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: "circOut" }}
                            className="h-[1px] bg-white/30"
                        />
                        <motion.span
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-white/50"
                        >
                            Technology Into Action
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
