'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface EmailContactCardProps {
  email: string;
  role: string;
  delay: number;
  colSpan?: string;
  accentColor: string;
  accentHex: string;
}

export const EmailContactCard = memo(({ 
  email, 
  role, 
  delay, 
  colSpan = "col-span-2",
  accentColor,
  accentHex
}: EmailContactCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`group relative p-8 md:p-12 rounded-[32px] overflow-hidden bg-[rgba(20,20,20,0.95)] md:bg-[rgba(20,20,20,0.6)] border border-white/5 md:backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center ${colSpan}`}
    style={{ willChange: 'transform' }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br from-${accentColor}/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-${accentColor}/10 flex items-center justify-center mb-6 border border-${accentColor}/20 transition-transform duration-500 group-hover:scale-110`}>
      <Mail className={`w-8 h-8 md:w-10 md:h-10 text-${accentColor}`} />
    </div>
    <span className={`text-[10px] md:text-xs font-mono text-${accentColor} font-bold uppercase tracking-widest mb-2`}>{role}</span>
    <h3 className="text-white font-raela font-bold text-xl md:text-2xl mb-6">{email}</h3>
    <motion.a 
      href={`mailto:${email}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`mt-auto px-10 py-4 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-[0.2em] hover:bg-${accentColor}/20 hover:text-white hover:shadow-[0_0_20px_${accentHex}40] border border-white/10 hover:border-${accentColor}/50 transition-all duration-300 z-20 relative overflow-hidden group/btn`}
    >
      <span className="relative z-10">Contact Us!</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
    </motion.a>
  </motion.div>
));

EmailContactCard.displayName = 'EmailContactCard';
