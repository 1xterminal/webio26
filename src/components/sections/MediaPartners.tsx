'use client';

import { motion } from 'framer-motion';

const mediaPartnerTiers = [
    {
        // Top tier
        logos: [
            { name: 'Media Partner 1', width: 140, height: 70 },
            { name: 'Media Partner 2', width: 140, height: 70 },
            { name: 'Media Partner 3', width: 140, height: 70 },
        ]
    },
    {
        // Lower tier
        logos: [
            { name: 'Media Partner 4', width: 110, height: 56 },
            { name: 'Media Partner 5', width: 110, height: 56 },
            { name: 'Media Partner 6', width: 110, height: 56 },
            { name: 'Media Partner 7', width: 110, height: 56 },
        ]
    },
];

export function MediaPartners() {
    return (
        <section className="pb-16 md:pb-24 relative">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                    className="text-center mb-12"
                >
                    <h2 className="font-raela font-bold text-2xl md:text-4xl text-white mb-2">
                        MEDIA PARTNER
                    </h2>
                </motion.div>

                <div className="space-y-8">
                    {mediaPartnerTiers.map((tier, tierIndex) => (
                        <motion.div
                            key={tierIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                            transition={{ delay: tierIndex * 0.1 }}
                        >
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                {tier.logos.map((logo, i) => (
                                    <div
                                        key={i}
                                        className="border border-white/10 bg-white/2 hover:bg-white/5 transition-colors flex items-center justify-center rounded-lg"
                                        style={{ width: logo.width, height: logo.height }}
                                    >
                                        <span className="text-white/20 text-xs font-mono text-center px-1 leading-tight">{logo.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
