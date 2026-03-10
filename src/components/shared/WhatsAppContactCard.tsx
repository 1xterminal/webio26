'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppContactCardProps {
  name: string;
  role: string;
  phoneNumber: string;
  message: string;
  accentColor: string; // Tailwind class like "neon-blue"
  accentHex: string;
  delay: number;
  colSpan?: string;
}

export const WhatsAppContactCard = memo(({ 
  name, 
  role, 
  phoneNumber, 
  message, 
  accentColor, 
  accentHex,
  delay,
  colSpan = "col-span-1"
}: WhatsAppContactCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`group relative p-8 rounded-[32px] overflow-hidden bg-[rgba(25,25,25,0.95)] md:bg-[rgba(20,20,20,0.6)] border border-white/5 md:backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center ${colSpan}`}
    style={{ willChange: 'transform' }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br from-${accentColor}/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className={`w-16 h-16 rounded-2xl bg-${accentColor}/10 flex items-center justify-center mb-6 border border-${accentColor}/20 transition-transform duration-500 group-hover:scale-110`}>
      <MessageCircle className={`w-8 h-8 text-${accentColor}`} />
    </div>
    <span className={`text-[9px] md:text-[10px] font-mono text-${accentColor} font-bold uppercase tracking-wider mb-2 leading-tight`}>
      {role}
    </span>
    <h3 className="text-white font-raela font-bold text-lg mb-4">{name}</h3>
    <motion.a 
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`mt-auto px-8 py-3 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-[0.2em] hover:bg-${accentColor}/20 hover:text-white hover:shadow-[0_0_20px_${accentHex}40] border border-white/10 hover:border-${accentColor}/50 transition-all duration-300 z-20 relative overflow-hidden group/btn`}
    >
      <span className="relative z-10">Contact</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
    </motion.a>
  </motion.div>
));

WhatsAppContactCard.displayName = 'WhatsAppContactCard';
