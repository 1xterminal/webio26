'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideProps } from 'lucide-react';
import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface BenefitItemProps {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  accentColor: string;
  delay: number;
  isHighlighted?: boolean;
}

export const BenefitCard = memo(({ title, description, icon: Icon, accentColor, delay, isHighlighted }: BenefitItemProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.9, y: 30 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative p-8 md:p-10 rounded-[40px] overflow-hidden ${isHighlighted ? 'bg-[rgba(25,25,25,0.95)] md:bg-[rgba(20,20,20,0.8)] border-white/20' : 'bg-[rgba(20,20,20,0.9)] md:bg-[rgba(15,15,15,0.6)] border-white/5'} border md:backdrop-blur-xl hover:-translate-y-3 transition-all duration-500 ease-out h-full`}
      style={{ willChange: 'transform' }}
    >
      <div 
        className={`absolute inset-0 ${isHighlighted ? 'opacity-20' : 'opacity-0'} group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}
        style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor} 0%, transparent 70%)` }}
      />

      {isHighlighted && (
        <div className="absolute inset-0 rounded-[40px] border border-white/20 pointer-events-none" />
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        <div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:scale-110"
          style={{ 
            background: isHighlighted ? `${accentColor}25` : `${accentColor}15`, 
            border: `1px solid ${isHighlighted ? accentColor : accentColor + '30'}` 
          }}
        >
          <Icon className="w-8 h-8 md:w-10 md:h-10 transition-colors duration-500" color={accentColor} />
          <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40" style={{ background: accentColor }} />
        </div>

        <h3 className="font-raela font-black text-2xl md:text-4xl text-white mb-4 tracking-tighter uppercase">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? 'block text-transparent bg-clip-text' : ''} style={i === 1 ? { backgroundImage: `linear-gradient(to right, white, ${accentColor}80)` } : {}}>
              {word}{' '}
            </span>
          ))}
        </h3>

        <p className="text-white/50 text-base md:text-lg leading-relaxed font-light">
          {description.split('satu-satunya brand').map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-white font-bold">satu-satunya brand</span>}
            </React.Fragment>
          ))}
        </p>
      </div>
    </motion.div>
  );
});

BenefitCard.displayName = 'BenefitCard';
