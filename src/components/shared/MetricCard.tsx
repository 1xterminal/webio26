'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { PremiumCardGlow } from './PremiumCardGlow';

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  delay: number;
}

export const MetricCard = memo(({ icon: Icon, value, label, delay }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    transition={{ duration: 0.6, delay }}
    className="group relative p-6 md:p-8 rounded-3xl overflow-hidden bg-[rgba(25,25,25,0.9)] md:bg-[rgba(20,20,20,0.5)] md:[backdrop-filter:blur(16px)] transition-transform duration-[500ms] ease-out hover:-translate-y-2 border border-white/5"
    style={{ willChange: 'transform' }}
  >
    <PremiumCardGlow accentHex="#1DBCD3" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-neon-blue/10 flex items-center justify-center mb-4 md:mb-6 border border-neon-blue/20 transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-neon-blue" />
      </div>
      <div className="font-raela font-black text-3xl md:text-5xl text-white mb-1 md:mb-2 tracking-tighter">{value}</div>
      <div className="text-white/40 font-raela uppercase tracking-[0.2em] text-[10px] md:text-xs">{label}</div>
    </div>
  </motion.div>
));

MetricCard.displayName = 'MetricCard';
