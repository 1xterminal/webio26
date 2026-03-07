'use client';

import { motion } from 'framer-motion';

const sponsorTiers = [
    {
        // Top tier: Festival Partner & Case Collaborator (largest)
        logos: [
            { name: 'Festival Partner', width: 200, height: 100 },
            { name: 'Case Collaborator', width: 200, height: 100 },
        ]
    },
    {
        // Mid tier
        logos: [
            { name: 'Sponsor 1', width: 140, height: 70 },
            { name: 'Sponsor 2', width: 140, height: 70 },
            { name: 'Sponsor 3', width: 140, height: 70 },
        ]
    },
    {
        // Lower tier (smaller)
        logos: [
            { name: 'Sponsor 4', width: 110, height: 56 },
            { name: 'Sponsor 5', width: 110, height: 56 },
            { name: 'Sponsor 6', width: 110, height: 56 },
            { name: 'Sponsor 7', width: 110, height: 56 },
        ]
    },
];

export function Sponsors() {
    return (
        <section className="py-16 md:py-24 relative">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                    className="text-center mb-16"
                >
                    <h2 className="font-raela font-bold text-3xl md:text-5xl text-white mb-4">
                        DIDUKUNG <span className="text-white/40">OLEH</span>
                    </h2>
                </motion.div>

                <div className="space-y-10">
                    {sponsorTiers.map((tier, tierIndex) => (
                        <motion.div
                            key={tierIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
                            transition={{ delay: tierIndex * 0.1 }}
                        >
                            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                                {tier.logos.map((logo, i) => (
                                    <div
                                        key={i}
                                        className="border border-white/10 bg-white/2 hover:bg-white/5 transition-colors flex items-center justify-center rounded-lg"
                                        style={{ width: logo.width, height: logo.height }}
                                    >
                                        <span className="text-white/20 text-xs font-mono">{logo.name}</span>
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
