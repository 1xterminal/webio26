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
      className={`mt-auto px-6 py-3 rounded-full bg-white/5 text-white/60 text-sm font-bold tracking-wide hover:bg-${accentColor}/20 hover:text-white hover:shadow-[0_0_20px_${accentHex}40] border border-white/10 hover:border-${accentColor}/50 transition-all duration-300 z-20 relative overflow-hidden group/btn flex items-center justify-center gap-3`}
    >
      <div className="relative z-10 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.154 1.599 5.96L.18 23.4l5.589-1.465a12.015 12.015 0 0 0 6.262 1.761h.005c6.645 0 12.03-5.385 12.03-12.03S18.677 0 12.031 0zm.005 21.688a9.982 9.982 0 0 1-5.093-1.385l-.365-.216-3.785.992.997-3.69-.237-.377a9.988 9.988 0 0 1-1.528-5.32c0-5.508 4.484-9.992 9.992-9.992 2.668 0 5.176 1.04 7.062 2.926A9.954 9.954 0 0 1 21.99 12.03c0 5.508-4.484 9.992-9.992 9.992v.005zm5.483-7.495c-.301-.151-1.78-.88-2.056-.98-.276-.1-.478-.15-.679.15s-.779.98-.955 1.18c-.176.2-.352.226-.653.076-.301-.151-1.272-.469-2.42-1.49-.893-.794-1.497-1.776-1.673-2.077-.176-.301-.019-.464.131-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.679-1.643-.93-2.251-.243-.591-.49-.51-.679-.52-.176-.01-.377-.01-.578-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511s1.08 2.91 1.231 3.111c.15.201 2.122 3.238 5.141 4.538.718.31 1.278.496 1.714.635.72.228 1.376.196 1.892.119.58-.087 1.78-.728 2.03-1.432.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/>
        </svg>
      </div>
      <span className="relative z-10">{phoneNumber.replace(/^62/, '0')}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
    </motion.a>
  </motion.div>
));

WhatsAppContactCard.displayName = 'WhatsAppContactCard';
